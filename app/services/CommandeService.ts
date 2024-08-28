import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';

const BASE_URL = 'http://localhost:4000/api';

interface DecodedToken {
    id: string;
    exp: number;
}

// Modifier le type de `tempsReponse` pour qu'il accepte une chaîne de caractères
export const sendCommande = async (
    commandeId: string,
    conducteurId: string,
    commentaires: string,
    statutReponse: string,
    tempsReponse: string // Type corrigé en chaîne de caractères
): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/reponseConducteur`, { // Remplace `/endpoint` par l'endpoint réel
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commande_id: commandeId,
                conducteur_id: conducteurId,
                commentaires: commentaires,
                statut_reponse: statutReponse,
                temps_reponse: tempsReponse // Inclure le temps formaté en chaîne de caractères
            }),
        });

        if (!response.ok) {
            // Gestion des erreurs HTTP
            const errorText = await response.text();
            throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
        }

        // Retourner la réponse JSON
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande:', error);
        throw error;
    }
};
