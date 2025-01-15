'use client';

import { MoveRight, PhoneCall, MapPin, Navigation, MapPinHouse, ListOrdered, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDatePicker } from './DatePicker';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { z } from 'zod';
import { convertToISODateTime } from '@/app/services/convertToISODateTime';

// Type pour PlaceResult de l'API Google Maps
type PlaceResult = google.maps.places.PlaceResult;
const PAGE_SIZE = 10; // Nombre de trajets par page

export const Hero3 = () => {

    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

    // Fonction qui sera appelée lorsqu&apos;une date est sélectionnée
    const handleDateChange = (formattedDate: string) => {
        setSelectedDate(formattedDate); // Mettre à jour l&apos;état avec la date sélectionnée
    };

    const router = useRouter();
    
    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois de 01 à 12
        const day = String(now.getDate()).padStart(2, '0'); // Jour de 01 à 31
        const hours = String(now.getHours()).padStart(2, '0'); // Heures de 00 à 23
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes de 00 à 59
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [point_depart, setDepart] = useState<{ lat: number; lon: number } | null>(null);
    const [point_arrivee, setArrivee] = useState<{ lat: number; lon: number } | null>(null);
    // const [date, setDate] = useState<string>('');
    const [temps_depart_prevu, setDate] = useState<string>("");
    const [places, setPlaces] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [villeDepart, setVilleDepart] = useState<string>('');
    const [villeArrivee, setVilleArrivee] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE); // Taille de la page


    const handleSearch = async () => {
        const formattedDate = convertToISODateTime(temps_depart_prevu);
        const formData = {
            point_depart: point_depart ? { lat: point_depart.lat, lon: point_depart.lon } : undefined,
            point_arrivee: point_arrivee ? { lat: point_arrivee.lat, lon: point_arrivee.lon } : undefined,
            temps_depart_prevu: formattedDate,
            nombre_de_places: places,
            page: currentPage,
            limit: pageSize,
        };

        try {
            // trajetSchema.parse(formData);
            localStorage.setItem('formDatas', JSON.stringify(formData));
            router.push('/details');

        } catch (err) {
            if (err instanceof z.ZodError) {
                const errorMessages = err.errors.map(e => e.message).filter(message => message !== 'Required');
                setError(errorMessages.join(', '));
            } else {
                console.error('Erreur lors de la validation des données :', err);
            }
        }
    };

    return (
        <div className="w-full flex-1 py-5 lg:py-5 px-4 sm:px-6 md:px-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                    {/* Colonne texte */}
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-3xl md:text-5xl lg:text-7xl max-w-lg tracking-tighter text-left font-bold">
                                Allez où vous voulez avec Covoit&apos;Ivoire
                            </h1>
                            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                                Commandez une course en un clic et c&apos;est parti ! Entrez les informations suivantes pour commencer.
                            </p>
                        </div>

                        {/* Inputs pour Lieu, Destination et Date */}
                        <div className="space-y-4 w-full">
                            {/* Lieu de prise en charge et Destination avec icône */}
                            <div className="flex gap-4 flex-col sm:flex-row sm:gap-6 w-full">

                                <div className="relative w-full">
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                                    onPlaceSelected={(place: PlaceResult) => {
                                        if (place.geometry?.location) {
                                            setDepart({
                                                lat: place.geometry.location.lat(),
                                                lon: place.geometry.location.lng(),
                                            });
                                            setVilleDepart(place.formatted_address || '');
                                        }
                                    }}
                                    placeholder="Départ" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                                </div>

                                <div className="relative w-full">
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                                    onPlaceSelected={(place: PlaceResult) => {
                                        if (place.geometry?.location) {
                                            setArrivee({
                                                lat: place.geometry.location.lat(),
                                                lon: place.geometry.location.lng(),
                                            });
                                            setVilleArrivee(place.formatted_address || '');
                                        }
                                    }}
                                    placeholder="Arrivée" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />

                                </div>

                            </div>

                            {/* Nombre de place et Date avec icône */}
                            <div className="flex gap-4 flex-col sm:flex-row sm:gap-6 w-full">
                                <div className="relative w-full">
                                    <Input
                                        type="text"
                                        placeholder="Nombre de place (optionnel)"
                                        className="border rounded-lg p-4 pl-12 w-full"
                                    />
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                </div>
                            </div>

                            <div>
                                <CalendarDatePicker onDateChange={handleDateChange} />
                            </div>

                        </div>

                        {/* Boutons d&apos;action */}
                        <div className="flex flex-row gap-4 mt-4">
                            <Button onClick={handleSearch} size="lg" className="gap-4 w-full sm:w-auto bg-[#ff904e]">
                                Voir les prix <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Colonne image */}
                    <div className="bg-muted aspect-square hidden lg:block w-full h-full">
                        <img src="/img/2149104441.jpg" alt="Image description" className="object-cover w-full h-full" />
                    </div>

                </div>
            </div>
        </div>
    );
};
