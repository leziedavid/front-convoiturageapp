import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import HeaderClient from '../components/includes/header-client';
import Header from "../components/includes/header";

export const metadata: Metadata = {
  title: "Covoitivoire",
  description: "Covoitivoire est une plateforme digitale de personnalisation des produits mode, accessoires et déco, avec une touche africaine, pour les entreprises et les particuliers. Notre mission est de valoriser les savoir-faire et le patrimoine textile local. Bienvenue !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
}
