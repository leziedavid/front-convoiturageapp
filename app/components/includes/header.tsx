"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Import de Image de Next.js
import { LucideBell, LucideLoader, LucideMail, LucideUser2, LucideLogIn, LucideMenu, LucideTrash2, LucideHome, LucidePackage, LucideImage, LucideInfo, User, UserCog, LogOut, KeyRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useRouter } from 'next/navigation';


interface DecodedToken {
    exp: number;
}
// Composant Header principal
const Header: React.FC = ({ }) => {


        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
        const [name, setName] = useState<string>('');
        const [href, setHref] = useState<string>('');
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
        const router = useRouter();
    
        const navigateTo = () => {
            router.push('/');
        };
    
        const checkToken = useCallback(() => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
            if (!token) {
                setIsAuthenticated(false);
                // router.push('/');
                localStorage.removeItem('token');
                localStorage.removeItem('Graphe');
                return;
            }else{
                setIsAuthenticated(true);
            }
    
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
            localStorage.removeItem('token');
            localStorage.removeItem('Graphe');
            document.cookie = 'token=; Max-Age=0; path=/';
            document.cookie = 'Graphe=; Max-Age=0; path=/';
            router.push('/');
        };
    

    const navigationItems = [
        {
            title: "ACCUEIL",
            href: "/",
            description: "",
            icon: <LucideHome className="w-4 h-4 mr-2" /> // Icône pour ACCUEIL
        },
        {
            title: "TRAJETS",
            href: "/details",
            description: "",
            icon: <LucidePackage className="w-4 h-4 mr-2" /> // Icône pour PRODUITS
        },
        {
            title: "FAQ",
            href: "/faq",
            description: "",
            icon: <LucideImage className="w-4 h-4 mr-2" /> // Icône pour REALISATIONS
        },
        {
            title: "A PROPOS",
            href: "/abouts",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2" /> // Icône pour A PROPOS
        },
        {
            title: "CONTACT",
            href: "/contact",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2" /> // Icône pour A PROPOS
        },
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <header className="flex flex-col items-center fixed top-0 z-50 w-full shadow-sm">

            <div className="py-4 md:py-3 items-center w-full bg-black dark:bg-black">

                <div className="max-w-7xl mx-4 px-4 lg:mx-auto flex justify-between items-center gap-x-10">

                    <Link href="/">
                        <img src="/img/logoHome.png" alt="Logo" className="h-10"/>
                    </Link>

                    {/* Navigation pour les écrans plus grands */}
                    <nav className="hidden md:flex gap-3">
                        <NavigationMenu className="flex justify-start items-start">
                            <NavigationMenuList className="flex justify-start gap-4 flex-row">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.href ? (
                                            <>
                                                <NavigationMenuLink href={item.href}>
                                                    <Button variant="ghost" className="text-white font-bold tracking-tight text-sm flex items-center hover:bg-[#ffb44b]">
                                                        {item.title}
                                                    </Button>
                                                </NavigationMenuLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger className="font-medium text-white text-sm font-bold tracking-tight text-lg">
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    <div className="flex text-white items-center gap-x-2">
                        <div className="text-white flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    {/* Gérer mon compte */}
                                    <Link
                                        href={href + '/settings'}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="rounded-lg py-0 px-3 text-white text-base font-bold leading-7 text-black hover:bg-gray-400/10 flex items-center gap-x-2"
                                    >
                                        {/* Icône visible sur les petits écrans */}
                                        <UserCog className="block sm:hidden " />
                                        {/* Texte visible sur les grands écrans */}
                                        <span className="hidden sm:block">Gérer mon compte</span>
                                    </Link>

                                    {/* Déconnexion */}
                                    <Button variant="ghost"
                                        onClick={handleSignOut}
                                        className="rounded-lg py-0 px-3 text-white bg-white ont-bold leading-7 flex items-center gap-x-2">
                                        {/* Icône visible sur les petits écrans */}
                                        <LogOut className="block sm:hidden. text-black h-5"  />
                                        {/* Texte visible sur les grands écrans */}
                                        <span className="hidden sm:block font-bold text-black">Déconnexion</span>
                                    </Button>
                                </>
                            ) : (
                                <Link  href="/login" className="rounded-lg py-2 px-3 font-bold leading-7 text-white  hover:bg-gray-400/10 flex items-center gap-x-2">
                                    {/* Icône visible sur les petits écrans */}
                                    <KeyRound className="block sm:hidden text-black h-5" />
                                    {/* Texte visible sur les grands écrans */}
                                    <span className="hidden sm:block">Connexion</span>
                                </Link>
                            )}
                        </div>
                    </div>


                    {/* Icône du menu mobile */}
                    <div className="flex w-12 shrink lg:hidden items-end justify-end">
                        <Button className="bg-white" variant="ghost" onClick={() => setOpen(!isOpen)}>
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>

                        {isOpen && (
                            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 gap-8 px-4">
                                {navigationItems.map((item) => (
                                    <div key={item.title}>
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link href={item.href} className="flex justify-between items-center">
                                                    <span onClick={() => setOpen(!isOpen)} className="text-sm font-bold tracking-tighter flex items-center">
                                                        {item.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                                </Link>
                                            ) : (
                                                <p onClick={() => setOpen(!isOpen)} className="text-sm font-bold tracking-tighter flex items-center">
                                                    {item.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
