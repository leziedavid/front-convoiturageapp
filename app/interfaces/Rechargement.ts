// rechargement.interface.ts

import { Utilisateur } from "./Users";

export interface Wallet {
    id: string;
    user_id: string;
    balance: string;
    currency_id: string;
    created_at: string;
    updated_at: string;
}

export interface Rechargement {
    id: string;
    date: string;
    description: string;
    amount: string; // Changer en `number` si tu utilises `Decimal` comme type
    paymentMethod: string;
    status: string;
    wallet_id: string;
    utilisateur_id: string;
    utilisateur: Utilisateur;
    wallet: Wallet;
}

export interface RechargementsResponse {
    data: Rechargement[];
    total: number;
}
