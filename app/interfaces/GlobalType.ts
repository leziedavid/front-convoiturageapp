// UserInterface.ts

// Définition des interfaces pour les modèles liés
export interface Trajet {
    id: string;
    utilisateur_id: string;
    point_depart: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    ville_depart: string;
    point_arrivee: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    ville_arrivee: string;
    temps_depart_prevu: string; // Utiliser ISO 8601 string pour les dates
    temps_arrivee_prevu: string; // Utiliser ISO 8601 string pour les dates
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position?: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    mode_transport: string;
    nombre_de_places: number;
    price?: number;
    arrets: Arret[];
    commandes: Commande[];
}

export interface Commande {
    id: string;
    numeroCommande: string;
    trajet_id: string;
    utilisateur_id: string;
    conducteur_id: string;
    point_prise_en_charge?: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    point_depose?: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    temps_prise_en_charge: string; // Utiliser ISO 8601 string pour les dates
    temps_depose: string; // Utiliser ISO 8601 string pour les dates
    statut_commande: string;
    montant?: number;
    mode_paiement?: string;
    commentaires_instructions?: string;
    date_creation: string; // Utiliser ISO 8601 string pour les dates
    date_modification: string; // Utiliser ISO 8601 string pour les dates
    historique_statuts?: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    evaluations?: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    date_action?: string; // Utiliser ISO 8601 string pour les dates
    trajet: Trajet;
    utilisateur: User;
    conducteur: User;
    reponsesConducteur: ReponseConducteur[];
    
}

export interface Arret {
    id: string;
    trajet_id: string;
    nom: any; // Utiliser 'any' pour JSON ou définir un type plus précis
    ville: string;
    date_creation: string; // Utiliser ISO 8601 string pour les dates
    date_modification: string; // Utiliser ISO 8601 string pour les dates
    trajet: Trajet;
}

export interface ReponseConducteur {
    id: string;
    commande_id: string;
    conducteur_id: string;
    temps_reponse: string; // Utiliser ISO 8601 string pour les dates
    statut_reponse: string;
    commentaires?: string;
    commande: Commande;
    conducteur: User;
}

export interface Vehicule {
    id: string;
    utilisateur_id: string;
    marque: string;
    modele: string;
    annee: number;
    plaque: string;
    couleur?: string;
    permis?: string;
    carte_grise?: string;
    date_creation: string; // Utiliser ISO 8601 string pour les dates
    date_modification: string; // Utiliser ISO 8601 string pour les dates
    utilisateur: User;
}

// Définition de l'interface User
export interface User {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    photo_url?: string;
    contact_number?: string;
    address?: string;
    bio?: string;
    date_of_birth?: string; // Utiliser ISO 8601 string pour les dates
    created_at: string; // Utiliser ISO 8601 string pour les dates
    updated_at: string; // Utiliser ISO 8601 string pour les dates
    last_login?: string; // Utiliser ISO 8601 string pour les dates
    is_active: boolean;
    verification_status: string;
    token?: string;
    trajets: Trajet[];
    commandes: Commande[];
    reponsesConducteur: ReponseConducteur[];
    commandesConducteur: Commande[];
    vehicules: Vehicule[];
    rechargements: Rechargements[];

}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: string;
    paymentMethod: string;
    status: string;
}

export interface Rechargements {
    id: string;
    amount: string;
    date: string;
    description: string;
    paymentMethod: string;
    status: string;
    utilisateurId: string;
    walletId: string;
    }