"use client";

import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import jwt from 'jsonwebtoken';
import { CircleHelp, LibraryBig, Menu, Route, Smartphone, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type NavigationItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

const navigation: NavigationItem[] = [
    { name: 'Trajets', href: '/trajets/details', icon: <Route className="text-white h-5" /> },
    { name: 'A propos de nous', href: '/abouts', icon: <LibraryBig className="text-white h-5" /> },
    { name: 'Contact', href: '/contact', icon: <Smartphone className="text-white h-5" /> },
    { name: 'FAQ', href: '/faq', icon: <CircleHelp className="text-white h-5" /> },
];

interface DecodedToken {
    exp: number;
}

const HeaderClient: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [href, setHref] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    const checkToken = useCallback(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            setIsAuthenticated(false);
            // router.push('/');
            return;
        }else{
            setIsAuthenticated(true);
        }

        // const decodedToken = jwt.decode(token) as DecodedToken | null;

        // if (!decodedToken) {
        //     setIsAuthenticated(false);
        //     router.push('/');
        //     return;
        // }

        // const currentTime = Math.floor(Date.now() / 1000);

        // if (decodedToken.exp < currentTime) {
        //     document.cookie = 'token=; Max-Age=0; path=/';
        //     setIsAuthenticated(false);
        //     toast.error('Votre session a expiré. Veuillez vous reconnecter.');
        //     setTimeout(() => {
        //         router.push('/');
        //     }, 3600);
        // } else {
        //     setIsAuthenticated(true);
        // }
        
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    useEffect(() => {
        const graphe = document.cookie.split('; ').find(row => row.startsWith('Graphe='))?.split('=')[1];
        if (graphe === '1') {
            setName('Mon compte');
            setHref('/compte');
        } else if (graphe === '2') {
            setName('Mon compte');
            setHref('/conducteur');
        } else if (graphe === '3') {
            setName('Dashboard');
            setHref('/admin/dashboard');
        } else {
            setName('Connexion');
            setHref('/login');
        }
    }, []);

    const handleSignOut = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        document.cookie = 'Graphe=; Max-Age=0; path=/';
        router.push('/');
    };

    return (
        <div className="bg-black sticky top-0 z-20 shadow-md shadow-black/35">
            <div className="mx-auto max-w-7xl">
                <div className="relative lg:w-full">
                    <div className="relative px-6 py-4 lg:pl-8 lg:pr-8">
                        <nav className="flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
                            <Link href="/" className="text-white text-xl">
                                <span className="text-4xl text-[#f7872e] font-bold">C</span>ovoit’<span className="text-4xl text-[#f7872e] font-bold">I</span>voire
                            </Link>

                            <button type="button" className="-m-2.5 rounded-md p-2.5 bg-[#f7872e] lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                                <Menu className="text-white" />
                            </button>

                            <div className="hidden lg:ml-12 lg:space-x-10 lg:flex">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className=" px-4 py-2 text-sm font-semibold leading-6 text-white flex justify-center items-center gap-x-2">
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {isAuthenticated ? (
                                <Popover className="hidden md:block">
                                    <PopoverButton className={` ${isAuthenticated ? ' bg-[#f7872e] rounded-2xl' : ''} px-4 py-2 text-sm/6 font-semibold text-white focus:outline-none`}>
                                        Mon compte
                                    </PopoverButton>

                                    <PopoverPanel transition anchor="bottom" className="divide-y z-50 divide-white/5 rounded-xl bg-black text-sm/6 transition duration-200 ease-in-out">
                                        <div className="p-3">
                                            <a className="block rounded-lg py-2 px-3 transition hover:bg-[#f7872e]" href={href + '/settings'}>
                                                <p className="font-semibold text-white">Gérer mon compte</p>
                                            </a>
                                        </div>

                                        <div className="p-3">
                                            <button onClick={handleSignOut} className="block rounded-lg py-2 px-3 transition hover:bg-[#f7872e]">
                                                <p className="font-semibold text-white">Déconnexion</p>
                                            </button>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            ) : (
                                <Link href="/login" className="text-white px-4 py-2 hidden md:flex text-sm justify-center items-center gap-x-2">
                                    <User className="text-white h-5" />
                                    Connexion
                                </Link>
                            )}
                        </nav>

                        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                            <DialogPanel className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                                <div className="flex flex-row-reverse items-center justify-between border-b-2 pb-4">
                                    <button type="button" className="-m-2.5 inline-flex items-center bg-gray-200 justify-center rounded-md p-2.5 text-black" onClick={() => setMobileMenuOpen(false)}>
                                        <X className="text-dark" />
                                    </button>
                                    <Link href="/" className="-m-1.5 p-1.5 text-3xl">
                                        <span className="text-4xl text-[#f7872e]">C</span>ovoit’<span className="text-4xl text-[#f7872e]">I</span>voire
                                    </Link>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="-mx-3 rounded-lg py-2 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-400/10 flex items-center gap-x-2">
                                            {item.icon}
                                            {item.name}
                                        </Link>
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
