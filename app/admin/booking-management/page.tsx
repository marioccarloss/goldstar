"use client";

import { addDays, format, isBefore, isSameDay, startOfWeek, subDays } from "date-fns";
import { es } from "date-fns/locale";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Calendar, ChevronLeft, ChevronRight, Lock, Plus, X, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import Link from "next/link";

// Interfaz para un documento de reserva
interface Booking {
  id: string;
  date: string; // Formato YYYY-MM-DD
  time: string; // Formato HH:mm
  // Aquí podrían ir otros detalles de la reserva como userName, userEmail, etc.
}

// Standard working hours
const workHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// Authentication via Firebase Auth (Email and password)

export default function AdminPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMobileDay, setSelectedMobileDay] = useState<Date>(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ date: Date; time: string; booked: boolean } | null>(null);
  const [pendingSlots, setPendingSlots] = useState<Set<string>>(new Set());
  const [banner, setBanner] = useState<string | null>(null);

  // Estado de autenticación sencillo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  //// Suscribirnos al estado de autenticación de Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      setIsAuthenticated(!!user);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setAuthError("Invalid credentials or user not registered.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {}
  };

  // Calcula el inicio y fin de la semana visible usando useMemo para evitar recálculos innecesarios
  const startOfCurrentWeek = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]);
  const endOfCurrentWeek = useMemo(() => addDays(startOfCurrentWeek, 6), [startOfCurrentWeek]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Suscripción a Firestore para la semana visible
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "bookings"),
      where("date", ">=", format(startOfCurrentWeek, "yyyy-MM-dd")),
      where("date", "<=", format(endOfCurrentWeek, "yyyy-MM-dd"))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const bookingsData: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [startOfCurrentWeek, endOfCurrentWeek, isAuthenticated]);

  const handlePrevWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    setSelectedMobileDay((prev) => subDays(prev, 7));
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    setSelectedMobileDay((prev) => addDays(prev, 7));
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const isSlotBooked = (date: Date, time: string): boolean => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookings.some((booking) => booking.date === formattedDate && booking.time === time);
  };

  const getBookingForSlot = (date: Date, time: string): Booking | undefined => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookings.find((booking) => booking.date === formattedDate && booking.time === time);
  };

  const slotKey = (date: Date, time: string) => `${format(date, "yyyy-MM-dd")}_${time}`;

  const performToggle = async (date: Date, time: string, existingBookingParam?: Booking | undefined) => {
    const existing = existingBookingParam ?? getBookingForSlot(date, time);
    const key = slotKey(date, time);
    setPendingSlots((prev) => new Set(prev).add(key));
    try {
      if (existing) {
        await handleRemoveBooking(existing.id);
        setBanner("Flexible schedule");
      } else {
        await handleAddBooking(date, time);
        setBanner("Blocked schedule");
      }
    } catch (e) {
      console.error("Error al alternar reserva:", e);
      setBanner("No se pudo completar la acción");
    } finally {
      setPendingSlots((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      setTimeout(() => setBanner(null), 2500);
    }
  };

  const handleAddBooking = async (date: Date, time: string) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      await addDoc(collection(db, "bookings"), {
        date: formattedDate,
        time,
        type: "blocked",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al agregar reserva:", error);
    }
  };

  const handleRemoveBooking = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  const handleSlotClick = (date: Date, time: string) => {
    const slotDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${time}`);
    const isPast = isBefore(slotDateTime, new Date());

    if (isPast) return;

    const existingBooking = getBookingForSlot(date, time);

    if (isMobile) {
      setConfirmAction({ date, time, booked: !!existingBooking });
      return;
    }

    void performToggle(date, time, existingBooking);
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">Administrator Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            {authError && <p className="text-sm text-red-600">{authError}</p>}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-black px-4 py-2.5 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Sign In
            </button>
            <p className="text-xs text-gray-500">Access protected with Firebase Authentication.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-40 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4">
            <Link href="/admin" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ChevronLeft className="mr-1 h-4 w-4" /> Volver al panel
            </Link>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
              <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl">
                <Calendar className="h-8 w-8 text-yellow-500" />
                Reservation management
              </h1>
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handlePrevWeek}
                  className="rounded-md p-2 hover:bg-gray-100"
                  aria-label="Previous week"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h2 className="w-60 text-center text-lg font-semibold text-gray-800 md:w-auto md:text-xl">
                  {format(startOfCurrentWeek, "d MMM", { locale: es })} -{" "}
                  {format(endOfCurrentWeek, "d MMM, yyyy", { locale: es })}
                </h2>
                <button onClick={handleNextWeek} className="rounded-md p-2 hover:bg-gray-100" aria-label="Next week">
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={handleLogout}
                  className="ml-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-10 text-center text-gray-500">Loading reservations...</div>
            ) : (
              <>
                {/* Vista escritorio/tablet: cuadrícula semanal */}
                <div className="hidden grid-cols-7 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 md:grid">
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
                        const pending = pendingSlots.has(slotKey(day, hour));

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
                            disabled={isPast || pending}
                            className={`m-1 rounded p-2 text-center text-xs font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${slotClass} ${!isPast && !booked ? "hover:bg-yellow-100 hover:text-yellow-800" : ""} ${pending ? "opacity-70" : ""}`}
                            title={booked ? "Click to release time slot" : "Click to block time slot"}
                            aria-label={`${booked ? "Release" : "Block"} ${hour} on ${format(day, "PPP", { locale: es })}`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {pending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <>
                                  {booked && <X className="h-3 w-3" />}
                                  {!booked && !isPast && <Plus className="h-3 w-3 opacity-50" />}
                                </>
                              )}
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
                    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
                      {weekDays.map((day) => {
                        const isToday = isSameDay(day, new Date());
                        const isSelected = isSameDay(day, selectedMobileDay);
                        const dayBookedCount = workHours.filter((h) => isSlotBooked(day, h)).length;
                        return (
                          <button
                            key={day.toISOString()}
                            onClick={() => setSelectedMobileDay(day)}
                            className={`flex min-w-[60px] flex-col items-center rounded-xl px-3 py-2 text-sm transition-all ${
                              isSelected
                                ? "bg-black text-yellow-400 shadow"
                                : isToday
                                  ? "bg-yellow-50 text-black"
                                  : "bg-white text-black hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-[10px] leading-3 capitalize">
                              {format(day, "eee", { locale: es })}
                            </span>
                            <span className="text-base leading-5 font-semibold">{format(day, "d")}</span>
                            <span className="mt-1 rounded-full bg-gray-100 px-2 text-[10px] text-gray-700">
                              {dayBookedCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lista de horarios del día seleccionado */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {workHours.map((hour) => {
                      const slotDateTime = new Date(`${format(selectedMobileDay, "yyyy-MM-dd")}T${hour}`);
                      const isPast = isBefore(slotDateTime, new Date());
                      const booked = isSlotBooked(selectedMobileDay, hour);
                      const pending = pendingSlots.has(slotKey(selectedMobileDay, hour));

                      return (
                        <button
                          key={hour}
                          onClick={() => handleSlotClick(selectedMobileDay, hour)}
                          disabled={isPast || pending}
                          className={`rounded-2xl border-2 p-4 text-center text-sm transition-all ${
                            booked
                              ? "cursor-not-allowed border-red-300 bg-red-100 text-red-700"
                              : isPast
                                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
                                : "border-black/30 text-black hover:border-black/50 active:scale-[0.98]"
                          } ${pending ? "opacity-70" : ""}`}
                          aria-label={`${booked ? "Release" : "Block"} ${hour} on ${format(selectedMobileDay, "PPP", { locale: es })}`}
                          title={booked ? "Click to release time slot" : "Click to block time slot"}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {pending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>{booked ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 opacity-50" />}</>
                            )}
                            <span className="font-medium">{hour}</span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {booked ? "Reserved" : isPast ? "Past" : "Available"}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Leyenda rápida */}
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
                    <div className="rounded-lg bg-green-100 p-2">Available</div>
                    <div className="rounded-lg bg-red-200 p-2">Reserved</div>
                    <div className="rounded-lg bg-gray-200 p-2">Past</div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleLogout}
                      className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {banner && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black px-4 py-2 text-xs font-medium text-white shadow-lg">
          {banner}
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 md:items-center">
          <div className="w-full rounded-2xl bg-white p-5 shadow-xl md:mx-auto md:max-w-sm">
            <h3 className="mb-2 text-lg font-semibold">
              {confirmAction.booked ? "Release Time Slot" : "Block Time Slot"}
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              {confirmAction.booked
                ? "Are you sure you want to release this time slot?"
                : "Are you sure you want to block this time slot?"}
              <br />
              <span className="font-medium text-gray-900">
                {format(confirmAction.date, "PPP", { locale: es })} — {confirmAction.time}
              </span>
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  void performToggle(confirmAction.date, confirmAction.time);
                  setConfirmAction(null);
                }}
                className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
