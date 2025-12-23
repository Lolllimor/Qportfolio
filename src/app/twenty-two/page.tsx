'use client';

import { RecognizePage } from '@/components/twenty-two/RecognizePage';
import { ReavealPage } from '@/components/twenty-two/ReavealPage';
import { FuturePage } from '@/components/twenty-two/FuturePage';
import LandingPage from '@/components/twenty-two/LandingPage';
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
