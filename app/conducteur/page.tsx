"use client";
import { History, Map, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PaymentModal from '../components/Modal/PaymentModal';
import TrajetPreloader from '../components/Preloader/TrajetPreloader';
import DesktopNavBarDriver from '../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../components/includes/Driver/MobileNavBarDriver';
import UserProfil from '../components/includes/userProfil';
import { BaseResponse } from '../interfaces/ApiResponse';
import { getUserStatistics } from '../services/UserServices';
import { formatDateTime } from '../services/dateUtils';
import { launchPayment, requestToGetTransactionStatus } from '../services/paymentService';
import TrajetNotFound from '../components/error/TrajetNotFound';
import DataNotFound from '../components/error/DataNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';

export default function Page() {
    const router = useRouter();

    const [response, setResponse] = useState<BaseResponse<Statistics> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Statistics | null>(null);

    const [waveId, setWaveId] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState<URL | null>(null);

    // État pour contrôler l'ouverture de la fenêtre de paiement
    const [openPaymentWindow, setOpenPaymentWindow] = useState<string | null>(null);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const amount = 1000; // Example amount
            const response = await launchPayment(amount);
            const { wave_id, wavelaunchurl } = response.data;

            setWaveId(wave_id);
            setPaymentUrl(wavelaunchurl);
            console.log(wavelaunchurl);
            
            // Préparer l'ouverture de la fenêtre de paiement
            if (wavelaunchurl) {
                setOpenPaymentWindow(wavelaunchurl);
            }

        } catch (error) {
            console.error('Payment failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Ouvrir la fenêtre de paiement seulement après que l'URL a été définie
    useEffect(() => {
        if (openPaymentWindow) {
            window.open(openPaymentWindow, '_blank');
        }
    }, [openPaymentWindow]);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const res = await getUserStatistics();
            if (res.code === 200) {
                setData(res.data);
            } else {
                setError('Error fetching user info');
            }
        } catch (err) {
            setError('Error fetching user info');
        } finally {
            setLoading(false);
        }
    };

    const checkPaymentStatus = useCallback(async () => {
        if (!waveId) return;
        setLoading(true);
    
        try {
            const paymentstatus = await requestToGetTransactionStatus(waveId);
            setStatus(paymentstatus.data);
    
            // Gérer le statut du paiement
            if (paymentstatus.data.payment_status === 'succeeded') {
                toast.success('Payment succeeded');
            } else if (paymentstatus.data.payment_status === 'cancelled') {
                toast.error('Payment cancelled');
            } else if (paymentstatus.data.payment_status === 'processing') {
                toast.success('Payment is processing');
            }
        } catch (error) {
            console.error('Failed to check payment status:', error);
        } finally {
            setLoading(false);
        }
    }, [waveId]);
    
    useEffect(() => {
        fetchStatistics();
        if (waveId) {
            checkPaymentStatus();
        }
    }, [waveId, checkPaymentStatus]);


    return (

        <>
        
            <Toaster position="top-right" reverseOrder={false}/>

            <div className="min-h-full">

                    <div className="bg-[#f7872e] pb-32">
                            <header className="py-8">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">Hello 👋🏾</h1>
                                </div>
                            </header>
                    </div>

                    <main className="-mt-32">
                            <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                                
                                <div className="rounded-lg bg-white p-2">
                                    <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                        <div className="py-2 md:py-4">

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-10 justify-between">
                                                <div className="col-span-1 md:col-span-3 group md:block flex-shrink-0">
                                                    <UserProfil/>

                                                    {/* <button onClick={handlePayment} disabled={loading}>
                                                        {loading ? 'Processing...' : 'Pay Now'}
                                                    </button> */}
                                                    <div className="hidden md:flex flex-col gap-3 py-5">
                                                        <div className="basis-1/5 h-lvh">
                                                            <DesktopNavBarDriver />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-1 md:col-span-9 sm:mt-0">
                                                    
                                                <div className="mx-auto max-w-7xl">
                                                    <div className="flex justify-between">
                                                        <div className="">
                                                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Mon compte
                                                            </h1>
                                                            <p className="mt-2 text-sm text-gray-500">Personal details and application.</p>
                                                        </div>
                                                        <div>
                                                            <PaymentModal wallet={data?.userDetail.wallet.balance} fetchStatistics={fetchStatistics}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {loading ? (

                                                    <TrajetPreloader />

                                                ) : (

                                                    <>
                                                    
                                                    <div className="mx-auto max-w-7xl grid grid-cols-3 gap-2 py-3">
                                                        <div className="bg-gray-100 text-black p-2 md:p-3 rounded shadow">
                                                            <span className="text-sm md:text-base">Total de course</span>
                                                            <div className="text-sm md:text-xl text-end">
                                                            {data?.totalCourses !== undefined && data.totalCourses > 0 ? `${data.totalCourses}`: '0'}
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 text-black p-2 md:p-3 rounded shadow">
                                                            <span className="text-sm md:text-base">Nb de vehicule</span>

                                                            <div className="text-sm md:text-xl text-end">
                                                                {data?.numberOfVehicles !== undefined && data.numberOfVehicles > 0 ? `${data.numberOfVehicles}`: '0'}
                                                            </div>

                                                        </div>
                                                        <div className="bg-gray-100 text-black p-2 md:p-3 rounded shadow">
                                                            <span className="text-sm md:text-base">Montant course</span>
                                                            <div className="text-sm md:text-xl text-end">
                                                            {data?.totalAmount !== undefined && data.totalAmount > 0 ? `${data.totalAmount}`: '0'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                        
                                                        <div className="bg-orange-100 p-4 rounded-lg shadow">
                                                            <div>
                                                                <h1 className="text-base tracking-tight text-gray-900 sm:text-xl">Mon trajet en cours</h1>
                                                            </div>

                                                            {data && data.lastTrajet && data.lastTrajet.id.length > 0 ? (

                                                                <div className="mt-2">
                                                                        <div className="flex">
                                                                            <Map className="mr-3" /> Destination
                                                                        </div>

                                                                        <div className="p-2 rounded-lg shadow-md ring-2 ring-orange-700/35 bg-white mt-2">
                                                                            <div className="text-base text-gray-900 flex">
                                                                                prévue pour {formatDateTime(data.lastTrajet.temps_depart_prevu)}
                                                                            </div>
                                                                            <div className="text-gray-500"> Abidjan - Agboville
                                                                            </div>
                                                                        </div>
                                                                        {/* 
                                                                        <div className="mt-2">
                                                                            <div className="flex">
                                                                                <Users className="mr-3" /> Passager (4)
                                                                            </div>
                                                                        </div> */}
                                                                        
                                                                </div>

                                                            ) : (
                                                                <TrajetNotFound/>
                                                            )}


                                                        </div>

                                                        <div className="flex flex-col gap-4">
                                                            <div className="bg-gray-100 p-4 rounded-lg shadow">

                                                            {data && data.userDetail.rechargements ? (

                                                                <div className="border-2 border-gray-200 p-2 rounded-lg">
                                                                    <p className="flex items-center text-gray-700 text-sm">
                                                                        <History name="History" className="mr-2" />
                                                                        Recargement par {data.userDetail.rechargements.paymentMethod}
                                                                    </p>

                                                                    <p className="text-gray-700 text-sm">
                                                                        Date : { DateTime(data.userDetail.rechargements.date)} à { DateHeur(data.userDetail.rechargements.date)}
                                                                    </p>
                                                                </div>

                                                            ) : (
                                                                <div className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap items-center text-center">
                                                                    <DataNotFound />
                                                                </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    </>
                                                )}



                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <MobileNavBarDriver />
                            </div>
                    </main>

            </div>

        </>

    )
}