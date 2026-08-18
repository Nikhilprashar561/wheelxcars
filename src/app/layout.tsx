import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "WheelxCars — Premium Pre-Owned Cars",
  description:
    "Discover handpicked, multi-point inspected pre-owned cars. Every vehicle at WheelxCars is selected for quality, condition and value. Browse our premium inventory today.",
  keywords: ["used cars", "pre-owned cars", "car dealership", "buy used car", "WheelxCars"],
  openGraph: {
    title: "WheelxCars — Premium Pre-Owned Cars",
    description:
      "Discover handpicked, multi-point inspected pre-owned cars. Premium inventory with transparent pricing.",
    type: "website",
    url: "https://wheelxcars.com",
    siteName: "WheelxCars",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelxCars — Premium Pre-Owned Cars",
    description: "Discover handpicked, inspected pre-owned cars.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
