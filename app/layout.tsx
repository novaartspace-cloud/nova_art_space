import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import Script from "next/script";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieYes from "./components/CookieYes";
import { siteConfig } from "./lib/site-config";
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
  title: {
    default:
      "nOva art space - Съвременна арт галерия в София | Нова арт галерия",
    template: "%s | nOva art space",
  },
  description:
    "nOva art space е съвременна арт галерия и премиум пространство за събития в София. Предлагаме картини, изкуство и галерия в България. Посетете най-добрата арт галерия в София.",
  keywords: [
    "nova art gallery",
    "нова арт галерия",
    "нова арт",
    "арт галерия",
    "галерия",
    "галерия софия",
    "изкуство",
    "картини",
    "галерия българия",
    "красота",
    "art gallery",
    "art gallery sofia",
    "art gallery bulgaria",
    "contemporary art",
    "съвременно изкуство",
    "българско изкуство",
    "галерия за картини",
    "изложби софия",
    "премиум пространство",
    "събития софия",
  ],
  authors: [{ name: "nOva art space" }],
  creator: "nOva art space",
  publisher: "nOva art space",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "nOva art space - Съвременна арт галерия в София",
    description:
      "Съвременна арт галерия и премиум пространство за събития в София. Картини, изкуство и галерия в България.",
    images: [
      {
        url: `${siteConfig.url}/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "nOva art space - Арт галерия София",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nOva art space - Съвременна арт галерия в София",
    description:
      "Съвременна арт галерия и премиум пространство за събития в София",
    images: [`${siteConfig.url}/logo.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  // Google Site Verification (optional - only if NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is set)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: siteConfig.name,
    alternateName: "Нова арт галерия",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpg`,
    image: `${siteConfig.url}/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Изкуство и картини",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Картини и произведения на изкуството",
            category: "Изкуство",
          },
        },
      ],
    },
  };

  return (
    <html lang="bg">
      <body
        className={`${inter.variable} ${dancingScript.variable} antialiased`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Analytics - loads only if NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics />
        {/* CookieYes - loads only if NEXT_PUBLIC_COOKIEYES_ID is set */}
        <CookieYes />
        {children}
      </body>
    </html>
  );
}
