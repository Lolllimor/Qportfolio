import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful — Twenty II',
  robots: { index: false, follow: false },
};

export default function PaymentSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
