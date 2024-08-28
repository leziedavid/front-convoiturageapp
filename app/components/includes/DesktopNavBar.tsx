"use client";

import React from 'react';
import { User, History, MapPin, Settings } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import Link from 'next/link';

const DesktopNavBar: React.FC = () => {
    return (
        <div className="flex md:flex-col overflow-x-auto gap-2">

            <Link href="/compte"
                className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap"
                aria-label="Account">
                <User className="h-5" />
                Compte
            </Link>

            <Link href="/compte/history"
                className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap"
                aria-label="History" >
                <History className="h-5"/>
                Historique
            </Link>

            <Link
                href="/trajets/details"
                className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap"
                aria-label="Journey">
                <MapPin className="h-5" />
                Trajet
            </Link>

            <Link
                href="/compte/settings"
                className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap"
                aria-label="Settings">
                <Settings className="h-5" />
                Paramètre
            </Link>

        </div>
    );
};

export default DesktopNavBar;
