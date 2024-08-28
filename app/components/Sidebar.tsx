// components/Sidebar.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';

const Sidebar = () => {
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const handleDropdownToggle = (menu: string) => {
        setSelectedMenu(prevMenu => (prevMenu === menu ? null : menu));
    };

    return (
        <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
            <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
                <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded object-cover"
                />
                <span className="text-lg font-bold text-white ml-3">Logo</span>
            </a>
            <ul className="mt-4">
                <li className="mb-1 group active">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
                        <i className="ri-home-2-line mr-3 text-lg"></i>
                        <span className="text-sm">Dashboard</span>
                    </a>
                </li>
                <li className="mb-1 group">
                    <a
                        href="#"
                        onClick={() => handleDropdownToggle('orders')}
                        className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                    >
                        <i className="ri-instance-line mr-3 text-lg"></i>
                        <span className="text-sm">Orders</span>
                        <i className={`ri-arrow-right-s-line ml-auto ${selectedMenu === 'orders' ? 'rotate-90' : ''}`}></i>
                    </a>
                    <ul className={`pl-7 mt-2 ${selectedMenu === 'orders' ? 'block' : 'hidden'}`}>
                        <li className="mb-4">
                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                Active order
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                Completed order
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                Canceled order
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="mb-1 group">
                    <a
                        href="#"
                        onClick={() => handleDropdownToggle('services')}
                        className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                    >
                        <i className="ri-flashlight-line mr-3 text-lg"></i>
                        <span className="text-sm">Services</span>
                        <i className={`ri-arrow-right-s-line ml-auto ${selectedMenu === 'services' ? 'rotate-90' : ''}`}></i>
                    </a>
                    <ul className={`pl-7 mt-2 ${selectedMenu === 'services' ? 'block' : 'hidden'}`}>
                        <li className="mb-4">
                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                Manage services
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="mb-1 group">
                    <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md">
                        <i className="ri-settings-2-line mr-3 text-lg"></i>
                        <span className="text-sm">Settings</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
