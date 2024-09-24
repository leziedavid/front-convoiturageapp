// detailCommandes.ts

export interface Point {
    lat: number;
    lon: number;
}

export interface Trajet {
    id: string;
    utilisateur_id: string;
    point_depart: Point;
    ville_depart: string;
    point_arrivee: Point;
    ville_arrivee: string;
    temps_depart_prevu: string; // ISO 8601 date string
    temps_arrivee_prevu: string; // ISO 8601 date string
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position: any; // Adjust type if more details are available
    mode_transport: string;
    nombre_de_places: number;
    price: number;
    vehicule_id: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

export interface Utilisateur {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    photo_url: string;
    contact_number?: string;
    address?: string;
    bio?: string;
    date_of_birth?: string; // ISO 8601 date string
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    last_login?: string; // ISO 8601 date string
    is_active: boolean;
    verification_status: string;
    token?: string;
}

export interface ReponseConducteur {
    // Define fields as per your schema
    // Example fields (adjust as needed):
    id: string;
    commande_id: string;
    conducteur_id: string;
    reponse: string;
    date_reponse: string; // ISO 8601 date string
}

export interface Commande {
    id: string;
    numeroCommande: string;
    trajet_id: string;
    utilisateur_id: string;
    conducteur_id: string;
    point_prise_en_charge: any; // Adjust type if more details are available
    point_depose: any; // Adjust type if more details are available
    temps_prise_en_charge: string; // ISO 8601 date string
    temps_depose: string; // ISO 8601 date string
    statut_commande: string;
    montant: number;
    mode_paiement: string;
    commentaires_instructions: string;
    date_creation: string; // ISO 8601 date string
    date_modification: string; // ISO 8601 date string
    historique_statuts: any; // Adjust type if more details are available
    evaluations: any; // Adjust type if more details are available
    date_action?: string; // ISO 8601 date string
    trajet: Trajet;
    utilisateur: Utilisateur;
    conducteur: Utilisateur;
    reponsesConducteur: ReponseConducteur[];
}

export interface DetailCommandesResponse {
    commandes: Commande[];
    total: number; // Ajoutez la propriété total
}
