'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/icons/arrow-right-o';
import { IphoneFrame, PROTOTYPE_HEIGHT, PROTOTYPE_WIDTH } from './IphoneFrame';

const TENANT_URL = 'https://pawa-khaki.vercel.app';
const LANDLORD_URL = 'https://pawa-admin-lilac.vercel.app';

function PrototypeOption({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-h-11 items-baseline gap-2 bg-transparent p-0 text-left font-campton text-base ${
        active
          ? 'text-[#E66001]'
          : 'text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]'
      }`}
    >
      {label}
      {active ? (
        <span className="font-campton text-xs font-normal text-[#5C5C5C] no-underline">
          Currently viewing
        </span>
      ) : null}
    </button>
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
        <div className="flex flex-col gap-4">
          <PrototypeOption
            label="Tenant app"
            active={isTenant}
            onSelect={() => setView('tenant')}
          />
          <PrototypeOption
            label="Landlord dashboard"
            active={!isTenant}
            onSelect={() => setView('landlord')}
          />
        </div>
      </div>
      <div className="my-8 flex max-w-[640px] flex-col items-start gap-4 md:hidden">
        <a
          href={TENANT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1C1816] px-6 font-campton text-base text-white"
        >
          Open tenant app
          <ArrowRight color="#FFFFFF" />
        </a>
        <a
          href={LANDLORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-campton text-base text-[#353F50]"
        >
          Open landlord dashboard
          <ArrowRight />
        </a>
      </div>
    </>
  );
}
