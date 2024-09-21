import { getSession, signIn } from 'next-auth/react';
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";

// Function to get and refresh the access token if needed
const getValidAccessToken = async (): Promise<string | undefined> => {
    const session = await getSession();
    let accessToken: string | undefined = session?.accessToken ?? undefined; // Use nullish coalescing to ensure `undefined` instead of `null`
 
    return accessToken; // This will always be a string or undefined
};

interface CreateOrderPayload {
  eventId: string;
  ticketType: string;
  totalTickets: number;
  phone_number: string;
}

interface OrderResponse {
  success: boolean;
  order?: any; // Adjust this type based on the actual response structure
  message?: string;
}

export const createOrder = async ({ eventId, ticketType, totalTickets, phone_number  }: CreateOrderPayload): Promise<OrderResponse> => {
  try {

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        console.error('No access token found. Please login again.');
        throw new Error('No access token found');
    }

    const response = await fetch(`${VentiqoBackendAPI}/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        eventId,
        ticketType,
        totalTickets,
        phone_number,
      }),
    });

    const data: OrderResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: "Failed to create order. Please try again." };
  }
};

export const fetchAllOrders = async () => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("No access token found. Please login again.");
      throw new Error("No access token found");
    }

    const response = await fetch(`${VentiqoBackendAPI}/orders/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    const data = await response.json();
    return data.data.order; // Assuming data.data.order contains the order list
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};


export const fetchMyOrders = async () => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("No access token found. Please login again.");
      throw new Error("No access token found");
    }

    const response = await fetch(`${VentiqoBackendAPI}/orders/my/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user's orders.");
    }

    const data = await response.json();
    return data.data.data; // Assuming 'data.data.data' contains the order list
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    return [];
  }
};

// Function to fetch a specific order by ID
export const fetchOrderById = async (orderId: string): Promise<any | null> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error('No access token found. Please login again.');
      throw new Error('No access token found');
    }

    const response = await fetch(`${VentiqoBackendAPI}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch the order. Error data:', errorData);
      throw new Error('Failed to fetch the order');
    }

    const data = await response.json();
    return data.data; // Assuming 'data.data' contains the order object
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching the order:', error.message);
    } else {
      console.error('Unexpected error fetching the order:', error);
    }

    return null; // Return null to indicate failure
  }
};

