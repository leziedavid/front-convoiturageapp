"use client";

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { getDistance } from 'geolib';

// Définir le type pour les coordonnées avec des objets lat/lng
interface Coordinate {
    lat: number;
    lng: number;
}

interface MapComponentProps {
    coordinates: Coordinate[];
}

const FitBounds: React.FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = L.latLngBounds(coordinates.map(coord => [coord.lat, coord.lng]));
            map.fitBounds(bounds);
        }
    }, [coordinates, map]);

    return null;
};

const InfoCard: React.FC<{ distance: number; arrivalTime: string }> = ({ distance, arrivalTime }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px', // Positionné à droite
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px', // Réduire le padding
            borderRadius: '8px', // Réduire les coins arrondis
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif',
            width: '200px', // Largeur fixe pour réduire la taille
            fontSize: '0.9em', // Réduire la taille de la police
        }}>
            <h3 style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>Informations</h3>
            <p style={{ margin: '5px 0', color: '#555' }}>Distance: {distance.toFixed(2)} km</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Heure d&apos;arrivée: {arrivalTime}</p>
        </div>
    );
};

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
    
    const latLngCoordinates: [number, number][] = coordinates.map(coord => [coord.lat, coord.lng]);

    const [distance, setDistance] = useState<number>(0);
    const [arrivalTime, setArrivalTime] = useState<string>("");

    useEffect(() => {
        if (latLngCoordinates.length > 1) {
            const totalDistance = getDistance(
                { latitude: latLngCoordinates[0][0], longitude: latLngCoordinates[0][1] },
                { latitude: latLngCoordinates[latLngCoordinates.length - 1][0], longitude: latLngCoordinates[latLngCoordinates.length - 1][1] }
            ) / 1000; // Convertir en kilomètres

            setDistance(totalDistance);
            const travelTime = totalDistance / 60; // En heures, si on suppose une vitesse de 60 km/h
            const arrivalDate = new Date(Date.now() + travelTime * 3600000); // Heure d'arrivée estimée
            setArrivalTime(arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
    }, [latLngCoordinates]);

    // Effet de nettoyage au démontage pour éviter les doublons de cartes
    useEffect(() => {
        return () => {
            // Si la carte Leaflet existe déjà, on la détruit proprement lors du démontage
            const mapInstance = document.getElementsByClassName('leaflet-container')[0];
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    return (
        <MapContainer
            style={{ height: '100vh', width: '100%', zIndex: '0' }}
            zoom={5}
            center={[0, 0]} // Vous pouvez aussi initialiser un centre par défaut
        >
            <TileLayer
                url="http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                // attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            />
            {latLngCoordinates.map((coord, index) => (
                <Marker
                    key={index}
                    position={coord}
                    icon={L.icon({
                        iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png',
                        iconSize: [35, 35],
                        iconAnchor: [17, 34],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                        shadowSize: [35, 35],
                    })}
                >
                    <Popup>
                        Latitude: {coord[0]}, Longitude: {coord[1]}
                    </Popup>
                </Marker>
            ))}
            <FitBounds coordinates={coordinates} />
            <InfoCard distance={distance} arrivalTime={arrivalTime} />
        </MapContainer>
    );
};

export default MapComponent;
