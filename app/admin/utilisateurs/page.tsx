"use client";

import TablePreloader from '@/app/components/Preloader/TablePreloader';
import React, { useEffect, useState } from 'react'
import Pagination from '@/app/components/Pagination/Pagination';
import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import DataNotFound from '@/app/components/error/DataNotFound';
import { DateHeur, DateTime } from '@/app/services/dateUtils';
import Image from 'next/image';
import { getAllUsers, searchUsers, updateUserStatut } from '@/app/services/UserServices';
import { UsersResponse } from '@/app/interfaces/Users';
import { File} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ToggleSwitch from '@/app/components/ToggleSwitch/ToggleSwitch';
import { useRouter } from 'next/navigation';

const PAGE_SIZE = 3; // Nombre de trajets par page

const people = [
    {
        name: 'Lindsay Walton',
        title: 'Passager',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        title: 'Conducteur',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        title: 'Conducteur',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
];

const Page: React.FC = () => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page
    const [response, setResponse] = useState<UsersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>(''); // État pour le texte de recherche

    const navigateTo = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        const fetchAllTrajet = async () => {
            try {

                setLoading(true);
                const res = await getAllUsers(currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: UsersResponse = {
                        users: res.data,
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

    useEffect(() => {

        const fetchAllUsers = async () => {
            try {
                setLoading(true);
                const res = await getAllUsers(currentPage, pageSize);
                if (res.code === 200) {
                    const adaptedResponse: UsersResponse = {
                        users: res.data,
                        total: res.total,
                    };
                    setResponse(adaptedResponse);
                } else if (res.code === 404) {
                    // Gestion des erreurs
                }
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, [currentPage, pageSize]);

    useEffect(() => {

        const fetchSearchResults = async () => {
            if (searchTerm.trim() === '') {
                return; // Ne pas chercher si le terme est vide
            }

            try {
                setLoading(true);
                const res = await searchUsers(searchTerm, currentPage, pageSize); // Fonction pour rechercher les utilisateurs
                if (res.code === 200) {
                    const adaptedResponse: UsersResponse = {
                        users: res.data,
                        total: res.total,
                    };
                    setResponse(adaptedResponse);
                } else if (res.code === 404) {
                    // Gestion des erreurs
                }
            } catch (err) {
                console.error('Error searching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm, currentPage, pageSize]);

    const handleCheckboxChange = async (userId: string, currentValue: boolean) => {
        const newValue = !currentValue; // Inverse le booléen

        try {
            const response = await updateUserStatut(userId, newValue); // `userId` est déjà une chaîne

            if (response.code === 200) {
                toast.success("Le statut du compte a été mis à jour avec succès.");
                // Mettre à jour uniquement l'utilisateur modifié
                setResponse(prev => {
                    if (prev) {
                        return {
                            ...prev,
                            users: prev.users.map(user =>
                                user.id === userId ? { ...user, is_active: newValue } : user
                            )
                        };
                    }
                    return prev;
                });

            } else {

                toast.error("Une erreur est survenue.");
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour.");
        }
    };

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

                <h1 className="text-2xl font-semibold text-gray-900">Liste des utilisateurs</h1>
                
                <p className="mt-2 text-sm text-gray-700 w-1/2">
                    Gestion des utilisateurs de la plateforme.
                </p>


                <div className="py-4">
                    <input type="search" placeholder="Rechercher par nom..." value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 space-y-10">

                <div>

                    {loading ? (
                        <TablePreloader />

                    ) : (

                        <div>
                        
                            {response && response?.users.length ? (

                                    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50 whitespace-nowrap">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Non & prénom</th>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Téléphone</th>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Email</th>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date de création</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">Option</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {response?.users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{index + 1}</td>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0">
                                                                    <Image className="h-8 w-8 rounded-full" src={user.photo_url ? user.photo_url : DEFAULT_IMAGE_URL} alt="" width={20} height={20} />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-gray-500">{user.username}</div>
                                                                    {user.role === 'ADMIN' ? (
                                                                        <span className="font-medium text-[12px] bg-red-500 text-white py-1 px-2 rounded">{user.role}</span>
                                                                    ) : user.role === 'USER' ? (
                                                                        <span className="font-medium text-[12px] bg-green-500 text-white py-1 px-2 rounded">{user.role}</span>
                                                                    ) : user.role === 'DRIVER' ? (
                                                                        <span className="font-medium text-[12px] bg-orange-500 text-white py-1 px-2 rounded">{user.role}</span>
                                                                    ) : (
                                                                        <p>Status inconnu</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.contact_number}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{DateTime(user.created_at)} à {DateHeur(user.created_at)}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {user.verification_status === 'pending' ? (
                                                                <span className="inline-flex rounded-full bg-red-700 px-2 text-xs font-semibold leading-5 text-white">{user.verification_status}</span>
                                                            ) : (
                                                                <span className="inline-flex rounded-full bg-green-700 px-2 text-xs font-semibold leading-5 text-white">{user.verification_status}</span>
                                                            )}
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                            <button type="button" className="text-white bg-gray-800 p-2 rounded-lg">
                                                                <File onClick={() => navigateTo(`/admin/utilisateurs/${user.id}`)} name="File" strokeWidth={1} className="rounded-lg cursor-pointer h-4 w-4 font-extralight text-white" />
                                                            </button>
                                                            <ToggleSwitch isChecked={user.is_active} onChange={() => handleCheckboxChange(user.id, user.is_active)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>


                                ) : (
                                    <DataNotFound />
                                )}

                                {response && response?.users.length ? (
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
            
        </>
    );
};

export default Page;
