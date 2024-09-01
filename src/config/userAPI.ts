import { fetchWithToken } from "@/config/APIConfig";
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";
import { User } from '@/constants/data'; // Ensure the path is correct

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetchWithToken(`${VentiqoBackendAPI}/users/get/all/users`);
        if (!response.ok) {
            console.error('Fetch error:', response);
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        return data.users;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];  // Return an empty array if there is an error to prevent breaking the component
    }
};
