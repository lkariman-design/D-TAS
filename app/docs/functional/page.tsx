import Link from "next/link";

export const metadata = { title: "D-TAS | Functional Document" };

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-100">{title}</h2>
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

function InfoBox({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const styles: Record<string, string> = {
    blue:   "bg-blue-50 border-blue-200 text-blue-900",
    green:  "bg-green-50 border-green-200 text-green-900",
    amber:  "bg-amber-50 border-amber-200 text-amber-900",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
  };
  return (
    <div className={`border rounded-xl p-4 text-sm leading-relaxed ${styles[color] ?? styles.blue}`}>
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
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-700">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  { id: "overview",    label: "1. Overview" },
  { id: "journey",     label: "2. User Journey" },
  { id: "onboarding",  label: "3. Onboarding" },
  { id: "assessment",  label: "4. Assessment Engine" },
  { id: "scoring",     label: "5. Scoring Methodology" },
  { id: "results",     label: "6. Results Report" },
  { id: "benchmark",   label: "7. Benchmark Comparison" },
  { id: "industry",    label: "8. Industry Analysis" },
  { id: "swot",        label: "9. SWOT Analysis" },
  { id: "nba",         label: "10. Next Best Actions" },
  { id: "demo",        label: "11. Demo Reports" },
];

export default function FunctionalDoc() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #0B3A66 0%, #1F4ED8 100%)" }} className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-white font-bold">D-TAS</span>
            </Link>
            <span className="text-blue-300 text-sm">/ Functional Document</span>
          </div>
          <Link href="/docs/technical"
                className="px-4 py-1.5 bg-white/15 border border-white/30 text-white text-sm rounded-lg hover:bg-white/25 transition-colors">
            Technical Design →
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
                   className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors">
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
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Functional Specification
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              D-TAS — Digital Transformation Assessment System
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
              A complete functional guide covering the user journey, assessment methodology, scoring engine,
              benchmark comparison, SWOT analysis, and AI-prioritised next best action recommendations.
            </p>
            <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">
              <span>📋 75 Questions · 5 Dimensions</span>
              <span>🏢 11 Industry Profiles</span>
              <span>📊 214-company SME Benchmark</span>
              <span>🎯 AI-ranked NBA Cards</span>
            </div>
          </div>

          {/* ── 1. Overview ── */}
          <Section id="overview" title="1. Overview">
            <p className="text-gray-600 leading-relaxed mb-4">
              D-TAS is a free, self-service digital maturity diagnostic for SMEs. It measures an organisation's
              current digital capability across five strategic dimensions, benchmarks it against 214 industry peers,
              and generates a boardroom-ready report with context-specific next best actions.
            </p>
            <InfoBox color="blue">
              <strong>Core value proposition:</strong> In approximately 20 minutes, a business leader completes
              75 structured questions and receives a report that would otherwise require a 2–3 week consulting
              engagement — including scoring, peer benchmarking, industry context, SWOT analysis, and ranked
              implementation recommendations.
            </InfoBox>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {[["75","Questions"],["5","Dimensions"],["~20 min","Completion time"],["Free","No account needed"]].map(([v,l]) => (
                <div key={l} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{v}</div>
                  <div className="text-sm text-gray-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 2. User Journey ── */}
          <Section id="journey" title="2. User Journey">
            <p className="text-gray-600 leading-relaxed mb-5">
              The application is a linear 4-stage flow. Each stage collects or processes data that feeds into the next.
            </p>
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              {[
                { step:"1", title:"Home", desc:"Landing page with value proposition and demo report links", color:"#0B3A66" },
                { step:"2", title:"Onboarding", desc:"3-step form capturing company context and transformation preferences", color:"#1F4ED8" },
                { step:"3", title:"Questionnaire", desc:"75-question gamified assessment, one question at a time", color:"#7c3aed" },
                { step:"4", title:"Results", desc:"Full diagnostic report with scores, benchmarks, SWOT, and NBA cards", color:"#15803d" },
              ].map(s => (
                <div key={s.step} className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mb-3"
                       style={{ background: s.color }}>{s.step}</div>
                  <div className="font-semibold text-gray-900">{s.title}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
            <InfoBox color="indigo">
              <strong>Data persistence:</strong> Onboarding data (company name, industry, size, city, timeline, focus area)
              is stored in <code className="bg-indigo-100 px-1 rounded">sessionStorage</code> under the key <code className="bg-indigo-100 px-1 rounded">dtas_context</code>.
              Assessment answers are encoded in the results page URL as a JSON array. Demo report links pass both
              via URL parameters, making them shareable and bookmark-friendly.
            </InfoBox>
          </Section>

          {/* ── 3. Onboarding ── */}
          <Section id="onboarding" title="3. Onboarding">
            <p className="text-gray-600 leading-relaxed mb-4">
              The 3-step onboarding form collects context that personalises the benchmark comparison, industry analysis,
              SWOT, and NBA prioritisation in the results report.
            </p>
            <Table
              headers={["Step", "Field", "Type", "Purpose"]}
              rows={[
                ["1","Company Name","Free text","Shown in report header and footer"],
                ["1","Industry","Dropdown (11 options)","Selects the industry profile for analysis and SWOT"],
                ["1","Company Size","Button grid (5 bands)","Used for benchmark context"],
                ["1","City / Region","Free text (optional)","Shown in report for identification"],
                ["2","Transformation Timeline","Single select (4 options)","Determines which NBA actions are within scope"],
                ["3","Focus Area","Single select (5 options)","Gives +35% NBA score boost to matching dimension"],
              ]}
            />
            <Sub title="Timeline Options">
              <Table
                headers={["Option", "Description", "NBA Impact"]}
                rows={[
                  ["6 Months","Quick wins — visible results fast","Only actions ≤6 months shown as in-scope"],
                  ["12 Months","Structured transformation in a year","Actions up to 12 months in scope"],
                  ["24 Months","Deep capability building","Actions up to 24 months in scope"],
                  ["36+ Months","Long-term enterprise-wide transformation","All actions in scope"],
                ]}
              />
            </Sub>
            <Sub title="Focus Area Options">
              <p className="text-gray-600 text-sm mb-2">The five focus areas map directly to the five assessment dimensions:</p>
              <Table
                headers={["Focus Area", "Maps To"]}
                rows={[
                  ["Strategy & Leadership","D1"],
                  ["Operations & Supply Chain","D2"],
                  ["Sales & Marketing","D3"],
                  ["Technology & Infrastructure","D4"],
                  ["Skills & Capabilities","D5"],
                ]}
              />
            </Sub>
          </Section>

          {/* ── 4. Assessment Engine ── */}
          <Section id="assessment" title="4. Assessment Engine">
            <p className="text-gray-600 leading-relaxed mb-4">
              The assessment consists of 75 questions across 5 dimensions (15 per dimension). Questions are grouped
              within each dimension by sub-topic (e.g. Vision, Governance, Operations). Each question has 4 options
              and an insight that reveals what the selected answer means in context.
            </p>
            <Table
              headers={["Code","Dimension","Questions","Icon"]}
              rows={[
                ["D1","Strategy & Leadership","15","🎯"],
                ["D2","Operations & Supply Chain","15","⚙️"],
                ["D3","Sales & Marketing","15","📈"],
                ["D4","Technology & Infrastructure","15","💻"],
                ["D5","Skills & Capabilities","15","🧠"],
              ]}
            />
            <Sub title="Gamification Layer">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                The questionnaire is designed to maintain engagement across all 75 questions through a gamification system:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon:"⚡", title:"XP System", desc:"25 XP awarded per answered question, shown in the header." },
                  { icon:"🔥", title:"Streak Counter", desc:"Answering 3+ consecutive questions scoring 3 or 4 triggers a streak toast notification." },
                  { icon:"🏅", title:"Dimension Badges", desc:"Completing all 15 questions in a dimension triggers a full-screen badge animation." },
                  { icon:"💬", title:"Milestone Messages", desc:"Motivational toasts appear at Q1, Q15, Q30, Q45, Q60, and Q74." },
                  { icon:"🎨", title:"Animated Transitions", desc:"Slide-in/out animations between questions with per-dimension colour gradients." },
                  { icon:"🔵", title:"Progress Trail", desc:"A dot-trail shows the last 9 answered questions coloured by their score." },
                ].map(g => (
                  <div key={g.title} className="bg-gray-50 rounded-xl p-3 flex gap-3">
                    <span className="text-xl">{g.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{g.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Sub>
            <Sub title="Answer Options">
              <p className="text-gray-600 text-sm mb-2">Each question has exactly four options representing a capability maturity progression:</p>
              <Table
                headers={["Option","Score","Colour","General meaning"]}
                rows={[
                  ["O1","1","Red","Ad hoc / not in place / reactive"],
                  ["O2","2","Amber","Developing / partial / inconsistent"],
                  ["O3","3","Green","Structured / mostly in place / proactive"],
                  ["O4","4","Dark green","Optimised / leading practice / data-driven"],
                ]}
              />
            </Sub>
          </Section>

          {/* ── 5. Scoring Methodology ── */}
          <Section id="scoring" title="5. Scoring Methodology">
            <Sub title="Normalisation Formula">
              <InfoBox color="indigo">
                <strong>Formula (per dimension):</strong>
                <br /><br />
                <code className="block bg-indigo-100 rounded-lg p-3 mt-1 font-mono text-sm">
                  Score = ((rawSum − minPossible) / (maxPossible − minPossible)) × 100
                </code>
                <br />
                Where <code>minPossible = n × 1</code> and <code>maxPossible = n × 4</code> (n = 15 questions per dimension).
                <br /><br />
                This normalises every dimension to 0–100 regardless of number of questions, making scores comparable across dimensions.
              </InfoBox>
            </Sub>
            <Sub title="Reference Values">
              <Table
                headers={["Answer pattern","Raw sum","Score","Band"]}
                rows={[
                  ["All 1s (minimum)","15","0","Legacy"],
                  ["All 2s","30","33.3","Legacy"],
                  ["All 3s","45","66.7","Strategic"],
                  ["All 4s (maximum)","60","100","Future-Ready"],
                ]}
              />
            </Sub>
            <Sub title="Maturity Bands">
              <Table
                headers={["Band","Score range","Colour","Meaning"]}
                rows={[
                  ["Legacy","0 – 34","Red","Ad hoc; digital is fragmented or absent"],
                  ["Siloed","35 – 64","Amber","Some digital in place but disconnected across functions"],
                  ["Strategic","65 – 84","Green","Structured digital capability with measurable outcomes"],
                  ["Future-Ready","85 – 100","Dark green","Optimised, data-driven, continuously improving"],
                ]}
              />
            </Sub>
            <Sub title="Overall Score">
              <p className="text-gray-600 text-sm">The overall score is the unweighted arithmetic mean of the five dimension scores. All dimensions are treated equally in the overall calculation.</p>
            </Sub>
          </Section>

          {/* ── 6. Results Report ── */}
          <Section id="results" title="6. Results Report">
            <p className="text-gray-600 leading-relaxed mb-5">
              The results page contains seven distinct sections, each serving a specific diagnostic purpose.
            </p>
            <div className="space-y-4">
              {[
                { n:"1", title:"Company Context Banner", desc:"Displays the onboarding data (company name, industry, size, city, timeline, focus area) as a reference header for the whole report. Confirms which context was used for personalisation." },
                { n:"2", title:"Executive Summary", desc:"Shows the overall score ring (0–100), maturity band pill, a radar/pentagon chart across all 5 dimensions, and a quick-stat column with per-dimension scores and bands." },
                { n:"3", title:"Benchmark Comparison", desc:"Horizontal bar chart per dimension showing the company score vs. the P25, P50 (median), and P75 of 214 SME peers. Each bar is labelled: Top Quartile / Above Median / Below Median / Bottom Quartile." },
                { n:"4", title:"Industry Analysis", desc:"Market growth context, key digital trends (shown as pills), growth opportunity cards with urgency ratings, and industry-specific threat cards. All content is drawn from the selected industry profile." },
                { n:"5", title:"SWOT Analysis", desc:"A 2×2 SWOT grid generated from three data sources: assessment scores (vs. benchmark), and industry profile. Strengths and weaknesses derive from internal scores; opportunities and threats combine industry data with benchmark position. The SWOT directly influences NBA prioritisation." },
                { n:"6", title:"Next Best Actions", desc:"7–8 ranked action cards, each showing: title, dimension, effort badge, timeline badge, capex band, a plain-language 'what to do', and an expandable section with Why Now, What Improves, Business Benefit, and Do-Nothing Risk." },
                { n:"7", title:"Detailed Responses", desc:"Collapsible per-dimension accordion showing each question, the selected answer text, and the question insight — providing a full audit trail of the assessment." },
              ].map(s => (
                <div key={s.n} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{s.n}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{s.title}</div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 7. Benchmark ── */}
          <Section id="benchmark" title="7. Benchmark Comparison">
            <p className="text-gray-600 leading-relaxed mb-4">
              The benchmark dataset contains percentile data (P25, P50, P75) for all 5 dimensions, derived from
              a sample of 214 Indian SMEs across sectors.
            </p>
            <Table
              headers={["Dimension","P25","P50 (Median)","P75","Source"]}
              rows={[
                ["D1 – Strategy & Leadership","32","48","63","D-TAS SME Benchmark 2024"],
                ["D2 – Operations & Supply Chain","29","44","61","D-TAS SME Benchmark 2024"],
                ["D3 – Sales & Marketing","28","42","58","D-TAS SME Benchmark 2024"],
                ["D4 – Technology & Infrastructure","24","39","56","D-TAS SME Benchmark 2024"],
                ["D5 – Skills & Capabilities","27","41","57","D-TAS SME Benchmark 2024"],
              ]}
            />
            <InfoBox color="green">
              <strong>Future enhancement:</strong> The benchmark module is designed as a plug-in interface. When the
              benchmark-db MCP server is available, the <code>fetchBenchmark(dimCode, nicCode, turnoverBand)</code> function
              in <code>src/lib/benchmark.ts</code> can be replaced with a live MCP call, enabling real-time,
              industry-filtered peer comparison.
            </InfoBox>
          </Section>

          {/* ── 8. Industry Analysis ── */}
          <Section id="industry" title="8. Industry Analysis">
            <p className="text-gray-600 leading-relaxed mb-4">
              Each industry profile contains five data elements used to populate the Industry Analysis section and feed the SWOT generator.
            </p>
            <Table
              headers={["Element","Description"]}
              rows={[
                ["Market Growth","CAGR estimate and key growth drivers for the sector"],
                ["Digital Maturity Context","1–2 sentence benchmark of where the industry currently stands on digital maturity"],
                ["Key Digital Trends","6–8 current trends reshaping the industry (shown as pills)"],
                ["Growth Opportunities","3–4 specific digital opportunities with urgency rating (High/Medium/Low) and relevant dimension codes"],
                ["Industry Threats","3–4 specific threats the company faces if digital maturity lags"],
              ]}
            />
            <p className="text-gray-600 text-sm mt-2">Profiles exist for all 11 industry options in onboarding: Manufacturing, Retail & Distribution, IT/Software Services, Professional Services, Healthcare & Pharma, Logistics & Transport, Food & Beverages, Construction & Real Estate, Education, Financial Services, and Other.</p>
          </Section>

          {/* ── 9. SWOT ── */}
          <Section id="swot" title="9. SWOT Analysis">
            <p className="text-gray-600 leading-relaxed mb-4">
              The SWOT is generated algorithmically from three data sources and is not a static template.
              Every SWOT produced is unique to the company's actual scores, benchmark position, and industry.
            </p>
            <Table
              headers={["Quadrant","Data Sources","Generation Logic"]}
              rows={[
                ["Strengths","Scores vs benchmark","Dimensions scoring above P50 (Above Median) or P75 (Top Quartile) are surfaced as strengths with specific score context"],
                ["Weaknesses","Scores vs benchmark","Dimensions below P50 are surfaced as weaknesses. Dimensions below P25 are flagged as critical weaknesses"],
                ["Opportunities","Industry profile + benchmark","Industry growth opportunities (from profile) + catch-up potential if multiple weak dims + lowest dimension as highest-leverage target"],
                ["Threats","Industry profile + score patterns","Industry threats (from profile) + competitor digital advantage if bottom quartile + scale-up risk if D2/D4 are weak"],
              ]}
            />
            <InfoBox color="amber">
              <strong>SWOT → NBA connection:</strong> The SWOT engine outputs two arrays —{" "}
              <code>weakDimCodes</code> (dimensions identified as weaknesses) and{" "}
              <code>opportunityDimCodes</code> (dimensions aligned with high-urgency industry opportunities).
              These are passed directly into the NBA scorer, giving +25% priority boost to actions addressing
              weaknesses and +20% to actions enabling industry opportunities.
            </InfoBox>
          </Section>

          {/* ── 10. NBA ── */}
          <Section id="nba" title="10. Next Best Actions (NBA)">
            <p className="text-gray-600 leading-relaxed mb-4">
              The NBA engine selects and ranks 7–8 prioritised action cards from a library of 15 templates
              (3 per dimension). Each card contains six mandatory data points required for decision-making.
            </p>
            <Sub title="Scoring Formula">
              <InfoBox color="indigo">
                <strong>Base score:</strong>
                <code className="block bg-indigo-100 rounded p-2 my-2 font-mono text-sm">
                  base = (gapVsMedian × 0.5) + ((100 − dimScore) × 0.3)
                </code>
                <strong>Multipliers applied in sequence:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>× 1.35 if dimension matches user's selected Focus Area</li>
                  <li>× 1.20 if action timeline fits within user's transformation window</li>
                  <li>× 1.25 if dimension is a SWOT-identified Weakness (below peer median)</li>
                  <li>× 1.20 if dimension aligns with a High-urgency industry Opportunity</li>
                  <li>× 0.50 penalty if dimension scores above 70 and is not a strategic target</li>
                </ul>
              </InfoBox>
            </Sub>
            <Sub title="Selection Rules">
              <Table
                headers={["Rule","Detail"]}
                rows={[
                  ["Max cards per dimension","2 per non-focus dimension, 3 for the selected focus dimension"],
                  ["Total cards returned","7–8"],
                  ["Sort order","Descending by composite score (highest priority first)"],
                  ["Rank badges","🥇 #1, 🥈 #2, 🥉 #3 for the top 3 ranked actions"],
                ]}
              />
            </Sub>
            <Sub title="Card Data Points">
              <Table
                headers={["Field","Description"]}
                rows={[
                  ["What","Plain language description of the action to take"],
                  ["Why Now","Market/competitive rationale for acting in this period"],
                  ["What Improves","Specific score improvement and business metric impact"],
                  ["Business Benefit","Revenue, cost, or efficiency outcome in measurable terms"],
                  ["Do-Nothing Risk","What happens if this action is not taken in the timeline"],
                  ["Effort / Timeline / Capex","Implementation complexity, duration, and investment band"],
                ]}
              />
            </Sub>
          </Section>

          {/* ── 11. Demo Reports ── */}
          <Section id="demo" title="11. Demo Reports">
            <p className="text-gray-600 leading-relaxed mb-4">
              The home page includes four pre-built demo reports for a sample company (Janatics India Private Limited,
              Manufacturing, 6-month timeline, Operations & Supply Chain focus) across all four maturity states.
            </p>
            <Table
              headers={["Demo","Answer Pattern","Score","Use case"]}
              rows={[
                ["🌱 Legacy","10 ones + 5 twos per dimension","~11/100","Shows early-stage company with extensive NBA recommendations"],
                ["🔶 Siloed","7 twos + 8 threes per dimension","~51/100","Shows mid-stage company with mix of improvements"],
                ["⭐ Strategic","11 threes + 4 fours per dimension","~76/100","Shows advanced company with targeted optimisations"],
                ["🏆 Future-Ready","6 threes + 9 fours per dimension","~87/100","Shows leading-practice company"],
              ]}
            />
            <InfoBox color="green">
              Demo links are fully shareable URLs — both answer arrays and company context are encoded as URL parameters,
              so no session data is required. They can be used in presentations or shared externally without login.
            </InfoBox>
          </Section>

          {/* Back */}
          <div className="flex gap-4 mt-8">
            <Link href="/" className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
              ← Back to Home
            </Link>
            <Link href="/docs/technical" className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium">
              Technical Design →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
