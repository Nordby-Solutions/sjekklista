export default function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
        En prismodell som gir mening
      </h2>
      <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto">
        Sjekklista gir deg full kontroll på dokumentasjon, sparer deg for tid og
        reduserer risikoen for feil. Med en enkel prismodell og 3 måneder gratis
        prøveperiode, kan du komme i gang uten forpliktelser.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Baseline */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Start
          </h3>
          <p className="text-slate-600 mb-4">
            For enkeltpersoner og små oppdrag
          </p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>✅ 1–3 brukere</li>
            <li>✅ Opptil 1000 sjekklister/mnd</li>
            <li>✅ Rapportmaler og eksport</li>
          </ul>
          <p className="font-semibold text-slate-700">
            99 kr/mnd{" "}
            <span className="text-sm text-slate-500">(3 mnd gratis prøve)</span>
          </p>
        </div>

        {/* Team */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">Team</h3>
          <p className="text-slate-600 mb-4">For mellomstore firmaer</p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>👥 Opptil 20 brukere</li>
            <li>📋 Ubegrenset sjekklister</li>
            <li>🔐 Rollebasert tilgang</li>
            <li>📊 Avansert rapportering</li>
          </ul>
          <p className="font-semibold text-slate-700">499 kr/mnd</p>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Enterprise
          </h3>
          <p className="text-slate-600 mb-4">For store aktører med høye krav</p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>👥 Ubegrenset brukere</li>
            <li>🧩 API og integrasjoner</li>
            <li>📦 Tilpasset lagring og sikkerhet</li>
          </ul>
          <p className="font-semibold text-slate-700">Tilpasset pris</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          De fleste bedrifter sparer flere timer hver uke med Sjekklista. Mindre
          rot, bedre dokumentasjon og mer tid til det som faktisk betyr noe.
        </p>
      </div>
    </section>
  )
}
