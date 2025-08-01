import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import { Header } from '@/components/layout'
import './globals.css'

const geologica = Geologica({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Gold Star Plumbing',
  description: 'Reliable & Fast Plumbing in Vancouver',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={geologica.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
