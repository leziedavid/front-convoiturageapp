/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FC } from 'react';
import { CheckIcon, ChevronRight } from 'lucide-react';
import Icon from '@/app/components/Icon';
import { TrajetResponse } from '@/app/interfaces/Trajet';
import { getAllTrajet, SearchTrajet } from '@/app/services/TrajetServices';
import TrajetPreloader from '@/app/components/Preloader/TrajetPreloader';
import TrajetNotFound from '@/app/components/error/TrajetNotFound';
import { DateHeur } from '@/app/services/dateUtils';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { z } from 'zod';
import { convertToISODateTime } from '@/app/services/convertToISODateTime';
import Pagination from '@/app/components/Pagination/Pagination';
import { Toaster } from 'react-hot-toast';

// Type pour PlaceResult de l'API Google Maps
type PlaceResult = google.maps.places.PlaceResult;

interface Feature {
    name: string;
    description: string;
    href: string;
    icon: IconName;
}

// Définir un type pour les icônes disponibles
type IconName = 'Inbox' | 'Users' | 'Trash';

const PAGE_SIZE = 3; // Nombre de trajets par page

const features: Feature[] = [
    {
        name: 'Unlimited inboxes',
        description: 'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
        href: '#',
        icon: 'Inbox',
    },
    {
        name: 'Manage team members',
        description: 'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
        href: '#',
        icon: 'Users',
    },
    {
        name: 'Spam report',
        description: 'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
        href: '#',
        icon: 'Trash',
    },
];

const Detail: FC = () => {

    const router = useRouter();
    const navigateTo = (path: string) => {
        router.push(path);
    };

    const [response, setResponse] = useState<TrajetResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [point_depart, setDepart] = useState<{ lat: number; lon: number } | null>(null);
    const [point_arrivee, setArrivee] = useState<{ lat: number; lon: number } | null>(null);
    const [temps_depart_prevu, setDate] = useState<string>('');
    const [nombre_de_places, setPlaces] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessages] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page



    const fetchTrajetDrivers = async () => {
        const storedFormData = localStorage.getItem('formDatas');

        try {
            setLoading(true);
            
            if(storedFormData){

            }else{
                
                const res = await getAllTrajet(currentPage, pageSize);
                console.log(res.data.code);
                if (res.code === 200) {
            
                    const adaptedResponse: TrajetResponse = {
                        trajets: res.data,
                        total: res.total,
                    };
                    setResponse(adaptedResponse);
                    setMessages(res.messages || "");
                    localStorage.removeItem('formDatas');
                } else if (res.code === 404) {

                    setMessages(res.messages || "");
                    localStorage.removeItem('formDatas');
                }
            }
    
        } catch (err) {
            console.error('Error fetching trajets:', err);
            setError('Erreur de chargement des trajets');

        } finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchTrajetDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]);
    
    const fetchTrajets = async (data:any) => {

        try {
            setLoading(true);
            const res = await SearchTrajet(data);
            if (res.code === 200) {

                const adaptedResponse: TrajetResponse = {
                    trajets: res.data,
                    total: res.total
                };

                setResponse(adaptedResponse);
                setMessages(res.messages || "");
                localStorage.removeItem('formDatas');

            } else if (res.code === 404) {

                setMessages(res.messages || "");
                localStorage.removeItem('formDatas');
            }
        } catch (err) {

            setError('Erreur lors de la récupération des données.');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        const storedFormData = localStorage.getItem('formDatas');

        if (storedFormData?.length) {
            const formData = JSON.parse(storedFormData);

            if (formData.nombre_de_places > 0) {

                setDepart(formData.depart || null);
                setArrivee(formData.arrivee || null);
                setDate(convertToISODateTime(formData.temps_depart_prevu) || '');
                setPlaces(formData.nombre_de_places || 1);

                fetchTrajets(formData);

            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]); // Recharger les données lorsque currentPage ou pageSize changent

    const handleSearch = async () => {
        // Formater la date
        const formattedDate = convertToISODateTime(temps_depart_prevu);
        // Préparer les données du formulaire
        const formData = {
            point_depart: point_depart ? { lat: point_depart.lat, lon: point_depart.lon } : undefined,
            point_arrivee: point_arrivee ? { lat: point_arrivee.lat, lon: point_arrivee.lon } : undefined,
            temps_depart_prevu: formattedDate,
            nombre_de_places: nombre_de_places,
            page: currentPage,
            limit: pageSize,
        };
    
        try {
            console.log('Données formatées:', formData);
            fetchTrajets(formData);
        } catch (error) {
            // Gérer les erreurs
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(err => err.message).filter(message => message !== 'Required');
                setError(errorMessages.join(', '));
            } else {
                setError('Erreur inconnue: ' + (error as Error).message);
            }
        } finally {
            setLoading(false); // Assurez-vous de toujours arrêter le chargement
        }
    };

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (

        <div>


            <Toaster position="top-right" reverseOrder={false} />

            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image src="/img/image copy 2.png" alt="" layout="fill" objectFit="cover" className="absolute inset-0 -z-10 brightness-50"/>
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl pt-20 sm:pt-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Trouver un trajet</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Allez où vous voulez avec Covoit’Ivoire<br />
                                Commandez une course, montez à bord et c&apos;est parti.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-1 divide-gray-300 bg-white shadow-2xl p-1 px-1 mx-4 text-base rounded-2xl max-w-5xl lg:mx-auto my-4">
                    
                    <div className="block flex-1">
                        <GooglePlacesAutocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                            onPlaceSelected={(place: PlaceResult) => {
                                if (place.geometry?.location) {
                                    setDepart({
                                        lat: place.geometry.location.lat(),
                                        lon: place.geometry.location.lng(),
                                    });
                                }
                            }}
                            placeholder="Départ"
                            className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className="block flex-1">
                        <GooglePlacesAutocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                            onPlaceSelected={(place: PlaceResult) => {
                                if (place.geometry?.location) {
                                    setArrivee({
                                        lat: place.geometry.location.lat(),
                                        lon: place.geometry.location.lng(),
                                    });
                                }
                            }}
                            placeholder="Arrivée"
                            className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                        />
                    </div>

                    <input type="datetime-local"
                        className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" 
                        placeholder="Date"
                        value={temps_depart_prevu}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    {/* <input type="number" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" 
                        placeholder="Nombre de places" value={nombre_de_places} onChange={(e) => setPlaces(Number(e.target.value))} /> */}


                    <input type="number" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" placeholder="Nombre de places"
                        value={nombre_de_places}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (e.target.value === '' || value >= 1) {
                                setPlaces(value);
                            }
                        }}
                        min="1"
                        step="1"
                    />



                    <div>
                        
                        <button className="p-2 text-white bg-[#f7872e] text-center h-full w-full py-3 rounded-b-xl md:rounded-bl-none md:rounded-r-xl flex justify-center items-center shadow-sm px-6 gap-2 text-base" type="button" onClick={handleSearch} >
                            Rechercher
                        </button>
                    </div>

                </div>

                {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                
            </div>


            {loading ? (
                
                <>
                    <div className="mx-4 lg:mx-auto max-w-5xl py-7">
                            <TrajetPreloader />
                            <TrajetPreloader />
                    </div>
                </>

            ) : (
                
                <div className="mx-4 lg:mx-auto max-w-5xl py-7">

                    <div className="flex justify-center text-2xl md:text-3xl font-bold">
                        {/* Trajet trouvé pour Abidjan à Agboville  */}
                        {message}
                    </div>

                    <div className="grid grid-cols-1 space-y-8 mt-10">
                    {response ? (
                            response?.trajets.map((trajet, index) => (

                                <div key={index} onClick={() => navigateTo(`/trajets/details/${trajet.id}`)} className="relative bg-white min-h-40 rounded-xl shadow-xl shadow-gray-200 border-none p-4 ring-offset-2 ring-2 ring-gray-300 hover:ring-[#f7872e] hover:shadow-none hover:cursor-pointer" >
                                    
                                    <div className="flex justify-between py-4">
                                        <div className="w-full md:w-2/3">
                                            <div className="flex justify-between gap-2">
                                                <div>
                                                    <div className="text-center md:text-left">
                                                        <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                            { DateHeur(trajet.temps_depart_prevu)}
                                                        </span>
                                                    </div>
                                                    <div className="text-center md:text-left">
                                                        <span className="text-sm font-bold w-16">
                                                            {trajet.ville_depart}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-auto flex justify-center items-center">
                                                    <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                                    <ChevronRight className="w-4 font-bold text-xl" />
                                                </div>
                                                <div>
                                                    <div className="text-center md:text-left">
                                                        <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                        { DateHeur(trajet.temps_arrivee_prevu)}
                                                        </span>
                                                    </div>
                                                    <div className="text-center md:text-left">
                                                        <span className="text-sm font-bold">
                                                            {trajet.ville_arrivee}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden md:block text-base md:text-xl font-semibold text-orange-500">
                                            {trajet.price} OXF
                                        </div>

                                    </div>

                                    <div className="absolute -bottom-8 -right-8 p-2 ">
                                        <Image src="/img/im1.png" layout="fill" objectFit="cover"  className="h-20 md:h-32" alt="" />
                                    </div>

                                    <div className="border-t-2 py-2 pt-4 flex space-x-10">
                                        <a href="#" className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image src={trajet?.utilisateur?.photo_url ? trajet.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="" width={36} height={36} className="inline-block h-9 w-9 rounded-full"/>
                                                    <div className="w-4 h-4 absolute right-0 bottom-0 rounded-full bg-[#f7872e] border-2 border-white"></div>
                                                </div>
                                                <div className="ml-3 flex flex-col text-left">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                                        {trajet.utilisateur.username}
                                                    </p>
                                                    <p className="text-xs text-gray-600">Chauffeur</p>
                                                </div>
                                            </div>
                                        </a>
                                        
                                        {/*
                                        <a href="#" className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                        width={36}
                                                        height={36}
                                                        className="inline-block h-9 w-9 rounded-full"
                                                    />
                                                    <div className="w-4 h-4 absolute right-0 bottom-0 rounded-full bg-[#f7872e] border-2 border-white"></div>
                                                </div>
                                                <div className="ml-3 flex flex-col text-left">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                                        Jason Keven
                                                    </p>
                                                    <p className="text-xs text-gray-600">Passager</p>
                                                </div>
                                            </div>
                                        </a> */}

                                    </div>

                                </div>
                            ))

                            ) : (
                                <TrajetNotFound />
                            )}

                    </div>

                    <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            total={response?.total || 0}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={setPageSize}
                        />

                </div>

            )}

            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stay on top of customer support</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                                            <Icon name={feature.icon} className="text-white" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{feature.description}</p>
                                        <p className="mt-6">
                                            <a href={feature.href} className="text-base font-semibold leading-7 text-black">
                                                Learn more <span aria-hidden="true">→</span>
                                            </a>
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                </div>
            </div>
            
        </div>

    );
};

export default Detail;
