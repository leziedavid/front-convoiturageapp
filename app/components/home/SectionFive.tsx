"use client"; // Directive pour indiquer que ce composant doit être rendu côté client

import React from 'react';
import { useRouter } from 'next/navigation';
import { Newspaper } from 'lucide-react';

interface SupportLink {
    name: string;
    href: string;
    description: string;
    icon: React.ReactNode; // Utilisez React.ReactNode pour les icônes
}

const supportLinks: SupportLink[] = [
    {
        name: 'Passager',
        href: '/passenger',
        description: 'Inscrivez-vous en tant que passager pour bénéficier de trajets partagés et économiques.',
        icon: <Newspaper />,
    },
    {
        name: 'Conducteur',
        href: '/driver',
        description: 'Devenez conducteur pour proposer vos trajets et gagner des revenus supplémentaires.',
        icon: <Newspaper />,
    },
];

const SectionFive: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    return (
        <div className="bg-white">
            <div className="relative mx-auto max-w-2xl py-10 px-6 lg:max-w-7xl lg:px-8">
                <div className="relative">
                    <h1 className="text-xl font-bold tracking-tight text-[#045b27] sm:text-5xl sm:leading-none lg:text-5xl">
                        Comment voulez-vous utiliser Covoit’Ivoire ?
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl text-gray-500">
                        Choisissez un profil pour commencer
                    </p>
                </div>
            </div>
            <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8" aria-labelledby="contact-heading">
                <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
                    {supportLinks.map((link) => (
                        <div key={link.name} className="flex flex-col rounded-2xl bg-white shadow-xl">
                            <div className="flex-1 px-6 pt-10 pb-8 md:px-8">
                                <div className="mb-4">
                                    {link.icon}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-900">{link.name}</h3>
                                <p className="mt-4 text-base text-gray-500">{link.description}</p>
                            </div>
                            <div
                                onClick={() => handleNavigation(link.href)}
                                className="rounded-bl-2xl rounded-br-2xl bg-[#f7872e] hover:bg-black cursor-pointer p-6 md:px-8"
                            >
                                <div className="text-base font-medium text-white">
                                    Ouvrir un compte
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SectionFive;
