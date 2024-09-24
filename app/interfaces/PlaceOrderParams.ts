// Définir les types appropriés pour les nouvelles propriétés
interface Point {
    // Définis les propriétés nécessaires pour le point
}

interface HistoriqueStatuts {
    // Définis les propriétés nécessaires pour l'historique des statuts
}

interface Evaluations {
    // Définis les propriétés nécessaires pour les évaluations
}

interface PlaceOrderParams {
    trajetId: string;
    utilisateurId: string;
    conducteurId: string;
    pointPriseEnCharge: Point;
    pointDepose: Point;
    tempsPriseEnCharge: string; // ISO 8601 string
    tempsDepose: string; // ISO 8601 string
    statutCommande: string;
    montant: number;
    modePaiement: string;
    commentairesInstructions: string;
    dateAction: string; // ISO 8601 string
    historiqueStatuts: HistoriqueStatuts;
    evaluations: Evaluations;
}
