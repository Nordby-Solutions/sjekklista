import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* HERO */}
        <header className="text-center mt-6">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Sjekklista — kontroll som faktisk blir gjort
            </h1>
          </div>

          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            Et enkelt, raskt og pålitelig verktøy for sjekklister og
            dokumentasjon. Perfekt for prosjektledere, vektere og håndverkere.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link to="/demo">
              <Button className="w-full sm:w-auto">🚀 Prøv gratis</Button>
            </Link>
            <Button variant="ghost" className="w-full sm:w-auto">
              <a href="mailto:sebastianbjornstad@hotmail.com?subject=Sjekklista">
                📩 Kontakt oss
              </a>
            </Button>
          </div>
        </header>

        {/* FEATURES */}
        <section id="features" className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span>Superenkelt</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lag sjekklister på sekunder. Intuitivt grensesnitt — ingen
                opplæring nødvendig.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <span>Dokumentert flyt</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Alle avkrysninger logges med tid og bruker. Enkel eksport av
                rapporter for revisjon eller internkontroll.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span>Alltid tilgjengelig</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                App følelse med offline-modus og raske arbeidsflyter for bruk på
                mobil og nettbrett.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* QUOTE / VISUAL BREAK */}
        <section className="mt-12 relative overflow-hidden rounded-2xl bg-slate-50 p-8">
          <div className="absolute -top-6 -left-6 text-7xl opacity-5 select-none">
            ✅
          </div>
          <div className="absolute -bottom-6 -right-6 text-7xl opacity-5 select-none">
            📋
          </div>

          <blockquote className="text-xl italic text-slate-700">
            &quot;Det som blir sjekket, blir gjort.&quot;
          </blockquote>
          <p className="mt-3 text-slate-600">
            Sjekklista gir deg ro i hverdagen. Mindre papir, mer kontroll.
          </p>
        </section>

        {/* PRICING / CTA */}
        <section id="pricing" className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="p-6 bg-white border rounded-2xl text-center shadow">
            <div className="text-2xl font-semibold">Gratis 🎉</div>
            <p className="mt-2 text-slate-600">
              Perfekt for små oppdrag og testing.
            </p>
            <div className="mt-6 text-3xl font-bold">0 kr</div>
            <div className="mt-6">
              <Link to="/demo">
                <Button className="w-full">Start gratis</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white border rounded-2xl text-center shadow">
            <div className="text-2xl font-semibold">Bedrift 💼</div>
            <p className="mt-2 text-slate-600">
              For team, revisjon og historikk.
            </p>
            <div className="mt-6 text-3xl font-bold">Fra 199 kr/mnd</div>
            <div className="mt-6">
              <Link to="/kontakt">
                <Button variant="outline" className="w-full">
                  Kontakt salg
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER INSIDE HOME */}
        <footer className="mt-12 text-center text-sm text-slate-600">
          <p>✨ Enkelt. Dokumentert. Tilgjengelig.</p>
        </footer>
      </div>
    </div>
  );
}
