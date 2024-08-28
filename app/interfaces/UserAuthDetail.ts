// src/types/UserAuthDetail.ts

export interface UserAuthDetail {
    id: string; // Identifiant unique de l'utilisateur
    username: string; // Nom d'utilisateur
    email: string; // Adresse e-mail de l'utilisateur
    password_hash: string; // Hash du mot de passe (ne pas utiliser directement dans l'interface, souvent pour l'authentification)
    role: string; // Rôle de l'utilisateur (par exemple, 'Conducteur')
    photo_url: string; // URL de la photo de l'utilisateur
    contact_number: string; // Numéro de contact de l'utilisateur
    address: string; // Adresse de l'utilisateur
    bio: string | null; // Biographie de l'utilisateur (peut être null)
    date_of_birth: string | null; // Date de naissance de l'utilisateur (peut être null)
    created_at: string; // Date de création du compte (format ISO 8601)
    updated_at: string; // Date de la dernière mise à jour du compte (format ISO 8601)
    last_login: string | null; // Date de dernière connexion (peut être null)
    is_active: boolean; // Statut actif de l'utilisateur
    verification_status: string; // Statut de vérification (par exemple, 'pending')
    token: string | null; // Token d'authentification (peut être null)
}
