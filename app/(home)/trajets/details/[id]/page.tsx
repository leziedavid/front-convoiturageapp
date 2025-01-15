// pages/trajet/details/[id].tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';
import Image from 'next/image';
import { CheckIcon } from 'lucide-react';
import { getAllTrajetById } from '@/app/services/TrajetServices';
import { TrajetResponse,Trajet } from '@/app/interfaces/Trajet';
import { DateHeur } from '@/app/services/dateUtils';
import { PlaceOrder } from '@/app/services/CommandeService';
import jwt from 'jsonwebtoken';
import toast, { Toaster } from 'react-hot-toast';
import MapComponent from '@/app/components/Map/Map1Component';
import MultipleMarkersMap from '@/app/components/Map/MultipleMarkers';

import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/app/components/Map/MapsComponent"), { ssr: false });

interface DecodedToken {
    id: string;
    exp: number;
}


const Detail: React.FC = () => {

    const { id } = useParams<{ id: string | string[] }>(); // Déclaration du type pour useParams
    const trajetId = Array.isArray(id) ? id[0] : id;

    const [response, setResponse] = useState<Trajet | null>(null);
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);

    const fetchTrajetDrivers = async () => {

        try {

            setLoading(true);
            const res = await getAllTrajetById(trajetId);

            if (res.code === 200) {

                setResponse(res.data);

                setTimeout(() => {
                    setLoading(false);
                }, 1500);

            }
        } catch (err) {
            setLoading(false);

        }
    };


    useEffect(() => {
        if(trajetId){
            fetchTrajetDrivers();
        }
    }, []);

    useEffect(() => {
        if (response) {
            const updatedCoordinates = [
                { lat: response.point_depart.lat, lng: response.point_depart.lon },
                { lat: response.point_arrivee.lat, lng: response.point_arrivee.lon },
                ...response.arrets.map(arret => ({
                    lat: arret.nom.lat,
                    lng: arret.nom.lon
                }))
            ];
            setCoordinates(updatedCoordinates);
        }
    }, [response]);



    const handleClick = () => {
        if (response) {
            SaveCommandes(response);
        } else {
            console.error('Aucune donnée de trajet disponible pour sauvegarder.');
        }
    };
    
    const SaveCommandes = async (data: Trajet) => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            toast.error("Token non trouvé. Veuillez vous reconnecter.");
            return; // Utilise 'return' au lieu de 'throw' pour éviter l'affichage non contrôlé d'erreurs
        }
    
        const decodedToken = jwt.decode(token) as DecodedToken | null;
    
        if (!decodedToken) {
            toast.error("Votre session a expiré, merci de vous reconnecter.");
            return; // Utilise 'return' au lieu de 'throw' pour éviter l'affichage non contrôlé d'erreurs
        }
    
        const id = decodedToken.id;
    
        // Obtenir la date et l'heure actuelles au format ISO 8601
        const currentISODate = new Date().toISOString();
        // Préparer les paramètres de la commande
        const orderParams: PlaceOrderParams = {
            trajetId: data.id,
            utilisateurId: id,
            conducteurId: data.utilisateur.id,
            pointPriseEnCharge: data.point_depart,
            pointDepose: data.point_arrivee,
            statutCommande: "pending",
            montant: data.price,
            modePaiement: "Espece", // Assure-toi que c'est la valeur correcte
            commentairesInstructions: "Livrer à la porte",
            historiqueStatuts: {},
            evaluations: {},
            tempsPriseEnCharge: currentISODate,
            tempsDepose: currentISODate,
            dateAction: currentISODate
        };
    
        try {

            const response = await PlaceOrder(orderParams);
            if (response.code === 201) {
                console.log('Réponse de l\'API:', response);
                toast.success('Commande enregistrée avec succès.');
                await fetchTrajetDrivers();

            } else if(response.code === 400) {

                toast.error(response.messages || 'An unexpected error occurred');
            }

        } catch (error) {

            console.error('Erreur lors de la commande:', error);
            toast.error("Cet trajet n'accepte plus de commandes, le nombre de places est atteint");
        }
        
    };

    const DEFAULT_IMAGE_URL = '/img/users.png';

    return (

        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div>
                <div className="relative isolate overflow-hidden bg-gray-900">
                    <Image src="/img/istockphoto-1321876617-1024x1024.jpg" alt="" layout="fill" objectFit="cover" className="absolute inset-0 -z-10 brightness-50"/>

                    <div className="px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl py-14 sm:py-14">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Détail du trajet</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    Plus de détails
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-5 md:mx-auto max-w-7xl py-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Premier composant : Informations */}
                        <div className="flex flex-col h-full"> {/* Flexbox pour occuper toute la hauteur */}
                            <div className="bg-white flex-1 rounded-xl shadow-md shadow-gray-200 border-none p-4 ring-offset-2 ring-2 ring-gray-300">
                                <div className="grid grid-cols-1 justify-between py-4">

                                    <div className="flex justify-between gap-2 mb-5">
                                        <div>
                                            <div className="text-center md:text-left">
                                                <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                    {DateHeur(response?.temps_depart_prevu)}
                                                </span>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <span className="text-sm font-bold w-16">
                                                    {response?.ville_depart}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-auto flex justify-center items-center">
                                            <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                        </div>
                                        <div>
                                            <div className="text-center md:text-left">
                                                <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                    {DateHeur(response?.temps_arrivee_prevu)}
                                                </span>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <span className="text-sm font-bold">
                                                    {response?.ville_arrivee}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t-4 py-2 pt-4 flex justify-center">
                                        <div className="text-base md:text-xl font-semibold text-orange-500">
                                            {response?.price} OXF
                                        </div>
                                    </div>

                                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <a href="#" className="group block flex-shrink-0">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <Image src={response?.utilisateur?.photo_url ? response.utilisateur.photo_url : DEFAULT_IMAGE_URL} alt="" width={36} height={36} className="inline-block h-9 w-9 rounded-full" />
                                                        <CheckIcon className="w-4 h-4 absolute right-0 bottom-0 text-white bg-orange-600 rounded-full" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex">{response?.utilisateur?.username}</p>
                                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Conducteur</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                            <dl className="sm:divide-y sm:divide-gray-200">
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Matricule</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{response?.vehicule.plaque}</dd>
                                                </div>
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Modèle voiture</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{response?.vehicule.modele}</dd>
                                                </div>
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{response?.utilisateur.contact_number}</dd>
                                                </div>
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Appréciation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Meilleur conducteur</dd>
                                                </div>
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Durée du trajet</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Meilleur conducteur</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button onClick={handleClick} type="button" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-[#f7872e] px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                                        Commander
                                    </button>
                                </div>

                            </div>
                        </div>

                        <DynamicMapComponent coordinates={coordinates} title="Trajet" />


                        {/* <MultipleMarkersMap coordinates={coordinates}  /> */}

                        {/* Deuxième composant : MapComponent */}
                        <div className="bg-white flex-1 rounded-xl shadow-md shadow-gray-200 border-none p-4 ring-offset-2 ring-2 ring-gray-300">
                            {/* <MapComponent coordinates={coordinates} /> */}
                            <div className="flex justify-center flex-1"> {/* Permet à l'image de prendre toute la hauteur disponible */}
                                <div className="h-96 w-full">
                                    <Image src="/img/image copy 3.png"
                                        alt=""
                                        layout="responsive"
                                        width={1200}
                                        height={800}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            
        </>

    );

};

export default Detail;
