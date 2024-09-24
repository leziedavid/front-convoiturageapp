"use client";

import React, { useEffect, useState } from 'react'
import { Users, User, Car, Hash, Route, Wallet, MessageSquareDot, MessageSquareMore } from 'lucide-react';
import BarChartComponent from '@/app/components/chartsJs/BarChart';
import ChartOne from '@/app/components/chartsJs/ChartOne';
import Pagination from '@/app/components/Pagination/Pagination';
import { TrajetResponse } from '@/app/interfaces/Trajet';
import { getAllTrajet } from '@/app/services/TrajetServices';
import TablePreloader from '@/app/components/Preloader/TablePreloader';
import TrajetNotFound from '@/app/components/error/TrajetNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import Image from 'next/image';

const PAGE_SIZE = 3; // Nombre de trajets par page

export default function Page() {

    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [response, setResponse] = useState<TrajetResponse | null>(null);
    const [loading, setLoading] = useState(true);
    


    useEffect(() => {
        const fetchAllTrajet = async () => {
            try {

                setLoading(true);
                const res = await getAllTrajet(currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: TrajetResponse = {
                        trajets: res.data,
                        total: res.total,
                    };
                    setResponse(adaptedResponse);
                } else if (res.code === 404) {

                }
        
            } catch (err) {
                console.error('Error fetching trajets:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTrajet();

    }, [currentPage, pageSize]);

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Liste des trajets</h1>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
                <div className="mt-3">

                    <div>

                            {loading ? (

                                <>
                                    <div className="mx-4 lg:mx-auto max-w-5xl py-7">
                                        <TablePreloader />
                                    </div>
                                </>

                            ) : (


                                <div>
                                    {response && response?.trajets.length ? (

                                        <>
                                            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50 whitespace-nowrap">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Départ</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Arrivée</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Conducteur</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Montant</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date de départ </th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date d&apos;arrivée </th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre de place</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Durée estimé</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Distance</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date de création</th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                            {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">Option</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                            {response?.trajets.map((trajet, index) => (
                                                            <tr key={trajet.id}>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{index + 1}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trajet.ville_depart}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trajet.ville_arrivee}</td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                    <div className="flex items-center">
                                                                        <div className="h-10 w-10 flex-shrink-0">
                                                                            <Image className="h-8 w-8 rounded-full" src={trajet.utilisateur.photo_url ? trajet.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="" width={20} height={20} />
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            {trajet.utilisateur.username}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {trajet.price}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ DateTime(trajet.temps_depart_prevu)} à { DateHeur(trajet.temps_depart_prevu)} </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ DateTime(trajet.temps_arrivee_prevu)} à { DateHeur(trajet.temps_arrivee_prevu)} </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trajet.nombre_de_places}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{trajet.duree_estimee} h </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {trajet.distance_estimee} Km2</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> { DateTime(trajet.created_at)}  à { DateHeur(trajet.created_at)}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {trajet.etat_trajet == "pending" ? (
                                                                        <span className="ml-2 bg-red-500 text-white py-1 px-2 rounded"> {trajet.etat_trajet} </span>
                                                                        ) : (
                                                                        <span className="ml-2 bg-green-500 text-white py-1 px-2 rounded"> {trajet.etat_trajet} </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                            

                                    ) : (
                                        <TrajetNotFound />
                                    )}

                                        {response && response?.trajets.length ? (
                                            <Pagination
                                                currentPage={currentPage}
                                                pageSize={pageSize}
                                                total={response.total || 0}
                                                onPageChange={setCurrentPage}
                                                onPageSizeChange={setPageSize}
                                            />

                                        ) : null}

                                </div>

                            )}

                    </div>

                </div>
            </div>

            

        </>
        
    )
}
