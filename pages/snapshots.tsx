"use client";

import { useAuth } from "@/services/AuthContext";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    CalendarDaysIcon,
    ArrowRightIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

import GraphDisplay from "@/components/GraphDisplay";
import Footer from "@/components/Footer";
import DatePicker from "@/components/DatePicker";
import questions from "@/services/questions.json";
import { fetchAnswers } from "@/services/getAnswers";
import BooleanDisplay from "@/components/BooleanDisplay";

function toDate(d: string | Date) {
    return d instanceof Date ? d : new Date(d);
}
function toISODate(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

type AnsweredQuestions = {
    question: string;
    answer: string;
    date: Date;
    type: string;
}[];

export default function SnapshotPage({startJourney}: {startJourney: () => void}) {
    const { user } = useAuth();

    const [answered, setAnswered] = useState<AnsweredQuestions>([]);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const maxDate = useMemo(() => new Date(), []);

    // Keep these as ISO date strings (what <input type="date"> uses)
    const [start, setStart] = useState<string>(() => toISODate(new Date()));
    const [end, setEnd] = useState<string>(() => toISODate(maxDate));

    // Load answers (side effects must not run during render)
    useEffect(() => {
        let cancelled = false;

        async function load() {
            const uid = user?.uid || "default";

            const collected: AnsweredQuestions = [];
            let newMinDate = new Date();

            await Promise.all(
                Object.entries(questions).map(async ([questionId, question]) => {
                    const { success, decodedSortedAnswers } = await fetchAnswers(
                        questionId,
                        uid
                    );

                    if (success && decodedSortedAnswers) {
                        for (const rawAnswerString of decodedSortedAnswers) {
                            const splitAnswer = rawAnswerString.split(":");
                            const value = splitAnswer[0];
                            const date = toDate(splitAnswer[1]);

                            collected.push({
                                question: question.question,
                                answer: value,
                                date,
                                type: question.type,
                            });

                            if (date < newMinDate) newMinDate = date;
                        }
                    }
                })
            );

            if (!cancelled) {
                setAnswered(collected);
                setMinDate(newMinDate);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [user?.uid]);

    const invalidRange = useMemo(
        () => toDate(start).getTime() > toDate(end).getTime(),
        [start, end]
    );

    const presets = [
        { preset: "30d", days: 30 },
        { preset: "60d", days: 60 },
        { preset: "90d", days: 90 },
        { preset: "ytd", days: 365 },
    ];

    const [currentPreset, setCurrentPreset] = useState("all");

    // Update range on preset changed
    useEffect(() => {
        const endDate = toDate(maxDate);
        let didSet = false;

        for (let presetInfo of presets) {
            if (presetInfo.preset == currentPreset) {
                didSet = true;
                const startDate = new Date(endDate);
                startDate.setDate(startDate.getDate() - presetInfo.days);
                setStart(toISODate(startDate));
                setEnd(toISODate(maxDate));
                break;
            }
        }

        // Show all if no preset matched
        if (!didSet) {
            setStart(toISODate(minDate));
            setEnd(toISODate(maxDate));
        }
    }, [currentPreset, minDate, maxDate]);

    const ratingQuestions = useMemo(() => {
        return Array.from(
            new Set(answered.filter((a) => a.type == "rating").map((a) => a.question))
        );
    }, [answered]);

    const booleanQuestions = useMemo(() => {
        return Array.from(
            new Set(answered.filter((a) => a.type == "trueOrFalse").map((a) => a.question))
        );
    }, [answered]);

    const freeFormQuestions = useMemo(() => {
        return Array.from(
            new Set(answered.filter((a) => a.type == "freeForm").map((a) => a.question))
        );
    }, [answered]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">


            {/* Header */}
            <header className="px-6 pt-10 pb-6 max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-[#d4e4c8] bg-white/70 backdrop-blur-sm shadow-xl p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e2]/35 via-transparent to-[#c4d9a8]/25" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#d4e4c8] shadow-sm">
                            <CalendarDaysIcon className="w-4 h-4 text-[#6b8e23] mr-2" />
                            <span className="text-sm font-medium text-[#556b2f]">
                                Snapshot View
                            </span>
                        </div>

                        <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-800">
                            Pick a date range, then compare{" "}
                            <span className="bg-gradient-to-r from-[#6b8e23] via-[#8aa66e] to-[#a8c686] bg-clip-text text-transparent">
                                multiple signals
                            </span>
                        </h1>

                        <p className="mt-3 text-lg text-gray-600 max-w-2xl leading-relaxed relative pl-6 border-l-4 border-[#8aa66e]">
                            Build your charts by answering
                            more questions
                        </p>
                    </div>
                    <button
                        onClick={startJourney}
                        className="mt-5 group relative bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] text-white px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 animate-shine" />
                        </div>

                        <span className="relative z-10 flex items-center justify-center text-lg">
                            {user ? "Continue Reflecting" : "Start Your Journey"}
                            <ArrowRightIcon className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        </span>
                    </button>

                    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#a8c686]/15 rounded-full blur-3xl" />
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#8aa66e]/12 rounded-full blur-3xl" />
                </div>
            </header>

            <main className="px-6 pb-16 max-w-7xl mx-auto">
                {/* Date range selection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-[#d4e4c8]/60">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                        <div className="flex-1 grid sm:grid-cols-2 gap-4">
                            <DatePicker
                                label="Start date"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                            />
                            <DatePicker
                                label="End date"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {presets.map((presetInfo) => (
                                <button
                                    key={presetInfo.preset}
                                    onClick={() => {
                                        if (currentPreset == presetInfo.preset) {
                                            setCurrentPreset("");
                                        } else {
                                            setCurrentPreset(presetInfo.preset);
                                        }
                                    }}
                                    className={
                                        currentPreset == presetInfo.preset
                                            ? "bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] text-white px-4 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg hover:opacity-95"
                                            : "bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-3 rounded-xl font-semibold border-2 border-[#d4e4c8] hover:border-[#8aa66e] transition shadow-sm hover:shadow-md"
                                    }
                                >
                                    {presetInfo.days == 365
                                        ? "YTD"
                                        : `Last ${presetInfo.days} days`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {invalidRange && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            Start date must be on or before end date.
                        </div>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                        <ChartBarIcon className="w-4 h-4 text-[#6b8e23]" />
                        <span className="font-mono">
                            {start} → {end}
                        </span>
                        <span>applied to all graphs</span>
                    </div>
                </div>

                {/* Graphs */}
                <div className="mt-10 space-y-10">
                    {ratingQuestions.map((q) => (
                        <GraphDisplay
                            key={q}
                            title={q}
                            data={answered
                                .filter((a) => a.question == q)
                                .map((a) => ({
                                    date: a.date,
                                    value: parseInt(a.answer, 10),
                                }))}
                            height={240}
                        />
                    ))}
                </div>

                {/* Booleans */}
                <div className="mt-10 space-y-10">
                    {booleanQuestions.map((q) => (
                        <BooleanDisplay
                            key={q}
                            title={q}
                            data={answered
                                .filter((a) => a.question == q)
                                .map((a) => ({
                                    date: a.date,
                                    value: a.answer == "true"
                                }))
                            }
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}