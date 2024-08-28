// pages/trajet/details/[id].tsx
"use client";

import React from 'react';
import { useRouter,useParams } from 'next/navigation';
import Image from 'next/image';
import { CheckIcon } from 'lucide-react';

const Detail: React.FC = () => {

    const { id } = useParams(); // Récupérer l'id depuis les paramètres de la route
    const router = useRouter();

    return (
        <div>
            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image
                    src="/img/istockphoto-1321876617-1024x1024.jpg"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 -z-10 brightness-50"
                />
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-14 sm:py-14">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Détail du trajet</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Plus de détails
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 md:mx-auto max-w-7xl py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="bg-white min-h-40 rounded-xl shadow-md shadow-gray-200 border-none p-4 ring-offset-2 ring-2 ring-gray-300">
                            <div className="grid grid-cols-1 justify-between py-4">
                                <div className="flex justify-between gap-2 mb-5">
                                    <div>
                                        <div className="text-center md:text-left">
                                            <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                08h00
                                            </span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-sm font-bold w-16">
                                                Abidjan, Cote d’ivoire, Adjamé, 253 rue 263
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-auto flex justify-center items-center">
                                        <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                    </div>
                                    <div>
                                        <div className="text-center md:text-left">
                                            <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                12h00
                                            </span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-sm font-bold">
                                                Abidjan, Cote d’ivoire, Riviera, 276 post 365E FDTF
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-4 py-2 pt-4 flex justify-center">
                                    <div className="text-base md:text-xl font-semibold text-orange-500">
                                        3000 OXF
                                    </div>
                                </div>
                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <a href="#" className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                        width={36}
                                                        height={36}
                                                        className="inline-block h-9 w-9 rounded-full"
                                                    />
                                                    <CheckIcon className="w-4 h-4 absolute right-0 bottom-0 text-white bg-orange-600 rounded-full"
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex">Quentin</p>
                                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Conducteur</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Matricule</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">XXXXXXXX</dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Modèle voiture</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Appréciation</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Meilleur conducteur</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent outline-none bg-[#f7872e] px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                                    Commander
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image
                            src="/img/map-detail.png"
                            alt=""
                            width={1000}
                            height={1000}
                            className="rounded-3xl h-96 w-full object-cover shadow-md shadow-gray-200"
                        />
                        <div className="flex justify-center">
                            <div className="h-96 w-full">
                                <Image
                                    src="/img/image copy 3.png"
                                    alt=""
                                    layout="responsive"
                                    width={1200}
                                    height={800}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
