"use client";

import React from 'react';
import { User, History, MapPin, Settings, Box } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import Link from 'next/link';
const MobileNavBar: React.FC = () => {
    return (
        <div className="md:hidden fixed bottom-0 right-0 w-full bg-black text-white p-2 shadow-xl">
            <div className="grid grid-cols-4 justify-between md:flex-col gap-2">
                <Link href="/conducteur" className="flex flex-col justify-center gap-1 items-center bg-[#f7872e] text-white shadow-md rounded-md p-2 px-2 text-sm text-nowrap">
                    <User name="User" className="h-5" />
                    <div>
                        Compte
                    </div>
                </Link>

                <Link href="/conducteur/commande" className="flex flex-col justify-center gap-1 items-center hover:bg-[#f7872e] text-white shadow-md rounded-md p-2 px-2 text-sm text-nowrap">
                    <Box name="Box" className="h-5" /> Commandes
                </Link>
                <Link href="/conducteur/trajets" className="flex flex-col justify-center gap-1 items-center hover:bg-[#f7872e] text-white shadow-md rounded-md p-2 px-2 text-sm text-nowrap">
                    <MapPin name="MapPin" className="h-5" /> Trajet
                </Link>
                <Link href="/conducteur/settings" className="flex flex-col justify-center gap-1 items-center hover:bg-[#f7872e] text-white shadow-md rounded-md p-2 px-2 text-sm text-nowrap">
                    <Settings name="Settings" className="h-5" /> Parametre
                </Link>
            </div>
        </div>
    );
};

export default MobileNavBar;
