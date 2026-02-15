"use client";

import type { QuestionProps } from "@/types/questions"
import React, { useState } from "react"

export default function FreeFormQuestion({ question, response, setResponse }: QuestionProps) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <header className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{question}</h2>
            </header>

            <div className="space-y-4">
                <label className="block">
                    <span className="sr-only">Your answer</span>
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Enter your answer"
                        rows={5}
                        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                    />
                </label>

            </div>
        </section>
    )
}