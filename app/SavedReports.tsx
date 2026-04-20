"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SavedReport {
  id: string;
  savedAt: string;
  url: string;
  companyName: string;
  industry: string;
  size: string;
  timeline: string;
  focusArea: string;
  overallScore: number;
  overallBand: string;
}

const BAND_COLOR: Record<string, string> = {
  "Legacy":       "#d9534f",
  "Siloed":       "#f0ad4e",
  "Strategic":    "#5cb85c",
  "Future-Ready": "#1a7a4a",
};

const BAND_EMOJI: Record<string, string> = {
  "Legacy": "🌱", "Siloed": "🔶", "Strategic": "⭐", "Future-Ready": "🏆",
};

export default function SavedReports() {
  const [reports, setReports] = useState<SavedReport[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dtas_reports") || "[]");
      setReports(saved);
    } catch { /* localStorage unavailable */ }
  }, []);

  const deleteReport = (id: string) => {
    const updated = reports.filter(r => r.id !== id);
    setReports(updated);
    localStorage.setItem("dtas_reports", JSON.stringify(updated));
  };

  if (reports.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mt-10">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/80 text-xs font-medium mb-2">
          📁 Your saved reports
        </div>
        <p className="text-blue-300 text-sm">Access your previous assessments · stored on this device</p>
      </div>

      <div className="space-y-3">
        {reports.map(r => (
          <div key={r.id}
               className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-white/15 transition-all">

            {/* Score ring */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center"
                 style={{ borderColor: BAND_COLOR[r.overallBand] ?? "#9ca3af" }}>
              <span className="text-white text-sm font-bold leading-none">{r.overallScore}</span>
              <span className="text-xs leading-none mt-0.5">{BAND_EMOJI[r.overallBand] ?? "📊"}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm truncate">
                {r.companyName || "Assessment"}
              </div>
              <div className="text-blue-300 text-xs mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                {r.industry && <span>{r.industry}</span>}
                {r.timeline && <span>⏱ {r.timeline}</span>}
                {r.focusArea && <span>🎯 {r.focusArea}</span>}
                <span>{new Date(r.savedAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}</span>
              </div>
            </div>

            {/* Band pill */}
            <span className="flex-shrink-0 text-xs font-bold text-white px-2.5 py-1 rounded-full"
                  style={{ background: BAND_COLOR[r.overallBand] ?? "#6b7280" }}>
              {r.overallBand}
            </span>

            {/* Actions */}
            <div className="flex-shrink-0 flex gap-2">
              <Link href={r.url}
                    className="px-3 py-1.5 bg-white text-blue-900 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                View →
              </Link>
              <button onClick={() => deleteReport(r.id)}
                      className="px-2 py-1.5 text-white/40 hover:text-red-400 text-xs transition-colors">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
