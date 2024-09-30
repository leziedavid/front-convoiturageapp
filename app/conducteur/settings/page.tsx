"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import DesktopNavBarDriver from '../../components/includes/Driver/DesktopNavBarDriver';
import MobileNavBarDriver from '../../components/includes/Driver/MobileNavBarDriver';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UserProfil from '../../components/includes/userProfil';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { getSettings } from '@/app/services/Auth';
import { User, Transaction } from '@/app/interfaces/GlobalType';
import TransactionHistory from '@/app/components/history/TransactionHistory';
import MonCompte from '@/app/components/tabs/MonCompte';
import ListesVeicules from '@/app/components/tabs/ListesVeicules';

const Alltransactions = [
    { id: '1', date: '2024-08-21', description: 'Recharge de portefeuille', amount: '10000', paymentMethod: 'Orange Money', status: 'Completed' },
    { id: '2', date: '2024-08-20', description: 'Recharge de portefeuille', amount: '5000', paymentMethod: 'MTN', status: 'Pending' },
    { id: '3', date: '2024-08-20', description: 'Recharge de portefeuille', amount: '20000', paymentMethod: 'Wave', status: 'Pending' },
    { id: '4', date: '2024-08-20', description: 'Recharge de portefeuille', amount: '30000', paymentMethod: 'Moov Money', status: 'Pending' },
    { id: '5', date: '2024-08-19', description: 'Recharge de portefeuille', amount: '80000', paymentMethod: 'Carte Visa', status: 'Failed' },
];

export default function Page() {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(false);

    const [data, setData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchUsers = useCallback(async () => {
        try {
            const res = await getSettings();
            if (res.code === 200) {
                setData(res.data);
                console.log(res.data?.rechargements);
            }
        } catch (err) {
            setError('Error fetching user info');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const vehicules = data?.vehicules || [];
    const recharge = data?.rechargements || [];

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="min-h-full">

                <div className="bg-[#f7872e] pb-32">
                    <header className="py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center">
                                Parametre de votre compte
                            </h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">

                        <div className="rounded-lg bg-white p-2 ">

                            <div className="rounded-lg p-2 pb-14 sm:pb-0">
                                <div className="py-2 md:py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-10 justify-between">
                                        <div className="hidden col-span-1 md:col-span-3 group md:block flex-shrink-0 ">
                                            {/* Replace with your actual component */}
                                            <UserProfil />

                                            <div className=" sm:flex flex-col gap-3 py-5 ">
                                                <div className="basis-1/5 h-lvh">
                                                    <DesktopNavBarDriver />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-span-1 sm:col-span-9 mt-6 sm:mt-0">
                                            <div className="mx-auto max-w-7xl">
                                                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-0">
                                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Parametre</h1>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Modifier votre profil, gerer mes vehicules
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="w-full px-2 py-4 sm:px-0">

                                                <Tab.Group>

                                                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-900/20 p-1">
                                                        
                                                        <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-[#f7872e] text-white' : 'bg-white'}`}>
                                                            Informations
                                                        </Tab>

                                                        <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-[#f7872e] text-white' : 'bg-white'}`}>
                                                            Vehicules
                                                        </Tab>

                                                        <Tab className={({ selected }) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-[#f7872e] text-white' : 'bg-white'}` }>
                                                            Transactions
                                                        </Tab>

                                                    </Tab.List>

                                                    <Tab.Panels className="mt-4">

                                                        <Tab.Panel className="rounded-xl bg-gray-100 p-3 ring-white/60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2">
                                                        {data && <MonCompte users={data} />} {/* Passez un utilisateur unique */}
                                                        </Tab.Panel>

                                                        <Tab.Panel className="rounded-xl bg-gray-100 p-3 ring-white/60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2">
                                                            
                                                            <ListesVeicules dataveicules={vehicules} fetchUsers={fetchUsers} />

                                                        </Tab.Panel>

                                                        <Tab.Panel className="rounded-xl bg-gray-100 p-3 ring-white/60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2">

                                                            <TransactionHistory transactions={recharge} />

                                                        </Tab.Panel>

                                                    </Tab.Panels>

                                                </Tab.Group>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Menu mobile */}
                        <MobileNavBarDriver />
                        {/* Menu mobile */}
                    </div>
                </main>
            </div>

        </>
    );
}
