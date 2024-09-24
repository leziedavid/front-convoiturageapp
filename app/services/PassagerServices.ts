import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl } from "./baseUrl";

interface DecodedToken {
    id: string;
    exp: number;
}

export const getPassageerCommandes = async (): Promise<BaseResponse<any>> => {

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
        const response = await fetch(`${getBaseUrl()}/commndesusers/${id}/one`, {

            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
        
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};

export const getAllPassageerCommandes = async (page: number, limit: number): Promise<BaseResponse<any>> => {


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
        const response = await fetch(`${getBaseUrl()}/commndesusers/${id}/users/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });

        return await response.json();
        
    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};