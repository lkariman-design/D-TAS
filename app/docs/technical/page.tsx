import Link from "next/link";

export const metadata = { title: "D-TAS | Technical Design" };

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-violet-100">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Code({ children, lang = "" }: { children: string; lang?: string }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-x-auto mb-4">
      {lang && <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700 font-mono">{lang}</div>}
      <pre className="p-4 text-sm text-gray-100 font-mono leading-relaxed overflow-x-auto">{children.trim()}</pre>
    </div>
  );
}

function InfoBox({ children, color = "violet" }: { children: React.ReactNode; color?: string }) {
  const styles: Record<string, string> = {
    violet: "bg-violet-50 border-violet-200 text-violet-900",
    green:  "bg-green-50 border-green-200 text-green-900",
    amber:  "bg-amber-50 border-amber-200 text-amber-900",
    blue:   "bg-blue-50 border-blue-200 text-blue-900",
  };
  return (
    <div className={`border rounded-xl p-4 text-sm leading-relaxed mb-4 ${styles[color] ?? styles.violet}`}>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>{headers.map(h => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-700 font-mono text-xs">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  { id: "stack",       label: "1. Tech Stack" },
  { id: "setup",       label: "2. Local Setup" },
  { id: "structure",   label: "3. Project Structure" },
  { id: "architecture",label: "4. Architecture" },
  { id: "data",        label: "5. Data Layer" },
  { id: "scorer",      label: "6. Scoring Engine" },
  { id: "nba",         label: "7. NBA Engine" },
  { id: "swot",        label: "8. SWOT Engine" },
  { id: "industry",    label: "9. Industry Profiles" },
  { id: "benchmark",   label: "10. Benchmark Layer" },
  { id: "pages",       label: "11. Pages & Components" },
  { id: "state",       label: "12. State Management" },
  { id: "deploy",      label: "13. Deployment" },
  { id: "extend",      label: "14. How to Extend" },
];

export default function TechnicalDoc() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)" }} className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-white font-bold">D-TAS</span>
            </Link>
            <span className="text-violet-300 text-sm">/ Technical Design</span>
          </div>
          <Link href="/docs/functional"
                className="px-4 py-1.5 bg-white/15 border border-white/30 text-white text-sm rounded-lg hover:bg-white/25 transition-colors">
            ← Functional Doc
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">

        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Contents</div>
            <nav className="space-y-1">
              {TOC.map(item => (
                <a key={item.id} href={`#${item.id}`}
                   className="block text-sm text-gray-600 hover:text-violet-600 hover:bg-violet-50 px-2 py-1.5 rounded-lg transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Title */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-8 mb-8">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Developer Guide
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">D-TAS Technical Design</h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
              A complete developer reference covering the tech stack, project structure, all library modules,
              data flow, state management, deployment pipeline, and how to extend the system.
            </p>
            <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">
              <span>⚡ Next.js 16 App Router</span>
              <span>🔷 TypeScript</span>
              <span>🎨 Tailwind CSS</span>
              <span>📊 Recharts</span>
              <span>🚀 Vercel + GitHub Actions</span>
            </div>
          </div>

          {/* ── 1. Tech Stack ── */}
          <Section id="stack" title="1. Tech Stack">
            <Table
              headers={["Layer","Technology","Version","Purpose"]}
              rows={[
                ["Framework","Next.js (App Router)","16.2.4","Server + client components, file-based routing, static generation"],
                ["Language","TypeScript","5.x","Type safety across all modules"],
                ["Styling","Tailwind CSS","3.x","Utility-first styling, no CSS files"],
                ["Charts","Recharts","2.x","RadarChart for the maturity pentagon"],
                ["Package manager","npm","—","Dependency management"],
                ["Build","Turbopack","—","Fast local dev builds"],
                ["Hosting","Vercel","—","Static + serverless deployment"],
                ["CI/CD","GitHub Actions","—","Auto-deploy on push to main"],
                ["Version control","Git + GitHub","—","Source control and CI trigger"],
              ]}
            />
          </Section>

          {/* ── 2. Local Setup ── */}
          <Section id="setup" title="2. Local Setup">
            <Sub title="Prerequisites">
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>Node.js 20+ (project uses Node 24 on Vercel)</li>
                <li>npm 10+</li>
                <li>Git</li>
              </ul>
            </Sub>
            <Sub title="Clone and run">
              <Code lang="bash">{`
git clone https://github.com/lkariman-design/D-TAS.git
cd D-TAS
npm install
npm run dev
# → http://localhost:3000
              `}</Code>
            </Sub>
            <Sub title="Build for production">
              <Code lang="bash">{`
npm run build   # type-checks + generates optimised static output
npm run start   # serves the production build locally
              `}</Code>
            </Sub>
            <InfoBox color="blue">
              <strong>Path alias:</strong> The <code>@/*</code> alias maps to the project root (<code>./</code>).
              So <code>@/src/lib/scorer</code> resolves to <code>./src/lib/scorer.ts</code> and
              <code> @/src/data/questionnaire.json</code> resolves to <code>./src/data/questionnaire.json</code>.
              App pages live in <code>/app/</code> (not <code>/src/app/</code>).
            </InfoBox>
          </Section>

          {/* ── 3. Project Structure ── */}
          <Section id="structure" title="3. Project Structure">
            <Code lang="text">{`
D-TAS/
├── portal/                          ← Next.js application root
│   ├── app/                         ← App Router pages (NOT /src/app)
│   │   ├── page.tsx                 ← Home / landing page
│   │   ├── DemoLinks.tsx            ← Client component: 4 demo report buttons
│   │   ├── layout.tsx               ← Root layout (fonts, globals)
│   │   ├── globals.css              ← Tailwind imports + band-pill classes
│   │   ├── onboarding/
│   │   │   ├── page.tsx             ← Server wrapper
│   │   │   └── OnboardingClient.tsx ← 3-step onboarding form
│   │   ├── questionnaire/
│   │   │   ├── page.tsx             ← Server wrapper (Suspense boundary)
│   │   │   └── QuestionnaireClient.tsx ← Gamified 75-question UI
│   │   ├── results/
│   │   │   ├── page.tsx             ← Server wrapper (Suspense boundary)
│   │   │   └── ResultsClient.tsx    ← Full results report
│   │   └── docs/
│   │       ├── functional/page.tsx  ← Functional specification
│   │       └── technical/page.tsx   ← This document
│   │
│   ├── src/
│   │   ├── data/
│   │   │   └── questionnaire.json   ← Canonical question bank (75 questions)
│   │   └── lib/
│   │       ├── scorer.ts            ← Scoring engine + band logic
│   │       ├── benchmark.ts         ← Peer benchmark data + helpers
│   │       ├── industry.ts          ← 11 industry profiles
│   │       ├── swot.ts              ← SWOT generator
│   │       └── nba.ts               ← NBA action templates + ranker
│   │
│   ├── .github/workflows/
│   │   └── deploy.yml               ← GitHub Actions → Vercel CI/CD
│   ├── .vercel/project.json         ← Vercel project binding
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── Inputs/
    └── D-Tas Design.xlsx            ← Source questionnaire (Excel)
            `}</Code>
          </Section>

          {/* ── 4. Architecture ── */}
          <Section id="architecture" title="4. Architecture Overview">
            <p className="text-gray-600 leading-relaxed mb-4">
              D-TAS is a fully static Next.js application — no database, no API routes, no server-side secrets.
              All computation happens client-side in the browser after the static bundle is loaded.
            </p>
            <Code lang="text">{`
Data Flow:

questionnaire.json
      │
      ▼
OnboardingClient  ──── sessionStorage("dtas_context") ────────────────┐
      │                                                                 │
      ▼                                                                 │
QuestionnaireClient                                                     │
      │                                                                 │
      │  answers[] (75 integers, 1-4)                                   │
      ▼                                                                 ▼
ResultsClient ──── URL param ?answers=[...] + ?ctx={...} (demo links)
      │
      ├── scorer.ts       → ScoreResult (5 DimensionResults + overall)
      ├── benchmark.ts    → BenchmarkData per dimension
      ├── industry.ts     → IndustryProfile (trends, opportunities, threats)
      ├── swot.ts         → SWOTAnalysis (4 quadrants + weakDimCodes + opportunityDimCodes)
      └── nba.ts          → NBACard[] (ranked, 7-8 cards)
            `}</Code>
            <InfoBox color="violet">
              <strong>No server required:</strong> Every page is pre-rendered as static HTML. All logic runs in the browser.
              This means zero cold starts, instant global CDN delivery via Vercel, and no backend maintenance.
            </InfoBox>
          </Section>

          {/* ── 5. Data Layer ── */}
          <Section id="data" title="5. Data Layer — questionnaire.json">
            <p className="text-gray-600 leading-relaxed mb-4">
              The canonical question bank lives at <code className="bg-gray-100 px-1 rounded">src/data/questionnaire.json</code>.
              It was generated by parsing the Excel source file (<code>Inputs/D-Tas Design.xlsx</code>) with a Python script.
            </p>
            <Sub title="Schema">
              <Code lang="typescript">{`
{
  dimensions: [
    { code: "D1", label: "Strategy & Leadership", n_questions: 15 },
    // ... D2–D5
  ],
  total_questions: 75,
  questions: [
    {
      id: "D1_Q1",
      dim_code: "D1",
      dimension: "Strategy & Leadership",
      group: "Vision & Roadmap",          // sub-topic grouping
      question: "How clearly defined...", // question text
      options: {
        O1: "We have no...",              // score 1
        O2: "We have some...",            // score 2
        O3: "We have a clearly...",       // score 3
        O4: "We have a fully..."          // score 4
      },
      insights: {
        O1: "Insight shown after selecting O1",
        // ... I2–I4  (also keyed O2, O3, O4 in usage)
      },
      tag: "vision"
    }
  ]
}
              `}</Code>
            </Sub>
            <InfoBox color="blue">
              Questions are stored in dimension order (D1×15, D2×15, ... D5×15). The scorer and results page
              rely on this ordering — questions are sliced into dimension chunks using cumulative index offsets.
            </InfoBox>
          </Section>

          {/* ── 6. Scorer ── */}
          <Section id="scorer" title="6. Scoring Engine — src/lib/scorer.ts">
            <Sub title="Exports">
              <Table
                headers={["Export","Type","Description"]}
                rows={[
                  ["Band","type","'Legacy' | 'Siloed' | 'Strategic' | 'Future-Ready'"],
                  ["DimensionResult","interface","{ code, label, score, band, rawSum, nQuestions }"],
                  ["ScoreResult","interface","{ dimensions[], overallScore, overallBand, answers }"],
                  ["BAND_COLORS","Record<Band, string>","Hex colour per band for UI rendering"],
                  ["BAND_BG","Record<Band, string>","Tailwind bg class per band"],
                  ["getBand(score)","function","Returns Band for a 0–100 score"],
                  ["computeScores(answers)","function","Main entry point — takes number[75], returns ScoreResult"],
                ]}
              />
            </Sub>
            <Sub title="computeScores implementation">
              <Code lang="typescript">{`
export function computeScores(answers: number[]): ScoreResult {
  const dims = questionnaire.dimensions;
  let idx = 0;

  const dimensions = dims.map(dim => {
    const n = dim.n_questions;              // 15
    const chunk = answers.slice(idx, idx + n);
    idx += n;

    const raw = chunk.reduce((a, b) => a + b, 0);  // sum of answers
    const min = n * 1;                               // 15
    const max = n * 4;                               // 60
    const score = ((raw - min) / (max - min)) * 100;

    return { code: dim.code, label: dim.label,
             score, band: getBand(score), rawSum: raw, nQuestions: n };
  });

  const overallScore = dimensions.reduce((a, d) => a + d.score, 0) / dimensions.length;

  return { dimensions, overallScore, overallBand: getBand(overallScore), answers };
}
              `}</Code>
            </Sub>
          </Section>

          {/* ── 7. NBA Engine ── */}
          <Section id="nba" title="7. NBA Engine — src/lib/nba.ts">
            <p className="text-gray-600 leading-relaxed mb-4">
              Contains 15 action templates (3 per dimension) and the ranking function.
            </p>
            <Sub title="generateNBACards signature">
              <Code lang="typescript">{`
export function generateNBACards(
  result: ScoreResult,        // from scorer.ts
  timeline: Timeline,         // "6 months" | "12 months" | "24 months" | "36+ months"
  focusDimLabel: string,      // e.g. "Operations & Supply Chain"
  swotWeakDimCodes: string[],         // e.g. ["D2", "D4"] — +25% boost
  industryOpportunityDimCodes: string[] // e.g. ["D2"] — +20% boost
): NBACard[]
              `}</Code>
            </Sub>
            <Sub title="Scoring pipeline per action template">
              <Code lang="typescript">{`
let score = gapVsMedian * 0.5 + (100 - dimScore) * 0.3;

if (matchesFocusDim)          score *= 1.35;
if (fitsTimeline)             score *= 1.20;
if (isSwotWeakDim)            score *= 1.25;
if (isIndustryOpportunityDim) score *= 1.20;
if (dimScore > 70 && !isStrategicTarget) score *= 0.50; // penalty
              `}</Code>
            </Sub>
            <Sub title="NBACard interface">
              <Code lang="typescript">{`
interface NBACard {
  id, rank, title, dimension, dimCode,
  what, whyNow, whatImproves, businessBenefit,
  effort: "Low" | "Medium" | "High",
  timeline: "0-3 months" | "3-6 months" | "6-12 months" | "12-24 months",
  capexBand: "< ₹50L" | "₹50L–2Cr" | "₹2–10Cr" | "> ₹10Cr",
  doNothingRisk, score, tags
}
              `}</Code>
            </Sub>
          </Section>

          {/* ── 8. SWOT Engine ── */}
          <Section id="swot" title="8. SWOT Engine — src/lib/swot.ts">
            <Sub title="generateSWOT signature">
              <Code lang="typescript">{`
export function generateSWOT(
  result: ScoreResult,
  industryName: string
): SWOTAnalysis
              `}</Code>
            </Sub>
            <Sub title="SWOTAnalysis interface">
              <Code lang="typescript">{`
interface SWOTAnalysis {
  strengths:    SWOTItem[];   // score >= p50
  weaknesses:   SWOTItem[];   // score < p50
  opportunities: SWOTItem[];  // from industry + catch-up potential
  threats:      SWOTItem[];   // from industry + score patterns
  weakDimCodes: string[];     // passed to NBA scorer
  opportunityDimCodes: string[]; // passed to NBA scorer
}

interface SWOTItem {
  text: string;
  source: "score" | "benchmark" | "industry";
  dimCode?: string;
}
              `}</Code>
            </Sub>
            <p className="text-gray-600 text-sm leading-relaxed">
              Each item carries a <code>source</code> tag so the UI can show where the insight came from.
              The <code>weakDimCodes</code> and <code>opportunityDimCodes</code> arrays are the contract
              between the SWOT engine and the NBA scorer.
            </p>
          </Section>

          {/* ── 9. Industry Profiles ── */}
          <Section id="industry" title="9. Industry Profiles — src/lib/industry.ts">
            <Sub title="IndustryProfile interface">
              <Code lang="typescript">{`
interface IndustryProfile {
  name: string;
  marketGrowth: string;           // "8–10% CAGR (2024–2028)"
  digitalMaturityContext: string; // 1–2 sentence benchmark statement
  keyTrends: string[];            // 6–8 trend strings
  opportunities: IndustryOpportunity[];
  threats: IndustryThreat[];
}

interface IndustryOpportunity {
  title: string;
  description: string;
  relevantDimCodes: string[];  // which dimension actions to boost
  urgency: "High" | "Medium" | "Low";
}
              `}</Code>
            </Sub>
            <Sub title="Adding a new industry">
              <Code lang="typescript">{`
// In src/lib/industry.ts, add to the PROFILES object:
"New Industry Name": {
  name: "New Industry Name",
  marketGrowth: "X–Y% CAGR ...",
  digitalMaturityContext: "...",
  keyTrends: ["Trend 1", "Trend 2", ...],
  opportunities: [
    {
      title: "Opportunity Title",
      description: "...",
      relevantDimCodes: ["D2", "D4"],  // D1–D5
      urgency: "High",
    }
  ],
  threats: [
    { title: "Threat Title", description: "..." }
  ],
}
              `}</Code>
            </Sub>
            <p className="text-gray-600 text-sm">Also add the new industry name to the <code>INDUSTRIES</code> array in <code>app/onboarding/OnboardingClient.tsx</code>.</p>
          </Section>

          {/* ── 10. Benchmark ── */}
          <Section id="benchmark" title="10. Benchmark Layer — src/lib/benchmark.ts">
            <p className="text-gray-600 leading-relaxed mb-4">
              Currently uses static mock data. Designed as a drop-in interface for a live MCP server call.
            </p>
            <Code lang="typescript">{`
// Current: static mock
export async function fetchBenchmark(
  dimCode: string,
  _nicCode?: string,      // NIC industry code (future)
  _turnoverBand?: string  // revenue band (future)
): Promise<BenchmarkData>

// To replace with MCP:
// return await mcp.call("benchmark-db", "getDimensionBenchmark",
//   { dimCode, nicCode, turnoverBand });

export function fetchAllBenchmarks(): Record<string, BenchmarkData>

export function getBenchmarkLabel(score: number, bm: BenchmarkData): string
// Returns: "Top quartile" | "Above median" | "Below median" | "Bottom quartile"
            `}</Code>
            <InfoBox color="amber">
              To wire in live benchmark data: replace the body of <code>fetchBenchmark</code> with your MCP call.
              The rest of the application (SWOT, NBA, results UI) will automatically use the live data —
              no other changes needed.
            </InfoBox>
          </Section>

          {/* ── 11. Pages & Components ── */}
          <Section id="pages" title="11. Pages & Components">
            <Table
              headers={["File","Type","Key responsibilities"]}
              rows={[
                ["app/page.tsx","Server","Landing page, dimension pills, stats, CTA link, DemoLinks"],
                ["app/DemoLinks.tsx","Client","Computes pre-built answer arrays, renders 4 demo buttons"],
                ["app/onboarding/OnboardingClient.tsx","Client","3-step controlled form, sessionStorage write, router.push"],
                ["app/questionnaire/QuestionnaireClient.tsx","Client","XP/streak/badge state, single-question display, answer collection, navigation"],
                ["app/results/ResultsClient.tsx","Client","Reads URL params + sessionStorage, runs all lib functions, renders all 7 sections"],
                ["app/docs/functional/page.tsx","Server","Static functional specification document"],
                ["app/docs/technical/page.tsx","Server","Static technical design document (this page)"],
              ]}
            />
            <Sub title="Questionnaire page wrapper — Suspense boundary">
              <Code lang="typescript">{`
// app/questionnaire/page.tsx
import { Suspense } from "react";
import QuestionnaireClient from "./QuestionnaireClient";

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionnaireClient />
    </Suspense>
  );
}
// Results page uses the same pattern — required because
// useSearchParams() must be inside a Suspense boundary in Next.js App Router
              `}</Code>
            </Sub>
          </Section>

          {/* ── 12. State Management ── */}
          <Section id="state" title="12. State Management">
            <p className="text-gray-600 leading-relaxed mb-4">
              D-TAS uses two mechanisms to pass data between pages — no global state library needed.
            </p>
            <Table
              headers={["Mechanism","What it stores","Written by","Read by"]}
              rows={[
                ["sessionStorage (dtas_context)","Company name, industry, size, city, timeline, focusArea","OnboardingClient on submit","ResultsClient on mount"],
                ["URL param ?answers=","JSON array of 75 scores (1–4), URI-encoded","QuestionnaireClient on final confirm","ResultsClient via useSearchParams"],
                ["URL param ?ctx=","Same context as sessionStorage, URI-encoded","DemoLinks (home page)","ResultsClient (priority over sessionStorage)"],
              ]}
            />
            <InfoBox color="violet">
              <strong>Why URL params for demo links?</strong> sessionStorage is tab-scoped and not shareable.
              Encoding context in the URL makes demo reports fully shareable, bookmarkable, and embeddable
              in presentations without requiring any session setup.
            </InfoBox>
          </Section>

          {/* ── 13. Deployment ── */}
          <Section id="deploy" title="13. Deployment Pipeline">
            <Sub title="Flow">
              <Code lang="text">{`
git push origin main
        │
        ▼
GitHub Actions (.github/workflows/deploy.yml)
        │  1. actions/checkout@v4
        │  2. npm install -g vercel
        │  3. vercel pull --environment=production
        │  4. vercel build --prod
        │  5. vercel deploy --prebuilt --prod
        ▼
Vercel CDN → https://d-tas.vercel.app   (~60 seconds total)
              `}</Code>
            </Sub>
            <Sub title="GitHub Secrets required">
              <Table
                headers={["Secret","Value"]}
                rows={[
                  ["VERCEL_TOKEN","Classic personal access token from vercel.com/account/tokens"],
                  ["VERCEL_ORG_ID","Team ID from .vercel/project.json"],
                  ["VERCEL_PROJECT_ID","Project ID from .vercel/project.json"],
                ]}
              />
            </Sub>
            <InfoBox color="green">
              The workflow also runs on pull requests — it will build and deploy a preview, letting you
              validate changes before merging to main. (PR deployments go to a unique preview URL, not production.)
            </InfoBox>
          </Section>

          {/* ── 14. How to Extend ── */}
          <Section id="extend" title="14. How to Extend">
            <Sub title="Add a new question to an existing dimension">
              <Code lang="text">{`
1. Add the question object to src/data/questionnaire.json
   under the correct dim_code, following the existing schema.
2. Update the dimension's n_questions count in the dimensions array.
3. Update the MOTIVATIONAL milestones in QuestionnaireClient.tsx if needed.
4. Update the scorer.ts formula reference values (min/max auto-recalculate).
No other changes needed.
              `}</Code>
            </Sub>
            <Sub title="Add a new NBA action template">
              <Code lang="typescript">{`
// In src/lib/nba.ts, add to ACTION_TEMPLATES:
{
  dimCode: "D3",
  group: "new-group",
  title: "Action Title",
  what: "What to do...",
  whyNow: "Why this matters now...",
  whatImproves: "D3 score +X pts...",
  businessBenefit: "Measurable outcome...",
  effort: "Low",          // "Low" | "Medium" | "High"
  timelineMonths: 3,      // used for timeline fit check
  capexBand: "< ₹50L",
  doNothingRisk: "Risk if skipped...",
  tags: ["Tag1", "Tag2"],
}
              `}</Code>
            </Sub>
            <Sub title="Add a new industry">
              <Code lang="text">{`
1. Add profile to PROFILES in src/lib/industry.ts
2. Add industry name to INDUSTRIES array in app/onboarding/OnboardingClient.tsx
3. No other changes needed — SWOT and NBA automatically use the new profile.
              `}</Code>
            </Sub>
            <Sub title="Replace benchmark data with live MCP">
              <Code lang="typescript">{`
// In src/lib/benchmark.ts, replace fetchBenchmark body:
export async function fetchBenchmark(
  dimCode: string,
  nicCode?: string,
  turnoverBand?: string
): Promise<BenchmarkData> {
  // Replace this line:
  return SME_BENCHMARKS[dimCode];

  // With your MCP call:
  return await mcp.call("benchmark-db", "getDimensionBenchmark",
    { dimCode, nicCode, turnoverBand });
}
              `}</Code>
            </Sub>
            <Sub title="Add a new dimension">
              <Code lang="text">{`
1. Add questions to questionnaire.json with new dim_code (e.g. D6)
2. Add dimension entry to questionnaire.json dimensions array
3. Add entry to DIM_ICONS and DIM_GRADIENTS in QuestionnaireClient.tsx
4. Add benchmark entry in benchmark.ts SME_BENCHMARKS
5. Add NBA templates in nba.ts ACTION_TEMPLATES
6. Add dim to industry.ts opportunity relevantDimCodes where applicable
              `}</Code>
            </Sub>
          </Section>

          {/* Back */}
          <div className="flex gap-4 mt-8">
            <Link href="/" className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
              ← Back to Home
            </Link>
            <Link href="/docs/functional" className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors text-sm font-medium">
              Functional Document →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
