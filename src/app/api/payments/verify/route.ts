import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.error('PAYSTACK_SECRET_KEY is not set');
}

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment verification service unavailable' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const verificationResult = await verifyPaystackPayment(reference);

    if (!verificationResult.success) {
      return NextResponse.json(
        { error: verificationResult.message || 'Payment verification failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: verificationResult.data,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

async function verifyPaystackPayment(reference: string): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: `Paystack API error: ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (data.status && data.data) {
      // Check if payment was successful
      if (data.data.status === 'success') {
        return {
          success: true,
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: `Payment status: ${data.data.status}`,
        };
      }
    } else {
      return {
        success: false,
        message: data.message || 'Payment verification failed',
      };
    }
  } catch (error) {
    console.error('Paystack verification error:', error);
    return {
      success: false,
      message: 'Network error during verification',
    };
  }
}
