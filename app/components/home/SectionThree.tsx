"use client";

import React from 'react';
import { Clock, HandCoins, MessagesSquare, Coins, Handshake, EarthLock } from 'lucide-react';

const advantages = [
    { icon: Clock, text: 'Gains de Temps et de Confort', desc: 'Voyagez plus rapidement et dans de meilleures conditions. Fini les longues attentes et les trajets inconfortables. Profitez d’un transport pratique et agréable.' },
    { icon: HandCoins, text: 'Trajets Moins Chers', desc: 'Réduisez vos frais de déplacement en partageant les coûts avec d\'autres passagers. Le covoiturage est une solution économique qui vous permet de faire des économies sur chaque trajet.' },
    { icon: MessagesSquare, text: 'Opportunité de Rencontres', desc: 'Rencontrez de nouvelles personnes et élargissez votre cercle social. Le covoiturage offre une opportunité unique de faire connaissance avec des voyageurs partageant les mêmes destinations.' },
];

const additionalAdvantages = [
    { icon: Coins, text: 'Réduction des Coûts de Transport', desc: 'Partagez les frais de carburant et de péage avec vos passagers, réduisant ainsi vos dépenses de transport. Chaque trajet devient plus économique et moins lourd pour votre budget.' },
    { icon: Handshake, text: 'Rencontres Enrichissantes', desc: 'Rencontrez de nouvelles personnes et élargissez votre cercle social. Le covoiturage offre une opportunité unique de faire connaissance avec des voyageurs partageant les mêmes destinations.' },
    { icon: EarthLock, text: 'Un Système Écologique', desc: 'Réduction de l\'empreinte carbone, diminution de la circulation et des embouteillages, optimisation des ressources.' },
];

const SectionThree: React.FC = () => {
    return (
        <div className="px-4 py-10 lg:py-8 space-y-10">
            <div>
                <h1 className="font-bold tracking-tight text-center text-black text-3xl lg:text-4xl">
                    Les avantages avec Covoit’Ivoire
                </h1>
            </div>
            <div className="mx-auto max-w-6xl space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center">
                    {advantages.map((item) => (
                        <div key={item.text} className="p-10 rounded-2xl bg-white shadow-md border-b-4 border-[#f7872e]">
                            <div className="flex justify-center mb-2">
                                <item.icon className="h-14 w-14" />
                            </div>
                            <div className="text-xl font-bold mb-2">
                                {item.text}
                            </div>
                            <p>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center">
                    {additionalAdvantages.map((item) => (
                        <div key={item.text} className="p-10 rounded-2xl bg-white shadow-md border-b-4 border-[#f7872e]">
                            <div className="flex justify-center mb-2">
                                <item.icon className="h-14 w-14" />
                            </div>
                            <div className="text-xl font-bold mb-2">
                                {item.text}
                            </div>
                            <p>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionThree;
