"use client";

import React from 'react';
import { User, Box, MapPin, Settings } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Assurez-vous d'utiliser le bon import

const MobileNavBar: React.FC = () => {
    const pathname = usePathname(); // Utilisez usePathname pour obtenir le chemin actuel

    return (
        <div className="md:hidden fixed bottom-0 right-0 w-full bg-black text-white p-2 shadow-xl">
            <div className="grid grid-cols-4 justify-between md:flex-col gap-2">
                <Link
                    href="/conducteur"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/conducteur' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                >
                    <User className="h-5" />
                    <div>Compte</div>
                </Link>

                <Link
                    href="/conducteur/commande"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/conducteur/commande' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                >
                    <Box className="h-5" /> Commandes
                </Link>

                <Link
                    href="/conducteur/trajets"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/conducteur/trajets' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                >
                    <MapPin className="h-5" /> Trajet
                </Link>

                <Link
                    href="/conducteur/settings"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/conducteur/settings' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                >
                    <Settings className="h-5" /> Parametre
                </Link>
            </div>
        </div>
    );
};

export default MobileNavBar;
