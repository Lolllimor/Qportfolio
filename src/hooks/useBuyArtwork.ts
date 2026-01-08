

import { usePaystackPayment } from 'react-paystack';
import { Artwork } from '@/types';

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
    onClose
}: UseBuyArtworkProps) => {

    // Default config
    const config = {
        reference: new Date().getTime().toString(),
        email: email,
        amount: Number(artwork.Price) * 100, 
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx',
        metadata: {
            custom_fields: [
                {
                    display_name: "Artwork ID",
                    variable_name: "artwork_id",
                    value: String(artwork.id)
                },
                {
                    display_name: "Artwork Title",
                    variable_name: "artwork_title",
                    value: artwork.Title
                },
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: `${firstName} ${lastName}`.trim()
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: phone
                }
            ]
        }
    };

    const initializePayment = usePaystackPayment(config);

    const handleBuy = () => {
        if (!process.env.NEXT_PUBLIC_PAYSTACK_KEY) {
            console.warn('Paystack key is missing. Using test key or failing.');
        }

        // @ts-ignore
        initializePayment(onSuccess, onClose);
    };

    return {
        buyArtwork: handleBuy
    };
}
