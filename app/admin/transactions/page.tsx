"use client";

import React, { useEffect, useState } from 'react'
import Pagination from '@/app/components/Pagination/Pagination';
import TablePreloader from '@/app/components/Preloader/TablePreloader';
import DataNotFound from '@/app/components/error/DataNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import Image from 'next/image';
import { getAllUsers, updateUserStatut } from '@/app/services/UserServices';
import { Clock, CheckCircle, ArrowDown, X } from 'lucide-react';
import { Eye} from 'lucide-react';
import toast from 'react-hot-toast';
import ToggleSwitch from '@/app/components/ToggleSwitch/ToggleSwitch';
import { useRouter } from 'next/navigation';
import { getAllRechargements } from '@/app/services/paymentService';
import { RechargementsResponse } from '@/app/interfaces/Rechargement';

const PAGE_SIZE = 3; // Nombre de trajets par page

export default function Page() {

    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [response, setResponse] = useState<RechargementsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();


    useEffect(() => {
        const fetchAllTrajet = async () => {
            try {

                setLoading(true);
                const res = await getAllRechargements(currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: RechargementsResponse = {
                        data: res.data,
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
                <h1 className="text-2xl font-semibold text-gray-900">Liste des transactions</h1>
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
                                    {response && response?.data.length ? (


                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    
                                                    <thead className="text-xs whitespace-nowrap text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                ID
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                UTILISATEUR
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                MONTANT
                                                            </th>

                                                            <th scope="col" className="px-6 py-3">
                                                                MOYEN DE RECHARGEMENT
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                CONTACT
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                email
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                DATE DE TRANSACTION
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                SOLDE
                                                            </th>

                                                            <th scope="col" className="px-6 py-3">
                                                                OPTION
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {response?.data.map((item, index) => (

                                                            <tr key={index} className="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="px-6 py-4">
                                                                    {index+1}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <Image src={item.utilisateur.photo_url ? item.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="" width={20} height={20} className="inline-block h-9 w-9 rounded-full"/>
                                                                    {item.utilisateur.username}
                                                                </td>
                                                                <td className="px-6 py-4"> {item.amount} FCFA</td>
                                                                <td className="px-6 py-4"> {item.paymentMethod}</td>
                                                                <td className="px-6 py-4"> {item.utilisateur.contact_number}</td>

                                                                <td className="px-6 py-4">
                                                                    {item.utilisateur.email}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    { DateTime(item.date)} à { DateHeur(item.date)}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    { item.wallet.balance} FCFA
                                                                </td>

                                                                <td className="px-6 py-4 text-right">
                                                                    {item.status == "succeded" ? (
                                                                        <span className={`bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                                                            <CheckCircle className="bg-green-500 h-5 w-5 text-white" aria-hidden="true" />
                                                                        </span>

                                                                    ) : (
                                                                        <span className={`bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                                                            <Clock className="bg-red-500 h-5 w-5 text-white" aria-hidden="true" />
                                                                        </span>
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

                                        {response && response?.data.length ? (
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
