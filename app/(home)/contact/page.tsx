"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { sendContactMessage } from '@/app/services/contactService';

// Définir le schéma de validation avec Zod
const ContactSchema = z.object({
    nom: z.string().min(1, 'Nom complet requis'),
    email: z.string().email('Adresse e-mail invalide'),
    sujet: z.string().min(1, 'Sujet requis'),
    message: z.string().max(500, 'Le message ne peut pas dépasser 500 caractères')
});

type ContactFormValues = z.infer<typeof ContactSchema>;

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(ContactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        const { nom, email, sujet, message } = data;

        try {
            const response = await sendContactMessage(nom, email, sujet, message);

            if (response.code===201) {
                reset();
                toast.success('Message envoyé avec succès!');

            } else {

                toast.error(response.messages || 'Une erreur est survenue.');

            }
        } catch (error) {

            console.error('Erreur lors de l\'envoi du message:', error);
            toast.error('Une erreur est survenue.');
        }
    };


    return (
        <div className="bg-gray-100">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                <div className="relative bg-white shadow-xl">
                    <h2 className="sr-only">Contact us</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3">

                    <div className="relative overflow-hidden bg-black py-10 px-6 sm:px-10 xl:p-12">
                            <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
                                <svg
                                    className="absolute inset-0 h-full w-full"
                                    width="343"
                                    height="388"
                                    viewBox="0 0 343 388"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                                        fill="url(#linear1)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear1"
                                            x1="254.553"
                                            y1="107.554"
                                            x2="961.66"
                                            y2="814.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset="1" stopColor="#fff" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden" aria-hidden="true">
                                <svg
                                    className="absolute inset-0 h-full w-full"
                                    width="359"
                                    height="339"
                                    viewBox="0 0 359 339"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                                        fill="url(#linear2)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear2"
                                            x1="192.553"
                                            y1="28.553"
                                            x2="899.66"
                                            y2="735.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset="1" stopColor="#fff" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block" aria-hidden="true">
                                <svg
                                    className="absolute inset-0 h-full w-full"
                                    width="160"
                                    height="678"
                                    viewBox="0 0 160 678"
                                    fill="none"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                                        fill="url(#linear3)"
                                        fillOpacity=".1"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="linear3"
                                            x1="192.553"
                                            y1="325.553"
                                            x2="899.66"
                                            y2="1032.66"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#fff" />
                                            <stop offset="1" stopColor="#fff" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-white">Contact information</h3>
                            <p className="mt-6 max-w-3xl text-base text-indigo-50">
                                Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.
                            </p>
                            <dl className="mt-8 space-y-6">
                                <dt><span className="sr-only">Phone number</span></dt>
                                <dd className="flex text-base text-indigo-50">
                                    <svg
                                        className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                        />
                                    </svg>
                                    <span className="ml-3">+1 (555) 123-4567</span>
                                </dd>
                                <dt><span className="sr-only">Email</span></dt>
                                <dd className="flex text-base text-indigo-50">
                                    <svg
                                        className="h-6 w-6 flex-shrink-0 text-indigo-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                        />
                                    </svg>
                                    <span className="ml-3">support@workcation.com</span>
                                </dd>
                            </dl>
                            <ul role="list" className="mt-8 flex space-x-12">
                                <li>
                                    <a className="text-indigo-200 hover:text-indigo-100" href="#">
                                        <span className="sr-only">Facebook</span>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M22.258 1H2.242C1.556 1 1 1.556 1 2.242v20.016c0 .686.556 1.242 1.242 1.242h10.776v-8.713h-2.932V11.39h2.932V8.887c0-2.906 1.775-4.489 4.367-4.489 1.242 0 2.31.093 2.62.134v3.037l-1.797.001c-1.41 0-1.683.67-1.683 1.653v2.168h3.362l-.438 3.396h-2.924V23.5h5.733c.686 0 1.242-.556 1.242-1.242V2.242C23.5 1.556 22.944 1 22.258 1"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="text-indigo-200 hover:text-indigo-100" href="#">
                                        <span className="sr-only">GitHub</span>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="text-indigo-200 hover:text-indigo-100" href="#">
                                        <span className="sr-only">Twitter</span>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M7.548 22.501c9.056 0 14.01-7.503 14.01-14.01 0-.213 0-.425-.015-.636A10.02 10.02 0 0024 5.305a9.828 9.828 0 01-2.828.776 4.94 4.94 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.929 4.929 0 00-8.391 4.491A13.98 13.98 0 011.67 3.9a4.928 4.928 0 001.525 6.573A4.887 4.887 0 01.96 9.855v.063a4.926 4.926 0 003.95 4.827 4.917 4.917 0 01-2.223.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 20.289a13.941 13.941 0 007.548 2.209"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                            <h3 className="text-lg font-medium text-gray-900">Envoyez-nous un message</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <div className="flex justify-between">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom complet</label>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="name"
                                            {...register('nom')}
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email')}
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-900">Sujet</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="subject"
                                            {...register('sujet')}
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {errors.sujet && <p className="text-red-500 text-sm">{errors.sujet.message}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="flex justify-between">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                                        <span id="message-max" className="text-sm text-gray-500">Max. 500 caractères</span>
                                    </div>
                                    <div className="mt-1">
                                        <textarea id="message" {...register('message')} rows={4} className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black" aria-describedby="message-max" />
                                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:flex sm:justify-end">
                                    <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-orange-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                                        Envoyer
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
