"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SavedReports from "@/app/SavedReports";

const TIMELINES = [
  { value: "6 months",  label: "6 Months",  desc: "Quick wins — visible results fast",         icon: "⚡" },
  { value: "12 months", label: "12 Months", desc: "Structured transformation in a year",         icon: "📅" },
  { value: "24 months", label: "24 Months", desc: "Deep capability building",                    icon: "🏗️" },
  { value: "36+ months",label: "36+ Months",desc: "Long-term enterprise-wide transformation",    icon: "🚀" },
];

const FOCUS_AREAS = [
  { value: "Strategy & Leadership",       icon: "🎯", desc: "Vision, governance, external awareness" },
  { value: "Operations & Supply Chain",   icon: "⚙️", desc: "Process efficiency, automation, vendors" },
  { value: "Sales & Marketing",           icon: "📈", desc: "Digital channels, CRM, customer intelligence" },
  { value: "Technology & Infrastructure", icon: "💻", desc: "Systems, cloud, data & analytics" },
  { value: "Skills & Capabilities",       icon: "🧠", desc: "Training, culture, leadership decisions" },
];

const INDUSTRIES = [
  "Manufacturing","Retail & Distribution","IT / Software Services","Professional Services",
  "Healthcare & Pharma","Logistics & Transport","Food & Beverages","Construction & Real Estate",
  "Education","Financial Services","Other"
];

const SIZES = ["< 10 employees","10–50 employees","51–250 employees","251–1000 employees","> 1000 employees"];

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState<1|2|3>(1);
  const [form, setForm] = useState({
    companyName: "", industry: "", size: "", city: "",
    timeline: "", focusArea: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const step1Valid = form.companyName.trim() && form.industry && form.size;
  const step2Valid = !!form.timeline;
  const step3Valid = !!form.focusArea;

  const handleStart = () => {
    if (!step3Valid) return;
    sessionStorage.setItem("dtas_context", JSON.stringify(form));
    sessionStorage.removeItem("dtas_progress"); // clear any previous assessment
    router.push("/questionnaire");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
         style={{ background: "linear-gradient(160deg, #0B3A66 0%, #1e3a5f 40%, #0f2744 100%)" }}>

      {/* Progress steps */}
      <div className="flex items-center gap-3 mb-10">
        {[1,2,3].map(s => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${s < step ? "bg-green-400 text-white" : s === step ? "bg-white text-blue-900" : "bg-white/20 text-white/60"}`}>
              {s < step ? "✓" : s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 ${s < step ? "bg-green-400" : "bg-white/20"}`}/>}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg">

        {/* ── Step 1: Company Details ── */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🏢</div>
              <h2 className="text-2xl heading text-gray-900">Tell us about your company</h2>
              <p className="text-gray-500 text-sm mt-1">This personalises your benchmark comparison</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Name *</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={e => set("companyName", e.target.value)}
                  placeholder="e.g. Acme Industries Pvt Ltd"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors text-gray-800"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Industry *</label>
                <select
                  value={form.industry}
                  onChange={e => set("industry", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors text-gray-800 bg-white"
                >
                  <option value="">Select industry…</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Size *</label>
                <div className="grid grid-cols-2 gap-2">
                  {SIZES.map(s => (
                    <button key={s} onClick={() => set("size", s)}
                      className={`px-3 py-2.5 rounded-xl border-2 text-sm text-left transition-all
                        ${form.size === s ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 text-gray-600 hover:border-blue-300"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">City / Region</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => set("city", e.target.value)}
                  placeholder="e.g. Mumbai, Delhi NCR…"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors text-gray-800"
                />
              </div>
            </div>

            <button onClick={() => setStep(2)} disabled={!step1Valid}
              className="w-full mt-6 py-4 rounded-2xl text-white font-bold text-lg heading transition-all disabled:opacity-40 hover:scale-[1.02]"
              style={{ background: step1Valid ? "linear-gradient(90deg,#1F4ED8,#0B3A66)" : undefined }}>
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Timeline ── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">⏱️</div>
              <h2 className="text-2xl heading text-gray-900">What&apos;s your transformation timeline?</h2>
              <p className="text-gray-500 text-sm mt-1">
                When do you need to see meaningful business impact from digital transformation?
              </p>
            </div>

            <div className="space-y-3">
              {TIMELINES.map(t => (
                <button key={t.value} onClick={() => set("timeline", t.value)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01]
                    ${form.timeline === t.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300"}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{t.icon}</span>
                    <div className="flex-1">
                      <div className={`font-bold heading ${form.timeline === t.value ? "text-blue-700" : "text-gray-800"}`}>
                        {t.label}
                      </div>
                      <div className="text-sm text-gray-500">{t.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${form.timeline === t.value ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                      {form.timeline === t.value && <div className="w-2 h-2 rounded-full bg-white"/>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep(3)} disabled={!step2Valid}
                className="flex-1 py-3 rounded-2xl text-white font-bold heading transition-all disabled:opacity-40 hover:scale-[1.01]"
                style={{ background: step2Valid ? "linear-gradient(90deg,#1F4ED8,#0B3A66)" : "#9ca3af" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Focus Area ── */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-2xl heading text-gray-900">Where is your primary focus?</h2>
              <p className="text-gray-500 text-sm mt-1">
                Which area of the business most needs improvement in your <strong>{form.timeline}</strong> window?
              </p>
            </div>

            <div className="space-y-3">
              {FOCUS_AREAS.map(f => (
                <button key={f.value} onClick={() => set("focusArea", f.value)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01]
                    ${form.focusArea === f.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300"}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{f.icon}</span>
                    <div className="flex-1">
                      <div className={`font-bold heading ${form.focusArea === f.value ? "text-blue-700" : "text-gray-800"}`}>
                        {f.value}
                      </div>
                      <div className="text-sm text-gray-500">{f.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${form.focusArea === f.value ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                      {form.focusArea === f.value && <div className="w-2 h-2 rounded-full bg-white"/>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={handleStart} disabled={!step3Valid}
                className="flex-1 py-4 rounded-2xl text-white font-bold text-lg heading transition-all disabled:opacity-40 hover:scale-[1.01]"
                style={{ background: step3Valid ? "linear-gradient(90deg,#1a7a4a,#0f5c37)" : "#9ca3af" }}>
                Start Assessment 🚀
              </button>
            </div>
          </div>
        )}
      </div>

      <SavedReports />
    </div>
  );
}
