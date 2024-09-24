// dateUtils.ts

/**
 * Formate une date au format "hh:mm dd/MM/yyyy".
 * @param dateTime La chaîne de date à formater, au format ISO 8601.
 * @returns La chaîne formatée.
 */
export const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);

    // Extraire les heures, minutes, jour, mois et année
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const day = date.getUTCDate().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajouter 1
    const year = date.getUTCFullYear(); // Année

    // Formater la date et l'heure
    return `${hours}h${minutes} ${day}/${month}/${year}`;
};
export const DateHeur = (dateTime: string | undefined): string => {
    // Vérifier si dateTime est défini et si la date est valide
    if (!dateTime) {
        return 'Date non valide';
    }
    const date = new Date(dateTime);
    // Vérifier si la date est invalide
    if (isNaN(date.getTime())) {
        return 'Date non valide';
    }
    // Extraire les heures, minutes, jour, mois et année
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    // Formater l'heure
    return `${hours}h${minutes}`;
};

export const DateTime = (dateTime: string): string => {
    const date = new Date(dateTime);

    // Extraire les heures, minutes, jour, mois et année
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const day = date.getUTCDate().toString().padStart(2, '0'); // Convertir en chaîne et ajouter un zéro initial si nécessaire
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajouter 1
    const year = date.getUTCFullYear(); // Année

    // Formater la date et l'heure
    return ` ${day}/${month}/${year}`;
};

