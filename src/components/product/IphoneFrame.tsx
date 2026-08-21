import type { ReactNode } from 'react';
import Image from 'next/image';

export const PROTOTYPE_WIDTH = 390;
export const PROTOTYPE_HEIGHT = 844;
const SCREEN_W = 320;
const SCREEN_H = Math.round((PROTOTYPE_HEIGHT * SCREEN_W) / PROTOTYPE_WIDTH);
const FRAME_W = Math.round(SCREEN_W / (1 - 0.044));

function DynamicIsland() {
  return (
    <div
      className="pointer-events-none absolute top-[8px] left-1/2 z-20 w-[31%] -translate-x-1/2 rounded-full bg-black"
      style={{ aspectRatio: '126 / 36' }}
      aria-hidden="true"
    />
  );
}

function StatusBar() {
  return (
    <div className="relative flex h-9 shrink-0 items-center bg-white px-5">
      <span
        className="w-12 text-[13px] font-semibold text-black"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        9:41
      </span>
      <div className="flex-1" />
      <div className="flex w-12 justify-end text-black">
        <StatusBarIcons />
      </div>
    </div>
  );
}

function StatusBarIcons() {
  return (
    <div className="flex items-center gap-[3px]">
      <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true" className="h-[10px] w-auto">
        <rect x="0" y="7" width="3" height="5" rx="0.6" fill="currentColor" />
        <rect x="4.5" y="5" width="3" height="7" rx="0.6" fill="currentColor" />
        <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" fill="currentColor" />
        <rect x="13.5" y="0" width="3" height="12" rx="0.6" fill="currentColor" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="h-[10px] w-auto">
        <path
          d="M8 9.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm0-3.3c1.4 0 2.7.5 3.7 1.4l-1.1 1.1A3.6 3.6 0 0 0 8 7.7c-.9 0-1.8.3-2.5.8L4.4 7.4A5.3 5.3 0 0 1 8 6.3Zm0-3.3c2.3 0 4.4.9 6 2.4L12.9 6.5A6.7 6.7 0 0 0 8 4.6c-1.9 0-3.6.7-4.9 1.9L1.9 5.4A8.6 8.6 0 0 1 8 3Z"
          fill="currentColor"
        />
      </svg>
      <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden="true" className="h-[11px] w-auto">
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="12"
          rx="3.2"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
        />
        <rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" />
        <path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}

function DeviceShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full" style={{ containerType: 'inline-size' }}>
      <div className="absolute top-[14%] left-[-3px] h-[5%] w-[3px] rounded-l-sm bg-[#3A3A3C]" />
      <div className="absolute top-[20%] left-[-3px] h-[8%] w-[3px] rounded-l-sm bg-[#3A3A3C]" />
      <div className="absolute top-[29%] left-[-3px] h-[8%] w-[3px] rounded-l-sm bg-[#3A3A3C]" />
      <div className="absolute top-[22%] right-[-3px] h-[10%] w-[3px] rounded-r-sm bg-[#3A3A3C]" />
      <div
        className="overflow-hidden"
        style={{
          padding: '2.2cqi',
          borderRadius: '11cqi',
          background: '#1C1C1E',
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1.5px #3A3A3C',
        }}
      >
        <div
          className="relative overflow-hidden bg-white"
          style={{ borderRadius: '8.8cqi' }}
        >
          {children}
          <DynamicIsland />
        </div>
      </div>
    </div>
  );
}

export function IphoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: FRAME_W }}>
      <DeviceShell>
        <StatusBar />
        <div
          className="relative overflow-hidden"
          style={{ width: SCREEN_W, height: SCREEN_H }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{
              width: PROTOTYPE_WIDTH,
              height: PROTOTYPE_HEIGHT,
              transform: `scale(${SCREEN_W / PROTOTYPE_WIDTH})`,
            }}
          >
            {children}
          </div>
        </div>
        <div className="flex h-4 items-end justify-center bg-white pb-1.5">
          <div className="h-[4px] w-[34%] rounded-full bg-black/25" />
        </div>
      </DeviceShell>
    </div>
  );
}

export function PhoneScreenImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <DeviceShell>
      <Image
        src={src}
        alt={alt}
        width={473}
        height={1024}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        className="h-auto w-full"
      />
    </DeviceShell>
  );
}
