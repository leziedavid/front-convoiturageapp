"use client";


import React, { useState,useEffect } from 'react';

import Image from 'next/image';
import Preloader from './Preloader';
import TrajetPreloader from './TrajetPreloader';

// Définir l'interface pour les transactions
interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: string;
    paymentMethod: string;
    status: string;
}

// Fonction pour obtenir l'icône du moyen de rechargement
const getPaymentMethodIcon = (method: string) => {
    switch (method) {
        case 'Orange Money':
            return <Image src="/img/orange.png" alt="Orange Money" width={25} height={25} />;
        case 'Wave':
            return <Image src="/img/wave2.png" alt="Wave" width={25} height={25} />;
        case 'MTN':
            return <Image src="/img/mtn.jpeg" alt="MTN" width={25} height={25} />;
        case 'Moov Money':
            return <Image src="/img/moov.png" alt="Moov Money" width={25} height={25} />;
        case 'Carte Visa':
            return <Image src="/img/visa.png" alt="Carte Visa" width={25} height={25} />;
        default:
            return <span className="text-gray-500">N/A</span>;
    }
};

// Fonction pour obtenir la classe du statut
const getStatusClass = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-700 text-white';
        case 'Pending':
            return 'bg-yellow-600 text-white';
        case 'Failed':
            return 'bg-red-900 text-white';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Définir les props pour le composant
interface TransactionHistoryProps {
    transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
const [loading, setLoading] = useState(true);


useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 1000);

}, []);


    return (
            <>

                {
                    loading ? (

                        <TrajetPreloader />

                    ) : (
                        <div className="p-1 max-w-4xl mx-auto">
                            <h2 className="text-2sm font-semibold mb-4">Historique des Transactions</h2>
                            <div className="space-y-4">
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">

                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-700 font-semibold">{transaction.date}</span>
                                            <span className="text-orange-600 font-semibold">{transaction.amount} FCFA</span>
                                        </div>

                                        <div className="text-sm text-gray-600 mb-2">{transaction.description}</div>

                                        <div className="flex items-center space-x-2 mb-2 ">
                                            {getPaymentMethodIcon(transaction.paymentMethod)}
                                            <span className=" text-sm text-gray-800 font-medium">{transaction.paymentMethod}</span>
                                        </div>

                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(transaction.status)}`}>
                                            {transaction.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </>
    );
};

export default TransactionHistory;
