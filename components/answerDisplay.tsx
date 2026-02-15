import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { addResponseToQuestion } from "@/services/addNewAnswer";
import { fetchAnswers } from "@/services/getAnswers";
import { useAuth } from "@/services/AuthContext";

type AnswerDisplayProps = {
  questionId: string;
};

export default function AnswerDisplay({ questionId }: AnswerDisplayProps) {
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchAnswers(questionId, user?.uid || "default").then(({ success, decodedSortedAnswers }) => {
      if (decodedSortedAnswers && success) {
        setAnswers(decodedSortedAnswers);
      }
    });

    setLoading(false);
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
