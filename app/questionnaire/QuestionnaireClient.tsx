"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import questionnaire from "@/src/data/questionnaire.json";

type Question = typeof questionnaire.questions[0];

// ── Config ──────────────────────────────────────────────────────────────────
const XP_PER_ANSWER = 25;
const DIM_ICONS: Record<string, string> = {
  D1:"🎯", D2:"⚙️", D3:"📈", D4:"💻", D5:"🧠"
};
const DIM_GRADIENTS: Record<string, [string,string]> = {
  D1:["#0B3A66","#1F4ED8"],
  D2:["#064e3b","#059669"],
  D3:["#4c1d95","#7c3aed"],
  D4:["#7c2d12","#ea580c"],
  D5:["#1e3a5f","#0891b2"],
};
const OPTION_SCORES: Record<string,number> = {O1:1,O2:2,O3:3,O4:4};
const OPTION_LABELS = ["O1","O2","O3","O4"] as const;

const SCORE_LABELS: Record<number,{label:string;emoji:string;color:string}> = {
  1:{label:"Early stage",    emoji:"🌱",color:"#d9534f"},
  2:{label:"Developing",     emoji:"🔶",color:"#f0ad4e"},
  3:{label:"Progressing",    emoji:"⭐",color:"#5cb85c"},
  4:{label:"Leading",        emoji:"🏆",color:"#1a7a4a"},
};

const STREAK_MSGS = ["On a roll! 🔥","Keep it up! ⚡","You're crushing it! 💪","Unstoppable! 🚀"];
const MOTIVATIONAL = [
  ["1","Let's discover where you stand! 🎯"],
  ["15","Great start! You've finished the first dimension! 🎉"],
  ["30","Halfway through! You're doing amazing! 💫"],
  ["45","Three down, two to go! Keep going! 🔥"],
  ["60","Almost there! Just one dimension left! 🏁"],
  ["74","Last question! The finish line is in sight! 🏆"],
];

// ── Main Component ───────────────────────────────────────────────────────────
export default function QuestionnaireClient() {
  const router = useRouter();
  const allQ = questionnaire.questions;
  const dims = questionnaire.dimensions;

  const [current, setCurrent] = useState(0);         // global question index
  const [answers, setAnswers] = useState<Record<string,number>>({}); // id → score
  const [selected, setSelected] = useState<string|null>(null); // option key in current q
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakMsg, setStreakMsg] = useState<string|null>(null);
  const [motivMsg, setMotivMsg] = useState<string|null>(null);
  const [entering, setEntering] = useState(false);   // animation state
  const [leaving, setLeavingAnim] = useState(false);
  const [unlockedDims, setUnlockedDims] = useState<Set<string>>(new Set());
  const [showBadge, setShowBadge] = useState<string|null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  const q: Question = allQ[current];
  const totalQ = allQ.length;
  const progress = Math.round((Object.keys(answers).length / totalQ) * 100);

  // Current dim info
  const dimMeta = dims.find(d => d.code === q.dim_code)!;
  const [g1, g2] = DIM_GRADIENTS[q.dim_code] ?? ["#0B3A66","#1F4ED8"];

  // Questions answered in current dim
  const dimDoneCount = allQ
    .filter(x => x.dim_code === q.dim_code)
    .filter(x => answers[x.id] !== undefined).length;
  const dimTotal = dimMeta.n_questions;

  // Restore progress if user navigated away accidentally
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("dtas_progress");
      if (saved) {
        const { current: c, answers: a } = JSON.parse(saved);
        if (Object.keys(a).length > 0) {
          setCurrent(c);
          setAnswers(a);
          setXp(Object.keys(a).length * XP_PER_ANSWER);
        }
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress on every answer
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    try {
      sessionStorage.setItem("dtas_progress", JSON.stringify({ current, answers }));
    } catch { /* ignore */ }
  }, [current, answers]);

  // Trigger entering animation on mount
  useEffect(() => { setEntering(true); setTimeout(()=>setEntering(false),400); }, [current]);

  // Show motivational message at milestones
  useEffect(() => {
    const idx = Object.keys(answers).length;
    const match = MOTIVATIONAL.find(([n]) => String(idx) === n);
    if (match) {
      setMotivMsg(match[1]);
      setTimeout(()=>setMotivMsg(null), 2800);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Object.keys(answers).length]);

  const handleOption = (opt: string) => {
    if (selected) return; // prevent re-selection
    setSelected(opt);
  };

  const handleConfirm = () => {
    if (!selected) return;

    const score = OPTION_SCORES[selected];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    setXp(x => x + XP_PER_ANSWER);

    // Streak logic (consecutive 3 or 4)
    const newStreak = score >= 3 ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > 0 && newStreak % 3 === 0) {
      setStreakMsg(STREAK_MSGS[Math.floor(Math.random() * STREAK_MSGS.length)]);
      setTimeout(()=>setStreakMsg(null), 2000);
    }

    // Check dim complete
    const dimQs = allQ.filter(x => x.dim_code === q.dim_code);
    const newDimAnswered = dimQs.filter(x => newAnswers[x.id] !== undefined).length;
    if (newDimAnswered === dimQs.length && !unlockedDims.has(q.dim_code)) {
      const newUnlocked = new Set(unlockedDims);
      newUnlocked.add(q.dim_code);
      setUnlockedDims(newUnlocked);
      setShowBadge(q.dim_code);
      setTimeout(()=>setShowBadge(null), 2200);
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    if (current < totalQ - 1) {
      setLeavingAnim(true);
      timerRef.current = setTimeout(() => {
        setLeavingAnim(false);
        setSelected(null);
        setCurrent(c => c + 1);
      }, 380);
    } else {
      // Done — clear saved progress and navigate to results
      sessionStorage.removeItem("dtas_progress");
      const arr = allQ.map(x => newAnswers[x.id] ?? 1);
      const encoded = encodeURIComponent(JSON.stringify(arr));
      router.push(`/results?answers=${encoded}`);
    }
  };

  const goBack = () => {
    if (current === 0) return;
    const prev = current - 1;
    const prevQ = allQ[prev];
    const newAnswers = { ...answers };
    delete newAnswers[prevQ.id];
    setAnswers(newAnswers);
    setSelected(null);
    setCurrent(prev);
  };

  const scoreInfo = selected ? SCORE_LABELS[OPTION_SCORES[selected]] : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4fa" }}>

      {/* ── Top progress bar ─────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-gray-200">
        <div className="h-full transition-all duration-500 rounded-r-full"
             style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${g1}, ${g2})` }} />
      </div>

      {/* ── Toast messages ──────────────────────────────── */}
      {streakMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce heading">
          {streakMsg}
        </div>
      )}
      {motivMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl heading text-center">
          {motivMsg}
        </div>
      )}
      {showBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl text-center animate-pulse">
            <div className="text-6xl mb-2">{DIM_ICONS[showBadge]}</div>
            <div className="heading text-xl text-gray-800">Dimension Complete!</div>
            <div className="text-blue-600 font-medium mt-1">
              {dims.find(d=>d.code===showBadge)?.label}
            </div>
            <div className="text-2xl mt-2">🏅 +Badge Earned</div>
          </div>
        </div>
      )}

      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-1.5 z-40 pt-3 pb-2 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">

          {/* Dim pills */}
          <div className="flex gap-1.5 flex-wrap">
            {dims.map(d => {
              const done = unlockedDims.has(d.code);
              const active = d.code === q.dim_code;
              const dimAnswered = allQ.filter(x=>x.dim_code===d.code&&answers[x.id]).length;
              const dimTot = d.n_questions;
              return (
                <div key={d.code}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                    ${done ? "bg-green-500 text-white" : active ? "text-white shadow-md" : "bg-white/70 text-gray-500"}`}
                  style={active ? { background: `linear-gradient(90deg,${g1},${g2})` } : {}}>
                  {DIM_ICONS[d.code]}
                  <span className="hidden sm:inline">{d.code}</span>
                  {done ? " ✓" : active ? ` ${dimAnswered}/${dimTot}` : ""}
                </div>
              );
            })}
          </div>

          {/* XP */}
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm">
            <span className="text-yellow-500 text-sm">⚡</span>
            <span className="heading text-sm text-gray-700">{xp} XP</span>
            {streak >= 3 && <span className="text-orange-500 text-sm">🔥×{streak}</span>}
          </div>
        </div>
      </header>

      {/* ── Question card ───────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Question number + dim label */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white mb-2"
                 style={{ background: `linear-gradient(90deg,${g1},${g2})` }}>
              {DIM_ICONS[q.dim_code]} {dimMeta.label}
            </div>
            <div className="text-gray-400 text-sm">
              Question <span className="font-bold text-gray-600">{current + 1}</span> of {totalQ}
              <span className="mx-2">·</span>
              <span className="text-gray-500">{dimDoneCount}/{dimTotal} in this dimension</span>
            </div>
          </div>

          {/* Card */}
          <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden
            transition-all duration-300
            ${leaving ? "opacity-0 translate-x-8" : entering ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"}`}>

            {/* Card header gradient */}
            <div className="px-8 pt-7 pb-5" style={{ background: `linear-gradient(135deg,${g1}18,${g2}10)` }}>
              {q.group && (
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: g1 }}>
                  {q.group}
                </div>
              )}
              <h2 className="text-gray-900 text-lg md:text-xl font-semibold leading-snug">
                {q.question}
              </h2>
            </div>

            {/* Options */}
            <div className="px-6 pb-4 pt-2 space-y-2.5">
              {OPTION_LABELS.map((opt, oi) => {
                const text = q.options[opt];
                if (!text) return null;
                const isSelected = selected === opt;
                const score = OPTION_SCORES[opt];
                const scoreColors = ["#d9534f","#f0ad4e","#5cb85c","#1a7a4a"];
                const scColor = scoreColors[oi];
                return (
                  <button key={opt} onClick={() => handleOption(opt)}
                    disabled={!!selected && !isSelected}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-200
                      ${isSelected
                        ? "shadow-lg scale-[1.01]"
                        : selected
                          ? "opacity-40 cursor-not-allowed"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm hover:scale-[1.005]"}`}
                    style={isSelected ? { borderColor: scColor, background: `${scColor}12` } : {}}>
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                        ${isSelected ? "text-white" : "text-gray-400 bg-gray-100"}`}
                        style={isSelected ? { background: scColor } : {}}>
                        {score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${isSelected ? "font-medium" : "text-gray-700"}`}
                           style={isSelected ? { color: scColor === "#f0ad4e" ? "#92400e" : scColor } : {}}>
                          {text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Insight preview on selection */}
            {selected && scoreInfo && (
              <div className="mx-6 mb-4 p-3 rounded-2xl border"
                   style={{ borderColor: `${SCORE_LABELS[OPTION_SCORES[selected]].color}40`,
                            background: `${SCORE_LABELS[OPTION_SCORES[selected]].color}08` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{scoreInfo.emoji}</span>
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: scoreInfo.color }}>
                    {scoreInfo.label}
                  </span>
                </div>
                {q.insights[selected as keyof typeof q.insights] && (
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    {q.insights[selected as keyof typeof q.insights]}
                  </p>
                )}
              </div>
            )}

            {/* Confirm button */}
            <div className="px-6 pb-6 flex gap-3">
              {current > 0 && (
                <button onClick={goBack}
                  className="px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
              )}
              <button onClick={handleConfirm} disabled={!selected}
                className="flex-1 py-3.5 rounded-2xl text-white font-bold heading transition-all disabled:opacity-30 hover:scale-[1.01]"
                style={{ background: selected
                  ? `linear-gradient(90deg,${g1},${g2})`
                  : "#9ca3af" }}>
                {selected
                  ? current < totalQ - 1 ? "Next Question →" : "See My Report 🎉"
                  : "Select an answer to continue"}
              </button>
            </div>
          </div>

          {/* Mini score preview */}
          <div className="mt-4 flex justify-center gap-1.5">
            {allQ.slice(Math.max(0,current-4), current+5).map((qx, i) => {
              const globalIdx = Math.max(0,current-4)+i;
              const a = answers[qx.id];
              const isCur = globalIdx === current;
              const colors = ["#d9534f","#f0ad4e","#5cb85c","#1a7a4a"];
              return (
                <div key={qx.id}
                  className={`rounded-full transition-all duration-300 ${isCur ? "w-5 h-5 ring-2 ring-blue-400" : "w-3 h-3"}`}
                  style={{ background: a ? colors[a-1] : isCur ? g1 : "#e5e7eb" }}/>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
