'use client'; // Marquer le fichier comme client-side (rendu côté client uniquement)

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Utiliser la locale française
import * as React from 'react';

interface CalendarDatePickerProps {
  className?: string;
  onDateChange: (formattedDate: string) => void;
}

export function CalendarDatePicker({
  className,
  onDateChange
}: CalendarDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>(format(new Date(), 'HH:mm')); // Valeur initiale de l'heure actuelle

  // Mettre à jour la date et l'heure chaque fois que la date ou l'heure change
  React.useEffect(() => {
    if (date) {
      const formattedDateTime = format(date, 'yyyy-MM-dd') + ' ' + time;
      onDateChange(formattedDateTime); // Retourner la date et l'heure formatées
    }
  }, [date, time, onDateChange]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    // Vérifier que l'heure est dans le bon format (HH:mm)
    if (/^([0-9]{2}):([0-9]{2})$/.test(newTime)) {
      setTime(newTime);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'py-2 px-4 rounded-md focus:ring-2 focus:ring-black focus:outline-none text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              // Afficher la date et l'heure sélectionnée
              format(date, 'dd-MM-yyyy') + ' ' + time
            ) : (
              <span>Sélectionner une date et une heure</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mt-2 rounded-lg shadow-lg bg-white">
          <Calendar
            initialFocus
            mode="single" // Sélectionner une seule date
            selected={date}
            onSelect={setDate} // Mettre à jour la date sélectionnée
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>

      {/* Permettre la modification de l'heure directement */}
      {date && (
        <div className="mt-2">
          <label htmlFor="time" className="block text-sm text-gray-700">Modifier l&apos;heure :</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full py-2 px-4 border border-muted-foreground rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
