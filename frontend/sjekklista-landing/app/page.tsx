import Link from "next/link";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        <Feature
          title="Full sporbarhet"
          description="Alle avkrysninger logges med tid og bruker. Perfekt for revisjon og internkontroll."
        />
        <Feature
          title="Rapporter på sekunder"
          description="Eksporter sjekklister som PDF eller Excel. Del med kolleger eller kunder."
        />
        <Feature
          title="Offline-støtte"
          description="Fungerer uten nett og synkroniserer automatisk når du er online igjen."
        />
      </section>

      {/* Industry Fit Section */}
      <section className="px-6 py-32 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Laget for deg som jobber i felt
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Sjekklista er utviklet for deg som trenger dokumentasjon og kontroll
            — uten friksjon. Enten du leder prosjekter, utfører kontroller eller
            jobber med HMS.
          </p>
          <Link
            href="https://app.sjekklista.no/signup"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Opprett konto
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Klar for å komme i gang?
        </h2>
        <p className="text-slate-600 mb-6">
          Opprett din første sjekkliste på under ett minutt.
        </p>
        <Link
          href="https://app.sjekklista.no/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Start gratis nå
        </Link>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
