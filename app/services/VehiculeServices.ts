import { BaseResponse } from "../interfaces/ApiResponse";

const BASE_URL = 'http://localhost:4000/api';

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
        const response = await fetch(`${BASE_URL}/vehicule`, {
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
