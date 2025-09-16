"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight text-brand-purple text-lg"
          >
            <img src="Sjekklista-logo-3-min.png" className="w-[113px]" />
          </Link>

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
            <Link href="#features" className="hover:text-slate-900 transition">
              Funksjoner
            </Link>
            <Link href="#pricing" className="hover:text-slate-900 transition">
              Priser
            </Link>
            <Link
              href="https://app.sjekklista.no/signup"
              className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Kom i gang
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-4 text-slate-600">
            <Link href="#features" className="hover:text-slate-900 transition">
              Funksjoner
            </Link>
            <Link href="#pricing" className="hover:text-slate-900 transition">
              Priser
            </Link>
            <Link
              href="https://app.sjekklista.no/signup"
              className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-fit"
            >
              Kom i gang
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
