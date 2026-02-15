// app/questions/[id]/page.tsx
// Simple question page template (no input/answer fields), Next.js App Router + TailwindCSS

type PageProps = {
    params: { id: string };
};

export default function QuestionPage({ params }: PageProps) {
    // In a real app, you’d fetch the question by params.id
    const question = {
        id: params.id,
        title: "Question",
        prompt: "What’s one habit you’re proud of maintaining this year?",
        helperText: "Answer honestly—your response is private unless you choose to share it later.",
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-10">
                <header className="mb-8">
                    <p className="text-sm font-medium text-gray-500">
                        {question.title} • #{question.id}
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                        {question.prompt}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">{question.helperText}</p>
                </header>

                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
                        Your answer field will go here.
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Skip
                        </button>

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