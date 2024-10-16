import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/includes/footer";
import Header from "../components/includes/header";
import HeaderClient from '../components/includes/header-client';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Covoit’Ivoire",
  description: "Covoit’Ivoire app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <main>
                <HeaderClient/>
                {children}
            </main>
            <Footer/>
        </body>
    </html>
  );
}
