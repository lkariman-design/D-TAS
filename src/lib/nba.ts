import type { ScoreResult } from "./scorer";

export interface ExpertProfile {
  role: string;
  skills: string[];
}

export interface NBACard {
  id: string;
  rank: number;
  title: string;
  dimension: string;
  dimCode: string;
  what: string;
  whyNow: string;
  whatImproves: string;
  businessBenefit: string;
  effort: "Low" | "Medium" | "High";
  timeline: "0-3 months" | "3-6 months" | "6-12 months" | "12-24 months";
  capexBand: "< ₹50L" | "₹50L–2Cr" | "₹2–10Cr" | "> ₹10Cr";
  doNothingRisk: string;
  // Engagement
  engagementType: string;
  engagementDuration: string;
  experts: ExpertProfile[];
  score: number;
  tags: string[];
}

export type Timeline = "6 months" | "12 months" | "24 months" | "36+ months";
export type FocusArea = string;

const ACTION_TEMPLATES: {
  dimCode: string; group: string; title: string; what: string; whyNow: string;
  whatImproves: string; businessBenefit: string; effort: "Low"|"Medium"|"High";
  timelineMonths: number; capexBand: NBACard["capexBand"]; doNothingRisk: string;
  engagementType: string; engagementDuration: string;
  experts: ExpertProfile[];
  tags: string[];
}[] = [
  // ── D1 Strategy & Leadership ────────────────────────────────────────────────
  {
    dimCode:"D1", group:"vision",
    title:"Define a Digital Vision & 90-Day Roadmap",
    what:"Run a 2-day leadership offsite to articulate a 3-year digital vision and break it into a 90-day action roadmap with named owners.",
    whyNow:"Without a written vision, digital initiatives stay fragmented. Peers with a formal roadmap move 2× faster on execution.",
    whatImproves:"D1 score +15–20 pts; Strategy & Leadership from Siloed → Strategic within 6 months.",
    businessBenefit:"Reduces initiative duplication, cuts decision lag by ~30%, aligns team effort toward one measurable outcome.",
    effort:"Low", timelineMonths:3, capexBand:"< ₹50L",
    doNothingRisk:"Digital spend continues without coordination; teams pull in different directions and ROI stays invisible.",
    engagementType:"Strategic Advisory Workshop",
    engagementDuration:"2-day offsite + 4-week roadmap finalisation",
    experts:[
      { role:"Digital Transformation Consultant", skills:["Digital strategy","Roadmap facilitation","OKR framework","Executive alignment","Change leadership"] },
      { role:"Business Strategy Advisor", skills:["Strategic planning","Competitive analysis","Board-level communication","Vision articulation"] },
    ],
    tags:["Quick win","Leadership","Strategy"]
  },
  {
    dimCode:"D1", group:"governance",
    title:"Stand Up a Digital Steering Committee",
    what:"Form a cross-functional digital committee (CEO, COO, Head of IT/Ops, 1 external advisor) that meets monthly to review KPIs and unblock decisions.",
    whyNow:"Governance gaps are the #1 reason SME digital programs stall after the first 3 months.",
    whatImproves:"D1 governance sub-score +18 pts; reduces average initiative delay from 6 weeks to 2 weeks.",
    businessBenefit:"Faster decision cycles translate directly to faster revenue realisation from digital investments.",
    effort:"Low", timelineMonths:2, capexBand:"< ₹50L",
    doNothingRisk:"Digital decisions default to the loudest voice; accountability is diffuse and budgets get reallocated.",
    engagementType:"Governance Advisory",
    engagementDuration:"3-week setup + ongoing monthly facilitation",
    experts:[
      { role:"Governance & Organisational Design Consultant", skills:["Digital governance frameworks","Committee charter design","KPI / OKR design","Executive facilitation"] },
      { role:"Change Manager", skills:["Stakeholder engagement","Communication planning","Meeting cadence design","Accountability frameworks"] },
    ],
    tags:["Governance","Leadership","Quick win"]
  },
  {
    dimCode:"D1", group:"external",
    title:"Industry Intelligence Subscription & Quarterly Briefing",
    what:"Subscribe to 1 paid industry intelligence feed (NASSCOM, IBEF, sector-specific) and schedule quarterly competitor benchmarking reviews with the leadership team.",
    whyNow:"External awareness is a leading indicator of strategic timing. Companies that monitor trends act 6–9 months earlier than reactive ones.",
    whatImproves:"D1 External Awareness group: +12 pts.",
    businessBenefit:"Identify emerging customer expectations before they become competitive threats; redirect product/service investments earlier.",
    effort:"Low", timelineMonths:2, capexBand:"< ₹50L",
    doNothingRisk:"Strategy stays inside-out; you react to market shifts instead of anticipating them.",
    engagementType:"Strategic Intelligence Advisory",
    engagementDuration:"2-week setup + quarterly 1-day reviews",
    experts:[
      { role:"Market Research & Intelligence Analyst", skills:["Competitive benchmarking","Industry analysis","Trend mapping","PESTLE analysis","NASSCOM/IBEF reports"] },
      { role:"Digital Strategy Consultant", skills:["External awareness frameworks","Strategic planning","Scenario planning","Board reporting"] },
    ],
    tags:["External Awareness","Strategy","Low cost"]
  },
  {
    dimCode:"D1", group:"resource",
    title:"Create a Ring-Fenced Digital Budget Line",
    what:"Carve out a dedicated digital transformation budget (recommended 3–5% of revenue) that cannot be repurposed to operational firefighting.",
    whyNow:"82% of SMEs that failed to sustain digital programs cite budget reallocation as the primary cause (NASSCOM 2023).",
    whatImproves:"D1 Resource Commitment score: +20 pts; sends a credibility signal to the team.",
    businessBenefit:"Enables continuous investment rhythm; avoids stop-start execution that erodes ROI.",
    effort:"Low", timelineMonths:1, capexBand:"< ₹50L",
    doNothingRisk:"Digital initiatives compete with operations for the same pool; transformation loses every time there is a short-term pressure.",
    engagementType:"Financial & Investment Advisory",
    engagementDuration:"1-week assessment + CFO workshop",
    experts:[
      { role:"CFO Advisory / Financial Strategy Consultant", skills:["Digital investment planning","Budget structuring","ROI & NPV frameworks","Board presentation","Capital allocation"] },
      { role:"Digital Transformation Consultant", skills:["Investment prioritisation","Business case development","Programme financing","Benefit realisation tracking"] },
    ],
    tags:["Resource","Budget","Foundation"]
  },

  // ── D2 Operations & Supply Chain ────────────────────────────────────────────
  {
    dimCode:"D2", group:"process",
    title:"Map & Digitise Your Top 3 Core Processes",
    what:"Select the 3 highest-volume internal processes (order management, invoicing, inventory) and implement digital workflow tools (e.g., Zoho, Monday.com, or a custom ERPNext module) to replace manual steps.",
    whyNow:"Manual processes are the biggest drag on SME operating margin. Even a 20% automation of high-volume workflows yields measurable payback in 6 months.",
    whatImproves:"D2 Process Visibility score: +22 pts; error rate reduction of 40–60% in digitised processes.",
    businessBenefit:"10–15% reduction in operational overhead; real-time status visibility for leadership.",
    effort:"Medium", timelineMonths:6, capexBand:"₹50L–2Cr",
    doNothingRisk:"Process bottlenecks compound as volume grows; the cost of manual errors scales with revenue.",
    engagementType:"Process Implementation Project",
    engagementDuration:"8–12 weeks (discovery → design → build → train)",
    experts:[
      { role:"Business Process Consultant", skills:["Process mapping (BPMN/VSM)","Lean / Six Sigma","Workflow automation","As-is / to-be analysis","Change management"] },
      { role:"ERP / Digital Workflow Specialist", skills:["Zoho Operations","ERPNext","Monday.com","Process digitisation","System configuration"] },
      { role:"Project Manager", skills:["Agile project delivery","Stakeholder management","User acceptance testing","Training delivery"] },
    ],
    tags:["Process","Automation","Efficiency"]
  },
  {
    dimCode:"D2", group:"supply",
    title:"Vendor Portal & Digital PO Workflow",
    what:"Deploy a lightweight vendor portal (WhatsApp Business API or a web portal) for digital PO issuance, delivery confirmation, and invoice matching.",
    whyNow:"Supply chain disruptions cost Indian SMEs an average of 12 days/year in procurement delays (MSME report 2023). Digital PO workflows cut this by 60%.",
    whatImproves:"D2 Supply Chain sub-score: +16 pts.",
    businessBenefit:"Reduces procurement cycle time by 3–5 days; eliminates duplicate payments; improves vendor relationships.",
    effort:"Medium", timelineMonths:5, capexBand:"₹50L–2Cr",
    doNothingRisk:"Manual procurement remains a hidden cost centre that grows opaque as vendor count increases.",
    engagementType:"Technology Deployment",
    engagementDuration:"6–8 weeks",
    experts:[
      { role:"Supply Chain / Procurement Consultant", skills:["Digital procurement design","Vendor onboarding","PO workflow design","Supplier relationship management"] },
      { role:"Full-Stack Developer / Integration Specialist", skills:["WhatsApp Business API","Web portal development","REST API integration","ERP connectors","Mobile-first UI"] },
    ],
    tags:["Supply Chain","Vendor","Automation"]
  },
  {
    dimCode:"D2", group:"quality",
    title:"Digital Quality & Compliance Checklist System",
    what:"Replace paper-based quality checklists with a mobile-first digital form system (KoBoToolbox, FormStack, or Salesforce Field Service) with automatic escalation for non-conformances.",
    whyNow:"Regulatory compliance failures are increasingly costly. Digital audit trails reduce inspection prep time by 70%.",
    whatImproves:"D2 Quality & Compliance score: +18 pts.",
    businessBenefit:"Avoid non-compliance penalties; reduce rework costs by 25%; pass audits faster.",
    effort:"Low", timelineMonths:3, capexBand:"< ₹50L",
    doNothingRisk:"Paper trails are incomplete; compliance gaps surface only during audits when remediation is expensive.",
    engagementType:"Process Implementation",
    engagementDuration:"4–6 weeks",
    experts:[
      { role:"Quality Management Consultant", skills:["ISO 9001 / QMS standards","Digital audit trails","Non-conformance management","Regulatory compliance (FSSAI / BIS / CDSCO)"] },
      { role:"Digital Forms & Workflow Specialist", skills:["KoBoToolbox / FormStack","Mobile form design","Escalation workflow logic","Dashboard reporting"] },
    ],
    tags:["Quality","Compliance","Low cost"]
  },

  // ── D3 Sales & Marketing ────────────────────────────────────────────────────
  {
    dimCode:"D3", group:"digital-channels",
    title:"Launch a Conversion-Optimised Digital Presence",
    what:"Rebuild or significantly improve your website with clear value proposition, lead capture forms, and Google Analytics 4 tracking. Add Google My Business listing and LinkedIn company page.",
    whyNow:"73% of B2B buyers research vendors online before first contact. An unconverted web presence means losing deals before the first conversation.",
    whatImproves:"D3 Digital Channels score: +20 pts; lead volume +30–50% within 90 days.",
    businessBenefit:"Measurable increase in inbound leads; reduces dependence on referral-only pipeline.",
    effort:"Medium", timelineMonths:4, capexBand:"₹50L–2Cr",
    doNothingRisk:"Competitors with stronger digital presence capture the research phase; your sales team is always playing catch-up.",
    engagementType:"Digital Marketing Implementation",
    engagementDuration:"6–8 weeks (strategy → design → build → launch)",
    experts:[
      { role:"Digital Marketing Strategist", skills:["SEO / SEM","Google Analytics 4","CRO (Conversion Rate Optimisation)","Content strategy","B2B lead generation"] },
      { role:"Web Designer / Developer", skills:["UX/UI design","Next.js / WordPress / Webflow","Lead capture & form integration","Core Web Vitals optimisation"] },
      { role:"Social Media & Brand Specialist", skills:["LinkedIn B2B marketing","Google My Business","Brand positioning","Content calendar management"] },
    ],
    tags:["Digital Channels","Marketing","Lead Generation"]
  },
  {
    dimCode:"D3", group:"crm",
    title:"Implement a CRM & Sales Pipeline Tracker",
    what:"Deploy a CRM (HubSpot Free, Zoho CRM, or Freshsales) to track all leads, pipeline stages, follow-up tasks, and win/loss reasons.",
    whyNow:"Companies without a CRM lose 20–30% of deals due to missed follow-ups. Pipeline visibility is the first step to predictable revenue.",
    whatImproves:"D3 Customer Relationship score: +24 pts; follow-up rate goes from sporadic to 100%.",
    businessBenefit:"15–25% improvement in conversion rates; accurate revenue forecasting.",
    effort:"Low", timelineMonths:2, capexBand:"< ₹50L",
    doNothingRisk:"Sales outcomes remain person-dependent and non-transferable; losing a salesperson means losing relationship context.",
    engagementType:"Technology Deployment",
    engagementDuration:"4–6 weeks (config → data migration → training → go-live)",
    experts:[
      { role:"CRM Implementation Consultant", skills:["HubSpot / Zoho CRM / Freshsales","Sales process design","Pipeline stage configuration","Workflow automation","CRM data migration"] },
      { role:"Sales Enablement Trainer", skills:["Sales methodology (SPIN / Challenger)","CRM user adoption","Follow-up cadence design","Reporting & forecasting"] },
    ],
    tags:["CRM","Sales","Quick win"]
  },
  {
    dimCode:"D3", group:"customer-intelligence",
    title:"Customer Segmentation & Insight Programme",
    what:"Conduct a 30-day data collection exercise (post-purchase survey, NPS, exit interviews) to segment customers by value, need, and digital readiness. Use outputs to personalise outreach.",
    whyNow:"Undifferentiated sales approaches leave revenue on the table. Segmentation typically yields 20% uplift in cross-sell and upsell.",
    whatImproves:"D3 Customer Intelligence score: +19 pts.",
    businessBenefit:"Higher average order value; reduced churn through proactive intervention for at-risk segments.",
    effort:"Low", timelineMonths:2, capexBand:"< ₹50L",
    doNothingRisk:"Sales team pitches the same product to every customer; misses upsell and loses price-sensitive customers to cheaper alternatives.",
    engagementType:"Data & Customer Research Advisory",
    engagementDuration:"4–6 weeks (research → analysis → segmentation → playbook)",
    experts:[
      { role:"Customer Experience (CX) Analyst", skills:["Customer segmentation","NPS / CSAT design","Survey design & analysis","Persona development","Journey mapping"] },
      { role:"Data Analyst", skills:["Excel / Python data analysis","Customer lifetime value (CLV)","Cohort analysis","Tableau / Looker Studio","Statistical segmentation"] },
    ],
    tags:["Customer Intelligence","Data","Sales"]
  },

  // ── D4 Technology & Infrastructure ─────────────────────────────────────────
  {
    dimCode:"D4", group:"systems",
    title:"Core Business System Consolidation (ERP/Accounting)",
    what:"Migrate from disconnected spreadsheets and legacy tools to an integrated cloud ERP or accounting platform (Tally Prime, Zoho Books, SAP Business One) covering finance, inventory, and orders.",
    whyNow:"Disconnected systems create data islands that cost 10+ hours/week in reconciliation. Integration is the foundation for all further digital capabilities.",
    whatImproves:"D4 Core Systems score: +25 pts; data reconciliation time reduced by 70%.",
    businessBenefit:"Real-time financial visibility; faster month-end close (5 days → 2 days); audit-ready records.",
    effort:"High", timelineMonths:9, capexBand:"₹2–10Cr",
    doNothingRisk:"Scaling operations without integrated systems creates exponential reconciliation overhead; errors compound.",
    engagementType:"Technology Deployment (ERP Implementation)",
    engagementDuration:"16–24 weeks (requirements → vendor selection → implementation → UAT → go-live)",
    experts:[
      { role:"ERP Implementation Consultant", skills:["Tally Prime / Zoho Books / SAP B1 / Oracle NetSuite","Business requirements gathering","Data migration & cleansing","Module configuration","UAT management"] },
      { role:"Change Manager", skills:["User adoption planning","Training needs analysis","Resistance management","Communications & rollout planning"] },
      { role:"Project Manager (Technology)", skills:["IT project delivery (PMP / PRINCE2)","Vendor management","Risk & issue management","Timeline & budget control"] },
    ],
    tags:["ERP","Systems","Foundation"]
  },
  {
    dimCode:"D4", group:"infrastructure",
    title:"Cloud Migration & Cybersecurity Baseline",
    what:"Move critical systems to a cloud provider (AWS, Azure, or GCP), implement MFA on all business accounts, set up automated daily backups, and run a security awareness session for staff.",
    whyNow:"60% of SMEs that experience a data breach close within 6 months. Cloud migration + basic cyber hygiene reduces risk exposure by 80%.",
    whatImproves:"D4 IT Infrastructure score: +21 pts.",
    businessBenefit:"Business continuity assurance; enables remote work; reduces hardware CAPEX by 40%.",
    effort:"Medium", timelineMonths:5, capexBand:"₹50L–2Cr",
    doNothingRisk:"Single-point hardware failures cause unplanned downtime; zero backup means complete data loss exposure.",
    engagementType:"Technology Deployment",
    engagementDuration:"8–12 weeks (assessment → architecture → migration → security hardening)",
    experts:[
      { role:"Cloud Architect / Cloud Engineer", skills:["AWS / Azure / GCP","Cloud migration planning","Infrastructure as Code (Terraform)","Cost optimisation","DR & backup design"] },
      { role:"Cybersecurity Consultant", skills:["Security baseline assessment","MFA & identity management","Staff security awareness training","Incident response planning","VAPT (Vulnerability Assessment)"] },
    ],
    tags:["Cloud","Security","Infrastructure"]
  },
  {
    dimCode:"D4", group:"data-analytics",
    title:"Business Intelligence Dashboard for Leadership",
    what:"Deploy a BI tool (Power BI, Zoho Analytics, or Google Looker Studio) connected to your ERP and CRM, with 5–7 key dashboards refreshed daily for leadership.",
    whyNow:"Leaders making decisions from weekly PDF reports are 2–3 weeks behind the curve. Real-time dashboards shift decision-making from reactive to proactive.",
    whatImproves:"D4 Data & Analytics score: +20 pts.",
    businessBenefit:"Faster identification of underperforming areas; 40% reduction in reporting effort.",
    effort:"Medium", timelineMonths:4, capexBand:"₹50L–2Cr",
    doNothingRisk:"Strategic decisions are based on stale data; opportunities and risks surface too late to act on.",
    engagementType:"Technology Deployment (BI & Analytics)",
    engagementDuration:"6–8 weeks (KPI design → data modelling → dashboard build → training)",
    experts:[
      { role:"BI Developer / Data Engineer", skills:["Power BI / Looker Studio / Zoho Analytics","Data modelling (star schema)","DAX / SQL","ERP & CRM data connectors","Dashboard UX design"] },
      { role:"Business Analyst", skills:["KPI definition & prioritisation","Requirements gathering","Stakeholder interviews","Data storytelling","Report governance"] },
    ],
    tags:["Analytics","BI","Data"]
  },

  // ── D5 Skills & Capabilities ────────────────────────────────────────────────
  {
    dimCode:"D5", group:"training",
    title:"Digital Skills Baseline Assessment & Training Plan",
    what:"Run a 1-week digital skills assessment across all teams (Google Digital Garage or custom), identify top-5 skill gaps, and create a 6-month learning plan with named tools and online certifications.",
    whyNow:"Technology investments return zero if teams can't use them. Skills gaps are the #1 reason deployed tools get abandoned within 90 days.",
    whatImproves:"D5 Training & Upskilling score: +22 pts.",
    businessBenefit:"Higher adoption of existing digital tools (typical uplift: 35%); reduces shadow IT and workarounds.",
    effort:"Low", timelineMonths:3, capexBand:"< ₹50L",
    doNothingRisk:"New tools gather dust; team reverts to manual processes; digital investments deliver negative ROI.",
    engagementType:"Training Programme",
    engagementDuration:"2-week assessment + 6-month structured delivery",
    experts:[
      { role:"L&D (Learning & Development) Consultant", skills:["Skills gap analysis","Competency framework design","Learning path design","LMS platform management (Moodle / TalentLMS)","Certification planning"] },
      { role:"Digital Skills Trainer", skills:["Google Workspace / Microsoft 365","Digital tools facilitation","e-Learning content development","Virtual training delivery","Adult learning principles"] },
    ],
    tags:["Training","People","Quick win"]
  },
  {
    dimCode:"D5", group:"culture",
    title:"Digital Champions Programme",
    what:"Identify 1 'digital champion' per department who receives advanced training and becomes the internal advocate and first-line support for digital tools in their team.",
    whyNow:"Peer-led change adoption is 3× faster than top-down mandates in SME settings. Champions create pull rather than push.",
    whatImproves:"D5 Culture & Change Readiness: +18 pts.",
    businessBenefit:"Faster adoption cycles; self-sustaining improvement culture; reduced dependency on external consultants.",
    effort:"Low", timelineMonths:3, capexBand:"< ₹50L",
    doNothingRisk:"Digital change remains a leadership project rather than a company capability; reverts when leadership attention shifts.",
    engagementType:"Change Management Programme",
    engagementDuration:"8–12 weeks setup + ongoing quarterly coaching",
    experts:[
      { role:"Change Management Consultant", skills:["Champion network design","Prosci ADKAR methodology","Peer learning frameworks","Adoption metrics & dashboards","Organisational change management"] },
      { role:"Internal Capability Coach / Trainer", skills:["Train-the-trainer facilitation","Knowledge transfer design","Digital adoption coaching","Feedback loop design"] },
    ],
    tags:["Culture","Change","People","Quick win"]
  },
  {
    dimCode:"D5", group:"leadership",
    title:"Data-Driven Decision Rituals for Leadership",
    what:"Introduce weekly 30-minute data review sessions for leadership using the BI dashboard, with a structured template: review KPIs → flag deviations → assign owners → record decisions.",
    whyNow:"The gap between data availability and data usage is the biggest wasted investment in SME digital programmes.",
    whatImproves:"D5 Leadership & Decision-Making: +16 pts.",
    businessBenefit:"Decisions are made 5× faster and with higher confidence; accountability improves.",
    effort:"Low", timelineMonths:1, capexBand:"< ₹50L",
    doNothingRisk:"Data systems exist but are ignored; reverts to gut-feel decisions despite digital investment.",
    engagementType:"Organisational Advisory & Coaching",
    engagementDuration:"2-week ritual design + 4-week embedding & coaching",
    experts:[
      { role:"Management Consultant / Executive Advisor", skills:["Decision-making frameworks","Meeting facilitation design","OKR / KPI governance","Executive coaching","Accountability structures"] },
      { role:"Business Analyst", skills:["Dashboard interpretation","Data storytelling","Process documentation","Meeting facilitation","Insights communication"] },
    ],
    tags:["Leadership","Data","Habits","Quick win"]
  },
];

const TIMELINE_FIT: Record<Timeline, number[]> = {
  "6 months":    [1, 3, 6],
  "12 months":   [1, 3, 6, 9, 12],
  "24 months":   [1, 3, 6, 9, 12, 18, 24],
  "36+ months":  [1, 3, 6, 9, 12, 18, 24, 36],
};

function timelineCard(months: number): NBACard["timeline"] {
  if (months <= 3)  return "0-3 months";
  if (months <= 6)  return "3-6 months";
  if (months <= 12) return "6-12 months";
  return "12-24 months";
}

export function generateNBACards(
  result: ScoreResult,
  timeline: Timeline,
  focusDimLabel: string,
  swotWeakDimCodes: string[] = [],
  industryOpportunityDimCodes: string[] = []
): NBACard[] {
  const benchmarks = [48, 44, 42, 39, 41];

  const scored = ACTION_TEMPLATES.map((tpl) => {
    const dim = result.dimensions.find((d) => d.code === tpl.dimCode);
    if (!dim) return null;

    const dimScore = dim.score;
    const bmP50 = benchmarks[["D1","D2","D3","D4","D5"].indexOf(tpl.dimCode)];
    const gapSeverity = Math.max(0, bmP50 - dimScore);

    let score = gapSeverity * 0.5 + (100 - dimScore) * 0.3;

    const dimLabel = dim.label.toLowerCase();
    if (focusDimLabel && dimLabel.includes(focusDimLabel.toLowerCase().split(" ")[0])) score *= 1.35;

    const fitMonths = TIMELINE_FIT[timeline] ?? TIMELINE_FIT["12 months"];
    if (fitMonths.includes(tpl.timelineMonths)) score *= 1.20;

    if (swotWeakDimCodes.includes(tpl.dimCode)) score *= 1.25;
    if (industryOpportunityDimCodes.includes(tpl.dimCode)) score *= 1.20;

    const isStrategicTarget =
      focusDimLabel.toLowerCase().includes(dimLabel.split(" ")[0].toLowerCase()) ||
      industryOpportunityDimCodes.includes(tpl.dimCode) ||
      swotWeakDimCodes.includes(tpl.dimCode);
    if (dimScore > 70 && !isStrategicTarget) score *= 0.5;

    return { tpl, score, dim };
  }).filter(Boolean) as { tpl: typeof ACTION_TEMPLATES[0]; score: number; dim: ScoreResult["dimensions"][0] }[];

  scored.sort((a, b) => b.score - a.score);

  const dimCounts: Record<string, number> = {};
  const maxPerDim = (code: string) => {
    const label = result.dimensions.find(d => d.code === code)?.label ?? "";
    return focusDimLabel && label.toLowerCase().includes(focusDimLabel.toLowerCase().split(" ")[0]) ? 3 : 2;
  };

  const selected: typeof scored = [];
  for (const item of scored) {
    const cnt = dimCounts[item.tpl.dimCode] ?? 0;
    if (cnt < maxPerDim(item.tpl.dimCode)) {
      selected.push(item);
      dimCounts[item.tpl.dimCode] = cnt + 1;
    }
    if (selected.length >= 8) break;
  }

  return selected.map((item, idx) => ({
    id: `NBA_${item.tpl.dimCode}_${idx}`,
    rank: idx + 1,
    title: item.tpl.title,
    dimension: item.dim.label,
    dimCode: item.tpl.dimCode,
    what: item.tpl.what,
    whyNow: item.tpl.whyNow,
    whatImproves: item.tpl.whatImproves,
    businessBenefit: item.tpl.businessBenefit,
    effort: item.tpl.effort,
    timeline: timelineCard(item.tpl.timelineMonths),
    capexBand: item.tpl.capexBand,
    doNothingRisk: item.tpl.doNothingRisk,
    engagementType: item.tpl.engagementType,
    engagementDuration: item.tpl.engagementDuration,
    experts: item.tpl.experts,
    score: Math.round(item.score),
    tags: item.tpl.tags,
  }));
}
