# Security Implementation Guide

## Overview

This document outlines the security fixes implemented to protect the application from vulnerabilities.

## Critical Security Fixes

### 1. Server-Side Price Validation

- **Issue**: Prices were being read from client-side, allowing manipulation
- **Fix**: All prices are now validated server-side in `/api/payments/create`
- **Location**: `src/app/api/payments/create/route.ts`

### 2. Payment Verification

- **Issue**: Payment success page was accessible without actual payment
- **Fix**: Payment is now verified with Paystack before showing success
- **Location**:
  - `src/app/api/payments/verify/route.ts`
  - `src/app/twenty-ii/payment-success/page.tsx`

### 3. Strapi API Token Protection

- **Issue**: Strapi API token was exposed in client-side code
- **Fix**: All Strapi calls moved to server-side API routes
- **Location**:
  - `src/lib/strapiServer.ts` (server-only)
  - API routes in `src/app/api/`

### 4. Webhook Payment Confirmation

- **Issue**: No automatic artwork purchase tracking
- **Fix**: Paystack webhook automatically marks artworks as sold
- **Location**: `src/app/api/webhooks/paystack/route.ts`

## Environment Variables

### Required Server-Side Variables (Recommended)

These should NOT have `NEXT_PUBLIC_` prefix for security:

```env
# Strapi Configuration (Server-only)
STRAPI_BASE_URL=https://your-strapi-url.com/api
STRAPI_BASE_URL_WITHOUT_API=https://your-strapi-url.com
STRAPI_API_TOKEN=your-strapi-api-token

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx  # For webhook verification
```

### Required Client-Side Variables

These can have `NEXT_PUBLIC_` prefix (safe to expose):

```env
# Paystack Public Key (Safe to expose)
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_xxxxxxxxxxxxx

# Strapi URLs (Safe to expose, but API calls are server-side now)
NEXT_PUBLIC_STRAPI_BASE_URL=https://your-strapi-url.com/api
NEXT_PUBLIC_STRAPI_BASE_URL_WITHOUT_API=https://your-strapi-url.com
```

### Migration Note

The code supports both old (`NEXT_PUBLIC_*`) and new (server-only) environment variables for backward compatibility. However, for production, you should:

1. Remove `NEXT_PUBLIC_STRAPI_API_TOKEN` from client-side
2. Use server-only `STRAPI_API_TOKEN` instead
3. Keep `NEXT_PUBLIC_PAYSTACK_KEY` for client-side Paystack initialization

## Paystack Webhook Setup

1. Go to your Paystack Dashboard
2. Navigate to Settings > Webhooks
3. Add webhook URL: `https://your-domain.com/api/webhooks/paystack`
4. Select events: `charge.success`
5. Copy the webhook secret (if provided) and add to `PAYSTACK_SECRET_KEY`

## API Routes Created

### Artworks

- `GET /api/artworks` - List artworks with pagination
- `GET /api/artworks/[id]` - Get single artwork

### Payments

- `POST /api/payments/create` - Create payment with server-side price validation
- `POST /api/payments/verify` - Verify payment with Paystack

### Webhooks

- `POST /api/webhooks/paystack` - Paystack webhook handler

### Case Studies

- `GET /api/case-studies` - List case studies

## Security Features

1. **Input Validation**: All user inputs are validated server-side
2. **Price Verification**: Prices are fetched from database, not trusted from client
3. **Payment Verification**: All payments are verified with Paystack before confirmation
4. **Webhook Signature Verification**: Paystack webhooks are verified using HMAC signature
5. **Artwork Purchase Tracking**: Artworks are automatically marked as sold after verified payment
6. **Duplicate Purchase Prevention**: System checks if artwork is already sold before processing payment

## Testing Checklist

- [ ] Verify prices cannot be manipulated in browser
- [ ] Verify payment success page requires actual payment
- [ ] Verify webhook updates artwork status correctly
- [ ] Verify duplicate purchases are prevented
- [ ] Verify all API routes require proper authentication (if applicable)
- [ ] Test with invalid payment references
- [ ] Test with already-sold artworks

## Additional Recommendations

1. **Rate Limiting**: Consider adding rate limiting to API routes
2. **CORS Configuration**: Ensure CORS is properly configured in `next.config.ts`
3. **Security Headers**: Add security headers in `next.config.ts`
4. **Error Logging**: Implement proper error logging (avoid exposing sensitive info)
5. **Monitoring**: Set up monitoring for failed payment verifications
