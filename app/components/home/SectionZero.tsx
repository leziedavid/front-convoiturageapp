"use client";

import Image from 'next/image';
import { Search } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires

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
                            <div className="max-auto max-w-2xl">
                                <div className="sm:w-2/3">
                                    <div className="grid grid-cols-1 gap-1 divide-gray-300 bg-white shadow-3xl p-1 px-1 text-base rounded-2xl max-w-2xl lg:mx-auto my-4">
                                        <div className="py-2">
                                            <p className="text-gray-500 text-center flex justify-center">
                                                <Search className="h-5" /> Rechercher un trajet
                                            </p>
                                        </div>
                                        {inputFields.map((field, index) => (
                                            <div key={index}>
                                                <input
                                                    type={field.type}
                                                    className="block flex-1 border-none rounded-xl py-3 px-3 w-full hover:bg-gray-200 bg-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        ))}
                                        <div>
                                            <button
                                                className="p-2 text-white bg-[#f7872e] text-center h-full w-full py-3 rounded-b-xl flex justify-center items-center shadow-sm px-6 gap-2 text-base"
                                                type="button"
                                            >
                                                Rechercher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionZero;
