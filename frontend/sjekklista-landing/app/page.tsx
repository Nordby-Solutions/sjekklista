import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeaturesSection";
import FinalCTASection from "@/components/FinalCTASection";
import PricingSection from "@/components/PricingSection";

export default function HomePage() {
  return (
    <main className="text-gray-900 min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <FinalCTASection />
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
