import type { Metadata } from 'next';

import '../globals.css';
import { StepProvider } from '@/contexts/StepContext';

export const metadata: Metadata = {
  title: 'Twenty II',
  description: 'Restacking the odds',
};

export default function TwentyTwoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StepProvider>{children}</StepProvider>;
}
