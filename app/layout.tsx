import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "nOva art space",
  description: "Съвременна галерия и премиум пространство за събития в София",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} ${dancingScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
