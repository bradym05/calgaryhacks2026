"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    CalendarDaysIcon,
    ArrowRightIcon,
    ChartBarIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import GraphDisplay from "@/components/GraphDisplay";
import Footer from "@/components/Footer";
import DatePicker from "@/components/DatePicker";

type Point = { date: string | Date; value: number };

function toDate(d: string | Date) {
    return d instanceof Date ? d : new Date(d);
}
function toISODate(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function SnapshotPage() {

    // TODO: Get min and max date from all data
    const { minDate, maxDate } = useMemo(() => {

        return { minDate: toISODate(new Date()), maxDate: toISODate(new Date()) };
    }, []);

    const [start, setStart] = useState(minDate);
    const [end, setEnd] = useState(maxDate);

    const invalidRange = useMemo(
        () => toDate(start).getTime() > toDate(end).getTime(),
        [start, end]
    );

    const presets = [
        {
            preset: "30d",
            days: 30
        },
        {
            preset: "60d",
            days: 60
        },
        {
            preset: "90d",
            days: 90
        },
        {
            preset: "ytd",
            days: 365
        },
    ]

    const [currentPreset, setCurrentPreset] = useState("all");

    // Update rangeo on preset changed
    useEffect(() => {
        const endDate = toDate(maxDate);
        let didSet = false;

        for (let presetInfo of presets) {
            if (presetInfo.preset == currentPreset) {
                didSet = true;
                const start = new Date(endDate);
                start.setDate(start.getDate() - presetInfo.days);
                setStart(toISODate(start));
                setEnd(maxDate);
                break;
            }
        }

        // Show all if no preset matched
        if (!didSet) {
            setStart(minDate);
            setEnd(maxDate);
        }
    }, [currentPreset])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
            {/* Nav */}
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-lg" />
                    <Link
                        href="/"
                        className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent"
                    >
                        LifeMap
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-gray-900 px-4 py-2 transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/question"
                        className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg inline-flex items-center"
                    >
                        New Check-in
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </nav>

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
                            Every graph below updates from the same date window—so you can see
                            what moves together.
                        </p>
                    </div>

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
                                min={minDate}
                                max={maxDate}
                                onChange={(e) => setStart(e.target.value)}
                            />
                            <DatePicker
                                label="End date"
                                value={end}
                                min={minDate}
                                max={maxDate}
                                onChange={(e) => setEnd(e.target.value)}
                            />

                        </div>

                        <div className="flex flex-wrap gap-3">
                            {presets.map((presetInfo) => (
                                <button
                                    onClick={() => {
                                        // Check if selected already
                                        if (currentPreset == presetInfo.preset) {
                                            // Reset
                                            setCurrentPreset("");
                                        } else {
                                            // Select
                                            setCurrentPreset(presetInfo.preset)
                                        }
                                    }}
                                    className={
                                        currentPreset == presetInfo.preset ?
                                            "bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] text-white px-4 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg hover:opacity-95" :
                                            "bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-3 rounded-xl font-semibold border-2 border-[#d4e4c8] hover:border-[#8aa66e] transition shadow-sm hover:shadow-md"
                                    }
                                >
                                    {presetInfo.days == 365 ? "YTD" : `Last ${presetInfo.days} days` }
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

                </div>
            </main>

            <Footer />
        </div>
    );
}