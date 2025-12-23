'use client';

import { useEffect, useState, useRef } from 'react';

interface CurtainTransitionProps {
  isActive: boolean;
  onTransitionComplete: () => void;
  color?: string;
  onOpen?: boolean;
}

export const CurtainTransition = ({
  isActive,
  onTransitionComplete,
  color = '#111112',
  onOpen = false,
}: CurtainTransitionProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/sound.wav');
    audioRef.current.volume = 0.5; // Set volume to 50%

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Determine initial state: if we have onOpen prop (opening phase), start closed, otherwise hidden
  const getInitialState = (): 'hidden' | 'closing' | 'closed' | 'opening' => {
    if (isActive) return 'hidden'; // Will transition to closing
    if (onOpen !== undefined) return onOpen ? 'opening' : 'closed'; // Opening phase: closed or opening
    return 'hidden'; // Default: hidden
  };

  const [curtainState, setCurtainState] = useState<
    'hidden' | 'closing' | 'closed' | 'opening'
  >(getInitialState());

  useEffect(() => {
    if (isActive && curtainState === 'hidden') {
      setCurtainState('closing');

      if (audioRef.current) {
        audioRef.current.currentTime = 2;
        audioRef.current.play().catch((error) => {
          console.warn('Audio play failed:', error);
        });
      }

      const closeTimer = setTimeout(() => {
        setCurtainState('closed');
        onTransitionComplete();
      }, 800);

      return () => clearTimeout(closeTimer);
    }
  }, [isActive, onTransitionComplete, curtainState]);

  useEffect(() => {
    if (onOpen && curtainState === 'closed') {
      // Start opening the curtain
      setCurtainState('opening');

      // Play sound when curtain starts opening
      if (audioRef.current) {
        audioRef.current.currentTime = 1; // Start from 1 second
        audioRef.current.play().catch((error) => {
          console.warn('Audio play failed:', error);
        });
      }

      const openTimer = setTimeout(() => {
        setCurtainState('hidden');
      }, 1200);

      return () => clearTimeout(openTimer);
    }
  }, [onOpen, curtainState]);

  const getTransform = () => {
    if (curtainState === 'closing' || curtainState === 'closed') {
      return 'translateY(0%)'; // Curtain covers screen
    }
    return 'translateY(-100%)'; // Curtain hidden above
  };

  if (curtainState === 'hidden' && !isActive && !onOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
      <div
        className="w-full h-full"
        style={{
          backgroundColor: color,
          transform: getTransform(),
          transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
};
