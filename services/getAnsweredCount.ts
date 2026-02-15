import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "./firebase";

/**
 * Returns the number of question documents present for a user.
 * Each document represents a question that has at least one saved response.
 */
export async function fetchAnsweredCount(userId: string): Promise<number> {
  try {
    const colRef = collection(db, userId);
    const snap = await getDocs(colRef);
    return (snap as any).size ?? snap.docs.length;
  } catch (err) {
    console.error("fetchAnsweredCount error:", err);
    return 0;
  }
}
