import { BaseResponse } from "../interfaces/ApiResponse";
import jwt from 'jsonwebtoken';
import { getBaseUrl } from "./baseUrl";
import toast from "react-hot-toast";


interface DecodedToken {
    id: string;
    exp: number;
}



// Modifier le type de `tempsReponse` pour qu'il accepte une chaîne de caractères
export const sendStateCommande = async (
    commandeId: string,
    newStatus: string,

): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/status/${commandeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                newStatus: newStatus,
            }),
        });

        if (!response.ok) {
            // Gestion des erreurs HTTP
            const errorText = await response.text();
            throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
        } else {
            toast.success('Commande mise à jour avec succès');
        }

        // Retourner la réponse JSON
        return await response.json();
    } catch (error) {

        throw error;
    }
};
export const sendStateCommandeByUsers = async (
    commandeId: string,
    newStatus: string,

): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/status-commande-users/${commandeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                newStatus: newStatus,
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

        throw error;
    }
};

export const sendCommande = async (
    commandeId: string,
    conducteurId: string,
    commentaires: string,
    statutReponse: string,
    tempsReponse: string // Type corrigé en chaîne de caractères
): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/reponseConducteur`, { // Remplace `/endpoint` par l'endpoint réel
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        throw error;
    }
};


// Fonction pour obtenir la date et l'heure actuelles en format ISO 8601
const getCurrentISODate = (): string => new Date().toISOString();

export const PlaceOrder = async (params: PlaceOrderParams): Promise<BaseResponse<any>> => {
    try {
        const {
            trajetId,
            utilisateurId,
            conducteurId,
            pointPriseEnCharge = {},
            pointDepose = {},
            tempsPriseEnCharge = getCurrentISODate(),
            tempsDepose = getCurrentISODate(),
            statutCommande = 'pending',
            montant = 0,
            modePaiement = 'string',
            commentairesInstructions = 'string',
            dateAction = getCurrentISODate(),
            historiqueStatuts = {},
            evaluations = {},
        } = params;

        const response = await fetch(`${getBaseUrl()}/commandes`, { // Remplace `/endpoint` par l'endpoint réel
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                trajet_id: trajetId,
                utilisateur_id: utilisateurId,
                conducteur_id: conducteurId,
                point_prise_en_charge: pointPriseEnCharge,
                point_depose: pointDepose,
                temps_prise_en_charge: tempsPriseEnCharge,
                temps_depose: tempsDepose,
                statut_commande: statutCommande,
                montant: montant,
                mode_paiement: modePaiement,
                commentaires_instructions: commentairesInstructions,
                date_action: dateAction,
                historique_statuts: historiqueStatuts,
                evaluations: evaluations,
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

        throw error;
    }
};

export const getAllcommandes = async (page: number, limit: number): Promise<BaseResponse<any>> => {
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
        const response = await fetch(`${getBaseUrl()}/commandes?page=${page}&limit=${limit}`, {

            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', },
        });

        return await response.json();

    } catch (error) {

        console.error('Error getting user info:', error);
        throw error;
    }
};



export const searchCommandes = async (
    numeroCommande?: string,
    dateCreation?: Date,
    username?: string,
    page: number = 1,
    pageSize: number = 10
): Promise<BaseResponse<any>> => {
    const token = localStorage.getItem('token');
    try {
        // Préparer les données de la requête
        const requestBody = {
            numeroCommande,
            dateCreation: dateCreation ? dateCreation.toISOString() : undefined,
            username,
            page,
            limit: pageSize
        };

        // Construisez l'URL pour l'appel API
        const url = `${getBaseUrl()}/commandes-search`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Envoyer les données sous forme JSON
        });

        // Vérifiez si la réponse est correcte
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error searching commandes:', error);
        throw error;
    }
};