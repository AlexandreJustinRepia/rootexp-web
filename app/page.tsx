import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import GrowthCTA from "@/components/GrowthCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-surface -z-10" />
        <FeatureCards />
      </div>
      <GrowthCTA />
      <Footer />
    </main>
  );
}
