export default function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
        Priser som passer din bedrift
      </h2>
      <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto">
        Vi tilbyr fleksible prismodeller for alle våre løsninger. Kom i gang 
        gratis, og oppgrader når du er klar. Ingen bindingstid, ingen skjulte gebyrer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Startup */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-brand-purple hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Startup
          </h3>
          <p className="text-slate-600 mb-4">
            For påbegynnelse
          </p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>✅ 1–3 brukere</li>
            <li>✅ 1 applikasjon</li>
            <li>✅ Grunnleggende funksjoner</li>
            <li>✅ Email-support</li>
          </ul>
          <p className="font-semibold text-slate-700">
            Gratis{" "}
            <span className="text-sm text-slate-500">alltid</span>
          </p>
        </div>

        {/* Professional */}
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-brand-purple md:scale-105">
          <div className="mb-4">
            <span className="inline-block bg-brand-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
              POPULÆR
            </span>
          </div>
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Professional
          </h3>
          <p className="text-slate-600 mb-4">For små til mellomstore bedrifter</p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>👥 Opptil 10 brukere</li>
            <li>📦 Alle applikasjoner</li>
            <li>🔧 Avanserte funksjoner</li>
            <li>⚡ Prioritert support</li>
            <li>📊 Analyser og rapporter</li>
          </ul>
          <p className="font-semibold text-slate-700">199 kr/mnd per bruker</p>
          <p className="text-xs text-slate-500 mt-2">Eller fra 1 990 kr/mnd for hele teamet</p>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-brand-purple hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-brand-purple mb-2">
            Enterprise
          </h3>
          <p className="text-slate-600 mb-4">For større organisasjoner</p>
          <ul className="text-sm text-slate-500 space-y-2 mb-4">
            <li>👥 Ubegrenset brukere</li>
            <li>🧩 Integrasjoner og API</li>
            <li>🔐 Tilpasset sikkerhet</li>
            <li>🎯 Dedikert Account Manager</li>
            <li>⚙️ Custom workflows</li>
          </ul>
          <p className="font-semibold text-slate-700">Tilpasset pris</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Alle planer inkluderer 30 dager gratis prøveperiode. 
          Ingen kredittkort påkrevd. Avbryt når som helst.
        </p>
      </div>
    </section>
  )
}
