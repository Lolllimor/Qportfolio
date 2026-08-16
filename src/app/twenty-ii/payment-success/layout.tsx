import type { Metadata } from 'next';

import { getCanonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Payment Successful — Twenty II',
  description: 'Your Twenty II artwork payment was successful.',
  alternates: {
    canonical: getCanonicalUrl('/twenty-ii/payment-success'),
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Payment Successful — Twenty II',
    description: 'Your Twenty II artwork payment was successful.',
    url: getCanonicalUrl('/twenty-ii/payment-success'),
  },
};

export default function PaymentSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
