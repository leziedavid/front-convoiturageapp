"use client";

import React from 'react';
import Link from 'next/link';

import { User, History, MapPin, Settings, Box } from 'lucide-react';
const DesktopNavBarDriver: React.FC = () => {
        return (

                <div className="flex md:flex-col overflow-x-auto gap-2">
                        <Link href="/conducteur" className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap">
                                <User name="User" className="h-5" /> Compte
                        </Link>
                        <Link href="/conducteur/commande" className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap">
                                <History name="History" className="h-5" /> Commandes
                        </Link>
                        <Link href="/conducteur/trajets" className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap">
                                <MapPin name="MapPin" className="h-5" /> Trajet
                        </Link>
                        <Link href="/conducteur/settings" className="flex gap-1 items-center bg-gray-200 hover:bg-[#f7872e] hover:text-white text-black shadow-sm rounded-sm p-2 px-2 text-sm text-nowrap">
                                <Settings name="Settings" className="h-5" /> Parametre
                        </Link>
                </div>

        );
};

export default DesktopNavBarDriver;
