"use client";

// app/questions/[id]/page.tsx
// Simple question page template (no input/answer fields), Next.js App Router + TailwindCSS

// TODO: get question data from a real source (e.g., API, database) using params.id
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Question } from "@/types/questions";
import RatingQuestion from "../../components/RatingQuestion";
import questions from "../../services/questions.json";
import FreeFormQuestion from "../../components/FreeFormQuestion";
import BooleanQuestion from "../../components/BooleanQuestion";
import AnswerDisplay from "../../components/answerDisplay";
import InsightModal from "../../components/InsightModal";
import { fetchAnsweredCount } from "../../services/getAnsweredCount";
import { addResponseToQuestion } from "@/services/addNewAnswer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/services/AuthContext";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function QuestionPage({ params }: PageProps) {
  // Use a try/catch or a check to ensure params exists
  const router = useRouter();

  const { user } = useAuth();

  // States
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState<Question>();
  const [questionId, setQuestionId] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [openedFromBack, setOpenedFromBack] = useState(false);
  const totalQuestions = Object.keys(questions).length;

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
        // router.query.id is a string but questions is typed with specific keys
        // Cast to any to avoid TS complaint here
        setQuestion((questions as any)[router.query.id]);
      }
    }
  }, [router.isReady, router.query.id]);

  // Handle submission
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    // Don't refresh
    e.preventDefault();
    // Update state
    setSubmitting(true);
    // Validate response
    if (response.trim().length > 0) {
      // Add response to database
      setSubmitting(true);
      try {
        await addResponseToQuestion(
          user?.uid || "default",
          questionId || "default",
          response.trim(),
        );
        setResponse("");
        // Navigate to next question
        const nextId = getNextQuestionId(questionId || "101");
        if (nextId === "101") {
          // route back to main page if we've looped through all questions
          router.push(`/`);
          return;
        }
        router.push(`/question/${nextId}`);
        // After saving, check how many questions the user has answered
        const answered = await fetchAnsweredCount(user?.uid || "default");
        if (answered >= totalQuestions) {
          // show insights before sending user back home
          setOpenedFromBack(false);
          setShowInsights(true);
        } else {
          // Navigate to next question
          const nextId = getNextQuestionId(questionId || "101");
          if (nextId === "101") {
            // route back to main page if we've looped through all questions
            router.push(`/`);
            return;
          }
          router.push(`/question/${nextId}`);
        }
      } catch (error) {
        console.error("Error submitting response: ", error);
      } finally {
        setSubmitting(false);
      }
    }
  }

  // Pick a random question id from the questions list, optionally excluding the current id
  function getRandomQuestionId(excludeId?: string) {
    const keys = Object.keys(questions);
    const choices = excludeId ? keys.filter((k) => k !== excludeId) : keys;
    if (choices.length === 0) return excludeId ?? keys[0];
    const idx = Math.floor(Math.random() * choices.length);
    return choices[idx];
  }

  function getNextQuestionId(currentId: string) {
    const keys = Object.keys(questions).sort((a, b) => Number(a) - Number(b));
    const currentIndex = keys.indexOf(currentId);

    if (currentIndex === -1 || currentIndex === keys.length - 1) {
      return keys[0];
    }

    return keys[currentIndex + 1];
  }

  function handleSkip() {
    const nextRandom = getRandomQuestionId(questionId);
    router.push(`/question/${nextRandom}`);
  }

  return (
    question && (
      <main className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
        {/* Back button */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <button
            type="button"
            onClick={() => {
              setOpenedFromBack(true);
              setShowInsights(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-[#d4e4c8]/60 text-gray-700 hover:bg-white hover:border-[#8aa66e]/50 transition-all duration-200 shadow-sm hover:shadow group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

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
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowHistory((s) => !s)}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#e8f0e2] text-[#556b2f] text-sm font-medium border border-[#d4e4c8]/70 hover:bg-[#e0ead0]"
            >
              {showHistory ? "Hide history" : "Show history"}
            </button>
            {/* 
            {showHistory && (
              <div className="mt-4">
                <AnswerDisplay questionId={questionId || "default"} />
              </div>
            )} */}

            <InsightModal
              questionId={questionId || "default"}
              open={showInsights}
              onClose={() => {
                setShowInsights(false);
                if (openedFromBack) router.push("/");
              }}
            />
          </div>

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
              {question.type == "trueOrFalse" && (
                <BooleanQuestion
                  question={question.question}
                  response={response}
                  setResponse={setResponse}
                />
              )}
              {question.type == "rating" && (
                <RatingQuestion
                  question={question.question}
                  response={response}
                  setResponse={setResponse}
                />
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                {/* SKIP BUTTON */}
                <button
                  type="button"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl border cursor-pointer border-gray-300 bg-white/90 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  onClick={handleSkip}
                >
                  Skip for now
                </button>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8aa66e]/50 focus:ring-offset-2
  ${
    submitting || response.length === 0
      ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:shadow-md opacity-70"
      : "bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white hover:shadow-lg hover:opacity-95 cursor-pointer"
  }`}
                  disabled={submitting || response.length === 0}
                >
                  {submitting ? "Submitting..." : "Save & Continue"}
                </button>
              </div>
            </form>
          </section>
          <div className="mt-6">
            {showHistory && (
              <AnswerDisplay questionId={questionId || "default"} />
            )}
          </div>

          <footer className="mt-10 text-center text-sm text-gray-500/80">
            Tip: Your answers are private • You can review and update them later
            from your profile
          </footer>
        </div>
      </main>
    )
  );
}
