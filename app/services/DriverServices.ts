import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
    exp: number;
}

const BASE_URL = 'http://localhost:4000/api';

export const getUserStatistics = async (): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('authorisation');

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
        const response = await fetch(`${BASE_URL}/users/${id}/stats`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};

export const getDriverCommandes = async (): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('authorisation');

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
        const response = await fetch(`${BASE_URL}/drivers/${id}/commandes/history`, {

            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
        
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};
export const getDriverTrajet = async (): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('authorisation');

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
        const response = await fetch(`${BASE_URL}/trajets/${id}/listes`, {

            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();

    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};