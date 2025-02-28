"use client";

import React from 'react';
import Image from 'next/image';
const SectionSix: React.FC = () => {
    return (

    
        <section aria-labelledby="sale-heading" className="overflow-hidden pt-32 sm:pt-14">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">

                    <h1 className="max-w-lg text-4xl font-bold tracking-tight text-[#045b27] sm:text-6xl whitespace-nowrap">
                        Bientôt chez Covoit’Ivoire
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Covoit’Ivoire est une plateforme de mise en relation entre les conducteurs et les passagers.
                        Trouver des trajets à proximité et gagnez du temps.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        L&apos;application mobile vous offre une expérience plus fluide et pratique pour la prise de commande.
                    </p>
                    <div className="mx-auto max-w-sm sm:max-w-2xl mt-10 grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
                        <div className="p-5 flex gap-3 justify-center sm:justify-start items-center focus:ring focus:ring-gray-500 hover:cursor-not-allowed relative rounded-lg bg-gray-300 shadow bg-gradient-to-r from-gray-200 to-blue-200">
                            <Image src="/app/logo-mac-os.png" className="h-16" alt="Logo Mac" width={64} height={64} />
                            <div className="text-lg">Biento disponible sur App Store</div>
                        </div>
                        <div className="p-5 flex gap-3 justify-center sm:justify-start items-center focus:ring focus:ring-gray-500 hover:cursor-not-allowed relative rounded-lg bg-gray-300 shadow bg-gradient-to-r from-cyan-200 to-blue-200">
                            <Image src="/app/logo-google-play-store.svg" className="h-16" alt="Logo Google Play" width={64} height={64} />
                            <div className="text-lg">Biento disponible sur Play Store</div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                    <svg viewBox="0 0 366 729" role="img" className="mx-auto w-[18.875rem] max-w-full drop-shadow-xl">
                        <defs>
                            <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                                <rect width="316" height="684" rx="36" />
                            </clipPath>
                        </defs>
                        <path fill="#4B5563" d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z" />
                        <path fill="#343E4E" d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z" />
                        <foreignObject width="316" height="684" transform="translate(24 24)" clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)">
                            {/* <Image src="/mobile-app-screenshot.png" alt="Screenshot de l'application mobile" width={316} height={684} /> */}
                            <Image src="/img/covoitLogo.png" alt="Screenshot de l'application mobile" width={316} height={684} />

                        </foreignObject>
                        
                    </svg>
                </div>
            </div>
        </section>

    );
};

export default SectionSix;
