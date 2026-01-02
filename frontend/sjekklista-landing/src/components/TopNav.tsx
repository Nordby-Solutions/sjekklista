import { useState } from 'react'

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <a
            href="/"
            className="font-semibold tracking-tight text-brand-purple text-lg"
          >
            Sjekklista
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">
              Funksjoner
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition">
              Priser
            </a>
            <a
              href="mailto:post@norso.no?subject=Interesse%20i%20Sjekklista&body=Hei,%0D%0A%0D%0AJeg%20er%20interessert%20i%20Sjekklista%20og%20ønsker%20å%20melde%20interesse."
              className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Meld interesse
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-4 text-slate-600 pb-4">
            <a href="#features" className="hover:text-slate-900 transition">
              Funksjoner
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition">
              Priser
            </a>
            <a
              href="mailto:post@norso.no?subject=Interesse%20i%20Sjekklista&body=Hei,%0D%0A%0D%0AJeg%20er%20interessert%20i%20Sjekklista%20og%20ønsker%20å%20melde%20interesse."
              className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-fit"
            >
              Meld interesse
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
