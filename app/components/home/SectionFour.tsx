"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react'; // Assurez-vous que cette icône est correcte

const pricing = {
    tiers: [
        {
            title: 'Conducteur',
            price: 0,
            frequency: '/month',
            description: "A plan that scales with your rapidly growing business.",
            features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics'],
            cta: 'Monthly billing',
            mostPopular: false,
        },
        {
            title: 'Conducteur',
            price: 32,
            frequency: '/month',
            description: 'A plan that scales with your rapidly growing business.',
            features: [
                '25 products',
                'Up to 10,000 subscribers',
                'Advanced analytics',
            ],
            cta: 'Monthly billing',
            mostPopular: false,
        },
        {
            title: 'Conducteur pro',
            price: 48,
            frequency: '/month',
            description: 'Dedicated support and infrastructure for your company.',
            features: [
                'Unlimited products',
                'Unlimited subscribers',
                'Advanced analytics',
            ],
            cta: 'Monthly billing',
            mostPopular: true,
        },
    ],
};

const SectionFour: React.FC = () => {
    return (
        <div className="bg-white mb-10">
            <section className="relative" aria-labelledby="pricing-heading">
                <div className="relative mx-auto max-w-2xl py-10 px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-5xl">
                            Plans tarifaires pour les conducteurs
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl text-gray-500">
                            Choisissez un forfait abordable doté des meilleures fonctionnalités
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl space-y-12 px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:space-y-0 lg:px-8">
                    {pricing.tiers.map((tier) => (
                        <div
                            key={tier.title}
                            className="relative flex flex-col rounded-2xl border shadow-md border-gray-200 bg-white p-8 ring-2 ring-gray-100 hover:ring-[#f7872e] hover:bg-[#f7882e5f]"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                                {tier.mostPopular && (
                                    <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-black py-1.5 px-4 text-sm font-semibold text-white">
                                        Most popular
                                    </p>
                                )}
                                <p className="mt-4 flex items-baseline text-gray-900">
                                    <span className="text-5xl font-bold tracking-tight">${tier.price}</span>
                                    <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
                                </p>
                                <p className="mt-6 text-black">{tier.description}</p>

                                <ul role="list" className="mt-6 space-y-6">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex">
                                            <CheckCircle className="h-6 w-6 flex-shrink-0 text-black" aria-hidden="true" />
                                            <span className="ml-3 text-black">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href="#"
                                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${tier.mostPopular ? 'bg-black text-white hover:bg-black' : 'bg-gray-50 text-black hover:bg-gray-100'
                                    }`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SectionFour;
