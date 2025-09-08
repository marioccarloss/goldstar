"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Home,
  Mail,
  Phone,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { Button } from "../ui/button";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  comments: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  plumberName?: string;
}

interface BookingManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: (booking: BookingData) => void;
}

// Datos de servicios de plomería
const plumbingServices = [
  {
    title: "Repiping",
    description: "Complete pipe replacement and installation services",
  },
  {
    title: "Hot Water Tank",
    description: "Water heater repair and installation",
  },
  {
    title: "Emergency Plumbing",
    description: "24/7 emergency plumbing services",
  },
  {
    title: "Water Main Repair",
    description: "Main water line repair and replacement",
  },
  {
    title: "Leaks Detection",
    description: "Professional leak detection and repair",
  },
  {
    title: "Plumbing Maintenance",
    description: "Regular maintenance and inspection",
  },
  {
    title: "Shower Repair",
    description: "Shower installation and repair services",
  },
  {
    title: "Faucet Repair",
    description: "Faucet repair and replacement",
  },
  {
    title: "Toilet Repairs",
    description: "Toilet repair and installation services",
  },
];

// Datos de servicios de drenaje
const drainageServices = [
  {
    title: "Drain Tile System",
    description: "Professional drain tile installation and repair services",
  },
  {
    title: "Drain Cleaning",
    description: "High-pressure drain cleaning and unclogging",
  },
  {
    title: "Drainage Sewer Installation",
    description: "Complete sewer line installation and replacement",
  },
  {
    title: "Drainage Repair",
    description: "Expert drainage system repair and maintenance",
  },
  {
    title: "Hydro Jet Drain Maintenance",
    description: "Advanced hydro jetting for drain maintenance",
  },
  {
    title: "Trenchless Pipe Repair",
    description: "Modern trenchless pipe repair technology",
  },
  {
    title: "Sewer Inspection",
    description: "Professional sewer line inspection services",
  },
];

// Datos de servicios de calefacción
const heatingServices = [
  {
    title: "Boiler Installation",
    description: "Professional boiler installation and setup services",
  },
  {
    title: "Boiler Maintenance",
    description: "Regular boiler maintenance and servicing",
  },
  {
    title: "Boiler Repair",
    description: "Expert boiler repair and troubleshooting",
  },
  {
    title: "Radiator Services",
    description: "Radiator installation, repair, and maintenance",
  },
  {
    title: "Thermostat Installation",
    description: "Smart thermostat installation and programming",
  },
  {
    title: "Heat Pump Services",
    description: "Heat pump installation and maintenance",
  },
  {
    title: "Furnace Services",
    description: "Complete furnace installation and repair",
  },
];

// Datos de servicios de renovaciones
const homeRenovationServices = [
  {
    title: "Bathroom Renovations",
    description: "Complete bathroom remodeling and renovation services",
  },
  {
    title: "Kitchen Renovations",
    description: "Full kitchen design and renovation solutions",
  },
  {
    title: "Flooring Installation",
    description: "Professional flooring installation and replacement",
  },
  {
    title: "Tile Installation",
    description: "Expert tile installation for all areas",
  },
  {
    title: "Painting Services",
    description: "Interior and exterior painting services",
  },
  {
    title: "Cabinet Installation",
    description: "Custom cabinet design and installation",
  },
];

const SERVICE_CATEGORIES = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    services: plumbingServices,
  },
  {
    id: "drainage",
    name: "Drainage",
    icon: Droplets,
    color: "bg-green-50 border-green-200 text-green-700",
    services: drainageServices,
  },
  {
    id: "heating",
    name: "Heating",
    icon: AlertTriangle,
    color: "bg-red-50 border-red-200 text-red-700",
    services: heatingServices,
  },
  {
    id: "renovation",
    name: "Home Renovation",
    icon: Home,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    services: homeRenovationServices,
  },
];

const PLUMBERS = [
  { id: "john", name: "John Smith", specialty: "Emergency & Repairs" },
  { id: "mike", name: "Mike Johnson", specialty: "Renovations" },
  { id: "sarah", name: "Sarah Wilson", specialty: "Installations" },
];

export const BookingManager = ({ isOpen, onClose, onBookingComplete }: BookingManagerProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    timeSlot: "",
    comments: "",
  });

  // Load available time slots from Firebase for a given date
  const loadAvailableSlots = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const q = query(collection(db, "availability"), where("date", "==", dateString), where("isBooked", "==", false));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const slots: TimeSlot[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const plumber = PLUMBERS.find((p) => p.name === data.plumber) || PLUMBERS[0];
          slots.push({
            id: doc.id,
            time: data.time,
            available: !data.isBooked,
            plumberName: plumber.name,
          });
        });
        // Sort client-side by time (HH:mm)
        const toMinutes = (t: string) => {
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };
        slots.sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
        setAvailableSlots(slots);
      },
      (error) => {
        console.error("Error al cargar horarios disponibles:", error);
        // Fallback: limpiar o mantener el estado actual
        setAvailableSlots([]);
      }
    );

    return unsubscribe;
  };

  // Update available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const unsubscribe = loadAvailableSlots(selectedDate);
      return () => unsubscribe();
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate]);

  // Get days in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setBookingData((prev) => ({ ...prev, date: date.toISOString().split("T")[0] }));
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot.id);
    setBookingData((prev) => ({ ...prev, timeSlot: `${slot.time} - ${slot.plumberName}` }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookingComplete?.(bookingData);
    onClose();
    // Reset form
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTimeSlot("");
    setBookingData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      timeSlot: "",
      comments: "",
    });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.service !== "";
      case 2:
        return selectedDate !== null && selectedTimeSlot !== "";
      case 3:
        return bookingData.name && bookingData.phone;
      default:
        return false;
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex h-[95vh] w-full max-w-4xl flex-col rounded-2xl bg-[#f6be00] shadow-2xl"
      >
        {/* Header */}
        <div className="flex-shrink-0 rounded-t-2xl border-b border-black/10 bg-[#f6be00] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-bold text-black">Book Your Service</h2>
            </div>
            <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-black/10">
              <X className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step <= currentStep ? "bg-black text-[#f6be00]" : "bg-black/20 text-black/50"}`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 3 && <div className={`mx-2 h-0.5 w-12 ${step < currentStep ? "bg-black" : "bg-black/20"}`} />}
              </div>
            ))}
          </div>

          <div className="mt-2 text-center text-sm text-black/70">
            {currentStep === 1 && "Select Service"}
            {currentStep === 2 && "Choose Date & Time"}
            {currentStep === 3 && "Contact Details"}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="mb-4 text-xl font-semibold text-black">What service do you need?</h3>
                <div className="space-y-6">
                  {SERVICE_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center gap-2 text-lg font-bold text-black">
                          <IconComponent className="h-5 w-5" />
                          {category.name}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.services.map((service, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (bookingData.service === service.title) {
                                  setBookingData((prev) => ({ ...prev, service: "" }));
                                } else {
                                  setBookingData((prev) => ({ ...prev, service: service.title }));
                                }
                              }}
                              className={`inline-flex w-auto items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${bookingData.service === service.title ? "border-black bg-white text-black shadow-lg" : "border-black/30 text-black hover:border-black/50"}`}
                            >
                              <span>{service.title}</span>
                              {bookingData.service === service.title && <X className="h-3 w-3" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="mb-4 text-xl font-semibold text-black">When would you like us to come?</h3>

                {/* Calendar Header */}
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="rounded-full p-2 hover:bg-black/10"
                  >
                    <ChevronLeft className="h-5 w-5 text-black" />
                  </button>
                  <h4 className="text-lg font-medium text-black">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="rounded-full p-2 hover:bg-black/10"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-black/70">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mb-6 grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    if (!date) {
                      return <div key={index} className="p-2" />;
                    }

                    const isToday = date.toDateString() === new Date().toDateString();
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => !isPast && handleDateSelect(date)}
                        disabled={isPast}
                        className={`rounded-lg p-2 text-sm transition-all ${isPast ? "cursor-not-allowed text-black/30" : isSelected ? "bg-black text-[#f6be00]" : isToday ? "bg-white text-black hover:bg-gray-100" : "text-black hover:bg-black/10"}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-black">
                      Available times for {selectedDate.toLocaleDateString()}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => slot.available && handleTimeSlotSelect(slot)}
                          disabled={!slot.available}
                          className={`rounded-2xl border-2 p-4 text-left transition-all ${!slot.available ? "cursor-not-allowed border-black/20 bg-black/5 text-black/40" : selectedTimeSlot === slot.id ? "border-black bg-white text-black shadow-lg" : "border-black/30 text-black hover:border-black/50 hover:shadow-sm"}`}
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{slot.time}</span>
                          </div>
                          {slot.available && slot.plumberName && (
                            <div className="text-sm text-black/70">with {slot.plumberName}</div>
                          )}
                          {!slot.available && <div className="text-sm text-black/40">Unavailable</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="mb-4 text-xl font-semibold text-black">Contact Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-black">
                        <User className="mr-1 inline h-4 w-4" />
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12 w-full rounded-2xl border-2 border-black/30 bg-transparent px-4 text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-black">
                        <Phone className="mr-1 inline h-4 w-4" />
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-12 w-full rounded-2xl border-2 border-black/30 bg-transparent px-4 text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                        placeholder="+1 (604) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-black">
                      <Mail className="mr-1 inline h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-2xl border-2 border-black/30 bg-transparent px-4 text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="comments" className="mb-2 block text-sm font-medium text-black">
                      Additional Comments
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={bookingData.comments}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full resize-none rounded-2xl border-2 border-black/30 bg-transparent px-4 py-3 text-black placeholder-black/60 transition-all duration-300 hover:border-black/50 focus:border-black focus:ring-0 focus:outline-none"
                      placeholder="Please describe the issue or any specific requirements..."
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Fixed Action Buttons */}
        <div className="flex-shrink-0 rounded-b-2xl border-t border-black/10 bg-[#f6be00] p-6">
          <div className="flex justify-between">
            <Button
              onClick={currentStep === 1 ? onClose : prevStep}
              className="group relative h-12 overflow-hidden rounded-2xl bg-white px-6 text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-100/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-gray-200/30"></div>
              <div className="relative z-10 flex items-center justify-center">
                <div className="font-bold transition-transform duration-300 group-hover:translate-x-1">
                  {currentStep === 1 ? "Cancel" : "Back"}
                </div>
              </div>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="group relative h-12 overflow-hidden rounded-2xl bg-[#00b5e2] px-6 text-black shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-[#0099cc] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-600/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-blue-700/30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="flex items-center font-bold transition-transform duration-300 group-hover:translate-x-1">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                </div>
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="group relative h-12 overflow-hidden rounded-2xl bg-green-600 px-6 text-white shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-green-700 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-green-700/20 transition-all duration-500 group-hover:from-white/20 group-hover:to-green-800/30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="flex items-center font-bold transition-transform duration-300 group-hover:translate-x-1">
                    Confirm Booking
                    <CheckCircle className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                </div>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
