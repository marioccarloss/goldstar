"use client"

import { WhatsappLogo } from "@/components/icons/whatsapp-logo"
import Link from "next/link"

export function WhatsappButton() {
  // Reemplaza el número por tu teléfono y personaliza el mensaje predeterminado
  const phoneNumber = "15551234567" // Ejemplo: +1 555 123 4567
  const message = "Hola! Estoy interesado en sus servicios de fontanería."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <WhatsappLogo className="h-8 w-8" />
    </Link>
  )
}
