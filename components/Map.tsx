'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapProps {
  coordinates: Coordinate[];  // Tableau de coordonnées pour afficher les points
  title: string;  // Titre pour la carte (facultatif)
}

const Map: React.FC<MapProps> = ({ coordinates, title }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // État pour savoir si Google Maps est chargé
  const [zoom, setZoom] = useState(10); // Zoom par défaut
  const [center, setCenter] = useState<Coordinate>({ lat: 0, lng: 0 }); // Centre de la carte
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null); // Résultat des directions

  // Style de la carte
  const mapContainerStyle = {
    width: '100%',
    height: '600px',
  };

  // Icône de véhicule avec une image statique
  const vehicleIcon = {
    url: 'https://i.ibb.co/cyvcpfF/uberx.png',  // URL de l'image
    scaledSize: { width: 32, height: 32 },  // Taille de l'icône avec CSS (pas besoin de `google.maps.Size`)
    anchor: { x: 16, y: 16 },  // Point d'ancrage en utilisant des coordonnées relatives en pourcentage
  };

  // Vérification si la clé API est définie
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!googleMapsApiKey) {
    console.error('Google Maps API Key is missing');
    return <div>Error: Google Maps API Key is missing!</div>;
  }

  // Fonction de callback pour quand Google Maps est chargé
  const onLoadGoogleMaps = () => {
    setGoogleMapsLoaded(true);
  };

  // Fonction pour calculer le zoom et le centre en fonction des coordonnées
  const calculateZoomAndCenter = (coordinates: Coordinate[]) => {
    if (coordinates.length === 0) return;

    // Trouver les coordonnées extrêmes
    const lats = coordinates.map(coord => coord.lat);
    const lngs = coordinates.map(coord => coord.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculer le centre de la bounding box
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    setCenter({ lat: centerLat, lng: centerLng });

    // Calculer le niveau de zoom en fonction de la distance (plus la boîte est grande, plus le zoom est bas)
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    // Calculer un zoom basé sur la taille de la zone
    const calculatedZoom = maxDiff > 10 ? 6 : maxDiff > 5 ? 8 : 10;
    setZoom(calculatedZoom);
  };

  // Mise à jour du zoom et du centre lorsque les coordonnées changent
  useEffect(() => {
    if (coordinates.length > 0) {
      calculateZoomAndCenter(coordinates);
    }
  }, [coordinates]);

  // Calculer et afficher l'itinéraire avec les points de passage
  const calculateRoute = useCallback(() => {
    const directionsService = new google.maps.DirectionsService();
    const waypoints = coordinates.slice(1, coordinates.length - 1).map(coord => ({
      location: new google.maps.LatLng(coord.lat, coord.lng),
      stopover: true,
    }));

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),  // Point de départ
      destination: new google.maps.LatLng(coordinates[coordinates.length - 1].lat, coordinates[coordinates.length - 1].lng), // Point d'arrivée
      waypoints: waypoints,  // Points de passage
      travelMode: google.maps.TravelMode.DRIVING,  // Mode de transport
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }, [coordinates]);

  // Calculer l'itinéraire dès que les coordonnées sont chargées
  useEffect(() => {
    if (coordinates.length >= 2) {
      calculateRoute();
    }
  }, [coordinates, calculateRoute]);

  return (
    <div className="">
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={['places']}  // Ajout de 'directions' pour l'API Directions
        onLoad={onLoadGoogleMaps}
      >
        {googleMapsLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom} // Utilise le zoom dynamique ajusté selon les coordonnées
          >
            {/* Afficher l'itinéraire tracé par DirectionsRenderer */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ suppressMarkers: true }}  // Ne pas afficher les marqueurs par défaut
              />
            )}

            {/* Placer un marqueur à chaque coordonnée */}
            {coordinates.map((coord, index) => (
              <Marker key={index}
                position={{ lat: coord.lat, lng: coord.lng }}
                icon={index === 0 ? vehicleIcon : undefined} // Utiliser l'icône personnalisée pour le premier point
                title={`Point ${index + 1}`}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Chargement de la carte...</div> // Message de chargement tant que Google Maps n'est pas prêt
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
