"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "../icons/arrow-up-right";

// Iconos SVG para servicios de plomería
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
    <path d="M9 17H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zM7 5h10v2H7V5zm12 10V9c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v6h14z" />
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

// Iconos adicionales para renovaciones
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

// Iconos para servicios de drenaje
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

// Iconos para servicios de calefacción
const BoilerIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const RadiatorIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
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

// Datos de servicios de plomería
const plumbingServices = [
  {
    title: "Repiping",
    icon: PipeIcon,
    description: "Complete pipe replacement and installation services",
  },
  {
    title: "Hot Water Tank",
    icon: WaterDropIcon,
    description: "Water heater repair and installation",
  },
  {
    title: "Emergency Plumbing",
    icon: ClockIcon,
    description: "24/7 emergency plumbing services",
  },
  {
    title: "Water Main Repair",
    icon: WaterDropIcon,
    description: "Main water line repair and replacement",
  },
  {
    title: "Leaks Detection",
    icon: WaterDropIcon,
    description: "Professional leak detection and repair",
  },
  {
    title: "Plumbing Maintenance",
    icon: WrenchIcon,
    description: "Regular maintenance and inspection",
  },
  {
    title: "Shower Repair",
    icon: ShowerIcon,
    description: "Shower installation and repair services",
  },
  {
    title: "Faucet Repair",
    icon: WaterDropIcon,
    description: "Faucet repair and replacement",
  },
  {
    title: "Toilet Repairs",
    icon: ToiletIcon,
    description: "Toilet repair and installation services",
  },
];

// Datos de servicios de drenaje
const drainageServices = [
  {
    title: "Drain Tile System",
    icon: DrainIcon,
    description: "Professional drain tile installation and repair services",
  },
  {
    title: "Drain Cleaning",
    icon: CleaningIcon,
    description: "High-pressure drain cleaning and unclogging",
  },
  {
    title: "Drainage Sewer Installation",
    icon: SewerIcon,
    description: "Complete sewer line installation and replacement",
  },
  {
    title: "Drainage Repair",
    icon: WrenchIcon,
    description: "Expert drainage system repair and maintenance",
  },
  {
    title: "Hydro Jet Drain Maintenance",
    icon: MaintenanceIcon,
    description: "Advanced hydro jetting for drain maintenance",
  },
  {
    title: "Trenchless Pipe Repair",
    icon: PipeIcon,
    description: "Modern trenchless pipe repair technology",
  },
  {
    title: "Sewer Inspection",
    icon: InspectionIcon,
    description: "Professional sewer line inspection services",
  },
];

// Datos de servicios de calefacción
const heatingServices = [
  {
    title: "Boiler Installation",
    icon: BoilerIcon,
    description: "Professional boiler installation and setup services",
  },
  {
    title: "Boiler Maintenance",
    icon: WrenchIcon,
    description: "Regular boiler maintenance and servicing",
  },
  {
    title: "Boiler Repair",
    icon: MaintenanceIcon,
    description: "Expert boiler repair and troubleshooting",
  },
  {
    title: "Radiator Services",
    icon: RadiatorIcon,
    description: "Radiator installation, repair, and maintenance",
  },
  {
    title: "Thermostat Installation",
    icon: ThermostatIcon,
    description: "Smart thermostat installation and programming",
  },
  {
    title: "Heat Pump Services",
    icon: HeatPumpIcon,
    description: "Heat pump installation and maintenance",
  },
  {
    title: "Furnace Services",
    icon: FurnaceIcon,
    description: "Complete furnace installation and repair",
  },
];

// Datos de servicios de renovaciones
const homeRenovationServices = [
  {
    title: "Bathroom Renovations",
    icon: BathtubIcon,
    description: "Complete bathroom remodeling and renovation services",
  },
  {
    title: "Kitchen Renovations",
    icon: KitchenIcon,
    description: "Full kitchen design and renovation solutions",
  },
  {
    title: "Flooring Installation",
    icon: WrenchIcon,
    description: "Professional flooring installation and replacement",
  },
  {
    title: "Tile Installation",
    icon: WrenchIcon,
    description: "Expert tile installation for all areas",
  },
  {
    title: "Painting Services",
    icon: WrenchIcon,
    description: "Interior and exterior painting services",
  },
  {
    title: "Cabinet Installation",
    icon: KitchenIcon,
    description: "Custom cabinet design and installation",
  },
];

const GridItem = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${className}`}
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20 transition-all duration-500 group-hover:from-black/10 group-hover:via-black/5 group-hover:to-black/30"></div>
      {children}
    </div>
  );
};

const TextBlock = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`relative flex h-full flex-col items-center justify-center p-8 text-white ${className}`}>
      <ArrowUpRight className="absolute top-6 right-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-1px] group-hover:scale-110" />
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <div className="h-8 w-8 rounded-full bg-white/30"></div>
        </div>
        <h3 className="text-xl leading-tight font-bold md:text-2xl lg:text-3xl">{title}</h3>
        <div className="mx-auto h-0.5 w-12 bg-white/40"></div>
      </div>
    </div>
  );
};

const PlumbingServicesGrid = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-auto min-h-[100vh] w-full px-10 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#F6BE00]">Plumbing Services</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
        >
          <ArrowUpRight className="h-6 w-6 rotate-[225deg]" />
          <span className="text-sm font-medium">Back to Categories</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plumbingServices.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-[#F6BE00] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 transition-all duration-500 group-hover:from-white/10 group-hover:to-black/20"></div>
            <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                <div className="text-white">
                  <service.icon />
                </div>
              </div>
              <h3 className="text-xl leading-tight font-bold text-white">{service.title}</h3>
              <div className="h-0.5 w-12 bg-white/40 transition-all duration-300 group-hover:w-16"></div>
              <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DrainageServicesGrid = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-auto min-h-[100vh] w-full px-10 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#4A6B4D]">Drainage Services</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
        >
          <ArrowUpRight className="h-6 w-6 rotate-[225deg]" />
          <span className="text-sm font-medium">Back to Categories</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {drainageServices.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-[#4A6B4D] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 transition-all duration-500 group-hover:from-white/10 group-hover:to-black/20"></div>
            <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                <div className="text-white">
                  <service.icon />
                </div>
              </div>
              <h3 className="text-xl leading-tight font-bold text-white">{service.title}</h3>
              <div className="h-0.5 w-12 bg-white/40 transition-all duration-300 group-hover:w-16"></div>
              <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HeatingServicesGrid = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-auto min-h-[100vh] w-full px-10 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#E85D2A]">Heating Services</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
        >
          <ArrowUpRight className="h-6 w-6 rotate-[225deg]" />
          <span className="text-sm font-medium">Back to Categories</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {heatingServices.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-[#E85D2A] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 transition-all duration-500 group-hover:from-white/10 group-hover:to-black/20"></div>
            <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                <div className="text-white">
                  <service.icon />
                </div>
              </div>
              <h3 className="text-xl leading-tight font-bold text-white">{service.title}</h3>
              <div className="h-0.5 w-12 bg-white/40 transition-all duration-300 group-hover:w-16"></div>
              <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HomeRenovationServicesGrid = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-auto min-h-[100vh] w-full px-10 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#4285F4]">Home Renovation Services</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
        >
          <ArrowUpRight className="h-6 w-6 rotate-[225deg]" />
          <span className="text-sm font-medium">Back to Categories</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeRenovationServices.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative min-h-[200px] overflow-hidden rounded-2xl bg-[#4285F4] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 transition-all duration-500 group-hover:from-white/10 group-hover:to-black/20"></div>
            <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                <div className="text-white">
                  <service.icon />
                </div>
              </div>
              <h3 className="text-xl leading-tight font-bold text-white">{service.title}</h3>
              <div className="h-0.5 w-12 bg-white/40 transition-all duration-300 group-hover:w-16"></div>
              <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [showPlumbingServices, setShowPlumbingServices] = useState(false);
  const [showHomeRenovationServices, setShowHomeRenovationServices] = useState(false);
  const [showDrainageServices, setShowDrainageServices] = useState(false);
  const [showHeatingServices, setShowHeatingServices] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const _slideVariants = {
    initial: { x: 0 },
    slideLeft: { x: "-100%" },
    slideRight: { x: "100%" },
  };

  const handlePlumbingClick = () => {
    setShowPlumbingServices(true);
  };

  const handleHomeRenovationClick = () => {
    setShowHomeRenovationServices(true);
  };

  const handleDrainageClick = () => {
    setShowDrainageServices(true);
  };

  const handleHeatingClick = () => {
    setShowHeatingServices(true);
  };

  const handleBackClick = () => {
    setShowPlumbingServices(false);
    setShowHomeRenovationServices(false);
    setShowDrainageServices(false);
    setShowHeatingServices(false);
  };

  return (
    <section ref={ref} className="relative w-full bg-white py-24 lg:py-8">
      <div className="mx-auto flex min-h-[120vh] w-full max-w-[1400px] items-center overflow-hidden px-6 2xl:px-[2px]">
        <div className="relative w-full pt-40">
          <h2
            className="pointer-events-none absolute top-10 left-1/2 z-0 w-full -translate-x-1/2 text-center leading-none font-extrabold text-gray-200"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            WE WORK
          </h2>

          {/* Contenedor principal con swipe */}
          <div className="relative w-full">
            {/* Grid original */}
            <motion.div
              className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                transform:
                  showPlumbingServices || showHomeRenovationServices || showDrainageServices || showHeatingServices
                    ? "translateX(-110%)"
                    : "translateX(0)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
                <GridItem className="min-h-[200px] bg-[#F6BE00]" onClick={handlePlumbingClick}>
                  <TextBlock title="Plumbing Services" />
                </GridItem>
                <GridItem className="min-h-[200px]">
                  <Image
                    src="/images/plumbing-repair-2.jpg"
                    alt="Plumbing repair 2"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
                <GridItem className="min-h-[200px] bg-[#4A6B4D]" onClick={handleDrainageClick}>
                  <TextBlock title="Drainge Services" />
                </GridItem>
              </motion.div>
              <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
                <GridItem className="min-h-[416px]">
                  <Image
                    src="/images/plumbing-repair.jpg"
                    alt="Plumbing repair"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
                <GridItem className="min-h-[200px]">
                  <Image
                    src="/images/drainge-service.jpg"
                    alt="Placeholder image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
              </motion.div>
              <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
                <GridItem className="min-h-[200px]">
                  <Image
                    src="/images/home-renovations.jpg"
                    alt="Placeholder image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
                <GridItem className="min-h-[200px] bg-[#4285F4]" onClick={handleHomeRenovationClick}>
                  <TextBlock title="Home Renovations" />
                </GridItem>
                <GridItem className="min-h-[200px]">
                  <Image
                    src="/images/heating-service-2.jpg"
                    alt="Placeholder image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
              </motion.div>
              <motion.div className="col-span-1 flex flex-col gap-4" variants={itemVariants}>
                <GridItem className="min-h-[416px]">
                  <Image
                    src="/images/heating-service-1.jpg"
                    alt="Placeholder image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </GridItem>
                <GridItem className="min-h-[200px] bg-[#E85D2A]" onClick={handleHeatingClick}>
                  <TextBlock title="Heating Services" />
                </GridItem>
              </motion.div>
            </motion.div>

            {/* Grid de servicios de plomería */}
            <motion.div
              className="absolute top-0 left-0 h-auto min-h-full w-full"
              style={{
                transform: showPlumbingServices ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <PlumbingServicesGrid onBack={handleBackClick} />
            </motion.div>

            {/* Grid de servicios de renovaciones */}
            <motion.div
              className="absolute top-0 left-0 h-auto min-h-full w-full"
              style={{
                transform: showHomeRenovationServices ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <HomeRenovationServicesGrid onBack={handleBackClick} />
            </motion.div>

            {/* Grid de servicios de drenaje */}
            <motion.div
              className="absolute top-0 left-0 h-auto min-h-full w-full"
              style={{
                transform: showDrainageServices ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <DrainageServicesGrid onBack={handleBackClick} />
            </motion.div>

            {/* Grid de servicios de calefacción */}
            <motion.div
              className="absolute top-0 left-0 h-auto min-h-full w-full"
              style={{
                transform: showHeatingServices ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <HeatingServicesGrid onBack={handleBackClick} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
