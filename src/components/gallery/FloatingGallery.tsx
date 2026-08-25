'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import { createPortal } from 'react-dom';

import { gallery } from '../data';

const CANVAS_WIDTH = 3600;
const CANVAS_HEIGHT = 2400;
const PAN_THRESHOLD = 6;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 2.8;
const PAN_PAD = 280;
const DRIFT_MAX = 26;
const DRIFT_PULL = 0.036;

type Piece = (typeof gallery)[number];

const stackLocal = [
  { x: 210, y: 280, width: 250, z: 9 },
  { x: 390, y: 70, width: 200, z: 3 },
  { x: 470, y: 160, width: 270, z: 6 },
  { x: 640, y: 40, width: 210, z: 4 },
  { x: 70, y: 340, width: 240, z: 5 },
  { x: 320, y: 300, width: 220, z: 7 },
  { x: 500, y: 320, width: 300, z: 10 },
  { x: 690, y: 260, width: 210, z: 2 },
  { x: 140, y: 500, width: 230, z: 8 },
  { x: 360, y: 480, width: 260, z: 11 },
  { x: 560, y: 490, width: 240, z: 4 },
  { x: 230, y: 640, width: 220, z: 6 },
  { x: 430, y: 180, width: 270, z: 12 },
  { x: 510, y: 620, width: 230, z: 8 },
] as const;

function stackBounds(places: readonly { x: number; y: number; width: number }[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const place of places) {
    minX = Math.min(minX, place.x);
    minY = Math.min(minY, place.y);
    maxX = Math.max(maxX, place.x + place.width);
    maxY = Math.max(maxY, place.y + place.width * 1.28);
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
}

const stackOrigin = stackBounds(stackLocal);
const STACK_SHIFT_X = CANVAS_WIDTH / 2 - stackOrigin.x;
const STACK_SHIFT_Y = CANVAS_HEIGHT / 2 - stackOrigin.y;

const placements = stackLocal.map((place) => ({
  ...place,
  x: place.x + STACK_SHIFT_X,
  y: place.y + STACK_SHIFT_Y,
}));

type PieceWithPlace = {
  piece: Piece;
  place: (typeof placements)[number];
};

const pieces: PieceWithPlace[] = gallery.flatMap((piece, index) => {
  const place = placements[index];
  return place ? [{ piece, place }] : [];
});

type PieceLayout = {
  src: string;
  x: number;
  y: number;
  z: number;
  width: number;
};

const initialLayouts: PieceLayout[] = pieces.map(({ piece, place }) => ({
  src: piece.src,
  x: place.x,
  y: place.y,
  z: place.z,
  width: place.width,
}));

function clusterCenter() {
  const bounds = stackBounds(placements);
  return { x: bounds.x, y: bounds.y };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function panRange(size: number, view: number) {
  if (size + PAN_PAD * 2 <= view) {
    const centered = (view - size) / 2;
    return { min: centered, max: centered };
  }
  return { min: view - size - PAN_PAD, max: PAN_PAD };
}

function constrainPan(x: number, y: number, zoom: number) {
  const viewW = window.innerWidth / zoom;
  const viewH = window.innerHeight / zoom;
  const rangeX = panRange(CANVAS_WIDTH, viewW);
  const rangeY = panRange(CANVAS_HEIGHT, viewH);
  return {
    x: clamp(x, rangeX.min, rangeX.max),
    y: clamp(y, rangeY.min, rangeY.max),
  };
}

function placeHoverLabel(node: HTMLElement, x: number, y: number) {
  const pad = 12;
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  let left = x + 16;
  let top = y + 18;
  if (left + width > window.innerWidth - pad) left = x - width - 12;
  if (top + height > window.innerHeight - pad) top = y - height - 12;
  node.style.transform = `translate3d(${Math.max(pad, left)}px, ${Math.max(pad, top)}px, 0)`;
}

function wheelDelta(event: WheelEvent) {
  let { deltaX, deltaY } = event;
  if (event.deltaMode === 1) {
    deltaX *= 16;
    deltaY *= 16;
  } else if (event.deltaMode === 2) {
    deltaX *= window.innerWidth;
    deltaY *= window.innerHeight;
  }
  return { x: deltaX, y: deltaY };
}

export const FloatingGallery = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const zoom = useRef(1);
  const gestureScale = useRef(1);
  const rafId = useRef(0);
  const lastFrame = useRef(0);
  const layoutsRef = useRef<PieceLayout[]>(
    initialLayouts.map((layout) => ({ ...layout }))
  );
  const topZ = useRef(Math.max(...initialLayouts.map((layout) => layout.z)) + 1);
  const drag = useRef<{
    pointerId: number;
    lastX: number;
    lastY: number;
    moved: boolean;
    target: EventTarget | null;
    mode: 'pan' | 'piece';
    src?: string;
  } | null>(null);
  const [layouts, setLayouts] = useState(initialLayouts);
  const [active, setActive] = useState<Piece | null>(null);
  const [hovered, setHovered] = useState<Piece | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const ignoreClick = useRef(false);
  const closeArmed = useRef(false);
  const hoverLabelRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const driftRaf = useRef(0);
  const pieceDrift = useRef(new Map<string, { x: number; y: number }>());
  const activeRef = useRef(active);
  activeRef.current = active;

  const layoutFor = (src: string) =>
    layouts.find((layout) => layout.src === src) ??
    layoutsRef.current.find((layout) => layout.src === src);

  const applyPieceLayout = useCallback((layout: PieceLayout) => {
    const world = worldRef.current;
    if (!world) return;
    world.querySelectorAll(`[data-piece="${CSS.escape(layout.src)}"]`).forEach((node) => {
      const element = node as HTMLElement;
      element.style.left = `${layout.x}px`;
      element.style.top = `${layout.y}px`;
      element.style.zIndex = String(layout.z);
    });
  }, []);

  const applyTransform = useCallback(() => {
    const node = worldRef.current;
    if (!node) return;
    const z = zoom.current;
    node.style.transformOrigin = '0 0';
    node.style.transform = `translate3d(${pos.current.x * z}px, ${pos.current.y * z}px, 0) scale(${z})`;
  }, []);

  const stopLoop = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = 0;
    lastFrame.current = 0;
  }, []);

  const applyPieceDrift = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
      .matches;
    const draggingSrc =
      drag.current?.mode === 'piece' ? drag.current.src : undefined;
    const z = zoom.current;
    const cursorX = mouse.current.x / z - pos.current.x;
    const cursorY = mouse.current.y / z - pos.current.y;

    world.querySelectorAll('[data-piece]').forEach((node) => {
      const element = node as HTMLElement;
      const src = element.dataset.piece;
      if (!src) return;

      let drift = pieceDrift.current.get(src);
      if (!drift) {
        drift = { x: 0, y: 0 };
        pieceDrift.current.set(src, drift);
      }

      if (
        reduceMotion ||
        !finePointer ||
        activeRef.current ||
        src === draggingSrc
      ) {
        drift.x += (0 - drift.x) * 0.12;
        drift.y += (0 - drift.y) * 0.12;
      } else {
        const layout = layoutsRef.current.find((item) => item.src === src);
        const depth = Number(element.dataset.depth) || 0.6;
        const centerX = (layout?.x ?? 0) + (layout?.width ?? 0) / 2;
        const centerY = (layout?.y ?? 0) + (layout?.width ?? 0) * 0.62;
        const nextX = clamp(
          (cursorX - centerX) * DRIFT_PULL * depth,
          -DRIFT_MAX,
          DRIFT_MAX
        );
        const nextY = clamp(
          (cursorY - centerY) * DRIFT_PULL * depth,
          -DRIFT_MAX,
          DRIFT_MAX
        );
        drift.x += (nextX - drift.x) * 0.09;
        drift.y += (nextY - drift.y) * 0.09;
      }

      if (Math.abs(drift.x) < 0.05 && Math.abs(drift.y) < 0.05) {
        drift.x = 0;
        drift.y = 0;
        element.style.transform = '';
        return;
      }

      element.style.transform = `translate3d(${drift.x}px, ${drift.y}px, 0) rotate(${drift.x * 0.055}deg)`;
    });
  }, []);

  const zoomAt = useCallback(
    (clientX: number, clientY: number, nextZoom: number) => {
      const currentZoom = zoom.current;
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
      if (clamped === currentZoom) return;

      stopLoop();
      const worldX = clientX / currentZoom - pos.current.x;
      const worldY = clientY / currentZoom - pos.current.y;
      const next = constrainPan(
        clientX / clamped - worldX,
        clientY / clamped - worldY,
        clamped
      );
      pos.current = next;
      targetPos.current = { ...next };
      zoom.current = clamped;
      applyTransform();
    },
    [applyTransform, stopLoop]
  );

  const stepLoop = useCallback(
    (time: number) => {
      const prev = lastFrame.current || time;
      lastFrame.current = time;
      const dt = Math.min(32, time - prev);
      const smoothing = 1 - Math.exp(-dt * 0.038);

      pos.current.x += (targetPos.current.x - pos.current.x) * smoothing;
      pos.current.y += (targetPos.current.y - pos.current.y) * smoothing;
      applyTransform();

      const remainX = targetPos.current.x - pos.current.x;
      const remainY = targetPos.current.y - pos.current.y;
      if (remainX * remainX + remainY * remainY > 0.04) {
        rafId.current = requestAnimationFrame(stepLoop);
        return;
      }

      pos.current.x = targetPos.current.x;
      pos.current.y = targetPos.current.y;
      applyTransform();
      rafId.current = 0;
      lastFrame.current = 0;
    },
    [applyTransform]
  );

  const panTo = useCallback(
    (x: number, y: number, immediate = false) => {
      const next = constrainPan(x, y, zoom.current);
      targetPos.current = next;
      if (
        immediate ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        pos.current = { ...next };
        stopLoop();
        applyTransform();
        return;
      }
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(stepLoop);
      }
    },
    [applyTransform, stepLoop, stopLoop]
  );

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pile = clusterCenter();
    const start = constrainPan(
      window.innerWidth / 2 - pile.x,
      window.innerHeight / 2 - pile.y,
      zoom.current
    );
    pos.current = start;
    targetPos.current = { ...start };
    applyTransform();

    const tickDrift = () => {
      applyPieceDrift();
      driftRaf.current = requestAnimationFrame(tickDrift);
    };
    driftRaf.current = requestAnimationFrame(tickDrift);

    return () => {
      stopLoop();
      if (driftRaf.current) cancelAnimationFrame(driftRaf.current);
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, [applyPieceDrift, applyTransform, stopLoop]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const onWheel = (event: WheelEvent) => {
      if (active) return;
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        const factor = Math.exp(-event.deltaY * 0.01);
        zoomAt(event.clientX, event.clientY, zoom.current * factor);
        return;
      }

      const delta = wheelDelta(event);
      const z = zoom.current;
      panTo(
        targetPos.current.x - delta.x / z,
        targetPos.current.y - delta.y / z
      );
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });

    const onGestureStart = (event: Event) => {
      event.preventDefault();
      gestureScale.current = 1;
    };
    const onGestureChange = (event: Event) => {
      if (active) return;
      event.preventDefault();
      const gesture = event as Event & {
        scale: number;
        clientX: number;
        clientY: number;
      };
      const factor = gesture.scale / (gestureScale.current || 1);
      gestureScale.current = gesture.scale;
      zoomAt(gesture.clientX, gesture.clientY, zoom.current * factor);
    };

    viewport.addEventListener('gesturestart', onGestureStart);
    viewport.addEventListener('gesturechange', onGestureChange);

    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('gesturestart', onGestureStart);
      viewport.removeEventListener('gesturechange', onGestureChange);
    };
  }, [active, panTo, zoomAt]);

  useEffect(() => {
    if (!active) return undefined;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeArmed.current = true;
        setActive(null);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active) return;
      if (
        event.key === '+' ||
        event.key === '=' ||
        event.key === '-' ||
        event.key === '_'
      ) {
        event.preventDefault();
        const direction =
          event.key === '+' || event.key === '=' ? 1.14 : 1 / 1.14;
        zoomAt(window.innerWidth / 2, window.innerHeight / 2, zoom.current * direction);
        return;
      }
      const step = (event.shiftKey ? 80 : 40) / zoom.current;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        panTo(targetPos.current.x + step, targetPos.current.y);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        panTo(targetPos.current.x - step, targetPos.current.y);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        panTo(targetPos.current.x, targetPos.current.y + step);
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        panTo(targetPos.current.x, targetPos.current.y - step);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, panTo, zoomAt]);

  const openPiece = useCallback((piece: Piece) => {
    closeArmed.current = false;
    setHovered(null);
    setActive(piece);
    window.setTimeout(() => {
      closeArmed.current = true;
    }, 80);
  }, []);

  const closePiece = useCallback(() => {
    if (!closeArmed.current) return;
    setActive(null);
  }, []);

  useLayoutEffect(() => {
    if (!hovered || grabbing || active) return;
    if (hoverLabelRef.current) {
      placeHoverLabel(hoverLabelRef.current, mouse.current.x, mouse.current.y);
    }
  }, [hovered, grabbing, active]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (active) return;
    if (event.button !== 0) return;
    mouse.current.x = event.clientX;
    mouse.current.y = event.clientY;

    const pieceNode =
      event.target instanceof Element
        ? event.target.closest('[data-piece]')
        : null;
    const src = pieceNode?.getAttribute('data-piece') ?? undefined;
    const layout = src
      ? layoutsRef.current.find((item) => item.src === src)
      : undefined;

    if (src && layout) {
      topZ.current += 1;
      layout.z = topZ.current;
      applyPieceLayout(layout);
      drag.current = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
        moved: false,
        target: event.target,
        mode: 'piece',
        src,
      };
    } else {
      drag.current = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
        moved: false,
        target: event.target,
        mode: 'pan',
      };
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    stopLoop();
    targetPos.current = { ...pos.current };
    setGrabbing(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    mouse.current.x = event.clientX;
    mouse.current.y = event.clientY;
    if (hoverLabelRef.current && hovered && !grabbing) {
      placeHoverLabel(hoverLabelRef.current, event.clientX, event.clientY);
    }

    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const dx = event.clientX - current.lastX;
    const dy = event.clientY - current.lastY;
    if (!current.moved && Math.hypot(dx, dy) > PAN_THRESHOLD) {
      current.moved = true;
    }
    if (!current.moved) return;

    current.lastX = event.clientX;
    current.lastY = event.clientY;

    if (current.mode === 'piece' && current.src) {
      const layout = layoutsRef.current.find((item) => item.src === current.src);
      if (!layout) return;
      const z = zoom.current;
      layout.x += dx / z;
      layout.y += dy / z;
      applyPieceLayout(layout);
      return;
    }

    const z = zoom.current;
    panTo(pos.current.x + dx / z, pos.current.y + dy / z, true);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const shouldOpen = !current.moved;
    const target = current.target;
    drag.current = null;
    setGrabbing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setLayouts(layoutsRef.current.map((layout) => ({ ...layout })));
    if (current.moved) {
      ignoreClick.current = true;
      return;
    }
    if (!shouldOpen || !(target instanceof Element)) return;
    const src = target.closest('[data-piece]')?.getAttribute('data-piece');
    const match = pieces.find((entry) => entry.piece.src === src);
    if (match) {
      ignoreClick.current = true;
      openPiece(match.piece);
    }
  };

  return (
    <div className="gallery-artboard fixed inset-0 z-20 overflow-hidden">
      <h1 className="sr-only">Explore my art</h1>

      <div
        ref={viewportRef}
        className={`absolute inset-0 touch-none overscroll-none ${
          grabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={worldRef}
          className="absolute top-0 left-0 origin-top-left transform-gpu will-change-transform"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
          }}
        >
          {pieces.map(({ piece, place }, index) => {
            const layout = layoutFor(piece.src);
            const x = layout?.x ?? place.x;
            const y = layout?.y ?? place.y;
            const z = layout?.z ?? index + 1;

            return (
              <button
                key={piece.src}
                type="button"
                data-piece={piece.src}
                data-depth={0.62 + (index % 5) * 0.1}
                tabIndex={0}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'touch' || grabbing || active) return;
                  setHovered(piece);
                }}
                onPointerLeave={() => {
                  setHovered((current) => (current?.src === piece.src ? null : current));
                }}
                onClick={() => {
                  if (ignoreClick.current) {
                    ignoreClick.current = false;
                    return;
                  }
                  openPiece(piece);
                }}
                aria-label={`${piece.name.trim()}, ${piece.date}`}
                className="group absolute cursor-grab border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E66001]"
                style={{
                  left: x,
                  top: y,
                  width: place.width,
                  zIndex: hovered?.src === piece.src ? 200 : z,
                }}
              >
                <span className="relative block">
                  <Image
                    src={piece.src}
                    alt={piece.name.trim()}
                    width={place.width * 2}
                    height={Math.round(place.width * 2.5)}
                    sizes={`${place.width}px`}
                    priority={index < 5}
                    className="h-auto w-full origin-center select-none transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 [@media(hover:hover)]:group-hover:scale-[1.08] group-focus-visible:scale-[1.08]"
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                  />
                </span>
                <span className="mt-2 block font-campton text-[11px] leading-tight text-[#8A8A8A] transition-colors duration-200 group-hover:text-[#353F50] group-focus-visible:text-[#353F50]">
                  {piece.name.trim()}
                  <span className="text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#6B6B6B] group-focus-visible:text-[#6B6B6B]">
                    {' '}
                    · {piece.date}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-40">
        <div className="pointer-events-auto absolute top-5 left-5 sm:top-8 sm:left-8">
          <Link
            href="/gallery"
            className="font-campton text-xs text-[#8A8A8A] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          >
            ← Artworks
          </Link>
          <p className="mt-1 font-campton text-sm font-medium text-[#353F50] sm:text-base">
            Explore my art
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 font-campton text-[11px] tracking-wide text-[#8A8A8A] uppercase lg:bottom-7">
          <MoveHintIcon />
          Scroll / drag to move · Pinch or + − to zoom
        </div>
      </div>

      {hovered && !grabbing && !active ? (
        <div
          ref={hoverLabelRef}
          className="pointer-events-none fixed top-0 left-0 z-[60] rounded-sm bg-[#F3F1EC]/92 px-2 py-1 font-campton text-xs leading-tight text-[#353F50] shadow-[0_1px_2px_rgba(40,32,24,0.08)]"
        >
          {hovered.name.trim()}
          <span className="text-[#8A8A8A]"> · {hovered.date}</span>
        </div>
      ) : null}

      {active
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={active.name.trim()}
              className="fixed inset-0 z-[200] flex cursor-auto items-center justify-center bg-[#F3F1EC]/94 p-6"
              onClick={closePiece}
            >
              <button
                type="button"
                autoFocus
                onClick={(event) => {
                  event.stopPropagation();
                  closeArmed.current = true;
                  closePiece();
                }}
                className="absolute right-6 top-6 min-h-11 min-w-11 font-campton text-sm text-[#5C5C5C] transition-colors hover:text-[#E66001]"
              >
                Close
              </button>
              <figure
                className="flex max-h-[90vh] w-full max-w-[min(90vw,720px)] flex-col items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={active.src}
                  alt={active.name.trim()}
                  className="max-h-[78vh] w-auto max-w-full object-contain"
                />
                <figcaption className="self-start font-campton text-sm text-[#8A8A8A]">
                  {active.name.trim()}
                  <span className="text-[#B3B3B3]"> · {active.date}</span>
                </figcaption>
              </figure>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

function MoveHintIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 1.2V12.8M7 1.2L5.2 3M7 1.2L8.8 3M7 12.8L5.2 11M7 12.8L8.8 11M1.2 7H12.8M1.2 7L3 5.2M1.2 7L3 8.8M12.8 7L11 5.2M12.8 7L11 8.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
