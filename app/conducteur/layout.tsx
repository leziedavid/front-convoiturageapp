import React from 'react';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../components/includes/header';

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Compte utilisateur',
};

const ConducteurLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default ConducteurLayout;
