'use client';

import { useEffect, useState } from 'react';

import { getCanonicalUrl } from '@/lib/site';

const buttonClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-4 font-campton text-sm leading-none text-[#353F50] no-underline transition-colors hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]';

export function ArticleShare({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const url = getCanonicalUrl(path);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === 'function');
  }, []);

  async function copyLink() {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText(url);
      didCopy = true;
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      didCopy = document.execCommand('copy');
      input.remove();
    }

    if (!didCopy) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // The visitor dismissed the share sheet.
    }
  }

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="mt-6 flex max-w-[640px] flex-wrap items-center gap-2">
      <span className="mr-1 font-campton text-xs text-[#5C5C5C]">Share</span>
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        LinkedIn
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        X
      </a>
      {canNativeShare ? (
        <button type="button" onClick={nativeShare} className={buttonClass}>
          More
        </button>
      ) : null}
    </div>
  );
}
