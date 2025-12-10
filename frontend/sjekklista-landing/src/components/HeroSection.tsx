import LottieWrapper from './LottieWrapper'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="px-6 py-4 gap-1 md:py-32 max-w-6xl mx-auto grid md:grid-cols-2 md:gap-16 items-center"
    >
      {/* Lottie first on mobile */}
      <div className="order-1 md:order-none">
        <div className="w-56 h-56 mx-auto md:w-full md:h-[300px] max-w-[350px]">
          <LottieWrapper path="/lottie/checklist.json" />
        </div>
      </div>

      {/* Text second on mobile, first on desktop */}
      <div className="order-2 md:order-none">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Sjekklister og dokumentasjon — gjort enkelt
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Et raskt og pålitelig verktøy for prosjektledere, vektere og
          håndverkere. Lag sjekklister på sekunder. Full sporbarhet.
          Offline-støtte.
        </p>
        <div className="flex gap-4">
          <a
            href="https://app.sjekklista.no"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Kom i gang gratis
          </a>
        </div>
      </div>
    </section>
  )
}
