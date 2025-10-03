import Link from "next/link";
import LottieWrapper from "./LottieWrapper";

export default function FinalCTASection() {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center bg-slate-50 rounded-xl">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ikke mer hodebry, Excel-sjekklister og rot
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Sjekklista er laget for deg som jobber i felt og trenger dokumentasjon
          og kontroll — uten friksjon. Enten du leder prosjekter, utfører
          kontroller eller jobber med HMS, gir Sjekklista deg verktøyene du
          trenger for å jobbe smart og effektivt.
        </p>
        <Link
          href="https://app.sjekklista.no"
          className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Prøv gratis nå
        </Link>
      </div>
      <LottieWrapper path="/lottie/headache.json" />
    </section>
  );
}
