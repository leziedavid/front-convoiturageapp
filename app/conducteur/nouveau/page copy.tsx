"use client";

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import UserProfil from '../../components/includes/userProfil';
import { BaseResponse } from '../../interfaces/ApiResponse';
import { User } from '../../interfaces/GlobalType';
import { getUserInfo } from '../../services/Auth';

const arrets = [
    'Agboville',
    // Ajoute d'autres arrêts ici si nécessaire
];



export default function Page() {

    const router = useRouter();
    const [response, setResponse] = useState<BaseResponse<User> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showDrawer, setShowDrawer] = useState(false);
    const [arretsList, setArretsList] = useState(arrets);
    
    const handleNavigateToNewTrajet = () => {
        router.push('/conducteur/new-trajet');
    };

    const handleAddArret = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const newArret = (form.elements.namedItem('arret') as HTMLInputElement).value;
        if (newArret) {
            setArretsList([...arretsList, newArret]);
            form.reset();
        }
    };

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const res = await getUserInfo();
                if (res.code === 201) {
                    setResponse(res.data);
                }
            } catch (err) {
                setError('Error fetching user info');
                console.error('Error fetching user info:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="min-h-full">
                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Nouveau trajet
                            </h1>
                        </div>
                    </header>
                </div>
                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white p-2">
                            <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                <div className="py-2 md:py-4">
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
                                                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-0">
                                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                        Nouveau trajet
                                                    </h1>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Vous pouvez suivre l&apos;historique de vos courses
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-gray-50 px-4 py-5 mt-4 rounded-md shadow-md">
                                                    <div>
                                                        <h1 className="text-xl tracking-tight text-gray-900">Information du trajet</h1>
                                                        <p className="mt-1 text-base text-gray-500">Saisir les informations de votre trajet</p>
                                                    </div>
                                                    <div style={{ maxWidth: '100%', overflow: 'hidden', color: 'red', width: '100%', height: '300px' }}>
                                                        <div id="display-google-map" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                                                            <iframe style={{ height: '100%', width: '100%', border: '0' }} frameBorder="0"
                                                                src="https://www.google.com/maps/embed/v1/search?q=abidjan&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                                                title="Google Maps">
                                                            </iframe>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                                                        <div>
                                                            <label htmlFor="depart" className="block text-sm font-medium text-gray-900">Départ</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    name="depart"
                                                                    id="depart"
                                                                    autoComplete="off"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="arrivee" className="block text-sm font-medium text-gray-900">Arrivée</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    name="arrivee"
                                                                    id="arrivee"
                                                                    autoComplete="off"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="depart-date" className="block text-sm font-medium text-gray-900">Départ date</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="date"
                                                                    name="depart-date"
                                                                    id="depart-date"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="arrivee-date" className="block text-sm font-medium text-gray-900">Arrivée date</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="date"
                                                                    name="arrivee-date"
                                                                    id="arrivee-date"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="vehicule" className="block text-sm font-medium text-gray-900">Choisir un véhicule</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    name="vehicule"
                                                                    id="vehicule"
                                                                    autoComplete="off"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="places" className="block text-sm font-medium text-gray-900">Nombre de places</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    name="places"
                                                                    id="places"
                                                                    autoComplete="off"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="prix" className="block text-sm font-medium text-gray-900">Fixez votre prix par place</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    name="prix"
                                                                    id="prix"
                                                                    autoComplete="off"
                                                                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                            <small className="text-gray-500">
                                                                *Prix idéal pour ce trajet ! Il est conseillé de fixer un prix inférieur aux prix des transports en commun pour gagner des passagers en un rien de temps.
                                                            </small>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="message" className="block text-sm font-medium text-gray-900">Quelque chose à ajouter sur votre trajet ?</label>
                                                            <small id="message-max" className="text-sm text-gray-500">Max. 500 characters</small>
                                                            <div className="mt-1">
                                                                <textarea id="message" name="message"  rows={4} className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                    aria-describedby="message-max"> </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 px-4 py-5 rounded-md mt-6 shadow-md pb-4">
                                                    <div className="flex justify-between flex-wrap sm:flex-nowrap ">
                                                        <div>
                                                            <h1 className="text-lg tracking-tight text-gray-900">Ajoutez des villes sur votre trajet pour trouver plus de passagers :</h1>
                                                            <p className="mt-1 text-base text-gray-500">Enregistrer des arrêts en cours de route</p>
                                                        </div>
                                                        <div className="w-full">
                                                            <form className="flex  md:justify-end gap-3">
                                                                <input type="text"  placeholder="Saisir l'arrêt"  name="arret" id="arret" autoComplete="off"
                                                                    className="block w-full sm:w-1/2 rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"/>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="py-3">
                                                            <p className="text-gray-800">Liste des arrêts :</p>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            {arretsList.map((arret, index) => (
                                                                <div key={index} className="bg-[#dfdfdf] text-black px-2 py-1 rounded-md text-base text-center truncate flex justify-between">
                                                                    {arret}
                                                                    <X name="X" className="h-4 w-4 mt-1 hover:bg-red-500 rounded-full hover:text-white" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:flex sm:justify-end">
                                                    <button type="submit"
                                                        className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-1 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                                                        Enregistrer
                                                    </button>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Content end */}
                            </div>
                        </div>
                    </div>
                    {/* Menu mobile */}
                    <MobileNavBarDriver/>
                    {/* Menu mobile */}
                </main>
            </div>


        </>
    );
}
