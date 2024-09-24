import { Search } from 'lucide-react'; // Assurez-vous d'importer les icônes nécessaires
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { z } from 'zod';
import { trajetSchema } from '@/app/schemas/trajectValidation';
import { convertToISODateTime } from '@/app/services/convertToISODateTime';
const PAGE_SIZE = 10;

const Tickets: React.FC = () => {

    const router = useRouter();

    return (
        <div className=""> </div>
    );
};

export default Tickets;
