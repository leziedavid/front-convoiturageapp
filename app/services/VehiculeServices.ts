import { BaseResponse } from "../interfaces/ApiResponse";
import { Vehicule } from '../interfaces/Vehicule';
import jwt from 'jsonwebtoken';
import { getBaseUrl } from "./baseUrl";

interface DecodedToken {
    id: string;
    exp: number;
}

interface VehiculeData {
    marque: string;
    modele: string;
    annee: Number;
    plaque: string;
    couleur: string;
    permis: string;
    carte_grise: string;
    utilisateur_id: string;
}

export const VehiculeFomeOnSubmit = async (data: VehiculeData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicule`, {
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

export const updateVehicule = async (id:string,data: VehiculeData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicule/${id}`, {
            method: 'PUT',
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


export const GetVehiculesByUserId = async (): Promise<BaseResponse<Vehicule[]>> => {
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
        const response = await fetch(`${getBaseUrl()}/vehicule/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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