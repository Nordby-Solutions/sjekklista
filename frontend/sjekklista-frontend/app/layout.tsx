import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sjekklista.no – Enklere sjekklister for bedrifter",
  description:
    "Sjekklista.no gjør det enkelt å lage og gjennomføre sjekklister. For vektere, håndverkere, oppdragstakere og alle som trenger dokumentert kontroll.",
  keywords: [
    "sjekkliste",
    "kontrolliste",
    "bedrift",
    "PWA",
    "dokumentasjon",
    "enkelt verktøy",
  ],
  openGraph: {
    title: "Sjekklista.no – Enklere sjekklister for bedrifter",
    description:
      "Fokuser på oppdraget, ikke på papirarbeidet. Sjekklista.no gir deg dokumentert kontroll – enkelt og mobilvennlig.",
    url: "https://sjekklista.no",
    siteName: "Sjekklista.no",
    images: [
      {
        url: "/og-image.png", // lag et kult bilde med logo + tagline
        width: 1200,
        height: 630,
        alt: "Sjekklista.no – Enklere sjekklister",
      },
    ],
    locale: "no_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
