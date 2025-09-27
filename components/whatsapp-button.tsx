"use client";

import { Phone } from "lucide-react";

export function WhatsappButton() {
  // Número de teléfono de Gold Star Plumbing
  const phoneNumber = "+1-778-554-8619"; // Número real de Gold Star Plumbing Vancouver

  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Llamar por teléfono"
      className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      <Phone className="h-8 w-8" />
    </a>
  );
}
