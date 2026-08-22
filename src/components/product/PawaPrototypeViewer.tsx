'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/icons/arrow-right-o';
import { IphoneFrame, PROTOTYPE_HEIGHT, PROTOTYPE_WIDTH } from './IphoneFrame';

const TENANT_URL = 'https://pawa-khaki.vercel.app';
const LANDLORD_URL = 'https://pawa-admin-lilac.vercel.app';

function ViewSwitch({
  view,
  onChange,
}: {
  view: 'tenant' | 'landlord';
  onChange: (next: 'tenant' | 'landlord') => void;
}) {
  return (
    <div>
      <p className="mb-2 font-campton text-xs text-[#5C5C5C]">Viewing</p>
      <div
        role="tablist"
        aria-label="Prototype"
        className="inline-flex rounded-full bg-[#F6F3F1] p-1"
      >
        {(
          [
            { id: 'tenant', label: 'Tenant' },
            { id: 'landlord', label: 'Landlord' },
          ] as const
        ).map((option) => {
          const selected = view === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(option.id)}
              className={`min-h-11 rounded-full px-4 font-campton text-sm transition-colors ${
                selected
                  ? 'bg-white text-[#353F50] shadow-sm'
                  : 'text-[#5C5C5C] hover:text-[#353F50]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PawaPrototypeViewer() {
  const [view, setView] = useState<'tenant' | 'landlord'>('tenant');
  const isTenant = view === 'tenant';

  return (
    <>
      <div className="my-10 hidden items-center gap-10 md:flex">
        <IphoneFrame>
          <iframe
            key={view}
            src={isTenant ? TENANT_URL : LANDLORD_URL}
            title={isTenant ? 'Pawa tenant prototype' : 'Pawa landlord prototype'}
            width={PROTOTYPE_WIDTH}
            height={PROTOTYPE_HEIGHT}
            loading="lazy"
            className="motion-reduce:hidden block"
            style={{
              width: PROTOTYPE_WIDTH,
              height: PROTOTYPE_HEIGHT,
              border: 'none',
              overflow: 'hidden',
            }}
          />
        </IphoneFrame>
        <ViewSwitch view={view} onChange={setView} />
      </div>
      <div className="my-8 flex max-w-[640px] flex-col items-start gap-3 md:hidden">
        <p className="font-campton text-xs text-[#5C5C5C]">Open on your phone</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={TENANT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-campton text-sm text-[#353F50] underline underline-offset-4 hover:text-[#E66001]"
          >
            Tenant app
            <ArrowRight />
          </a>
          <a
            href={LANDLORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-campton text-sm text-[#353F50] underline underline-offset-4 hover:text-[#E66001]"
          >
            Landlord dashboard
            <ArrowRight />
          </a>
        </div>
      </div>
    </>
  );
}
