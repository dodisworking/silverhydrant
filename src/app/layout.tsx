import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MainMenu from "@/components/navigation/MainMenu";
import TransitionLayer from "@/components/transition/TransitionLayer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silverhydrant.com"),
  title: "Silver Hydrant | AI Consulting Firm",
  description:
    "Silver Hydrant is a purpose-driven, human-centered AI consulting firm guiding companies to confidently evolve and lead in the AI future.",
  openGraph: {
    title: "Silver Hydrant | AI Consulting Firm",
    description:
      "A purpose-driven, human-centered AI consulting firm guiding companies to confidently evolve and lead in the AI future.",
    type: "website",
    images: ["/hydrant.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Hydrant | AI Consulting Firm",
    description:
      "A purpose-driven, human-centered AI consulting firm guiding companies to confidently evolve and lead in the AI future.",
  },
  icons: { icon: "/hydrant.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <MainMenu />
        <TransitionLayer>{children}</TransitionLayer>
      </body>
    </html>
  );
}
