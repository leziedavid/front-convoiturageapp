
import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';

const BASE_URL = 'http://localhost:4000/api';

interface DecodedToken {
    id: string;
    exp: number;
}

export const signIn = async (email: string, password: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getUserInfo = async (): Promise<BaseResponse<any>> => {
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
        const response = await fetch(`${BASE_URL}/users/${id}/root/detail`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};


export const getSettings = async (): Promise<BaseResponse<any>> => {
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
        const response = await fetch(`${BASE_URL}/settings/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};
