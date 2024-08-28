"use client";

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { User } from '../interfaces/GlobalType';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFomeOnSubmit } from '../services/UserServices';
import toast, { Toaster } from 'react-hot-toast';
import Preloader from './Preloader';
import TrajetPreloader from './TrajetPreloader';


// Définir les props pour le composant
interface UsersCompte {
    users: User;
}

// Définir le schéma de validation avec Zod pour les informations personnelles
const MySchema = z.object({

    firstname: z.string().min(1, 'Nom d’utilisateur requis'),
    role: z.string().min(1, 'Nom d’utilisateur requis'),
    phone: z.string()
        .min(8, 'Numéro de téléphone doit contenir au moins 8 chiffres')
        .max(10, 'Numéro de téléphone ne peut pas dépasser 10 chiffres')
        .regex(/^\d+$/, 'Numéro de téléphone invalide'),
    email: z.string().email('Adresse e-mail invalide'),
    address: z.string().min(1, 'Adresse requise'),
});

// Définir le schéma de validation avec Zod pour le changement de mot de passe
const NewPasswordSchema = z.object({
    password: z.string().min(6, 'Mot de passe doit contenir au moins 6 caractères'),
    newPassword: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères')
});

type FormValues = z.infer<typeof MySchema>;
type FormPasswordValues = z.infer<typeof NewPasswordSchema>;

const MonCompte: React.FC<UsersCompte> = ({ users }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);


    // Initialiser le formulaire avec les données de l'utilisateur pour les informations personnelles
    const {
        register: registerPersonal,
        handleSubmit: handleSubmitPersonal,
        formState: { errors: errorsPersonal },
        reset: resetPersonal
    } = useForm<FormValues>({
        resolver: zodResolver(MySchema),
        defaultValues: {
            firstname: users.username || '',
            phone: users.contact_number || '',
            email: users.email || '',
            address: users.address || '',
            role: users.role || '',
        }
    });

    // Initialiser le formulaire pour le changement de mot de passe
    const { register: registerPassword, handleSubmit: handleSubmitPassword,formState: { errors: errorsPassword } } = useForm<FormPasswordValues>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
            newPassword: '',
        }
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onSubmitPersonal = async (data: FormValues) => {
        const formData = new FormData();
        formData.append('username', data.firstname);
        formData.append('contact_number', data.phone);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('role', data.role);
        if (file) {
            formData.append('photo', file);
        }

        try {
            const apiResponse = await userFomeOnSubmit(formData);

            if (apiResponse.code === 201) {
                toast.success('Informations mises à jour avec succès!');
                resetPersonal();
            } else if (apiResponse.code === 400) {
                toast.error(apiResponse.messages!);
            } else if (apiResponse.code === 500) {
                toast.error("Erreur interne du serveur.");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cette opération a échoué.");
        }
    };

    const onSubmitPassword = async (data: FormPasswordValues) => {
        
        const formData = new FormData();
        if (data.password) formData.append('password', data.password);
        if (data.newPassword) formData.append('newPassword', data.newPassword);
        try {
            const apiResponse = await userFomeOnSubmit(formData);

            if (apiResponse.code === 201) {
                toast.success('Mot de passe changé avec succès!');
                resetPersonal();
            } else if (apiResponse.code === 400) {
                toast.error(apiResponse.messages!);
            } else if (apiResponse.code === 500) {
                toast.error("Erreur interne du serveur.");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Cette opération a échoué.");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);



    return (
        <>




            {loading ? (

                <TrajetPreloader />

            ) : (

                <>
                <form onSubmit={handleSubmitPersonal(onSubmitPersonal)} >
                    <div className="mt-6 grid grid-cols-4 gap-6 p-1">
                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Nom d&apos;utilisateur</label>
                            <input type="text" id="firstname" {...registerPersonal('firstname')} autoComplete="cc-given-name" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                            {errorsPersonal.firstname && <p className="text-red-500 text-sm">{errorsPersonal.firstname.message}</p>}
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                            <input type="text" id="phone" {...registerPersonal('phone')} autoComplete="cc-given-name" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                            {errorsPersonal.phone && <p className="text-red-500 text-sm">{errorsPersonal.phone.message}</p>}
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                            <input type="text" id="email" {...registerPersonal('email')} autoComplete="cc-given-name" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                            {errorsPersonal.email && <p className="text-red-500 text-sm">{errorsPersonal.email.message}</p>}
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse / lieu d&apos;habitation</label>
                            <input type="text" id="address" {...registerPersonal('address')} autoComplete="cc-given-name" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                            {errorsPersonal.address && <p className="text-red-500 text-sm">{errorsPersonal.address.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-2">
                        <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">Indiquez un profil</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-[#f7872e] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#f7872e] focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Télécharger un fichier</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                    </label>
                                </div>
                                <p className="text-xs leading-5 text-gray-600 mb-10">PPNG, JPG, GIF jusqu&apos;à 10MB</p>
                                {imagePreview && (
                                    <div className="mt-4 flex justify-center items-center">
                                        <div className="relative w-24 h-24">
                                            <Image
                                                src={imagePreview as string}
                                                alt="Image Preview"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full border border-gray-300"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-orange-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                            Modifier
                        </button>
                    </div>
                </form>

                <div className="bg-gray-50 px-4 py-5 rounded-md mt-6 shadow-md pb-4">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-xl tracking-tight text-gray-900">Modifier le mot de passe </h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmitPassword(onSubmitPassword)} >
                        <div className="mt-6 grid grid-cols-4 gap-6 p-1">
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Saisissez l&apos;ancien mot de passe </label>
                                <div className="mt-1 relative">
                                    <input id="password" {...registerPassword('password')} type={showPassword ? 'text' : 'password'} autoComplete="current-password" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {showPassword ? (
                                                <path d="M12 19.5C8.1 19.5 4.7 16.2 2.5 12.5a9.1 9.1 0 0 1 0-5C4.7 7.8 8.1 4.5 12 4.5S19.3 7.8 21.5 12.5a9.1 9.1 0 0 1 0 5C19.3 16.2 15.9 19.5 12 19.5zM12 7.5a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9zM12 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            ) : (
                                                <path d="M12 19.5C8.1 19.5 4.7 16.2 2.5 12.5a9.1 9.1 0 0 1 0-5C4.7 7.8 8.1 4.5 12 4.5S19.3 7.8 21.5 12.5a9.1 9.1 0 0 1 0 5C19.3 16.2 15.9 19.5 12 19.5zM12 7.5a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9zM12 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                {errorsPassword.password && <p className="text-red-500 text-sm">{errorsPassword.password.message}</p>}
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Saisissez le nouveau mot de passe </label>
                                <input type={showPassword ? 'text' : 'password'} {...registerPassword('newPassword')} id="newPassword" autoComplete="new-password" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                                {errorsPassword.newPassword && <p className="text-red-500 text-sm">{errorsPassword.newPassword.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:flex sm:justify-end">
                            <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-orange-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                                Changer
                            </button>
                        </div>
                    </form>
                </div>

                </>
            )}

        </>
    );
};

export default MonCompte;
