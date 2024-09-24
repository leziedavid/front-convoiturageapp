"use client";

import React from 'react';
import Link from 'next/link';
import { User, History, MapPin, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Utilisation de next/navigation

const DesktopNavBarDriver: React.FC = () => {
        const pathname = usePathname(); // Utilisation du hook usePathname

        return (
                <div className="flex md:flex-col overflow-x-auto gap-2">
                        <Link
                                href="/conducteur"
                                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${pathname === '/conducteur' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                                        }`}
                                aria-label="Account"
                        >
                                <User className="h-5" />
                                Compte
                        </Link>
                        <Link
                                href="/conducteur/commande"
                                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${pathname === '/conducteur/commande' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                                        }`}
                                aria-label="Orders"
                        >
                                <History className="h-5" />
                                Commandes
                        </Link>
                        <Link
                                href="/conducteur/trajets"
                                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${pathname === '/conducteur/trajets' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                                        }`}
                                aria-label="Journey"
                        >
                                <MapPin className="h-5" />
                                Trajet
                        </Link>
                        <Link
                                href="/conducteur/settings"
                                className={`flex gap-1 items-center p-2 px-2 text-sm text-nowrap rounded-sm shadow-sm ${pathname === '/conducteur/settings' ? 'bg-[#f7872e] text-white' : 'bg-gray-200 text-black hover:bg-[#f7872e] hover:text-white'
                                        }`}
                                aria-label="Settings"
                        >
                                <Settings className="h-5" />
                                Parametre
                        </Link>
                </div>
        );
};

export default DesktopNavBarDriver;
