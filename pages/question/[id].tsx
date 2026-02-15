"use client";

// app/questions/[id]/page.tsx
// Simple question page template (no input/answer fields), Next.js App Router + TailwindCSS

// TODO: get question data from a real source (e.g., API, database) using params.id
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default function QuestionPage({ params }: PageProps) {
  // Use a try/catch or a check to ensure params exists
  const router = useRouter();

  const [routerQuery, setRouterQuery] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setRouterQuery(router.query);
      console.log("Router query:", router.query);
    }
  }, [router.isReady]);

  const question = {
    id: routerQuery?.id || "default",
    title: "Question",
    prompt: "What’s one habit you’re proud of maintaining this year?",
    helperText: "Answer honestly—your response is private.",
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-bold">Question {question.id}</h1>
      <p className="mt-4">{question.prompt}</p>
    </main>
  );
}
