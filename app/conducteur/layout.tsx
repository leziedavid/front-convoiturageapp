import React from 'react';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../components/includes/Header';

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Covoit’Ivoire',
  description: 'Compte conducteur',
};

const ConducteurLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
    <body className= {`${inter.className} `}>
    <Header />
    <div className={`min-h-[calc(100vh_-_56px)] py-0 px-3 lg:px-0 mt-[4rem] md:mt-[4rem]`}>
        {children}
      </div>
    </body>
  </html>
  );
};

export default ConducteurLayout;
