import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { VentiqoBackendAPI } from '@/constants/ventiqo-backend-api';

// Define the shape of the session object returned by `getSession`
interface Session {
  accessToken?: string;
  refreshToken?: string;
}

// Function to check if the token is expired
const isTokenExpired = (token: string | undefined): boolean => {
  if (!token) return true;
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

// Middleware to check and refresh token
export const withAuth = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req }) as Session | null;

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let accessToken = session.accessToken;
    const refreshToken = session.refreshToken;

    if (isTokenExpired(accessToken) && refreshToken) {
      console.log('Token expired, refreshing...');
      try {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshAccessToken();
        
        // Update the session with new tokens
        await signIn('credentials', { redirect: false, accessToken: newAccessToken, refreshToken: newRefreshToken });

        accessToken = newAccessToken; // Use the refreshed token
      } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).json({ error: 'Token refresh failed' });
      }
    }

    // Add accessToken to request object
    (req as any).accessToken = accessToken; // Type cast to add custom property

    return handler(req, res);
  };
};

// Helper function to refresh access token using GET request
async function refreshAccessToken(): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const response = await fetch(`${VentiqoBackendAPI}/auth/refresh-token`, {
      method: 'GET',
      credentials: 'include', // Include cookies
    });

    console.log(`Refresh token response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    console.log('New tokens received:', data);

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? '',
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}
