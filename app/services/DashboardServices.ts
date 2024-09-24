import { BaseResponse } from "../interfaces/ApiResponse";
import { getBaseUrl } from "./baseUrl";
interface DecodedToken {
    id: string;
    exp: number;
}


export const getDashboardData = async (): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/dashboard/stats`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};
