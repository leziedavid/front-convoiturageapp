"use client";

import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import ClientTrajetNotFound from '@/app/components/error/ClientTrajetNotFound';
import UserProfil from '@/app/components/includes/userProfil';
import { getAllPassageerCommandes } from '@/app/services/PassagerServices';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import { Calendar, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import DesktopNavBar from '../../components/includes/DesktopNavBar';
import MobileNavBar from '../../components/includes/MobileNavBar';
import { Commande } from '../../interfaces/GlobalType';
import Pagination from '@/app/components/Pagination/Pagination';
import Modal from '@/app/components/Modal/Modal';
import { sendStateCommandeByUsers } from '@/app/services/CommandeService';

const PAGE_SIZE = 3;

export default function Page() {
    const router = useRouter();

    const [response, setResponse] = useState<Commande[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

    const [actionMessage, setActionMessage] = useState("");
    const [onDeleteMessage, setOnDeleteMessage] = useState("");
    const [onCloseMessage, setOnCloseMessage] = useState("");
    const [idCommande, setIdCommande] = useState("");
    const [step, setStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUserInfo = useCallback(async () => {
        try {
            const res = await getAllPassageerCommandes(currentPage, pageSize);
            if (res.code === 200) {
                setResponse(res.data);
                setTotal(res.total);
            }
        } catch (err) {
            setError('Error fetching user info');
            console.error('Error fetching user info:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const handleDelete = async (id: string) => {
        const newStatus = "dismissed";
        await sendStateCommandeByUsers(id, newStatus);
        setIsModalOpen(false);
        fetchUserInfo();
    };

    const handleValidate = async (id: string) => {
        const newStatus = "validated";
        await sendStateCommandeByUsers(id, newStatus);
        setIsModalOpen(false);
        fetchUserInfo();
    };

    const RejeterCommande = (value: string) => {
        setStep(2);
        setIdCommande(value);
        setActionMessage("Êtes-vous sûr de vouloir annuler cette commande ?");
        setOnDeleteMessage("OUI,ANNULER");
        setOnCloseMessage("FERMER");
        setIsModalOpen(true);
    };
    

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

                                                                        <div className="absolute bottom-2 right-2 text-sm flex items-center space-x-2">
                                                                            <Calendar name="Calendar" className="h-5" />
                                                                            <span>le {DateTime(order.date_creation)}</span>

                                                                                {(order.statut_commande === 'pending') && (
                                                                                    <button onClick={() => RejeterCommande(order.id)} type="button"
                                                                                        className="bg-red-600 text-slate-100 px-1 rounded py-0 text-sm md:text-base">
                                                                                        Annuler 👎
                                                                                    </button>
                                                                                )}

                                                                                {order.statut_commande === 'dismissed' && (
                                                                                    <span className="bg-[#f7872e] text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-white">
                                                                                        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                                                        </svg>
                                                                                        <span className="text-white text-sm me-1.5">Commande annulée</span>
                                                                                    </span>
                                                                                )}
                                                                        </div>

                                                                    </div>
                                                                ))

                                                            ) : (
                                                                <ClientTrajetNotFound/>
                                                            )}

                                                            {response && response.length? (
                                                                <Pagination
                                                                    currentPage={currentPage}
                                                                    pageSize={pageSize}
                                                                    total={total}
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
                            {/* Fin du contenu */}
                        </div>
                    </div>
                    {/* Menu mobile */}
                    <MobileNavBar />
                    {/* Menu mobile */}
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

    )
}