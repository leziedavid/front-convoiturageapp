import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/includes/footer";
import HeaderClient from '../components/includes/header-client';
import "../globals.css";
import Header from "../components/includes/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Covoit’Ivoire",
  description: "Covoit’Ivoire app",
  // Vous pouvez ajouter un favicon ici également, mais ce sera fait au niveau du `<head>`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Lien vers le favicon */}
        <link rel="icon" href="/img/logoHome.png" />
        {/* Si vous avez un favicon dans un autre format, vous pouvez également ajouter d'autres formats */}
        <link rel="icon" type="image/png" href="/img/logoHome.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
