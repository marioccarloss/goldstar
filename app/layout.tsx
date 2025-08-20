import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsappButton } from "@/components/whatsapp-button";
import "./globals.css";

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-geologica",
  adjustFontFallback: false, // Soluciona el error de compilación
});

export const metadata: Metadata = {
  title: "Gold Star Plumbing",
  description: "Reliable & Fast Plumbing in Vancouver",
  generator: "v0.dev",
  other: {
    "msapplication-TileColor": "#f6be00",
    "msapplication-navbutton-color": "#f6be00",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport = {
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
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
