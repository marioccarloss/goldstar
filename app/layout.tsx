import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsappButton } from "@/components/whatsapp-button";
import { StructuredData } from "@/components/seo/structured-data";
import { Analytics } from "@/components/seo/analytics";
import "./globals.css";

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-geologica",
  adjustFontFallback: false, // Soluciona el error de compilación
});

export const metadata: Metadata = {
  title: {
    default: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
    template: "%s | Gold Star Plumbing Vancouver"
  },
  description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area. Call now!",
  keywords: [
    "plumbing Vancouver",
    "plumber Vancouver BC",
    "emergency plumbing Vancouver",
    "drain cleaning Vancouver",
    "water heater repair Vancouver",
    "plumbing services Vancouver",
    "licensed plumber Vancouver",
    "residential plumbing Vancouver",
    "commercial plumbing Vancouver",
    "heating services Vancouver"
  ],
  authors: [{ name: "Gold Star Plumbing" }],
  creator: "Gold Star Plumbing",
  publisher: "Gold Star Plumbing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.goldstarplumbing.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
    description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    url: 'https://www.goldstarplumbing.ca',
    siteName: 'Gold Star Plumbing',
    images: [
      {
        url: '/images/plumbing-repair.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Star Plumbing - Professional Plumbing Services in Vancouver',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
    description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    images: ['/images/plumbing-repair.jpg'],
    creator: '@goldstarplumbing',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  other: {
    "msapplication-TileColor": "#f6be00",
    "msapplication-navbutton-color": "#f6be00",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/images/favicon/favicon-128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/favicon/favicon.ico",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f6be00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f6be00" />
        <meta name="msapplication-TileColor" content="#f6be00" />
        <meta name="msapplication-navbutton-color" content="#f6be00" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${geologica.variable} font-sans`}>
        <StructuredData type="homepage" />
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
