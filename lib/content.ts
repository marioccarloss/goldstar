import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getContent() {
  const docRef = doc(db, "content", "en");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}