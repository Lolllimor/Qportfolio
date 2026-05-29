import { createPageMetadata } from '@/lib/seo';

import '../globals.css';
import { StepProvider } from '@/contexts/StepContext';

export const metadata = createPageMetadata({
  title: 'Twenty II',
  description: 'Restacking the odds — an art exhibition by Quadri Morin.',
  path: '/twenty-ii',
});

export default function TwentyTwoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StepProvider>{children}</StepProvider>;
}
