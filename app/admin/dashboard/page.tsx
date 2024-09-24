"use client";

import React, { useEffect, useState } from 'react'
import { Users, User, Car, Hash, Route, Wallet, MessageSquareDot, MessageSquareMore } from 'lucide-react';
import dynamic from 'next/dynamic';
import { DashboardData } from '@/app/interfaces/DashboardData';
import { getDashboardData } from '@/app/services/DashboardServices';
import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import ClientTrajetNotFound from '@/app/components/error/ClientTrajetNotFound';
const ChartOne = dynamic(() => import('@/app/components/chartsJs/ChartOne'), { ssr: false });
const BarChartComponent = dynamic(() => import('@/app/components/chartsJs/BarChart'), { ssr: false });

export default function Page() {

    const [response, setResponse] = useState<DashboardData | null>(null);
    const [dataStats, setDataStats] = useState<any[]>([]);
    const [dataStats2, setDataStats2] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const dataStats3 = [
        { name: 'Message reçus', stat: '10', icon: MessageSquareDot },
        { name: 'Message lu', stat: '10', icon: MessageSquareMore },
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardData();
                if (res.code === 200) {
                    // Mettre à jour la réponse API
                    setResponse(res.data);
                    console.log(res.data);

                    // Composer les tableaux dataStats et dataStats2 avec les données de l'API
                    setDataStats([
                        { name: 'Utilisateurs', stat: res.data.usersCount.toString(), icon: Users },
                        { name: 'Conducteur', stat: res.data.conducteursCount.toString(), icon: User },
                        { name: 'Passager', stat: res.data.passagersCount.toString(), icon: User },
                        { name: 'Vehicule', stat: res.data.vehiculesCount.toString(), icon: Car },
                    ]);

                    setDataStats2([
                        { name: 'Total de commande', stat: res.data.commandesCount.toString(), icon: Hash },
                        { name: 'Nb de trajet', stat: res.data.trajetsCount.toString(), icon: Route },
                        { name: 'Solde Wallet', stat: res.data.totalBalance, icon: Wallet },
                        { name: 'Revenu compte', stat: res.data.totalSolde, icon: Wallet },
                    ]);
                }
            } catch (err) {
                setError('Error fetching user info');
                console.error('Error fetching user info:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (

        <>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
            </div>

            {loading ? (
                <>
                <TrajetPreloader />
                <TrajetPreloader />
                <TrajetPreloader />
                </>
            ) : (
                response ? (

                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4">
                                <div>
                                    <h1 className="text-xl text-gray-900 font-light">Statistiques utilisateur</h1>
                                </div>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                                    {dataStats.map((item, index) => (
                                        <div key={index} className="relative w-full bg-gray-100 text-black rounded-md drop-shadow-sm px-3 py-5">
                                            <div>{item.name}</div>
                                            <div className="flex justify-end text-base mt-2">{item.stat}</div>
                                            <div className="absolute top-2 right-2 text-[#f7872e]">
                                                <item.icon className="h-10 w-10" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <h1 className="text-xl text-gray-900 font-light">Finance</h1>
                                        <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                            {dataStats2.map((item, index) => (
                                                <div key={index} className="relative w-full bg-gray-100 text-black rounded-md drop-shadow-sm px-3 py-5">
                                                    <div>{item.name}</div>
                                                    <div className="flex justify-end text-base mt-2">{item.stat}</div>
                                                    <div className="absolute top-2 right-2 text-[#f7872e]">
                                                        <item.icon className="h-10 w-10" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-xl text-gray-900 font-light">Message</h1>
                                        <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                            {dataStats3.map((item, index) => (
                                                <div key={index} className="relative w-full bg-gray-100 text-black rounded-md drop-shadow-sm px-3 py-5">
                                                    <div>{item.name}</div>
                                                    <div className="flex justify-end text-base mt-2">{item.stat}</div>
                                                    <div className="absolute top-2 right-2 text-[#f7872e]">
                                                        <item.icon className="h-10 w-10" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
                                <div>
                                    <h1 className="text-xl text-gray-900 font-light">Graphe finance</h1>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div className="w-full bg-gray-100 rounded-md drop-shadow-sm p-3 text-gray-500">
                                        <ChartOne/>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-md drop-shadow-sm p-3 text-gray-500">
                                        <BarChartComponent/>
                                    </div>
                                </div>
                            </div> */}

                        </>


                    ) : (
                        <ClientTrajetNotFound />
                    )
                )}


        </>
        
    )
}
