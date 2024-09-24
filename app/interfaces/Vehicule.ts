// src/interfaces/Vehicule.ts
export interface Vehicule {
    id: string;
    marque: string;
    modele: string;
    annee: number;
    plaque: string;
    couleur?: string;
    permis?: string;
    carte_grise?: string;
    date_creation: string;
    date_modification: string;
    utilisateur_id: string;
}
