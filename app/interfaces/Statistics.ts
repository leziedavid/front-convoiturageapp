// Define interfaces for nested objects

interface Point {
    lat: number;
    lon: number;
}

interface Wallet {
    balance: number;
}

interface Trajet {
    id: string;
    utilisateur_id: string;
    point_depart: Point;
    ville_depart: string;
    point_arrivee: Point;
    ville_arrivee: string;
    temps_depart_prevu: string; // You might want to use Date type if you're parsing dates
    temps_arrivee_prevu: string; // Same as above
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position: any; // You may want to specify a more precise type if possible
    mode_transport: string;
    nombre_de_places: number;
    price: number;
    vehicule_id: string;
    created_at: string; // You might want to use Date type
    updated_at: string; // Same as above
}

interface UserDetail {
    id: string;
    username: string;
    email: string;
    password_hash: string; // Be careful with sensitive information
    role: string;
    photo_url: string;
    contact_number: string;
    address: string;
    bio: string | null;
    date_of_birth: string | null; // You might want to use Date type
    created_at: string; // You might want to use Date type
    updated_at: string; // Same as above
    last_login: string | null; // You might want to use Date type
    is_active: boolean;
    verification_status: string;
    token: string | null;
    wallet: Wallet,
    rechargements:Rechargements
}

// Define the main interface for the API response

interface Statistics {
    totalCourses: number;
    numberOfVehicles: number;
    totalAmount: number;
    lastTrajet: Trajet;
    userDetail: UserDetail;
}

interface Rechargements {
amount: string;
date: string;
description: string;
paymentMethod: string;
status: string;
utilisateurId: string;
walletId: string;
}
