import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Geologica } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-geologica",
  adjustFontFallback: false, // Soluciona el error de compilación
})

export const metadata: Metadata = {
  title: "Gold Star Plumbing",
  description: "Reliable & Fast Plumbing in Vancouver",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geologica.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
