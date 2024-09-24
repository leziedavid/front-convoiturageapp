import { v4 as uuidv4 } from 'uuid';
import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl } from './baseUrl';

interface DecodedToken {
    id: string;
    exp: number;
}


const WAVE_API_URL = 'https://api.wave.com/v1/checkout/sessions/';
const WAVE_API_KEY = 'wave_ci_prod_BRoKc90NC_ioDJ-csqkMIvPOMzidfGwFhjS7YNtk6T4ucmxisg5UI-tDCRyBc4gFy4qsaeaVL318WHkWC17Hj1KLF3mUeN3dxw';

interface LaunchPaymentResponse {
    wave_launch_url: string;
    id: string;
}

interface PaymentStatusResponse {
    payment_status: string;
    last_payment_error?: string;
}

export const launchPayment = async (amount: number): Promise<BaseResponse<any>> => {
    try {
        
        const response = await  fetch(`${getBaseUrl()}/payments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
                'Content-Type': 'application/json',
                'idempotency-key': uuidv4(),
            },
            body: JSON.stringify({
                amount,
                currency: 'XOF',
                error_url: 'https://vavavoom.ci/error',
                success_url: 'https://vavavoom.ci/infos',
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                code: response.status,
                messages: `HTTP error! Status: ${response.status}`,
            };
        }
        return await response.json();

    } catch (error) {
        
        console.error('Error launching payment:', error);

        return {
            success: false,
            messages: `Error launching payment: ${error}`,
        };
    }
};

export const requestToGetTransactionStatus = async (waveId: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/payments/${waveId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error connecting to the server:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export const launchRechargements = async (amount: number,paymentMethod:string): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token manquant');
    }

    try {

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        if (!decodedToken) {
            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        
        const id = decodedToken.id;
        const date = new Date().toISOString();

        const response = await  fetch(`${getBaseUrl()}/rechargements`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},

            body: JSON.stringify({
                description:"Rechargements",
                amount:amount,
                currency_id: 'XOF',
                utilisateur_id: id,
                date: date,
                paymentMethod: paymentMethod,
                status: "succeded",
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                code: response.status,
                messages: `HTTP error! Status: ${response.status}`,
            };
        }
        return await response.json();
    } catch (error) {
        
        console.error('Error launching payment:', error);

        return {
            success: false,
            messages: `Error launching payment: ${error}`,
        };
    }
};


export const getAllRechargements = async (page: number, limit: number): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/rechargements?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting trajets:', error);
        throw error;
    }
};

