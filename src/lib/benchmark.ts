// Benchmark peer data — SME industry averages by dimension
// Replace the `fetchBenchmark` function with a real MCP call when benchmark-db is live.

export interface BenchmarkData {
  p25: number;
  p50: number;
  p75: number;
  sampleSize: number;
  source: string;
}

// SME benchmark medians by dimension (based on industry research averages)
const SME_BENCHMARKS: Record<string, BenchmarkData> = {
  D1: { p25: 32, p50: 48, p75: 63, sampleSize: 214, source: "D-TAS SME Benchmark 2024" },
  D2: { p25: 29, p50: 44, p75: 61, sampleSize: 214, source: "D-TAS SME Benchmark 2024" },
  D3: { p25: 28, p50: 42, p75: 58, sampleSize: 214, source: "D-TAS SME Benchmark 2024" },
  D4: { p25: 24, p50: 39, p75: 56, sampleSize: 214, source: "D-TAS SME Benchmark 2024" },
  D5: { p25: 27, p50: 41, p75: 57, sampleSize: 214, source: "D-TAS SME Benchmark 2024" },
};

/**
 * Fetch benchmark for a dimension.
 * TODO: replace with MCP call to benchmark-db server:
 *   await mcp.call("benchmark-db", "getDimensionBenchmark", { dimCode, nicCode, turnoverBand })
 */
export async function fetchBenchmark(
  dimCode: string,
  _nicCode?: string,
  _turnoverBand?: string
): Promise<BenchmarkData> {
  // Simulate MCP latency
  await new Promise((r) => setTimeout(r, 0));
  return SME_BENCHMARKS[dimCode] ?? { p25: 30, p50: 45, p75: 62, sampleSize: 100, source: "Default" };
}

export function fetchAllBenchmarks(): Record<string, BenchmarkData> {
  return { ...SME_BENCHMARKS };
}

export function getBenchmarkLabel(score: number, bm: BenchmarkData): string {
  if (score >= bm.p75) return "Top quartile";
  if (score >= bm.p50) return "Above median";
  if (score >= bm.p25) return "Below median";
  return "Bottom quartile";
}
