'use client';

import { useBuyArtwork } from '@/hooks/useBuyArtwork';
import { toast } from 'react-toastify';
import { Artwork } from '@/types';
import { useState } from 'react';
import Image from 'next/image';

interface PaymentModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export const PaymentModal = ({ artwork, onClose }: PaymentModalProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { buyArtwork, isLoading } = useBuyArtwork({
    artwork,
    email,
    phone,
    firstName,
    lastName,
  });

  const handlePay = () => {
    if (!email || !firstName || !lastName || !phone) {
      toast.error('Please fill in all fields');
      return;
    }

    const key = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    if (!key || key === 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx') {
      if (!key) toast.warning('Paystack public key is not set.');
    }

    buyArtwork();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-cover bg-center bg-no-repeat p-4 font-montserrat">
      <div className="relative max-w-[618px] w-full bg-white rounded-lg p-6 md:p-8 flex flex-col items-center max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold uppercase mb-6 text-center">
          Checkout
        </h2>

        <div className="w-full flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
          <div className="w-[150px] h-[150px] relative border border-gray-200 shrink-0">
            {artwork.art?.url ? (
              <Image
                src={artwork.art.url}
                alt={artwork.Title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-semibold text-lg uppercase">{artwork.Title}</h3>
            <p className="text-gray-500 text-sm italic">{artwork.Year}</p>
            <div className="mt-2 text-xl font-bold text-[#E3591C]">
              ₦ {Number(artwork.Price).toLocaleString('en-US')}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#E3591C]"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#E3591C]"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#E3591C]"
              placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#E3591C]"
              placeholder="08012345678"
            />
          </div>

          <button
            onClick={handlePay}
            disabled={isLoading}
            className="w-full bg-[#E3591C] text-white font-bold uppercase py-4 mt-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
            Secured by Paystack
          </p>
        </div>
      </div>
    </div>
  );
};
