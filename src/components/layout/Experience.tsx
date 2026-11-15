"use client";

import { LanguageProvider } from "@/hooks/useLanguage";
import { ExperienceProvider } from "@/hooks/useExperience";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar, SkipLink } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { NewEra } from "@/components/sections/NewEra";
import { Journey } from "@/components/sections/Journey";
import { FirstFootstep } from "@/components/sections/FirstFootstep";
import { Settlement } from "@/components/sections/Settlement";
import { Explore } from "@/components/sections/Explore";
import { Legacy } from "@/components/sections/Legacy";
import { Finale } from "@/components/sections/Finale";

/**
 * Page composition. Order matters for ScrollTrigger: pinned scenes are
 * created top-to-bottom so later triggers account for pin spacing.
 */
export function Experience() {
  return (
    <LanguageProvider>
      <ExperienceProvider>
        <SkipLink />
        <Preloader />
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <NewEra />
          <Journey />
          <FirstFootstep />
          <Settlement />
          <Explore />
          <Legacy />
          <Finale />
        </main>
        <Footer />
      </ExperienceProvider>
    </LanguageProvider>
  );
}
