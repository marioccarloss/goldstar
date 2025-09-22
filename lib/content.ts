import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import app from "./firebase";

const CACHE_TTL_MS = 60 * 1000; // 60s de vida de caché
let cached: any | null = null;
let cachedAt = 0;
let inFlight: Promise<any> | null = null;

// Contenido estático de respaldo para desarrollo
const fallbackContent = {
  home: {
    hero: {
      badge: "⭐ Trusted by 1000+ Vancouver Residents",
      title: {
        l1: "Professional",
        l2: "Plumbing",
        l3: "Services"
      },
      description: "Expert plumbing solutions in Vancouver, BC. Emergency repairs, installations, and maintenance services available 24/7. Licensed, insured, and locally trusted."
    }
  }
};

export async function getContent() {
  const now = Date.now();
  if (cached && now - cachedAt < CACHE_TTL_MS) return cached;
  if (inFlight) return inFlight;

  // Usar Firestore Lite para lecturas rápidas y con menor bundle
  const dbLite = getFirestore(app);

  inFlight = (async () => {
    try {
      const docRef = doc(dbLite, "content", "en");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        cached = docSnap.data();
        cachedAt = Date.now();
        return cached;
      } else {
        console.log("No such document! Using fallback content.");
        cached = fallbackContent;
        cachedAt = Date.now();
        return cached;
      }
    } catch (error) {
      console.log("Firebase error, using fallback content:", error);
      cached = fallbackContent;
      cachedAt = Date.now();
      return cached;
    }
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

export function subscribeToContent(onData: (data: any) => void, lang: string = "en") {
  // Evita ejecutar en SSR
  if (typeof window === "undefined") {
    return () => {};
  }

  let unsubscribe: (() => void) | undefined;

  // Import dinámico para no cargar Firestore completo en SSR
  import("firebase/firestore")
    .then(({ doc, onSnapshot, getFirestore }) => {
      const db = getFirestore(app);
      const ref = doc(db, "content", lang);
      unsubscribe = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          // Actualiza la caché para que getContent refleje los últimos datos
          cached = data;
          cachedAt = Date.now();
          onData(data);
        }
      });
    })
    .catch((e) => {
      console.error("subscribeToContent error:", e);
    });

  return () => {
    if (unsubscribe) unsubscribe();
  };
}
