// pages/login/layout.tsx

import React from 'react';
import { ReactNode } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from '../components/includes/header';
import HeaderClient from '../components/includes/header-client';

interface LayoutProps {
  children: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Covoit’Ivoire",
  description: "Compte utilisateur",
};

const CompteLayout: React.FC<LayoutProps> = ({ children }) => {


  return (
    <html lang="en">
      <body className={inter.className}>
            <main>
                <HeaderClient/>
                {children}
            </main>
        </body>
    </html>
  );
};

export default CompteLayout;
