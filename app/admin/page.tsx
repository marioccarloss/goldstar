"use client";

import Link from "next/link";
import { Lock, Calendar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminLanding() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      setAuthError("Credenciales inválidas o usuario no registrado.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {}
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">Acceso Administrador</h1>
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
                placeholder="Ingresa tu email"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </div>
            {authError && <p className="text-sm text-red-600">{authError}</p>}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-black px-4 py-2.5 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Ingresar
            </button>
            <p className="text-xs text-gray-500">Acceso protegido con Firebase Authentication.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cerrar sesión
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/admin/booking-management"
              className="flex items-center gap-3 rounded-lg border p-4 hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-semibold">Reservation Management</p>
                <p className="text-sm text-gray-600">Block and release schedules</p>
              </div>
            </Link>
            <Link
              href="/admin/content-manager"
              className="flex items-center gap-3 rounded-lg border p-4 hover:bg-gray-50"
            >
              <FileText className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-semibold">Content Manager</p>
                <p className="text-sm text-gray-600">Administrar contenido del sitio</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
