'use client';

import { Artwork } from '@/types';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface OrderData {
  orderId: number;
  reference: string;
  amount: number;
  status: string;
  customerName: string;
  email: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}

export const useBuyArtwork = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
  const onSuccessRef = useRef<((reference: any) => Promise<void>) | null>(null);
  const onCloseRef = useRef<(() => void) | null>(null);

  if (!publicKey) {
    throw new Error('NEXT_PUBLIC_PAYSTACK_KEY is not set');
  }

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Success callback with backend verification
  const onSuccess = useCallback(
    async (reference: any) => {
      try {
        console.log('Payment successful, verifying...', reference);

        if (!orderData) {
          throw new Error('Order data not found');
        }

        // STEP 1: Verify payment with backend
        const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || '';
        const verifyUrl = `${apiBaseUrl}/orders/verify`;

        const verifyResponse = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': `${orderData.orderId}_${reference.reference}`,
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            reference: reference.reference,
          }),
        });

        if (!verifyResponse.ok) {
          const error = await verifyResponse.json();
          throw new Error(
            error.message || error.error || 'Verification failed'
          );
        }

        const verifyData = await verifyResponse.json();
        console.log('Verification response:', verifyData);

        if (verifyData.success) {
          // ✓ Payment confirmed!
          toast.success('Payment successful!');

          // Reset form
          setOrderData(null);
          setIsLoading(false);

          // Redirect to success page
          router.push(
            `/twenty-ii/payment-success?orderId=${orderData.orderId}&reference=${reference.reference}`
          );
        } else {
          throw new Error(verifyData.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error(
          'Payment verification failed. Please contact support with reference: ' +
            (reference?.reference || 'unknown')
        );
        setIsLoading(false);
      }
    },
    [orderData, router]
  );

  // ✅ Close callback
  const onClose = useCallback(() => {
    console.log('Payment modal closed');
    setIsLoading(false);
    // Order is still in "pending" status
    // User can retry payment
  }, []);

  // Store callbacks in refs for Paystack
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onCloseRef.current = onClose;
  }, [onSuccess, onClose]);

  const handleBuy = useCallback(
    async (artwork: Artwork, customerData: CustomerData) => {
      setIsLoading(true);

      try {
        const reference = `art_${artwork.id}_${new Date().getTime()}`;
        const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || '';
        const createOrderUrl = `${apiBaseUrl}/orders/create`;

        const createOrderResponse = await fetch(createOrderUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference: reference,
            amount: Number(artwork.Price) * 100, // Convert to kobo
            customerName:
              customerData.firstName.trim() +
              ' ' +
              customerData.lastName.trim(),
            email: customerData.email.trim(),
            phone: customerData.phone.trim(),
            artworkId: artwork.id,
                artworkDocumentId: artwork.documentId, 
          }),
        });

        if (!createOrderResponse.ok) {
          const error = await createOrderResponse.json();
          throw new Error(
            error.message || error.error || 'Failed to create order'
          );
        }

        const orderResult = await createOrderResponse.json();

        if (!orderResult.success) {
          throw new Error(orderResult.message || 'Failed to create order');
        }

        console.log('Order created:', orderResult.data);

        // Store for verification later
        setOrderData(orderResult.data);

        // Wait for Paystack script to load
        let retries = 0;
        while (!window.PaystackPop && retries < 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          retries++;
        }

        if (!window.PaystackPop) {
          throw new Error('Paystack script failed to load');
        }

        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: customerData.email.trim(),
          amount: orderResult.data.amount,
          reference: orderResult.data.reference,
          metadata: {
            orderId: orderResult.data.orderId,
            artworkId: artwork.id,
            artworkDocumentId: artwork.documentId,
            artworkTitle: artwork.Title,
            customerName:
              customerData.firstName.trim() +
              ' ' +
              customerData.lastName.trim(),
            custom_fields: [
              {
                display_name: 'Order Reference',
                variable_name: 'reference',
                value: orderResult.data.reference, // ← CRITICAL for webhook!
              },
            ],
          },
          callback: (response: any) => {
            setIsLoading(false);
            if (onSuccessRef.current) {
              onSuccessRef.current(response);
            }
          },
          onClose: () => {
            setIsLoading(false);
            if (onCloseRef.current) {
              onCloseRef.current();
            }
          },
        });

        // STEP 3: Show payment modal
        handler.openIframe();
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to create order. Please try again.'
        );
        setIsLoading(false);
      }
    },
    [publicKey]
  );

  return {
    handleBuy,
    isLoading,
  };
};
