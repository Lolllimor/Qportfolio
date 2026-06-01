import type { Metadata } from 'next';

import { getCanonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Payment Successful — Twenty II',
  alternates: {
    canonical: getCanonicalUrl('/twenty-ii/payment-success'),
  },
  robots: { index: false, follow: false },
};

export default function PaymentSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
