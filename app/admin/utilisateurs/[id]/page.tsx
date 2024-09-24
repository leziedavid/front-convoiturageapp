
"use client";

import Image from 'next/image';
import { Clock, CheckCircle, ArrowDown, X, Car,CarFront, Edit, EllipsisVertical,SaveAll, Trash  } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';
import { getUsersById } from '@/app/services/UserServices';
import DataNotFound from '@/app/components/error/DataNotFound';
import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import { Utilisateur } from '@/app/interfaces/Users';
import { Menu } from '@headlessui/react';
import { User, Vehicule } from '@/app/interfaces/GlobalType';
import { DateHeur, DateTime, formatDateTime } from '@/app/services/dateUtils';

export default function Page() {

    const eventTypes = {
        applied: { icon: Clock, bgColorClass: 'bg-gray-400' },
        advanced: { icon: X, bgColorClass: 'bg-orange-500' },
        completed: { icon: CheckCircle, bgColorClass: 'bg-green-500' },
    };

    const timeline = [
        { id: 1, type: eventTypes.applied, content: 'Applied to', target: 'Front End Developer', date: 'Sep 20', datetime: '2020-09-20' },
        { id: 2, type: eventTypes.advanced, content: 'Advanced to phone screening by', target: 'Bethany Blake', date: 'Sep 22', datetime: '2020-09-22' },
        { id: 3, type: eventTypes.completed, content: 'Completed phone screening with', target: 'Martha Gardner', date: 'Sep 28', datetime: '2020-09-28' },
        { id: 4, type: eventTypes.advanced, content: 'Advanced to interview by', target: 'Bethany Blake', date: 'Sep 30', datetime: '2020-09-30' },
        { id: 5, type: eventTypes.completed, content: 'Completed interview with', target: 'Katherine Snyder', date: 'Oct 4', datetime: '2020-10-04' },
    ];


    const { id } = useParams<{ id: string  }>();
    const IdUsers = Array.isArray(id) ? id[0] : id;

    const [response, setResponse] = useState<Utilisateur | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTrajetDrivers = async () => {

            try {
    
                setLoading(true);
                const res = await getUsersById(id);
                if (res.code === 200) {
                    setResponse(res.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            } catch (err) {
                setLoading(false);
    
            }
        };
        fetchTrajetDrivers();

    }, [id]);

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (

        <>
            <div className="min-h-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Détail utilisateur</h1>
                </div>

                <main className="py-10">

                {loading ? (

                        <>
                            <div className="mx-4 lg:mx-auto max-w-5xl py-7">
                                <TrajetPreloader />
                            </div>
                        </>

                    ) : (

                    response ? (
                        <>
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                                <div className="flex items-center space-x-5">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <Image src={response.photo_url ? response.photo_url : DEFAULT_IMAGE_URL} alt="" width={64} height={64} className="inline-block h-9 w-9 rounded-full"/>
                                            <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{response.username}</h1>
                                        <p className="text-sm font-medium text-gray-500">{response.role}</p>
                                    </div>
                                </div>
                                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                                    <button type="button" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        {response.verification_status}
                                    </button>
                                </div>
                            </div>

                            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            
                                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                                    
                                    <section aria-labelledby="applicant-information-title">
                                        <div className="bg-white shadow sm:rounded-lg">
                                            
                                            <div className="px-4 py-5 sm:px-6">
                                                <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">Information</h2>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Données personnelles et de lutilisateur.</p>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Demande d&apos;adhésion</dt>
                                                        <dd className="mt-1 text-sm text-gray-900"> {response.role}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{response.email}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Address du compte</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{response.address}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">+225 {response.contact_number}</dd>
                                                    </div>
                                                </dl>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">

                                                {response?.vehicules && response?.vehicules.length > 0 ? (

                                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                    
                                                        {response?.vehicules.map((vehicule, index) => (

                                                            <div key={vehicule.id} className="bg-white border bottom-2 rounded-md p-4 shadow-sm">

                                                                <div className="flex justify-between">
                                                                    <div className="flex gap-3 items-center">
                                                                        <Car name="Car" size={70} className="text-[#f7872e]" strokeWidth={1} />
                                                                        <div>
                                                                            <p className="text-black text-base">{vehicule.plaque}</p>
                                                                            <h2 className="text-xs font-semibold leading-7 text-gray-900">Ajouter le  Ajouter le {DateTime(vehicule.date_creation)} {DateHeur(vehicule.date_creation)} </h2>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="grid grid-cols-3">

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Marque</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.marque}</h2>
                                                                    </div>

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Modèle</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.modele}</h2>
                                                                    </div>

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Année</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.annee}</h2>
                                                                    </div>

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Couleur</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.couleur}</h2>
                                                                    </div>

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Permis</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.permis}</h2>
                                                                    </div>

                                                                    <div>
                                                                        <p className="mt-1 text-sm leading-6 text-gray-600">Carte grise</p>
                                                                        <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.carte_grise}</h2>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        ))}

                                                </div>

                                                ) : null }

                                            </div>

                                        </div>
                                    </section>

                                </div>

                                <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                        <h2 id="timeline-title" className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                            <Clock /> Historique réchargement
                                        </h2>

                                        <div className="mt-6 flow-root">

                                        {response.rechargements.length ? (

                                            <ul role="list" className="-mb-8">
                                                {response.rechargements.map((item) => (
                                                    <li key={item.id}>
                                                        <div className="relative pb-8">
                                                            <div className="relative flex space-x-3">
                                                                <div>
                                                                        {item.status == "succeded" ? (
                                                                            <span className={`bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                                                                <CheckCircle className="bg-green-500 h-5 w-5 text-white" aria-hidden="true" />
                                                                            </span>
                                                                            
                                                                        ) : (
                                                                            <span className={`bg-green-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                                                                <Clock className="bg-red-500 h-5 w-5 text-white" aria-hidden="true" />
                                                                            </span>
                                                                        )}
                                                                        
                                                                </div>
                                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                                    <div>
                                                                        <p className="text-sm text-bolde text-gray-500">
                                                                            {item.description} -
                                                                            {item.paymentMethod}
                                                                    </p>
                                                                    </div>
                                                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                                        <time dateTime={item.date}>
                                                                        { DateTime(item.date)} à { DateHeur(item.date)}
                                                                        </time>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            ) : (

                                            <DataNotFound />

                                            )}

                                        </div>
                                        <div className="flex justify-center items-center mt-3">
                                            <div className="rounded-full bg-white p-2 drop-shadow-sm border-2 border-orange-400">
                                                <ArrowDown className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>

                        </>

                        ) : (

                            <DataNotFound />
                        )

                    )}<div className="mt-6">


                </div>

                </main>

            </div>

        </>
        
    )
}
