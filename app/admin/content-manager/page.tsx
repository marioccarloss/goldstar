"use client";

import Link from "next/link";
import { Lock, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export default function ContentManagerPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Añadidos para gestión de contenido
  const [loading, setLoading] = useState(false);
  const [opStatus, setOpStatus] = useState<string | null>(null);
  const [contentPreview, setContentPreview] = useState<any | null>(null);

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
    } catch (e) {
      setAuthError("No se pudo cerrar sesión. Inténtalo de nuevo.");
    }
  };

  // Obtener vista previa del doc content/en
  const fetchContentPreview = async () => {
    setOpStatus(null);
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "content", "en"));
      if (snap.exists()) {
        setContentPreview(snap.data());
        setOpStatus("Vista previa cargada desde Firestore (content/en).");
      } else {
        setContentPreview(null);
        setOpStatus("El documento content/en no existe todavía.");
      }
    } catch (e) {
      setOpStatus("Error al obtener la vista previa: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-gray-50 p-6 pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <Link href="/admin" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="mr-1 h-4 w-4" /> Volver al panel
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cerrar sesión
          </button>
        </div>
        {/* Panel de acciones de contenido */}
        <div className="mt-8 grid gap-6 rounded-xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">Gestionar contenido</h2>
            <p className="mt-1 text-sm text-gray-600">
              Ve la información que se está mostrando en la web.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchContentPreview}
              disabled={loading}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Cargando..." : "Ver vista previa desde Firestore"}
            </button>
          </div>
          {opStatus && <p className="text-sm text-gray-700">{opStatus}</p>}
          <div className="mt-2">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Vista previa</h3>
            <pre className="max-h-96 overflow-auto rounded-md bg-gray-50 p-3 text-xs text-gray-800">
              {JSON.stringify(contentPreview, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
