import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
  title: {
    default: "Sjekklista – Sjekklister og dokumentasjon gjort enkelt",
    template: "%s | Sjekklista",
  },
  description:
    "Et enkelt, raskt og pålitelig verktøy for sjekklister og dokumentasjon. Perfekt for prosjektledere, vektere og håndverkere.",
  openGraph: {
    title: "Sjekklista",
    description:
      "Lag sjekklister på sekunder. Intuitivt grensesnitt — ingen opplæring nødvendig.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="bg-yellow-50 border-b border-yellow-300 text-sm text-yellow-900 px-4 py-2 text-center">
          Dette produktet er under utvikling. For å melde interesse kan du ta
          kontakt{" "}
          <a
            href="mailto:sebastianbjornstad@hotmail.com?subject=Hei,%20Sjekklista!%20Jeg%20er%20interessert%20i%20å%20prøve%20Sjekklista&body=Hei,%0D%0A%0D%0AJeg%20fant%20nettopp%20ut%20om%20Sjekklista%20og%20er%20interessert."
            className="underline font-medium text-yellow-800 hover:text-yellow-600"
          >
            her
          </a>
          .
        </div>

        <TopNav />
        {children}

        {/* {process.env.NODE_ENV === "production" && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="92753677-5903-43ed-b05e-c06ae1a04b6e"
            strategy="lazyOnload"
          />
        )} */}
      </body>
    </html>
  );
}
