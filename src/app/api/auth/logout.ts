import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, signOut } from "next-auth/react";
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Ensure that the route only allows POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const session = await getSession({ req });

    if (session) {
      // Call backend sign-out API to clear server-side cookies
      const response = await fetch(`${VentiqoBackendAPI}/auth/sign-out`, {
        method: 'POST',
        credentials: 'include', // Include cookies with request
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`, // Add accessToken to header if needed
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ success: false, message: 'Failed to sign out on the server.' });
      }

      // Clear client-side session
      await signOut({ redirect: false });
      
      return res.status(200).json({ success: true, message: 'Signed out successfully!' });
    } else {
      // If there is no session found, return a successful response indicating no session
      return res.status(200).json({ success: true, message: 'No session found, already signed out.' });
    }
  } catch (error) {
    console.error("Logout API Error:", error);
    return res.status(500).json({ success: false, message: 'An error occurred during sign out.' });
  }
}
