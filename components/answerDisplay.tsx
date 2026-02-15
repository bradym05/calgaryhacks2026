import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { addResponseToQuestion } from "@/services/addNewAnswer";

type AnswerDisplayProps = {
  questionId: string;
};

export default function AnswerDisplay({ questionId }: AnswerDisplayProps) {
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // Reference the specific DOCUMENT (user1 -> questionId)
        const docRef = doc(db, "user1", questionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Convert the object fields into a sorted array
          const sortedAnswers = Object.keys(data)
            .sort((a, b) => Number(a) - Number(b)) // Ensure numeric order
            .map((key) => data[key]);

          setAnswers(sortedAnswers);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId]); // Add questionId as a dependency

  if (loading) return <p>Loading answers...</p>;

  // RETURN DIFFERENT DISPLAY BASED ON QUESTION TYPE
  return (
    <div>
      <h3>Answers for {questionId}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Response {index + 1}: {answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
