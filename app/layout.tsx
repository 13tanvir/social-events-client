import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToasterProvider from "../components/ToasterProvider";

export const metadata: Metadata = {
  title: "UnityHands | Social Events Platform",
  description:
    "Create, join and track social service events in your community.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}