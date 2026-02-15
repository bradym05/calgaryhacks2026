import { useEffect, useState } from "react";
import questions from "../services/questions.json";
import { fetchAnsweredCount } from "../services/getAnsweredCount";

type ProgressHeaderProps = {
    userId: string;
};

export default function ProgressHeader({ userId }: ProgressHeaderProps) {
  const [answered, setAnswered] = useState<number | null>(null);
  useEffect(() => {
    let mounted = true;
    fetchAnsweredCount(userId).then((c) => {
      if (mounted) setAnswered(c);
    });
    return () => {
      mounted = false;
    };
  }, [userId]);

  if (answered === null) return <div>Loading…</div>;
  return <div>Answered: {answered} / {Object.keys(questions).length}</div>;
}