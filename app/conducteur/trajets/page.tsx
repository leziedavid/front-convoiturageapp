"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Calendar, ChevronRight, Lock, Map, Users, X } from 'lucide-react';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import { BaseResponse } from '../../interfaces/ApiResponse';
import { User } from '../../interfaces/GlobalType';
import { getUserInfo } from '../../services/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UserProfil from '../../components/includes/userProfil';
import { getDriverTrajet } from '@/app/services/DriverServices';
import { TrajetResponse } from '@/app/interfaces/Trajet';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import Preloader from '@/app/components/Preloader';
import TrajetPreloader from '@/app/components/TrajetPreloader';
import TrajetNotFound from '@/app/components/TrajetNotFound';

const trajetsX = [
    {
        date: '10/10/2021',
        montant: '4 000 XOF',
        heureDepart: '08h00',
        adresseDepart: 'Abidjan, Côte d’Ivoire',
        heureArrivee: '12h00',
        adresseArrivee: 'Agboville, Côte d’Ivoire, Riviera',
    },
    {
        date: '10/10/2021',
        montant: '4 000 XOF',
        heureDepart: '08h00',
        adresseDepart: 'Abidjan, Côte d’Ivoire',
        heureArrivee: '12h00',
        adresseArrivee: 'Agboville, Côte d’Ivoire, Riviera',
    },
    {
        date: '10/10/2021',
        montant: '4 000 XOF',
        heureDepart: '08h00',
        adresseDepart: 'Abidjan, Côte d’Ivoire',
        heureArrivee: '12h00',
        adresseArrivee: 'Agboville, Côte d’Ivoire, Riviera',
    },
    // Ajoute plus de trajets ici si nécessaire
];

export default function Page() {

    const router = useRouter();
    const [response, setResponse] = useState<TrajetResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number, action: number) => {
        setIsModalOpen(false); // Fermer le modal après l'action
    };

    const handleNavigateToNewTrajet = () => {
        router.push('/conducteur/nouveau');
    };
    useEffect(() => {

        const fetchTrajetDrivers = async () => {

            try {

                setLoading(true);
                const res = await getDriverTrajet();
                if (res.code === 200) {
                    const adaptedResponse: TrajetResponse = {
                        trajets: res.data
                    };
                    setResponse(adaptedResponse);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                    console.log(res.data);
                }
            } catch (err) {

                setError('Error fetching user info');
                console.error('Error fetching user info:', err);
                setLoading(false);

            }
        };

        fetchTrajetDrivers();
    }, []);


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="min-h-full">
                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Mes trajets
                            </h1>
                        </div>
                    </header>
                </div>
                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white p-2">
                            <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                <div className="py-2">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-10 justify-between">
                                        <div className="hidden col-span-1 md:col-span-3 group md:block flex-shrink-0">
                                            <UserProfil />
                                            <div className="sm:flex flex-col gap-3 py-5">
                                                <div className="basis-1/5 h-lvh">
                                                    <DesktopNavBarDriver />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 sm:col-span-9 mt-6 sm:mt-0">
                                            <div className="mx-auto max-w-7xl">
                                                <div className="flex justify-between">
                                                    <div className="max-w-2xl lg:max-w-4xl lg:px-0">
                                                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                            Mes trajets
                                                        </h1>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Liste des trajets enregistrés
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 flex justify-end">
                                                        <button type="button" onClick={handleNavigateToNewTrajet}
                                                            className="text-sm font-semibold leading-6 text-white p-1 px-4 bg-zinc-700 hover:bg-gray-800">
                                                            Crée un trajet
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <section aria-labelledby="recent-heading" className="mt-10">

                                                {loading ? (

                                                    <TrajetPreloader />

                                                ) : (

                                                <div className="mx-auto max-w-2xl space-y-5 sm:px-2 lg:max-w-4xl lg:px-0">

                                                    {response && response?.trajets.length ? (
                                                        response.trajets.map((trajet, index) => (

                                                            <div key={index} className="relative shadow-md border-none bg-white rounded-md border-2 p-3">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="text-sm flex justify-items-center items-center">
                                                                        <Calendar name="Calendar" className="h-5" /> Ajouter le {DateTime(trajet.created_at)}
                                                                    </div>
                                                                    <div className="text-sm flex justify-items-center items-center">
                                                                        <div className="text-sm">
                                                                            Montant :
                                                                            <span className="text-[#f7872e]">{trajet.price}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="flex justify-between gap-2 py-4">
                                                                        <div>
                                                                            <div className="md:text-left">
                                                                                <span className="text-xs md:text-sm text-white font-bold bg-stone-600 p-1 rounded">
                                                                                { DateHeur(trajet.temps_depart_prevu)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="md:text-left">
                                                                                <span className="text-xs text-neutral-700 md:text-sm font-bold w-16">
                                                                                    {trajet.ville_depart}   Cote d’ivoire,adjamé, 253 rue 263
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-auto flex justify-center items-center">
                                                                            <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                                                            <ChevronRight name="ChevronRight" className="w-4 font-bold text-xl" />
                                                                        </div>
                                                                        <div>
                                                                            <div className="md:text-left">
                                                                                <span className="text-xs md:text-sm text-white font-bold bg-stone-600 p-1 rounded">
                                                                                { DateHeur(trajet.temps_arrivee_prevu)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="md:text-left">
                                                                                <span className="text-xs text-neutral-700 md:text-sm font-bold">
                                                                                {trajet.ville_arrivee} Cote d’ivoire,adjamé, 253 rue 263
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-end gap-2">

                                                                    <button onClick={() => setShowDrawer(true)} className="rounded text-xs font-semibold leading-6 text-white p-1 px-4 bg-[#f7872e] hover:bg-[#a1683a]">
                                                                        Détail du trajet
                                                                    </button>

                                                                    {trajet.commandes.length === 0 ? (
                                                                        <button className="rounded text-xs font-semibold leading-6 text-white p-1 px-3 bg-red-600 hover:bg-red-800">
                                                                            <X name="X" className="w-4" />
                                                                        </button>
                                                                    ) : null}

                                                                </div>
                                                            </div>
                                                        ))

                                                    ) : (
                                                        <TrajetNotFound/>
                                                    )}
                                                </div>
                                                
                                                )}
            

                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showDrawer && (
                        <div className="relative z-30" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                            <div className="fixed inset-0 overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                                        <div className="pointer-events-auto relative w-screen max-w-md">
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                                <div className="px-4 sm:px-6">
                                                    <div className="flex justify-between">
                                                        <h2 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">
                                                            Détail du trajet
                                                        </h2>
                                                        <div>
                                                            <X name="X" className="cursor-pointer" onClick={() => setShowDrawer(false)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                    {/* Contenu du drawer */}
                                                    kjsqdfbsjkb
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Menu mobile */}
                    <MobileNavBarDriver />
                    {/* Menu mobile */}
                </main>
            </div>


        </>
    );
}
