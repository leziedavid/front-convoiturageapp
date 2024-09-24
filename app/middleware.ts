// app/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    exp: number;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Vérifie le token
    const graphe = request.cookies.get('Graphe'); // Récupère le graphe

    // Vérifie si le token est présent
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Décoder le token pour vérifier son expiration
    let decodedToken: DecodedToken | null = null;
    try {
        decodedToken = jwt.decode(token.value) as DecodedToken;
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url)); // Redirige si le token est invalide
    }

    // Vérifier si le token est expiré
    const currentTime = Math.floor(Date.now() / 1000); // Temps en secondes
    if (decodedToken.exp < currentTime) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token'); // Supprimer le token expiré
        response.cookies.delete('Graphe');
        return response;
    }

    // Vérifie si graphe existe avant de l'utiliser
    if (graphe && graphe.value) {
        if (graphe.value === "1") {
            return NextResponse.redirect(new URL('/compte', request.url));
        } else if (graphe.value === "2") {
            return NextResponse.redirect(new URL('/conducteur', request.url));
        } else if (graphe.value === "3") {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    // Gérer la déconnexion si le chemin d'accès est `/logout`
    if (request.nextUrl.pathname === '/logout') {
        // Supprimer le token et rediriger
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('token');
        response.cookies.delete('Graphe');
        return response;
    }

    return NextResponse.next(); // Continue à la page demandée
}

// Configuration du middleware
export const config = {
    matcher: ['/conducteur/:path*', '/compte/:path*', '/admin/dashboard/:path*', '/logout'],
};
