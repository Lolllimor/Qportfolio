'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { siteConfig } from '@/lib/site';

const STUDY_PATH = '/product/parking-companion';
const MAILTO = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  'Password for the Interswitch case study'
)}&body=${encodeURIComponent(
  'Hi Quadri,\n\nCould you send me the password for the Interswitch mobile app case study?\n'
)}`;

export function LockedStudy() {
  const router = useRouter();
  return <CaseStudyGate open onClose={() => router.push('/product')} />;
}

export function CaseStudyGate({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const titleId = useId();
  const passwordId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);

    try {
      const response = await fetch('/api/case-studies/interswitch/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('That password isn’t right.');
        return;
      }

      if (pathname === STUDY_PATH) {
        onClose();
        router.refresh();
      } else {
        router.push(STUDY_PATH);
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[10050] flex items-end justify-center px-4 py-6 sm:items-center sm:px-6">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#353F50]/40"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(53,63,80,0.16)] outline-none"
      >
        <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
          Interswitch · Mobile App
        </p>
        <h2
          id={titleId}
          className="mt-2 font-apple-garamond text-[28px] leading-snug font-normal text-[#353F50]"
        >
          This case study is private
        </h2>
        <p className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
          Email me and I’ll send you the password.
        </p>
        <a
          href={MAILTO}
          data-cursor-normal
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-5 font-campton text-sm text-[#353F50] no-underline transition-[color,background-color] duration-200 hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
        >
          Send a mail
        </a>

        <form onSubmit={onSubmit} className="mt-6">
          <label
            htmlFor={passwordId}
            className="font-campton text-sm text-[#353F50]"
          >
            Password
          </label>
          <input
            id={passwordId}
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-[#F0F0F0] bg-white px-4 py-3 font-campton text-base text-[#353F50] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          />
          {error ? (
            <p className="mt-2 font-campton text-sm text-[#E66001]" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            data-cursor-normal
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#353F50] px-5 font-campton text-sm text-white transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001] active:scale-[0.98] disabled:opacity-60 motion-reduce:active:scale-100"
          >
            {pending ? 'Checking…' : 'Open case study'}
          </button>
        </form>
      </div>
    </div>
  );
}
