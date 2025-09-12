"use client";

import { BookingManager } from "@/components/booking/booking-manager";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Marquee } from "../marquee";
import { getContent } from "@/lib/content";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  comments: string;
}

export const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const contentData = await getContent();
      setContent(contentData);
    };

    fetchContent();
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

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-svh w-full items-center overflow-x-hidden bg-[#f6be00] px-6 text-black">
      <div className="mx-auto w-full max-w-[1400px] pt-40 pb-28">
        <div className="relative grid items-center gap-16 lg:grid-cols-2">
          {/* Columna de Texto Animada */}
          <motion.div
            className="z-10 flex flex-col gap-6 text-center text-black lg:text-left"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex flex-col items-center gap-2 self-center bg-[#d0f5da] p-2 lg:flex-row lg:self-start"
              variants={textItemVariants}
            >
              <Star className="hidden h-5 w-5 text-[#eb9b4a] lg:block" fill="#eb9b4a" />
              <span className="text-xs font-medium text-black lg:text-sm">{content.home.hero.badge}</span>
            </motion.div>
            <motion.h1
              className="mr-auto ml-auto max-w-[669px] leading-none font-extrabold lg:ml-0"
              style={{ fontSize: "clamp(3rem, 6vw, 88px)" }}
              variants={textItemVariants}
            >
              {content.home.hero.title.l1} <br /> {content.home.hero.title.l2} <br /> {content.home.hero.title.l3}
            </motion.h1>
            <motion.p
              className="mx-auto max-w-[380px] lg:mx-0 lg:max-w-[521px]"
              style={{ fontSize: "clamp(1rem, 1.5vw, 22px)" }}
              variants={textItemVariants}
            >
              {content.home.hero.description}
            </motion.p>
            <motion.div
              className="mt-4 grid w-full max-w-[300px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 self-center lg:max-w-[470px] lg:self-start"
              variants={textItemVariants}
            >
              <Button className="group relative overflow-hidden rounded-2xl bg-white px-6 py-9 text-base leading-none text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-2xl">
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
              </Button>
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="group relative overflow-hidden rounded-2xl bg-[#00b5e2] px-6 py-9 text-base leading-none text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-[#0099cc] hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-600/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-blue-700/30"></div>
                <div className="relative z-10 text-left">
                  <div className="flex items-center text-[22px] font-bold transition-transform duration-300 group-hover:translate-x-1">
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

            {/* Tarjeta de Satisfacción */}
            <motion.div
              className="relative z-20 flex items-center gap-3 bg-[#fefae0] p-3 shadow-lg lg:absolute lg:right-1/3 lg:bottom-0 lg:left-auto"
              variants={satisfactionCardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex -space-x-3">
                <Image
                  src="/images/p1.png"
                  alt="Customer 1"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/images/p2.png"
                  alt="Customer 2"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-amber-700">98%</p>
                <p className="text-sm text-stone-600">Customer Satisfaction</p>
              </div>
            </motion.div>
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
