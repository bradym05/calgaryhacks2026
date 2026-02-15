"use client";

import React, { useMemo, useRef, useState } from "react";

export type BooleanPoint = {
    date: Date;
    value: boolean;
};

type Props = {
    title: string;
    data: BooleanPoint[];
    height?: number;

    // Optional overrides
    trueLabel?: string;
    falseLabel?: string;
    trueColorClass?: string;  // Tailwind class for badges (e.g. "bg-emerald-600")
    falseColorClass?: string; // Tailwind class for badges
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function formatDate(d: Date) {
    // Simple YYYY-MM-DD; adjust to your preference
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function BooleanDisplay({
    title,
    data,
    height = 240,
    trueLabel = "True",
    falseLabel = "False",
    trueColorClass = "bg-emerald-600",
    falseColorClass = "bg-rose-600",
}: Props) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const sorted = useMemo(() => {
        return [...data]
            .filter((p) => p?.date instanceof Date && !Number.isNaN(p.date.getTime()))
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [data]);

    const stats = useMemo(() => {
        if (sorted.length === 0) {
            return { pctTrue: 0, last: null as null | BooleanPoint };
        }
        const trueCount = sorted.reduce((acc, p) => acc + (p.value ? 1 : 0), 0);
        return {
            pctTrue: Math.round((trueCount / sorted.length) * 100),
            last: sorted[sorted.length - 1],
        };
    }, [sorted]);

    const domain = useMemo(() => {
        if (sorted.length === 0) return null;
        const minT = sorted[0].date.getTime();
        const maxT = sorted[sorted.length - 1].date.getTime();
        // If all on same timestamp/day, expand domain slightly to avoid divide-by-zero
        const safeMaxT = maxT === minT ? minT + 24 * 60 * 60 * 1000 : maxT;
        return { minT, maxT: safeMaxT };
    }, [sorted]);

    // Layout
    const W = 1000; // internal viewBox width
    const H = Math.max(160, height);
    const pad = { l: 48, r: 18, t: 18, b: 32 };
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;

    const yFor = (v: boolean) => {
        // true at top, false at bottom
        return pad.t + (v ? 0.1 : 0.9) * innerH;
    };

    const xForTime = (t: number) => {
        if (!domain) return pad.l;
        const u = (t - domain.minT) / (domain.maxT - domain.minT);
        return pad.l + clamp(u, 0, 1) * innerW;
    };

    // Build a step path
    const pathD = useMemo(() => {
        if (!domain || sorted.length === 0) return "";
        const pts = sorted.map((p) => ({
            x: xForTime(p.date.getTime()),
            y: yFor(p.value),
            raw: p,
        }));

        // Step path: M p0; for each next: H next.x, V next.y
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
            d += ` H ${pts[i].x} V ${pts[i].y}`;
        }
        return d;
    }, [domain, sorted]); // xForTime/yFor are stable via closure values above

    // Tooltip hover
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const hover = useMemo(() => {
        if (hoverIndex == null || sorted.length === 0) return null;
        const p = sorted[hoverIndex];
        return {
            point: p,
            x: xForTime(p.date.getTime()),
            y: yFor(p.value),
        };
    }, [hoverIndex, sorted, domain]);

    function onMouseMove(e: React.MouseEvent<SVGSVGElement>) {
        if (!svgRef.current || !domain || sorted.length === 0) return;

        const rect = svgRef.current.getBoundingClientRect();
        const px = e.clientX - rect.left;

        // Convert screen px -> viewBox x
        const viewX = (px / rect.width) * W;

        // Find nearest point by x
        let bestI = 0;
        let bestDist = Infinity;
        for (let i = 0; i < sorted.length; i++) {
            const x = xForTime(sorted[i].date.getTime());
            const dist = Math.abs(x - viewX);
            if (dist < bestDist) {
                bestDist = dist;
                bestI = i;
            }
        }
        setHoverIndex(bestI);
    }

    function onMouseLeave() {
        setHoverIndex(null);
    }

    const startLabel = sorted.length ? formatDate(sorted[0].date) : "";
    const endLabel = sorted.length ? formatDate(sorted[sorted.length - 1].date) : "";

    return (
        <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-[#d4e4c8]/60">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
                    <div className="mt-1 text-sm text-gray-500 font-mono">
                        {sorted.length ? `${startLabel} → ${endLabel}` : "No data in range"}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-xs text-gray-500">True rate</div>
                        <div className="text-sm font-semibold text-gray-800">{stats.pctTrue}%</div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-gray-500">Latest</div>
                        <div className="mt-0.5">
                            {stats.last ? (
                                <span
                                    className={[
                                        "inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold text-white",
                                        stats.last.value ? trueColorClass : falseColorClass,
                                    ].join(" ")}
                                >
                                    {stats.last.value ? trueLabel : falseLabel}
                                </span>
                            ) : (
                                <span className="text-sm text-gray-400">—</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full h-auto"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                >
                    {/* Background grid */}
                    <rect
                        x={pad.l}
                        y={pad.t}
                        width={innerW}
                        height={innerH}
                        rx={18}
                        fill="rgba(255,255,255,0.6)"
                        stroke="rgba(212,228,200,0.9)"
                    />

                    {/* Y labels */}
                    <text x={16} y={yFor(true)} fontSize="12" fill="#6b7280" dominantBaseline="middle">
                        {trueLabel}
                    </text>
                    <text x={16} y={yFor(false)} fontSize="12" fill="#6b7280" dominantBaseline="middle">
                        {falseLabel}
                    </text>

                    {/* Mid guide */}
                    <line
                        x1={pad.l}
                        x2={pad.l + innerW}
                        y1={pad.t + innerH / 2}
                        y2={pad.t + innerH / 2}
                        stroke="rgba(107,142,35,0.10)"
                        strokeWidth={2}
                    />

                    {/* Path */}
                    {sorted.length > 0 && (
                        <>
                            <path
                                d={pathD}
                                fill="none"
                                stroke="rgba(107,142,35,0.9)"
                                strokeWidth={4}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />

                            {/* Points */}
                            {sorted.map((p, i) => {
                                const x = xForTime(p.date.getTime());
                                const y = yFor(p.value);
                                const isHover = hoverIndex === i;
                                return (
                                    <circle
                                        key={p.date.getTime() + "-" + i}
                                        cx={x}
                                        cy={y}
                                        r={isHover ? 9 : 6}
                                        fill={p.value ? "rgba(16,185,129,0.95)" : "rgba(244,63,94,0.95)"}
                                        stroke="white"
                                        strokeWidth={3}
                                        opacity={isHover ? 1 : 0.9}
                                    />
                                );
                            })}
                        </>
                    )}

                    {/* Hover line + tooltip */}
                    {hover && (
                        <>
                            <line
                                x1={hover.x}
                                x2={hover.x}
                                y1={pad.t}
                                y2={pad.t + innerH}
                                stroke="rgba(107,142,35,0.25)"
                                strokeWidth={3}
                            />

                            {/* Tooltip box */}
                            {(() => {
                                const boxW = 250;
                                const boxH = 74;
                                const bx = clamp(hover.x - boxW / 2, pad.l, pad.l + innerW - boxW);
                                const by = pad.t + 10;

                                return (
                                    <g>
                                        <rect
                                            x={bx}
                                            y={by}
                                            width={boxW}
                                            height={boxH}
                                            rx={14}
                                            fill="rgba(255,255,255,0.92)"
                                            stroke="rgba(212,228,200,0.95)"
                                        />
                                        <text x={bx + 14} y={by + 28} fontSize="13" fill="#111827">
                                            {formatDate(hover.point.date)}
                                        </text>
                                        <text x={bx + 14} y={by + 54} fontSize="13" fill="#111827">
                                            Value:{" "}
                                            <tspan
                                                fill={hover.point.value ? "rgb(16,185,129)" : "rgb(244,63,94)"}
                                                fontWeight={700}
                                            >
                                                {hover.point.value ? trueLabel : falseLabel}
                                            </tspan>
                                        </text>
                                    </g>
                                );
                            })()}
                        </>
                    )}
                </svg>

                {/* Empty state */}
                {sorted.length === 0 && (
                    <div className="mt-4 text-sm text-gray-500">
                        No boolean check-ins to display.
                    </div>
                )}
            </div>
        </section>
    );
}