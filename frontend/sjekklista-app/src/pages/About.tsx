import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function About() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Om Sjekklista.no</h2>
        <p className="text-slate-600 mb-4">
          Sjekklista.no er et enkelt verktøy for alle som trenger struktur og
          dokumentasjon. Fra prosjektledere til vektere og håndverkere – med
          Sjekklista får du oversikt, trygghet og kontroll.
        </p>

        <ul className="space-y-2 text-left text-slate-700">
          <li>• Superenkelt grensesnitt — lag sjekklister på sekunder</li>
          <li>• Dokumentert flyt med tidsstempler og brukerhistorikk</li>
          <li>• PWA-støtte og offline-funksjon for mobil arbeidsflyt</li>
        </ul>

        <div className="mt-6">
          <Link to="/kontakt">
            <Button>Kontakt oss</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
