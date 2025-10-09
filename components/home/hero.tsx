"use client";

import { BookingManager } from "@/components/booking/booking-manager";
import { Button } from "@/components/ui/button";
import { getContent, subscribeToContent } from "@/lib/content";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Marquee } from "../marquee";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  comments: string;
}

type HeroProps = {
  initialContent?: any;
};

export const Hero = ({ initialContent }: HeroProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [content, setContent] = useState<any>(initialContent ?? null);

  useEffect(() => {
    // Si no recibimos contenido inicial desde el servidor, lo cargamos en cliente
    if (!initialContent) {
      const fetchContent = async () => {
        try {
          const contentData = await getContent();
          setContent(contentData);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };
      fetchContent();
    }
  }, [initialContent]);

  // Suscripción en tiempo real al documento de contenido
  useEffect(() => {
    try {
      const cleanup = subscribeToContent((data) => setContent(data));
      return cleanup;
    } catch (error) {
      console.error("Error subscribing to content:", error);
      return () => {};
    }
  }, []);

  const handleBookingComplete = (booking: BookingData) => {
    console.log("Booking completed:", booking);
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Variantes para cada elemento de texto
  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Variantes para las imágenes
  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const satisfactionCardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.5 },
    },
  };

  // Mientras se obtiene el contenido en cliente (primera visita), mostramos una estructura mínima del Hero
  // para que no bloquee el LCP. Cuando llegue el contenido, se hidrata el texto.

  return (
    <div className="flex min-h-svh w-full items-center overflow-x-hidden bg-[#f6be00] px-4 text-black sm:px-6">
      <div className="mx-auto w-full max-w-[1400px] pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="relative grid items-center gap-16 lg:grid-cols-2">
          {/* Columna de Texto Animada */}
          <motion.div
            className="z-10 flex flex-col text-center text-black lg:text-left"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mr-auto mb-4 ml-auto max-w-[669px] leading-none font-extrabold sm:mb-6 lg:ml-0"
              style={{ fontSize: "clamp(3rem, 6vw, 88px)" }}
              variants={textItemVariants}
            >
              {content?.home?.hero?.title?.l1 ?? ""} <br /> {content?.home?.hero?.title?.l2 ?? ""} <br />{" "}
              {content?.home?.hero?.title?.l3 ?? ""}
            </motion.h1>
            <motion.p
              className="mx-auto mb-6 max-w-[380px] px-2 text-base leading-relaxed text-black/80 sm:mb-8 sm:px-0 sm:text-lg lg:mx-0 lg:max-w-[521px]"
              style={{ fontSize: "clamp(1rem, 1.5vw, 22px)" }}
              variants={textItemVariants}
            >
              {content?.home?.hero?.description ?? ""}
            </motion.p>
            <motion.div
              className="mt-4 grid w-full max-w-[300px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 self-center sm:w-auto sm:gap-4 lg:max-w-[470px] lg:self-start"
              variants={textItemVariants}
            >
              <Button
                asChild
                className="group relative overflow-hidden rounded-2xl bg-white px-6 py-9 text-base leading-none text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-2xl"
              >
                <a href="tel:+17785548619">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-100/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-gray-200/30"></div>
                  <div className="relative z-10 text-left">
                    <div className="flex items-center text-[22px] font-bold transition-transform duration-300 group-hover:translate-x-1">
                      Call Now{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </div>
                    <div className="text-xs font-normal opacity-80 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-[-1px] group-hover:text-gray-700 group-hover:opacity-100">
                      24/7 Available
                    </div>
                  </div>
                </a>
              </Button>
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="group relative w-full overflow-hidden rounded-2xl bg-[#00b5e2] px-4 py-6 text-sm leading-none text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-[#0099cc] hover:shadow-2xl sm:w-auto sm:px-6 sm:py-9 sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-600/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-blue-700/30"></div>
                <div className="relative z-10 text-left">
                  <div className="flex items-center text-lg font-bold transition-transform duration-300 group-hover:translate-x-1 sm:text-[22px]">
                    Book Online{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                  <div className="text-xs font-normal opacity-80 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-[-1px] group-hover:text-blue-800 group-hover:opacity-100">
                    Instant Booking
                  </div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Columna de Imágenes Animada */}
          <div className="relative flex flex-col items-center justify-center gap-8 pb-10 lg:flex-row lg:items-end lg:justify-start lg:gap-4 lg:pb-20">
            {/* Contenedor para las dos imágenes en móvil */}
            <div className="flex w-full flex-row items-end justify-center gap-4 lg:hidden">
              <motion.div
                className="relative flex w-1/2 justify-center"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex h-[300px] w-full items-end justify-center overflow-hidden rounded-t-full bg-[#D0F5DA]">
                  <Image
                    src="/images/fontanero.png"
                    alt="Fontanero profesional"
                    width={200}
                    height={300}
                    className="object-contain object-bottom"
                    priority
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
              <motion.div
                className="relative flex w-1/2 justify-center"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <div className="flex h-[300px] w-full items-end justify-center overflow-hidden rounded-t-full bg-[#EDD4E1]">
                  <Image
                    src="/images/clienta.png"
                    alt="Clienta satisfecha"
                    width={200}
                    height={300}
                    className="object-cover object-bottom"
                    priority
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* Diseño original para pantallas grandes */}
            <div className="hidden items-end md:gap-4 lg:flex">
              <motion.div
                className="relative flex h-[90vw] max-h-[490px] w-[90vw] max-w-[360px] items-end justify-center"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="absolute right-0 bottom-0 left-0 h-[100vh] w-full rounded-b-full bg-[#D0F5DA]"></div>
                <div className="relative z-10 mt-auto overflow-hidden rounded-b-full bg-[#d0f5da]">
                  <div className="absolute inset-0 w-[120%] -rotate-10 transform">
                    <Marquee className="bottom-2/4 bg-[#FFA500] text-white" />
                  </div>
                  <Image
                    src="/images/fontanero.png"
                    alt="Fontanero profesional"
                    width={400}
                    height={600}
                    className="relative z-20 rounded-b-full object-contain"
                    priority
                    sizes="(max-width: 1024px) 50vw, 360px"
                  />
                  <div className="absolute inset-0 z-20 w-[120%] rotate-12 transform">
                    <Marquee className="bottom-1/3 -left-5 bg-[#000000] text-white" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="z-10 flex h-[90vw] max-h-[422px] w-[90vw] max-w-[256px] items-end justify-center overflow-hidden rounded-full bg-[#EDD4E1]"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/images/clienta.png"
                  alt="Clienta satisfecha"
                  width={200}
                  height={300}
                  className="z-10 mt-auto w-full rounded-b-full bg-[#EDD4E1] object-[80%]"
                  priority
                  sizes="(max-width: 1024px) 40vw, 256px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Manager */}
      <BookingManager
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};
