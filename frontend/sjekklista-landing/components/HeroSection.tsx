"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="px-6 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Sjekklister og dokumentasjon — gjort enkelt
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Et raskt og pålitelig verktøy for prosjektledere, vektere og
          håndverkere. Lag sjekklister på sekunder. Full sporbarhet.
          Offline-støtte.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://app.sjekklista.no/signup"
            className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Kom i gang gratis
          </Link>
        </div>
      </div>
      <LottiePlayer lottiePath="/lottie/checklist.json" />
    </section>
  );
}
