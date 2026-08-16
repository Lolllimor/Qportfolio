'use client';

import { RecognizePage } from '@/components/twenty-ii/RecognizePage';
import { ReavealPage } from '@/components/twenty-ii/ReavealPage';
import { FuturePage } from '@/components/twenty-ii/FuturePage';
import LandingPage from '@/components/twenty-ii/LandingPage';
import { useStep } from '@/contexts/StepContext';

export default function TwentyTwoPage() {
  const { step } = useStep();
  return (
    <>
      {step === 2 && <RecognizePage />}
      {step === 0 && <LandingPage />}
      {step === 1 && <ReavealPage />}
      {step === 3 && <FuturePage />}
    </>
  );
}
