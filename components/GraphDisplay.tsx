"use client";

import React, { useMemo, useState } from "react";

type DataPoint = {
    date: string | Date;
    value: number;
};

type GraphDisplayProps = {
    title?: string;
    subtitle?: string;
    data: DataPoint[];
    valueLabel?: string;
    valueSuffix?: string; // comes after number val
    height?: number; // svg height
    className?: string;
};

function toDate(d: string | Date) {
    return d instanceof Date ? d : new Date(d);
}

function fmtShortDate(d: Date) {
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function fmtMonthYear(d: Date) {
    return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

export default function GraphDisplay({
    title,
    subtitle,
    data,
    valueLabel,
    valueSuffix="",
    height = 220,
    className,
}: GraphDisplayProps) {

    // States
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const {
        points,
        pathD,
        areaD,
        minV,
        maxV,
        first,
        last,
        changePct,
        xTicks,
        yTicks,
        hasData,
    } = useMemo(() => {
        const sorted = [...(data ?? [])]
            .map((p) => ({ date: toDate(p.date), value: p.value }))
            .filter((p) => Number.isFinite(p.value) && !Number.isNaN(p.date.getTime()))
            .sort((a, b) => a.date.getTime() - b.date.getTime());

        const hasData = sorted.length >= 2;

        const first = sorted[0];
        const last = sorted[sorted.length - 1];

        const minV = sorted.reduce((m, p) => Math.min(m, p.value), Infinity);
        const maxV = sorted.reduce((m, p) => Math.max(m, p.value), -Infinity);

        // soften extremes so flat lines still render nicely
        const range = Math.max(1e-9, maxV - minV);
        const pad = range * 0.12;
        const yMin = minV - pad;
        const yMax = maxV + pad;

        const width = 760; // internal viewBox width for responsive sclae
        const h = Math.max(160, height);
        const margin = { top: 18, right: 22, bottom: 34, left: 46 };
        const innerW = width - margin.left - margin.right;
        const innerH = h - margin.top - margin.bottom;

        const x0 = sorted[0]?.date.getTime() ?? 0;
        const x1 = sorted[sorted.length - 1]?.date.getTime() ?? 1;

        const xScale = (t: number) => {
            if (x1 === x0) return margin.left + innerW / 2;
            return margin.left + ((t - x0) / (x1 - x0)) * innerW;
        };

        const yScale = (v: number) => {
            return margin.top + (1 - (v - yMin) / (yMax - yMin)) * innerH;
        };

        const points = sorted.map((p) => ({
            x: xScale(p.date.getTime()),
            y: yScale(p.value),
            date: p.date,
            value: p.value,
        }));


        const pathD = points.length > 0
            ? points
                .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
                .join(" ")
            : "";

        const areaD = points.length > 0
            ? [
                pathD,
                `L ${points[points.length - 1].x.toFixed(2)} ${(margin.top + innerH).toFixed(2)}`,
                `L ${points[0].x.toFixed(2)} ${(margin.top + innerH).toFixed(2)}`,
                "Z",
            ].join(" ")
            : "";


        const changePct = sorted.length >= 2 && sorted[0].value !== 0
            ? ((last.value - first.value) / Math.abs(first.value)) * 100
            : null;

        // ticks
        const xTicks = sorted.length <= 1
            ? []
            : [sorted[0].date, sorted[Math.floor(sorted.length / 2)].date, sorted[sorted.length - 1].date];

        const yTicks = (() => {
            if (!Number.isFinite(minV) || !Number.isFinite(maxV)) return [];
            const steps = 4;
            const vals: number[] = [];
            for (let i = 0; i <= steps; i++) {
                vals.push(minV + ((maxV - minV) * i) / steps);
            }
            return vals;
        })();

        return {
            points,
            pathD,
            areaD,
            minV,
            maxV,
            first,
            last,
            changePct,
            xTicks,
            yTicks,
            hasData,
        };
    }, [data, height]);


    const trendText = changePct == null
        ? "—"
        : `${changePct >= 0 ? "↑" : "↓"} ${Math.abs(changePct).toFixed(0)}%`;

    return (
        <section
            className={[
                "w-full",
                "bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]",
                "px-6 py-12",
                className,
            ].join(" ")}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left */}
                    <div className="space-y-5">

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-800">
                            <span className="bg-gradient-to-r from-[#6b8e23] via-[#8aa66e] to-[#a8c686] bg-clip-text text-transparent">
                                {title}
                            </span>
                        </h2>

                        <p className="text-lg text-gray-600 max-w-xl leading-relaxed relative pl-6 border-l-4 border-[#8aa66e]">
                            {subtitle}
                        </p>

                        {/* Mini stats */}
                        <div className="flex flex-wrap gap-6 pt-2">
                            <div className="bg-white/80 backdrop-blur-sm border border-[#d4e4c8] rounded-xl px-4 py-3 shadow-sm">
                                <div className="text-xs text-gray-500">Latest</div>
                                <div className="text-xl font-bold text-[#6b8e23]">
                                    {last ? `${last.value}${valueSuffix}` : "—"}
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm border border-[#d4e4c8] rounded-xl px-4 py-3 shadow-sm">
                                <div className="text-xs text-gray-500">Trend</div>
                                <div className="text-xl font-bold text-[#6b8e23]">{trendText}</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm border border-[#d4e4c8] rounded-xl px-4 py-3 shadow-sm">
                                <div className="text-xs text-gray-500">Range</div>
                                <div className="text-xl font-bold text-gray-700">
                                    {Number.isFinite(minV) && Number.isFinite(maxV)
                                        ? `${minV.toFixed(1)}–${maxV.toFixed(1)}${valueSuffix}`
                                        : "—"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right preview card */}
                    <div className="relative">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-[#d4e4c8]/60">
                            {/* graph */}
                            <div className="space-y-3">
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-700">{valueLabel}</div>
                                        <div className="text-xs text-gray-400">
                                            {first?.date && last?.date
                                                ? `${fmtMonthYear(first.date)} → ${fmtMonthYear(last.date)}`
                                                : "Not enough data yet"}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                                            {hoverIndex == null ? "Latest" : "Selected"}
                                        </div>
                                        <div className="text-lg font-semibold text-[#6b8e23]">
                                            {hoverIndex == null
                                                ? last
                                                    ? `${last.value}${valueSuffix}`
                                                    : "—"
                                                : `${points[hoverIndex].value}${valueSuffix}`}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {hoverIndex == null
                                                ? last?.date
                                                    ? fmtShortDate(last.date)
                                                    : ""
                                                : fmtShortDate(points[hoverIndex].date)}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#d4e4c8]/60 bg-gradient-to-br from-white to-[#f8f4ed] p-3">
                                    <svg
                                        viewBox={`0 0 760 ${Math.max(160, height)}`}
                                        className="w-full h-auto"
                                        onMouseLeave={() => setHoverIndex(null)}
                                        role="img"
                                        aria-label={`${valueLabel} trend graph`}
                                    >
                                        <defs>
                                            <linearGradient id="lifemapStroke" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#6b8e23" />
                                                <stop offset="50%" stopColor="#8aa66e" />
                                                <stop offset="100%" stopColor="#a8c686" />
                                            </linearGradient>
                                            <linearGradient id="lifemapFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#a8c686" stopOpacity="0.28" />
                                                <stop offset="100%" stopColor="#a8c686" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* horizontal grid + y labels */}
                                        {yTicks.map((v, i) => {
                                            const h = Math.max(160, height);
                                            const margin = { top: 18, right: 22, bottom: 34, left: 46 };
                                            const innerH = h - margin.top - margin.bottom;

                                            const min = Number.isFinite(minV) ? minV : 0;
                                            const max = Number.isFinite(maxV) ? maxV : 1;
                                            const t = max === min ? 0 : (v - min) / (max - min);
                                            const y = margin.top + (1 - t) * innerH;

                                            return (
                                                <g key={i}>
                                                    <line
                                                        x1={46}
                                                        x2={760 - 22}
                                                        y1={y}
                                                        y2={y}
                                                        stroke="#d4e4c8"
                                                        strokeOpacity={0.55}
                                                        strokeDasharray="4 6"
                                                    />
                                                    <text
                                                        x={42}
                                                        y={y + 4}
                                                        fontSize={11}
                                                        textAnchor="end"
                                                        fill="#94a3b8"
                                                    >
                                                        {v.toFixed(0)}
                                                    </text>
                                                </g>
                                            );
                                        })}

                                        {/* x labels */}
                                        {xTicks.map((d, i) => {
                                            if (!points.length) return null;
                                            const width = 760;
                                            const h = Math.max(160, height);
                                            const margin = { top: 18, right: 22, bottom: 34, left: 46 };
                                            const innerW = width - margin.left - margin.right;

                                            const t0 = toDate(xTicks[0]).getTime();
                                            const t1 = toDate(xTicks[xTicks.length - 1]).getTime();
                                            const tt = d.getTime();
                                            const x =
                                                t1 === t0
                                                    ? margin.left + innerW / 2
                                                    : margin.left + ((tt - t0) / (t1 - t0)) * innerW;

                                            return (
                                                <text
                                                    key={i}
                                                    x={x}
                                                    y={h - 12}
                                                    fontSize={11}
                                                    textAnchor="middle"
                                                    fill="#94a3b8"
                                                >
                                                    {fmtShortDate(d)}
                                                </text>
                                            );
                                        })}

                                        {/* area + line */}
                                        {hasData && (
                                            <>
                                                <path d={areaD} fill="url(#lifemapFill)" />
                                                <path
                                                    d={pathD}
                                                    fill="none"
                                                    stroke="url(#lifemapStroke)"
                                                    strokeWidth={3.5}
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                />
                                            </>
                                        )}

                                        {/* points + hover */}
                                        {hasData && points.map((pt, i) => {
                                            const isHover = hoverIndex === i;
                                            return (
                                                <g
                                                    key={i}
                                                    onMouseEnter={() => setHoverIndex(i)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <circle
                                                        cx={pt.x}
                                                        cy={pt.y}
                                                        r={isHover ? 7 : 4.5}
                                                        fill={isHover ? "#6b8e23" : "#8aa66e"}
                                                        stroke="white"
                                                        strokeWidth={2}
                                                        opacity={0.95}
                                                    />
                                                </g>
                                            );
                                        })}

                                        {/* empty state */}
                                        {!hasData && (
                                            <g>
                                                <text
                                                    x="50%"
                                                    y="50%"
                                                    textAnchor="middle"
                                                    fontSize={14}
                                                    fill="#64748b"
                                                >
                                                    Add at least two dated values to render the graph.
                                                </text>
                                            </g>
                                        )}
                                    </svg>
                                </div>

                                {/* footer mini info */}
                                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                                    <span>
                                        {data.length} point{data.length === 1 ? "" : "s"}
                                    </span>
                                    <span className="text-gray-500">
                                        Hover a point to inspect
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

