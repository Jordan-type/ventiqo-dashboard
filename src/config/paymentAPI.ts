import { getSession } from 'next-auth/react';
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";

// Function to get and refresh the access token if needed
const getValidAccessToken = async (): Promise<string | undefined> => {
  const session = await getSession();
  let accessToken: string | undefined = session?.accessToken ?? undefined;
  return accessToken; // This will always be a string or undefined
};

// Interface for the Mpesa payment request payload
interface MpesaPaymentPayload {
  orderId: string;
  paymentType: string; // In this case, "Mpesa"
}

// Interface for the response
interface MpesaPaymentResponse {
  success: boolean;
  message?: string;
  data?: any; // Adjust based on your response structure
}

// Function to make the Mpesa payment request
export const initiateMpesaPayment = async (
  payload: MpesaPaymentPayload
): Promise<MpesaPaymentResponse> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      throw new Error('No access token found. Please login again.');
    }

    const response = await fetch(`${VentiqoBackendAPI}/payments/mpesa/stkpush`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Attach the access token
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Failed to initiate Mpesa payment',
      };
    }

    const data: MpesaPaymentResponse = await response.json();
    return {
      success: true,
      data,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'An error occurred while processing the payment',
    };
  }
};
