"use client";

import { addDays, format, isBefore, isSameDay, startOfWeek, subDays } from "date-fns";
import { es } from "date-fns/locale";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../lib/firebase";

// Interfaz para un documento de reserva
interface Booking {
  id: string;
  date: string; // Formato YYYY-MM-DD
  time: string; // Formato HH:mm
  // Aquí podrían ir otros detalles de la reserva como userName, userEmail, etc.
}

// Horario laboral estándar
const workHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function AdminPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMobileDay, setSelectedMobileDay] = useState<Date>(new Date());

  // Calcula el inicio y fin de la semana visible usando useMemo para evitar recálculos innecesarios
  const startOfCurrentWeek = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]);
  const endOfCurrentWeek = useMemo(() => addDays(startOfCurrentWeek, 6), [startOfCurrentWeek]);

  useEffect(() => {
    setLoading(true);
    // Creamos una consulta a Firestore para obtener las reservas de la semana visible.
    // Esto es eficiente porque solo trae los datos necesarios.
    const q = query(
      collection(db, "bookings"),
      where("date", ">=", format(startOfCurrentWeek, "yyyy-MM-dd")),
      where("date", "<=", format(endOfCurrentWeek, "yyyy-MM-dd"))
    );

    // `onSnapshot` escucha cambios en tiempo real. Si se crea una nueva reserva,
    // la vista se actualizará automáticamente.
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const bookingsData: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(bookingsData);
      setLoading(false);
    });

    // Se desuscribe del listener al desmontar el componente para evitar fugas de memoria.
    return () => unsubscribe();
  }, [startOfCurrentWeek, endOfCurrentWeek]); // Este efecto se ejecuta cada vez que cambia la semana

  const handlePrevWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    // Mantener el mismo día de la semana seleccionado en móvil al cambiar de semana
    setSelectedMobileDay((prev) => subDays(prev, 7));
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    // Mantener el mismo día de la semana seleccionado en móvil al cambiar de semana
    setSelectedMobileDay((prev) => addDays(prev, 7));
  };

  // Genera un array con los 7 días de la semana actual
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  // Función para verificar si un horario específico está reservado
  const isSlotBooked = (date: Date, time: string): boolean => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookings.some((booking) => booking.date === formattedDate && booking.time === time);
  };

  // Función para obtener la reserva de un horario específico
  const getBookingForSlot = (date: Date, time: string): Booking | undefined => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookings.find((booking) => booking.date === formattedDate && booking.time === time);
  };

  // Función para agregar una nueva reserva/bloqueo
  const handleAddBooking = async (date: Date, time: string) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      await addDoc(collection(db, "bookings"), {
        date: formattedDate,
        time,
        type: "blocked", // Tipo de reserva: "blocked" para no disponible
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al agregar reserva:", error);
    }
  };

  // Función para eliminar una reserva
  const handleRemoveBooking = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  // Función para manejar clic en una celda
  const handleSlotClick = (date: Date, time: string) => {
    const slotDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${time}`);
    const isPast = isBefore(slotDateTime, new Date());

    if (isPast) return; // No permitir modificar horarios pasados

    const existingBooking = getBookingForSlot(date, time);

    if (existingBooking) {
      // Si ya existe una reserva, eliminarla
      handleRemoveBooking(existingBooking.id);
    } else {
      // Si no existe, crear una nueva reserva
      handleAddBooking(date, time);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl">
              <Calendar className="h-8 w-8 text-yellow-500" />
              Gestión de Reservas
            </h1>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handlePrevWeek}
                className="rounded-md p-2 hover:bg-gray-100"
                aria-label="Semana anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h2 className="w-60 text-center text-lg font-semibold text-gray-800 md:w-auto md:text-xl">
                {format(startOfCurrentWeek, "d MMM", { locale: es })} -{" "}
                {format(endOfCurrentWeek, "d MMM, yyyy", { locale: es })}
              </h2>
              <button
                onClick={handleNextWeek}
                className="rounded-md p-2 hover:bg-gray-100"
                aria-label="Siguiente semana"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">Cargando reservas...</div>
          ) : (
            <>
              {/* Vista escritorio/tablet: cuadrícula semanal */}
              <div className="hidden md:grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200">
                {/* Encabezados de los días */}
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`p-2 text-center font-bold ${
                      isSameDay(day, new Date()) ? "bg-yellow-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    <p className="hidden text-sm capitalize md:block">{format(day, "eeee", { locale: es })}</p>
                    <p className="block text-sm capitalize md:hidden">{format(day, "eee", { locale: es })}</p>
                    <p className="text-lg">{format(day, "d")}</p>
                  </div>
                ))}

                {/* Contenido de los horarios */}
                {weekDays.map((day) => (
                  <div key={format(day, "yyyy-MM-dd")} className="space-y-px bg-white">
                    {workHours.map((hour) => {
                      const slotDateTime = new Date(`${format(day, "yyyy-MM-dd")}T${hour}`);
                      const isPast = isBefore(slotDateTime, new Date());
                      const booked = isSlotBooked(day, hour);

                      let slotClass = "bg-green-100 text-green-800"; // Disponible
                      if (booked) {
                        slotClass = "bg-red-200 text-red-800 cursor-not-allowed"; // Reservado
                      } else if (isPast) {
                        slotClass = "bg-gray-200 text-gray-500 cursor-not-allowed opacity-75"; // Pasado
                      }

                      return (
                        <button
                          key={hour}
                          onClick={() => handleSlotClick(day, hour)}
                          disabled={isPast}
                          className={`m-1 rounded p-2 text-center text-xs font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${slotClass} ${!isPast && !booked ? "hover:bg-yellow-100 hover:text-yellow-800" : ""}`}
                          title={booked ? "Clic para liberar horario" : "Clic para bloquear horario"}
                          aria-label={`${booked ? "Liberar" : "Bloquear"} ${hour} del ${format(day, "PPP", { locale: es })}`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            {booked && <X className="h-3 w-3" />}
                            {!booked && !isPast && <Plus className="h-3 w-3 opacity-50" />}
                            <span>{hour}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Vista móvil: selector horizontal de días + lista de horarios */}
              <div className="md:hidden">
                {/* Selector de días (scroll horizontal) */}
                <div className="sticky top-20 z-10 -mx-6 border-b bg-white/80 px-6 py-3 backdrop-blur">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {weekDays.map((day) => {
                      const isActive = isSameDay(day, selectedMobileDay);
                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => setSelectedMobileDay(day)}
                          className={`flex-shrink-0 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "border-yellow-500 bg-yellow-500 text-white shadow"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-pressed={isActive}
                          aria-label={`Seleccionar ${format(day, "PPPP", { locale: es })}`}
                        >
                          <span className="capitalize">{format(day, "eee d", { locale: es })}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lista de horarios del día seleccionado */}
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {workHours.map((hour) => {
                    const slotDateTime = new Date(`${format(selectedMobileDay, "yyyy-MM-dd")}T${hour}`);
                    const isPast = isBefore(slotDateTime, new Date());
                    const booked = isSlotBooked(selectedMobileDay, hour);

                    let base = "rounded-lg p-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500";
                    let styles = "bg-green-100 text-green-800";
                    let title = booked ? "Clic para liberar horario" : "Clic para bloquear horario";

                    if (booked) {
                      styles = "bg-red-100 text-red-800";
                    } else if (isPast) {
                      styles = "bg-gray-100 text-gray-500 opacity-70";
                      title = "Horario pasado";
                    }

                    return (
                      <button
                        key={hour}
                        onClick={() => handleSlotClick(selectedMobileDay, hour)}
                        disabled={isPast}
                        className={`${base} ${styles}`}
                        title={title}
                        aria-label={`${booked ? "Liberar" : "Bloquear"} ${hour} del ${format(
                          selectedMobileDay,
                          "PPP",
                          { locale: es }
                        )}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {booked && <X className="h-4 w-4" />}
                          {!booked && !isPast && <Plus className="h-4 w-4 opacity-60" />}
                          <span>{hour}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Leyenda rápida */}
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-200"></span> Disponible</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-200"></span> Ocupado</div>
                  <div className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-gray-200"></span> Pasado</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
