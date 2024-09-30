"use client";

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X as XIcon, BarChart as BarChartIcon, Users as UsersIcon, MessageSquare as MessageSquareIcon, CreditCard as CreditCardIcon, Route as RouteIcon, Folder as FolderIcon, Cog as CogIcon } from 'lucide-react';
import Image from 'next/image';


const navigation = [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: BarChartIcon, current: true },
    { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: UsersIcon, current: false },
    { name: 'Trajets', href: '/admin/trajets', icon: RouteIcon, current: false },
    { name: 'Commande', href: '/admin/commande', icon: FolderIcon, current: false },
    { name: 'Transactions', href: '/admin/transactions', icon: CreditCardIcon, current: false },
    // { name: 'Messages', href: '/admin/messages', icon: MessageSquareIcon, current: false },
    // { name: 'Configuration', href: '/admin/configuration', icon: CogIcon, current: false },
];

const Sidebar: React.FC<{ sidebarOpen: boolean; setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ sidebarOpen, setSidebarOpen }) => {
    return (

        <>

            <Transition.Root show={sidebarOpen} as={Fragment}>

                <Dialog as="div" className="relative z-40 md:hidden" onClose={() => setSidebarOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <Image
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=500"
                                        alt="Your Company"
                                        width={32} // Largeur en pixels
                                        height={32} // Hauteur en pixels
                                    />
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-2 py-2 text-base font-medium rounded-md`}>
                                                <item.icon
                                                    className={`${item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'} mr-4 flex-shrink-0 h-6 w-6`}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>

            </Transition.Root>
            {/* Static sidebar for desktop */}

            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-gray-800 border-r border-gray-200">
                    <div className="flex h-16 flex-shrink-0 items-center border-b border-gray-600 px-4 text-white">
                        Back Office
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto">
                        <nav className="flex-1 space-y-1 px-2 py-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`${item.current ? 'bg-orange-400 text-white' : 'text-white hover:bg-gray-500 hover:text-white'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                >
                                    <item.icon
                                        className={`${item.current ? 'text-white' : 'text-white group-hover:text-white'} mr-3 flex-shrink-0 h-6 w-6`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        
        </>

    );
};

export default Sidebar;
