"use client";

import { getContent, subscribeToContent } from "@/lib/content";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export default function ServicesClient({ initialContent }: { initialContent?: any }) {
  const [content, setContent] = useState<any>(initialContent ?? null);

  useEffect(() => {
    if (!initialContent) {
      const fetchContent = async () => {
        const contentData = await getContent();
        setContent(contentData);
      };
      fetchContent();
    }
  }, [initialContent]);

  // Suscripción en tiempo real
  useEffect(() => {
    const cleanup = subscribeToContent((data) => setContent(data));
    return cleanup;
  }, []);

  type ServiceItem = { title: string; icon: ComponentType<any>; description: string };
  type ServiceCategory = { number: string | number; title: string; subtitle: string; services: ServiceItem[] };

  const plumbingIcons = [
    PipeIcon,
    WaterDropIcon,
    ClockIcon,
    WaterDropIcon,
    WaterDropIcon,
    WrenchIcon,
    ShowerIcon,
    WaterDropIcon,
    ToiletIcon,
  ];

  const plumbingServices = (content?.services?.plumbingServices ?? []).map((s: any, idx: number) => ({
    title: s.title,
    icon: plumbingIcons[idx] ?? PipeIcon,
    description: s.description,
  }));

  const drainageIcons = [DrainIcon, CleaningIcon, SewerIcon, WrenchIcon, MaintenanceIcon, PipeIcon, InspectionIcon];
  const drainageServices = (content?.services?.drainageServices ?? []).map((s: any, idx: number) => ({
    title: s.title,
    icon: drainageIcons[idx] ?? DrainIcon,
    description: s.description,
  }));

  const heatingIcons = [
    BoilerIcon,
    WrenchIcon,
    MaintenanceIcon,
    RadiatorIcon,
    ThermostatIcon,
    HeatPumpIcon,
    FurnaceIcon,
  ];
  const heatingServices = (content?.services?.heatingServices ?? []).map((s: any, idx: number) => ({
    title: s.title,
    icon: heatingIcons[idx] ?? BoilerIcon,
    description: s.description,
  }));

  const renovationIcons = [BathtubIcon, KitchenIcon, WrenchIcon, WrenchIcon, WrenchIcon, KitchenIcon];
  const homeRenovationServices = (content?.services?.homeRenovationServices ?? []).map((s: any, idx: number) => ({
    title: s.title,
    icon: renovationIcons[idx] ?? WrenchIcon,
    description: s.description,
  }));

  const serviceCategories: ServiceCategory[] = (content?.services?.categories ?? []).map((c: any, idx: number) => ({
    number: c.number,
    title: c.title,
    subtitle: c.subtitle,
    services:
      idx === 0
        ? plumbingServices
        : idx === 1
          ? drainageServices
          : idx === 2
            ? heatingServices
            : homeRenovationServices,
  }));

  return (
    <div className="min-h-screen bg-[#f6be00]">
      <div className="bg-[#f6be00] pt-44 pb-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center">
            <h1 className="leading-none font-extrabold text-black" style={{ fontSize: "clamp(3rem, 6vw, 88px)" }}>
              {content?.services?.hero?.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-black" style={{ fontSize: "clamp(1rem, 1.5vw, 22px)" }}>
              {content?.services?.hero?.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-16">
        {serviceCategories.map((category: ServiceCategory, categoryIndex: number) => (
          <div
            key={category.number}
            className={`mb-24 ${categoryIndex % 2 === 0 ? "" : "border border-black bg-white p-8"}`}
          >
            <div className="mb-12">
              {/* Layout móvil: número arriba del título */}
              <div className="block md:hidden">
                <div className="mb-4 text-center">
                  <span className="text-8xl leading-none font-bold text-black/20">{category.number}</span>
                </div>
                <div>
                  <h2
                    className="mb-4 leading-none font-extrabold text-black"
                    style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}
                  >
                    {category.title}
                  </h2>
                  <p className="max-w-2xl text-black" style={{ fontSize: "clamp(1rem, 1.2vw, 18px)" }}>
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Layout desktop: número a la izquierda */}
              <div className="hidden items-start gap-8 md:flex">
                <div className="flex-shrink-0">
                  <span className="text-8xl leading-none font-bold text-black/20">{category.number}</span>
                </div>
                <div className="flex-1 pt-4">
                  <h2
                    className="mb-4 leading-none font-extrabold text-black"
                    style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}
                  >
                    {category.title}
                  </h2>
                  <p className="max-w-2xl text-black" style={{ fontSize: "clamp(1rem, 1.2vw, 18px)" }}>
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service: ServiceItem, serviceIndex: number) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={serviceIndex}
                    className="group border border-black bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center border border-black bg-[#d0f5da] transition-colors duration-300 group-hover:bg-[#f6be00]">
                          <IconComponent />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-bold text-black">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-black/80">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Icons
const PipeIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 8h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v4H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM10 4h4v4h-4V4zm10 14H4v-6h16v6z" />
  </svg>
);
const WaterDropIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z" />
  </svg>
);
const WrenchIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);
const ShowerIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 17H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
  </svg>
);
const ToiletIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 8V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2h1v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8h1zm2-2v2h10V6H7zm11 4H6v9h12v-9z" />
  </svg>
);
const ClockIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
  </svg>
);
const BathtubIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 7V5c0-1.1.9-2 2-2s2 .9 2 2v2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h2zm2-2v2h2V5H9zm10 4H5v8h14V9z" />
  </svg>
);
const KitchenIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2.01L6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6V4h2v7l2-1 2 1V4h6v16z" />
  </svg>
);
const DrainIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 17H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
  </svg>
);
const SewerIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);
const CleaningIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.36 2.72L20.78 4.14l-1.06 1.06-1.42-1.42L19.36 2.72zm-14.14 0l1.06 1.06-1.42 1.42L3.8 4.14L5.22 2.72zM12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm6.36 10.36l1.42 1.42-1.06 1.06-1.42-1.42 1.06-1.06zm-12.72 0l1.06 1.06-1.42 1.42-1.06-1.06 1.42-1.42z" />
  </svg>
);
const InspectionIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);
const MaintenanceIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);
const BoilerIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);
const RadiatorIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
  </svg>
);
const ThermostatIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z" />
  </svg>
);
const HeatPumpIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9l-5.91.74L12 16l-4.09-6.26L2 9l6.91-.74L12 2zm0 2.18L10.46 7.9l-4.24.53 4.24.53L12 12.82l1.54-3.86 4.24-.53-4.24-.53L12 4.18z" />
  </svg>
);
const FurnaceIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);
