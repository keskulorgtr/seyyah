import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Seyyah Travel — Authentic Boutique Journeys",
  description: "Personalized boutique tours crafted around culture, comfort, and unforgettable local experiences. Explore Egypt, Switzerland, Europe, Morocco, and beyond.",
  keywords: ["travel", "boutique tours", "Egypt tours", "Switzerland tours", "Morocco tours", "luxury travel", "Seyyah"],
  authors: [{ name: "Seyyah Travel & Organisation" }],
  openGraph: {
    title: "Seyyah Travel — Authentic Boutique Journeys",
    description: "Personalized boutique tours crafted around culture, comfort, and unforgettable local experiences.",
    siteName: "Seyyah Travel",
    type: "website",
  },
  icons: {
    icon: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/767458e5-267e-4998-890c-1de5a6a75c00/public",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-white text-[#1a2d3d] antialiased">
        <LenisProvider>
          {children}
          <ScrollToTop />
          <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'var(--font-dm-sans)', borderRadius: '8px' } }} />
        </LenisProvider>
      </body>
    </html>
  );
}
