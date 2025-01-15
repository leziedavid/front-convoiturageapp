"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

export const Feature4 = () => (
  <div className="w-full py-10 lg:py-20">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div className="flex gap-4 flex-col flex-1">
          <div>
            <Badge>NOTRE APPLI</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-bold text-left">
                Bientôt chez Covoit&apos;Ivoire
            </h2>
            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
              Covoit&apos;Ivoire est une plateforme de mise en relation entre les conducteurs et les passagers. Trouver des trajets à proximité et gagnez du temps.
              L&apos;application mobile vous offre une expérience plus fluide et pratique pour la prise de commande.
            </p>

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

        {/* Contenu de l'image */}
        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1 overflow-hidden">
          <img
            src="/img/image copy 4.png"
            alt="Covoiturage en Côte d&apos;Ivoire"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  </div>
);
