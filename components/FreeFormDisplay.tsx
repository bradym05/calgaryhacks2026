"use client";

import React, { useMemo, useState } from "react";
import {
    CalendarDaysIcon,
    ArrowRightIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import type { FreeFormPoint } from "@/services/analysisAgent";
import type { Question } from "@/types/questions";
import { AnalyzeAnswers } from "@/services/analysisAgent";

/**
 * A single string value captured at a point in time.
 */


export type FreeFormComparison = {
    /** AI-generated narrative comparison (you provide this; this component only displays it). */
    narrative: string;
    /** Optional structured bullets you may also want to render. */
    highlights?: string[];
};

export type FreeFormDisplayProps = {
    title: string;
    data: FreeFormPoint[];
    comparison?: FreeFormComparison;
    isLoadingComparison?: boolean;
};

function toDate(d: Date | string) {
    return d instanceof Date ? d : new Date(d);
}

function fmt(d: Date) {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function clampDateInputValue(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

/**
 * FreeFormDisplay
 * Framework UI for displaying a "string over time" + an AI-generated comparison.
 */
export default function FreeFormDisplay({
    title,
    data,
    isLoadingComparison = false,
}: FreeFormDisplayProps) {
    // Compare data
    const [comparing, setComparing] = useState(false);
    const [comparison, setComparison] = useState<string>();
    if (!comparing) {
        setComparing(true)
        AnalyzeAnswers({ question: title, answers: data }).then((r) => {
            console.log(r.output_text)
            setComparison(r.output_text)
        })
    }

    // States
    const sorted = useMemo(() => {
        return [...data]
            .map((p) => ({ ...p, date: toDate(p.date) }))
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [data]);

    const defaultStart = sorted[0]?.date ?? new Date();
    const defaultEnd = sorted[sorted.length - 1]?.date ?? new Date();

    const [start, setStart] = useState<Date>(defaultStart);
    const [end, setEnd] = useState<Date>(defaultEnd);

    const inRange = useMemo(() => {
        const s = start.getTime();
        const e = end.getTime();
        return sorted.filter((p) => {
            const t = p.date.getTime();
            return t >= Math.min(s, e) && t <= Math.max(s, e);
        });
    }, [sorted, start, end]);

    const earliest = inRange[0];
    const latest = inRange[inRange.length - 1];

    return (
        <section className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600">Comparison by Chat GPT 5 Mini</p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Timeline / list */}
                <div className="rounded-lg border border-gray-200 p-4 lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">Timeline</h3>
                        <span className="text-xs text-gray-500">
                            {inRange.length} point{inRange.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    <div className="mt-3 max-h-[320px] overflow-auto pr-2">
                        <ol className="space-y-3">
                            {inRange.map((p, idx) => (
                                <li key={`${p.date.toISOString()}-${idx}`} className="rounded-md bg-gray-50 p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="text-xs font-medium text-gray-700">
                                                {fmt(p.date)}
                                            </div>
                                            <div className="mt-1 line-clamp-3 text-sm text-gray-900">{p.value}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {inRange.length === 0 && (
                                <li className="text-sm text-gray-600">No points in this range.</li>
                            )}
                        </ol>
                    </div>
                </div>

                {/* Side-by-side earliest vs latest */}
                <div className="rounded-lg border border-gray-200 p-4 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">Earliest vs Latest</h3>
                        {earliest && latest && (
                            <div className="text-xs text-gray-500">
                                {fmt(earliest.date)} <ArrowRightIcon className="mx-1 inline h-4 w-4" />{" "}
                                {fmt(latest.date)}
                            </div>
                        )}
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="rounded-md bg-gray-50 p-3">
                            <div className="text-xs font-medium text-gray-700">
                                {earliest ? fmt(earliest.date) : "—"}
                            </div>
                            <div className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
                                {earliest?.value ?? "No value"}
                            </div>
                        </div>

                        <div className="rounded-md bg-gray-50 p-3">
                            <div className="text-xs font-medium text-gray-700">
                                {latest ? fmt(latest.date) : "—"}
                            </div>
                            <div className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
                                {latest?.value ?? "No value"}
                            </div>
                        </div>
                    </div>

                    {/* AI Comparison display */}
                    <div className="mt-4 rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2">
                            <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                            <h4 className="text-sm font-semibold text-gray-900">AI Comparison</h4>
                        </div>

                        <div className="mt-3">
                            {isLoadingComparison ? (
                                <div className="space-y-2">
                                    <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
                                    <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200" />
                                    <div className="h-4 w-9/12 animate-pulse rounded bg-gray-200" />
                                </div>
                            ) : comparison ? (
                                <>
                                    <p className="whitespace-pre-wrap text-sm text-gray-900">
                                        {comparison}
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    Loading...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}