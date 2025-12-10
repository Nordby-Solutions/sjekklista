import './App.css'
import TopNav from './components/TopNav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import FinalCTASection from './components/FinalCTASection'
import TrustedBySection from './components/TrustedBySection'

function App() {
  return (
    <>
      <div className="bg-yellow-50 border-b border-yellow-300 text-sm text-yellow-900 px-4 py-2 text-center">
        Dette produktet er under utvikling. For å melde interesse kan du ta
        kontakt{" "}
        <a
          href="mailto:sebastianbjornstad@hotmail.com?subject=Hei,%20Sjekklista!%20Jeg%20er%20interessert%20i%20å%20prøve%20Sjekklista&body=Hei,%0D%0A%0D%0AJeg%20fant%20nettopp%20ut%20om%20Sjekklista%20og%20er%20interessert."
          className="underline font-medium text-yellow-800 hover:text-yellow-600"
        >
          her
        </a>
        .
      </div>
      <TopNav />
      <main className="text-gray-900 min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TrustedBySection />
        <FinalCTASection />
      </main>
    </>
  )
}

export default App
