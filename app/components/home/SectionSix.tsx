"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SectionSix: React.FC = () => {
    return (

    
        <section aria-labelledby="sale-heading" className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-black">
                <div className="mx-auto max-w-7xl">
                    <div className="relative pt-48 pb-16 sm:pb-24">
                        <div>
                            <h2
                                id="sale-heading"
                                className="text-white text-4xl font-bold tracking-tight"
                            >
                                <span className="text-6xl text-[#f7872e] font-bold">C</span>
                                ovoit’<span className="text-6xl text-[#f7872e] font-bold">I</span>
                                voire
                            </h2>
                            <div className="mt-6 text-base">
                                <Link href="/trajets/details" className="font-semibold text-white">
                                    Trouver un trajet
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                            <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                                <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src="/img/1024x1024.jpg"
                                            alt="Image 1"
                                            width={256}
                                            height={256}
                                            className="rounded-lg object-cover md:h-72 md:w-72"
                                        />
                                    </div>

                                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                                        <Image
                                            src="/img/home2.jpg"
                                            alt="Image 2"
                                            width={256}
                                            height={256}
                                            className="rounded-lg object-cover md:h-72 md:w-72"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src="/img/home2.jpg"
                                            alt="Image 3"
                                            width={256}
                                            height={256}
                                            className="rounded-lg object-cover md:h-72 md:w-72"
                                        />
                                    </div>

                                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                                        <Image
                                            src="/img/image copy 2.png"
                                            alt="Image 4"
                                            width={256}
                                            height={256}
                                            className="rounded-lg object-cover md:h-72 md:w-72"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default SectionSix;
