import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// --- App with routing and navbar ---
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        {/* Navbar */}
        <nav className="bg-black text-white px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                ✅
              </div>
              <Link to="/" className="text-lg font-semibold">
                Sjekklista.no
              </Link>
            </div>
            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/" className="text-sm text-slate-200 hover:underline">
                Hjem
              </Link>
              <Link
                to="/about"
                className="text-sm text-slate-200 hover:underline"
              >
                Om
              </Link>
              <Link to="/demo">
                <Button variant="ghost">Prøv gratis</Button>
              </Link>
            </div>
            {/* Mobile hamburger */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-white/10">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="fixed inset-0 bg-black text-white w-screen h-screen flex flex-col items-center justify-center px-8 py-10 z-50"
                  style={{ boxShadow: "none" }}
                >
                  <nav className="flex flex-col items-center gap-8 w-full">
                    <Link
                      to="/"
                      className="text-2xl font-semibold hover:underline transition"
                    >
                      Hjem
                    </Link>
                    <Link
                      to="/about"
                      className="text-2xl font-semibold hover:underline transition"
                    >
                      Om
                    </Link>
                    <Link to="/demo" className="w-full flex justify-center">
                      <Button
                        size="lg"
                        variant="ghost"
                        className="w-full text-xl py-4 border border-white/20 rounded-lg hover:bg-white/10 transition"
                      >
                        🚀 Prøv gratis
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t py-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Sjekklista.no — Enkelt • Dokumentert •
          Tilgjengelig ✨
        </footer>
      </div>
    </Router>
  );
}

export default App;
