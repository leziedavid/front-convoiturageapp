"use client";

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { getUserInfo } from '@/app/services/Auth';
import { UserAuthDetail } from '@/app/interfaces/UserAuthDetail';

const UserProfil: React.FC = () => {

    const [data, setData] = useState<UserAuthDetail | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await getUserInfo();
                if (res.code === 200) {
                    setData(res.data)
                }
            } catch (err) {
                setError('Error fetching user info');
            }
        };

        fetchUsers();
    }, []);

    // Définir une image de remplacement si photo_url est undefined ou null
    const photoUrl = data?.photo_url ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

    return (

        <div className="flex items-center">

            <div className="relative">
                
            <Image className="inline-block h-20 w-20 border rounded-full" src={photoUrl} alt="Profile" width={80}height={80}layout="fixed" />

            <Check name="Check" className="w-4 h-4  absolute right-0 bottom-0 text-white bg-orange-600 rounded-full" />
            </div>

            <div className="ml-3">
                <p className="text-xl font-medium text-black group-hover:text-gray-900 flex">{data?.username}</p>
                <p className="text-sm font-medium text-black group-hover:text-gray-700">{data?.role}</p>
            </div>
        </div>

    );
};

export default UserProfil;
