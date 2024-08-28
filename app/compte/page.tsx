"use client";

import { Calendar, Check, Map } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ClientTrajetNotFound from '../components/ClientTrajetNotFound';
import DesktopNavBar from '../components/includes/DesktopNavBar';
import MobileNavBar from '../components/includes/MobileNavBar';
import TrajetPreloader from '../components/TrajetPreloader';
import { Commande } from '../interfaces/detailCommandes';
import { DateHeur, DateTime } from '../services/dateUtils';
import { getPassageerCommandes } from '../services/PassagerServices';
import UserProfil from '../components/includes/userProfil';

export default function Page() {


    const router = useRouter();

    const [response, setResponse] = useState<Commande | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUserInfo = async () => {

            try {

                const res = await getPassageerCommandes()
                if(res.code==200){
                    setResponse(res.data);
                    console.log(res.data);
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
    
    return (

        <>
            <Toaster position="top-right" reverseOrder={false}/>

            <div className="min-h-full">
                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Hello 👋🏾
                            </h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white p-2">
                            <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                <div className="py-2 md:py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 justify-between">
                                        <div className="col-span-1 sm:col-span-3 group block flex-shrink-0">

                                            <UserProfil />

                                            <div className="hidden md:flex flex-col gap-3 py-5">
                                                <div className="basis-1/5 h-lvh">
                                                    <DesktopNavBar />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-span-1 md:col-span-9 mt-6 sm:mt-0">
                                            <div className="mx-auto max-w-7xl">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                            Mon compte
                                                        </h1>
                                                        <p className="mt-2 text-sm text-gray-500">Suivez votre commande, configurez votre profil</p>
                                                    </div>
                                                </div>
                                            </div>



                                            {loading ? (

                                                <TrajetPreloader />

                                            ) : (

                                                <>

                                                {response &&  response?.id.length ? (
                                                        
                                                        <div className="py-8">

                                                            <div className="bg-orange-100 p-4 rounded-lg shadow">
                                                                <div>
                                                                    <h2 className="text-lg font-medium leading-6 text-gray-900">Ma commande</h2>
                                                                </div>
                                                                <div className="mt-2 flex  gap-4">
                                                                    <div className="w-full md:w-1/2">
                                                                        <div className="flex">
                                                                            <Calendar name="Calendar" className="mr-3" /> Heure et date
                                                                        </div>
                                                                        <div className="p-2 rounded-lg shadow-md ring-2 ring-orange-700/35 bg-white mt-2">
                                                                            <div className="text-base text-gray-900 flex">
                                                                                {DateTime(response.trajet.temps_depart_prevu)} { DateHeur(response.trajet.temps_depart_prevu)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full md:w-1/2">
                                                                        <div className="flex">
                                                                            <Map name="Map" className="mr-3" /> Destination
                                                                        </div>
                                                                        <div className="p-2 rounded-lg shadow-md ring-2 ring-orange-700/35 bg-white mt-2">
                                                                            <div className="text-gray-900">
                                                                                {response.trajet.ville_depart} - {response.trajet.ville_arrivee}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                ) : (
                                                    <ClientTrajetNotFound/>
                                                )}

                                                </>
                                            )}

                                        </div>

                                    </div>
                                </div>
                                {/* Fin du contenu */}
                            </div>
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