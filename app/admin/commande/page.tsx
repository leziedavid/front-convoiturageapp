"use client";

import React, { useEffect, useState } from 'react'
import Pagination from '@/app/components/Pagination/Pagination';
import { TrajetResponse } from '@/app/interfaces/Trajet';
import TablePreloader from '@/app/components/Preloader/TablePreloader';
import TrajetNotFound from '@/app/components/error/TrajetNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import { getAllcommandes, searchCommandes } from '@/app/services/CommandeService';
import { DetailCommandesResponse } from '@/app/interfaces/detailCommandes';
import Image from 'next/image';
import DataNotFound from '@/app/components/error/DataNotFound';

const PAGE_SIZE = 3; // Nombre de trajets par page

export default function Page() {

    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [response, setResponse] = useState<DetailCommandesResponse | null>(null);
    const [loading, setLoading] = useState(true);


        // Champs de recherche
        const [numeroCommande, setNumeroCommande] = useState<string>('');
        const [dateCreation, setDateCreation] = useState<string>('');
        const [username, setUsername] = useState<string>('');
    
        const handleSearch = async () => {
            setLoading(true);
            try {
                const searchDate = dateCreation ? new Date(dateCreation) : undefined;
                const res = await searchCommandes(numeroCommande, searchDate, username, currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: DetailCommandesResponse = {
                        commandes: res.data,
                        total: res.total
                    };
                    setResponse(adaptedResponse);
                } else if (res.code === 404) {
                    setResponse({ commandes: [], total: 0 });
                }
            } catch (err) {
                console.error('Error searching commandes:', err);
            } finally {
                setLoading(false);
            }
        };
    


    useEffect(() => {
        
        const fetchAllcommandes = async () => {
            try {

                setLoading(true);
                const res = await getAllcommandes(currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: DetailCommandesResponse = {
                        commandes: res.data,
                        total: res.total
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

        fetchAllcommandes();

    }, [currentPage, pageSize]);

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Liste des commandes</h1>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
                <div className="mt-3">

                        {/* Formulaire de recherche */}
                        <div className="mb-4 p-4 border rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-2">Recherche de commandes</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Numéro de commande"
                                    value={numeroCommande}
                                    onChange={(e) => setNumeroCommande(e.target.value)}
                                    className="border rounded p-2"
                                />
                                <input
                                    type="date"
                                    value={dateCreation}
                                    onChange={(e) => setDateCreation(e.target.value)}
                                    className="border rounded p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border rounded p-2"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    Rechercher
                                </button>
                            </div>
                        </div>

                        <div>

                            {loading ? (

                                <>
                                    <div className="mx-4 lg:mx-auto max-w-5xl py-7">
                                        <TablePreloader />
                                    </div>
                                </>

                            ) : (


                                <div>
                                    {response &&  response?.commandes.length ? (


                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50 whitespace-nowrap">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">N Commande</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Ville départ</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Ville d&apos;arrivée</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Conducteur</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Montant</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date de départ</th>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date de création</th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {response.commandes.map((commande, index)=> (
                                                            <tr key={commande.id}>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{index + 1}</td>

                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{commande.numeroCommande}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{commande.trajet.ville_depart}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{commande.trajet.ville_arrivee}</td>

                                                                <td className="whitespace-nowrap px-0 py-4 text-sm text-gray-500">
                                                                    <>
                                                                        <Image src={commande.utilisateur.photo_url ? commande.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="" width={10} height={10} className="inline-block h-9 w-9 rounded-full" />
                                                                        {commande.utilisateur.username}
                                                                    </>
                                                                </td>
                                                                <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500"> {commande.montant} FCFA</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {DateTime(commande.date_creation)} à {DateHeur(commande.date_creation)} </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {DateTime(commande.date_creation)} à { DateTime(commande.temps_prise_en_charge)} à { DateHeur(commande.temps_prise_en_charge)}</td>

                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                                    {commande.statut_commande === 'pending' ? (
                                                                        <span className="ml-2 bg-red-500 text-white py-1 px-2 rounded"> {commande.statut_commande} </span>
                                                                    ) : (
                                                                        <span className="ml-2 bg-green-500 text-white py-1 px-2 rounded"> {commande.statut_commande} </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                            </div>

                                            

                                    ) : (
                                        <DataNotFound />
                                    )}

                                        {response &&  response?.commandes.length ? (
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
