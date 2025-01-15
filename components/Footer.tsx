"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => (
    <div className="flex flex-col min-h-screen">
        {/* Footer */}
        <div className="w-full bg-muted py-8 lg:py-14 mt-auto">
            <div className="container mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-14  bg-muted rounded-md p-4 lg:p-14 gap-8">
                    
                    {/* Colonne de gauche avec le texte */}
                    <div className="flex flex-col gap-2 text-center lg:text-left">
                        <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold">
                            C'est plus simple dans les applications
                        </h3>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                            Covoit’Ivoire est une plateforme de mise en relation entre les conducteurs et les passagers. Trouver des trajets à proximité et gagnez du temps.
                            L'application mobile vous offre une expérience plus fluide et pratique pour la prise de commande.
                        </p>
                    </div>

                    {/* Colonne de droite avec les images des stores */}
                    <div className="mx-auto max-w-sm sm:max-w-2xl mt-10 grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
                        <div className="p-5 flex gap-3 justify-center sm:justify-start items-center focus:ring focus:ring-gray-500 hover:cursor-not-allowed relative rounded-lg bg-gray-300 shadow bg-gradient-to-r from-gray-200 to-blue-200">
                            <Image src="/app/logo-mac-os.png" className="h-16" alt="Logo Mac" width={64} height={64} />
                            <div className="text-lg">Bientôt disponible sur App Store</div>
                        </div>
                        <div className="p-5 flex gap-3 justify-center sm:justify-start items-center focus:ring focus:ring-gray-500 hover:cursor-not-allowed relative rounded-lg bg-gray-300 shadow bg-gradient-to-r from-cyan-200 to-blue-200">
                            <Image src="/app/logo-google-play-store.svg" className="h-16" alt="Logo Google Play" width={64} height={64} />
                            <div className="text-lg">Bientôt disponible sur Play Store</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);
