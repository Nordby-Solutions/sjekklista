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
    // images: ["/og-image.png"],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@sjekklista",
  // },
};

// const orgJsonLd = {
//   "@context": "https://schema.org",
//   "@type": "Organization",
//   name: "Sjekklista",
//   url: "https://sjekklista.no",
//   logo: "https://sjekklista.no/og-image.png",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
