'use client'; // Exécution côté client uniquement

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import TrajetPreloader from "../Preloader/TrajetPreloader";

// Définir les types pour les coordonnées et les props
interface Coordinate {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  coordinates: Coordinate[];
  title: string;
}

const vehicleIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY2hlbWVzL3N2ZyIgZmlsbD0ibm9uZSIgaGVpZ2h0PSI1MDAiIHdpZHRoPSI1MDAiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj4KPHBhdGggZD0iTTEyMCAxODIuNzg5OUw0MCAxMCA2MCAxMC04MyAtMjAgMCAyMCAtOCAtOTAtOCAtNzQgWCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTAiLz4KPHBhdGggZD0iTTE0MCAxMC44NzI4QzY0IDcuODggNjggOCA3MiAzMy41IDEwMDAgMCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTAiLz4KPC9zdmc+Cg==' ,  // SVG de véhicule simplifié
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, title }) => {
  // Valeurs fictives par défaut pour les coordonnées
  const defaultCoordinates: Coordinate[] = [
    { lat: 48.8566, lng: 2.3522 }, // Paris (exemple)
    { lat: 48.8586, lng: 2.3572 },
    { lat: 48.8606, lng: 2.3622 }
  ];

  // Utilisation d'un état pour gérer les coordonnées actuelles
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinate[]>(defaultCoordinates);

  // Remplacer les coordonnées par les réelles lorsqu'elles sont disponibles
  useEffect(() => {
    if (coordinates && coordinates.length > 0 && coordinates[0].lat > 0) {
      setCurrentCoordinates(coordinates);
    }
  }, [coordinates]);

  // Référence à la carte pour éviter la réinitialisation
  const mapRef = useRef<L.Map | null>(null);

  const polylinePositions: [number, number][] = currentCoordinates.map(coord => [coord.lat, coord.lng]);

  // Gestion des préchargements si les coordonnées sont vides ou invalides
  if (coordinates.length === 0 || !coordinates[0]?.lat) {
    return (
      <div className="mx-4 lg:mx-auto max-w-5xl py-7">
        <TrajetPreloader />
        <TrajetPreloader />
      </div>
    );
  }

  // Assurer que la carte est prête avant d'ajouter les tuiles
  useEffect(() => {
    if (mapRef.current) {
      // Ajouter les tuiles de la carte après que la carte a été initialisée
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    }
  }, []); // Cette logique s'exécute seulement après la première initialisation de la carte

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[currentCoordinates[0]?.lat || 0, currentCoordinates[0]?.lng || 0]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        whenReady={(mapInstance) => {
          // Ici, nous affectons la carte au ref mapRef une fois que la carte est prête
          if (!mapRef.current) {
            mapRef.current = mapInstance.target;
          }
        }}
      >
        {/* Ajout des marqueurs */}
        {currentCoordinates.map((coord, index) => (
          <Marker key={index} position={[coord.lat, coord.lng]} icon={vehicleIcon}>
            <Popup>{title}</Popup>
          </Marker>
        ))}

        {/* Tracer une polyline */}
        <Polyline positions={polylinePositions} color="blue" weight={4} opacity={0.7} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
