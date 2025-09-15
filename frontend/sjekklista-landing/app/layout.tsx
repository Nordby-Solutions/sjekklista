import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Head from "next/head";

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
      <Head>
        <link
          rel="preload"
          href="/lottie/checklist.json"
          as="fetch"
          type="application/json"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/lottie/headache.json"
          as="fetch"
          type="application/json"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/lottie/customization.json"
          as="fetch"
          type="application/json"
          crossOrigin="anonymous"
        />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNav />
        {children}
      </body>
    </html>
  );
}
