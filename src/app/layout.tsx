import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "WheelxCars — Premium Pre-Owned Cars in Chandigarh & Tricity",
    template: "%s | WheelxCars Tricity",
  },
  description:
    "Explore verified used cars in Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar. Inspected vehicles with documented history and transparent pricing under ₹10 Lakh.",
  keywords: [
    "used cars chandigarh",
    "second hand cars mohali",
    "pre-owned cars panchkula",
    "used cars zirakpur",
    "used cars kharar",
    "buy used car tricity",
    "sell car chandigarh",
    "WheelxCars",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg" },
    ],
  },
  openGraph: {
    title: "WheelxCars — Premium Pre-Owned Cars in Chandigarh & Tricity",
    description:
      "Explore verified used cars across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar. Transparent pricing, multi-point inspected.",
    type: "website",
    url: "https://wheelxcars.com",
    siteName: "WheelxCars",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelxCars — Premium Pre-Owned Cars in Chandigarh & Tricity",
    description: "Explore verified used cars in Chandigarh, Mohali, Panchkula, Zirakpur & Kharar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-white/20 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
