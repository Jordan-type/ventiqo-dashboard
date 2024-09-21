import { getSession, signIn } from 'next-auth/react';
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";
import { User, UserProfileResponse } from '@/constants/data';

// Function to get and refresh the access token if needed
const getValidAccessToken = async (): Promise<string | undefined> => {
    const session = await getSession();
    let accessToken: string | undefined = session?.accessToken ?? undefined; // Use nullish coalescing to ensure `undefined` instead of `null`
 
    return accessToken; // This will always be a string or undefined
};

export const fetchUsers = async (): Promise<User[]> => {
    try {
        console.log("Starting to fetch users...");

        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            console.error('No access token found. Please login again.');
            throw new Error('No access token found');
        }

        const response = await fetch(`${VentiqoBackendAPI}/users/get/all/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include'
        });

        console.log(`Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            console.error('Failed to fetch users. Status:', response.status, 'StatusText:', response.statusText);
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data successfully:', data);

        const users = data.users?.data || [];

        return users as User[];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching users:', error.message);
        } else {
            console.error('Unexpected error fetching users:', error);
        }

        return [];  // Return an empty array to prevent breaking the component
    }
};

// Fetch user profile
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
    try {
        console.log("Fetching user profile...");

        const accessToken = await getValidAccessToken();
        console.log('Access Token:', accessToken);

        if (!accessToken) {
            console.error('No access token found. Please login again.');
            throw new Error('No access token found');
        }

        const response = await fetch(`${VentiqoBackendAPI}/users/my/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include'
        });

        console.log(`Response status: ${response.status} ${response.statusText}`);

        const data = await response.json();

        if (!response.ok) {
            console.error('Failed to fetch user profile. Error data:', data);
            return {
                success: false,
                message: data.message || 'Failed to fetch user profile',
                completionPercentage: data.completionPercentage,
                missingAttributes: data.missingAttributes || [],
                data: data.data || null, 
            };
        }

        console.log('Fetched user profile successfully:', data);

        return {
            success: true,
            data: data.data, // Assuming 'data.data' contains the user profile object
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching user profile:', error.message);
        } else {
            console.error('Unexpected error fetching user profile:', error);
        }

        return {
            success: false,
            message: 'An error occurred while fetching the profile',
        };
    }
};

