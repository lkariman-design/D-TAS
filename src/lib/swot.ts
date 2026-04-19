import type { ScoreResult } from "./scorer";
import { fetchAllBenchmarks } from "./benchmark";
import { getIndustryProfile } from "./industry";

export interface SWOTItem {
  text: string;
  source: "score" | "benchmark" | "industry";
  dimCode?: string;
}

export interface SWOTAnalysis {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  // dim codes surfaced as structural weaknesses (used by NBA scorer)
  weakDimCodes: string[];
  // dim codes with industry opportunity alignment (used by NBA scorer)
  opportunityDimCodes: string[];
}

export function generateSWOT(result: ScoreResult, industryName: string): SWOTAnalysis {
  const benchmarks = fetchAllBenchmarks();
  const profile = getIndustryProfile(industryName);

  const strengths: SWOTItem[] = [];
  const weaknesses: SWOTItem[] = [];
  const weakDimCodes: string[] = [];

  for (const dim of result.dimensions) {
    const bm = benchmarks[dim.code];
    if (!bm) continue;
    const score = Math.round(dim.score);

    if (score >= bm.p75) {
      strengths.push({
        text: `${dim.label} scores ${score}/100 — top quartile vs. SME peers (p75: ${bm.p75}). This is a genuine competitive advantage.`,
        source: "benchmark",
        dimCode: dim.code,
      });
    } else if (score >= bm.p50) {
      strengths.push({
        text: `${dim.label} at ${score}/100 exceeds the peer median of ${bm.p50} — above-average capability ready to leverage.`,
        source: "benchmark",
        dimCode: dim.code,
      });
    } else if (score < bm.p25) {
      weaknesses.push({
        text: `${dim.label} at ${score}/100 is below the bottom quartile (p25: ${bm.p25}). Peers in this band are 2–3× more digitally capable in this dimension.`,
        source: "benchmark",
        dimCode: dim.code,
      });
      weakDimCodes.push(dim.code);
    } else {
      // Between p25 and p50
      weaknesses.push({
        text: `${dim.label} scores ${score}/100 — below the peer median of ${bm.p50}. Structured investment here would move the organisation to above-average standing.`,
        source: "score",
        dimCode: dim.code,
      });
      weakDimCodes.push(dim.code);
    }
  }

  // Score-based structural strengths
  const leadingDims = result.dimensions.filter((d) => d.band === "Future-Ready" || d.band === "Strategic");
  if (leadingDims.length > 0) {
    strengths.push({
      text: `${leadingDims.length} dimension${leadingDims.length > 1 ? "s" : ""} (${leadingDims.map((d) => d.label.split(" & ")[0]).join(", ")}) are at Strategic or Future-Ready maturity — a strong foundation for scaling digital programmes.`,
      source: "score",
    });
  }

  // Overall maturity as a strength if above 60
  if (result.overallScore >= 60) {
    strengths.push({
      text: `Overall digital maturity of ${Math.round(result.overallScore)}/100 places the organisation in the upper half of Indian SME peers — digital infrastructure is present and investable.`,
      source: "score",
    });
  }

  // Industry-specific opportunities
  const opportunities: SWOTItem[] = profile.opportunities.map((opp) => ({
    text: `${opp.title}: ${opp.description}`,
    source: "industry" as const,
    dimCode: opp.relevantDimCodes[0],
  }));

  // Catch-up opportunity if multiple weak dims
  if (weakDimCodes.length >= 2) {
    opportunities.push({
      text: `Digital catch-up potential: ${weakDimCodes.length} dimensions are below peer median. Structured, sequential investment in these areas can rapidly move the organisation to above-average standing and unlock competitive advantages.`,
      source: "benchmark",
    });
  }

  // Focus opportunity
  const lowestDim = [...result.dimensions].sort((a, b) => a.score - b.score)[0];
  if (lowestDim && lowestDim.score < 40) {
    opportunities.push({
      text: `${lowestDim.label} is the highest-leverage improvement area (${Math.round(lowestDim.score)}/100). Targeted 6-month investment here will disproportionately improve overall maturity score.`,
      source: "score",
      dimCode: lowestDim.code,
    });
  }

  // Industry-specific threats
  const threats: SWOTItem[] = profile.threats.map((t) => ({
    text: `${t.title}: ${t.description}`,
    source: "industry" as const,
  }));

  // Benchmark-based threats
  const criticallyWeak = result.dimensions.filter((d) => {
    const bm = benchmarks[d.code];
    return bm && d.score < bm.p25;
  });
  if (criticallyWeak.length > 0) {
    threats.push({
      text: `Competitor digital advantage: ${criticallyWeak.map((d) => d.label.split(" & ")[0]).join(", ")} are at bottom-quartile maturity. Industry peers at p75 in these dimensions can execute significantly faster, cheaper, and with greater reliability.`,
      source: "benchmark",
    });
  }

  // Scale-up risk if operations or tech is weak
  const opsOrTech = result.dimensions.filter(
    (d) => (d.code === "D2" || d.code === "D4") && d.score < 50
  );
  if (opsOrTech.length > 0) {
    threats.push({
      text: `Scale-up execution risk: weak Operations & Technology foundations mean that business growth will create compounding operational stress. Manual processes that work at current scale often break catastrophically when volume doubles.`,
      source: "score",
    });
  }

  const opportunityDimCodes = profile.opportunities
    .filter((o) => o.urgency === "High")
    .flatMap((o) => o.relevantDimCodes);

  return {
    strengths,
    weaknesses,
    opportunities,
    threats,
    weakDimCodes: [...new Set(weakDimCodes)],
    opportunityDimCodes: [...new Set(opportunityDimCodes)],
  };
}
