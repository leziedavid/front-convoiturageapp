"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Check, Route,Map, ChevronRight } from 'lucide-react';
import DesktopNavBar from '../../components/includes/DesktopNavBar';
import MobileNavBar from '../../components/includes/MobileNavBar';
import { BaseResponse } from '../../interfaces/ApiResponse';
import { Commande, User } from '../../interfaces/GlobalType';
import { getUserInfo } from '../../services/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { getAllPassageerCommandes } from '@/app/services/PassagerServices';
import TrajetPreloader from '@/app/components/TrajetPreloader';
import ClientTrajetNotFound from '@/app/components/ClientTrajetNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import UserProfil from '@/app/components/includes/userProfil';

export default function Page() {


    const router = useRouter();

    const [response, setResponse] = useState<Commande[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUserInfo = async () => {

            try {

                const res = await  getAllPassageerCommandes()

                if(res.code==200){

                    setResponse(res.data);

                }

            } catch (err) {

                setError('Error fetching user info');
                console.error('Error fetching user info:', err);

            } finally {
            }
        };

        fetchUserInfo();

        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);

    const orders = [
        {
            number: 'N° F243523',
            amount: '4 000 XOF',
            startTime: '08h00',
            startAddress: 'Abidjan, Cote d’Ivoire, Adjamé, 253 rue 263',
            endTime: '12h00',
            endAddress: 'Agboville, Cote d’Ivoire, Riviera, 276 post 365E FDTF',
            date: '10/10/2021',
        },
        {
            number: 'N° F243523',
            amount: '4 000 XOF',
            startTime: '08h00',
            startAddress: 'Abidjan, Cote d’Ivoire, Adjamé, 253 rue 263',
            endTime: '12h00',
            endAddress: 'Agboville, Cote d’Ivoire, Riviera, 276 post 365E FDTF',
            date: '10/10/2021',
        },
        
        // Ajoutez plus de commandes ici si nécessaire
    ];
    
    return (

        <>
            <Toaster position="top-right" reverseOrder={false}/>

            <div className="min-h-full">

                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Historique de course 📑
                            </h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white p-2">
                            <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                <div className="py-2 md:py-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-10 justify-between">
                                        <div className="hidden col-span-1 sm:col-span-3 group sm:block flex-shrink-0">

                                            <UserProfil />
                                            
                                            <div className="sm:flex flex-col gap-3 py-5">
                                                <div className="basis-1/5 h-lvh">
                                                    <DesktopNavBar />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-1 sm:col-span-9 mt-6 sm:mt-0">

                                            <div className="mx-auto max-w-7xl">

                                                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-0">
                                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                        Historique
                                                    </h1>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Vous pouvez suivre l&apos;historique de vos courses
                                                    </p>
                                                </div>
                                            </div>

                                            <section aria-labelledby="recent-heading" className="mt-10">


                                                {loading ? (

                                                    <TrajetPreloader />

                                                ) : (

                                                    <div className="mx-auto max-w-2xl space-y-5 sm:px-2 lg:max-w-4xl lg:px-0">

                                                            {response && response.length ? (

                                                                response.map((order, index) => (

                                                                    <div key={index} className={`relative border-gray-200 bg-white shadow-md rounded-xl border-2 border-dashed p-3 ${[1, 2].includes(index) ? 'border-[#166813a5]' : [3].includes(index) ? 'border-[#cd2121a5]' : ''}`}>
                                                                        
                                                                        <div className="flex justify-between items-center">
                                                                            <div className="text-sm sm:text-base text-black bg-orange-200 px-2">
                                                                                {order.numeroCommande}
                                                                            </div>
                                                                            <div className="text-sm sm:text-base">
                                                                                Montant : <span className="text-[#f7872e]">{order.montant}</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex justify-between items-center">
                                                                            <div className="flex justify-between gap-2 py-8">
                                                                                <div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs md:text-sm text-white font-bold bg-stone-800 p-1 rounded">
                                                                                        { DateHeur(order.trajet.temps_depart_prevu)}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs md:text-sm font-bold w-16">
                                                                                        {order.trajet.ville_depart}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="w-auto flex justify-center items-center">
                                                                                    <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                                                                    <ChevronRight name="ChevronRight" className="w-4 font-bold text-xl" />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs md:text-sm text-white font-bold bg-stone-800 p-1 rounded">
                                                                                            { DateHeur(order.trajet.temps_arrivee_prevu)}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs md:text-sm font-bold">
                                                                                            {order.trajet.ville_arrivee}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="absolute bottom-2 right-2 text-sm flex justify-items-center items-center">
                                                                            <Calendar name="Calendar" className="h-5" /> le  { DateTime(order.date_creation)}
                                                                        </div>

                                                                    </div>
                                                                ))

                                                            ) : (
                                                                <ClientTrajetNotFound/>
                                                            )}

                                                    </div>

                                                )}

                                            </section>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Fin du contenu */}
                        </div>
                    </div>
                    {/* Menu mobile */}
                    <MobileNavBar />
                    {/* Menu mobile */}
                </main>
            </div>

        </>

    )
}