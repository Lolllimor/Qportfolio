'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import type { Artwork } from '@/types';

const ANGLE_STEP = 18;
const VISIBLE_SPAN = 4;
const DRAG_SENSITIVITY = 0.018;

type ArtworkCoverFlowProps = {
  artworks: Artwork[];
};

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function shortestOffset(from: number, to: number, length: number) {
  let offset = to - from;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function useCarouselRadius() {
  const [radius, setRadius] = useState(520);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setRadius(300);
      else if (width < 1024) setRadius(420);
      else setRadius(520);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return radius;
}

export default function ArtworkCoverFlow({ artworks }: ArtworkCoverFlowProps) {
  const router = useRouter();
  const radius = useCarouselRadius();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragBaseOffset = useRef(0);
  const dragOffsetRef = useRef(0);
  const didDrag = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  const isDraggingRef = useRef(false);
  const wheelLock = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [artworks]);

  const count = artworks.length;
  const visualIndex = activeIndex + dragOffset;

  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      setActiveIndex(wrapIndex(next, count));
      setDragOffset(0);
      dragOffsetRef.current = 0;
      setHasInteracted(true);
    },
    [count]
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);
    didDrag.current = false;
    dragStartX.current = event.clientX;
    dragBaseOffset.current = dragOffsetRef.current;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 6) didDrag.current = true;
    const next = dragBaseOffset.current - delta * DRAG_SENSITIVITY;
    dragOffsetRef.current = next;
    setDragOffset(next);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // already released
    }
    setIsDragging(false);
    goTo(Math.round(activeIndexRef.current + dragOffsetRef.current));
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !count) return;

    const onWheel = (event: WheelEvent) => {
      const dominant =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (Math.abs(dominant) < 4) return;
      event.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      goTo(activeIndexRef.current + (dominant > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 280);
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [count, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!count) return;
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeIndexRef.current - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(activeIndexRef.current + 1);
      } else if (
        event.key === 'Enter' &&
        stageRef.current?.contains(document.activeElement)
      ) {
        const artwork = artworks[activeIndexRef.current];
        if (artwork) {
          router.push(
            `/twenty-ii/artworks/${artwork.documentId || artwork.id}`
          );
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [artworks, count, goTo, router]);

  if (!count) return null;

  const activeArtwork = artworks[wrapIndex(Math.round(visualIndex), count)];

  return (
    <div className="relative w-full select-none">
      <div
        ref={stageRef}
        role="listbox"
        aria-label="Artwork collection carousel"
        aria-activedescendant={
          activeArtwork
            ? `artwork-slide-${activeArtwork.documentId || activeArtwork.id}`
            : undefined
        }
        tabIndex={0}
        className="relative mx-auto h-[440px] w-full touch-none outline-none cursor-grab active:cursor-grabbing md:h-[540px] xl:h-[600px]"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 38%' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
        >
          {artworks.map((artwork, index) => {
            const offset = shortestOffset(visualIndex, index, count);
            if (Math.abs(offset) > VISIBLE_SPAN + 0.6) return null;

            const angle = offset * ANGLE_STEP;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius - radius;
            const abs = Math.abs(offset);
            const opacity = Math.max(0, 1 - abs * 0.18);
            const isCenter = abs < 0.45;
            const href = `/twenty-ii/artworks/${artwork.documentId || artwork.id}`;
            const medium =
              artwork.tags?.filter(Boolean).slice(0, 2).join(' · ') ||
              'Digital artwork';

            return (
              <div
                key={artwork.documentId || artwork.id}
                id={`artwork-slide-${artwork.documentId || artwork.id}`}
                role="option"
                aria-selected={isCenter}
                className="absolute left-1/2 top-[6%] w-[180px] sm:w-[200px] md:w-[240px] xl:w-[280px]"
                style={{
                  transform: `translateX(-50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity,
                  zIndex: Math.round(100 - abs * 10),
                  transition: isDragging
                    ? 'none'
                    : 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease',
                  pointerEvents: abs > VISIBLE_SPAN ? 'none' : 'auto',
                }}
              >
                <button
                  type="button"
                  className="group w-full bg-transparent p-0 text-left"
                  onClick={() => {
                    if (didDrag.current) return;
                    if (isCenter) {
                      if (
                        String(artwork.documentId || '').startsWith('preview-')
                      ) {
                        return;
                      }
                      router.push(href);
                      return;
                    }
                    goTo(index);
                  }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2F2F2] shadow-[0_18px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                    {artwork.art?.url ? (
                      <Image
                        src={artwork.art.url}
                        alt={artwork.Title}
                        fill
                        sizes="(max-width: 768px) 200px, (max-width: 1280px) 240px, 280px"
                        unoptimized
                        className="object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="h-full w-full bg-[#E8E8E8]" />
                    )}
                    {artwork.BoughtBy && (
                      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 overflow-hidden">
                        <div className="absolute top-5 -right-8 rotate-45 bg-[#E3591C] px-10 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
                          Sold
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-3 text-center font-montserrat transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    <p className="text-sm italic text-black md:text-base">
                      {artwork.Title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#5C5C5C] md:text-sm">
                      {artwork.Year}
                    </p>
                    <p className="text-[11px] text-[#8A8A8A] md:text-xs">
                      {medium}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {!hasInteracted && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 animate-pulse text-center font-montserrat text-xs text-[#5C5C5C] md:text-sm">
            Drag to browse
          </div>
        )}
      </div>

      {activeArtwork && (
        <div className="mx-auto mt-2 flex max-w-md flex-col items-center gap-4 px-6 text-center font-montserrat">
          <p className="text-sm text-[#5C5C5C] md:text-base">
            ₦{' '}
            {Number(activeArtwork.Price).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            {activeArtwork.BoughtBy ? ' · Sold' : ''}
          </p>
          {!String(activeArtwork.documentId || '').startsWith('preview-') && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/twenty-ii/artworks/${activeArtwork.documentId || activeArtwork.id}`
                )
              }
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[0.98] md:text-base"
            >
              View artwork
            </button>
          )}
          <p className="text-xs text-[#8A8A8A]">
            {wrapIndex(Math.round(visualIndex), count) + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );
}
