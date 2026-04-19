import Link from "next/link";
import DemoLinks from "./DemoLinks";

const DIMENSIONS = [
  { label: "Strategy & Leadership",       icon: "🎯" },
  { label: "Operations & Supply Chain",   icon: "⚙️" },
  { label: "Sales & Marketing",           icon: "📈" },
  { label: "Technology & Infrastructure", icon: "💻" },
  { label: "Skills & Capabilities",       icon: "🧠" },
];

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-6 py-16"
      style={{ background: "linear-gradient(135deg, #0B3A66 0%, #1F4ED8 100%)" }}
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-2xl heading">D</span>
          </div>
          <span className="text-white text-3xl heading">D-TAS</span>
        </div>
        <h1 className="text-white text-4xl md:text-5xl heading mb-4 leading-tight">
          Digital Transformation<br />Assessment System
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto leading-relaxed">
          Benchmark your organisation&apos;s digital maturity. Get a boardroom-ready report
          with personalised next-best actions — tailored to your timeline and priorities.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10 max-w-2xl">
        {DIMENSIONS.map((d) => (
          <span key={d.label}
            className="bg-white/15 text-white text-sm px-4 py-2 rounded-full border border-white/25 flex items-center gap-1.5">
            <span>{d.icon}</span>{d.label}
          </span>
        ))}
      </div>

      <div className="flex gap-8 mb-10 text-center">
        {[["75", "Questions"],["5", "Dimensions"],["~20 min","To complete"],["Free","Forever"]].map(([v,l])=>(
          <div key={l}>
            <div className="text-white text-2xl heading">{v}</div>
            <div className="text-blue-300 text-sm">{l}</div>
          </div>
        ))}
      </div>

      <Link href="/onboarding"
        className="px-12 py-4 bg-white font-bold text-lg rounded-xl shadow-xl hover:bg-blue-50 transition-all hover:scale-105 heading"
        style={{ color: "#0B3A66" }}>
        Start Free Assessment →
      </Link>
      <p className="text-blue-300/70 text-xs mt-4">No account needed · Results in minutes</p>

      <DemoLinks />
    </main>
  );
}
