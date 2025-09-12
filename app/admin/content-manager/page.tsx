"use client";

import Link from "next/link";
import { Lock, ChevronLeft, Edit3, Save, X, FileText, Home, Phone, Users } from "lucide-react";
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
    const pathArray = path.split('.');
    const newContent = { ...editedContent };
    let current = newContent;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) current[pathArray[i]] = {};
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    setEditedContent(newContent);
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
              <p className="mt-1 text-sm text-gray-600">
                Edita el contenido de todas las páginas desde un solo lugar.
              </p>
            </div>
            <div className="flex gap-3">
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
                    <X className="mr-1 h-4 w-4 inline" /> Cancelar
                  </button>
                  <button
                    onClick={saveContent}
                    disabled={loading}
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Save className="mr-1 h-4 w-4 inline" /> Guardar
                  </button>
                </>
              )}
            </div>
          </div>

          {opStatus && (
            <div className="rounded-md bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-800">{opStatus}</p>
            </div>
          )}

          {/* Acordeones de contenido */}
          {contentPreview && (
            <div className="rounded-xl bg-white shadow-sm overflow-hidden">
              <Accordion.Root type="single" collapsible className="w-full">
                {/* Página Home */}
                <Accordion.Item value="home" className="border-b border-gray-200">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
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
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="p-6 pt-0 space-y-4">
                      {contentPreview.home && (
                        <Accordion.Root type="single" collapsible>
                          {/* Hero Section */}
                          <Accordion.Item value="home-hero" className="border border-gray-100 rounded-lg">
                            <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                              <span className="font-medium">Sección Hero</span>
                              <span className="text-gray-400">▼</span>
                            </Accordion.Trigger>
                            <Accordion.Content className="p-4 pt-0 space-y-3">
                              {contentPreview.home.hero && Object.entries(contentPreview.home.hero).map(([key, value]) => (
                                <div key={key} className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                  {editingSection === `home.hero.${key}` ? (
                                    <textarea
                                      value={editedContent.home?.hero?.[key] || ''}
                                      onChange={(e) => handleTextEdit(`home.hero.${key}`, e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                      rows={3}
                                    />
                                  ) : (
                                    <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
                                      <span className="text-sm text-gray-800">{String(value)}</span>
                                      <button
                                        onClick={() => setEditingSection(`home.hero.${key}`)}
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
                        </Accordion.Root>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                {/* Página Services */}
                 <Accordion.Item value="services" className="border-b border-gray-200">
                   <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
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
                   <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                     <div className="p-6 pt-0 space-y-4">
                       {contentPreview.services && (
                         <Accordion.Root type="single" collapsible>
                           {/* Hero Section */}
                           <Accordion.Item value="services-hero" className="border border-gray-100 rounded-lg mb-2">
                             <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                               <span className="font-medium">Sección Hero</span>
                               <span className="text-gray-400">▼</span>
                             </Accordion.Trigger>
                             <Accordion.Content className="p-4 pt-0 space-y-3">
                               {contentPreview.services.hero && Object.entries(contentPreview.services.hero).map(([key, value]) => (
                                 <div key={key} className="space-y-2">
                                   <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                   {editingSection === `services.hero.${key}` ? (
                                     <textarea
                                       value={editedContent.services?.hero?.[key] || ''}
                                       onChange={(e) => handleTextEdit(`services.hero.${key}`, e.target.value)}
                                       className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                       rows={3}
                                     />
                                   ) : (
                                     <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
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
                           <Accordion.Item value="services-categories" className="border border-gray-100 rounded-lg">
                             <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                               <span className="font-medium">Categorías de Servicios</span>
                               <span className="text-gray-400">▼</span>
                             </Accordion.Trigger>
                             <Accordion.Content className="p-4 pt-0 space-y-3">
                               {contentPreview.services.categories && Object.entries(contentPreview.services.categories).map(([categoryKey, categoryData]) => (
                                 <div key={categoryKey} className="border border-gray-200 rounded-lg">
                                   <Accordion.Root type="single" collapsible>
                                     <Accordion.Item value={`category-${categoryKey}`}>
                                       <Accordion.Trigger className="flex w-full items-center justify-between p-3 text-left hover:bg-gray-50 rounded-t-lg">
                                         <span className="font-medium text-blue-700 capitalize">{categoryKey.replace(/([A-Z])/g, ' $1')}</span>
                                         <span className="text-gray-400">▼</span>
                                       </Accordion.Trigger>
                                       <Accordion.Content className="p-3 pt-0 space-y-3">
                                         {typeof categoryData === 'object' && categoryData !== null && (
                                           <>
                                             {/* Información de la categoría */}
                                             {Object.entries(categoryData as Record<string, any>).filter(([key]) => key !== 'services').map(([key, value]) => (
                                               <div key={key} className="space-y-2">
                                                 <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                 {editingSection === `services.categories.${categoryKey}.${key}` ? (
                                                   <textarea
                                                     value={editedContent.services?.categories?.[categoryKey]?.[key] || ''}
                                                     onChange={(e) => handleTextEdit(`services.categories.${categoryKey}.${key}`, e.target.value)}
                                                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                     rows={2}
                                                   />
                                                 ) : (
                                                   <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
                                                     <span className="text-sm text-gray-800">{String(value)}</span>
                                                     <button
                                                       onClick={() => setEditingSection(`services.categories.${categoryKey}.${key}`)}
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
                                               <div className="mt-4 pt-4 border-t border-gray-200">
                                                 <h4 className="text-sm font-semibold text-gray-800 mb-3">Servicios en esta categoría:</h4>
                                                 <div className="space-y-3">
                                                   {Object.entries((categoryData as any).services).map(([serviceKey, serviceData]) => (
                                                     <div key={serviceKey} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                       <div className="flex items-center justify-between mb-2">
                                                         <span className="font-medium text-blue-800 capitalize">{serviceKey.replace(/([A-Z])/g, ' $1')}</span>
                                                       </div>
                                                       {typeof serviceData === 'object' && serviceData !== null && Object.entries(serviceData as Record<string, any>).map(([serviceField, serviceValue]) => (
                                                         <div key={serviceField} className="space-y-2 mt-2">
                                                           <label className="text-xs font-medium text-gray-600 capitalize">{serviceField.replace(/([A-Z])/g, ' $1')}</label>
                                                           {editingSection === `services.categories.${categoryKey}.services.${serviceKey}.${serviceField}` ? (
                                                             <textarea
                                                               value={editedContent.services?.categories?.[categoryKey]?.services?.[serviceKey]?.[serviceField] || ''}
                                                               onChange={(e) => handleTextEdit(`services.categories.${categoryKey}.services.${serviceKey}.${serviceField}`, e.target.value)}
                                                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs"
                                                               rows={2}
                                                             />
                                                           ) : (
                                                             <div className="flex items-start justify-between p-2 bg-white rounded-md border">
                                                               <span className="text-xs text-gray-700">{String(serviceValue)}</span>
                                                               <button
                                                                 onClick={() => setEditingSection(`services.categories.${categoryKey}.services.${serviceKey}.${serviceField}`)}
                                                                 className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                               >
                                                                 <Edit3 className="h-3 w-3" />
                                                               </button>
                                                             </div>
                                                           )}
                                                         </div>
                                                       ))}
                                                     </div>
                                                   ))}
                                                 </div>
                                               </div>
                                             )}
                                           </>
                                         )}
                                       </Accordion.Content>
                                     </Accordion.Item>
                                   </Accordion.Root>
                                 </div>
                               ))}
                             </Accordion.Content>
                           </Accordion.Item>
                         </Accordion.Root>
                       )}
                     </div>
                   </Accordion.Content>
                 </Accordion.Item>

                {/* Página About */}
                <Accordion.Item value="about" className="border-b border-gray-200">
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
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
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="p-6 pt-0 space-y-4">
                      {contentPreview.about && (
                        <Accordion.Root type="single" collapsible>
                          {Object.entries(contentPreview.about).map(([sectionKey, sectionValue]) => (
                            <Accordion.Item key={sectionKey} value={`about-${sectionKey}`} className="border border-gray-100 rounded-lg mb-2">
                              <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                                <span className="font-medium capitalize">{sectionKey.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-gray-400">▼</span>
                              </Accordion.Trigger>
                              <Accordion.Content className="p-4 pt-0 space-y-3">
                                {typeof sectionValue === 'object' && sectionValue !== null ? (
                                  Object.entries(sectionValue as Record<string, any>).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                      {editingSection === `about.${sectionKey}.${key}` ? (
                                        <textarea
                                          value={editedContent.about?.[sectionKey]?.[key] || ''}
                                          onChange={(e) => handleTextEdit(`about.${sectionKey}.${key}`, e.target.value)}
                                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                          rows={3}
                                        />
                                      ) : (
                                        <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
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
                                    <label className="text-sm font-medium text-gray-700 capitalize">{sectionKey.replace(/([A-Z])/g, ' $1')}</label>
                                    {editingSection === `about.${sectionKey}` ? (
                                      <textarea
                                        value={editedContent.about?.[sectionKey] || ''}
                                        onChange={(e) => handleTextEdit(`about.${sectionKey}`, e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        rows={3}
                                      />
                                    ) : (
                                      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
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
                  <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
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
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="p-6 pt-0 space-y-4">
                      {contentPreview.contact && (
                        <Accordion.Root type="single" collapsible>
                          {Object.entries(contentPreview.contact).map(([sectionKey, sectionValue]) => (
                            <Accordion.Item key={sectionKey} value={`contact-${sectionKey}`} className="border border-gray-100 rounded-lg mb-2">
                              <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50">
                                <span className="font-medium capitalize">{sectionKey.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-gray-400">▼</span>
                              </Accordion.Trigger>
                              <Accordion.Content className="p-4 pt-0 space-y-3">
                                {typeof sectionValue === 'object' && sectionValue !== null ? (
                                  Object.entries(sectionValue as Record<string, any>).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                      {typeof value === 'object' && value !== null ? (
                                        <div className="pl-4 space-y-2">
                                          {Object.entries(value as Record<string, any>).map(([subKey, subValue]) => (
                                            <div key={subKey} className="space-y-2">
                                              <label className="text-xs font-medium text-gray-600 capitalize">{subKey.replace(/([A-Z])/g, ' $1')}</label>
                                              {editingSection === `contact.${sectionKey}.${key}.${subKey}` ? (
                                                <textarea
                                                  value={editedContent.contact?.[sectionKey]?.[key]?.[subKey] || ''}
                                                  onChange={(e) => handleTextEdit(`contact.${sectionKey}.${key}.${subKey}`, e.target.value)}
                                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                                  rows={2}
                                                />
                                              ) : (
                                                <div className="flex items-start justify-between p-2 bg-gray-50 rounded-md">
                                                  <span className="text-xs text-gray-800">{String(subValue)}</span>
                                                  <button
                                                    onClick={() => setEditingSection(`contact.${sectionKey}.${key}.${subKey}`)}
                                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                  >
                                                    <Edit3 className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        editingSection === `contact.${sectionKey}.${key}` ? (
                                          <textarea
                                            value={editedContent.contact?.[sectionKey]?.[key] || ''}
                                            onChange={(e) => handleTextEdit(`contact.${sectionKey}.${key}`, e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            rows={3}
                                          />
                                        ) : (
                                          <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
                                            <span className="text-sm text-gray-800">{String(value)}</span>
                                            <button
                                              onClick={() => setEditingSection(`contact.${sectionKey}.${key}`)}
                                              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                            >
                                              <Edit3 className="h-4 w-4" />
                                            </button>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 capitalize">{sectionKey.replace(/([A-Z])/g, ' $1')}</label>
                                    {editingSection === `contact.${sectionKey}` ? (
                                      <textarea
                                        value={editedContent.contact?.[sectionKey] || ''}
                                        onChange={(e) => handleTextEdit(`contact.${sectionKey}`, e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        rows={3}
                                      />
                                    ) : (
                                      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-md">
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
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay contenido disponible</h3>
              <p className="text-gray-600 mb-4">Haz clic en "Recargar" para obtener el contenido desde Firestore.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
