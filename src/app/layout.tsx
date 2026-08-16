import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { JsonLd } from '@/components/JsonLd';
import { getPersonJsonLd, rootMetadata } from '@/lib/seo';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const campton = localFont({
  src: [
    {
      path: '../../public/fonts/CamptonBook.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CamptonMedium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CamptonSemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-campton',
  display: 'swap',
});

const appleGaramond = localFont({
  src: [
    {
      path: '../../public/fonts/AppleGaramond.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-apple-garamond',
  display: 'swap',
});

const appleGaramondLight = localFont({
  src: [
    {
      path: '../../public/fonts/AppleGaramond-Light.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-apple-garamond-light',
  display: 'swap',
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
  display: 'swap',
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
        className={`${geistSans.variable} ${geistMono.variable} ${campton.variable} ${appleGaramond.variable} ${appleGaramondLight.variable} ${barbra.variable} antialiased`}
      >
        <JsonLd data={getPersonJsonLd()} />
        {children}
      </body>
    </html>
  );
}
