import { Commande, Vehicule,Rechargements } from "./GlobalType";
import { Trajet} from "./Trajet";

export interface Utilisateur {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    photo_url: string | null;
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
    trajets: Trajet[];
    commandes: Commande[];
    reponsesConducteur: any[];
    commandesConducteur: Commande[];
    vehicules: Vehicule[];
    rechargements: Rechargements[];
}

export interface UsersResponse {
    users: Utilisateur[];
    total: number;
}