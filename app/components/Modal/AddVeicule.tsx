"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { CarFront, SaveAll, X } from 'lucide-react';
import { VehiculeFomeOnSubmit } from '@/app/services/VehiculeServices';
import jwt from 'jsonwebtoken';
import { BaseResponse } from '@/app/interfaces/ApiResponse';


// Définir les props pour le composant
interface UsersCompte {
    fetchUsers: () => Promise<void>;
    closeDrawer: () => void;
}

interface DecodedToken {
    id: string;
    exp: number;
}

const schema = z.object({
    marque: z.string().min(1, "La marque est requise"),
    modele: z.string().min(1, "Le modèle est requis"),
    annee: z.string().min(1, "L'année est requise"),
    // annee: z.number().min(1900, "L'année est requise").max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
    plaque: z.string().min(1, "La plaque est requise"),
    couleur: z.string().min(1, "La couleur est requise"),
    permis: z.string().min(1, "Le permis est requis"),
    carte_grise: z.string().min(1, "La carte grise est requise"),
});

type FormData = z.infer<typeof schema>;

const AddVeicule: React.FC<UsersCompte> = ({ fetchUsers, closeDrawer, }) => {

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
    
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token manquant');
            setLoading(false);
            return;
        }
    
        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;
    
        if (!decodedToken) {
            toast.error('Votre session a expiré, merci de vous reconnecter.');
            setLoading(false);
            return;
        }
    
        const utilisateur_id = decodedToken.id;
    
        // Convertir l'année en nombre
        const dataWithUserId = {
            ...data,
            utilisateur_id,
            annee: Number(data.annee) // Convertir l'année en nombre
        };
    
        try {
            const response = await VehiculeFomeOnSubmit(dataWithUserId);
    
            if (response.code === 201 && response.data) {
                toast.success('Véhicule ajouté avec succès');
                await fetchUsers();
                closeDrawer();
            } else {
                toast.error("Erreur lors de l'ajout du véhicule.");
            }
        } catch (error: any) {
            toast.error("Erreur lors de la requête : " + error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                        <div className="pointer-events-auto relative w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-2" id="slide-over-title">
                                                <CarFront name="CarFront" className="h-10 w-10" /> AJOUTER UN VEHICULE
                                            </div>
                                            <p className="text-gray-500 text-sm">
                                                Ajouter un nouveau véhicule
                                            </p>
                                        </div>
                                        <div>
                                            <X name="X" className="cursor-pointer" onClick={() => closeDrawer()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-2 flex-1 px-2">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-2 gap-6 p-4">
                                            {['marque', 'modele', 'annee', 'plaque', 'couleur', 'permis', 'carte_grise'].map((field) => (
                                                <div className="col-span-2 sm:col-span-1" key={field}>
                                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                                    </label>
                                                    <input type="text" id={field} {...register(field as keyof FormData)} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                                                    {errors[field as keyof FormData] && (
                                                        <p className="mt-2 text-sm text-red-600">
                                                            {errors[field as keyof FormData]?.message}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-end p-4 gap-4">
                                            <div onClick={() => closeDrawer()} className="flex justify-center items-center cursor-pointer text-[17px]">
                                                Fermer
                                            </div>
                                            <button
                                                type="submit"
                                                className={`inline-flex justify-center items-center gap-3 rounded-md border border-transparent bg-black py-2 px-2 text-sm font-medium text-white shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={loading}
                                            >
                                                <SaveAll name="SaveAll" className="font-extralight h-4 text-[#f7872e]" />
                                                {loading ? 'Enregistrement...' : 'Enregistrer'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default AddVeicule;
