import LottieWrapper from "./LottieWrapper";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="px-6 py-32 max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-16 items-center"
    >
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
      <div className="w-48 mx-auto md:w-full md:order-last">
        <LottieWrapper path="/lottie/customization.json" />
      </div>
    </section>
  );
}
