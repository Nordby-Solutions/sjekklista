import LottieWrapper from './LottieWrapper'

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="px-6 py-24 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
    >
      {/* Text first on all viewports */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Kraftig. Rimelig. Brukervennlig.
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Vi bygger moderne løsninger som gjør det enklere å administrere dine 
          daglige operasjoner. Fra HR-prosesser til dokumentasjon og kontroll — 
          hver applikasjon er designet med fokus på brukbarhet og effektivitet.
        </p>
        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
          <li>Intuitive brukergrensesnitt som krever minimal opplæring</li>
          <li>Skalbar fra små lag til større organisasjoner</li>
          <li>Integrert med verktøyene du allerede bruker</li>
          <li>Robust sikkerhet og dataoverholdelse inkludert</li>
        </ul>
      </div>

      {/* Lottie animation with reserved space */}
      <div className="mx-auto w-[192px] h-[192px] sm:w-[224px] sm:h-[224px] md:w-[300px] md:h-[300px] lg:w-[390px] lg:h-[390px]">
        <LottieWrapper path="/lottie/customization.json" />
      </div>
    </section>
  )
}
