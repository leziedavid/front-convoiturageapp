"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react'; // Assurez-vous que cette icône est correcte
import { Newspaper } from 'lucide-react';

const SectionFour: React.FC = () => {
    return (
        <div className="bg-white mb-10">
            <section className="relative" aria-labelledby="pricing-heading">
                <div className="relative mx-auto max-w-2xl py-10 px-6 lg:max-w-7xl lg:px-12">
                    <div className="relative">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-5xl">
                        Comment voulez-vous utiliser Covoit’Ivoire ?
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl text-gray-500">  Choisissez un profil pour commencer </p>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl space-y-12 px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:space-y-0 lg:px-8">

                        <div className="relative flex flex-col rounded-2xl border shadow-md border-gray-200 bg-white p-8 ring-2 ring-gray-100 hover:ring-[#f7872e] hover:bg-[#f7882e5f]" >

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900"> Des trajets confortables et abordables </h3>

                                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-black py-1.5 px-4 text-sm font-semibold text-white  mb-4">Passager </p>
                                

                            <p className="mt-6 text-black flex items-center">
                                <Newspaper className="text-lg mt-0 mr-2" /> Économisez jusqu’à 30% sur vos 3 premières courses
                            </p>

                                <p className="mt-6 text-black">Inscrivez-vous en tant que passager pour bénéficier de trajets partagés et économiques.</p>
                            </div>

                            <a  href="/passenger" className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-[#f7872e] hover:bg-black cursor-pointer`}  >
                                Ouvrir un compte
                            </a>
                        </div>

                        <div className="relative flex flex-col rounded-2xl border shadow-md border-gray-200 bg-white p-8 ring-2 ring-gray-100 hover:ring-[#f7872e] hover:bg-[#f7882e5f]" >

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">Gagnez jusqu’à 520,000 FCFA par mois </h3>

                                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-black py-1.5 px-4 text-sm font-semibold text-white  mb-4">Conducteur pro </p>
                                

                            <p className="mt-6 text-black flex items-center">
                                <Newspaper className="text-lg mt-0 mr-2" /> Profitez au maximum de tous les avantages
                            </p>

                                <p className="mt-6 text-black">Devenez conducteur pour proposer vos trajets et gagner des revenus supplémentaires</p>
                            </div>

                            <a  href="/driver" className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-[#f7872e] hover:bg-black cursor-pointer`} >
                                Ouvrir un compte
                            </a>
                        </div>

                </div>
                
            </section>
        </div>
    );
};

export default SectionFour;
