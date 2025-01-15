'use client';

import { MoveRight, PhoneCall, MapPin, Navigation, MapPinHouse, ListOrdered, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDatePicker } from './DatePicker';
import React from 'react';
import { Input } from "@/components/ui/input";

export const Pub = () => {
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

    // Fonction qui sera appelée lorsqu&apos;une date est sélectionnée
    const handleDateChange = (formattedDate: string) => {
        setSelectedDate(formattedDate); // Mettre à jour l&apos;état avec la date sélectionnée
    };

    return (
        <div className="w-full flex-1 py-20 lg:py-40 px-4 sm:px-6 md:px-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">

                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl  md:text-3xl lg:text-6xl max-w-lg tracking-tighter text-left font-bold">
                                Conduisez quand vous voulez, générez des revenus sur mesure
                            </h1>
                            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                                Générez des revenus selon votre propre emploi du temps en effectuant des livraisons, des courses,
                                ou même les deux.
                            </p>
                            <p className='text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left'>
                                Consultez les trajets passés, les suggestions personnalisées, les ressources d&apos;aide et plus encore.
                            </p>
                        </div>

                    </div>

                    {/* Colonne image */}
                    <div className="bg-muted aspect-square w-full h-full">
                        <img src="/img/min.png" alt="Image description" className="object-cover w-full h-full" />
                    </div>

                </div>
            </div>
        </div>
    );
};
