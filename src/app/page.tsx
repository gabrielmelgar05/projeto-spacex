import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { resolveAssets } from "@/lib/assets.server";
import { AssetsProvider } from "@/components/providers/AssetsProvider";
import { MissionPreloader } from "@/components/preloader/MissionPreloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollRuntime } from "@/components/layout/ScrollRuntime";
import { HeroSection } from "@/components/sections/HeroSection";
import { HumanitySection } from "@/components/sections/HumanitySection";
import { JourneySection } from "@/components/sections/JourneySection";
import { StarshipSection } from "@/components/sections/StarshipSection";
import { LandingSection } from "@/components/sections/LandingSection";
import { FirstStepsSection } from "@/components/sections/FirstStepsSection";
import { MissionDataSection } from "@/components/sections/MissionDataSection";
import { LifeOnMarsSection } from "@/components/sections/LifeOnMarsSection";
import { FinalSection } from "@/components/sections/FinalSection";

export default function Home() {
  // Which image files exist in /public — resolved on the server so missing
  // assets never produce 404s or break the build.
  const assets = resolveAssets();

  return (
    <LanguageProvider>
    <AssetsProvider assets={assets}>
      <MissionPreloader />
      <ScrollRuntime />
      <SkipLink />
      <Navbar />
      <main id="main">
        {/* ACT I — THE DEPARTURE */}
        <HeroSection />
        <HumanitySection />
        <JourneySection />
        {/* ACT II — THE ARRIVAL */}
        <StarshipSection />
        <LandingSection />
        {/* ACT III — THE FUTURE */}
        <FirstStepsSection />
        <MissionDataSection />
        <LifeOnMarsSection />
        <FinalSection />
      </main>
      <Footer />
    </AssetsProvider>
    </LanguageProvider>
  );
}
