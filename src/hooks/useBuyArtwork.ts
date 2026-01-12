'use client';

import { Artwork } from '@/types';
import { useState, useCallback, useEffect } from 'react';

// Declare PaystackPop type
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}

interface UseBuyArtworkProps {
  artwork: Artwork;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}

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

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleBuy = useCallback(async () => {
    if (isLoading || !artwork || !email) {
      if (!artwork || !email) {
        console.warn('Payment data not ready');
      }
      return;
    }

    setIsLoading(true);

    try {
      // Create payment on server-side with validated price
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artworkId: artwork.id || artwork.documentId,
          email: email.trim(),
          phone: phone.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment');
      }

      const paymentData = await response.json();

      // Wait for Paystack script to load if needed
      let retries = 0;
      while (!window.PaystackPop && retries < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        retries++;
      }

      if (!window.PaystackPop) {
        throw new Error('Paystack script failed to load');
      }

      // Initialize Paystack payment with server-validated data
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: paymentData.email,
        amount: paymentData.amount,
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
