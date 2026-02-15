"use client";

// app/questions/[id]/page.tsx
// Simple question page template (no input/answer fields), Next.js App Router + TailwindCSS

// TODO: get question data from a real source (e.g., API, database) using params.id
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Question } from "@/types/questions";
import questions from "@/services/questions.json";
import FreeFormQuestion from "@/components/FreeFormQuestion";

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

    useEffect(() => {
        if (router.isReady) {
            // Set id if it is a valid string
            setQuestionId(typeof router.query.id == "string" ? router.query.id : "default")
            // Check if id is a valid string
            if (typeof router.query.id == "string") {
                setQuestionId(router.query.id)
                setQuestion(questions[router.query.id as string])
            }
        }
    }, [router.isReady]);

    return question && (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-10">
                <header className="mb-8">
                    {/* Question ID */}
                    <p className="text-sm font-medium text-gray-500">
                        Question #{questionId}
                    </p>
                    {/* Main question prompt */}
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                        {question.question}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">Be honest with yourself</p>
                </header>

                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        {/* Create input component frome type */}
                        {
                            question.type == "freeForm" &&
                            <FreeFormQuestion
                                question={question.question}
                                response={response}
                                setResponse={setResponse}
                            />
                        }
                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
                        Your answer field will go here.
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        {/* SKIP BUTTON */}
                        <button
                            type="button"
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Skip
                        </button>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="button"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </section>

                <footer className="mt-8 text-xs text-gray-500">
                    Tip: You can review your previous answers from your profile later.
                </footer>
            </div>
        </main>
    );
}
