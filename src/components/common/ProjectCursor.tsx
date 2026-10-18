'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type ProjectCursorContextValue = {
  enabled: boolean;
};

const ProjectCursorContext = createContext<ProjectCursorContextValue | null>(
  null
);

export function useProjectCursor() {
  return useContext(ProjectCursorContext);
}

const CLICKABLE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-clickable]';

function isClickable(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  // Opt out — keep the default ring/dot (no "Open" state)
  if (target.closest('[data-cursor-normal]')) return false;
  const el = target.closest(CLICKABLE);
  if (!el) return false;
  if (el instanceof HTMLButtonElement && el.disabled) return false;
  if (el.getAttribute('aria-disabled') === 'true') return false;
  return true;
}

const expandEase = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
const textEase = { duration: 0.12, ease: 'easeOut' as const };

export function ProjectCursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringClickable, setHoveringClickable] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.65 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.65 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
      setHoveringClickable(isClickable(event.target));
    };

    const onLeave = () => {
      setVisible(false);
      setHoveringClickable(false);
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, mouseX, mouseY]);

  return (
    <ProjectCursorContext.Provider value={{ enabled }}>
      {children}
      {enabled && visible ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[10050] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#E66001]"
          style={{ x, y }}
          initial={false}
          animate={{
            width: hoveringClickable ? 56 : 18,
            height: hoveringClickable ? 56 : 18,
            backgroundColor: hoveringClickable ? '#E66001' : '#FFFFFF',
          }}
          transition={expandEase}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {hoveringClickable ? (
              <motion.span
                key="open"
                className="font-campton text-[11px] font-medium tracking-wide text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={textEase}
              >
                Open
              </motion.span>
            ) : (
              <motion.span
                key="dot"
                className="rounded-full bg-[#121212]"
                initial={{ opacity: 0, width: 4, height: 4 }}
                animate={{ opacity: 1, width: 10, height: 10 }}
                exit={{ opacity: 0, width: 4, height: 4 }}
                transition={expandEase}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </ProjectCursorContext.Provider>
  );
}

/** Kept for existing call sites — no hover animation. */
export function ProjectHoverZone({
  children,
}: {
  children: ReactNode;
  label?: string;
  disabled?: boolean;
}) {
  return <>{children}</>;
}
