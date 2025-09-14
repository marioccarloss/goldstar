import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import app from "./firebase";

const CACHE_TTL_MS = 60 * 1000; // 60s de vida de caché
let cached: any | null = null;
let cachedAt = 0;
let inFlight: Promise<any> | null = null;

export async function getContent() {
  const now = Date.now();
  if (cached && now - cachedAt < CACHE_TTL_MS) return cached;
  if (inFlight) return inFlight;

  // Usar Firestore Lite para lecturas rápidas y con menor bundle
  const dbLite = getFirestore(app);

  inFlight = (async () => {
    const docRef = doc(dbLite, "content", "en");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      cached = docSnap.data();
      cachedAt = Date.now();
      return cached;
    } else {
      console.log("No such document!");
      return null;
    }
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}