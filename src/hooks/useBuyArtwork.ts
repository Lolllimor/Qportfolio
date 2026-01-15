'use client';

import { UseBuyArtworkProps } from '@/types';
import { useState, useCallback, useEffect } from 'react';

export const useBuyArtwork = ({
  artwork,
  email,
  phone = '',
  firstName = '',
  lastName = '',
  onSuccess,
  onClose,
}: UseBuyArtworkProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

  if (!publicKey) {
    throw new Error('NEXT_PUBLIC_PAYSTACK_KEY is not set');
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleBuy = useCallback(async () => {
    setIsLoading(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || '';
      const apiUrl = `${apiBaseUrl}/orders/create`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: `art_${artwork.id}_${Date.now()}`,
          amount: Number(artwork.Price),
          customerName: `${firstName.trim()} ${lastName.trim()}`.trim(),
          artworkId: artwork.id,
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment');
      }

      const paymentData = await response.json();

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
        email: email.trim(),
        amount: paymentData.data.amount * 100,
        ref: paymentData.reference,
        metadata: paymentData.metadata,
        callback: (response: any) => {
          setIsLoading(false);
          if (onSuccess) {
            onSuccess(response);
          } else {
            window.location.href = `/twenty-ii/payment-success?reference=${paymentData.reference}`;
          }
        },
        onClose: () => {
          setIsLoading(false);
          if (onClose) {
            onClose();
          } else {
            window.location.href = '/twenty-ii';
          }
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to initialize payment. Please try again.'
      );
      setIsLoading(false);
    }
  }, [
    artwork,
    email,
    phone,
    firstName,
    lastName,
    onSuccess,
    onClose,
    isLoading,
    publicKey,
  ]);

  return {
    buyArtwork: handleBuy,
    isLoading,
  };
};
