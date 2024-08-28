"use client";

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import { Car, CarFront, Edit, EllipsisVertical,SaveAll, Trash, X } from 'lucide-react';
import { User, Vehicule } from '../interfaces/GlobalType';
import { DateHeur, DateTime, formatDateTime } from '../services/dateUtils';
import Preloader from './Preloader';
import AddVeicule from './Modal/AddVeicule';
import TrajetPreloader from './TrajetPreloader';


// Définir les props pour le composant
interface ListesVeiculesProps {
    dataveicules: Vehicule[];
    fetchUsers: () => Promise<void>;
    
}

const ListesVeicules: React.FC<ListesVeiculesProps> = ({ dataveicules,fetchUsers }) => {

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const [loading, setLoading] = useState(true);

    const openDrawer = (id:String) => {
        setShowDrawer(true);
    };
    const closeDrawer = () => {
        setShowDrawer(false);
    };


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);


    return (

        <div className="pt-3 p-4">
            <div className="flex justify-between">
                <h2 id="billing-history-heading" className="text-sm font-medium leading-6 text-gray-900">
                    Gestion des véhicules
                </h2>
                <div>
                    <button type="button" onClick={() => openDrawer("")} className="bg-white py-1 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        Nouveau
                    </button>
                </div>
            </div>

            {/* Form add and edit Car */}
            {showDrawer && (

                <div className="relative z-30" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
                    <AddVeicule fetchUsers={fetchUsers}  closeDrawer={closeDrawer}/>
                </div>
            )}

            {/* Vehicle List */}

                {loading ? (

                    <TrajetPreloader />
                    
                    ) : (

                    <div className="mt-6">
                        
                        {dataveicules && dataveicules.length > 0 ? (

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                
                                    {dataveicules.map((vehicule, index) => (

                                        <div key={vehicule.id} className="bg-white border bottom-2 rounded-md p-4 shadow-sm">

                                            <div className="flex justify-between">
                                                <div className="flex gap-3 items-center">
                                                    <Car name="Car" size={70} className="text-[#f7872e]" strokeWidth={1} />
                                                    <div>
                                                        <p className="text-black text-base">{vehicule.plaque}</p>
                                                        <h2 className="text-xs font-semibold leading-7 text-gray-900">Ajouter le  Ajouter le {DateTime(vehicule.date_creation)} {DateHeur(vehicule.date_creation)} </h2>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex">
                                                    <Menu as="div" className="relative inline-block text-left">

                                                        <div>
                                                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                <EllipsisVertical name="EllipsisVertical" size={30} strokeWidth={1} />
                                                            </Menu.Button>
                                                        </div>
                                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                            <div className="px-1 py-1">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${active ? 'bg-orange-500 text-white' : 'text-gray-900'}`}>
                                                                            <Edit name="Edit" className="mr-2 h-5 w-5 text-orange-400" aria-hidden="true" />
                                                                            Modifier
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${active ? 'bg-orange-500 text-white' : 'text-gray-900'}`}>
                                                                            <Trash name="Trash" className="mr-2 h-5 w-5 text-orange-400" aria-hidden="true" />
                                                                            Supprimer
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Menu>
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-3">

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Marque</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.marque}</h2>
                                                </div>

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Modèle</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.modele}</h2>
                                                </div>

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Année</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.annee}</h2>
                                                </div>

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Couleur</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.couleur}</h2>
                                                </div>

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Permis</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.permis}</h2>
                                                </div>

                                                <div>
                                                    <p className="mt-1 text-sm leading-6 text-gray-600">Carte grise</p>
                                                    <h2 className="text-base font-medium leading-7 text-gray-900">{vehicule.carte_grise}</h2>
                                                </div>

                                            </div>

                                        </div>

                                    ))}

                            </div>

                        ) : (

                            <div className="py-10">
                                <div className="flex justify-center items-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <CarFront name="CarFront" className="h-20 w-20 font-extralight text-[#f7872e]" />
                                        <div className="text-center text-lg font-bold">Aucun véhicule</div>
                                        <div className="text-center text-sm font-semibold"> Veuillez ajouter un véhicule </div>
                                        <button type="button" onClick={() => openDrawer("")} className="bg-white py-1 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" >
                                            Nouveau
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                )}

        </div>

    );

};

export default ListesVeicules;
