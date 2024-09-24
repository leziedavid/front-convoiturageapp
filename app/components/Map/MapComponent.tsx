import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

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

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
    // Convertir les coordonnées en format LatLngTuple
    const latLngCoordinates: [number, number][] = coordinates.map(coord => [coord.lat, coord.lng]);

    return (
        <MapContainer style={{ height: '100vh', width: '100%',zIndex:'0'}} zoom={13} center={[0, 0]}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {latLngCoordinates.map((coord, index) => (
                <Marker
                    key={index}
                    position={coord}
                    icon={L.icon({
                        iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png',
                        iconSize: [25, 25],
                        iconAnchor: [12, 41],
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
        </MapContainer>
    );
};

export default MapComponent;
