import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl } from "./baseUrl";

interface DecodedToken {
    id: string;
    exp: number;
}


export const userFomeOnSubmit = async (data: FormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/users`, {
            method: 'POST',
            body: data,
            });
        return await response.json();

    } catch (error: any) {
        throw error;
    }
};
export const updateUser = async (data: FormData): Promise<BaseResponse<any>> => {

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
        const response = await fetch(`${getBaseUrl()}/users/${id}`, {
            method: 'PUT',
            body: data,
            });
        return await response.json();

    } catch (error: any) {

        throw error;
    }

};

export const updateUserMdp = async (data: FormData): Promise<BaseResponse<any>> => {

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
        const response = await fetch(`${getBaseUrl()}/users/${id}/mdp`, {
            method: 'PUT',
            body: data,
            });
        return await response.json();

    } catch (error: any) {
        throw error;
    }

};

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
export const getAllUsers = async (page: number, limit: number): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/users?page=${page}&limit=${limit}`, {
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

export const updateUserStatut = async (userId: string, isActive: Boolean | null): Promise<BaseResponse<any>> => {
    try {
        const url = `${getBaseUrl()}/users/updateUserStatut?userId=${userId}&isActive=${isActive}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du statut');
        }
                return await response.json();
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
};

export const getUsersById = async (id:string): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/users/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};

export const searchUsers = async (searchTerm: string, page: number = 1, pageSize: number = 10): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        // Encode le terme de recherche pour l'utiliser dans l'URL
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        // Construisez l'URL avec les paramètres de la requête
        const url = `${getBaseUrl()}/users-search?term=${encodedSearchTerm}&page=${page}&size=${pageSize}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Vérifiez si la réponse est correcte
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};


export const getUserWalletById = async (): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token manquant');
    }

    // Décoder le token
    const decodedToken = jwt.decode(token) as DecodedToken | null;

    if (!decodedToken) {
        throw new Error('Votre session a expiré, merci de vous reconnecter.');
    }

    const id = decodedToken.id;
    try {
        const response = await fetch(`${getBaseUrl()}/settings/${id}/walle`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};