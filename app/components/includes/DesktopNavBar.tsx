"use client";

import React, { useCallback, useEffect } from 'react';
import { User, History, MapPin, Settings } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Utilisation de next/navigation

const DesktopNavBar: React.FC = () => {
    const pathname = usePathname(); // Utilisation du hook usePathname

    const router = useRouter();

    // Fonction pour gérer la déconnexion
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Graphe');
        document.cookie = 'token=; Max-Age=0; path=/';
        document.cookie = 'Graphe=; Max-Age=0; path=/';
        router.push('/');
    };

    const checkToken = useCallback(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            router.push('/');
            return;
        }
    }, [router]);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    return (
        <div className="flex md:flex-col overflow-x-auto gap-2">
            <Link
                href="/compte"
                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${
                    pathname === '/compte' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                }`}
                aria-label="Account"
            >
                <User className="h-5" />
                Compte
            </Link>

            <Link
                href="/compte/history"
                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${
                    pathname === '/compte/history' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                }`}
                aria-label="History"
            >
                <History className="h-5"/>
                Historique
            </Link>

            <Link
                href="/trajets/details"
                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${
                    pathname === '/trajets/details' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                }`}
                aria-label="Journey"
            >
                <MapPin className="h-5" />
                Trajet
            </Link>

            <Link
                href="/compte/settings"
                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${
                    pathname === '/compte/settings' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                }`}
                aria-label="Settings"
            >
                <Settings className="h-5" />
                Paramètre
            </Link>
        </div>
    );
};

export default DesktopNavBar;
