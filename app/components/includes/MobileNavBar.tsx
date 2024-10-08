"use client";

import React from 'react';
import { User, History, MapPin, Settings } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Assurez-vous d'utiliser le bon import

const MobileNavBar: React.FC = () => {
    const pathname = usePathname(); // Utilisez usePathname pour obtenir le chemin actuel

    return (
        <div className="sm:hidden fixed bottom-0 right-0 w-full bg-black text-white p-2 shadow-xl">
            <div className="grid grid-cols-4 gap-2 md:flex-col">
                <Link
                    href="/compte"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/compte' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                    aria-label="Compte"
                >
                    <User className="h-5" />
                    <div>Compte</div>
                </Link>

                <Link
                    href="/compte/history"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/compte/history' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                    aria-label="Historique"
                >
                    <History className="h-5" />
                    Historique
                </Link>

                <Link
                    href="/trajets/details"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/trajets/details' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                    aria-label="Trajet"
                >
                    <MapPin className="h-5" />
                    Trajet
                </Link>

                <Link
                    href="/compte/settings"
                    className={`flex flex-col justify-center gap-1 items-center shadow-md rounded-md p-2 px-2 text-sm text-nowrap ${pathname === '/compte/settings' ? 'bg-[#f7872e]' : 'hover:bg-[#f7872e]'}`}
                    aria-label="Paramètre"
                >
                    <Settings className="h-5" />
                    Paramètre
                </Link>
            </div>
        </div>
    );
};

export default MobileNavBar;
