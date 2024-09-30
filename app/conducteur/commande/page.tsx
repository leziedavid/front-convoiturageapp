"use client";

import CommandsNotFound from '@/app/components/error/CommandsNotFound';
import Modal from '@/app/components/Modal/Modal';
import { DetailCommandesResponse } from '@/app/interfaces/detailCommandes';
import { sendStateCommande } from '@/app/services/CommandeService';
import { getDriverCommandes } from '@/app/services/DriverServices';
import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import UserProfil from '../../components/includes/userProfil';
import CommandePreloader from '@/app/components/Preloader/CommandePreloader';
import Pagination from '@/app/components/Pagination/Pagination';
import { DateHeur, DateTime } from '@/app/services/dateUtils';

const PAGE_SIZE =5; // Nombre de trajets par page

export default function Page() {
    const router = useRouter();
    const [response, setResponse] = useState<DetailCommandesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const [actionMessage, setActionMessage] = useState("");
    const [onDeleteMessage, setOnDeleteMessage] = useState("");
    const [onCloseMessage, setOnCloseMessage] = useState("");
    const [idCommande, setIdCommande] = useState("");
    const [step, setStep] = useState(0);

    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false);

    const handleDelete = async (id: string) => {
        setIsDisabled(false);
        const newStatus = "dismissed";
        await sendStateCommande(id, newStatus);
        setIsModalOpen(false);
        fetchCommandes(); // Appel pour mettre à jour les données
    };

    const handleValidate = async (id: string) => {
        const newStatus = "validated";
        await sendStateCommande(id, newStatus);
        setIsModalOpen(false);
        fetchCommandes(); // Appel pour mettre à jour les données
    };

    const fetchCommandes = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getDriverCommandes(currentPage, pageSize);
            if (res.code === 200) {
                const adaptedResponse: DetailCommandesResponse = {
                    commandes: res.data,
                    total: res.total
                };
                setResponse(adaptedResponse);
            }
        } catch (err) {
            setError('Erreur lors de la récupération des commandes');
            console.error('Erreur lors de la récupération des commandes:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);
    
    useEffect(() => {
        
        fetchCommandes();

    }, [fetchCommandes]);

    const AccepterCommande = async (value: string) => {
        setIdCommande(value);
        setStep(1);
        setIsModalOpen(true);
        setActionMessage("Êtes-vous sûr de vouloir accepter cette commande ?");
        setOnDeleteMessage("OUI,ACCEPTER");
        setOnCloseMessage("FERMER");
    };

    const RejeterCommande = (value: string) => {
        setStep(2);
        setIdCommande(value);
        setActionMessage("Êtes-vous sûr de vouloir annuler cette commande ?");
        setOnDeleteMessage("OUI,ANNULER");
        setOnCloseMessage("FERMER");
        setIsModalOpen(true);
    };

    const DEFAULT_IMAGE_URL = '/img/users.png';

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

                                                <CommandePreloader />

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
                                                                                Montant : <span className="text-[#f7872e]"> {commande.montant} FCFA</span>
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
                                                                                    <Image className="inline-block h-12 w-12 rounded-full" src={commande?.utilisateur?.photo_url ? commande.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="Passager" width={40} height={40}/>
                                                                                </div>
                                                                                <div className="ml-3">
                                                                                    <p className="text-base md:text-sm font-medium text-black flex">
                                                                                        {commande.utilisateur.username}
                                                                                            {commande.statut_commande === 'validated' && (
                                                                                                <span className="ml-2 bg-red-500 text-white py-1 px-2 rounded">
                                                                                                    {commande.utilisateur.contact_number}
                                                                                                </span>
                                                                                            )}
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
                                                                            <button onClick={() => AccepterCommande(commande.id)} type="button"
                                                                                className="bg-green-600 text-slate-100 px-3 rounded py-1 text-xs md:text-base">
                                                                                Valider ❎
                                                                            </button>
                                                                        ) : commande.statut_commande === 'validated' ? (
                                                                            <span className="bg-black text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-black border border-white">
                                                                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                                                </svg>
                                                                                Accepter 👍
                                                                            </span>
                                                                        ) : commande.statut_commande === 'dismissed' ? (

                                                                            <span className="bg-[#f7872e] text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-black border border-white">
                                                                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                                                </svg>
                                                                                <span className="text-white text-sm me-1.5">Commande annuler </span>
                                                                                
                                                                            </span>

                                                                        ) : (
                                                                            <p>Status inconnu</p>
                                                                        )}



                                                                        {(commande.statut_commande === 'started' ||
                                                                            commande.statut_commande === 'pending' ||
                                                                            commande.statut_commande === 'validated') && (
                                                                                
                                                                                <button onClick={() => RejeterCommande(commande.id)} type="button"
                                                                                    className="bg-red-600 text-slate-100 px-3 rounded py-0 text-sm md:text-base" >
                                                                                    Rejeter 👎
                                                                                </button>
                                                                            )}

                                                                    </div>
                                                                </div>

                                                            ))

                                                        ) : (

                                                            <CommandsNotFound/>
                                                        )}

                                                            {response &&  response?.commandes.length > 0 ? (
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

                                            </section>



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

                        <MobileNavBarDriver />

                    </div>
                </main>

            </div>

            <Modal
                buttonColor="bg-red-600"
                actionMessage={actionMessage}
                onDeleteMessage={onDeleteMessage}
                onCloseMessage={onCloseMessage}
                id={idCommande}
                onDelete={step === 1 ? () => handleValidate(idCommande) : () => handleDelete(idCommande)}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </>

    );
}
