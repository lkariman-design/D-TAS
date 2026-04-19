"use client";

import Link from "next/link";

// Per-dimension patterns (15 questions each), repeated × 5 for 75-question array
// Legacy  ~11/100 : mostly 1s + few 2s
// Siloed  ~51/100 : 7 twos + 8 threes
// Strategic ~76/100: 11 threes + 4 fours
// Future-Ready ~87/100: 6 threes + 9 fours
const PATTERNS: Record<string, number[]> = {
  Legacy:       [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2],
  Siloed:       [2,2,2,2,2,2,2,3,3,3,3,3,3,3,3],
  Strategic:    [3,3,3,3,3,3,3,3,3,3,3,4,4,4,4],
  "Future-Ready":[3,3,3,3,3,3,4,4,4,4,4,4,4,4,4],
};

const DEMO_CTX = encodeURIComponent(JSON.stringify({
  companyName: "Janatics India Private Limited",
  industry:    "Manufacturing",
  size:        "251–1000 employees",
  city:        "Pune",
  timeline:    "6 months",
  focusArea:   "Operations & Supply Chain",
}));

const BAND_META: { band: string; label: string; emoji: string; score: string; from: string; to: string; bg: string; fg: string }[] = [
  { band:"Legacy",       label:"Legacy",       emoji:"🌱", score:"~11/100", from:"#b91c1c", to:"#ef4444", bg:"#fef2f2", fg:"#b91c1c" },
  { band:"Siloed",       label:"Siloed",       emoji:"🔶", score:"~51/100", from:"#b45309", to:"#f59e0b", bg:"#fffbeb", fg:"#b45309" },
  { band:"Strategic",    label:"Strategic",    emoji:"⭐", score:"~76/100", from:"#15803d", to:"#22c55e", bg:"#f0fdf4", fg:"#15803d" },
  { band:"Future-Ready", label:"Future-Ready", emoji:"🏆", score:"~87/100", from:"#1e40af", to:"#3b82f6", bg:"#eff6ff", fg:"#1e40af" },
];

function makeAnswers(pattern: number[]) {
  return encodeURIComponent(JSON.stringify(Array(5).fill(pattern).flat()));
}

export default function DemoLinks() {
  return (
    <div className="w-full max-w-3xl mt-12">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/80 text-xs font-medium mb-2">
          ⚡ Try a demo report
        </div>
        <p className="text-blue-300 text-sm">
          See what a report looks like across all four maturity states for a sample company
        </p>
        <p className="text-blue-400/70 text-xs mt-1">
          Janatics India Private Limited · Manufacturing · 6-month goal · Operations & Supply Chain focus
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {BAND_META.map(({ band, label, emoji, score, from, to, bg, fg }) => (
          <Link
            key={band}
            href={`/results?answers=${makeAnswers(PATTERNS[band])}&ctx=${DEMO_CTX}`}
            className="group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all hover:scale-105 text-center">
            <span className="text-3xl">{emoji}</span>
            <span
              className="text-sm font-bold heading"
              style={{ color: "white" }}>
              {label}
            </span>
            <span className="text-xs text-blue-300">{score}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
