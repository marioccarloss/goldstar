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
