import { BaseResponse } from '@/app/interfaces/ApiResponse';
import { Vehicule } from '@/app/interfaces/Vehicule';
import { GetVehiculesByUserId } from '@/app/services/VehiculeServices';
import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface SelectVehicleProps {

    setVehicule: React.Dispatch<React.SetStateAction<string>>;
    vehicles: Vehicule[] | null;
}

const SelectVehicle: React.FC<SelectVehicleProps> = ({ setVehicule, vehicles }) => {

    const [selectedOption, setSelectedOption] = useState<Vehicule | null>(null);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [response, setResponse] = useState<BaseResponse<Vehicule[]> | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const apiResponse = await GetVehiculesByUserId();
                setResponse(apiResponse);

                if (apiResponse.data && apiResponse.data.length > 0 && apiResponse.data[0].id) {
                
                }else{
                    toast.error('Vous devez ajouter un véhicule avant de pouvoir ajouter un trajet.');
                }

            } catch (error) {
                console.error('Error fetching vehicles:', error);
                toast.error('Failed to fetch vehicles');
            }
        };

        fetchVehicles();
    }, []);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setVehicule(""); // Reset selected vehicle
        if (!isDropdownOpen && selectRef.current) {
            const input = selectRef.current.querySelector<HTMLInputElement>('input');
            if (input) {
                input.focus();
            }
        }
    };

    const changeVehicle = (value: Vehicule) => {
        setSelectedOption(value);
        setIsOptionSelected(true);
        setVehicule(value.id);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    // Filtered vehicles based on search term
    const filteredVehicles = response?.data?.filter(
        vehicle => vehicle.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (vehicles && vehicles.length > 0) {
            const firstVehicle = vehicles[0];
            if (typeof firstVehicle.marque === 'string') {
                setSelectedOption(firstVehicle);
                setVehicule(firstVehicle.id);
            }
        }
    }, [vehicles, setVehicule]);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div ref={selectRef} className="relative z-0 bg-white dark:bg-form-input">
                <div onClick={handleToggleDropdown} className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-orange-600 active:border-orange-600 dark:border-form-strokedark cursor-pointer">
                    <div className="relative">
                        <div className="flex items-center text-sm justify-between">
                            <span className={`truncate ${isOptionSelected ? 'text-black dark:text-white' : ''} flex gap-2`}>
                                <svg width="18" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"> </svg>
                                {selectedOption?.id ? selectedOption?.marque : 'Sélectionnez un véhicule'}
                            </span>
                            <svg className={`ml-2 h-4 w-4 transition transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDropdownOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'} />
                            </svg>
                        </div>
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="mt-1 absolute w-full bg-white dark:bg-form-input shadow-lg rounded border border-stroke">
                        <input type="text" placeholder="Rechercher un véhicule..." className="w-full rounded-t border-b border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-orange-600 active:border-orange-600 dark:border-form-strokedark dark:bg-form-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="max-h-60 overflow-y-auto">
                            {filteredVehicles?.length ? (
                                filteredVehicles.map((vehicle) => (
                                    <div key={vehicle.id} onClick={() => changeVehicle(vehicle)} className={`cursor-pointer py-2 px-5 text-sm hover:bg-gray-100 dark:hover:bg-form-input-dark flex items-center space-x-2 ${selectedOption && selectedOption.id === vehicle.id ? 'bg-gray-200 dark:bg-form-input-dark' : ''}`}>
                                        {vehicle.marque}
                                    </div>
                                ))
                            ) : (
                                <div className="py-2 px-5">Aucun véhicule trouvé</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectVehicle;
