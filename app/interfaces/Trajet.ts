// trajet.ts

import { Arret } from "./GlobalType";

// Interface pour représenter les coordonnées géographiques
export interface Coordonnees {
    lat: number;
    lon: number;
}

// Interface pour représenter un utilisateur
export interface Utilisateur {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    photo_url: string;
    contact_number: string;
    address: string;
    bio: string | null;
    date_of_birth: string | null;
    created_at: string;
    updated_at: string;
    last_login: string | null;
    is_active: boolean;
    verification_status: string;
    token: string | null;
}

// Interface pour représenter un véhicule
export interface Vehicule {
    id: string;
    utilisateur_id: string;
    marque: string;
    modele: string;
    annee: number;
    plaque: string;
    couleur: string;
    permis: string;
    carte_grise: string;
    date_creation: string;
    date_modification: string;
}

// Interface pour représenter une commande
export interface Commande {
    id: string;
    numeroCommande: string;
    trajet_id: string;
    utilisateur_id: string;
    conducteur_id: string;
    point_prise_en_charge: object; // Remplacer par le type approprié si nécessaire
    point_depose: object; // Remplacer par le type approprié si nécessaire
    temps_prise_en_charge: string;
    temps_depose: string;
    statut_commande: string;
    montant: number;
    mode_paiement: string;
    commentaires_instructions: string;
    date_creation: string;
    date_modification: string;
    historique_statuts: object; // Remplacer par le type approprié si nécessaire
    evaluations: object; // Remplacer par le type approprié si nécessaire
    date_action: string;
}

// Interface pour représenter un trajet
export interface Trajet {
    id: string;
    utilisateur_id: string;
    point_depart: Coordonnees;
    ville_depart: string;
    point_arrivee: Coordonnees;
    ville_arrivee: string;
    temps_depart_prevu: string;
    temps_arrivee_prevu: string;
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position: string | null;
    mode_transport: string;
    nombre_de_places: number;
    price: number;
    vehicule_id: string;
    created_at: string;
    updated_at: string;
    commandes: Commande[];
    utilisateur: Utilisateur;
    vehicule: Vehicule;
    arrets: Arret[];
}

// Interface pour représenter la réponse de l'API contenant un tableau de trajets
export interface TrajetResponse {
    trajets: Trajet[];
    total: number; // Ajoutez la propriété total
}
