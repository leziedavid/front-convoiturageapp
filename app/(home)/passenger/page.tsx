"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { userFomeOnSubmit } from '@/app/services/UserServices';

// Définir le schéma de validation avec Zod
const passengerSchema = z.object({
    firstname: z.string().min(1, 'Nom d’utilisateur requis'),
    phone: z.string().
    min(8, 'Numéro de téléphone doit contenir au moins 8 chiffres')
    .max(10, 'Numéro de téléphone ne peut pas dépasser 10 chiffres')
    .regex(/^\d+$/, 'Numéro de téléphone invalide'),
    email: z.string().email('Adresse e-mail invalide'),
    address: z.string().min(1, 'Adresse requise'),
    password: z.string().min(6, 'Mot de passe doit contenir au moins 6 caractères'),
    confirmerPassword: z.string().min(6, 'La confirmation du mot de passe doit contenir au moins 6 caractères')}).refine(data => data.password === data.confirmerPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmerPassword"], // Point de l'erreur dans la validation
});

type PassengerFormValues = z.infer<typeof passengerSchema>;

export default function Page() {

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PassengerFormValues>({
        resolver: zodResolver(passengerSchema),
    });

    const onSubmit = async (data: PassengerFormValues) => {

        const formData = new FormData();
        formData.append('username', data.firstname);
        formData.append('contact_number', data.phone);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('password', data.password);
        formData.append('role', 'USER');
        formData.append('currency_id', 'FCFA');

        try {

            const apiResponse = await userFomeOnSubmit(formData);

            if(apiResponse.code==201){

                toast.success('Successfully toasted!')
                reset();
            }else if(apiResponse.code==400){

                toast.error(apiResponse.messages!)
            }else if(apiResponse.code==500){
                toast.error(" Un compte existe dêja avec se email")
            }
            
            
        } catch (error) {

            console.error('Error:', error);
            toast.error("This didn't work.")
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false}/>

            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image
                    src="/img/istockphoto-1321876617-1024x1024.jpg"
                    alt=""
                    layout="fill"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
                />
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-20 sm:py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Passager</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                            Prenez place côté passager et profitez du trajet
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                    <div className="relative bg-white shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            <div className="relative overflow-hidden bg-black py-10 px-6 sm:px-10 xl:p-12">
                                <h1 className="text-[30px] font-medium text-white">Des trajets confortables et abordables</h1>
                                <p className="mt-6 max-w-3xl text-base text-indigo-50">Économisez jusqu’à 30% sur vos 3 premières courses</p>
                            </div>

                            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                <h1 className="text-[25px] font-medium text-gray-900">Créez un compte passager</h1>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                    <div>
                                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-900">Indiquez votre nom d&apos;utilisateur</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="firstname"
                                                {...register('firstname')}
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Indiquez votre numéro de téléphone</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="phone"
                                                {...register('phone')}
                                                autoComplete="phone"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Indiquez votre adresse e-mail</label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                id="email"
                                                {...register('email')}
                                                autoComplete="email"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-900">Indiquez votre Adresse / Lieu d&apos;habitation</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                {...register('address')}
                                                autoComplete="address"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Choisissez un mot de passe</label>
                                        <div className="mt-1 relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('password')}
                                                id="password"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 19.5C8.1 19.5 4.7 16.2 2.5 12.5a9.1 9.1 0 0 1 0-5C4.7 7.8 8.1 4.5 12 4.5S19.3 7.8 21.5 12.5a9.1 9.1 0 0 1 0 5C19.3 16.2 15.9 19.5 12 19.5zM12 7.5a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9zM12 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 19.5C8.1 19.5 4.7 16.2 2.5 12.5a9.1 9.1 0 0 1 0-5C4.7 7.8 8.1 4.5 12 4.5S19.3 7.8 21.5 12.5a9.1 9.1 0 0 1 0 5C19.3 16.2 15.9 19.5 12 19.5zM12 7.5a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9zM12 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                    </svg>
                                                )}
                                            </button>
                                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmerPassword" className="block text-sm font-medium text-gray-900">Confirmer le mot de passe</label>
                                        <div className="mt-1">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('confirmerPassword')}
                                                id="confirmerPassword"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                            {errors.confirmerPassword && <p className="text-red-500 text-sm">{errors.confirmerPassword.message}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                                        <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-orange-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto" >
                                            Continuer
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <p className="text-xs">En continuant, vous acceptez de recevoir au numéro fourni des appels, messages WhatsApp ou SMS, y compris de façon automatisée, de la part Covoit’Ivoire et de ses sociétés affiliées</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
