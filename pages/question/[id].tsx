"use client";

// app/questions/[id]/page.tsx
// Simple question page template (no input/answer fields), Next.js App Router + TailwindCSS

// TODO: get question data from a real source (e.g., API, database) using params.id
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Question } from "@/types/questions";
import questions from "@/services/questions.json";
import FreeFormQuestion from "@/components/FreeFormQuestion";
import BooleanQuestion from "@/components/BooleanQuestion";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default function QuestionPage({ params }: PageProps) {
  // Use a try/catch or a check to ensure params exists
  const router = useRouter();

  // States
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState<Question>();
  const [questionId, setQuestionId] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  // Get question on page hydrated
  useEffect(() => {
    if (router.isReady) {
      // Set id if it is a valid string
      setQuestionId(
        typeof router.query.id == "string" ? router.query.id : "default",
      );
      // Check if id is a valid string
      if (typeof router.query.id == "string") {
        setQuestionId(router.query.id);
        setQuestion(questions[router.query.id]);
      }
    }
  }, [router.isReady]);

  // Handle submission
  function onSubmit(e: SubmitEvent) {
    // Don't refresh
    e.preventDefault()
    // Update state
    setSubmitting(true)
    // Validate response
    if (response.length > 0) {
    }
  }

  return (
    question && (
      <main className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
        <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          <header className="mb-10 text-center md:text-left">
            {/* Question ID */}
            <p className="inline-flex px-4 py-1.5 rounded-full bg-[#e8f0e2] text-[#556b2f] text-sm font-medium mb-4 border border-[#d4e4c8]/70">
              Question #{questionId}
            </p>
            {/* Main question prompt */}
            <h1 className="mt-1 text-3xl md:text-4xl font-bold text-gray-800 leading-tight tracking-tight">
              {question.question}
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Take your time • Be honest with yourself
            </p>
          </header>

          <section className="rounded-2xl md:rounded-3xl border border-[#d4e4c8]/60 bg-white/80 backdrop-blur-sm shadow-xl shadow-[#c4d9a8]/25 p-7 md:p-10">
            <form onSubmit={onSubmit}>
              {/* Create input component from type */}
              {question.type == "freeForm" && (
                <FreeFormQuestion
                  question={question.question}
                  response={response}
                  setResponse={setResponse}
                />
              )}
              {
                question.type == "trueOrFalse" && (
                  <BooleanQuestion
                    question={question.question}
                    response={response}
                    setResponse={setResponse}
                  />
                )}
              

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                {/* SKIP BUTTON */}
                <button
                  type="button"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl border border-gray-300 bg-white/90 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Skip for now
                </button>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8aa66e]/50 focus:ring-offset-2"
                >
                  {submitting ? "Submitting..." : "Save & Continue"}
                </button>
              </div>
            </form>
          </section>

          <footer className="mt-10 text-center text-sm text-gray-500/80">
            Tip: Your answers are private • You can review and update them later
            from your profile
          </footer>

        </div>

      </main>
    )
  );
}
