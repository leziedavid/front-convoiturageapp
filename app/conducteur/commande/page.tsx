"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Calendar, ChevronRight, Lock, Map, Users, X,GalleryVerticalEnd } from 'lucide-react';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import { BaseResponse } from '../../interfaces/ApiResponse';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UserProfil from '../../components/includes/userProfil';
import { getDriverCommandes } from '@/app/services/DriverServices';
import { Commande, DetailCommandesResponse } from '@/app/interfaces/detailCommandes';
import { DateHeur, DateTime, formatDateTime } from '@/app/services/dateUtils';
import CommandsNotFound from '@/app/components/CommandsNotFound';
import Preloader from '@/app/components/Preloader';
import TrajetPreloader from '@/app/components/TrajetPreloader';
import { sendCommande } from '@/app/services/CommandeService';
import Modal from '@/app/components/Modal/Modal';

export default function Page() {

    const router = useRouter();
    const [response, setResponse] = useState<DetailCommandesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number, action: number) => {
        setIsModalOpen(false); // Fermer le modal après l'action
    };


    useEffect(() => {

        const fetchCommandes = async () => {

            try {

                setLoading(true);
                const res = await getDriverCommandes();
                if (res.code === 200) {

                    const adaptedResponse: DetailCommandesResponse = {
                        commandes: res.data
                    };
                    setResponse(adaptedResponse);

                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            } catch (err) {

                setError('Error fetching user info');
                console.error('Error fetching user info:', err);
                setLoading(false);

            }
        };

        fetchCommandes();
    }, []);

    // Assure-toi que la fonction est marquée comme async
    const AccepterCommande = async (value: Commande): Promise<void> => {
        const commandeId = value.id;
        const conducteurId = value.conducteur_id;
        const commentaires = 'Votre commande est désormais confirmée et nous vous remercions chaleureusement pour votre confiance ! Si jamais vous souhaitiez apporter des modifications ou annuler votre commande, n’hésitez pas à nous en faire part dès que possible. Nous sommes là pour vous accompagner !';
        const statutReponse = 'validated';
          // Crée une nouvelle date et formate en ISO 8601
        const tempsReponse = new Date().toISOString();

        console.log(tempsReponse);

        try {
            const res = await sendCommande(commandeId, conducteurId, commentaires, statutReponse, tempsReponse);
            console.log('Réponse de l\'API:', res);
        } catch (error) {
            console.error('Erreur lors de l\'acceptation de la commande:', error);
        }
    };

    const RejeterCommande = (value: Commande) => {
        setIsModalOpen(true);
        console.log(value);
    };
    

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="min-h-full">

                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Mes commandes 📑
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


                                            <section aria-labelledby="recent-heading">

                                            {loading ? (

                                                <TrajetPreloader />

                                                ) : (
                                                    
                                                    <div className="mx-auto max-w-2xl space-y-5 sm:px-2 lg:max-w-4xl lg:px-0">

                                                        {response &&  response?.commandes.length ? (
                                                            response.commandes.map((commande, index) => (

                                                                <div key={index} className="relative shadow-md border-none bg-white rounded-md border-2 p-3">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-base flex justify-items-center items-center">
                                                                            Commande reçu le {DateTime(commande.date_creation)}
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-base">
                                                                                Montant :
                                                                                <span className="text-[#f7872e]">{commande.montant} FCFA</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="border-t-4 mt-4 pt-4 border-dashed"></div>
                                                                    <div className="flex flex-wrap">
                                                                        <div className="w-full sm:w-1/2 mt-2">
                                                                            <span className="text-base">
                                                                                <u>Détail du passager</u>
                                                                            </span>
                                                                            <div className="flex items-center mt-2">
                                                                                <div className="relative">
                                                                                    <Image className="inline-block h-12 w-12 rounded-full" src={commande.utilisateur.photo_url} alt="Passager"width={48} height={48}/>
                                                                                </div>
                                                                                <div className="ml-3">
                                                                                    <p className="text-base md:text-xl font-medium text-black flex">
                                                                                        {commande.utilisateur.username}
                                                                                    </p>
                                                                                    <p className="text-xs md:text-sm font-medium text-black">{commande.utilisateur.role}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col gap-2 w-full sm:w-1/2 mt-2">
                                                                            <span className="text-base">
                                                                                <u>Trajet</u>
                                                                            </span>
                                                                            <div className="flex gap-2 justify-between mt-2">
                                                                                <div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs md:text-sm text-white font-bold bg-stone-600 p-1 rounded">
                                                                                        { DateHeur(commande.trajet.temps_depart_prevu)}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs text-neutral-700 md:text-sm font-bold w-16">
                                                                                            {commande.trajet.ville_depart}
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
                                                                                        { DateHeur(commande.trajet.temps_arrivee_prevu)}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="md:text-left">
                                                                                        <span className="text-xs text-neutral-700 md:text-sm font-bold">
                                                                                            {commande.trajet.ville_arrivee}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-end gap-2 mt-2">

                                                                        {commande.statut_commande === 'pending' ? (
                                                                            <button
                                                                                onClick={() => AccepterCommande(commande)}
                                                                                type="button"
                                                                                className="bg-green-600 text-slate-100 px-3 rounded py-1 text-xs md:text-base">
                                                                                    Valider
                                                                            </button>

                                                                        ) : commande.statut_commande === 'validated' ? (

                                                                            <span className="bg-black text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-black border border-white">
                                                                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                                                                                </svg>
                                                                                Accepter 👍
                                                                            </span>
                                                                                
                                                                            ) : (
                                                                                <p>Status non pris en charge</p>
                                                                            )}


                                                                        {(commande.statut_commande === 'start' ||
                                                                            commande.statut_commande === 'pending' ||
                                                                            commande.statut_commande === 'validated') && (
                                                                                
                                                                                <button onClick={() => RejeterCommande(commande)} type="button"
                                                                                    className="bg-red-600 text-slate-100 px-3 rounded py-1 text-xs md:text-base" >
                                                                                    Rejeter 👎
                                                                                </button>
                                                                            )}

                                                                        {/* {commande.statut_commande === 'Dismiss' && (
                                                                                <span className="bg-red-600 text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-black border border-white">
                                                                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                                                                                </svg>
                                                                                👎
                                                                            </span>
                                                                        )} */}

                                                                    </div>
                                                                </div>

                                                            ))

                                                        ) : (

                                                            <CommandsNotFound/>
                                                        )}

                                                    </div>
                                                )}

                                            </section>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Drawer component */}
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
                                                                Detail de la commande
                                                            </h2>
                                                            <div>
                                                                <X
                                                                    name="X"
                                                                    className="cursor-pointer"
                                                                    onClick={() => setShowDrawer(false)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                        kjsqdfbsjkb
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Mobile menu */}
                        <MobileNavBarDriver />
                    </div>
                </main>

            </div>


            <Modal
                buttonColor="bg-red-600"
                actionMessage="Êtes-vous sûr de vouloir annuler cette commande ?"
                onDeleteMessage="OUI,VALIDER"
                onCloseMessage="NON"
                id={1} // L'ID de l'élément à supprimer
                actions={1} // L'action à exécuter
                states="delete"
                onDelete={handleDelete}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </>

    );
}
