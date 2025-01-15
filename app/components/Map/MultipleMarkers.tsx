// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//     width: '100%',
//     height: '400px',
// };

// const centre = {
//     lat: 37.437041393899676,
//     lng: -4.191635586788259,
// };

// const locations = [
//     { lat: 37.437041393899676, lng: -4.191635586788259 },
//     { lat: 37.440575591901045, lng: -4.231433159434073 },
//     // Add more locations here
// ];

// const MultipleMarkersMap = () => {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    
//     // S'assurer que apiKey est toujours une chaîne
//     if (!apiKey) {
//         console.error('Google Maps API Key is missing');
//         return <div>Error: Google Maps API Key is missing!</div>;
//     }

//     return (
//         <LoadScript googleMapsApiKey={apiKey}>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={centre} // Change 'centre' to 'center' (correct prop name)
//                 zoom={10}>
//                 {locations.map((location, index) => (
//                     <Marker key={index} position={location} />
//                 ))}
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// export default MultipleMarkersMap;



"use client";  // Indiquer que ce fichier sera exécuté côté client

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// Définir les types pour les coordonnées et les props
interface Coordinate {
    lat: number;
    lng: number;
}

interface MapComponentProps {
    coordinates: Coordinate[];
}

const containerStyle = {
    width: '100%',
    height: '400px',
};

// Fonction utilitaire pour calculer le centre basé sur les coordonnées
const calculateCenter = (coordinates: Coordinate[]) => {
    if (!coordinates || coordinates.length === 0) {
        return { lat: 0, lng: 0 }; // Valeur par défaut si les coordonnées sont invalides
    }

    const latitudes = coordinates.map(coord => coord.lat);
    const longitudes = coordinates.map(coord => coord.lng);

    // Vérification si toutes les coordonnées sont valides
    const validLatitudes = latitudes.filter(lat => !isNaN(lat) && isFinite(lat));
    const validLongitudes = longitudes.filter(lng => !isNaN(lng) && isFinite(lng));

    // Si nous n'avons pas de coordonnées valides, retourner une valeur par défaut
    if (validLatitudes.length === 0 || validLongitudes.length === 0) {
        return { lat: 0, lng: 0 };
    }

    const avgLat = validLatitudes.reduce((sum, lat) => sum + lat, 0) / validLatitudes.length;
    const avgLng = validLongitudes.reduce((sum, lng) => sum + lng, 0) / validLongitudes.length;

    return { lat: avgLat, lng: avgLng };
};

const MultipleMarkersMap: React.FC<MapComponentProps> = ({ coordinates }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
        console.error('Google Maps API Key is missing');
        return <div>Error: Google Maps API Key is missing!</div>;
    }

    const [directions, setDirections] = useState(null);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

    // Calculer dynamiquement le centre de la carte en fonction des coordonnées
    const centre = calculateCenter(coordinates);

    // Vérification si l'API Google Maps est bien chargée
    useEffect(() => {
        const checkGoogleMaps = () => {
            if (window.google && window.google.maps) {
                setGoogleMapsLoaded(true);
            }
        };

        checkGoogleMaps();

        // Ajout d'un événement pour vérifier si le script est chargé
        window.addEventListener('load', checkGoogleMaps);
        return () => window.removeEventListener('load', checkGoogleMaps);
    }, []);

    // Fonction pour récupérer l'itinéraire entre les points
    const onDirectionsLoad = useCallback(async () => {
        if (!googleMapsLoaded || coordinates.length < 2) return;

        const DirectionsServiceInstance = new window.google.maps.DirectionsService();

        const origin = coordinates[0]; // Point de départ (premier marqueur)
        const destination = coordinates[coordinates.length - 1]; // Point d'arrivée (dernier marqueur)
        const waypoints = coordinates.slice(1, -1).map(location => ({
            location: new window.google.maps.LatLng(location.lat, location.lng),
            stopover: true,
        }));

        const request = {
            origin: new window.google.maps.LatLng(origin.lat, origin.lng),
            destination: new window.google.maps.LatLng(destination.lat, destination.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
            waypoints: waypoints,
            optimizeWaypoints: true, // Optimiser l'itinéraire
        };

        try {
            DirectionsServiceInstance.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    }, [googleMapsLoaded, coordinates]);

    useEffect(() => {
        // Charge l'itinéraire dès que Google Maps est prêt
        if (googleMapsLoaded) {
            onDirectionsLoad();
        }
    }, [googleMapsLoaded, onDirectionsLoad]);

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centre}
                zoom={12}
            >
                {/* Affichage des marqueurs */}
                {coordinates.map((location, index) => (
                    <Marker key={index} position={location} />
                ))}

                {/* Affichage de l'itinéraire entre les points */}
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            suppressMarkers: true, // Ne pas afficher de nouveaux marqueurs pour les étapes
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MultipleMarkersMap;
