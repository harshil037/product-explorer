import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Explorer",
  description: "A modern product explorer built with Next.js and TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50 text-gray-900`}>
        <Navbar /> 
        <main className="flex-grow">{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}
