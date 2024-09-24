// services/contactService.ts
import { BaseResponse } from "../interfaces/ApiResponse";
import { getBaseUrl } from "./baseUrl";
// Définir une fonction pour envoyer les données du formulaire de contact

export const sendContactMessage = async (nom: string, email: string, sujet: string, message: string): Promise<BaseResponse<any>> => {
    
    try {
        const response = await fetch(`${getBaseUrl()}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom, email, sujet, message }),
        });

        // Vérifiez si la réponse est OK (status 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'envoi du message.');
        }

        // Parsez la réponse JSON
        const data: BaseResponse<any> = await response.json();
        return data;

    }  catch (error) {
        throw error;
    }

};
