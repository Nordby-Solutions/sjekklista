import LottieWrapper from './LottieWrapper'

export default function FinalCTASection() {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center rounded-xl">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Moderne løsninger for dine utfordringer
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Enten du trenger bedre HR-administrasjon, dokumentasjonssystem eller 
          andre bedriftsprosesser — Sjekklista har løsningen. Enkle, rimelige 
          og designet for å fungere slik du jobber.
        </p>
        <a
          href="https://app.sjekklista.no"
          className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition inline-block font-medium"
        >
          Kom i gang gratis
        </a>
      </div>
      <div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-[300px] md:h-[300px]">
        <LottieWrapper path="/lottie/headache.json" />
      </div>
    </section>
  )
}
