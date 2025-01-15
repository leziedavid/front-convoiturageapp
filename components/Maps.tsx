'use client';

import React, { useEffect, useState } from 'react';
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
  const [directionsResponse, setDirectionsResponse] = useState<any>(null); // État pour stocker la réponse des directions

  // Style de la carte
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  // Icône de véhicule avec une image statique
  const vehicleIcon = {
    url: 'https://i.ibb.co/cyvcpfF/uberx.png',  // URL de l'image
    scaledSize: { width: 32, height: 32 },  // Taille de l'icône avec CSS (pas besoin de `google.maps.Size`)
    anchor: { x: 16, y: 16 },  // Point d'ancrage en utilisant des coordonnées relatives en pourcentage
  };

  // Options pour la polyligne
  const polylineOptions = {
    path: coordinates.map(coord => ({ lat: coord.lat, lng: coord.lng })),
    strokeColor: "#FF0000",  // Rouge pour la polyligne
    strokeOpacity: 1.0,
    strokeWeight: 2,
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

  // Fonction pour récupérer l'itinéraire entre les points (coordonnées)
  const calculateRoute = () => {
    if (coordinates.length < 2) {
      return; // On ne peut pas créer un itinéraire avec moins de 2 points
    }

    const directionsService = new window.google.maps.DirectionsService();

    const origin = coordinates[0];
    const destination = coordinates[coordinates.length - 1];

    // Si vous avez plus de 2 points, vous pouvez ajouter des étapes entre l'origine et la destination
    const waypoints = coordinates.slice(1, coordinates.length - 1).map(coord => ({
      location: new window.google.maps.LatLng(coord.lat, coord.lng),
      stopover: true,
    }));

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING, // Choisir le mode de transport (DRIVING, WALKING, etc.)
      },
      (result, status) => {
        if (status === 'OK') {
          setDirectionsResponse(result); // Stocke la réponse pour afficher l'itinéraire
        } else {
          console.error('Erreur de récupération de l\'itinéraire:', status);
        }
      }
    );
  };

  // Gestion de l'effet pour calculer l'itinéraire dès que la carte et les coordonnées sont prêtes
  useEffect(() => {
    if (coordinates.length > 1) {
      calculateRoute();
    }
  }, [coordinates]);

  // Centre de la carte basé sur la première coordonnée
  const center = coordinates[0];

  return (
    <div className="map-container">
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={['places']}
        onLoad={onLoadGoogleMaps}
      >
        {googleMapsLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10} // Ajuste le niveau de zoom pour mieux afficher le trajet
          >
            {/* Tracer une polyligne si l'itinéraire n'est pas disponible */}
            {!directionsResponse && (
              <Polyline path={polylineOptions.path} options={polylineOptions} />
            )}

            {/* Afficher l'itinéraire si disponible */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}

            {/* Placer un marqueur à chaque coordonnée */}
            {coordinates.map((coord, index) => (
              <Marker
                key={index}
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
