'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { getAllTrajetById } from '@/app/services/TrajetServices';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import { TrajetResponse, Trajet } from '@/app/interfaces/Trajet';
import jwt from 'jsonwebtoken';
import toast, { Toaster } from 'react-hot-toast';
import { PlaceOrder } from '@/app/services/CommandeService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoveRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { DateHeur } from '@/app/services/dateUtils';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DecodedToken {
    id: string;
    exp: number;
}

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string | string[] }>();
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
        if (trajetId) {
            fetchTrajetDrivers();
        }
    }, [trajetId]);

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
            toast.error('Token non trouvé. Veuillez vous reconnecter.');
            return;
        }
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        if (!decodedToken) {
            toast.error('Votre session a expiré, merci de vous reconnecter.');
            return;
        }
        const id = decodedToken.id;
        const currentISODate = new Date().toISOString();
        const orderParams: PlaceOrderParams = {
            trajetId: data.id,
            utilisateurId: id,
            conducteurId: data.utilisateur.id,
            pointPriseEnCharge: data.point_depart,
            pointDepose: data.point_arrivee,
            statutCommande: 'pending',
            montant: data.price,
            modePaiement: 'Espece',
            commentairesInstructions: 'Livrer à la porte',
            historiqueStatuts: {},
            evaluations: {},
            tempsPriseEnCharge: currentISODate,
            tempsDepose: currentISODate,
            dateAction: currentISODate
        };

        try {
            const response = await PlaceOrder(orderParams);
            if (response.code === 201) {
                console.log("Réponse de l'API:", response);
                toast.success('Commande enregistrée avec succès.');
                await fetchTrajetDrivers();
            } else if (response.code === 400) {
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
    
            <div className="w-full py-10 lg:py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                        <div className="flex gap-4 flex-col">
                            
                            <div className="flex gap-4 flex-col">
                                <h1 className="text-xl md:text-3xl max-w-lg tracking-tighter text-left font-regular">
                                    Détails du trajet
                                </h1>

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">ville de depart</Label>
                                    <Input disabled defaultValue={response?.ville_depart} type="text" placeholder="" />
                                </div>

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">viille d&apos;arrivée </Label>
                                    <Input disabled defaultValue={response?.ville_arrivee} type="text" placeholder="" />
                                </div>


                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Heur de depart</Label>
                                    <Input disabled defaultValue={DateHeur(response?.temps_depart_prevu)} type="text" placeholder="" />
                                </div>

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Heur d&apos;arrivée</Label>
                                    <Input disabled defaultValue={DateHeur(response?.temps_arrivee_prevu)} type="text" placeholder="" />
                                </div>

                            </div>
                            <div className="flex flex-row gap-4">
                                <Button onClick={handleClick} size="lg" className="gap-4">
                                    Passer la commande <MoveRight className="w-4 h-4" />
                                </Button>
                            </div>

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
                        <div className="bg-muted rounded-md relative w-full h-full aspect-square">
                            <div className="absolute inset-0 w-full h-full">
                                <Map coordinates={coordinates} title="Mon trajet" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
