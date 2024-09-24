import { Search } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { z } from 'zod';
import { trajetSchema } from '@/app/schemas/trajectValidation';
import { convertToISODateTime } from '@/app/services/convertToISODateTime';

// Type pour PlaceResult de l'API Google Maps
type PlaceResult = google.maps.places.PlaceResult;
const PAGE_SIZE = 10; // Nombre de trajets par page

const Seach: React.FC = () => {

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
            router.push('/trajets/details');
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

        <div>
            <div className="max-auto max-w-2xl">
                <div className="sm:w-2/3">
                    <div className="grid grid-cols-1 gap-1 divide-gray-300 bg-white shadow-3xl p-1 px-1 text-base rounded-2xl max-w-2xl lg:mx-auto my-4">
                        <div className="py-2">
                            <p className="text-gray-500 text-center flex justify-center">
                                <Search className="h-5" /> Rechercher un trajet
                            </p>
                        </div>
                        
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
                            placeholder="Départ" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" />

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
                            placeholder="Arrivée" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"  />

                    <input  type="datetime-local" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" 
                        placeholder="Date" value={temps_depart_prevu}  onChange={(e) => setDate(e.target.value)} />
                    
                    <input type="number"  className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" 
                        placeholder="Nombre de places" value={places} onChange={(e) => setPlaces(Number(e.target.value))} />
                        
                        <div>
                            <button onClick={handleSearch} className="p-2 text-white bg-[#f7872e] text-center h-full w-full py-3 rounded-b-xl flex justify-center items-center shadow-sm px-6 gap-2 text-base"
                                type="button" >
                                Rechercher
                            </button>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center mt-4">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Seach;
