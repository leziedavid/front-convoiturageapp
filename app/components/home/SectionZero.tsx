"use client";

import Image from 'next/image';
import Search from '../seach/seach';

const SectionZero: React.FC = () => {

    const inputFields = [
        { type: 'text', placeholder: 'Départ' },
        { type: 'text', placeholder: 'Arrivée' },
        { type: 'text', placeholder: 'Date' },
        { type: 'number', placeholder: 'Nombre de places' },
    ];

    return (
        <div className="relative bg-black">
            <div className="relative">
                
                <div className="brightness-50 h-[40rem] w-full object-cover">
                    <Image src="/img/2149104441.jpg" alt="Background" layout="fill" objectFit="cover" priority />
                </div>

                <div className="absolute inset-0 z-10 lg:w-full lg:px-40">
                    <div className="relative px-6 lg:px-8 py-20 lg:pr-0">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-7xl">
                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                Bienvenue sur la plateforme <span className="text-[#f7872e]">n°1</span>
                            </h1>
                            <p className="mt-6 text-3xl md:text-5xl leading-8 text-white">
                                de <span className="text-[#f7872e]">covoiturage</span> en
                                <span className="text-[#f7872e]"> Côte d&apos;Ivoire</span>
                            </p>

                                <Search/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionZero;
