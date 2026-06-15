import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Cinzel_Decorative, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Lía Gabriela — Mis XV Años | Cuento de Hadas",
  description:
    "Invitación oficial a la celebración de los XV años de Lía Gabriela. Una noche mágica digna de cuento de hadas, 11 de julio de 2026.",
  openGraph: {
    title: "Lía Gabriela — XV Años Cuento de Hadas",
    description: "Celebra conmigo esta noche mágica ✨👑",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} ${cinzel.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
