"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { computeScores, BAND_COLORS, type Band } from "@/src/lib/scorer";
import questionnaire from "@/src/data/questionnaire.json";
import { generateNBACards, type NBACard, type Timeline } from "@/src/lib/nba";
import { fetchAllBenchmarks, getBenchmarkLabel, type BenchmarkData } from "@/src/lib/benchmark";
import { getIndustryProfile, type IndustryProfile } from "@/src/lib/industry";
import { generateSWOT, type SWOTAnalysis, type SWOTItem } from "@/src/lib/swot";

// ── Helpers ───────────────────────────────────────────────────────────────────

function BandPill({ band }: { band: Band }) {
  const cls: Record<Band, string> = {
    "Legacy":       "band-pill band-legacy",
    "Siloed":       "band-pill band-siloed",
    "Strategic":    "band-pill band-strategic",
    "Future-Ready": "band-pill band-future-ready",
  };
  return <span className={cls[band]}>{band}</span>;
}

function ScoreRing({ score, band }: { score: number; band: Band }) {
  const r = 42, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width="110" height="110" className="mx-auto">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={BAND_COLORS[band]} strokeWidth="8"
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "55px 55px", transition: "stroke-dashoffset 0.6s" }}
      />
      <text x="55" y="52" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b">
        {Math.round(score)}
      </text>
      <text x="55" y="66" textAnchor="middle" fontSize="9" fill="#64748b">/ 100</text>
    </svg>
  );
}

const BAND_SEQUENCE: Band[] = ["Legacy", "Siloed", "Strategic", "Future-Ready"];

function MaturityBar({ score, band }: { score: number; band: Band }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>0</span><span>35</span><span>65</span><span>85</span><span>100</span>
      </div>
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          {[["#d9534f","34%"],["#f0ad4e","30%"],["#5cb85c","20%"],["#1a7a4a","16%"]].map(([c,w])=>(
            <div key={c} style={{width:w,background:c,opacity:0.3}}/>
          ))}
        </div>
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: BAND_COLORS[band], opacity: 0.9 }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {BAND_SEQUENCE.map((b) => (
          <span key={b} className={`text-xs font-medium ${b === band ? "opacity-100" : "opacity-30"}`}
                style={{ color: BAND_COLORS[b] }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Benchmark Bar ─────────────────────────────────────────────────────────────

function BenchmarkBar({
  dimLabel, score, bm, band,
}: {
  dimLabel: string; score: number; bm: BenchmarkData; band: Band;
}) {
  const label = getBenchmarkLabel(score, bm);
  const labelColors: Record<string, string> = {
    "Top quartile": "#1a7a4a",
    "Above median": "#5cb85c",
    "Below median": "#f0ad4e",
    "Bottom quartile": "#d9534f",
  };
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700">{dimLabel}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: labelColors[label] ?? "#64748b" }}>
          {label}
        </span>
      </div>
      <div className="relative h-8 bg-gray-100 rounded-full overflow-visible">
        {/* P25–P75 band */}
        <div
          className="absolute top-0 h-full rounded-full opacity-20"
          style={{
            left: `${bm.p25}%`,
            width: `${bm.p75 - bm.p25}%`,
            background: "#1F4ED8",
          }}
        />
        {/* P50 tick */}
        <div
          className="absolute top-0 h-full w-0.5 bg-blue-400 opacity-60"
          style={{ left: `${bm.p50}%` }}
        />
        {/* Score bar */}
        <div
          className="absolute top-1 h-6 rounded-full transition-all duration-700"
          style={{ width: `${Math.max(score, 3)}%`, background: BAND_COLORS[band], opacity: 0.85 }}
        />
        {/* Labels */}
        <div
          className="absolute -top-5 text-xs text-blue-500 font-medium transform -translate-x-1/2"
          style={{ left: `${bm.p50}%` }}>
          p50
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1.5">
        <span>0</span>
        <span>Your score: <strong style={{ color: BAND_COLORS[band] }}>{Math.round(score)}</strong></span>
        <span>Peer median: <strong className="text-blue-600">{bm.p50}</strong></span>
        <span>100</span>
      </div>
    </div>
  );
}

// ── Effort / Timeline badges ──────────────────────────────────────────────────

const EFFORT_STYLE: Record<NBACard["effort"], string> = {
  Low:    "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  High:   "bg-red-100 text-red-800",
};

const TIMELINE_STYLE: Record<NBACard["timeline"], string> = {
  "0-3 months":   "bg-blue-100 text-blue-800",
  "3-6 months":   "bg-violet-100 text-violet-800",
  "6-12 months":  "bg-orange-100 text-orange-800",
  "12-24 months": "bg-gray-100 text-gray-700",
};

const RANK_BADGE: Record<number, { bg: string; label: string }> = {
  1: { bg: "#F59E0B", label: "🥇 #1 Priority" },
  2: { bg: "#9CA3AF", label: "🥈 #2 Priority" },
  3: { bg: "#B45309", label: "🥉 #3 Priority" },
};

const DIM_ICONS: Record<string, string> = {
  D1:"🎯", D2:"⚙️", D3:"📈", D4:"💻", D5:"🧠",
};

function NBACardTile({ card }: { card: NBACard }) {
  const [expanded, setExpanded] = useState(false);
  const rankInfo = RANK_BADGE[card.rank];

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all
      ${card.rank <= 3 ? "border-amber-200 shadow-amber-50" : "border-gray-200"}`}>

      {/* Card top bar */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl">{DIM_ICONS[card.dimCode]}</span>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{card.dimension}</div>
              <h3 className="heading text-gray-900 text-base leading-snug mt-0.5">{card.title}</h3>
            </div>
          </div>
          {rankInfo ? (
            <span className="flex-shrink-0 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{ background: rankInfo.bg }}>
              {rankInfo.label}
            </span>
          ) : (
            <span className="flex-shrink-0 text-xs text-gray-400 font-medium">#{card.rank}</span>
          )}
        </div>

        {/* Tags + badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EFFORT_STYLE[card.effort]}`}>
            {card.effort} effort
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIMELINE_STYLE[card.timeline]}`}>
            {card.timeline}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700">
            {card.capexBand}
          </span>
        </div>

        {/* What */}
        <p className="text-sm text-gray-600 leading-relaxed">{card.what}</p>
      </div>

      {/* Expandable detail */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-5 py-2.5 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-between">
        <span>{expanded ? "Hide details" : "View full action plan"}</span>
        <span>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="px-5 py-4 border-t border-gray-100 space-y-3.5 text-sm">

          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">⚡ Why Act Now</div>
            <p className="text-gray-600 leading-relaxed">{card.whyNow}</p>
          </div>

          <div>
            <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">📈 What Improves</div>
            <p className="text-gray-600 leading-relaxed">{card.whatImproves}</p>
          </div>

          <div>
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-1">💰 Business Benefit</div>
            <p className="text-gray-600 leading-relaxed">{card.businessBenefit}</p>
          </div>

          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
            <div className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">⚠ Do-Nothing Risk</div>
            <p className="text-red-700 text-sm leading-relaxed">{card.doNothingRisk}</p>
          </div>

          {/* ── Project Engagement ── */}
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-xs font-bold text-violet-700 uppercase tracking-wide">🤝 Project Engagement</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-violet-100 text-violet-800 px-2.5 py-0.5 rounded-full font-medium">{card.engagementType}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">⏱ {card.engagementDuration}</span>
              </div>
            </div>
            <div className="space-y-3">
              {card.experts.map((expert, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-violet-100">
                  <div className="text-xs font-bold text-gray-800 mb-1.5">👤 {expert.role}</div>
                  <div className="flex flex-wrap gap-1">
                    {expert.skills.map(skill => (
                      <span key={skill} className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {card.tags.map(t => (
                <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface OrgContext {
  companyName: string;
  industry: string;
  size: string;
  city: string;
  timeline: string;
  focusArea: string;
}

export default function ResultsClient() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get("answers");

  const [ctx, setCtx] = useState<OrgContext | null>(null);
  const [copied, setCopied] = useState(false);
  const [reportSaved, setReportSaved] = useState(false);

  useEffect(() => {
    // URL param takes priority (demo links); fall back to sessionStorage
    const ctxParam = params.get("ctx");
    if (ctxParam) {
      try { setCtx(JSON.parse(decodeURIComponent(ctxParam))); return; } catch { /* ignore */ }
    }
    try {
      const stored = sessionStorage.getItem("dtas_context");
      if (stored) setCtx(JSON.parse(stored));
    } catch { /* ignore */ }
  }, [params]);

  const result = useMemo(() => {
    if (!raw) return null;
    try {
      return computeScores(JSON.parse(decodeURIComponent(raw)));
    } catch { return null; }
  }, [raw]);

  const benchmarks = useMemo(() => fetchAllBenchmarks(), []);

  const industryProfile = useMemo<IndustryProfile | null>(() => {
    if (!ctx?.industry) return null;
    return getIndustryProfile(ctx.industry);
  }, [ctx]);

  const swot = useMemo<SWOTAnalysis | null>(() => {
    if (!result || !ctx?.industry) return null;
    return generateSWOT(result, ctx.industry);
  }, [result, ctx]);

  const nbaCards = useMemo(() => {
    if (!result || !ctx?.timeline) return [];
    return generateNBACards(
      result,
      ctx.timeline as Timeline,
      ctx.focusArea ?? "",
      swot?.weakDimCodes ?? [],
      swot?.opportunityDimCodes ?? []
    );
  }, [result, ctx, swot]);

  // Auto-save report to localStorage for "My Reports" on home page
  useEffect(() => {
    if (!result || !raw) return;
    try {
      const reportId = Date.now().toString(36);
      const entry = {
        id: reportId,
        savedAt: new Date().toISOString(),
        url: window.location.href,
        companyName: ctx?.companyName || "Assessment",
        industry: ctx?.industry || "",
        size: ctx?.size || "",
        timeline: ctx?.timeline || "",
        focusArea: ctx?.focusArea || "",
        overallScore: Math.round(result.overallScore),
        overallBand: result.overallBand,
      };
      const existing: typeof entry[] = JSON.parse(localStorage.getItem("dtas_reports") || "[]");
      const deduped = existing.filter(r => !r.url.includes(raw.slice(0, 20)));
      localStorage.setItem("dtas_reports", JSON.stringify([entry, ...deduped].slice(0, 10)));
      setReportSaved(true);
    } catch { /* localStorage unavailable */ }
  }, [result, raw, ctx]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="text-2xl mb-3">⚠️</div>
          <p>No assessment data found.</p>
          <button onClick={() => router.push("/questionnaire")}
                  className="mt-4 px-6 py-2 rounded-lg text-white heading"
                  style={{ background: "#1F4ED8" }}>
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const radarData = result.dimensions.map((d) => ({
    subject: d.label.split(" & ")[0],
    score:   Math.round(d.score),
    fullMark: 100,
  }));

  const dimInsights = result.dimensions.map((dim) => {
    const qs = questionnaire.questions.filter((q) => q.dim_code === dim.code);
    const ansArr = result.answers;
    const offset = questionnaire.questions.findIndex((q) => q.dim_code === dim.code);
    const dimAnswers = qs.map((q, i) => ({ q, score: ansArr[offset + i] }));
    const sorted = [...dimAnswers].sort((a, b) => b.score - a.score);
    const strengths = sorted.slice(0, 2).filter((x) => x.score >= 3);
    const gaps      = sorted.slice(-2).filter((x) => x.score <= 2).reverse();
    return { dim, strengths, gaps };
  });

  const today = new Date().toLocaleDateString("en-GB", { year:"numeric", month:"long", day:"numeric" });

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>

      {/* Header */}
      <header className="no-print" style={{ background: "#0B3A66" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm heading">D</span>
            </div>
            <div>
              <span className="text-white font-bold heading">D-TAS Report</span>
              {ctx?.companyName && (
                <span className="text-blue-300 text-sm ml-2">— {ctx.companyName}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {reportSaved && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs rounded-lg">
                ✓ Report saved
              </span>
            )}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              }}
              className="px-4 py-1.5 border border-white/30 text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
              {copied ? "✓ Link copied!" : "🔗 Copy Link"}
            </button>
            <button onClick={() => window.print()}
                    className="px-4 py-1.5 border border-white/30 text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
              Print / PDF
            </button>
            <button onClick={() => router.push("/onboarding")}
                    className="px-4 py-1.5 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 transition-colors">
              Retake
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">

        {/* ── Company context banner ── */}
        {ctx && (
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-5 flex flex-wrap gap-6 items-center text-white">
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider">Company</div>
              <div className="heading text-lg">{ctx.companyName || "—"}</div>
              {ctx.city && <div className="text-blue-300 text-sm">{ctx.city}</div>}
            </div>
            <div className="h-8 w-px bg-white/20 hidden md:block"/>
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider">Industry</div>
              <div className="font-medium">{ctx.industry || "—"}</div>
            </div>
            <div className="h-8 w-px bg-white/20 hidden md:block"/>
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider">Size</div>
              <div className="font-medium">{ctx.size || "—"}</div>
            </div>
            <div className="h-8 w-px bg-white/20 hidden md:block"/>
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider">Transformation Timeline</div>
              <div className="font-medium">{ctx.timeline || "—"}</div>
            </div>
            <div className="h-8 w-px bg-white/20 hidden md:block"/>
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider">Focus Area</div>
              <div className="font-medium">{ctx.focusArea || "—"}</div>
            </div>
          </div>
        )}

        {/* ── Section 1: Executive Summary ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100" style={{ background: "#0B3A66" }}>
            <h1 className="text-white text-xl heading">Digital Maturity Assessment Report</h1>
            <p className="text-blue-300 text-sm mt-0.5">
              Overall result across {result.dimensions.length} dimensions · {today}
            </p>
          </div>

          <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="text-center flex-shrink-0">
              <ScoreRing score={result.overallScore} band={result.overallBand} />
              <div className="mt-2">
                <BandPill band={result.overallBand} />
              </div>
              <div className="text-gray-500 text-xs mt-1">Overall Maturity</div>
            </div>

            <div className="flex-1 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: "#9ca3af" }} />
                  <Radar
                    name="Score" dataKey="score"
                    stroke="#1F4ED8" fill="#1F4ED8" fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip formatter={(v: unknown) => [`${v}/100`, "Score"]} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-shrink-0 space-y-3 min-w-[160px]">
              {result.dimensions.map((d) => (
                <div key={d.code} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-600 truncate max-w-[100px]" title={d.label}>
                    {d.label.split(" & ")[0]}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: BAND_COLORS[d.band] }}>
                      {Math.round(d.score)}
                    </span>
                    <BandPill band={d.band} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Benchmark Comparison ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="heading text-gray-900 text-lg">Peer Benchmark Comparison</h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Your scores vs. {Object.values(benchmarks)[0]?.sampleSize ?? 214} SME peers ·{" "}
                <span className="text-blue-500">{Object.values(benchmarks)[0]?.source ?? "D-TAS Benchmark 2024"}</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-3 rounded bg-blue-300 opacity-40"/>
                <span>P25–P75 range</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4 bg-blue-400 opacity-60"/>
                <span>Peer median (p50)</span>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 pt-8">
            {result.dimensions.map((dim) => (
              <BenchmarkBar
                key={dim.code}
                dimLabel={dim.label}
                score={dim.score}
                bm={benchmarks[dim.code] ?? { p25: 30, p50: 45, p75: 62, sampleSize: 0, source: "" }}
                band={dim.band}
              />
            ))}
          </div>
        </section>

        {/* ── Section 3: Industry Analysis & Growth Opportunities ── */}
        {industryProfile && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100"
                 style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0B3A66 100%)" }}>
              <h2 className="text-white heading text-lg">Industry Analysis & Growth Opportunities</h2>
              <p className="text-blue-300 text-sm mt-0.5">
                {industryProfile.name} · {industryProfile.marketGrowth}
              </p>
            </div>

            <div className="p-8 space-y-7">
              {/* Context */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
                {industryProfile.digitalMaturityContext}
              </div>

              {/* Key trends */}
              <div>
                <h3 className="heading text-gray-800 text-sm mb-3 uppercase tracking-wider">Key Digital Trends</h3>
                <div className="flex flex-wrap gap-2">
                  {industryProfile.keyTrends.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div>
                <h3 className="heading text-gray-800 text-sm mb-3 uppercase tracking-wider">Growth Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industryProfile.opportunities.map((opp) => {
                    const urgencyStyle: Record<string, string> = {
                      High:   "bg-red-50 border-red-200 text-red-700",
                      Medium: "bg-amber-50 border-amber-200 text-amber-700",
                      Low:    "bg-gray-50 border-gray-200 text-gray-600",
                    };
                    const urgencyDot: Record<string, string> = {
                      High: "bg-red-500", Medium: "bg-amber-500", Low: "bg-gray-400",
                    };
                    return (
                      <div key={opp.title}
                           className="rounded-xl border p-4 bg-white shadow-sm">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="heading text-gray-900 text-sm leading-snug">{opp.title}</h4>
                          <span className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${urgencyStyle[opp.urgency]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${urgencyDot[opp.urgency]}`}/>
                            {opp.urgency} urgency
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{opp.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {opp.relevantDimCodes.map((dc) => (
                            <span key={dc} className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
                              {dc}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Threats */}
              <div>
                <h3 className="heading text-gray-800 text-sm mb-3 uppercase tracking-wider">Industry Threats to Watch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {industryProfile.threats.map((t) => (
                    <div key={t.title} className="rounded-xl border border-red-100 bg-red-50 p-4">
                      <div className="font-bold text-red-800 text-sm mb-1">⚠ {t.title}</div>
                      <p className="text-xs text-red-700 leading-relaxed">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 4: SWOT Analysis ── */}
        {swot && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100">
              <h2 className="heading text-gray-900 text-lg">SWOT Analysis</h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Based on your assessment scores, benchmark comparison, and {industryProfile?.name ?? "industry"} context
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">S</div>
                  <h3 className="heading text-green-800 font-bold">Strengths</h3>
                  <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Internal · Positive</span>
                </div>
                {swot.strengths.length === 0 && (
                  <p className="text-xs text-green-700 italic">No dimensions currently above peer median — all dimensions represent improvement opportunities.</p>
                )}
                <ul className="space-y-2.5">
                  {swot.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-800">
                      <span className="flex-shrink-0 mt-0.5 text-green-500">✓</span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-sm">W</div>
                  <h3 className="heading text-red-800 font-bold">Weaknesses</h3>
                  <span className="ml-auto text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Internal · Negative</span>
                </div>
                {swot.weaknesses.length === 0 && (
                  <p className="text-xs text-red-700 italic">No critical weaknesses identified — all dimensions are at or above peer median.</p>
                )}
                <ul className="space-y-2.5">
                  {swot.weaknesses.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-800">
                      <span className="flex-shrink-0 mt-0.5 text-red-500">✗</span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">O</div>
                  <h3 className="heading text-blue-800 font-bold">Opportunities</h3>
                  <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">External · Positive</span>
                </div>
                <ul className="space-y-2.5">
                  {swot.opportunities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-blue-800">
                      <span className="flex-shrink-0 mt-0.5 text-blue-500">→</span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-sm">T</div>
                  <h3 className="heading text-amber-800 font-bold">Threats</h3>
                  <span className="ml-auto text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">External · Negative</span>
                </div>
                <ul className="space-y-2.5">
                  {swot.threats.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-900">
                      <span className="flex-shrink-0 mt-0.5 text-amber-500">⚠</span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mx-6 mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600">
              <strong>How the Next Best Actions use this SWOT:</strong> Actions targeting SWOT Weaknesses receive a +25% priority boost. Actions that address industry Opportunities are boosted +20%. This ensures recommendations address your specific competitive context, not just generic digital gaps.
            </div>
          </section>
        )}

        {/* ── Section 5: Dimension Scorecards ── */}
        <section>
          <h2 className="heading text-xl text-gray-800 mb-4">Dimension Scorecards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {dimInsights.map(({ dim, strengths, gaps }) => (
              <div key={dim.code}
                   className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 print-break">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{dim.code}</div>
                    <h3 className="heading text-gray-800 text-base mt-0.5 leading-tight">{dim.label}</h3>
                  </div>
                  <BandPill band={dim.band} />
                </div>

                <ScoreRing score={dim.score} band={dim.band} />
                <MaturityBar score={dim.score} band={dim.band} />

                {strengths.length > 0 && (
                  <div className="mt-5">
                    <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">
                      ✓ Strengths
                    </div>
                    {strengths.map(({ q, score: s }) => (
                      <div key={q.id} className="text-xs text-gray-600 mb-2 pl-2 border-l-2 border-green-400">
                        <span className="text-green-600 font-medium">O{s}: </span>
                        {q.options[`O${s}` as keyof typeof q.options]}
                      </div>
                    ))}
                  </div>
                )}

                {gaps.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                      ⚠ Areas to Improve
                    </div>
                    {gaps.map(({ q, score: s }) => (
                      <div key={q.id} className="text-xs text-gray-600 mb-2 pl-2 border-l-2 border-amber-400">
                        <div className="font-medium text-amber-700 truncate" title={q.question}>
                          {q.question.length > 70 ? q.question.slice(0, 70) + "…" : q.question}
                        </div>
                        <div className="mt-0.5 text-gray-500 italic">
                          {q.insights[`I${s}` as keyof typeof q.insights]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 6: Next Best Actions ── */}
        {nbaCards.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="heading text-xl text-gray-800">Next Best Actions</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Prioritised for your <strong>{ctx?.timeline}</strong> timeline
                  {ctx?.focusArea && <> · focus on <strong>{ctx.focusArea}</strong></>}
                  {swot && <> · weighted by SWOT & industry signals</>}
                </p>
              </div>
              <div className="text-xs text-gray-400 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
                {nbaCards.length} actions ranked by impact
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {nbaCards.map((card) => (
                <NBACardTile key={card.id} card={card} />
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-700">
              <strong>How to use this list:</strong> Start with the top-ranked, low-effort items.
              Use the "Do-Nothing Risk" to build internal urgency. Re-run this assessment in 6 months
              to track progress and refresh recommendations.
            </div>
          </section>
        )}

        {/* ── Section 7: Question-level detail ── */}
        <section>
          <h2 className="heading text-xl text-gray-800 mb-4">Detailed Responses</h2>
          {result.dimensions.map((dim) => {
            const qs = questionnaire.questions.filter((q) => q.dim_code === dim.code);
            const offset = questionnaire.questions.findIndex((q) => q.dim_code === dim.code);
            return (
              <details key={dim.code} className="mb-4 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <summary
                  className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
                  style={{ listStyle: "none" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="heading text-gray-800">{dim.label}</span>
                    <BandPill band={dim.band} />
                  </div>
                  <span className="text-gray-400 text-sm">{Math.round(dim.score)}/100 ▾</span>
                </summary>
                <div className="divide-y divide-gray-100">
                  {qs.map((q, qi) => {
                    const selectedScore = result.answers[offset + qi];
                    const selectedOpt = `O${selectedScore}` as keyof typeof q.options;
                    return (
                      <div key={q.id} className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center"
                            style={{ background: selectedScore >= 3 ? "#5cb85c" : selectedScore === 2 ? "#f0ad4e" : "#d9534f" }}
                          >
                            {selectedScore}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 font-medium">{q.question}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              <span className="font-medium text-gray-600">{selectedOpt}: </span>
                              {q.options[selectedOpt]}
                            </p>
                            {q.insights[selectedOpt as keyof typeof q.insights] && (
                              <p className="text-xs text-blue-600 mt-1.5 italic border-l-2 border-blue-200 pl-2">
                                {q.insights[selectedOpt as keyof typeof q.insights]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 py-4 no-print">
          D-TAS Digital Transformation Assessment System · {today}
          {ctx?.companyName && ` · ${ctx.companyName}`}
        </footer>
      </div>
    </div>
  );
}
