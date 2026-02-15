import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "./firebase";

export const addResponseToQuestion = async (
  userId: string,
  questionId: string,
  responseValue: string,
) => {
  try {
    const docRef = doc(db, userId, questionId);
    const docSnap = await getDoc(docRef);

    let nextFieldNumber = "1";

    if (docSnap.exists()) {
      const data = docSnap.data();
      const keys = Object.keys(data).map(Number);
      if (keys.length > 0) {
        nextFieldNumber = (Math.max(...keys) + 1).toString();
      }
    }

    // Using setDoc with merge: true makes it "fail-safe"
    // It creates the doc if missing, or updates the field if it exists.
    await setDoc(
      docRef,
      {
        [nextFieldNumber]: responseValue,
      },
      { merge: true },
    );

    console.log(`Added response to field ${nextFieldNumber}`);
    return nextFieldNumber;
  } catch (error) {
    console.error("Error adding response: ", error);
    throw error;
  }
};

/*
Example usage:
       <button onClick={() => addResponseToQuestion("user1", questionId, "7")}>
        Add New Answer
      </button>
    */
