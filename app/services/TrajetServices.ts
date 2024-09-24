import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl} from "./baseUrl";

interface DecodedToken {
    id: string;
    exp: number;
}

interface TrajetFormData {
    utilisateur_id: string;
    point_depart: { lat: number; lon: number };
    ville_depart: string;
    point_arrivee: { lat: number; lon: number };
    ville_arrivee: string;
    temps_depart_prevu: string;
    temps_arrivee_prevu: string;
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    mode_transport: string;
    price: number;
    nombre_de_places: number;
    vehicule_id: string;
    arrets: { lat: number; lon: number; ville: string }[];
}


// Service pour récupérer tous les trajets avec pagination
export const getAllTrajet = async (page: number, limit: number): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/trajets?page=${page}&limit=${limit}`, {
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

export const getAllTrajetById = async (id:string): Promise<BaseResponse<any>> => {

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${getBaseUrl()}/trajets/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',},
        });
        return await response.json();

    } catch (error) {
        console.error('Error getting user info:', error);
        throw error;
    }
};

export const trajetOnSubmit = async (data: TrajetFormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/trajets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convertir les données en JSON
        });

        if (!response.ok) {
            // Si la réponse n'est pas OK, lancer une erreur avec le statut
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Erreur lors de la requête');
        }

        return await response.json(); // Retourner la réponse JSON

    } catch (error: any) {
        // Assurez-vous que l'erreur est bien typée et formatée
        throw new Error(error.message || 'Erreur réseau');
    }
};

export const SearchTrajet1 = async (data: any): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/search-trajets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // if (!response.ok) {
        //     const errorResponse = await response.json();
        //     throw new Error(errorResponse.message || 'Erreur lors de la requête');
        // }

        return await response.json(); // Retourner la réponse JSON

    } catch (error: any) {

        throw new Error(error.message || 'Erreur réseau');
    }
};

export const SearchTrajet = async (data: { point_depart: any, point_arrivee: any, temps_depart_prevu: string, nombre_de_places: number, page: number, limit: number }): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/search-trajets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Erreur lors de la requête');
        }

        return await response.json(); // Retourner la réponse JSON

    } catch (error: any) {
        throw new Error(error.message || 'Erreur réseau');
    }
};
