// app/components/includes/header.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { Route, LibraryBig, Smartphone, CircleHelp, LockKeyhole, Menu, X } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires

// Définir le type pour les éléments de navigation
type NavigationItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

const navigation: NavigationItem[] = [
    { name: 'Trajets', href: '/trajets/details', icon: <Route className="text-white h-5"/> },
    { name: 'A propos de nous', href: '/abouts', icon: <LibraryBig className="text-white h-5"/> },
    { name: 'Contact', href: '/contact', icon: <Smartphone className="text-white h-5"/> },
    { name: 'FAQ', href: '/faq', icon: <CircleHelp className="text-white h-5"/> },
    { name: 'Log in', href: '/login', icon: <LockKeyhole className="text-white h-5"/> },
];

// Définir le type du token décodé
interface DecodedToken {
    exp: number;
}

const Header: React.FC = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

   // Encapsuler la fonction checkToken dans useCallback pour éviter les problèmes de dépendance
    const checkToken = useCallback(() => {

        // console.log('Checking token...'); // Log lorsque la vérification commence

        const token = localStorage.getItem('token');
        // console.log('Token retrieved:', token); // Log du token récupéré

        if (!token) {
            // console.log('No token found. Redirecting to login.');
            router.push('/login');
            return;
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        // console.log('Decoded token:', decodedToken); // Log du token décodé

        if (!decodedToken) {
            // console.log('Token could not be decoded. Redirecting to login.');
            router.push('/login');
            return;
        }

        // Vérifier si le token est expiré
        const currentTime = Math.floor(Date.now() / 1000); // Temps en secondes
        // console.log(X'Current time:', currentTime); // Log du temps actuel
        // console.log('T oken expiration time:', decodedToken.exp); // Log de la date d'expiration du token

        if (decodedToken.exp < currentTime) {
            // console.log('Token expired. Removing token and redirecting.');
            localStorage.removeItem('token');
            toast.error('Votre session a expiré. Veuillez vous reconnecter.');
            setTimeout(() => {
                router.push('/login');
            }, 3600); // Rediriger après une heure

        } else {

            console.log('Token is still valid.');
        }

    }, [router]);

    useEffect(() => {
        checkToken(); // Vérifiez le token au chargement initial

        const intervalId = setInterval(() => {
            checkToken(); // Vérifiez le token toutes les minutes
        }, 60 * 1000); // 60 secondes

        return () => clearInterval(intervalId); // Nettoyez l'intervalle lors du démontage du composant

    }, [checkToken]);

    return (
        <div className="bg-black sticky top-0 z-20 shadow-md shadow-black/35">
            <div className="mx-auto max-w-7xl">
                <div className="relative lg:w-full">
                    <div className="relative px-6 py-4 lg:pl-8 lg:pr-8">
                        <nav className="flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
                            <a href="/" className="text-white text-xl">
                                <span className="text-4xl text-[#f7872e] font-bold">C</span>ovoit’<span className="text-4xl text-[#f7872e] font-bold">I</span>voire
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 bg-[#f7872e] lg:hidden" onClick={() => setMobileMenuOpen(true)} >
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
                            <Dialog.Panel className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 py-6 lg:hidden">
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
                            </Dialog.Panel>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
