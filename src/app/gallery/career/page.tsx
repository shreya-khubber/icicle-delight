"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const BG   = "#0e0b06";
const BG2  = "#120e08";
const BORD = "rgba(160,110,40,0.2)";
const TXT  = "#c8a840";
const MUT  = "#8a6a30";
const DIM  = "#3a2c14";
const ACC  = "#ffb300";
const YELL = "#ff6600";
const F    = '"JetBrains Mono","Fira Code","Courier New",monospace';
const FS   = '"DM Sans","Inter",system-ui,sans-serif';

type BootPhase = "playing" | "collapsing" | "done";
type BLine = { tag: string; msg: string; color: string; dots?: string; special?: "think" | "done" };

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

// ─── Boot lines ───────────────────────────────────────────────────────────────
const BOOT_DEF: Omit<BLine, "dots">[] = [
  { tag: "[INIT]",  msg: "ANALYST.WORKSPACE v2.4 booting...",                                        color: MUT },
  { tag: "[OK]",    msg: "Locating Shreya Khubber... found (eventually)",                            color: TXT },
  { tag: "[OK]",    msg: "Mounting degree: Electronics & Instrumentation + Finance, BITS Pilani",    color: TXT },
  { tag: "[OK]",    msg: "Loading certification: CFA Level 2 candidate, exam anxiety suppressed",    color: TXT },
  { tag: "[OK]",    msg: "Indexing skills: Excel, SQL, Python, PowerPoint, pivot tables at 2am",     color: TXT },
  { tag: "[SCAN]",  msg: "Scanning for dependencies...",                                              color: MUT },
  { tag: "[WARN]",  msg: "Chai dependency detected: critical, non-negotiable, do not remove",        color: YELL },
  { tag: "[OK]",    msg: "Chai loaded. Proceeding.",                                                  color: TXT },
  { tag: "[OK]",    msg: "Importing 2 years of fixed income & finance experience",                   color: TXT },
  { tag: "[OK]",    msg: "Loading bond universe: yields, spreads, duration, the occasional default", color: TXT },
  { tag: "[OK]",    msg: "Cross-referencing numbers that were definitely right the first time",       color: TXT },
  { tag: "[THINK]", msg: "Reconciling model with reality",                                            color: MUT, special: "think" },
  { tag: "[OK]",    msg: "Close enough.",                                                             color: TXT },
  { tag: "[DONE]",  msg: "Workspace ready. Welcome.",                                                 color: ACC, special: "done" },
];

// ─── Content data ─────────────────────────────────────────────────────────────
const MSTAR_B = [
  "Constructed LSTA US Leveraged Loan Broad Select Index (benchmark for BlackRock iShares ETF), delivering 7+ simulations in 10 days for the institutional launch",
  "Analyzed $1.2T global CLO market: securitization, valuation, trading dynamics",
  "Led distressed loan recovery index research: signals from rating, seniority, bid price",
  "Engineered leveraged loan index infrastructure and forward curve analytics (10+ data sources)",
  "Launched US Leveraged Term Loan Index and Korea 1–20 Yr Treasury Bond Index",
];
const MSTAR_INT_B = [
  "Designed internal automation Python modules for snapshot analysis, portfolio active weight analysis, and bond issuer capping",
  "Created the US High Yield Distressed Bonds Index; option-adjusted spread filters enhanced 3-yr index levels by 14%",
];
const WEBID_B = [
  "Translated market insights into go-to-market strategy for India expansion",
  "Conducted 20+ primary interviews with KYC industry CXOs and senior government officials",
  "Identified market entry price points and competitive positioning",
  "Generated 7+ early-stage client leads through targeted outreach",
];
const WQ_B = [
  "Ranked 297th out of 27K+ global users as a Research Consultant, eligible for compensation for quant trading algorithms",
  "Backtested and enhanced performance for 27 Alphas, quantitative strategies integrating fundamental and technical analysis",
];
const ANTHILL_B = [
  "Led assessment of 350+ India-based startups for Lumos Health, Anthill's healthtech arm; boosted sourcing pipeline by 13%",
  "Engaged with 30+ startups to evaluate business model viability and clinical authenticity in partnership with HCG Global",
];
const AI_B = [
  "Explored building a Shopify-like PMS with AI note-taking for therapists, validated through 15+ practitioner interviews",
  "Uncovered structural barriers (confidentiality norms, AI adoption resistance, nonviable business model); discontinued",
];
const TRUN_B = [
  "Ranked Top 50 of 6,000+ startups at Zerodha x Ditto Pitch Perfect for self-sovereign identity platform prototype",
  "Zero Knowledge Proofs and verifiable credentials for re-usable KYC amongst financial institutions",
  "Researched India's Aadhaar system, CKYCs, CERSAI registry and KYC regulatory landscape; identified barriers to adoption",
];
const ALLCARGO_B = [
  "Evaluated market reactions in 5-yr stock price history to identify highs and lows, stock splits, M&A and dividend policy changes",
];
const VGUARD_B = [
  "Analyzed 10 yr macroeconomic and company-specific insights from MD&A report to highlight major trends in business strategy",
  "Performed SWOT and competitor analysis to correlate 5% YoY stock price growth (FY 21-22) with major management decisions",
];
const TMD_B = [
  "Demonstrated the impact of a tuned mass damper in skyscrapers using Arduino Uno, an Accelerometer module and MATLAB",
  "Calibrated the system to reduce earthquake-induced vibrations, achieving stability 18% faster, leading to minimised damages",
];
const EV_B = [
  "Compiled a detailed report by surveying 1000+ individuals to understand sentiment towards EV Charging Infrastructure in India",
];

const SKILLS_DATA = [
  { name: "MS Excel",    pct: 85 },
  { name: "SQL",         pct: 82 },
  { name: "Claude Code", pct: 85 },
  { name: "Python",      pct: 75 },
  { name: "Figma",       pct: 72 },
  { name: "C++",         pct: 70 },
  { name: "MATLAB",      pct: 65 },
];

const TOOLKIT_ROWS: [string, string][] = [
  ["Python",         "language"       ],
  ["C++",            "language"       ],
  ["SQL",            "language"       ],
  ["Pandas / Numpy", "data analysis"  ],
  ["Git",            "version control"],
  ["Postman",        "api testing"    ],
  ["MS Excel",       "modelling"      ],
  ["MS PowerPoint",  "productivity"   ],
  ["Figma",          "design"         ],
  ["MATLAB",         "technical"      ],
  ["Claude Code",    "tools"          ],
  ["LSTA / Markit",  "data"           ],
];

const CV_PATH = "/CV/Resume_Shreya_Khubber__Website.pdf";

// ─── Section / card structure ─────────────────────────────────────────────────
interface CardData {
  id: string;
  filename: string;
  company: string;
  title: string;
  dates: string;
  badge?: string;
  bullets: string[];
  special?: "skills" | "toolkit";
}
interface SectionData {
  id: string;
  label: string;
  path: string;
  cards: CardData[];
}

const SECTIONS: SectionData[] = [
  {
    id: "experience", label: "Experience", path: "~/career/experience/",
    cards: [
      { id: "mstar",      filename: "morningstar-quant.log",  company: "Morningstar",       title: "Quantitative Analyst",                      dates: "Jul 2024 – Present", badge: "ACTIVE", bullets: MSTAR_B },
      { id: "mstar-int",  filename: "morningstar-intern.log", company: "Morningstar",       title: "Fixed Income Indexes Intern",                dates: "Jul – Dec 2023",                       bullets: MSTAR_INT_B },
      { id: "webid",      filename: "webid.log",              company: "WebID, Germany",    title: "Freelance Market Research & BD Consultant", dates: "Freelance",                            bullets: WEBID_B },
      { id: "worldquant", filename: "worldquant.log",         company: "WorldQuant Brain",  title: "Research Consultant",                       dates: "Apr – Jul 2023",                       bullets: WQ_B },
      { id: "anthill",    filename: "anthill.log",            company: "Anthill Ventures",  title: "Investment Analyst Intern",                 dates: "Jun – Aug 2022",                       bullets: ANTHILL_B },
    ],
  },
  {
    id: "skills", label: "Skills", path: "~/career/skills/",
    cards: [
      { id: "skills-csv", filename: "skills.csv",    company: "Skill Matrix", title: "Technical Proficiencies",          dates: "Current", bullets: [], special: "skills" },
      { id: "toolkit-sql",filename: "toolkit.sql",   company: "Toolkit",      title: "SELECT tool, category FROM toolkit", dates: "Current", bullets: [], special: "toolkit" },
    ],
  },
  {
    id: "education", label: "Education", path: "~/career/education/",
    cards: [
      {
        id: "cfa", filename: "cfa-level2.log", company: "CFA Institute", title: "CFA Level 2 Candidate",
        dates: "In Progress", badge: "ACTIVE",
        bullets: [
          "Candidate for CFA Level 2 examination",
          "Curriculum covers equity valuation, fixed income, derivatives, portfolio management",
          "Ongoing alongside full-time role at Morningstar",
        ],
      },
      {
        id: "bits", filename: "bits-pilani.log", company: "BITS Pilani", title: "B.E. Electronics & Instrumentation + Finance Minor",
        dates: "2019 – 2024",
        bullets: [
          "Birla Institute of Technology and Science, Pilani",
          "B.E. Electronics & Instrumentation Engineering + Finance Minor",
          "Core coursework: Financial Markets, Signal Processing, Control Systems",
        ],
      },
    ],
  },
  {
    id: "achievements", label: "Projects", path: "~/career/projects/",
    cards: [
      { id: "trunagrik",  filename: "trunagrik.md",  company: "Trunagrik",          title: "Consent-Based Digital Identity System",               dates: "Jul – Dec 2025",  bullets: TRUN_B },
      { id: "ai-research",filename: "ai-research.md",company: "AI & Automation",    title: "Mental Health Practitioners, AI Research",             dates: "Jan – Mar 2026",  bullets: AI_B },
      { id: "allcargo",   filename: "allcargo.pdf",   company: "Allcargo Logistics", title: "Financial Analysis, Prof. Rajan Pandey, BITS Pilani",  dates: "Jan – May 2023",  bullets: ALLCARGO_B },
      { id: "vguard",     filename: "v-guard.pdf",    company: "V-Guard Industries", title: "Business Analysis, Prof. Rajan Pandey, BITS Pilani",   dates: "Aug – Dec 2022",  bullets: VGUARD_B },
      { id: "tmd",        filename: "tuned-mass-damper.md", company: "Tuned Mass Damper", title: "Engineering Project, Prof. Puneet Mishra, BITS Pilani", dates: "Jan – May 2023",  bullets: TMD_B },
      { id: "ev-charging",filename: "ev-charging.md", company: "EV Charging in India", title: "Research Project, Prof. Tanu Shukla, BITS Pilani",   dates: "Sep – Dec 2021",  bullets: EV_B },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CareerPage() {
  const [bootPhase, setBootPhase]       = useState<BootPhase>("playing");
  const [bootLines, setBootLines]       = useState<BLine[]>([]);
  const [activeSection, setActiveSection] = useState("experience");
  const [expanded, setExpanded]         = useState<Set<string>>(new Set());
  const [search, setSearch]             = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const skipRef     = useRef(false);
  const searchRef   = useRef<HTMLInputElement>(null);
  const mainRef     = useRef<HTMLDivElement>(null);
  const secRefs     = useRef<Record<string, HTMLElement | null>>({});

  // ── Skip boot ──────────────────────────────────────────────────────────────
  const skipBoot = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    setBootLines(BOOT_DEF.map(l => ({ ...l, dots: l.special === "think" ? "..........." : undefined })));
    setBootPhase("collapsing");
  }, []);

  // ── Boot sequence ──────────────────────────────────────────────────────────
  useEffect(() => {
    // `cancelled` is local to this effect invocation — StrictMode creates two invocations,
    // each with their own flag. Cleanup sets the first one's flag without touching the second's.
    let cancelled = false;
    skipRef.current = false;
    setBootLines([]);
    setBootPhase("playing");
    document.title = "ANALYST.WORKSPACE: READY";

    const stop = () => cancelled || skipRef.current;

    const run = async () => {
      for (let i = 0; i < BOOT_DEF.length; i++) {
        if (stop()) return;
        const line = BOOT_DEF[i];

        if (line.special === "think") {
          setBootLines(p => [...p, { ...line, dots: "" }]);
          await sleep(700); if (stop()) return;
          for (let d = 1; d <= 11; d++) {
            await sleep(180 + Math.random() * 280); if (stop()) return;
            setBootLines(p => { const c = [...p]; c[c.length - 1] = { ...c[c.length - 1], dots: ".".repeat(d) }; return c; });
          }
          await sleep(400); if (stop()) return;
          continue;
        }

        if (line.special === "done") {
          await sleep(400); if (stop()) return;
          setBootLines(p => [...p, { ...line }]);
          await sleep(2000); if (stop()) return;
          setBootPhase("collapsing");
          return;
        }

        const d = i < 5 ? 80 + Math.random() * 40 : 100 + Math.random() * 60;
        await sleep(d); if (stop()) return;
        setBootLines(p => [...p, { ...line }]);
      }
    };
    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bootPhase === "playing") { skipBoot(); return; }
      if (e.key === "/" && bootPhase === "done" && document.activeElement !== searchRef.current) {
        e.preventDefault(); searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [bootPhase, skipBoot]);

  // ── IntersectionObserver for active section ───────────────────────────────
  useEffect(() => {
    if (bootPhase !== "done") return;
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActiveSection(visible[0].target.getAttribute("data-sid") ?? "experience");
      },
      { threshold: 0.15, rootMargin: "-15% 0px -65% 0px" }
    );
    Object.values(secRefs.current).forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [bootPhase]);

  const scrollTo = (id: string) => {
    secRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const toggleCard = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const matchSearch = (c: CardData) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [c.company, c.title, c.dates, ...c.bullets].some(s => s.toLowerCase().includes(q));
  };

  const filtered = SECTIONS.map(s => ({ ...s, cards: s.cards.filter(matchSearch) })).filter(s => s.cards.length > 0);
  const totalCards = SECTIONS.reduce((a, s) => a + s.cards.length, 0);

  // ─── CSS ──────────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{background:${BG};height:100%;overflow:hidden}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fillBar{from{width:0}to{width:var(--w)}}
    @keyframes bootCollapse{from{transform:scaleY(1)}to{transform:scaleY(0)}}
    .blk-cur{display:inline-block;width:0.58em;height:1.05em;background:${ACC};vertical-align:text-bottom;animation:blink 1.1s step-end infinite;flex-shrink:0}
    ::-webkit-scrollbar{width:3px;height:3px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:rgba(255,179,0,0.2);border-radius:2px}
    ::-webkit-scrollbar-thumb:hover{background:rgba(255,179,0,0.4)}
    .card{border:1px solid ${BORD};background:${BG2};border-radius:2px;margin-bottom:10px;transition:border-color .2s;animation:fadeIn .25s ease}
    .card:hover{border-color:rgba(160,110,40,0.45)}
    .card-hdr{padding:14px 18px;cursor:pointer;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;user-select:none}
    .card-body{overflow:hidden;max-height:0;opacity:0;transition:max-height .38s cubic-bezier(.4,0,.2,1),opacity .25s ease}
    .card-body.open{max-height:900px;opacity:1}
    .card-body-inner{padding:0 18px 18px;border-top:1px solid ${BORD}}
    .nav-folder{padding:7px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;font-family:${F};font-size:12px;color:${MUT};border-radius:2px;transition:all .15s;user-select:none;letter-spacing:.04em}
    .nav-folder:hover{color:${TXT};background:rgba(160,110,40,0.1)}
    .nav-folder.act{color:${ACC};background:rgba(255,179,0,0.07)}
    .tab-strip{display:flex;overflow-x:auto;border-bottom:1px solid ${BORD};background:${BG};scrollbar-width:none;flex-shrink:0}
    .tab-strip::-webkit-scrollbar{display:none}
    .tab-item{padding:11px 20px;font-family:${F};font-size:11px;white-space:nowrap;cursor:pointer;color:${MUT};border-bottom:2px solid transparent;transition:all .15s;user-select:none;letter-spacing:.06em;flex-shrink:0;min-height:44px;display:flex;align-items:center}
    .tab-item:hover{color:${TXT}}
    .tab-item.act{color:${ACC};border-bottom-color:${ACC}}
    .bar-fill{height:100%;background:${ACC};border-radius:2px;opacity:.65;animation:fillBar .6s ease forwards}
    .main-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;align-items:start}
    @media(max-width:767px){
      .sidebar{display:none!important}
      .tab-row{display:block!important}
      .main-grid{grid-template-columns:1fr!important}
      .span2{grid-column:span 1!important}
    }
    @media(min-width:768px){.tab-row{display:none!important}}
  `;

  // ─── Boot overlay ─────────────────────────────────────────────────────────
  const bootOverlay = bootPhase !== "done" && (
    <div
      onTransitionEnd={(e) => { if (e.propertyName === "transform") setBootPhase("done"); }}
      style={{
        position: "fixed", inset: 0, background: BG, zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transformOrigin: "top",
        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: bootPhase === "collapsing" ? "scaleY(0)" : "scaleY(1)",
      }}
    >
      <div style={{ width: "min(700px, 92vw)", padding: "20px 0" }}>
        {bootLines.map((line, i) => (
          <div key={i} style={{
            fontFamily: F, fontSize: "clamp(11px, 1.3vw, 13px)", lineHeight: 1.85,
            display: "flex", gap: "1em", marginBottom: 1,
          }}>
            <span style={{
              display: "inline-block", width: 62, flexShrink: 0, fontSize: "clamp(10px,1.1vw,11px)",
              color: line.tag === "[WARN]" ? YELL : line.tag === "[DONE]" ? ACC : line.tag === "[THINK]" ? MUT : line.tag === "[OK]" ? "rgba(94,116,88,0.65)" : MUT,
            }}>{line.tag}</span>
            <span style={{ color: line.special === "done" ? ACC : line.color }}>
              {line.msg}{line.dots !== undefined ? line.dots : ""}
            </span>
          </div>
        ))}
        {bootPhase === "playing" && bootLines.length > 0 && !bootLines[bootLines.length - 1].special && (
          <div style={{ display: "flex", paddingLeft: "calc(62px + 1em)" }}>
            <span className="blk-cur" />
          </div>
        )}
      </div>
      <button
        onClick={skipBoot}
        style={{
          position: "fixed", bottom: 24, right: 28,
          fontFamily: F, fontSize: 11, color: DIM, cursor: "pointer",
          letterSpacing: "0.14em", padding: "6px 12px",
          border: `1px solid ${DIM}`, background: "transparent",
          transition: "all .15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = MUT; (e.currentTarget as HTMLButtonElement).style.borderColor = MUT; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = DIM; (e.currentTarget as HTMLButtonElement).style.borderColor = DIM; }}
      >
        skip →
      </button>
    </div>
  );

  // ─── File explorer ────────────────────────────────────────────────────────
  const explorer = (
    <div style={{ position: "fixed", inset: 0, background: BG, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: F }}>
      {/* Topbar */}
      <div style={{ height: 46, flexShrink: 0, borderBottom: `1px solid ${BORD}`, background: BG, display: "flex", alignItems: "center", padding: "0 16px", gap: 14, zIndex: 20 }}>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.75 }}/>)}
        </div>
        <a href="/" style={{ color: MUT, fontSize: 11, fontFamily: F, letterSpacing: "0.12em", textDecoration: "none", flexShrink: 0 }}>← icicle</a>
        <span style={{ color: TXT, fontFamily: F, fontSize: 12, letterSpacing: "0.08em", opacity: 0.8, flexShrink: 0 }}>analyst:~/career$</span>

        {/* Search */}
        <div
          style={{ flex: 1, maxWidth: 260, marginLeft: "auto", display: "flex", alignItems: "center", border: `1px solid ${BORD}`, background: "rgba(10,20,10,0.5)", padding: "4px 10px", borderRadius: 2, cursor: "text", minHeight: 28 }}
          onClick={() => searchRef.current?.focus()}
        >
          <span style={{ color: MUT, fontFamily: F, fontSize: 11, marginRight: 6, flexShrink: 0, opacity: 0.7 }}>$</span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", minWidth: 0, overflow: "hidden", position: "relative" }}>
            {!search && !searchFocused && (
              <span style={{ color: DIM, fontFamily: F, fontSize: 11, pointerEvents: "none", letterSpacing: "0.06em", opacity: 0.7 }}>search...</span>
            )}
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={e => { if (e.key === "Escape") { setSearch(""); searchRef.current?.blur(); } }}
              spellCheck={false} autoComplete="off"
              style={{
                width: `${search.length}ch`,
                background: "transparent", border: "none", outline: "none",
                color: TXT, fontFamily: F, fontSize: 11,
                caretColor: "transparent", padding: 0, minWidth: 0, flexShrink: 0,
                position: search || searchFocused ? "relative" : "absolute", opacity: search || searchFocused ? 1 : 0,
              }}
            />
            {searchFocused && <span className="blk-cur" style={{ marginLeft: 1 }}/>}
          </div>
        </div>
      </div>

      {/* Mobile tab strip */}
      <div className="tab-row" style={{ display: "none" }}>
        <div className="tab-strip">
          {SECTIONS.map(s => (
            <div key={s.id} className={`tab-item ${activeSection === s.id ? "act" : ""}`} onClick={() => scrollTo(s.id)}>{s.label}</div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Sidebar */}
        <div className="sidebar" style={{ width: 196, flexShrink: 0, borderRight: `1px solid ${BORD}`, padding: "16px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ color: DIM, fontFamily: F, fontSize: 9, letterSpacing: "0.28em", padding: "0 12px 10px", textTransform: "uppercase" }}>WORKSPACE</div>
          {SECTIONS.map(s => (
            <div key={s.id} className={`nav-folder ${activeSection === s.id ? "act" : ""}`} onClick={() => scrollTo(s.id)}>
              <span style={{ fontSize: 12 }}>📁</span>
              <span>{s.label}/</span>
            </div>
          ))}
          <div style={{ height: 1, background: BORD, margin: "14px 12px" }}/>
          <a
            href={CV_PATH} download="Shreya_Khubber_CV.pdf"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", color: MUT, fontFamily: F, fontSize: 11, textDecoration: "none", letterSpacing: "0.08em", transition: "color .15s", borderRadius: 2, minHeight: 44 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TXT}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUT}
          >
            <span style={{ fontSize: 12 }}>📄</span>
            <span>download cv</span>
          </a>
        </div>

        {/* Main */}
        <div ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: "28px 24px 80px", minWidth: 0 }}>
          {/* Bio strip */}
          <div style={{ marginBottom: 32, padding: "14px 18px", border: `1px solid ${BORD}`, borderRadius: 2, background: BG2 }}>
            <div style={{ color: MUT, fontFamily: F, fontSize: 9, letterSpacing: "0.22em", marginBottom: 8 }}>~/career/whoami</div>
            <p style={{ color: TXT, fontFamily: FS, fontSize: 13, lineHeight: 1.7, opacity: 0.9 }}>
              Quant analyst at Morningstar, Mumbai. I build fixed income indexes, the kind institutional money actually tracks. Current focus: leveraged loan benchmarks, CLO market research, and index methodology. Previously: freelance market research for a European fintech (WebID) in KYC space.
            </p>
            <p style={{ color: MUT, fontFamily: F, fontSize: 11, marginTop: 8, letterSpacing: "0.04em" }}>Finance, code, art. In that order, usually.</p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "30vh", color: MUT, fontFamily: F, fontSize: 12, letterSpacing: "0.15em", opacity: 0.6 }}>
              no files match &ldquo;{search}&rdquo;
            </div>
          ) : (
            filtered.map(section => (
              <div
                key={section.id}
                ref={el => { secRefs.current[section.id] = el; }}
                data-sid={section.id}
                style={{ marginBottom: 44, scrollMarginTop: 20 }}
              >
                {/* Section heading */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ color: ACC, opacity: 0.45, fontFamily: F, fontSize: 11, letterSpacing: "0.1em", flexShrink: 0 }}>{section.path}</span>
                  <div style={{ flex: 1, height: 1, background: BORD }}/>
                  <span style={{ color: DIM, fontFamily: F, fontSize: 9, letterSpacing: "0.15em", flexShrink: 0 }}>{section.cards.length} files</span>
                </div>

                {/* Cards */}
                <div className="main-grid">
                  {section.cards.map(card => {
                    const isOpen = expanded.has(card.id);
                    const spanTwo = card.special === "skills" || card.special === "toolkit";
                    return (
                      <div key={card.id} className={`card ${spanTwo ? "span2" : ""}`} style={spanTwo ? { gridColumn: "span 2" } : {}}>
                        <div className="card-hdr" onClick={() => toggleCard(card.id)}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                              <span style={{ color: TXT, fontFamily: F, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>{card.company}</span>
                              {card.badge && (
                                <span style={{ background: "rgba(255,179,0,0.08)", border: `1px solid rgba(255,179,0,0.4)`, color: ACC, fontFamily: F, fontSize: 8, padding: "2px 6px", letterSpacing: "0.15em", borderRadius: 1 }}>
                                  {card.badge}
                                </span>
                              )}
                            </div>
                            <div style={{ color: MUT, fontFamily: F, fontSize: 10, marginBottom: 2, letterSpacing: "0.05em" }}>
                              {card.dates} · {card.title}
                            </div>
                            <div style={{ color: DIM, fontFamily: F, fontSize: 9, letterSpacing: "0.07em" }}>{card.filename}</div>
                          </div>
                          <span style={{ color: MUT, fontFamily: F, fontSize: 16, flexShrink: 0, transition: "transform .25s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", lineHeight: 1, marginTop: 2 }}>›</span>
                        </div>

                        <div className={`card-body ${isOpen ? "open" : ""}`}>
                          <div className="card-body-inner">
                            {card.special === "skills" ? (
                              <div style={{ paddingTop: 14 }}>
                                {SKILLS_DATA.map(s => (
                                  <div key={s.name} style={{ marginBottom: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                      <span style={{ color: TXT, fontFamily: F, fontSize: 11 }}>{s.name}</span>
                                      <span style={{ color: MUT, fontFamily: F, fontSize: 10 }}>{s.pct}%</span>
                                    </div>
                                    <div style={{ height: 2, background: DIM, borderRadius: 2, overflow: "hidden" }}>
                                      <div className="bar-fill" style={{ "--w": `${s.pct}%` } as React.CSSProperties}/>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : card.special === "toolkit" ? (
                              <div style={{ paddingTop: 14, overflowX: "auto" }}>
                                <div style={{ color: MUT, fontFamily: F, fontSize: 10, marginBottom: 10, letterSpacing: "0.07em" }}>SELECT tool, category FROM toolkit;</div>
                                <table style={{ borderCollapse: "collapse", fontFamily: F, fontSize: 10, width: "100%", minWidth: 260 }}>
                                  <thead>
                                    <tr>{["tool", "category"].map(h => <th key={h} style={{ padding: "5px 12px", textAlign: "left", border: `1px solid ${BORD}`, color: MUT, fontWeight: 400, letterSpacing: "0.08em", background: "rgba(255,179,0,0.03)" }}>{h}</th>)}</tr>
                                  </thead>
                                  <tbody>
                                    {TOOLKIT_ROWS.map(([t, c], i) => (
                                      <tr key={i}>
                                        <td style={{ padding: "5px 12px", border: `1px solid ${BORD}`, color: TXT }}>{t}</td>
                                        <td style={{ padding: "5px 12px", border: `1px solid ${BORD}`, color: MUT }}>{c}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div style={{ color: ACC, fontFamily: F, fontSize: 10, marginTop: 8, opacity: 0.65 }}>{TOOLKIT_ROWS.length} rows returned.</div>
                              </div>
                            ) : (
                              <ul style={{ paddingTop: 14, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                                {card.bullets.map((b, i) => (
                                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <span style={{ color: MUT, fontFamily: F, fontSize: 12, flexShrink: 0, marginTop: 1 }}>›</span>
                                    <span style={{ color: TXT, fontFamily: FS, fontSize: 13, lineHeight: 1.65 }}>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Contact footer */}
          <div style={{ paddingTop: 28, borderTop: `1px solid ${BORD}`, marginTop: 8 }}>
            <div style={{ color: MUT, fontFamily: F, fontSize: 10, letterSpacing: "0.18em", marginBottom: 18, opacity: 0.65 }}>~/career/contact/</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 36px" }}>
              {[
                { label: "EMAIL",     val: "shreya.khubber@gmail.com",      href: "mailto:shreya.khubber@gmail.com" },
                { label: "LINKEDIN",  val: "linkedin.com/in/shreya-khubber", href: "https://linkedin.com/in/shreya-khubber" },
                { label: "GITHUB",    val: "github.com/shreya-khubber",      href: "https://github.com/shreya-khubber" },
                { label: "INSTAGRAM", val: "@migratinglife",                 href: "https://www.instagram.com/migratinglife/" },
              ].map(({ label, val, href }) => (
                <div key={label}>
                  <div style={{ color: DIM, fontFamily: F, fontSize: 8, letterSpacing: "0.24em", marginBottom: 5 }}>{label}</div>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ color: MUT, fontFamily: F, fontSize: 11, textDecoration: "underline", textDecorationColor: `rgba(94,116,88,0.3)`, transition: "color .15s", letterSpacing: "0.04em" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TXT}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUT}
                  >{val}</a>
                </div>
              ))}
              <div>
                <div style={{ color: DIM, fontFamily: F, fontSize: 8, letterSpacing: "0.24em", marginBottom: 5 }}>LOCATION</div>
                <span style={{ color: MUT, fontFamily: F, fontSize: 11 }}>Mumbai, India</span>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <a href={CV_PATH} download="Shreya_Khubber_CV.pdf"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, border: `1px solid ${BORD}`, padding: "10px 18px", color: MUT, fontFamily: F, fontSize: 11, letterSpacing: "0.14em", textDecoration: "none", background: "transparent", transition: "all .15s", borderRadius: 2, minHeight: 44 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TXT; (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,110,72,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUT; (e.currentTarget as HTMLElement).style.borderColor = BORD; }}
              >↓ download cv</a>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ height: 30, flexShrink: 0, borderTop: `1px solid ${BORD}`, background: BG2, display: "flex", alignItems: "center", padding: "0 16px", gap: 16, zIndex: 20 }}>
        <span style={{ color: MUT, fontFamily: F, fontSize: 10, letterSpacing: "0.1em" }}>{totalCards} files open</span>
        <span style={{ color: DIM, fontSize: 9 }}>·</span>
        <span style={{ color: MUT, fontFamily: F, fontSize: 10, letterSpacing: "0.08em" }}>last modified 2025</span>
        <span style={{ color: DIM, fontSize: 9 }}>·</span>
        <span style={{ color: MUT, fontFamily: F, fontSize: 10, letterSpacing: "0.08em" }}>press / to search</span>
        <span style={{ marginLeft: "auto", color: DIM, fontFamily: F, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}>{activeSection}</span>
      </div>
    </div>
  );

  return (
    <>
      <style suppressHydrationWarning>{css}</style>
      {explorer}
      {bootOverlay}
    </>
  );
}
