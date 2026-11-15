import localFont from "next/font/local";

/** Archivo (variable: weight 100–900, width 62–125%). Self-hosted, SIL OFL. */
export const archivo = localFont({
  src: "../styles/fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

/** JetBrains Mono (variable weight). Self-hosted, SIL OFL. */
export const jetbrains = localFont({
  src: "../styles/fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
