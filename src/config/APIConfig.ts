import { getSession, signIn } from "next-auth/react";
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";

// data types
interface dataSignInUser {
  email: string;
  password: string;
}

interface SignInResponse {
  ok?: boolean;
  error?: string;
  status?: number;
  [key: string]: any; // Include this if there might be other properties
}

interface dataSignUpUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

// this for creating events
interface dataEventDetails {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  aboutEvent: string;
  tagline: string;
  keypoint: string;
  venueName: string;
  categoryName: string;
  subcatergoryName: string;
  status: string;
  currentBookings: number;
  promoCode: string;
  discount: number;
  featured: boolean;
  registrationRequired: boolean;
  subCounty: string;
  county: string;
  country: string;
  events_image: string; // image
}

// getting all events api
interface GetAllEventsResponse {
  message: string;
  success: boolean;
  events: {
    data: any[]; // You may define a more specific type if you have a consistent structure
    _links: any;
    _meta: {
      total: number;
      totalPages: number;
      currentPage: number;
      perPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: any;
      prevPage: any;
    };
  };
}

// {
//   "tickets": [
//     {
//       "name": "General Admission",
//       "description": "Access to the main event area.",
//       "price": 1,
//       "quantity": 500,
//       "stock": 500,
//       "status": "Available",
//       "expired": null,
//       "ticketType": "General Admission",
//       "salesStartTime": "09:00:00",
//       "salesStartDate": "2024-08-01T00:00:00.000Z",
//       "salesEndTime": "23:59:59",
//       "salesEndDate": "2024-09-21T00:00:00.000Z",
//       "currentBookings": 0,
//       "promoCode": null,
//       "discount": 0
//     },
//     {
//       "name": "VIP Pass",
//       "description": "All-access pass with VIP benefits.",
//       "price": 2,
//       "quantity": 100,
//       "stock": 100,
//       "status": "Available",
//       "expired": null,
//       "ticketType": "VIP",
//       "salesStartTime": "09:00:00",
//       "salesStartDate": "2024-08-01T00:00:00.000Z",
//       "salesEndTime": "23:59:59",
//       "salesEndDate": "2024-09-15T00:00:00.000Z",
//       "currentBookings": 0,
//       "promoCode": null,
//       "discount": 0
//     }
//   ]
// }

// add tickets categories to event
interface dataTicketsCategories {
  tickets: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
    status: string;
    expired: string;
    ticketType: string;
    salesStartTime: string;
    salesStartDate: string;
    salesEndTime: string;
    salesEndDate: string;
    currentBookings: number;
    promoCode: string;
    discount: number;
  }[];
}

// Function to fetch with automatic token handling
export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  let session = await getSession();
  let accessToken = session?.accessToken;

  if (!accessToken) {
    await refreshAccessToken();
    session = await getSession(); // Re-fetch session after refreshing token
    accessToken = session?.accessToken;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) { // Access token expired
    await refreshAccessToken();
    session = await getSession(); // Re-fetch session after refreshing token
    accessToken = session?.accessToken;
    // Retry the original request
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  return response;
};

// Helper function to refresh access token
const refreshAccessToken = async () => {
  const response = await fetch(`${VentiqoBackendAPI}/auth/refresh-token`, {
    method: 'GET',
    credentials: 'include', // This ensures cookies are sent with the request
  });

  console.log(
    `Refresh token response: ${response.status} ${response.statusText} ${response.url}`
  )

  if (response.ok) {
    const data = await response.json();
    await signIn('credentials', { accessToken: data.accessToken }); // Update session with new access token
  } else {
    throw new Error('Unable to refresh access token');
  }
};


// signin user
export const signInUser = async (
  userDetails: dataSignInUser,
): Promise<SignInResponse> => {
  console.log("<====User Details====>", userDetails);
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: userDetails.email,
      password: userDetails.password,
    });

    console.log("<====Response====>", res);

    if (res?.ok) {
      console.log("Login successful");
      console.log("Response status:", res.status);
      console.log("Response data:", res);

      return res as SignInResponse; // Type assertion here
    } else {
      console.error("Login failed:", res?.error);
      return { error: res?.error || "Unknown error occurred" };
    }
  } catch (error) {
    console.log("Error during sign-in:", error);
    // Return the error object instead of throwing it
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// signup user
export const signUpUser = async (userDetails: dataSignUpUser) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// activate account
export const activateAccount = async (activationDetails: any) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/auth/activate-user-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activationDetails),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// forgot password
export const forgotPassword = async (email: string) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/auth/forgot-password-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error during forgot password request:", error);
    throw error;
  }
};

// reset password
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/auth/new-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error during password reset:", error);
    throw error;
  }
};

// create event details
export const createEvent = async (eventDetails: dataEventDetails) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventDetails),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// https://d1c9-41-209-60-99.ngrok-free.app/api/v1/events/66aa37ab95cbfce01bc1c6b9/tickets
// add tickets categories to event
export const addTicketsCategories = async (
  eventId: string,
  ticketsDetails: dataTicketsCategories,
) => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/events/${eventId}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketsDetails),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


// Function to get all events
export const getAllEvents = async (): Promise<GetAllEventsResponse | undefined> => {
  try {
    const res = await fetch(`${VentiqoBackendAPI}/events/all/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error fetching events: ${res.statusText}`);
    }

    const data: GetAllEventsResponse = await res.json();
    console.log("All events fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    // Handle error (e.g., show notification to the user)
  }
};
