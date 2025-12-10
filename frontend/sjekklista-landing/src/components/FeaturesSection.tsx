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
          Skreddersy sjekklister og rapporter
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Sjekklista lar deg designe egne sjekklister med fleksible felt og
          maler. Generer rapporter med ett klikk, og del dem med kollegaer eller
          kunder. Perfekt for teamarbeid og intern dokumentasjon.
        </p>
        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
          <li>Lag og tilpass sjekklister etter behov</li>
          <li>Trekk ut rapporter med full oversikt</li>
          <li>Del med andre brukere og internt i firmaet</li>
        </ul>
      </div>

      {/* Lottie animation with reserved space */}
      <div className="mx-auto w-[192px] h-[192px] sm:w-[224px] sm:h-[224px] md:w-[300px] md:h-[300px] lg:w-[390px] lg:h-[390px]">
        <LottieWrapper path="/lottie/customization.json" />
      </div>
    </section>
  )
}
