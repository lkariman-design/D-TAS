export interface IndustryOpportunity {
  title: string;
  description: string;
  relevantDimCodes: string[];
  urgency: "High" | "Medium" | "Low";
}

export interface IndustryThreat {
  title: string;
  description: string;
}

export interface IndustryProfile {
  name: string;
  marketGrowth: string;
  digitalMaturityContext: string;
  keyTrends: string[];
  opportunities: IndustryOpportunity[];
  threats: IndustryThreat[];
}

const PROFILES: Record<string, IndustryProfile> = {
  "Manufacturing": {
    name: "Manufacturing",
    marketGrowth: "8–10% CAGR (2024–2028) driven by PLI schemes & China+1 strategy",
    digitalMaturityContext:
      "Indian manufacturing SMEs average a Digital Maturity Score of 42/100 — well below global peers at 61. Companies crossing 65 are winning export contracts and reducing unit cost by 15–22%.",
    keyTrends: [
      "Industry 4.0 & smart factory adoption",
      "PLI-linked capex investments across sectors",
      "Supply chain de-risking & near-shoring",
      "ESG & scope-3 emission compliance",
      "Predictive maintenance & IoT sensors",
      "Digital twin for product development",
    ],
    opportunities: [
      {
        title: "Smart Supply Chain Digitisation",
        description:
          "PLI beneficiaries and Tier-1 OEM suppliers are mandating digital procurement and traceability from their vendor base. Early adopters gain preferred-supplier status and pricing power.",
        relevantDimCodes: ["D2"],
        urgency: "High",
      },
      {
        title: "ERP + IoT Integration for Real-Time OEE",
        description:
          "Manufacturers deploying connected ERP+IoT stacks report 18–25% reduction in downtime and 12% improvement in Overall Equipment Effectiveness within 12 months.",
        relevantDimCodes: ["D4", "D2"],
        urgency: "High",
      },
      {
        title: "Digital-First Sales & Export Expansion",
        description:
          "B2B e-commerce and digital cataloguing are opening export channels to ASEAN and Middle East without proportional cost increase. SMEs with strong digital presence are 3× more likely to onboard international distributors.",
        relevantDimCodes: ["D3"],
        urgency: "Medium",
      },
      {
        title: "Workforce Upskilling for Automation Readiness",
        description:
          "Government-subsidised PMKVY and NASSCOM skilling programs are available for manufacturing SMEs. Companies with structured upskilling retain automation gains vs. reverting to manual workarounds.",
        relevantDimCodes: ["D5"],
        urgency: "Medium",
      },
    ],
    threats: [
      {
        title: "Global Competition & Margin Compression",
        description:
          "Chinese and Vietnamese manufacturers continue to undercut on price. Without digital efficiency gains, Indian SME margins face sustained pressure.",
      },
      {
        title: "Raw Material Volatility & Supply Disruption",
        description:
          "Commodity price swings (steel, aluminium, semiconductors) require real-time procurement intelligence that manual processes cannot provide.",
      },
      {
        title: "Skilled Talent Attrition",
        description:
          "Rising demand for Industry 4.0 skills is pulling talent toward larger OEMs and GCCs. SMEs without digital culture and training programmes lose people to better-resourced employers.",
      },
      {
        title: "Regulatory & Compliance Tightening",
        description:
          "BIS quality standards, REACH chemical compliance, and ESG reporting mandates are increasing documentation overhead — particularly costly without digital audit trails.",
      },
    ],
  },

  "Retail & Distribution": {
    name: "Retail & Distribution",
    marketGrowth: "10–14% CAGR; organised retail and quick commerce reshaping channel mix",
    digitalMaturityContext:
      "Retail SMEs with omnichannel capability grow 2.5× faster than single-channel peers. Yet 68% of Indian retail SMEs still manage inventory and orders manually.",
    keyTrends: [
      "Omnichannel and quick commerce growth",
      "AI-driven demand forecasting",
      "Direct-to-consumer digital channels",
      "Loyalty programmes and personalisation",
      "Last-mile delivery optimisation",
      "Unified commerce platforms",
    ],
    opportunities: [
      {
        title: "Omnichannel Inventory & Order Management",
        description: "Unified inventory across online and offline channels reduces stockouts by 35% and improves working capital.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
      {
        title: "Customer Data Platform & Loyalty",
        description: "First-party data strategies give retailers pricing and personalisation advantages as third-party cookies disappear.",
        relevantDimCodes: ["D3"],
        urgency: "High",
      },
      {
        title: "Digital Procurement & Vendor Collaboration",
        description: "Digital PO and supplier portals cut procurement lead times by 40% and reduce duplicate payments.",
        relevantDimCodes: ["D2"],
        urgency: "Medium",
      },
    ],
    threats: [
      { title: "Quick Commerce Disruption", description: "10-minute delivery expectations are reshaping consumer behaviour and threatening traditional retail formats." },
      { title: "Price Transparency & Margin Erosion", description: "Online price comparison tools continuously compress retail margins, requiring operational efficiency to remain viable." },
      { title: "Platform Dependency Risk", description: "Heavy reliance on Amazon/Flipkart exposes SMEs to algorithm and commission changes beyond their control." },
    ],
  },

  "IT / Software Services": {
    name: "IT / Software Services",
    marketGrowth: "12–16% CAGR; GCC expansion and AI services driving demand",
    digitalMaturityContext:
      "Paradoxically, IT services SMEs often score lower on internal digital maturity than clients they serve. Process discipline, delivery automation, and talent management remain systemic gaps.",
    keyTrends: [
      "AI/ML services and Gen-AI product development",
      "GCC (Global Capability Centre) partnerships",
      "DevSecOps and platform engineering",
      "Cloud-native and edge computing",
      "Outcome-based pricing models",
    ],
    opportunities: [
      {
        title: "Gen-AI Practice & Productisation",
        description: "Clients are actively seeking AI implementation partners. SMEs that build a repeatable Gen-AI offering can command 30–40% premium.",
        relevantDimCodes: ["D1", "D3", "D4"],
        urgency: "High",
      },
      {
        title: "Delivery Automation & Internal Tooling",
        description: "Codifying delivery processes and automating testing/deployment reduces project cost by 20% and improves margin.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
      {
        title: "Talent Analytics & Retention",
        description: "Predictive attrition modelling and structured career paths reduce annual talent cost by 15–25%.",
        relevantDimCodes: ["D5"],
        urgency: "Medium",
      },
    ],
    threats: [
      { title: "Commoditisation of Traditional Services", description: "Low-value IT outsourcing is being automated or nearshored; differentiation through IP and AI is now existential." },
      { title: "Talent War with GCCs", description: "MNC GCCs offer 20–30% salary premiums that SME IT firms struggle to match without strong culture and growth paths." },
      { title: "Cybersecurity Exposure", description: "IT SMEs handling client data are high-value ransomware targets; a breach destroys reputation and triggers client contract terminations." },
    ],
  },

  "Professional Services": {
    name: "Professional Services",
    marketGrowth: "9–12% CAGR; digital-first advisory and compliance automation growing fastest",
    digitalMaturityContext:
      "Professional services firms with digital delivery capabilities are winning larger retainers. Clients now expect digital dashboards, online collaboration, and data-backed recommendations.",
    keyTrends: [
      "Virtual advisory and digital-first delivery",
      "Regulatory technology (RegTech) adoption",
      "Knowledge management systems",
      "Automated compliance and reporting",
      "Subscription and outcome-based billing",
    ],
    opportunities: [
      {
        title: "Digital Delivery & Client Portal",
        description: "Client portals with real-time dashboards reduce email overhead by 60% and improve client satisfaction scores significantly.",
        relevantDimCodes: ["D3", "D4"],
        urgency: "High",
      },
      {
        title: "Practice Management & Automation",
        description: "Automating billing, scheduling, and document management frees 25–30% of fee-earner time for billable work.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "AI-Powered Self-Service Tools", description: "LLM-based tools are automating commodity advisory work, forcing firms to move up the value chain." },
      { title: "Talent Retention in Hot Market", description: "Top performers are leaving for in-house roles or starting independent practices facilitated by digital platforms." },
    ],
  },

  "Healthcare & Pharma": {
    name: "Healthcare & Pharma",
    marketGrowth: "11–14% CAGR; digital health and API manufacturing expanding rapidly",
    digitalMaturityContext:
      "Regulatory compliance and patient safety requirements make digital infrastructure non-negotiable. Yet 55% of Indian healthcare SMEs still rely on paper-based records.",
    keyTrends: [
      "ABDM (Ayushman Bharat Digital Mission) integration",
      "Telemedicine and remote patient monitoring",
      "Digital clinical trials and data management",
      "Pharma 4.0 and track-and-trace",
      "AI diagnostics and personalised medicine",
    ],
    opportunities: [
      {
        title: "ABDM Health Records Integration",
        description: "Government-backed digital health ID and ABHA integration opens access to the National Digital Health Ecosystem and enables seamless patient data portability.",
        relevantDimCodes: ["D4", "D2"],
        urgency: "High",
      },
      {
        title: "Digital Quality & Compliance Systems",
        description: "Electronic Batch Manufacturing Records (eBMR) and digital SOPs reduce audit preparation time by 70% and lower non-compliance risk.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "Regulatory Compliance Escalation", description: "CDSCO and USFDA are tightening data integrity requirements; paper-based quality systems risk import alerts and licence suspension." },
      { title: "Counterfeit & Supply Chain Risk", description: "Without digital traceability, SME pharma manufacturers face increasing liability from grey-market diversion." },
    ],
  },

  "Logistics & Transport": {
    name: "Logistics & Transport",
    marketGrowth: "10–13% CAGR; e-commerce and infrastructure investment driving volume",
    digitalMaturityContext:
      "The National Logistics Policy targets reducing India's logistics cost from 14% to 8% of GDP. Digital-first 3PLs are capturing market share from traditional operators at pace.",
    keyTrends: [
      "Real-time shipment visibility and IoT tracking",
      "AI-driven route optimisation",
      "Unified Logistics Interface Platform (ULIP)",
      "Warehouse automation and robotics",
      "EV fleet transition",
    ],
    opportunities: [
      {
        title: "TMS + Real-Time Visibility Platform",
        description: "Shippers are mandating tracking APIs. Logistics SMEs with digital TMS win enterprise contracts unavailable to manual operators.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
      {
        title: "ULIP Integration for Government Contracts",
        description: "ULIP access unlocks government logistics contracts and improves customs clearance time by 40%.",
        relevantDimCodes: ["D4"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "Well-Funded 3PL Aggregators", description: "Delhivery, XpressBees, and Ecom Express are using technology and scale to undercut traditional logistics SMEs on price." },
      { title: "Fuel & Driver Cost Volatility", description: "Without route optimisation and load management software, cost increases are passed through or absorbed, compressing margins." },
    ],
  },

  "Food & Beverages": {
    name: "Food & Beverages",
    marketGrowth: "9–12% CAGR; packaged food, D2C, and food-tech fastest growing segments",
    digitalMaturityContext:
      "FSSAI compliance, cold chain visibility, and direct-to-consumer channels are creating digital differentiation in a traditionally relationship-driven industry.",
    keyTrends: [
      "D2C brand building and digital commerce",
      "Cold chain IoT and traceability",
      "FSSAI digital compliance and food safety",
      "Demand sensing and waste reduction",
      "Plant-based and personalised nutrition",
    ],
    opportunities: [
      {
        title: "D2C Digital Commerce Launch",
        description: "F&B SMEs with D2C channels achieve 40–60% higher margins than distributor-only channels and gain direct consumer data.",
        relevantDimCodes: ["D3", "D4"],
        urgency: "High",
      },
      {
        title: "Digital Traceability & FSSAI Compliance",
        description: "Farm-to-fork digital traceability is becoming a retailer prerequisite. Digital systems reduce compliance overhead and enable premium pricing.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "Retail Shelf Consolidation", description: "Modern retail and quick commerce platforms are reducing shelf space for unbranded or non-digital-capable suppliers." },
      { title: "Regulatory Intensification", description: "FSSAI is expanding mandatory labelling, testing, and recall requirements that create operational overhead without digital systems." },
    ],
  },

  "Construction & Real Estate": {
    name: "Construction & Real Estate",
    marketGrowth: "8–11% CAGR; affordable housing, data centres, and infrastructure driving demand",
    digitalMaturityContext:
      "Construction remains one of the least digitised industries globally. Companies adopting BIM, project management software, and digital procurement are reducing project overruns by 25–35%.",
    keyTrends: [
      "BIM (Building Information Modelling) adoption",
      "PropTech and digital project management",
      "RERA-compliant digital documentation",
      "Green building and ESG certification",
      "Drone surveys and site monitoring",
    ],
    opportunities: [
      {
        title: "Digital Project & Contract Management",
        description: "Replacing spreadsheet-based project tracking with digital PMC tools reduces project overruns by 25% and improves client communication.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
      {
        title: "PropTech & Digital Customer Experience",
        description: "Virtual site tours, digital booking, and customer portals are now expected by urban buyers and differentiate digitally-enabled developers.",
        relevantDimCodes: ["D3", "D4"],
        urgency: "Medium",
      },
    ],
    threats: [
      { title: "RERA Compliance & Penalty Risk", description: "Delayed digital documentation and non-compliance with project reporting requirements carry significant financial and reputational penalties." },
      { title: "Cost & Timeline Overruns", description: "Without digital project management, cost and schedule overruns compound, eroding margins on fixed-price contracts." },
    ],
  },

  "Education": {
    name: "Education",
    marketGrowth: "12–16% CAGR; EdTech and hybrid learning driving structural change",
    digitalMaturityContext:
      "NEP 2020 and the Digital India initiative are accelerating education digitisation. Institutions with strong digital infrastructure are attracting better students and international partnerships.",
    keyTrends: [
      "Hybrid and blended learning models",
      "Learning Management Systems (LMS)",
      "AI-powered personalised learning",
      "Skill-based credentials and micro-certifications",
      "EdTech-institution partnerships",
    ],
    opportunities: [
      {
        title: "LMS & Digital Learning Platform",
        description: "Institutions deploying LMS see 30% improvement in student engagement and unlock revenue from online and hybrid programmes.",
        relevantDimCodes: ["D4", "D3"],
        urgency: "High",
      },
      {
        title: "Digital Admissions & Student Experience",
        description: "Online admissions, digital fee management, and student portals reduce administrative overhead by 40% and improve enrolment conversion.",
        relevantDimCodes: ["D3", "D2"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "EdTech Platform Competition", description: "Well-funded EdTech platforms offer lower-cost alternatives that compete directly with traditional institutions on convenience and outcomes." },
      { title: "Declining Enrolment Demographics", description: "Changing demographics and career preferences require institutions to differentiate on digital and skills-based value propositions." },
    ],
  },

  "Financial Services": {
    name: "Financial Services",
    marketGrowth: "13–18% CAGR; UPI ecosystem, embedded finance, and NBFC expansion",
    digitalMaturityContext:
      "RBI and SEBI digital compliance requirements make digital infrastructure mandatory. FinTech-enabled NBFCs are growing 3× faster than traditional lenders on digital customer acquisition.",
    keyTrends: [
      "Account Aggregator (AA) framework adoption",
      "UPI-linked lending and embedded finance",
      "RegTech and automated compliance",
      "Digital-first customer onboarding (KYC/eKYC)",
      "AI-driven credit underwriting",
    ],
    opportunities: [
      {
        title: "Digital Onboarding & eKYC",
        description: "Paperless onboarding reduces customer acquisition cost by 60% and opens underserved tier-2/3 markets.",
        relevantDimCodes: ["D3", "D4"],
        urgency: "High",
      },
      {
        title: "Account Aggregator Integration",
        description: "AA framework enables consent-based financial data access, unlocking faster underwriting and personalised product recommendations.",
        relevantDimCodes: ["D4"],
        urgency: "High",
      },
    ],
    threats: [
      { title: "FinTech & Neo-Bank Disruption", description: "Digital-native challengers are eroding deposits and lending share with superior UX and pricing." },
      { title: "Regulatory Compliance Overhead", description: "RBI guidelines on data localisation, cybersecurity, and digital lending require continuous investment." },
    ],
  },

  "Other": {
    name: "Your Industry",
    marketGrowth: "Indian SME sector growing at 8–11% CAGR",
    digitalMaturityContext:
      "Across sectors, SMEs that invest in digital transformation report 15–20% improvement in productivity and 2× revenue growth compared to non-digital peers.",
    keyTrends: [
      "Cloud-first operations and SaaS adoption",
      "Data-driven decision making",
      "Digital customer engagement",
      "Process automation",
      "Cybersecurity baseline",
    ],
    opportunities: [
      {
        title: "Core Business Digitalisation",
        description: "Moving operations, finance, and customer management to digital platforms is the single highest-ROI investment for most SMEs.",
        relevantDimCodes: ["D2", "D4"],
        urgency: "High",
      },
      {
        title: "Digital Customer Acquisition",
        description: "Building an online presence, implementing CRM, and tracking leads digitally typically yields 20–40% improvement in conversion rates.",
        relevantDimCodes: ["D3"],
        urgency: "High",
      },
      {
        title: "Leadership & Strategy Alignment",
        description: "A formal digital strategy with board-level commitment is the strongest predictor of successful digital transformation.",
        relevantDimCodes: ["D1"],
        urgency: "Medium",
      },
    ],
    threats: [
      { title: "Competitor Digital Advantage", description: "Digital-first competitors in your sector are building sustainable advantages in speed, cost, and customer experience." },
      { title: "Talent Expectations", description: "High-performers increasingly evaluate employers on digital tools and culture — laggards face recruitment and retention headwinds." },
    ],
  },
};

export function getIndustryProfile(industryName: string): IndustryProfile {
  return PROFILES[industryName] ?? PROFILES["Other"];
}

export function getHighUrgencyDimCodes(profile: IndustryProfile): string[] {
  return profile.opportunities
    .filter((o) => o.urgency === "High")
    .flatMap((o) => o.relevantDimCodes);
}
