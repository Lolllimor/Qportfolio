import { Geist, Geist_Mono, Lora, Montserrat } from 'next/font/google';

import { JsonLd } from '@/components/JsonLd';
import { getPersonJsonLd, rootMetadata } from '@/lib/seo';

import './globals.css';
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});
const barbra = localFont({
  src: [
    {
      path: '../../public/barbra-font/Barbra-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/barbra-font/Barbra-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/barbra-font/Barbra-High.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/barbra-font/Barbra-HighItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-barbra',
});

const longShot = localFont({
  src: [
    {
      path: '../../public/Long_Shot.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-long-shot',
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${lora.variable} ${barbra.variable} ${longShot.variable} antialiased`}
      >
        <JsonLd data={getPersonJsonLd()} />
        {children}
      </body>
    </html>
  );
}
