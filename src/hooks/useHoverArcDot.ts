'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

const DOT_SIZE = 6;
const DOT_GAP = 8;
const MIN_ARC_MS = 380;
const MS_PER_HOP = 140;
const MIN_ARC_RADIUS = 14;
const MAX_ARC_RADIUS = 28;

export const hoverArcDotStyle = {
  size: DOT_SIZE,
  gap: DOT_GAP,
} as const;

export function useHoverArcDot(itemCount: number) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const groupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const prevHoverIndex = useRef<number | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const dotOpacity = useMotionValue(0);

  const setItemRef = useCallback((index: number, node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  }, []);

  const measureDotAbove = useCallback((index: number) => {
    const group = groupRef.current;
    const item = itemRefs.current[index];
    if (!group || !item || index < 0) return null;

    const groupBox = group.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();

    return {
      x: itemBox.left - groupBox.left + (itemBox.width - DOT_SIZE) / 2,
      y: itemBox.top - groupBox.top - DOT_GAP - DOT_SIZE,
    };
  }, []);

  useLayoutEffect(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;

    if (hoveredIndex < 0 || hoveredIndex >= itemCount) {
      prevHoverIndex.current = null;
      controlsRef.current = animate(dotOpacity, 0, {
        duration: 0.18,
        ease: 'easeOut',
      });
      return () => {
        controlsRef.current?.stop();
        controlsRef.current = null;
      };
    }

    const target = measureDotAbove(hoveredIndex);
    if (!target) return;

    const prevIndex = prevHoverIndex.current;
    const shouldArc =
      prevIndex !== null && prevIndex >= 0 && prevIndex !== hoveredIndex;

    if (!shouldArc) {
      dotX.set(target.x);
      dotY.set(target.y);
      prevHoverIndex.current = hoveredIndex;
      controlsRef.current = animate(dotOpacity, 1, {
        duration: 0.2,
        ease: 'easeOut',
      });

      const settle = window.setTimeout(() => {
        if (prevHoverIndex.current !== hoveredIndex) return;
        const settled = measureDotAbove(hoveredIndex);
        if (!settled) return;
        animate(dotX, settled.x, { duration: 0.22, ease: 'easeOut' });
        animate(dotY, settled.y, { duration: 0.22, ease: 'easeOut' });
      }, 40);

      return () => {
        window.clearTimeout(settle);
        controlsRef.current?.stop();
        controlsRef.current = null;
      };
    }

    const from = {
      x: dotX.get(),
      y: dotY.get(),
    };
    const hops = Math.abs(hoveredIndex - prevIndex);
    const duration = (MIN_ARC_MS + hops * MS_PER_HOP) / 1000;
    const radius = Math.min(
      Math.max(Math.abs(target.x - from.x) / 2, MIN_ARC_RADIUS),
      MAX_ARC_RADIUS
    );

    dotOpacity.set(1);
    prevHoverIndex.current = hoveredIndex;

    controlsRef.current = animate(0, 1, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (t) => {
        dotX.set(
          from.x + (target.x - from.x) * ((1 - Math.cos(t * Math.PI)) / 2)
        );
        dotY.set(from.y - radius * Math.sin(t * Math.PI));
      },
      onComplete: () => {
        controlsRef.current = null;
        const settled = measureDotAbove(hoveredIndex);
        const end = settled ?? target;
        animate(dotX, end.x, { duration: 0.2, ease: 'easeOut' });
        animate(dotY, end.y, { duration: 0.2, ease: 'easeOut' });
      },
    });

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [hoveredIndex, itemCount, measureDotAbove, dotX, dotY, dotOpacity]);

  return {
    groupRef,
    setItemRef,
    setHoveredIndex,
    clearHover: () => setHoveredIndex(-1),
    hoveredIndex,
    dotX,
    dotY,
    dotOpacity,
  };
}
