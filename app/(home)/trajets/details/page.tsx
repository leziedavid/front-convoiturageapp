/* eslint-disable @next/next/no-img-element */
// pages/trajet/details/[id].tsx
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { FC } from 'react';
import { CheckIcon, ChevronRight } from 'lucide-react';
import Icon from '@/app/components/Icon';

interface Feature {
    name: string;
    description: string;
    href: string;
    icon: IconName;
}

// Définir un type pour les icônes disponibles
type IconName = 'Inbox' | 'Users' | 'Trash';

const Detail: FC = () => {
    const router = useRouter();
    const navigateTo = (path: string) => {
        router.push(path);
    };

    const features: Feature[] = [
        {
            name: 'Unlimited inboxes',
            description: 'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
            href: '#',
            icon: 'Inbox',
        },
        {
            name: 'Manage team members',
            description: 'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
            href: '#',
            icon: 'Users',
        },
        {
            name: 'Spam report',
            description: 'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
            href: '#',
            icon: 'Trash',
        },
    ];

    return (
        <div>

            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image src="/img/image copy 2.png" alt="" layout="fill" objectFit="cover" className="absolute inset-0 -z-10 brightness-50"/>
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl pt-20 sm:pt-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">Trouver un trajet</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Allez où vous voulez avec Covoit’Ivoire<br />
                                Commandez une course, montez à bord et c&apos;est parti.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-5 gap-1 divide-gray-300 bg-white shadow-2xl p-1 px-1 mx-4 text-base rounded-2xl max-w-5xl lg:mx-auto my-4">
                    <input type="text" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" placeholder="Départ" />
                    <input type="text" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" placeholder="Arrivée" />
                    <input type="date" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" placeholder="Date" />
                    <input type="number" className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" placeholder="Nombre de places" />

                    <div>
                        <button className="p-2 text-white bg-[#f7872e] text-center h-full w-full py-3 rounded-b-xl md:rounded-bl-none md:rounded-r-xl flex justify-center items-center shadow-sm px-6 gap-2 text-base"
                            type="button">
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-4 lg:mx-auto max-w-5xl py-7">

                <div className="flex justify-center text-2xl md:text-3xl font-bold">
                    Trajet trouvé pour Abidjan à Agboville
                </div>

                <div className="grid grid-cols-1 space-y-8 mt-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} onClick={() => navigateTo('/trajets/details/12')} className="relative bg-white min-h-40 rounded-xl shadow-xl shadow-gray-200 border-none p-4 ring-offset-2 ring-2 ring-gray-300 hover:ring-[#f7872e] hover:shadow-none hover:cursor-pointer" >
                            
                            <div className="flex justify-between py-4">
                                <div className="w-full md:w-2/3">
                                    <div className="flex justify-between gap-2">
                                        <div>
                                            <div className="text-center md:text-left">
                                                <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                    08h00
                                                </span>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <span className="text-sm font-bold w-16">
                                                    Abidjan , Cote d’ivoire, Adjamé, 253 rue 263
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-auto flex justify-center items-center">
                                            <div className="border p-[1px] w-10 md:w-40 bg-black"></div>
                                            <ChevronRight className="w-4 font-bold text-xl" />
                                        </div>
                                        <div>
                                            <div className="text-center md:text-left">
                                                <span className="text-base text-white font-bold bg-stone-800 p-1 rounded-lg">
                                                    12h00
                                                </span>
                                            </div>
                                            <div className="text-center md:text-left">
                                                <span className="text-sm font-bold">
                                                    Agboville, Cote d’ivoire, Riviera, 276 post 365E FDTF
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block text-base md:text-xl font-semibold text-orange-500">
                                    3000 OXF
                                </div>

                            </div>

                            <div className="absolute -bottom-8 -right-8 p-2 ">
                                <img src="/img/im1.png" className="h-20 md:h-32" alt="" />
                            </div>

                            <div className="border-t-2 py-2 pt-4 flex space-x-10">
                                <a href="#" className="group block flex-shrink-0">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                                width={36}
                                                height={36}
                                                className="inline-block h-9 w-9 rounded-full"
                                            />
                                            <div className="w-4 h-4 absolute right-0 bottom-0 rounded-full bg-[#f7872e] border-2 border-white"></div>
                                        </div>
                                        <div className="ml-3 flex flex-col text-left">
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                                Jimmy Don
                                            </p>
                                            <p className="text-xs text-gray-600">Véhicule</p>
                                        </div>
                                    </div>
                                </a>
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
                                            <div className="w-4 h-4 absolute right-0 bottom-0 rounded-full bg-[#f7872e] border-2 border-white"></div>
                                        </div>
                                        <div className="ml-3 flex flex-col text-left">
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                                Jason Keven
                                            </p>
                                            <p className="text-xs text-gray-600">Passager</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="pt-14 flex justify-center">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            3
                        </a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                        </span>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            8
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            9
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            10
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </nav>
                </div>

            </div>

            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stay on top of customer support</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                                            <Icon name={feature.icon} className="text-white" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{feature.description}</p>
                                        <p className="mt-6">
                                            <a href={feature.href} className="text-base font-semibold leading-7 text-black">
                                                Learn more <span aria-hidden="true">→</span>
                                            </a>
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Detail;
