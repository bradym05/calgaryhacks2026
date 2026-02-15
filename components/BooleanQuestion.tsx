import React from 'react';
import type { QuestionProps } from "@/types/questions"


export default function BooleanQuestion({question, response, setResponse}: QuestionProps) {

    return(
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-start">

            <header className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{question}</h2>
            </header>
            <div className="mt-6 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className={`rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${response === "false" ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white"}`}
                    onClick={() => setResponse("false")}
                >
                    No
                </button>

                <button
                    type="button"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${response === "true" ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white border border-gray-300 hover:bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
                    onClick={() => setResponse("true")}
                >
                    Yes
                </button>
            </div>
        </section>
    )


}
