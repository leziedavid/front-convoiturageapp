'use client';


import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X, Home, Car, Info, Phone } from "lucide-react"; // Importer les icônes de Lucide
import { useState } from "react";
import Link from "next/link";

const HeaderClient: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    const navigationItems = [
        {
            title: "Home",
            href: "/",
            icon: <Home className="w-5 h-5" />,
        },
        {
            title: "A propos de nous",
            href: "/abouts",
            icon: <Home className="w-5 h-5" />,
        },
        {
            title: "Trajets",
            href: "/details",
            icon: <Car className="w-5 h-5" />,
        },
        {
            title: "Faq",
            href: "/faq",
            icon: <Info className="w-5 h-5" />,
        },
        {
            title: "Contact",
            href: "/contact",
            icon: <Info className="w-5 h-5" />,
        },
        // {
        //     title: "Déplacez-vous avec nous",
        //     href: "/create-compte",
        //     icon: <Phone className="w-5 h-5" />,
        // },
        {
            title: "À propos",
            description: "Managing a small business today is already tough.",
            items: [
                {
                    title: "Nous contacter",
                    href: "/contact",
                    icon: <Phone className="w-4 h-4" />,
                },
                {
                    title: "Statistics",
                    href: "/statistics",
                },
                {
                    title: "Dashboards",
                    href: "/dashboards",
                },
                {
                    title: "Recordings",
                    href: "/recordings",
                },
            ],
        },
    ];

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-black dark:bg-black">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="flex justify-start items-center gap-4 lg:flex hidden">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/img/logoHome.png"
                            alt="Logo"
                            className="h-10"
                        />
                    </Link>
                </div>

                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start bg-black dark:bg-black text-white dark:text-white">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <Link key={item.title} href={item.href} passHref prefetch className="text-white dark:text-white flex items-center gap-2">

                                            {item.title}
                                            
                                            {/* <Button variant="ghost"
                                                className="font-bold text-white dark:text-white flex items-center gap-2">
                                                {item.icon}
                                                {item.title}
                                            </Button> */}
                                        </Link>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm text-black dark:text-white flex items-center gap-2">
                                                {item.icon}
                                                {item.title}
                                            </NavigationMenuTrigger>

                                            <NavigationMenuContent className="!w-[450px] p-4 bg-black dark:bg-black text-white dark:text-white">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10 text-white">
                                                            Book a call today
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <Link href={subItem.href} key={subItem.title} passHref prefetch className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded text-white dark:text-white" >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-white dark:text-white" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex justify-end w-full gap-4">
                    <div className="border-r hidden md:inline"></div>
                    <Link href="/login" passHref>
                        <Button className="text-white dark:text-white">Se connecter</Button>
                    </Link>
                </div>

                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5 text-white dark:text-white" /> : <Menu className="w-5 h-5 text-white dark:text-white" />}
                    </Button>
                    {isOpen && (
                        <>
                            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-30" onClick={() => setOpen(false)}></div>
                            <div className="absolute top-20 left-0 right-0 bg-black dark:bg-black shadow-lg py-4 px-6 container mx-auto z-40 max-w-[500px]">
                                <div className="flex justify-center mb-6">
                                    <Link href="/" className="flex items-center">
                                        <img
                                            src="/images/uber-dark.svg"
                                            alt="Logo"
                                            className="h-10"
                                        />
                                    </Link>
                                </div>

                                {navigationItems.map((item) => (
                                    <div key={item.title}>
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="flex justify-between items-center text-white dark:text-white"
                                                >
                                                    <span className="text-lg flex items-center gap-2">
                                                        {item.icon}
                                                        {item.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1 text-white dark:text-white" />
                                                </Link>
                                            ) : (
                                                <p className="text-lg text-white dark:text-white flex items-center gap-2">
                                                    {item.icon}
                                                    {item.title}
                                                </p>
                                            )}
                                            {item.items &&
                                                item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.title}
                                                        href={subItem.href}
                                                        className="flex justify-between items-center text-white dark:text-white"
                                                    >
                                                        <span>{subItem.title}</span>
                                                        <MoveRight className="w-4 h-4 stroke-1 text-white dark:text-white" />
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderClient;
