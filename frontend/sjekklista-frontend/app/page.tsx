export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          ✅ Sjekklista.no
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-8">
          Lag sjekklister som gir{" "}
          <span className="font-semibold">kontroll</span> ✨,{" "}
          <span className="font-semibold">dokumentasjon</span> 📜 og{" "}
          <span className="font-semibold">ro i hverdagen</span> 🧘.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/demo"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition w-full sm:w-auto"
          >
            🚀 Prøv gratis
          </a>
          <a
            href="/kontakt"
            className="bg-white/20 border border-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition w-full sm:w-auto"
          >
            📩 Kontakt oss
          </a>
        </div>
      </header>

      {/* Features Section */}
      <main className="flex-1 px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Hvorfor velge Sjekklista?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center bg-white rounded-2xl shadow p-8 hover:shadow-xl transition border-t-4 border-blue-400">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Superenkelt</h3>
            <p className="text-gray-700">
              Lag sjekklister på sekunder. Alle kan bruke det uten opplæring.
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl shadow p-8 hover:shadow-xl transition border-t-4 border-green-400">
            <div className="text-5xl mb-4">📜</div>
            <h3 className="text-lg font-semibold mb-2">Dokumentert flyt</h3>
            <p className="text-gray-700">
              Alt blir lagret og kan hentes fram – perfekt for revisjoner og
              internkontroll.
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl shadow p-8 hover:shadow-xl transition border-t-4 border-yellow-400">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Alltid tilgjengelig</h3>
            <p className="text-gray-700">
              Bruk den på mobil eller PC. Offline-støtte gjør deg fri fra nett.
            </p>
          </div>
        </div>
      </main>

      {/* Quote Section */}
      <section className="relative bg-gradient-to-r from-green-100 to-blue-100 py-16 text-center px-6 overflow-hidden">
        <div className="absolute text-7xl opacity-20 top-4 left-4">✅</div>
        <div className="absolute text-7xl opacity-20 bottom-4 right-6">📋</div>
        <blockquote className="text-2xl italic font-medium mb-6 relative">
          &quot;Det som blir sjekket, blir gjort.&quot;
        </blockquote>
        <p className="text-gray-700 max-w-xl mx-auto relative">
          Fra vektere til håndverkere – Sjekklista gir deg verktøyet du trenger
          for å holde oversikt og slippe papirarbeid.
        </p>
      </section>

      {/* Pricing / CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Kom i gang på minutter</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Gratis 🎉</h3>
            <p className="mb-4 text-gray-700">For små oppdrag eller testing.</p>
            <p className="text-3xl font-bold mb-6">0 kr</p>
            <a
              href="/demo"
              className="bg-blue-600 text-white w-full py-3 rounded-full font-semibold hover:bg-blue-500 transition"
            >
              Kom i gang
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Bedrift 💼</h3>
            <p className="mb-4 text-gray-700">
              For team og profesjonelle brukere.
            </p>
            <p className="text-3xl font-bold mb-6">Fra 199 kr/mnd</p>
            <a
              href="/kontakt"
              className="bg-green-600 text-white w-full py-3 rounded-full font-semibold hover:bg-green-500 transition"
            >
              Kontakt oss
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Sjekklista.no</span> ✨
        </p>
        <p className="mt-2">Enkelt. Dokumentert. Tilgjengelig.</p>
      </footer>
    </div>
  );
}
