import type { Metadata } from "next";
import { Montserrat, Press_Start_2P, VT323, Geist_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const retro = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F-Smoke — Pantau Progres Berhenti Merokok",
  description:
    "Lacak waktu bebas rokok, uang yang dihemat, dan timeline pemulihan kesehatanmu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${pixel.variable} ${retro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}