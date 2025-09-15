"use client";

import { useState } from "react";

export default function PricingSection() {
  const [checklists, setChecklists] = useState(500);

  const calculatePrice = (count: number) => {
    if (count <= 100) return "Gratis";
    if (count <= 1000) return "149 kr/mnd";
    if (count <= 10000) return "499 kr/mnd";
    return "Tilpasset pris";
  };

  return (
    <section id="pricing" className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
        Verdi du faktisk merker
      </h2>
      <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto">
        Sjekklista sparer deg for tid, frustrasjon og manglende dokumentasjon.
        Med automatiserte sjekklister og rapporter får du kontroll — og frigjør
        timer hver uke. Perfekt for både små og store bedrifter.
      </p>

      {/* Prismodell */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Gratis
          </h3>
          <p className="text-slate-600 mb-4">
            For enkeltpersoner og små oppdrag
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>✅ 1 bruker</li>
            <li>✅ Opptil 100 sjekklister/mnd</li>
            <li>✅ Begrenset rapportering</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">Pro</h3>
          <p className="text-slate-600 mb-4">For små bedrifter</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>👥 Opptil 5 brukere</li>
            <li>📋 Ubegrenset sjekklister</li>
            <li>📄 Rapportmaler og eksport</li>
          </ul>
          <p className="mt-4 font-semibold text-slate-700">149 kr/mnd</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">Team</h3>
          <p className="text-slate-600 mb-4">For mellomstore firmaer</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>👥 Opptil 20 brukere</li>
            <li>🔐 Rollebasert tilgang</li>
            <li>📊 Avansert rapportering</li>
          </ul>
          <p className="mt-4 font-semibold text-slate-700">499 kr/mnd</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Enterprise
          </h3>
          <p className="text-slate-600 mb-4">For store aktører</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>👥 Ubegrenset brukere</li>
            <li>🧩 API og integrasjoner</li>
            {/* <li>🛡️ Egen instans og GDPR-avtale</li> */}
          </ul>
          <p className="mt-4 font-semibold text-slate-700">Tilpasset pris</p>
        </div>
      </div>

      {/* Kalkulator */}
      <div className="bg-slate-100 p-6 rounded-xl text-center max-w-xl mx-auto">
        <h4 className="text-xl font-semibold text-slate-800 mb-4">
          📊 Estimer din pris
        </h4>
        <p className="text-slate-600 mb-6">
          Hvor mange sjekklister tror du at du trenger per måned?
        </p>
        <input
          type="range"
          min={0}
          max={20000}
          step={100}
          value={checklists}
          onChange={(e) => setChecklists(Number(e.target.value))}
          className="w-full mb-4"
        />
        <p className="text-lg text-slate-700 mb-2">
          Antall: <strong>{checklists}</strong>
        </p>
        <p className="text-xl font-bold text-brand-purple">
          Estimert pris: {calculatePrice(checklists)}
        </p>
      </div>
    </section>
  );
}
