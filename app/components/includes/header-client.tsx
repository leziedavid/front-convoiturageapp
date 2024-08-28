"use client";

import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { X, Menu, Route, LibraryBig, Smartphone, CircleHelp, User } from 'lucide-react'; // Importez les icônes nécessaires

// Définir le type pour les éléments de navigation
type NavigationItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

const navigation: NavigationItem[] = [
    { name: 'Trajets', href: '/trajets/details', icon: <Route className="text-white h-5"/> },
    { name: 'A propos de nous', href: '/abouts-us', icon: <LibraryBig className="text-white h-5"/> },
    { name: 'Contact', href: '/contact', icon: <Smartphone className="text-white h-5"/> },
    { name: 'FAQ', href: '/faq', icon: <CircleHelp className="text-white h-5"/> },
    { name: 'Mon compte', href: '#', icon: <User className="text-white h-5"/> },
];

const HeaderClient: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-black sticky top-0 z-20 shadow-md shadow-black/35">
            <div className="mx-auto max-w-7xl">
                <div className="relative lg:w-full">
                    <div className="relative px-6 py-4 lg:pl-8 lg:pr-8">
                        <nav className="flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
                            <a href="/" className="text-white text-xl">
                                <span className="text-4xl text-[#f7872e] font-bold">C</span>ovoit’<span className="text-4xl text-[#f7872e] font-bold">I</span>voire
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 bg-[#f7872e] lg:hidden"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu className="text-white"/>
                            </button>
                            <div className="hidden lg:ml-12 lg:space-x-14 lg:flex">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-sm font-semibold leading-6 text-white flex justify-center items-center gap-x-2"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </nav>
                        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                            <DialogPanel className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                                <div className="flex flex-row-reverse items-center justify-between border-b-2 pb-4">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center bg-gray-200 justify-center rounded-md p-2.5 text-black"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <X className="text-dark"/>
                                    </button>
                                    <a href="/" className="-m-1.5 p-1.5 text-3xl">
                                        <span className="text-4xl text-[#f7872e]">C</span>ovoit’<span className="text-4xl text-[#f7872e]">I</span>voire
                                    </a>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 rounded-lg py-2 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-400/10 flex items-center gap-x-2"
                                        >
                                            {item.icon}
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </DialogPanel>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderClient;
