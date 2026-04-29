import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. Load the ultra-professional Montserrat font
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bodynation Sports & Nutrition",
  description: "Fuel Your Fitness Journey with Authentic Nutrition in Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Apply it globally to the body */}
      <body className={`${montserrat.className} antialiased selection:bg-bodyblue selection:text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}