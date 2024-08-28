"use client";

import { Cloud, Lock, Server } from 'lucide-react'; // Utilisez les noms d'icônes corrects
import Image from 'next/image';
import React from 'react';

const features = [
    {
        name: 'Push to deploy.',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: Cloud, // Assurez-vous que cette icône est correcte
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: Lock, // Assurez-vous que cette icône est correcte
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: Server, // Assurez-vous que cette icône est correcte
    },
];

const SectionTwo: React.FC = () => {
    return (
        <div className="overflow-hidden bg-white py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pl-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-3xl font-semibold leading-8 tracking-tight text-[#f7872e]">Covoit’Ivoire</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-5xl">
                                Embarquez pour des anecdotes passionnantes.
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute top-1 left-1 h-5 w-5 text-[#f7872e]" aria-hidden="true" />
                                            {feature.name}
                                        </dt>
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    <div className="flex items-start justify-end lg:order-first ">
                        
                        <div className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]">
                            <Image className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src="/img/2149104441.jpg" alt=""  width={2432} height={1442} />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;
