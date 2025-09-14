"use client";

import { getContent } from "@/lib/content";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { AlertTriangle, Droplets, Home, Wrench, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "../icons/arrow-up-right";

// Item base reutilizable
function GridItem({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={`group hover:shadow-3xl relative h-full cursor-pointer overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:scale-[1.03] ${className}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Subtle border glow */}
      <div className="absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-white/20"></div>

      {/* Animated corner accents */}
      <div className="absolute top-4 left-4 h-8 w-8 -translate-x-2 -translate-y-2 transform border-t-2 border-l-2 border-white/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></div>
      <div className="absolute right-4 bottom-4 h-8 w-8 translate-x-2 translate-y-2 transform border-r-2 border-b-2 border-white/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></div>

      {children}
    </div>
  );
}

function TextBlock({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center overflow-hidden p-8 text-white ${className}`}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 h-16 w-16 rotate-45 border-2 border-white/30"></div>
        <div className="absolute right-4 bottom-4 h-12 w-12 rounded-full border border-white/20"></div>
        <div className="absolute top-1/2 left-8 h-8 w-8 -translate-y-1/2 rotate-12 transform bg-white/20"></div>
      </div>

      {/* Animated arrow */}
      <div className="absolute top-6 right-6 transition-all duration-500">
        <div className="relative">
          <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute inset-0 scale-150 rounded-full bg-white/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      <div className="relative z-10 space-y-4 text-center">
        {/* Enhanced icon with glow effect */}
        <div className="relative mx-auto">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-white/40 to-white/20 shadow-inner"></div>
          </div>
          <div className="absolute inset-0 scale-110 rounded-2xl bg-white/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>

        {/* Enhanced typography */}
        <div className="space-y-2">
          <h3 className="text-xl leading-tight font-black tracking-tight md:text-2xl lg:text-3xl">
            {title.split(" - ").map((word, i) => (
              <span
                key={i}
                className="inline-block transform transition-transform duration-300 group-hover:scale-105"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {word}
                {i < title.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </h3>
          {subtitle && <p className="text-sm/5 font-medium tracking-wide text-white/90 md:text-base/6">{subtitle}</p>}
        </div>

        {/* Animated underline */}
        <div className="relative mx-auto w-16">
          <div className="h-0.5 w-full rounded-full bg-white/40"></div>
          <div className="absolute inset-0 h-0.5 origin-left scale-x-0 rounded-full bg-white/80 transition-transform duration-500 group-hover:scale-x-100"></div>
        </div>
      </div>
    </div>
  );
}

// Overlay genérico para listas de servicios
function CategoryOverlay({
  title,
  services,
  onBack,
  bgClass,
}: {
  title: string;
  services: { title: string; description?: string }[];
  onBack: () => void;
  bgClass: string;
}) {
  // Determinar el icono basado en el título
  const getIcon = () => {
    if (title.toLowerCase().includes("plumbing")) return Wrench;
    if (title.toLowerCase().includes("drainage")) return Droplets;
    if (title.toLowerCase().includes("heating")) return AlertTriangle;
    if (title.toLowerCase().includes("renovation")) return Home;
    return Wrench;
  };

  const IconComponent = getIcon();

  // Determinar el enlace de servicio basado en el título
  const getServiceLink = () => {
    if (title.toLowerCase().includes("plumbing")) return "/services/plumbing";
    if (title.toLowerCase().includes("drainage")) return "/services/drainage";
    if (title.toLowerCase().includes("heating")) return "/services/heating";
    if (title.toLowerCase().includes("renovation")) return "/services/renovations";
    return "/services";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex h-[95vh] w-full max-w-4xl flex-col bg-[#f6be00] shadow-2xl"
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-black/10 bg-[#f6be00] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-bold text-black">{title}</h2>
            </div>
            <button onClick={onBack} className="rounded-full p-2 transition-colors hover:bg-black/10">
              <X className="h-6 w-6 text-black" />
            </button>
          </div>
          <p className="mt-2 text-black/70">Professional services for your home and business</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="mb-6 text-xl font-semibold text-black">Available Services</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer border-2 border-black/20 bg-white/90 p-4 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-lg"
                >
                  <h4 className="mb-2 font-semibold text-black transition-colors group-hover:text-[#f6be00]">
                    {service.title}
                  </h4>
                  {service.description ? (
                    <p className="text-sm text-black/70">{service.description}</p>
                  ) : (
                    <p className="text-sm text-black/50">Professional service available</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-black/50">Expert Service</span>
                    <ArrowUpRight className="h-4 w-4 text-black/40 transition-transform group-hover:rotate-45 group-hover:text-[#f6be00]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-black/10 bg-[#f6be00] p-6">
          <div className="flex items-center justify-center">
            <Link
              href="/services"
              className="bg-black px-6 py-2 text-sm font-medium text-[#f6be00] transition-all hover:bg-black/90 hover:shadow-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function WorkSection({ initialContent }: { initialContent?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Estado UI
  const [showPlumbing, setShowPlumbing] = useState(false);
  const [showDrainage, setShowDrainage] = useState(false);
  const [showHeating, setShowHeating] = useState(false);
  const [showRenovation, setShowRenovation] = useState(false);

  // Contenido Firestore (usar SSR si viene, sino fallback en cliente)
  const [content, setContent] = useState<any>(initialContent ?? null);
  useEffect(() => {
    if (!initialContent) {
      const fetchContent = async () => {
        const data = await getContent();
        setContent(data);
      };
      fetchContent();
    }
  }, [initialContent]);

  const categories = content?.services?.categories || [];
  const plumbingServices = content?.services?.plumbingServices || [];
  const drainageServices = content?.services?.drainageServices || [];
  const heatingServices = content?.services?.heatingServices || [];
  const renovationServices = content?.services?.homeRenovationServices || [];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const anyOverlayOpen = showPlumbing || showDrainage || showHeating || showRenovation;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#f6be00] via-[#f6be00] to-[#e6ae00] py-20"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"></div>
        <div
          className="absolute right-10 bottom-20 h-80 w-80 animate-pulse rounded-full bg-white blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-white opacity-30 blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 h-4 w-4 rotate-45 bg-black"></div>
        <div className="absolute top-48 right-32 h-6 w-6 rounded-full border-2 border-black"></div>
        <div className="absolute bottom-40 left-40 h-8 w-8 rotate-12 transform bg-black"></div>
        <div className="absolute right-20 bottom-60 h-5 w-5 rotate-45 border border-black"></div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="relative min-h-[100vh] overflow-hidden">
          {/* Rejilla estilo mosaico (visible cuando no hay overlay) */}
          <div
            className={
              anyOverlayOpen
                ? "pointer-events-none opacity-0 transition-opacity duration-300"
                : "opacity-100 transition-opacity duration-300"
            }
          >
            <motion.div
              className="grid auto-rows-[140px] grid-cols-1 gap-6 md:auto-rows-[160px] md:grid-cols-6 lg:grid-cols-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* FILA 1 - Plumbing */}
              {/* Plumbing - bloque de texto */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem className="bg-[#E85D2A]" onClick={() => setShowPlumbing(true)}>
                  <TextBlock title={categories[0]?.title || "Plumbing"} subtitle={categories[0]?.subtitle} />
                </GridItem>
              </motion.div>

              {/* Plumbing - imagen */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem onClick={() => setShowPlumbing(true)}>
                  <div className="relative h-full w-full">
                    <Image src="/images/plumbing-repair.jpg" alt="Plumbing" fill className="object-cover" />
                  </div>
                </GridItem>
              </motion.div>

              {/* Drainage - bloque de texto */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem className="bg-[#4A6B4D]" onClick={() => setShowDrainage(true)}>
                  <TextBlock title={categories[1]?.title || "Drainage"} subtitle={categories[1]?.subtitle} />
                </GridItem>
              </motion.div>

              {/* Drainage - imagen */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem onClick={() => setShowDrainage(true)}>
                  <div className="relative h-full w-full">
                    <Image src="/images/drainge-service.jpg" alt="Drainage service" fill className="object-cover" />
                  </div>
                </GridItem>
              </motion.div>

              {/* FILA 2 - Heating */}
              {/* Heating - bloque de texto */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem className="bg-[#0f3d3b]" onClick={() => setShowHeating(true)}>
                  <TextBlock title={categories[2]?.title || "Heating"} subtitle={categories[2]?.subtitle} />
                </GridItem>
              </motion.div>

              {/* Heating - imagen */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem onClick={() => setShowHeating(true)}>
                  <div className="relative h-full w-full">
                    <Image src="/images/heating-service-1.jpg" alt="Heating service" fill className="object-cover" />
                  </div>
                </GridItem>
              </motion.div>

              {/* Renovations - bloque de texto */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem className="bg-[#4285F4]" onClick={() => setShowRenovation(true)}>
                  <TextBlock title={categories[3]?.title || "Home Renovations"} subtitle={categories[3]?.subtitle} />
                </GridItem>
              </motion.div>

              {/* Renovations - imagen */}
              <motion.div variants={itemVariants} className="col-span-1 row-span-3 md:col-span-3 lg:col-span-3">
                <GridItem onClick={() => setShowRenovation(true)}>
                  <div className="relative h-full w-full">
                    <Image src="/images/home-renovations.jpg" alt="Home renovations" fill className="object-cover" />
                  </div>
                </GridItem>
              </motion.div>
            </motion.div>
          </div>

          {/* Overlays */}
          <AnimatePresence>
            {showPlumbing && (
              <CategoryOverlay
                title={categories[0]?.title || "Plumbing Services"}
                services={plumbingServices}
                onBack={() => setShowPlumbing(false)}
                bgClass="bg-[#f6be00]"
              />
            )}
            {showDrainage && (
              <CategoryOverlay
                title={categories[1]?.title || "Drainage Services"}
                services={drainageServices}
                onBack={() => setShowDrainage(false)}
                bgClass="bg-[#4A6B4D]"
              />
            )}
            {showHeating && (
              <CategoryOverlay
                title={categories[2]?.title || "Heating Services"}
                services={heatingServices}
                onBack={() => setShowHeating(false)}
                bgClass="bg-[#E85D2A]"
              />
            )}
            {showRenovation && (
              <CategoryOverlay
                title={categories[3]?.title || "Home Renovations"}
                services={renovationServices}
                onBack={() => setShowRenovation(false)}
                bgClass="bg-[#4285F4]"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
