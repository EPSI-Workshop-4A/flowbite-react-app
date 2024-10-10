import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GénéaSanté",
  description: "GénéaSanté",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className="dark:bg-slate-500 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
