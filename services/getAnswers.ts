import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "./firebase";

export const fetchAnswers = async (questionId: string, userId: string) => {
  let success = false;
  let decodedSortedAnswers;
  try {
    // Reference the specific DOCUMENT (user1 -> questionId)
    const docRef = doc(db, userId, questionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Convert the object fields into a sorted array
      const sortedAnswers = Object.keys(data)
        .sort((a, b) => Number(a) - Number(b)) // Ensure numeric order
        .map((key) => data[key]);

      // Base64 decode the answers, but not the date part
      decodedSortedAnswers = sortedAnswers.map((item) => {
        const [encodedResponse, date] = item.split(":");
        const decodedResponse = atob(encodedResponse);
        return `${decodedResponse}:${date}`;
      });
      success = true;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching answers:", error);
  } finally {
    return { success: success, decodedSortedAnswers: decodedSortedAnswers };
  }
};
