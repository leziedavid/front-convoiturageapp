// pages/a-propos.js
import React from 'react';
import Image from 'next/image';

export default async function page() {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true">
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width="200"
                            height="200"
                            x="50%"
                            y="-1"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth="0"
                        />
                    </svg>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth="0"
                        fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                    />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-3xl font-bold leading-7 text-[#ff904e]">
                                Notre Mission
                            </p>
                            <h1 className="mt-2 text-xl font-bold tracking-tight text-[#ff904e] sm:text-4xl">
                                Révolutionner le covoiturage en Côte d&apos;Ivoire
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                Chez Covoit’Ivoire, notre mission est de rendre le covoiturage en Côte d&apos;Ivoire simple, accessible et fiable. Nous nous engageons à offrir des solutions de transport partagées qui sont non seulement économiques mais aussi respectueuses de l&apos;environnement.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <Image
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src="/img/min.png"
                        alt="Illustration de covoiturage"
                        width={768}
                        height={432}
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                            <p>
                                Covoit’Ivoire a été fondé pour répondre à un besoin croissant de solutions de transport durables en Côte d&apos;Ivoire. Nous croyons en un avenir où les trajets sont partagés de manière fluide et sécurisée, réduisant ainsi les coûts de transport et l&apos;empreinte carbone.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                <li className="flex gap-x-3">
                                    <svg
                                        className="mt-1 h-5 w-5 flex-none text-[#ff904e]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-gray-900">Simplicité d&apos;utilisation.</strong> Notre plateforme est conçue pour être intuitive et facile à utiliser pour tous les utilisateurs.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <svg
                                        className="mt-1 h-5 w-5 flex-none text-[#ff904e]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-gray-900">Sécurité avant tout.</strong> Nous mettons en place des mesures strictes pour garantir la sécurité et le confort de nos utilisateurs.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <svg
                                        className="mt-1 h-5 w-5 flex-none text-[#ff904e]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        <strong className="font-semibold text-gray-900">Flexibilité.</strong> Choisissez le trajet qui vous convient parmi une variété d&apos;options adaptées à vos besoins.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8">
                                Nous sommes passionnés par l&apos;amélioration des solutions de mobilité en Côte d&apos;Ivoire et nous nous engageons à créer une expérience de covoiturage qui allie innovation, accessibilité et responsabilité.
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-[#ff904e]">
                                Rejoignez-nous dans cette aventure !
                            </h2>
                            <p className="mt-6">
                                Que vous soyez un conducteur ou un passager, nous vous invitons à faire partie de notre communauté. Ensemble, faisons de chaque trajet un moment de partage et de convivialité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
