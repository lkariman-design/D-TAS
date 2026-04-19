import questionnaire from "@/src/data/questionnaire.json";

export type Band = "Legacy" | "Siloed" | "Strategic" | "Future-Ready";

export interface DimensionResult {
  code: string;
  label: string;
  score: number;
  band: Band;
  rawSum: number;
  nQuestions: number;
}

export interface ScoreResult {
  dimensions: DimensionResult[];
  overallScore: number;
  overallBand: Band;
  answers: number[];
}

const BAND_THRESHOLDS: [number, number, Band][] = [
  [85, 100, "Future-Ready"],
  [65, 84,  "Strategic"],
  [35, 64,  "Siloed"],
  [0,  34,  "Legacy"],
];

export const BAND_COLORS: Record<Band, string> = {
  "Legacy":       "#d9534f",
  "Siloed":       "#f0ad4e",
  "Strategic":    "#5cb85c",
  "Future-Ready": "#1a7a4a",
};

export const BAND_BG: Record<Band, string> = {
  "Legacy":       "bg-red-500",
  "Siloed":       "bg-amber-400",
  "Strategic":    "bg-green-500",
  "Future-Ready": "bg-emerald-800",
};

export function getBand(score: number): Band {
  for (const [lo, hi, label] of BAND_THRESHOLDS) {
    if (Math.round(score) >= lo && Math.round(score) <= hi) return label;
  }
  return "Legacy";
}

export function computeScores(answers: number[]): ScoreResult {
  const dims = questionnaire.dimensions;
  let idx = 0;
  const dimensions: DimensionResult[] = [];

  for (const dim of dims) {
    const n = dim.n_questions;
    const chunk = answers.slice(idx, idx + n);
    idx += n;
    const raw = chunk.reduce((a, b) => a + b, 0);
    const min = n * 1;
    const max = n * 4;
    const score = Math.round(((raw - min) / (max - min)) * 10000) / 100;
    dimensions.push({
      code:       dim.code,
      label:      dim.label,
      score,
      band:       getBand(score),
      rawSum:     raw,
      nQuestions: n,
    });
  }

  const overallScore =
    Math.round((dimensions.reduce((a, d) => a + d.score, 0) / dimensions.length) * 100) / 100;

  return {
    dimensions,
    overallScore,
    overallBand: getBand(overallScore),
    answers,
  };
}
