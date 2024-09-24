// Page.tsx
"use client";

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import UserProfil from '../../components/includes/userProfil';
import { trajetSchema, arretSchema } from '@/app/schemas/trajetSchema';
import { z } from 'zod';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import SelectVehicle from '../../components/Select2/SelectVehicle'; // Assurez-vous que le chemin est correct
import { Vehicule } from '@/app/interfaces/Vehicule';
import jwt from 'jsonwebtoken';
import { calculateDistance, calculateEstimatedTime } from '../../services/calculateDistance'; // Import de la fonction utilitaire
import { calculateDaysDifference } from '@/app/services/dateService';
import { trajetOnSubmit } from '@/app/services/TrajetServices';

type PlaceResult = google.maps.places.PlaceResult;
interface DecodedToken {
    id: string;
    exp: number;
}


const Page: React.FC = () => {

    const router = useRouter();

    // const navigateTo = () => {
    //     router.push('/conducteur/trajets');
    // };

    const [depart, setDepart] = useState<{ lat: number; lon: number } | null>(null);
    const [arrivee, setArrivee] = useState<{ lat: number; lon: number } | null>(null);
    const [departDate, setDepartDate] = useState('');
    const [arriveeDate, setArriveeDate] = useState('');
    const [vehicles, setVehicule] = useState('');
    
    const [places, setPlaces] = useState(1);
    const [prix, setPrix] = useState(1000);
    const [message, setMessage] = useState('');
    const [daysDifference, SetdaysDifference] = useState(0);
    const [villeDepart, setVilleDepart] = useState<string>('');
    const [villeArrivee, setVilleArrivee] = useState<string>('');
    const [arret, setArret] = useState<{ lat: number; lon: number; ville: string } | null>(null);
    const [arretsList, setArretsList] = useState<{ lat: number; lon: number; ville: string }[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [distance, setDistance] = useState<number | null>(null);
    const [estimatedTime, setEstimatedTime] = useState<string | null>(null);


    useEffect(() => {

        if (departDate && arriveeDate) {
            const daysDifferenceString = calculateDaysDifference(departDate, arriveeDate);
            SetdaysDifference(Number(daysDifferenceString));
        
        }

    }, [departDate,arriveeDate]);


    const handleAddArret = () => {
        if (arret) {
            try {
                arretSchema.parse(arret);
                setArretsList(prevArrets => [...prevArrets, arret]);
                setArret(null);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    arret: ''
                }));
            } catch (error) {
                if (error instanceof z.ZodError) {
                    console.log('Arret validation error:', error.errors);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        arret: error.errors[0].message
                    }));
                }
            }
        }
    };

    const handleRemoveArret = (indexToRemove: number) => {
        setArretsList(prevArrets => prevArrets.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        if (depart && arrivee) {
            const calculatedDistance = calculateDistance(depart, arrivee);
            setDistance(calculatedDistance);
            // Exemple de vitesse moyenne en km/h (vous pouvez ajuster cette valeur selon vos besoins)
            const averageSpeed = 100; // km/h
            const time = calculateEstimatedTime(calculatedDistance, averageSpeed);
            setEstimatedTime(time);

            console.log(time);
        }
        

    }, [depart, arrivee]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            toast.error('Token manquant');
            throw new Error('Token manquant');
        }
        const decodedToken = jwt.decode(token) as DecodedToken | null;
    
        if (!decodedToken) {
            toast.error('Votre session a expiré, merci de vous reconnecter.');
            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
    
        const usersId = decodedToken.id;
        const distanceEstimee: number = distance ?? 0; // Utilise nullish coalescing pour définir une valeur par défaut
    
        const formData = {
            utilisateur_id: usersId,
            point_depart: depart || { lat: 0, lon: 0 },
            ville_depart: villeDepart || '', // Assure-toi que tous les champs requis sont renseignés
            point_arrivee: arrivee || { lat: 0, lon: 0 },
            ville_arrivee: villeArrivee || '',
            temps_depart_prevu: departDate ,
            temps_arrivee_prevu: arriveeDate ,
            duree_estimee: daysDifference ?? 0,
            distance_estimee: distanceEstimee,
            etat_trajet: 'pending',
            mode_transport: 'voiture',
            price: prix ?? 0,
            nombre_de_places: places ?? 1,
            vehicule_id: vehicles || '',
            arrets: arretsList || []
        };
    
        try {

            // console.log('FormData before validation:', formData);
            // trajetSchema.parse(formData);
            console.log('Données formatées:', formData);
            setErrors({});
            const response = await trajetOnSubmit(formData);
            if (response.code === 201 && response.data) {

                toast.success('Trajet créé avec succès!');
                setTimeout(() => {
                    router.push('/conducteur/trajets');
                }, 1500);
                
            } else {

                toast.error("Erreur lors de l'ajout du trajet.");

            }
        } catch (error) {
            
            if (error instanceof z.ZodError) {
                console.error('Validation errors:', error.errors); // Affiche les erreurs détaillées
                const newErrors: { [key: string]: string } = {};
                error.errors.forEach(err => {
                    newErrors[err.path[0]] = err.message;
                });
                console.error('Capture:', newErrors);
                setErrors(newErrors);
            }
        }
    };
    

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem('token');

    //     if (!token) {
    //         toast.error('Token manquant');
    //         throw new Error('Token manquant');
    //     }
    //     const decodedToken = jwt.decode(token) as DecodedToken | null;

    //     if (!decodedToken) {
    //         toast.error('Votre session a expiré, merci de vous reconnecter.');
    //         throw new Error('Votre session a expiré, merci de vous reconnecter.');
    //     }

    //     const usersId = decodedToken.id;
    //     const distanceEstimee: number = distance !== null ? distance : 0;

    //     const formData = {
    //         utilisateur_id: usersId,
    //         point_depart: depart || { lat: 0, lon: 0 },
    //         ville_depart: villeDepart,
    //         point_arrivee: arrivee || { lat: 0, lon: 0 },
    //         ville_arrivee: villeArrivee,
    //         temps_depart_prevu: departDate,
    //         temps_arrivee_prevu: arriveeDate,
    //         duree_estimee: daysDifference,
    //         distance_estimee: distanceEstimee,
    //         etat_trajet: 'pending',
    //         mode_transport: 'voiture',
    //         price: prix,
    //         nombre_de_places: places,
    //         vehicule_id: vehicles,
    //         arrets: arretsList
    //     };

    //     try {

    //         console.log('FormData before validation:', formData);
    //         trajetSchema.parse(formData);
    //         console.log('Données formatées:', formData);
    //         setErrors({})
    //         const response = await trajetOnSubmit(formData);
    //         if (response.code === 201 && response.data) {
    //             toast.success('Trajet créé avec succès!');
    //         } else {
    //             toast.error("Erreur lors de l'ajout du trajet.");
    //         }

    //     } catch (error) {

    //         if (error instanceof z.ZodError) {
    //             const newErrors: { [key: string]: string } = {};
    //             error.errors.forEach(err => {
    //                 newErrors[err.path[0]] = err.message;
    //             });
    //             setErrors(newErrors);
    //         }
    //     }

    // };


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

                                            <form onSubmit={handleSubmit}>

                                                <div className="bg-gray-50 px-4 py-5 mt-4 rounded-md shadow-md">
                                                    <div>
                                                        <h1 className="text-xl tracking-tight text-gray-900">Information du trajet</h1>
                                                        <p className="mt-1 text-base text-gray-500">Saisir les informations de votre trajet</p>
                                                    </div>
                                                    {/* <div style={{ maxWidth: '100%', overflow: 'hidden', color: 'red', width: '100%', height: '300px' }}>
                                                        <div id="display-google-map" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
                                                            <iframe style={{ height: '100%', width: '100%', border: '0' }} frameBorder="0" src="https://www.google.com/maps/embed/v1/search?q=abidjan&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                                                title="Google Maps">
                                                            </iframe>
                                                        </div>
                                                    </div> */}

                                                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">

                                                        <div>
                                                            <label htmlFor="depart" className="block text-sm font-medium text-gray-900">Départ</label>
                                                            <div className="mt-1">
                                                                <GooglePlacesAutocomplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                                                                    onPlaceSelected={(place: PlaceResult) => {
                                                                    if (place.geometry?.location) {
                                                                        setDepart({ lat: place.geometry.location.lat(),
                                                                                    lon: place.geometry.location.lng(),
                                                                        });
                                                                        // Add null check for formatted_address
                                                                        setVilleDepart(place.formatted_address || '');
                                                                    }
                                                                }} className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"/>
                                                            </div>
                                                            {errors.point_depart && <p className="text-sm text-red-600">{errors.point_depart}</p>}
                                                        </div>

                                                        <div>
                                                            <label htmlFor="arrivee" className="block text-sm font-medium text-gray-900">Arrivée</label>
                                                            <div className="mt-1">
                                                                <GooglePlacesAutocomplete
                                                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                                                                    onPlaceSelected={(place: PlaceResult) => {
                                                                        if (place.geometry?.location) {
                                                                            setArrivee({
                                                                                lat: place.geometry.location.lat(),
                                                                                lon: place.geometry.location.lng(),
                                                                            });
                                                                            // Add null check for formatted_address
                                                                            setVilleArrivee(place.formatted_address || '');
                                                                        }
                                                                    }}
                                                                    className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                            {errors.arrivee && <p className="text-red-500 text-sm">{errors.arrivee}</p>}
                                                        </div>

                                                        <div>
                                                            <label htmlFor="distance" className="block text-sm font-medium text-gray-900">Distance</label>
                                                            <div className="mt-1">
                                                                <input type="text" id="distance" value={distance !== null ? `${distance.toFixed(2)} km` : 'Calcul en cours...'}  readOnly className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-900">Nombre d&apos;heur estaimé</label>
                                                            <div className="mt-1">
                                                                <input type="text" id="estimatedTime" value={estimatedTime !== null ? `${estimatedTime}` : 'Calcul en cours...'}  readOnly className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="depart-date" className="block text-sm font-medium text-gray-900">Départ date</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="datetime-local"
                                                                    name="depart-date"
                                                                    value={departDate}
                                                                    onChange={(e) => setDepartDate(e.target.value)}
                                                                    className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="arrivee-date" className="block text-sm font-medium text-gray-900">Arrivée date</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="datetime-local"
                                                                    value={arriveeDate}
                                                                    onChange={(e) => setArriveeDate(e.target.value)}
                                                                    className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <label htmlFor="vehicule" className="block text-sm font-medium text-gray-900">Choisir un véhicule</label>
                                                            <div className="mt-1">
                                                                <SelectVehicle setVehicule={setVehicule} vehicles={[]} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="places" className="block text-sm font-medium text-gray-900">Nombre de places</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    name="places"
                                                                    value={places}
                                                                    onChange={(e) => setPlaces(Number(e.target.value))}
                                                                    className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="prix" className="block text-sm font-medium text-gray-900">Fixez votre prix par place</label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    name="prix"
                                                                    value={prix}
                                                                    onChange={(e) => setPrix(Number(e.target.value))}
                                                                    className="block w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
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
                                                                    aria-describedby="message-max"/>
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
                                                            <div className="flex  md:justify-end gap-3">
                                                            <GooglePlacesAutocomplete
                                                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                                                                onPlaceSelected={(place: PlaceResult) => {
                                                                    if (place.geometry?.location) {
                                                                        setArret({
                                                                            lat: place.geometry.location.lat(),
                                                                            lon: place.geometry.location.lng(),
                                                                            ville: place.formatted_address || '', // Add null check
                                                                        });
                                                                    }
                                                                }}
                                                                placeholder="Arrêt"  className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"/>

                                                                <button  type="button" onClick={handleAddArret} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600" >
                                                                    Choisire
                                                                </button>

                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="py-3">
                                                            <p className="text-gray-800">Liste des arrêts :</p>
                                                        </div>
                                                        <div className="flex gap-3">
                                                                {arretsList.map((a, index) => (
                                                                <div key={index} className="bg-[#dfdfdf] text-black px-2 py-1 rounded-md text-base text-center truncate flex justify-between">
                                                                    {a.ville}
                                                                    <X name="X" onClick={() => handleRemoveArret(index)} className="h-4 w-4 mt-1 hover:bg-red-500 rounded-full hover:text-white" />
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

                                            </form>
                                                
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
};

export default Page;
