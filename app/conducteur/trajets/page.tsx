"use client";


import dynamic from 'next/dynamic';

import { TrajetResponse,Trajet } from '@/app/interfaces/Trajet';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import { getDriverTrajet } from '@/app/services/DriverServices';
import { Calendar, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import UserProfil from '../../components/includes/userProfil';
import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import TrajetNotFound from '@/app/components/error/TrajetNotFound';
import Pagination from '@/app/components/Pagination/Pagination';
import { getAllTrajetById, updateStatusTrajet } from '@/app/services/TrajetServices';
// import MapComponent from '@/app/components/Map/MapComponent';
import Modal from '@/app/components/Modal/Modal';
import { getUserWalletById } from '@/app/services/UserServices';
const MapComponent = dynamic(() => import('@/app/components/Map/Map1Component'), { ssr: false });
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

import { ArrowRight as ArrowRightIcon } from 'lucide-react'; // Assure-toi que l'icône est importée correctement
import Link from 'next/link';

const PAGE_SIZE = 3; // Nombre de trajets par page

export default function Page() {

    const router = useRouter();
    const [response, setResponse] = useState<TrajetResponse | null>(null);
    const [resWallet, setWallet] = useState<Wallet>();
    const [data, setData] = useState<Trajet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [actionMessage, setActionMessage] = useState("");
    const [onDeleteMessage, setOnDeleteMessage] = useState("");
    const [onCloseMessage, setOnCloseMessage] = useState("");
    const [idCommande, setIdCommande] = useState("");
    const [step, setStep] = useState(0);

    const AccepterCommande = async (value: string) => {
        setIdCommande(value);
        setStep(1);
        setIsModalOpen(true);
        setActionMessage("Êtes-vous sûr de vouloir accepter cette commande ?");
        setOnDeleteMessage("OUI,ACCEPTER");
        setOnCloseMessage("FERMER");
    };

    const handleDelete = (value: string) => {
        setStep(2);
        setIdCommande(value);
        setActionMessage("Êtes-vous sûr de vouloir annuler cette commande ?");
        setOnDeleteMessage("OUI,ANNULER");
        setOnCloseMessage("FERMER");
        setIsModalOpen(true);
    };

    


    const handleNavigateToNewTrajet = () => {
        router.push('/conducteur/nouveau');
    };

    const getAllTrajet = async () => {

        try {

            setLoading(true);
            const res = await getDriverTrajet(currentPage, pageSize);
            if (res.code === 200) {
                const adaptedResponse: TrajetResponse = {
                    trajets: res.data,
                    total: res.total
                };
                console.log(res.total);
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

    const getUserWallet = async () => {

        try {
            const res = await getUserWalletById();
            if (res.code === 200) {
                setWallet(res.data);

                if(res.data.balance <600){
                    toast.error('Solde est insuffisant. Recharger votre compte pour continue');
                }
            }
        } catch (err) {

            setError('Error fetching user Wallet');
            console.error('Error fetching user Wallet:', err);

        }
    };

    const startUp = async (id: string) => {
        const newStatus = "start";
        await updateStatusTrajet(id, newStatus);
        getAllTrajet();
        
    };

    const finished = async (id: string) => {
        const newStatus = "finished";
        await updateStatusTrajet(id, newStatus);
        getAllTrajet();
    };

    const OpenDrawer = async (id: string) => {
        try {
            const res = await getAllTrajetById(id);
            if (res.code === 200) {
                setData(res.data);
                    setTimeout(() => {
                    setLoading(false);
                }, 1500);
            } else {
                console.error('Erreur lors de la récupération des trajets:', res);
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel de getAllTrajetById:', error);
        }
    };

    useEffect(() => {

        if (data) {
            const updatedCoordinates = [
                { lat: data.point_depart.lat, lng: data.point_depart.lon },
                { lat: data.point_arrivee.lat, lng: data.point_arrivee.lon },
                ...data.arrets.map(arret => ({
                    lat: arret.nom.lat,
                    lng: arret.nom.lon
                }))
            ];
            setCoordinates(updatedCoordinates);
            setShowDrawer(true);

        }
        getUserWallet();

    }, [data]);


    
    useEffect(() => {

        const fetchTrajetDrivers = async () => {

            try {
    
                setLoading(true);
                const res = await getDriverTrajet(currentPage, pageSize);
                
                if (res.code === 200) {
                    const adaptedResponse: TrajetResponse = {
                        trajets: res.data,
                        total: res.total
                    };
                    console.log(res.total);
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

        fetchTrajetDrivers();

    }, [currentPage,pageSize]);


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
                                                        <h1 className=" text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                            Mes trajets
                                                        </h1>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Liste des trajets enregistrés
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 flex justify-end">
                                                        {resWallet && resWallet.balance > 600 ? (
                                                            <button type="button" onClick={handleNavigateToNewTrajet} className="text-sm font-semibold leading-6 text-white p-1 px-4 bg-zinc-700 hover:bg-gray-800">
                                                                Crée un trajet
                                                            </button>
                                                        ) : (
                                                            <p className="text-sm text-red-500 font-bold">
                                                                {/* Solde est insuffisant.
                                                                    <Link href="/conducteur" className="text-blue-500">(Recharger !)
                                                                    </Link> votre compte pour continuer. */}
                                                            </p>

                                                        )}
                                                    </div>


                                                    {/*
                                                    <div className="mt-4 flex justify-end">
                                                        <button type="button" onClick={handleNavigateToNewTrajet}
                                                            className="text-sm font-semibold leading-6 text-white p-1 px-4 bg-zinc-700 hover:bg-gray-800">
                                                            Crée un trajet
                                                        </button>
                                                    </div> */}

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
                                                                                    {trajet.ville_depart}
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
                                                                                {trajet.ville_arrivee}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-end gap-2">

                                                                    {trajet.commandes.length > 0 && trajet.etat_trajet=="pending" ? (
                                                                        <button onClick={() => startUp(trajet.id)} className="rounded text-xs font-semibold leading-6 text-white p-1 px-4 bg-green-700 hover:bg-[#a1683a]">
                                                                        Démarrer le trajet
                                                                    </button>
                                                                    ) : null}

                                                                    {trajet.commandes.length > 0 && trajet.etat_trajet=="start" ? (
                                                                        <button onClick={() => finished(trajet.id)} className="rounded text-xs font-semibold leading-6 text-white p-1 px-4 bg-red-700 hover:bg-[#a1683a]">
                                                                            Terminer le trajet
                                                                        </button>
                                                                    ) : null}

                                                                    <button onClick={() => OpenDrawer(trajet.id)} className="rounded text-xs font-semibold leading-6 text-white p-1 px-4 bg-[#f7872e] hover:bg-[#a1683a]">
                                                                        Détail du trajet
                                                                    </button>

                                                                    {trajet.commandes.length === 0 && trajet.etat_trajet=="pending" ? (
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

                                                    
                                                    {response && response.trajets && response.trajets.length > 0 ? (
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
                                                    <Map coordinates={coordinates} title="Mon trajet"  />
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

            <Modal
                buttonColor="bg-red-600"
                actionMessage={actionMessage}
                onDeleteMessage={onDeleteMessage}
                onCloseMessage={onCloseMessage}
                id={idCommande}
                onDelete={step === 1 ? () => AccepterCommande(idCommande) : () => handleDelete(idCommande)}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />


        </>
    );

}
