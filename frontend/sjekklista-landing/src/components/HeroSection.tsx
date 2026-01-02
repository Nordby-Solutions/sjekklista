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
          Moderne verktøy for små og mellomstore bedrifter
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          En flotte av rimelige, kraftige og brukervennlige applikasjoner 
          designet spesielt for små og mellomstore bedrifter. Fra HR til 
          dokumentasjon — vi har løsninger som gjør ditt arbeid enklere og mer effektivt.
        </p>
        <div className="flex gap-4">
          <a
            href="mailto:post@norso.no?subject=Interesse%20i%20Sjekklista&body=Hei,%0D%0A%0D%0AJeg%20er%20interessert%20i%20Sjekklista%20og%20ønsker%20å%20melde%20interesse."
            className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Meld interesse
          </a>
        </div>
      </div>
    </section>
  )
}
