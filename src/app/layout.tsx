import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight, Michroma } from "next/font/google";
import { en } from "@/i18n/en";
import "./globals.css";

const display = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: en.metadata.title,
  description: en.metadata.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: en.metadata.title,
    description: en.metadata.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
