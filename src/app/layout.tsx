import type { Metadata } from "next";
import { Montserrat, Press_Start_2P, VT323, Geist_Mono } from "next/font/google";
import "./globals.css";
import RetroBackground from "@/components/RetroBackground";

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
  metadataBase: new URL("https://f-smoke.nasruladitri.space"),
  title: {
    default: "F-Smoke — Game Berhenti Merokok",
    template: "%s | F-Smoke",
  },
  description:
    "F-Smoke adalah game berhenti merokok: kumpulkan XP dari waktu bebas rokok, selesaikan misi penyelamatan, dan kumpulkan item langka setiap hari.",
  applicationName: "F-Smoke",
  openGraph: {
    type: "website",
    url: "https://f-smoke.nasruladitri.space",
    siteName: "F-Smoke",
    locale: "id_ID",
    title: "F-Smoke — Game Berhenti Merokok",
    description:
      "Kumpulkan XP dari waktu bebas rokok, selesaikan misi penyelamatan, dan kumpulkan item langka setiap hari.",
  },
  twitter: {
    card: "summary_large_image",
    title: "F-Smoke — Game Berhenti Merokok",
    description:
      "Kumpulkan XP dari waktu bebas rokok, selesaikan misi penyelamatan, dan kumpulkan item langka setiap hari.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${pixel.variable} ${retro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <RetroBackground />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}