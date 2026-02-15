"use client";

import OpenAI from "openai";
import { Question } from "@/types/questions";
import { ResponseInput } from "openai/resources/responses/responses.mjs";


const client = new OpenAI()

// Free  form answer data
export type FreeFormPoint = {
    date: Date | string;
    value: string;
};

type AnalysisInput = {
    question: string,
    answers: FreeFormPoint[]
}

// Get in-depth analysis of free form answers over time
export async function AnalyzeAnswers({ question, answers }: AnalysisInput) {
    // Generate ordered list from answers
    let inputSequence = [{
        role: "system",
        content: `
        You are a pattern analysis agent used to analyze a user's responses to free-form questions.
        Try to convey trends, sentiment, and overall difference of the responses.

        You will receive a time-ordered list of free-form answers to the SAME question over time.
        Return:
        - One concise (max 2 sentence) summary of how the answers changed over time
        - Up to 3 "highlights" as bullet points

        If the input data is empty, produce:
        - "No answers to summarize."

        Here is the question: ${question}
        `
    }]
    for (let answer of answers) {
        inputSequence.push({
            role: "user",
            content: `
            date: ${answer.date.toString()}
            answer: ${answer.value}
            `
        })
    }
    return await client.responses.create({
        model: "gpt-5-mini",
        reasoning: { effort: "low" },
        input: inputSequence as ResponseInput,
    });
}