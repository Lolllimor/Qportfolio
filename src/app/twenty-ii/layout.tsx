import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

import { createPageMetadata } from '@/lib/seo';
import { StepProvider } from '@/contexts/StepContext';

import '../globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const longShot = localFont({
  src: [
    {
      path: '../../../public/Long_Shot.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-long-shot',
});

export const metadata = createPageMetadata({
  title: 'Twenty II',
  description:
    'Twenty II — Restacking the Odds, a solo art exhibition by Quadri Morin exploring focus, courage, and inner transformation.',
  path: '/twenty-ii',
});

export default function TwentyTwoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${montserrat.variable} ${longShot.variable}`}>
      <StepProvider>{children}</StepProvider>
    </div>
  );
}
