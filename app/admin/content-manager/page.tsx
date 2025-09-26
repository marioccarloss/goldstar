"use client";

import Link from "next/link";
import { Lock, ChevronLeft, Edit3, Save, X, FileText, Home, Phone, Users, Plus, Trash2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";

export default function ContentManagerPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Añadidos para gestión de contenido
  const [loading, setLoading] = useState(false);
  const [opStatus, setOpStatus] = useState<string | null>(null);
  const [contentPreview, setContentPreview] = useState<any | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<any>({});
  
  // Estados para gestión de servicios
  const [showServiceManager, setShowServiceManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<{categoryIndex: number, serviceIndex: number} | null>(null);
  const [newCategoryForm, setNewCategoryForm] = useState({ title: "", subtitle: "", number: "" });
  const [newServiceForm, setNewServiceForm] = useState({ title: "", description: "" });
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewServiceForm, setShowNewServiceForm] = useState<number | null>(null);

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
        const data = snap.data();
        setContentPreview(data);
        setEditedContent(data);
        setOpStatus("Contenido cargado desde Firestore.");
      } else {
        setContentPreview(null);
        setOpStatus("El documento content/en no existe todavía.");
      }
    } catch (e) {
      setOpStatus("Error al obtener el contenido: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Guardar cambios en Firestore
  const saveContent = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "content", "en"), editedContent);
      setContentPreview(editedContent);
      setEditingSection(null);
      setOpStatus("Contenido guardado exitosamente.");
    } catch (e) {
      setOpStatus("Error al guardar: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar edición de texto
  const handleTextEdit = (path: string, value: string) => {
    const pathArray = path.split(".");
    const newContent = { ...editedContent };
    let current = newContent;

    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) current[pathArray[i]] = {};
      current = current[pathArray[i]];
    }

    current[pathArray[pathArray.length - 1]] = value;
    setEditedContent(newContent);
  };

  // Funciones para gestión de categorías de servicios
  const addServiceCategory = () => {
    // Validación mejorada
    if (!newCategoryForm.title.trim()) {
      setOpStatus("Error: El título de la categoría es requerido");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }
    
    if (!newCategoryForm.subtitle.trim()) {
      setOpStatus("Error: El subtítulo de la categoría es requerido");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }

    // Verificar duplicados
    const existingCategory = editedContent.services?.categories?.find(
      (cat: any) => cat.title.toLowerCase() === newCategoryForm.title.trim().toLowerCase()
    );
    
    if (existingCategory) {
      setOpStatus("Error: Ya existe una categoría con ese título");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }
    
    try {
      const newContent = { ...editedContent };
      if (!newContent.services) newContent.services = {};
      if (!newContent.services.categories) newContent.services.categories = [];
      
      const newCategory = {
        number: newCategoryForm.number || (newContent.services.categories.length + 1).toString(),
        title: newCategoryForm.title.trim(),
        subtitle: newCategoryForm.subtitle.trim()
      };
      
      newContent.services.categories.push(newCategory);
      setEditedContent(newContent);
      setNewCategoryForm({ title: "", subtitle: "", number: "" });
      setShowNewCategoryForm(false);
      setOpStatus("✅ Categoría agregada exitosamente. Recuerda guardar los cambios.");
      setTimeout(() => setOpStatus(null), 5000);
    } catch (error) {
      setOpStatus("Error: No se pudo agregar la categoría");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  const deleteServiceCategory = (categoryIndex: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría y todos sus servicios?")) return;
    
    try {
      const newContent = { ...editedContent };
      if (newContent.services?.categories) {
        // También eliminar los servicios asociados
        const categoryKey = getCategoryServiceKey(categoryIndex);
        if (newContent.services[categoryKey]) {
          delete newContent.services[categoryKey];
        }
        
        newContent.services.categories.splice(categoryIndex, 1);
        setEditedContent(newContent);
        setOpStatus("✅ Categoría y servicios asociados eliminados. Recuerda guardar los cambios.");
        setTimeout(() => setOpStatus(null), 5000);
      }
    } catch (error) {
      setOpStatus("Error: No se pudo eliminar la categoría");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  const updateServiceCategory = (categoryIndex: number, field: string, value: string) => {
    try {
      const newContent = { ...editedContent };
      if (newContent.services?.categories?.[categoryIndex]) {
        newContent.services.categories[categoryIndex][field] = value;
        setEditedContent(newContent);
      }
    } catch (error) {
      setOpStatus("Error: No se pudo actualizar la categoría");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  // Funciones para gestión de servicios individuales
  const addService = (categoryIndex: number) => {
    // Validación mejorada
    if (!newServiceForm.title.trim()) {
      setOpStatus("Error: El título del servicio es requerido");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }
    
    if (!newServiceForm.description.trim()) {
      setOpStatus("Error: La descripción del servicio es requerida");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }

    const categoryKey = getCategoryServiceKey(categoryIndex);
    
    // Verificar duplicados en la misma categoría
    const existingService = editedContent.services?.[categoryKey]?.find(
      (service: any) => service.title.toLowerCase() === newServiceForm.title.trim().toLowerCase()
    );
    
    if (existingService) {
      setOpStatus("Error: Ya existe un servicio con ese título en esta categoría");
      setTimeout(() => setOpStatus(null), 3000);
      return;
    }
    
    try {
      const newContent = { ...editedContent };
      
      if (!newContent.services) newContent.services = {};
      if (!newContent.services[categoryKey]) newContent.services[categoryKey] = [];
      
      const newService = {
        title: newServiceForm.title.trim(),
        description: newServiceForm.description.trim()
      };
      
      newContent.services[categoryKey].push(newService);
      setEditedContent(newContent);
      setNewServiceForm({ title: "", description: "" });
      setShowNewServiceForm(null);
      setOpStatus("✅ Servicio agregado exitosamente. Recuerda guardar los cambios.");
      setTimeout(() => setOpStatus(null), 5000);
    } catch (error) {
      setOpStatus("Error: No se pudo agregar el servicio");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  const deleteService = (categoryIndex: number, serviceIndex: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este servicio?")) return;
    
    try {
      const newContent = { ...editedContent };
      const categoryKey = getCategoryServiceKey(categoryIndex);
      
      if (newContent.services?.[categoryKey]) {
        newContent.services[categoryKey].splice(serviceIndex, 1);
        setEditedContent(newContent);
        setOpStatus("✅ Servicio eliminado exitosamente. Recuerda guardar los cambios.");
        setTimeout(() => setOpStatus(null), 5000);
      }
    } catch (error) {
      setOpStatus("Error: No se pudo eliminar el servicio");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  const updateService = (categoryIndex: number, serviceIndex: number, field: string, value: string) => {
    try {
      const newContent = { ...editedContent };
      const categoryKey = getCategoryServiceKey(categoryIndex);
      
      if (newContent.services?.[categoryKey]?.[serviceIndex]) {
        newContent.services[categoryKey][serviceIndex][field] = value;
        setEditedContent(newContent);
      }
    } catch (error) {
      setOpStatus("Error: No se pudo actualizar el servicio");
      setTimeout(() => setOpStatus(null), 3000);
    }
  };

  // Función auxiliar para obtener la clave de servicios por categoría
  const getCategoryServiceKey = (categoryIndex: number) => {
    const serviceKeys = ['plumbingServices', 'drainageServices', 'heatingServices', 'homeRenovationServices'];
    return serviceKeys[categoryIndex] || 'plumbingServices';
  };

  // Cargar contenido al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      fetchContentPreview();
    }
  }, [isAuthenticated]);

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
        {/* Panel de gestión de contenido */}
        <div className="mt-8 space-y-6">
          {/* Barra de acciones */}
          <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Gestionar Contenido del Sitio</h2>
              <p className="mt-1 text-sm text-gray-600">Edita el contenido de todas las páginas desde un solo lugar.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowServiceManager(!showServiceManager)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Settings className="mr-1 inline h-4 w-4" /> 
                {showServiceManager ? "Ocultar" : "Gestionar"} Servicios
              </button>
              <button
                onClick={fetchContentPreview}
                disabled={loading}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Cargando..." : "Recargar"}
              </button>
              {editingSection && (
                <>
                  <button
                    onClick={() => {
                      setEditingSection(null);
                      setEditedContent(contentPreview);
                    }}
                    className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                  >
                    <X className="mr-1 inline h-4 w-4" /> Cancelar
                  </button>
                  <button
                    onClick={saveContent}
                    disabled={loading}
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Save className="mr-1 inline h-4 w-4" /> Guardar
                  </button>
                </>
              )}
            </div>
          </div>

          {opStatus && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">{opStatus}</p>
            </div>
          )}

          {/* Service Manager */}
          {showServiceManager && contentPreview && (
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Gestión de Servicios</h2>
                    <p className="text-sm text-gray-600">Administra categorías y servicios individuales</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Gestión de Categorías */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Categorías de Servicios</h3>
                    <button
                      onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
                      className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <Plus className="mr-1 inline h-4 w-4" /> Nueva Categoría
                    </button>
                  </div>

                  {/* Formulario para nueva categoría */}
                  {showNewCategoryForm && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-3">
                      <h4 className="font-medium text-green-800">Agregar Nueva Categoría</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Título de la categoría"
                          value={newCategoryForm.title}
                          onChange={(e) => setNewCategoryForm(prev => ({ ...prev, title: e.target.value }))}
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                        <input
                          type="text"
                          placeholder="Subtítulo/descripción"
                          value={newCategoryForm.subtitle}
                          onChange={(e) => setNewCategoryForm(prev => ({ ...prev, subtitle: e.target.value }))}
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                        <input
                          type="text"
                          placeholder="Número (opcional)"
                          value={newCategoryForm.number}
                          onChange={(e) => setNewCategoryForm(prev => ({ ...prev, number: e.target.value }))}
                          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addServiceCategory}
                          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          Agregar Categoría
                        </button>
                        <button
                          onClick={() => {
                            setShowNewCategoryForm(false);
                            setNewCategoryForm({ title: "", subtitle: "", number: "" });
                          }}
                          className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lista de categorías existentes */}
                  <div className="space-y-3">
                    {contentPreview.services?.categories?.map((category: any, categoryIndex: number) => (
                      <div key={categoryIndex} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 space-y-2">
                            {editingCategory === `${categoryIndex}` ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editedContent.services?.categories?.[categoryIndex]?.title || ""}
                                  onChange={(e) => updateServiceCategory(categoryIndex, "title", e.target.value)}
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                                <input
                                  type="text"
                                  value={editedContent.services?.categories?.[categoryIndex]?.subtitle || ""}
                                  onChange={(e) => updateServiceCategory(categoryIndex, "subtitle", e.target.value)}
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                                <input
                                  type="text"
                                  value={editedContent.services?.categories?.[categoryIndex]?.number || ""}
                                  onChange={(e) => updateServiceCategory(categoryIndex, "number", e.target.value)}
                                  className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                  placeholder="Núm."
                                />
                              </div>
                            ) : (
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {category.number && `${category.number}. `}{category.title}
                                </h4>
                                <p className="text-sm text-gray-600">{category.subtitle}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            {editingCategory === `${categoryIndex}` ? (
                              <button
                                onClick={() => setEditingCategory(null)}
                                className="p-1 text-green-600 hover:text-green-800"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingCategory(`${categoryIndex}`)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteServiceCategory(categoryIndex)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Gestión de servicios de esta categoría */}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-gray-700">Servicios en esta categoría</h5>
                            <button
                              onClick={() => setShowNewServiceForm(showNewServiceForm === categoryIndex ? null : categoryIndex)}
                              className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                            >
                              <Plus className="mr-1 inline h-3 w-3" /> Agregar Servicio
                            </button>
                          </div>

                          {/* Formulario para nuevo servicio */}
                          {showNewServiceForm === categoryIndex && (
                            <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 space-y-2">
                              <input
                                type="text"
                                placeholder="Título del servicio"
                                value={newServiceForm.title}
                                onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              />
                              <textarea
                                placeholder="Descripción del servicio"
                                value={newServiceForm.description}
                                onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => addService(categoryIndex)}
                                  className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                >
                                  Agregar
                                </button>
                                <button
                                  onClick={() => {
                                    setShowNewServiceForm(null);
                                    setNewServiceForm({ title: "", description: "" });
                                  }}
                                  className="rounded-md bg-gray-500 px-3 py-1 text-xs font-medium text-white hover:bg-gray-600"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Lista de servicios */}
                          <div className="space-y-2">
                            {contentPreview.services?.[getCategoryServiceKey(categoryIndex)]?.map((service: any, serviceIndex: number) => (
                              <div key={serviceIndex} className="rounded-md border border-gray-200 bg-white p-3">
                                {editingService?.categoryIndex === categoryIndex && editingService?.serviceIndex === serviceIndex ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={editedContent.services?.[getCategoryServiceKey(categoryIndex)]?.[serviceIndex]?.title || ""}
                                      onChange={(e) => updateService(categoryIndex, serviceIndex, "title", e.target.value)}
                                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                    <textarea
                                      value={editedContent.services?.[getCategoryServiceKey(categoryIndex)]?.[serviceIndex]?.description || ""}
                                      onChange={(e) => updateService(categoryIndex, serviceIndex, "description", e.target.value)}
                                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                      rows={2}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <h6 className="font-medium text-gray-900">{service.title}</h6>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                  </div>
                                )}
                                <div className="flex justify-end gap-2 mt-2">
                                  {editingService?.categoryIndex === categoryIndex && editingService?.serviceIndex === serviceIndex ? (
                                    <button
                                      onClick={() => setEditingService(null)}
                                      className="p-1 text-green-600 hover:text-green-800"
                                    >
                                      <Save className="h-3 w-3" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => setEditingService({ categoryIndex, serviceIndex })}
                                      className="p-1 text-blue-600 hover:text-blue-800"
                                    >
                                      <Edit3 className="h-3 w-3" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteService(categoryIndex, serviceIndex)}
                                    className="p-1 text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Acordeones de contenido */}
          {contentPreview && (
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <Accordion.Root type="single" collapsible className="w-full">
                {/* Página Home */}
                <Accordion.Item value="home" className="border-b border-gray-200">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-yellow-600" />
                      <span className="text-lg font-semibold">Página Principal (Home)</span>
                    </div>
                    <motion.div
                      className="text-gray-400"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </Accordion.Trigger>
                  <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="space-y-4 p-6 pt-0">
                      {contentPreview.home && (
                        <Accordion.Root type="single" collapsible>
                          {/* Hero Section */}
                          <Accordion.Item value="home-hero" className="rounded-lg border border-gray-100">
                            <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                              <span className="font-medium">Sección Hero</span>
                              <span className="text-gray-400">▼</span>
                            </Accordion.Trigger>
                            <Accordion.Content className="space-y-3 p-4 pt-0">
                              {contentPreview.home.hero &&
                                Object.entries(contentPreview.home.hero).map(([key, value]) => {
                                  const label = key.replace(/([A-Z])/g, " $1");
                                  const pathBase = `home.hero.${key}`;
                                  const isObj = typeof value === "object" && value !== null;

                                  if (isObj) {
                                    if (Array.isArray(value)) {
                                      return (
                                        <div key={key} className="space-y-2">
                                          <label className="text-sm font-medium text-gray-700 capitalize">
                                            {label}
                                          </label>
                                          <div className="space-y-2">
                                            {value.map((item: any, idx: number) => (
                                              <div
                                                key={idx}
                                                className="flex items-start justify-between rounded-md bg-gray-50 p-3"
                                              >
                                                {editingSection === `${pathBase}.${idx}` ? (
                                                  <textarea
                                                    value={editedContent.home?.hero?.[key]?.[idx] ?? ""}
                                                    onChange={(e) =>
                                                      handleTextEdit(`${pathBase}.${idx}`, e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                    rows={2}
                                                  />
                                                ) : (
                                                  <>
                                                    <span className="text-sm text-gray-800">{String(item)}</span>
                                                    <button
                                                      onClick={() => setEditingSection(`${pathBase}.${idx}`)}
                                                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                    >
                                                      <Edit3 className="h-4 w-4" />
                                                    </button>
                                                  </>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    }

                                    // Nested object
                                    return (
                                      <div key={key} className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 capitalize">{label}</label>
                                        {Object.entries(value as Record<string, any>).map(([subKey, subVal]) => (
                                          <div key={subKey} className="space-y-1">
                                            <span className="text-xs text-gray-500 capitalize">
                                              {subKey.replace(/([A-Z])/g, " $1")}
                                            </span>
                                            {editingSection === `${pathBase}.${subKey}` ? (
                                              <textarea
                                                value={editedContent.home?.hero?.[key]?.[subKey] ?? ""}
                                                onChange={(e) =>
                                                  handleTextEdit(`${pathBase}.${subKey}`, e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                rows={2}
                                              />
                                            ) : (
                                              <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                                <span className="text-sm text-gray-800">{String(subVal)}</span>
                                                <button
                                                  onClick={() => setEditingSection(`${pathBase}.${subKey}`)}
                                                  className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                >
                                                  <Edit3 className="h-4 w-4" />
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }

                                  // Primitive values
                                  return (
                                    <div key={key} className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 capitalize">{label}</label>
                                      {editingSection === pathBase ? (
                                        <textarea
                                          value={editedContent.home?.hero?.[key] ?? ""}
                                          onChange={(e) => handleTextEdit(pathBase, e.target.value)}
                                          className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                          rows={3}
                                        />
                                      ) : (
                                        <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                          <span className="text-sm text-gray-800">{String(value)}</span>
                                          <button
                                            onClick={() => setEditingSection(pathBase)}
                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                          >
                                            <Edit3 className="h-4 w-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                            </Accordion.Content>
                          </Accordion.Item>
                        </Accordion.Root>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                {/* Página Services */}
                <Accordion.Item value="services" className="border-b border-gray-200">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-lg font-semibold">Página de Servicios</span>
                    </div>
                    <motion.div
                      className="text-gray-400"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </Accordion.Trigger>
                  <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="space-y-4 p-6 pt-0">
                      {contentPreview.services && (
                        <Accordion.Root type="single" collapsible>
                          {/* Hero Section */}
                          <Accordion.Item value="services-hero" className="mb-2 rounded-lg border border-gray-100">
                            <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                              <span className="font-medium">Sección Hero</span>
                              <span className="text-gray-400">▼</span>
                            </Accordion.Trigger>
                            <Accordion.Content className="space-y-3 p-4 pt-0">
                              {contentPreview.services.hero &&
                                Object.entries(contentPreview.services.hero).map(([key, value]) => (
                                  <div key={key} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 capitalize">
                                      {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {editingSection === `services.hero.${key}` ? (
                                      <textarea
                                        value={editedContent.services?.hero?.[key] || ""}
                                        onChange={(e) => handleTextEdit(`services.hero.${key}`, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                      />
                                    ) : (
                                      <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                        <span className="text-sm text-gray-800">{String(value)}</span>
                                        <button
                                          onClick={() => setEditingSection(`services.hero.${key}`)}
                                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </Accordion.Content>
                          </Accordion.Item>

                          {/* Categorías de Servicios */}
                          <Accordion.Item value="services-categories" className="rounded-lg border border-gray-100">
                            <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                              <span className="font-medium">Categorías de Servicios</span>
                              <span className="text-gray-400">▼</span>
                            </Accordion.Trigger>
                            <Accordion.Content className="space-y-3 p-4 pt-0">
                              {contentPreview.services.categories &&
                                Object.entries(contentPreview.services.categories).map(
                                  ([categoryKey, categoryData]) => (
                                    <div key={categoryKey} className="rounded-lg border border-gray-200">
                                      <Accordion.Root type="single" collapsible>
                                        <Accordion.Item value={`category-${categoryKey}`}>
                                          <Accordion.Trigger className="flex w-full items-center justify-between rounded-t-lg p-3 text-left hover:bg-gray-50">
                                            <span className="font-medium text-blue-700 capitalize">
                                              {categoryKey.replace(/([A-Z])/g, " $1")}
                                            </span>
                                            <span className="text-gray-400">▼</span>
                                          </Accordion.Trigger>
                                          <Accordion.Content className="space-y-3 p-3 pt-0">
                                            {typeof categoryData === "object" && categoryData !== null && (
                                              <>
                                                {/* Información de la categoría */}
                                                {Object.entries(categoryData as Record<string, any>)
                                                  .filter(([key]) => key !== "services")
                                                  .map(([key, value]) => (
                                                    <div key={key} className="space-y-2">
                                                      <label className="text-sm font-medium text-gray-700 capitalize">
                                                        {key.replace(/([A-Z])/g, " $1")}
                                                      </label>
                                                      {editingSection ===
                                                      `services.categories.${categoryKey}.${key}` ? (
                                                        <textarea
                                                          value={
                                                            editedContent.services?.categories?.[categoryKey]?.[key] ||
                                                            ""
                                                          }
                                                          onChange={(e) =>
                                                            handleTextEdit(
                                                              `services.categories.${categoryKey}.${key}`,
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                          rows={2}
                                                        />
                                                      ) : (
                                                        <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                                          <span className="text-sm text-gray-800">{String(value)}</span>
                                                          <button
                                                            onClick={() =>
                                                              setEditingSection(
                                                                `services.categories.${categoryKey}.${key}`
                                                              )
                                                            }
                                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                          >
                                                            <Edit3 className="h-4 w-4" />
                                                          </button>
                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}

                                                {/* Servicios de la categoría */}
                                                {(categoryData as any).services && (
                                                  <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <h4 className="mb-3 text-sm font-semibold text-gray-800">
                                                      Servicios en esta categoría:
                                                    </h4>
                                                    <div className="space-y-3">
                                                      {Object.entries((categoryData as any).services).map(
                                                        ([serviceKey, serviceData]) => (
                                                          <div
                                                            key={serviceKey}
                                                            className="rounded-lg border border-blue-200 bg-blue-50 p-3"
                                                          >
                                                            <div className="mb-2 flex items-center justify-between">
                                                              <span className="font-medium text-blue-800 capitalize">
                                                                {serviceKey.replace(/([A-Z])/g, " $1")}
                                                              </span>
                                                            </div>
                                                            {typeof serviceData === "object" &&
                                                              serviceData !== null &&
                                                              Object.entries(serviceData as Record<string, any>).map(
                                                                ([serviceField, serviceValue]) => (
                                                                  <div key={serviceField} className="mt-2 space-y-2">
                                                                    <label className="text-xs font-medium text-gray-600 capitalize">
                                                                      {serviceField.replace(/([A-Z])/g, " $1")}
                                                                    </label>
                                                                    {editingSection ===
                                                                    `services.categories.${categoryKey}.services.${serviceKey}.${serviceField}` ? (
                                                                      <textarea
                                                                        value={
                                                                          editedContent.services?.categories?.[
                                                                            categoryKey
                                                                          ]?.services?.[serviceKey]?.[serviceField] ||
                                                                          ""
                                                                        }
                                                                        onChange={(e) =>
                                                                          handleTextEdit(
                                                                            `services.categories.${categoryKey}.services.${serviceKey}.${serviceField}`,
                                                                            e.target.value
                                                                          )
                                                                        }
                                                                        className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                                        rows={2}
                                                                      />
                                                                    ) : (
                                                                      <div className="flex items-start justify-between rounded-md border bg-white p-2">
                                                                        <span className="text-xs text-gray-700">
                                                                          {String(serviceValue)}
                                                                        </span>
                                                                        <button
                                                                          onClick={() =>
                                                                            setEditingSection(
                                                                              `services.categories.${categoryKey}.services.${serviceKey}.${serviceField}`
                                                                            )
                                                                          }
                                                                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                                        >
                                                                          <Edit3 className="h-3 w-3" />
                                                                        </button>
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                )
                                                              )}
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                )}
                                              </>
                                            )}
                                          </Accordion.Content>
                                        </Accordion.Item>
                                      </Accordion.Root>
                                    </div>
                                  )
                                )}
                            </Accordion.Content>
                          </Accordion.Item>
                        </Accordion.Root>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                {/* Página About */}
                <Accordion.Item value="about" className="border-b border-gray-200">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-semibold">Página Acerca de</span>
                    </div>
                    <motion.div
                      className="text-gray-400"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </Accordion.Trigger>
                  <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="space-y-4 p-6 pt-0">
                      {contentPreview.about && (
                        <Accordion.Root type="single" collapsible>
                          {Object.entries(contentPreview.about).map(([sectionKey, sectionValue]) => (
                            <Accordion.Item
                              key={sectionKey}
                              value={`about-${sectionKey}`}
                              className="mb-2 rounded-lg border border-gray-100"
                            >
                              <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                                <span className="font-medium capitalize">{sectionKey.replace(/([A-Z])/g, " $1")}</span>
                                <span className="text-gray-400">▼</span>
                              </Accordion.Trigger>
                              <Accordion.Content className="space-y-3 p-4 pt-0">
                                {typeof sectionValue === "object" && sectionValue !== null ? (
                                  Object.entries(sectionValue as Record<string, any>).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                      </label>
                                      {Array.isArray(value) ? (
                                        <div className="space-y-3 pl-2">
                                          {value.length === 0 && (
                                            <div className="rounded-md bg-gray-50 p-2 text-sm text-gray-500">Sin elementos</div>
                                          )}
                                          {value.map((item: any, index: number) => (
                                            <div key={index} className="rounded-md bg-gray-50 p-2">
                                              {typeof item === "object" && item !== null ? (
                                                <div className="space-y-2">
                                                  {Object.entries(item as Record<string, any>).map(([subKey, subVal]) => (
                                                    <div key={subKey} className="space-y-1">
                                                      <label className="text-xs font-medium text-gray-600 capitalize">
                                                        {subKey.replace(/([A-Z])/g, " $1")}
                                                      </label>
                                                      {editingSection === `about.${sectionKey}.${key}.${index}.${subKey}` ? (
                                                        <textarea
                                                          value={
                                                            editedContent.about?.[sectionKey]?.[key]?.[index]?.[subKey] ?? ""
                                                          }
                                                          onChange={(e) =>
                                                            handleTextEdit(`about.${sectionKey}.${key}.${index}.${subKey}`, e.target.value)
                                                          }
                                                          className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                          rows={2}
                                                        />
                                                      ) : (
                                                        <div className="flex items-start justify-between rounded-md bg-white p-2">
                                                          <span className="text-xs text-gray-800">{String(subVal)}</span>
                                                          <button
                                                            onClick={() => setEditingSection(`about.${sectionKey}.${key}.${index}.${subKey}`)}
                                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                          >
                                                            <Edit3 className="h-3 w-3" />
                                                          </button>
                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : editingSection === `about.${sectionKey}.${key}.${index}` ? (
                                                <textarea
                                                  value={editedContent.about?.[sectionKey]?.[key]?.[index] ?? ""}
                                                  onChange={(e) => handleTextEdit(`about.${sectionKey}.${key}.${index}`, e.target.value)}
                                                  className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                  rows={2}
                                                />
                                              ) : (
                                                <div className="flex items-start justify-between rounded-md bg-white p-2">
                                                  <span className="text-xs text-gray-800">{String(item)}</span>
                                                  <button
                                                    onClick={() => setEditingSection(`about.${sectionKey}.${key}.${index}`)}
                                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                  >
                                                    <Edit3 className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ) : typeof value === "object" && value !== null ? (
                                        <div className="space-y-2 pl-4">
                                          {Object.entries(value as Record<string, any>).map(([subKey, subValue]) => (
                                            <div key={subKey} className="space-y-1">
                                              <label className="text-xs font-medium text-gray-600 capitalize">
                                                {subKey.replace(/([A-Z])/g, " $1")}
                                              </label>
                                              {editingSection === `about.${sectionKey}.${key}.${subKey}` ? (
                                                <textarea
                                                  value={editedContent.about?.[sectionKey]?.[key]?.[subKey] || ""}
                                                  onChange={(e) => handleTextEdit(`about.${sectionKey}.${key}.${subKey}`, e.target.value)}
                                                  className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                  rows={2}
                                                />
                                              ) : (
                                                <div className="flex items-start justify-between rounded-md bg-white p-2">
                                                  <span className="text-xs text-gray-800">{String(subValue)}</span>
                                                  <button
                                                    onClick={() => setEditingSection(`about.${sectionKey}.${key}.${subKey}`)}
                                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                  >
                                                    <Edit3 className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ) : editingSection === `about.${sectionKey}.${key}` ? (
                                        <textarea
                                          value={editedContent.about?.[sectionKey]?.[key] || ""}
                                          onChange={(e) => handleTextEdit(`about.${sectionKey}.${key}`, e.target.value)}
                                          className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                          rows={3}
                                        />
                                      ) : (
                                        <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                          <span className="text-sm text-gray-800">{String(value)}</span>
                                          <button
                                            onClick={() => setEditingSection(`about.${sectionKey}.${key}`)}
                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                          >
                                            <Edit3 className="h-4 w-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 capitalize">
                                      {sectionKey.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {editingSection === `about.${sectionKey}` ? (
                                      <textarea
                                        value={editedContent.about?.[sectionKey] || ""}
                                        onChange={(e) => handleTextEdit(`about.${sectionKey}`, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                      />
                                    ) : (
                                      <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                        <span className="text-sm text-gray-800">{String(sectionValue)}</span>
                                        <button
                                          onClick={() => setEditingSection(`about.${sectionKey}`)}
                                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Accordion.Content>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                {/* Página Contact */}
                <Accordion.Item value="contact" className="">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <span className="text-lg font-semibold">Página de Contacto</span>
                    </div>
                    <motion.div
                      className="text-gray-400"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </Accordion.Trigger>
                  <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="space-y-4 p-6 pt-0">
                      {contentPreview.contact && (
                        <Accordion.Root type="single" collapsible>
                          {Object.entries(contentPreview.contact).map(([sectionKey, sectionValue]) => (
                            <Accordion.Item
                              key={sectionKey}
                              value={`contact-${sectionKey}`}
                              className="mb-2 rounded-lg border border-gray-100"
                            >
                              <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                                <span className="font-medium capitalize">{sectionKey.replace(/([A-Z])/g, " $1")}</span>
                                <span className="text-gray-400">▼</span>
                              </Accordion.Trigger>
                              <Accordion.Content className="space-y-3 p-4 pt-0">
                                {typeof sectionValue === "object" && sectionValue !== null ? (
                                  Object.entries(sectionValue as Record<string, any>).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                      </label>
                                      {typeof value === "object" && value !== null ? (
                                        <div className="space-y-2 pl-4">
                                          {Object.entries(value as Record<string, any>).map(([subKey, subValue]) => (
                                            <div key={subKey} className="space-y-2">
                                              <label className="text-xs font-medium text-gray-600 capitalize">
                                                {subKey.replace(/([A-Z])/g, " $1")}
                                              </label>
                                              {editingSection === `contact.${sectionKey}.${key}.${subKey}` ? (
                                                <textarea
                                                  value={editedContent.contact?.[sectionKey]?.[key]?.[subKey] || ""}
                                                  onChange={(e) =>
                                                    handleTextEdit(
                                                      `contact.${sectionKey}.${key}.${subKey}`,
                                                      e.target.value
                                                    )
                                                  }
                                                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                                  rows={2}
                                                />
                                              ) : (
                                                <div className="flex items-start justify-between rounded-md bg-gray-50 p-2">
                                                  <span className="text-xs text-gray-800">{String(subValue)}</span>
                                                  <button
                                                    onClick={() =>
                                                      setEditingSection(`contact.${sectionKey}.${key}.${subKey}`)
                                                    }
                                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                  >
                                                    <Edit3 className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ) : editingSection === `contact.${sectionKey}.${key}` ? (
                                        <textarea
                                          value={editedContent.contact?.[sectionKey]?.[key] || ""}
                                          onChange={(e) =>
                                            handleTextEdit(`contact.${sectionKey}.${key}`, e.target.value)
                                          }
                                          className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                          rows={3}
                                        />
                                      ) : (
                                        <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                          <span className="text-sm text-gray-800">{String(value)}</span>
                                          <button
                                            onClick={() => setEditingSection(`contact.${sectionKey}.${key}`)}
                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                          >
                                            <Edit3 className="h-4 w-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 capitalize">
                                      {sectionKey.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {editingSection === `contact.${sectionKey}` ? (
                                      <textarea
                                        value={editedContent.contact?.[sectionKey] || ""}
                                        onChange={(e) => handleTextEdit(`contact.${sectionKey}`, e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                      />
                                    ) : (
                                      <div className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                                        <span className="text-sm text-gray-800">{String(sectionValue)}</span>
                                        <button
                                          onClick={() => setEditingSection(`contact.${sectionKey}`)}
                                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Accordion.Content>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          )}

          {!contentPreview && !loading && (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No hay contenido disponible</h3>
              <p className="mb-4 text-gray-600">Haz clic en "Recargar" para obtener el contenido desde Firestore.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
