import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediSmart — L'intelligence artificielle au service de votre cabinet médical",
  description:
    "MediSmart simplifie la gestion du cabinet médical grâce à une plateforme moderne intégrant une intelligence artificielle clinique. Gestion des patients, ordonnances, rendez-vous, dossier médical et IA clinique.",
  keywords: [
    "logiciel médical",
    "cabinet médical",
    "intelligence artificielle médicale",
    "gestion patients",
    "ordonnances",
    "dossier médical",
    "IA clinique",
    "MediSmart",
  ],
  authors: [{ name: "MediSmart" }],
  openGraph: {
    title: "MediSmart — L'intelligence artificielle au service de votre cabinet médical",
    description:
      "Plateforme moderne de gestion de cabinet médical avec intelligence artificielle clinique intégrée.",
    url: "https://neao.online/medismart",
    siteName: "MediSmart",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediSmart — IA médicale pour votre cabinet",
    description:
      "Plateforme moderne de gestion de cabinet médical avec intelligence artificielle clinique intégrée.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://neao.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
