'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';

const PaymentSuccessPageContent = () => {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const ref = searchParams.get('reference') || searchParams.get('trxref');
    setReference(ref);

    if (ref) {
      verifyPayment(ref);
    } else {
      setVerifying(false);
      setError('No payment reference found');
    }
  }, [searchParams]);

  const verifyPayment = async (ref: string) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || '';
      const apiUrl = `${apiBaseUrl}/payments/verify`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference: ref }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }

      const data = await response.json();
      if (data.success) {
        setVerified(true);
      } else {
        setError('Payment verification failed');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="w-full min-h-screen bg-[url('/bg.png')] bg-cover bg-center font-montserrat flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl md:text-2xl text-white mb-4">
            Verifying payment...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !verified) {
    return (
      <div className="w-full min-h-screen bg-[url('/bg.png')] bg-cover bg-center font-montserrat">
        <div className="w-full lg:px-[75px] py-4 md:py-[40px] xl:px-[120px] xl:py-[57px] px-4">
          <Link
            href="/twenty-ii"
            className="font-barbra text-[#57D791] text-2xl md:text-[32px] xl:text-5xl inline-block hover:opacity-80 transition-opacity"
          >
            Twenty- <span className="text-[#EB5D1D]">II</span>
          </Link>
        </div>

        <div className="flex items-center justify-center px-4 md:px-6 py-4 md:py-10">
          <div className="max-w-[718px] w-full bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden p-8 text-center">
            <div className="w-14 h-14 md:w-28 md:h-28 rounded-full bg-red-500 flex items-center justify-center mb-4 mx-auto">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-14 md:h-14"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="text-xl md:text-4xl font-bold uppercase mb-4 text-black">
              Payment Verification Failed
            </h1>
            <p className="text-sm md:text-lg text-[#7D7A7A] mb-6">
              {error ||
                'Unable to verify your payment. Please contact support if you have already made a payment.'}
            </p>
            <Link
              href="/twenty-ii"
              className="bg-[#E3591C] text-white font-bold uppercase py-2.5 md:py-4 px-4 md:px-8 hover:opacity-90 transition-opacity inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.png')] bg-cover bg-center font-montserrat">
      <div className="w-full lg:px-[75px] py-4 md:py-[40px] xl:px-[120px] xl:py-[57px] px-4">
        <Link
          href="/twenty-ii"
          className="font-barbra text-[#57D791] text-2xl md:text-[32px] xl:text-5xl inline-block hover:opacity-80 transition-opacity"
        >
          Twenty- <span className="text-[#EB5D1D]">II</span>
        </Link>
      </div>

      <div className="flex items-center justify-center px-4 md:px-6 py-4 md:py-10">
        <div className="max-w-[718px] w-full">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
            <div className="h-2 md:h-5 w-full bg-[#E3591C]"></div>
            <div className="h-2 md:h-5 w-full bg-[#57D791]"></div>
            <div className="h-2 md:h-5 w-full bg-[#49B7D9]"></div>

            <div className="px-4 md:px-8 py-5 md:py-12 flex flex-col items-center text-center">
              <div
                className={`w-14 h-14 md:w-28 md:h-28 rounded-full bg-[#57D791] flex items-center justify-center mb-3 md:mb-8 transition-all duration-500 ${
                  mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-14 md:h-14"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="white"
                  />
                </svg>
              </div>

              <h1 className="text-xl md:text-4xl font-bold uppercase mb-2 md:mb-4 text-black">
                Payment Successful!
              </h1>

              <p className="text-sm md:text-lg text-[#7D7A7A] mb-4 md:mb-8 max-w-md leading-snug md:leading-relaxed">
                Thank you for your purchase. We will contact you shortly
                regarding delivery.
              </p>

              {reference && (
                <div className="w-full bg-[#F2F2F2] rounded-lg p-3 md:p-4 mb-4 md:mb-8 border border-gray-200">
                  <p className="text-[10px] md:text-xs uppercase font-semibold text-[#7D7A7A] mb-1 md:mb-2">
                    Transaction Reference
                  </p>
                  <p className="text-xs md:text-sm font-mono font-semibold text-black break-all">
                    {reference}
                  </p>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full mb-4 md:mb-6">
                <Link
                  href="/twenty-ii/artworks"
                  className="bg-[#E3591C] text-white font-bold uppercase py-2.5 md:py-4 px-4 md:px-8 hover:opacity-90 transition-opacity text-center w-full md:min-w-[200px] text-sm md:text-base"
                >
                  Browse More Artworks
                </Link>

                <Link
                  href="/twenty-ii"
                  className="border border-[#7D7A7A] text-black font-bold uppercase py-2.5 md:py-4 px-4 md:px-8 hover:bg-black hover:text-white transition-all duration-200 text-center w-full md:min-w-[200px] text-sm md:text-base"
                >
                  Back to Home
                </Link>
              </div>

              <div className="w-full border-t border-gray-200 pt-3 md:pt-6">
                <p className="text-[10px] md:text-xs text-[#7D7A7A] max-w-md mx-auto leading-tight md:leading-relaxed">
                  Confirmation email sent. Questions?{' '}
                  <a
                    href="mailto:Hello.twentyii@gmail.com"
                    className="text-[#E3591C] underline hover:opacity-80 transition-opacity font-semibold"
                  >
                    contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[url('/bg.png')] bg-cover bg-center font-montserrat flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl md:text-2xl text-white mb-4">
              Loading...
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      }
    >
      <PaymentSuccessPageContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
