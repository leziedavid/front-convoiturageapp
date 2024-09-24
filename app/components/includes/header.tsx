"use client";

import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { Route, LibraryBig, Smartphone, CircleHelp, LockKeyhole, Menu, X, User } from 'lucide-react';
import Link from 'next/link';


// Définir le type du token décodé
interface DecodedToken {
    exp: number;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const Header: React.FC = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null); // État pour stocker le token
    const router = useRouter();
    const [name, setName] = useState<string>(''); // État pour le nom
    const [href, setHref] = useState<string>(''); // État pour le href

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     setToken(storedToken);
    // }, []);

    // const checkToken = useCallback(() => {

    //     if (!token) {
    //         router.push('/');
    //         return;
    //     }

    //     // Décoder le token
    //     const decodedToken = jwt.decode(token) as DecodedToken | null;
    //     if (!decodedToken) {
    //         router.push('/');
    //         return;
    //     }

    //     // Vérifier si le token est expiré
    //     const currentTime = Math.floor(Date.now() / 1000); // Temps en secondes

    //     if (decodedToken.exp < currentTime) {
    //         localStorage.removeItem('token');
    //         toast.error('Votre session a expiré. Veuillez vous reconnecter.');
    //         setTimeout(() => {
    //             router.push('/');
    //         }, 3600);
    //     } else {
    //         // console.log('Token is still valid.');
    //     }

    // }, [router, token]);

    

    // useEffect(() => {
    //     if (token) {
    //         checkToken();
    //     }
    // }, [token, checkToken]);

    useEffect(() => {
        const checkCondition = () => {
            // const graphe = '1';
            const graphe = localStorage.getItem('Graphe');
            if (graphe === '1') {
                setName('Mon compte');
                setHref('/compte');

            } else if(graphe === '2') {
                setName('Mon compte');
                setHref('/conducteur');
                
            }else if(graphe === '3'){
                setName('Dashboard');
                setHref('/admin/dashboard');
            }else{
                setName('Connexion');
                setHref('/login');
            }
        };
        checkCondition();
    }, []);


    const navigation: NavigationItem[] = [
        { name: 'Trajets', href: '/trajets/details', icon: <Route className="text-white h-5" /> },
        { name: 'A propos de nous', href: '/abouts', icon: <LibraryBig className="text-white h-5" /> },
        { name: 'Contact', href: '/contact', icon: <Smartphone className="text-white h-5" /> },
        { name: 'FAQ', href: '/faq', icon: <CircleHelp className="text-white h-5" /> },
        { name: name, href: href, icon: <User className="text-white h-5" /> }, // Utilisation des états dynamiques
    ];

    return (
        <div className="bg-black sticky top-0 z-20 shadow-md shadow-black/35">
            <div className="mx-auto max-w-7xl">
                <div className="relative lg:w-full">
                    <div className="relative px-6 py-4 lg:pl-8 lg:pr-8">
                        <nav className="flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
                            <Link href="/" className="text-white text-xl">
                                <span className="text-4xl text-[#f7872e] font-bold">C</span>ovoit’<span className="text-4xl text-[#f7872e] font-bold">I</span>voire
                            </Link>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 bg-[#f7872e] lg:hidden" onClick={() => setMobileMenuOpen(true)} >
                                <Menu className="text-white"/>
                            </button>
                            <div className="hidden lg:ml-12 lg:space-x-14 lg:flex">
                                {navigation.map((item) => (
                                    <Link key={item.name}
                                        href={item.href} className="text-sm font-semibold leading-6 text-white flex justify-center items-center gap-x-2">
                                        {item.icon}
                                        {item.name}
                                    </Link>
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
                                    <Link href="/" className="-m-1.5 p-1.5 text-3xl">
                                        <span className="text-4xl text-[#f7872e]">C</span>ovoit’<span className="text-4xl text-[#f7872e]">I</span>voire
                                    </Link>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href}  onClick={() => setMobileMenuOpen(false)} className="-mx-3 rounded-lg py-2 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-400/10 flex items-center gap-x-2">
                                            {item.icon}
                                            {item.name}
                                        </Link>
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
