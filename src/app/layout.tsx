import type { Metadata, Viewport } from "next";
import { archivo, jetbrains } from "./fonts";
import { SITE } from "@/content/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${SITE.name} — Concept by ${SITE.studio}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: `${SITE.name} (concept)`,
  authors: [{ name: SITE.studio }],
  creator: SITE.studio,
  keywords: ["Aklio Studio", "concept", "creative development", "Mars", "space exploration", "GSAP", "portfolio"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: `${SITE.name} — an independent concept by ${SITE.studio}`,
    description: SITE.description,
    siteName: `${SITE.studio} — Concept work`,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — concept by ${SITE.studio}`,
    description: SITE.description,
  },
  other: {
    "concept-disclaimer": "Independent concept by Aklio Studio. Fictional Mars mission. Not affiliated with SpaceX.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `is-locked` keeps the page still under the preloader from the very first paint.
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} is-locked`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`html.is-locked,html.is-locked body{overflow:auto!important}.preloader{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
