import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl } from "./baseUrl";

interface DecodedToken {
    id: string;
    exp: number;
}

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
        const response = await fetch(`${getBaseUrl()}/users/${id}/stats`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};

export const getDriverCommandes = async (page: number, limit: number): Promise<BaseResponse<any>> => {

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
        const response = await fetch(`${getBaseUrl()}/drivers/${id}/commandes/history?page=${page}&limit=${limit}`, {

            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
        
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};


export const getDriverTrajet = async (page: number, limit: number): Promise<BaseResponse<any>> => {
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

        // Effectuer la requête avec les paramètres de pagination
        const response = await fetch(`${getBaseUrl()}/trajets/${id}/listes?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return await response.json();

    } catch (error) {
        console.error('Error getting driver trajets:', error);
        throw error;
    }
};