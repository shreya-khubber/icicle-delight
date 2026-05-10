"use client";

import { useState, useEffect, useRef } from "react";

// ── Theme ─────────────────────────────────────────────────────────────────────
const F   = '"Geist Mono","Fira Code","JetBrains Mono",monospace';
const AMB = "#FFB300";
const MUT = "#8A7040";
const ERR = "#FF4444";
const OK  = "#4AFF91";
const DIM = "#2A2000";
const TXT = "#C8A840";

// ── Types ─────────────────────────────────────────────────────────────────────
type SL = { t: string; c?: string; href?: string };
type OL = { id: number; t: string; c: string; href?: string };
type Preview =
  | "none" | "whoami" | "ls" | "experience" | "projects"
  | "morningstar" | "morningstar-intern" | "webid" | "worldquant" | "anthill"
  | "ai-research" | "trunagrik" | "allcargo" | "v-guard"
  | "skills" | "toolkit" | "contact";

let _id = 0;
const uid = () => ++_id;

// ── Bullets ───────────────────────────────────────────────────────────────────
const MSTAR_BULLETS = [
  "Constructed LSTA US Leveraged Loan Broad Select Index (benchmark for BlackRock iShares ETF)",
  "Delivered 7+ simulations in 10 days for the institutional launch",
  "Analyzed $1.2T global CLO market: securitization, valuation, trading dynamics",
  "Led distressed loan recovery index research — signals from rating, seniority, bid price",
  "Engineered leveraged loan index infrastructure and forward curve analytics (10+ data sources)",
  "Launched US Leveraged Term Loan Index and Korea 1–20 Yr Treasury Bond Index",
];
const MSTAR_INTERN_BULLETS = [
  "Designed internal automation Python modules for snapshot analysis, portfolio active weight analysis, and bond issuer capping",
  "Created the US High Yield Distressed Bonds Index — option-adjusted spread filters enhanced 3-yr index levels by 14%",
];
const WEBID_BULLETS = [
  "Translated market insights into go-to-market strategy for India expansion",
  "Conducted 20+ primary interviews with KYC industry CXOs and senior government officials",
  "Identified market entry price points and competitive positioning",
  "Generated 7+ early-stage client leads through targeted outreach",
];
const WORLDQUANT_BULLETS = [
  "Ranked 297th out of 27K+ global users as a Research Consultant, eligible for compensation for quant trading algorithms",
  "Backtested and enhanced performance for 27 Alphas — quantitative strategies integrating fundamental and technical analysis",
];
const ANTHILL_BULLETS = [
  "Led assessment of 350+ India-based startups for Lumos Health, Anthill's healthtech arm — boosted sourcing pipeline by 13%",
  "Engaged with 30+ startups to evaluate business model viability and clinical authenticity in partnership with HCG Global",
];
const AI_BULLETS = [
  "Explored building a Shopify-like PMS with AI note-taking for therapists, validated through 15+ practitioner interviews",
  "Uncovered structural barriers — confidentiality norms, AI adoption resistance, nonviable business model — discontinued",
];
const TRUNAGRIK_BULLETS = [
  "Ranked Top 50 of 6,000+ startups at Zerodha x Ditto Pitch Perfect for self-sovereign identity platform prototype",
  "Built using Zero Knowledge Proofs and verifiable credentials for re-usable KYC amongst financial institutions",
  "Researched India's Aadhaar system, CKYCs, CERSAI registry and KYC regulatory landscape — identified barriers to adoption",
];
const ALLCARGO_BULLETS = [
  "Evaluated market reactions in 5-yr stock price history to identify highs and lows, stock splits, M&A and dividend policy changes",
];
const VGUARD_BULLETS = [
  "Analyzed 10 yr macroeconomic and company-specific insights from MD&A report to highlight major trends in business strategy",
  "Performed SWOT and competitor analysis to correlate 5% YoY stock price growth (FY 21-22) with major management decisions",
];


// ── Terminal content ──────────────────────────────────────────────────────────
const BOOT: SL[] = [
  { t: "initializing analyst.workspace v2.1...",                   c: MUT },
  { t: "loading node: MORNINGSTAR.QUANT [ok]",                     c: MUT },
  { t: "mounting index: LSTA_US_LEVERAGED_LOAN_BROAD_SELECT [ok]", c: MUT },
  { t: "analyst.workspace ready — type 'help' to begin",           c: OK  },
];
const BOOT_M: SL[] = [
  { t: "initializing analyst.workspace v2.1...", c: MUT },
  { t: "loading MORNINGSTAR.QUANT [ok]",         c: MUT },
  { t: "ready — type 'help' to begin",           c: OK  },
];

const HELP: SL[] = [
  { t: "ANALYST.WORKSPACE — command reference",         c: AMB },
  { t: "──────────────────────────────────────────────", c: DIM },
  { t: "  help                   this message",         c: TXT },
  { t: "  whoami                 short bio",            c: TXT },
  { t: "  ls                     list workspace",       c: TXT },
  { t: "  cat experience         all roles (summary)",  c: TXT },
  { t: "  open [role]            full detail for role", c: TXT },
  { t: "    roles: morningstar, morningstar-intern,",   c: MUT },
  { t: "            webid, worldquant, anthill",        c: MUT },
  { t: "  cat projects           all projects",         c: TXT },
  { t: "  open [project]         project deep-dive",    c: TXT },
  { t: "    projects: trunagrik, ai-research,",         c: MUT },
  { t: "              allcargo, v-guard",               c: MUT },
  { t: "  cat skills             skill matrix",         c: TXT },
  { t: "  cat toolkit.sql        tech stack as SQL",    c: TXT },
  { t: "  cd contact             contact + CV",         c: TXT },
  { t: "  download cv            download resume PDF",  c: TXT },
  { t: "  history                session log",          c: TXT },
  { t: "  clear                  clear terminal",       c: TXT },
  { t: "──────────────────────────────────────────────", c: DIM },
];

const WHOAMI: SL[] = [
  { t: "Quant analyst at Morningstar, Mumbai. I build fixed income indexes —",     c: TXT },
  { t: "the kind institutional money actually tracks. Current focus: leveraged",   c: TXT },
  { t: "loan benchmarks, CLO market research, and index methodology. Previously:", c: TXT },
  { t: "freelance market research for a European fintech (WebID) in KYC space.",   c: TXT },
  { t: "Finance, code, art — in that order, usually.",                             c: AMB },
];

const LS: SL[] = [
  { t: "analyst.workspace/",            c: AMB },
  { t: "├── experience/",               c: TXT },
  { t: "│   ├── morningstar-quant.log", c: MUT },
  { t: "│   ├── morningstar-intern.log",c: MUT },
  { t: "│   ├── webid.log",             c: MUT },
  { t: "│   ├── worldquant.log",        c: MUT },
  { t: "│   └── anthill.log",           c: MUT },
  { t: "├── projects/",                 c: TXT },
  { t: "│   ├── trunagrik.md",          c: MUT },
  { t: "│   ├── ai-mental-health.md",   c: MUT },
  { t: "│   ├── allcargo.pdf",          c: MUT },
  { t: "│   └── v-guard.pdf",           c: MUT },
  { t: "├── skills.csv",                c: TXT },
  { t: "├── toolkit.sql",               c: TXT },
  { t: "└── contact.md",                c: TXT },
];

const EXP_SUMMARY: SL[] = [
  { t: "[EXPERIENCE] ──────────────────────────────────────────", c: AMB },
  { t: "MORNINGSTAR       Quantitative Analyst       Jul 2024–Present  [ACTIVE]", c: TXT },
  { t: "MORNINGSTAR       Fixed Income Intern         Jul–Dec 2023",              c: TXT },
  { t: "WEBID — GERMANY   Market Research Consult.   Freelance 2025",            c: TXT },
  { t: "WORLDQUANT BRAIN  Research Consultant         Apr–Jul 2023",             c: TXT },
  { t: "ANTHILL VENTURES  Investment Analyst Intern   Jun–Aug 2022",             c: TXT },
  { t: "──────────────────────────────────────────────────────────", c: DIM },
  { t: "type 'open [firm]' for full detail", c: MUT },
];

const mkRole = (header: string, bullets: string[]): SL[] => [
  { t: header, c: AMB },
  { t: "──────────────────────────────────────────────────────────", c: DIM },
  ...bullets.map(b => ({ t: `> ${b}`, c: TXT })),
];

const MSTAR_SL       = mkRole("[MORNINGSTAR] Quantitative Analyst — Jul 2024–Present",            MSTAR_BULLETS);
const MSTAR_INTERN_SL= mkRole("[MORNINGSTAR] Fixed Income Indexes Intern — Jul–Dec 2023",          MSTAR_INTERN_BULLETS);
const WEBID_SL       = mkRole("[WEBID — GERMANY] Freelance Market Research & BD Consultant",       WEBID_BULLETS);
const WORLDQUANT_SL  = mkRole("[WORLDQUANT BRAIN] Research Consultant — Apr–Jul 2023",             WORLDQUANT_BULLETS);
const ANTHILL_SL     = mkRole("[ANTHILL VENTURES] Investment Analyst Intern — Jun–Aug 2022",       ANTHILL_BULLETS);

const PROJ_SUMMARY: SL[] = [
  { t: "[PROJECTS] ────────────────────────────────────────────", c: AMB },
  { t: "AI & AUTOMATION   Mental Health Practitioners  Jan–Mar 2026",   c: TXT },
  { t: "TRUNAGRIK         Consent-Based Digital ID     Jul–Dec 2025",   c: TXT },
  { t: "ALLCARGO          Stock Price Movement          Jan–May 2023",  c: TXT },
  { t: "V-GUARD           MD&A Business Analysis        Aug–Dec 2022", c: TXT },
  { t: "────────────────────────────────────────────────────────", c: DIM },
  { t: "type 'open [project]' for full detail", c: MUT },
];

const AI_SL        = mkRole("[AI & AUTOMATION] Mental Health Practitioners — Jan–Mar 2026",        AI_BULLETS);
const TRUNAGRIK_SL = mkRole("[TRUNAGRIK] Consent-Based Digital Identity System — Jul–Dec 2025",    TRUNAGRIK_BULLETS);
const ALLCARGO_SL  = mkRole("[ALLCARGO LOGISTICS] Financial Analysis — Jan–May 2023",              ALLCARGO_BULLETS);
const VGUARD_SL    = mkRole("[V-GUARD INDUSTRIES] Business Analysis — Aug–Dec 2022",               VGUARD_BULLETS);


const SKILLS_DATA = [
  { name: "Python",        pct: 75 },
  { name: "SQL",           pct: 82 },
  { name: "C++",           pct: 70 },
  { name: "Claude Code",   pct: 85 },
  { name: "MS Excel",      pct: 85 },
  { name: "Figma",         pct: 72 },
  { name: "MATLAB",        pct: 65 },
];

const SKILLS_SL: SL[] = [
  { t: "SKILL MATRIX ──────────────────────────────────────",  c: AMB },
  ...SKILLS_DATA.map(s => {
    const f = Math.round(s.pct / 6.25); const e = 16 - f;
    return { t: `${s.name.padEnd(18)} ${"█".repeat(f)}${"░".repeat(e)}  ${s.pct}%`, c: TXT };
  }),
  { t: "──────────────────────────────────────────────────", c: DIM },
];

const TOOLKIT_ROWS = [
  ["Python",            "language"  ],
  ["C++",               "language"  ],
  ["SQL",               "language"  ],
  ["Pandas / Numpy",    "data analysis"],
  ["Git",               "version control"],
  ["Postman",           "api testing"],
  ["MS Excel",          "modelling" ],
  ["MS PowerPoint",     "productivity"],
  ["Figma",             "design"    ],
  ["MATLAB",            "technical" ],
  ["Claude Code",       "tools"     ],
  ["LSTA / Markit",     "data"      ],
];

const TOOLKIT_SL: SL[] = [
  { t: "SELECT tool, category FROM toolkit;",              c: MUT },
  { t: "┌──────────────────────┬──────────────────┐",      c: DIM },
  { t: "│ tool                 │ category         │",      c: AMB },
  { t: "├──────────────────────┼──────────────────┤",      c: DIM },
  ...TOOLKIT_ROWS.map(([t, c]) => ({ t: `│ ${t.padEnd(20)} │ ${c.padEnd(16)} │`, c: TXT })),
  { t: "└──────────────────────┴──────────────────┘",      c: DIM },
  { t: `${TOOLKIT_ROWS.length} rows returned.`,            c: OK  },
];

const CONTACT_SL: SL[] = [
  { t: "contact.md ──────────────────────────────────────",    c: AMB },
  { t: "Email:     shreya.khubber@gmail.com",      c: AMB, href: "mailto:shreya.khubber@gmail.com" },
  { t: "LinkedIn:  linkedin.com/in/shreya-khubber", c: AMB, href: "https://linkedin.com/in/shreya-khubber" },
  { t: "GitHub:    github.com/shreya-khubber",     c: AMB, href: "https://github.com/shreya-khubber" },
  { t: "Instagram: @migratinglife",                c: AMB, href: "https://www.instagram.com/migratinglife/" },
  { t: "Location:  Mumbai, India",                 c: TXT },
];

const CV_PATH = "/CV/Shreya%20khubber%20Resume%20_%2019.04.2026.pdf";

// ── Chips & known commands ────────────────────────────────────────────────────
const CHIPS_MAP: Record<string, string[]> = {
  default:               ["ls", "whoami", "help"],
  help:                  ["ls", "cat experience", "cat projects"],
  whoami:                ["ls", "cat experience", "cat skills"],
  ls:                    ["cat experience", "cat projects", "cat skills"],
  "cat experience":      ["open morningstar", "open morningstar-intern", "cat projects"],
  "open morningstar":    ["open morningstar-intern", "open webid", "cat projects"],
  "open morningstar-intern": ["open morningstar", "open worldquant", "cat projects"],
  "open webid":          ["open morningstar", "open worldquant", "cat projects"],
  "open worldquant":     ["open anthill", "cat projects", "cat skills"],
  "open anthill":        ["cat projects", "cat skills", "cd contact"],
  "cat projects":        ["open trunagrik", "open ai-research", "cat skills"],
  "open trunagrik":      ["open ai-research", "open allcargo", "cat skills"],
  "open ai-research":    ["open trunagrik", "open v-guard", "cat skills"],
  "open allcargo":       ["open v-guard", "cat experience", "cat skills"],
  "open v-guard":        ["open allcargo", "cat experience", "cd contact"],
  "cat skills":          ["cat toolkit.sql", "cd contact", "cat experience"],
  "cat toolkit.sql":     ["cat skills", "cat experience", "cd contact"],
  "cd contact":          ["cat experience", "whoami", "download cv"],
  "download cv":         ["cd contact", "cat experience", "whoami"],
};

const KNOWN = [
  "help","whoami","ls","cat experience","cat projects",
  "cat skills","cat toolkit.sql","cd contact","download cv",
  "open morningstar","open morningstar-intern","open webid","open worldquant","open anthill",
  "open trunagrik","open ai-research","open allcargo","open v-guard",
  "query roles --filter=current","query roles --filter=all","query roles --help",
  "history","clear",
];

const PREVIEW_MAP: Partial<Record<string, Preview>> = {
  "whoami":                    "whoami",
  "ls":                        "ls",
  "cat experience":            "experience",
  "query roles --filter=all":  "experience",
  "open morningstar":          "morningstar",
  "query roles --filter=current": "morningstar",
  "open morningstar-intern":   "morningstar-intern",
  "open webid":                "webid",
  "open worldquant":           "worldquant",
  "open anthill":              "anthill",
  "cat projects":              "projects",
  "open ai-research":          "ai-research",
  "open trunagrik":            "trunagrik",
  "open allcargo":             "allcargo",
  "open v-guard":              "v-guard",
  "cat skills":                "skills",
  "cat toolkit.sql":           "toolkit",
  "cd contact":                "contact",
  "download cv":               "contact",
  "clear":                     "none",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function CareerPage() {
  const [lines,   setLines]   = useState<OL[]>([]);
  const [partial, setPartial] = useState<{ t: string; c: string } | null>(null);
  const [input,   setInput]   = useState("");
  const [chips,   setChips]   = useState(CHIPS_MAP.default);
  const [preview, setPreview] = useState<Preview>("none");
  const [pvKey,   setPvKey]   = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const outRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const booted   = useRef(false);

  const Q         = useRef<{ lines: SL[]; done?: () => void }[]>([]);
  const running   = useRef(false);
  const tmr       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelled = useRef(false);
  const hist      = useRef<string[]>([]);
  const histIdx   = useRef(-1);
  const saved     = useRef("");
  const session   = useRef<string[]>([]);

  const procQ    = useRef<() => void>(() => {});
  const procLine = useRef<(ls: SL[], i: number, done?: () => void) => void>(() => {});
  const typeC    = useRef<(text: string, c: string, href: string | undefined, i: number, cb: () => void) => void>(() => {});

  const scroll = () => requestAnimationFrame(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  });
  const addLine = (t: string, c: string, href?: string) => {
    setLines(p => [...p, { id: uid(), t, c, href }]); scroll();
  };

  procQ.current = () => {
    if (Q.current.length === 0) { running.current = false; setPartial(null); return; }
    const job = Q.current.shift()!;
    procLine.current(job.lines, 0, job.done);
  };
  procLine.current = (ls, i, done) => {
    if (cancelled.current) {
      ls.slice(i).forEach(l => addLine(l.t, l.c ?? AMB, l.href));
      setPartial(null); cancelled.current = false; done?.(); procQ.current(); return;
    }
    if (i >= ls.length) { setPartial(null); done?.(); procQ.current(); return; }
    const l = ls[i]; const c = l.c ?? AMB;
    const next = () => procLine.current(ls, i + 1, done);
    if (!l.t || l.t.length > 80) { addLine(l.t, c, l.href); tmr.current = setTimeout(next, 22); }
    else { setPartial({ t: "", c }); typeC.current(l.t, c, l.href, 0, next); }
  };
  typeC.current = (text, c, href, i, cb) => {
    if (cancelled.current) { addLine(text, c, href); setPartial(null); cb(); return; }
    const n = i + 1;
    setPartial({ t: text.slice(0, n), c }); scroll();
    if (n >= text.length) { addLine(text, c, href); setPartial(null); tmr.current = setTimeout(cb, 28); }
    else tmr.current = setTimeout(() => typeC.current(text, c, href, n, cb), 18);
  };

  const enqueue = (ls: SL[], done?: () => void) => {
    cancelled.current = false;
    Q.current.push({ lines: ls, done });
    if (!running.current) { running.current = true; procQ.current(); }
  };
  const flush = () => {
    if (running.current) { if (tmr.current) clearTimeout(tmr.current); cancelled.current = true; }
  };
  const focus = () => requestAnimationFrame(() => inputRef.current?.focus());
  const echo  = (cmd: string) => addLine(`ANLST:~$ ${cmd}`, AMB);

  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = CV_PATH; a.download = "Shreya_Khubber_CV.pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const exec = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) { focus(); return; }
    flush();
    const go = () => {
      hist.current = [raw, ...hist.current.slice(0, 49)];
      histIdx.current = -1; saved.current = "";
      session.current = [...session.current, raw];
      echo(raw);
      setChips(CHIPS_MAP[cmd] ?? CHIPS_MAP.default);
      const p = PREVIEW_MAP[cmd];
      if (p !== undefined) { setPreview(p); setPvKey(k => k + 1); if (p === "none") setExpanded(new Set()); }

      if (cmd === "clear") { setLines([]); setPartial(null); Q.current = []; running.current = false; setChips(CHIPS_MAP.default); focus(); return; }
      if (cmd === "download cv") { downloadCV(); enqueue([{ t: "downloading CV...", c: OK }], focus); return; }
      if (cmd === "help")               { enqueue(HELP, focus); return; }
      if (cmd === "whoami")             { enqueue(WHOAMI, focus); return; }
      if (cmd === "ls")                 { enqueue(LS, focus); return; }
      if (cmd === "cat experience" || cmd === "query roles --filter=all") { enqueue(EXP_SUMMARY, focus); return; }
      if (cmd === "open morningstar" || cmd === "query roles --filter=current") { enqueue(MSTAR_SL, focus); return; }
      if (cmd === "open morningstar-intern") { enqueue(MSTAR_INTERN_SL, focus); return; }
      if (cmd === "open webid")         { enqueue(WEBID_SL, focus); return; }
      if (cmd === "open worldquant")    { enqueue(WORLDQUANT_SL, focus); return; }
      if (cmd === "open anthill")       { enqueue(ANTHILL_SL, focus); return; }
      if (cmd === "cat projects")       { enqueue(PROJ_SUMMARY, focus); return; }
      if (cmd === "open ai-research")   { enqueue(AI_SL, focus); return; }
      if (cmd === "open trunagrik")     { enqueue(TRUNAGRIK_SL, focus); return; }
      if (cmd === "open allcargo")      { enqueue(ALLCARGO_SL, focus); return; }
      if (cmd === "open v-guard")       { enqueue(VGUARD_SL, focus); return; }
      if (cmd === "cat skills")         { enqueue(SKILLS_SL, focus); return; }
      if (cmd === "cat toolkit.sql")    { enqueue(TOOLKIT_SL, focus); return; }
      if (cmd === "cd contact")         { enqueue(CONTACT_SL, focus); return; }
      if (cmd === "query roles --help") {
        enqueue([
          { t: "usage: query roles --filter=[option]", c: TXT },
          { t: "  --filter=current    active role",    c: MUT },
          { t: "  --filter=all        all roles",      c: MUT },
        ], focus); return;
      }
      if (cmd === "history") {
        if (!session.current.length) { enqueue([{ t: "(no commands yet)", c: MUT }], focus); return; }
        enqueue(session.current.map((c, i) => ({ t: `  ${String(i+1).padStart(3)}  ${c}`, c: MUT })), focus); return;
      }
      if (cmd === "vim" || cmd === "emacs") { enqueue([{ t: "editor wars are above my pay grade — try 'cat skills' instead", c: ERR }], focus); return; }
      if (["eqs","srch","des","grab"].includes(cmd)) { enqueue([{ t: "terminal command detected — type 'cat skills' to see what's in the stack.", c: AMB }], focus); return; }
      if (cmd.startsWith("sudo ")) { enqueue([{ t: "you don't have permission to do that. this is a quant's terminal, not a sysadmin's.", c: ERR }], focus); return; }
      if (cmd === "hello" || cmd === "hi") { enqueue([{ t: "hey. type 'whoami' to get started, or 'ls' to browse.", c: OK }], focus); return; }
      if (cmd === "exit" || cmd === "quit") { enqueue([{ t: "there is no exit. only alpha.", c: ERR }], focus); return; }
      enqueue([{ t: `command not found: ${raw.trim()} — type 'help'`, c: ERR }], focus);
    };
    if (running.current) setTimeout(go, 60); else go();
  };

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    document.title = "ANLST.WORKSPACE — READY";
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    enqueue(mobile ? BOOT_M : BOOT, () => focus());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { const v = input; setInput(""); exec(v); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = hist.current; if (!h.length) return;
      if (histIdx.current === -1) saved.current = input;
      const ni = Math.min(histIdx.current + 1, h.length - 1);
      histIdx.current = ni; setInput(h[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current === -1) return;
      const ni = histIdx.current - 1; histIdx.current = ni;
      setInput(ni === -1 ? saved.current : hist.current[ni]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.toLowerCase();
      const m = KNOWN.find(c => c.startsWith(v) && c !== v);
      if (m) setInput(m);
    } else if (running.current) { flush(); }
  };

  // ── Right panel ───────────────────────────────────────────────────────────
  const toggleNode = (id: string) => setExpanded(s => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const previewLabel: Record<Preview, string> = {
    none: "none", whoami: "index.json", ls: "workspace/",
    experience: "experience/", projects: "projects/",
    morningstar: "morningstar-quant.log", "morningstar-intern": "morningstar-intern.log",
    webid: "webid.log", worldquant: "worldquant.log", anthill: "anthill.log",
    "ai-research": "ai-mental-health.md", trunagrik: "trunagrik.md",
    allcargo: "allcargo.pdf", "v-guard": "v-guard.pdf",
    skills: "skills.csv", toolkit: "toolkit.sql", contact: "contact.md",
  };

  const RoleDetail = ({ title, sub, bullets, color = TXT }: { title: string; sub: string; bullets: string[]; color?: string }) => (
    <div style={{ padding:"24px 28px" }}>
      <div style={{ color:AMB, fontFamily:F, fontSize:14, fontWeight:600, letterSpacing:"0.06em", marginBottom:3 }}>{title}</div>
      <div style={{ color:MUT, fontFamily:F, fontSize:10, marginBottom:4 }}>{sub}</div>
      <div style={{ height:1, background:"rgba(255,179,0,0.18)", margin:"14px 0" }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {bullets.map((b,i) => (
          <div key={i} style={{ color, fontFamily:F, fontSize:11, lineHeight:1.65, display:"flex", gap:10 }}>
            <span style={{ color:AMB, flexShrink:0 }}>›</span><span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const TimelineNode = ({ id, title, badge, sub, bullets, active }: {
    id: string; title: string; badge?: string; sub: string; bullets: string[]; active?: boolean;
  }) => (
    <div style={{ display:"flex", gap:16, marginBottom:24 }}>
      <div onClick={() => toggleNode(id)}
        style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, marginTop:3, cursor:"pointer",
          border:`2px solid ${active ? AMB : MUT}`, background: active ? AMB : "transparent",
          boxShadow: active ? "0 0 12px rgba(255,179,0,0.35)" : "none" }}/>
      <div style={{ flex:1 }}>
        <div onClick={() => toggleNode(id)} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
          <span style={{ color: active ? AMB : TXT, fontFamily:F, fontSize:12, fontWeight:600 }}>{title}</span>
          {badge && <span style={{ background:"rgba(74,255,145,.1)", border:`1px solid ${OK}`, color:OK, fontFamily:F, fontSize:8, padding:"2px 6px", letterSpacing:"0.12em" }}>{badge}</span>}
        </div>
        <div style={{ color:MUT, fontFamily:F, fontSize:10, marginTop:2 }}>{sub}</div>
        {expanded.has(id) && (
          <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:5 }}>
            {bullets.map((b,i) => (
              <div key={i} style={{ color:TXT, fontFamily:F, fontSize:10, lineHeight:1.6, display:"flex", gap:8 }}>
                <span style={{ color:active?AMB:MUT, flexShrink:0 }}>›</span><span>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderPreview = () => {
    if (preview === "none") return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", opacity:.25 }}>
        <span style={{ color:MUT, fontFamily:F, fontSize:11, letterSpacing:"0.2em" }}>NO FILE OPEN</span>
      </div>
    );

    if (preview === "whoami") return (
      <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:14 }}>
        {[["NAME","Shreya Khubber"],["ROLE","Quantitative Analyst"],["NODE","MORNINGSTAR.QUANT"],["LOCATION","Mumbai, India"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", gap:16, alignItems:"baseline" }}>
            <span style={{ color:MUT, fontFamily:F, fontSize:10, letterSpacing:"0.2em", width:80, flexShrink:0 }}>{k}</span>
            <span style={{ color:AMB, fontFamily:F, fontSize:13 }}>{v}</span>
          </div>
        ))}
        <div style={{ display:"flex", gap:16, alignItems:"baseline" }}>
          <span style={{ color:MUT, fontFamily:F, fontSize:10, letterSpacing:"0.2em", width:80, flexShrink:0 }}>STATUS</span>
          <span style={{ color:OK, fontFamily:F, fontSize:13 }}>Active {"■".repeat(8)}{"░".repeat(2)}</span>
        </div>
      </div>
    );

    if (preview === "ls") {
      type Item = { label: string; cmd?: string; indent: number; isDir?: boolean };
      const items: Item[] = [
        { label:"analyst.workspace/",            indent:0, isDir:true },
        { label:"experience/",                   indent:1, isDir:true },
        { label:"morningstar-quant.log",          indent:2, cmd:"open morningstar" },
        { label:"morningstar-intern.log",         indent:2, cmd:"open morningstar-intern" },
        { label:"webid.log",                      indent:2, cmd:"open webid" },
        { label:"worldquant.log",                 indent:2, cmd:"open worldquant" },
        { label:"anthill.log",                    indent:2, cmd:"open anthill" },
        { label:"projects/",                      indent:1, isDir:true },
        { label:"trunagrik.md",                   indent:2, cmd:"open trunagrik" },
        { label:"ai-mental-health.md",            indent:2, cmd:"open ai-research" },
        { label:"allcargo.pdf",                   indent:2, cmd:"open allcargo" },
        { label:"v-guard.pdf",                    indent:2, cmd:"open v-guard" },
        { label:"skills.csv",                     indent:1, cmd:"cat skills" },
        { label:"toolkit.sql",                    indent:1, cmd:"cat toolkit.sql" },
        { label:"contact.md",                     indent:1, cmd:"cd contact" },
      ];
      return (
        <div style={{ padding:"16px 16px" }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => { if(item.cmd){ setInput(""); exec(item.cmd); } }}
              style={{ padding:"4px 10px", paddingLeft:10+item.indent*16, fontFamily:F, fontSize:11,
                color:item.isDir?AMB:item.cmd?TXT:MUT, cursor:item.cmd?"pointer":"default",
                display:"flex", alignItems:"center", gap:7, borderRadius:2, transition:"background .1s" }}
              onMouseEnter={e => { if(item.cmd)(e.currentTarget as HTMLElement).style.background="rgba(255,179,0,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
              <span style={{ fontSize:10, opacity:.65 }}>{item.isDir?"📁":"📄"}</span>
              <span>{item.label}</span>
              {item.cmd && <span style={{ marginLeft:"auto", fontSize:8, color:MUT }}>OPEN →</span>}
            </div>
          ))}
        </div>
      );
    }

    if (preview === "experience") return (
      <div style={{ padding:"20px 24px", position:"relative" }}>
        <div style={{ position:"absolute", left:35, top:48, bottom:120, borderLeft:"1px dashed rgba(255,179,0,0.25)" }}/>
        <TimelineNode id="mstar" title="MORNINGSTAR — QUANT ANALYST" badge="ACTIVE" sub="Jul 2024–Present · Full-time" bullets={MSTAR_BULLETS} active />
        <TimelineNode id="webid" title="WEBID — GERMANY" sub="Freelance Market Research & BD Consultant" bullets={WEBID_BULLETS} />
        <TimelineNode id="intern" title="MORNINGSTAR — FIXED INCOME INTERN" sub="Jul–Dec 2023 · Mumbai" bullets={MSTAR_INTERN_BULLETS} />
        <TimelineNode id="wq" title="WORLDQUANT BRAIN" sub="Research Consultant · Apr–Jul 2023" bullets={WORLDQUANT_BULLETS} />
        <TimelineNode id="anthill" title="ANTHILL VENTURES" sub="Investment Analyst Intern · Jun–Aug 2022" bullets={ANTHILL_BULLETS} />
        <p style={{ color:MUT, fontFamily:F, fontSize:8, marginTop:4, letterSpacing:"0.15em" }}>CLICK NODE TO EXPAND</p>
      </div>
    );

    if (preview === "morningstar")        return <RoleDetail title="MORNINGSTAR" sub="Quantitative Analyst · Jul 2024–Present" bullets={MSTAR_BULLETS} />;
    if (preview === "morningstar-intern") return <RoleDetail title="MORNINGSTAR" sub="Fixed Income Indexes Intern · Jul–Dec 2023" bullets={MSTAR_INTERN_BULLETS} />;
    if (preview === "webid")              return <RoleDetail title="WEBID — GERMANY" sub="Freelance Market Research & BD Consultant" bullets={WEBID_BULLETS} color={TXT} />;
    if (preview === "worldquant")         return <RoleDetail title="WORLDQUANT BRAIN" sub="Research Consultant · Apr–Jul 2023" bullets={WORLDQUANT_BULLETS} />;
    if (preview === "anthill")            return <RoleDetail title="ANTHILL VENTURES" sub="Investment Analyst Intern · Jun–Aug 2022" bullets={ANTHILL_BULLETS} />;

    if (preview === "projects") return (
      <div style={{ padding:"20px 24px", position:"relative" }}>
        <div style={{ position:"absolute", left:35, top:48, bottom:100, borderLeft:"1px dashed rgba(255,179,0,0.25)" }}/>
        <TimelineNode id="ai" title="AI & AUTOMATION" sub="Mental Health Practitioners · Jan–Mar 2026" bullets={AI_BULLETS} />
        <TimelineNode id="trunagrik" title="TRUNAGRIK" sub="Consent-Based Digital Identity · Jul–Dec 2025" bullets={TRUNAGRIK_BULLETS} />
        <TimelineNode id="allcargo" title="ALLCARGO LOGISTICS" sub="Financial Analysis · Jan–May 2023" bullets={ALLCARGO_BULLETS} />
        <TimelineNode id="vguard" title="V-GUARD INDUSTRIES" sub="Business Analysis · Aug–Dec 2022" bullets={VGUARD_BULLETS} />
        <p style={{ color:MUT, fontFamily:F, fontSize:8, marginTop:4, letterSpacing:"0.15em" }}>CLICK NODE TO EXPAND</p>
      </div>
    );

    if (preview === "ai-research") return <RoleDetail title="AI & AUTOMATION" sub="Mental Health Practitioners · Jan–Mar 2026" bullets={AI_BULLETS} />;
    if (preview === "trunagrik")   return <RoleDetail title="TRUNAGRIK" sub="Consent-Based Digital Identity System · Jul–Dec 2025" bullets={TRUNAGRIK_BULLETS} />;
    if (preview === "allcargo")    return <RoleDetail title="ALLCARGO LOGISTICS" sub="Financial Analysis · Prof. Rajan Pandey, BITS Pilani · Jan–May 2023" bullets={ALLCARGO_BULLETS} />;
    if (preview === "v-guard")     return <RoleDetail title="V-GUARD INDUSTRIES" sub="Business Analysis · Prof. Rajan Pandey, BITS Pilani · Aug–Dec 2022" bullets={VGUARD_BULLETS} />;

    if (preview === "skills") return (
      <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:14 }}>
        {SKILLS_DATA.map(s => (
          <div key={s.name}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ color:TXT, fontFamily:F, fontSize:11 }}>{s.name}</span>
              <span style={{ color:AMB, fontFamily:F, fontSize:11 }}>{s.pct}%</span>
            </div>
            <div style={{ height:3, background:"rgba(255,179,0,0.1)", borderRadius:2, overflow:"hidden" }}>
              <div className="skill-bar" style={{ "--pct":`${s.pct}%` } as React.CSSProperties}/>
            </div>
          </div>
        ))}
      </div>
    );

    if (preview === "toolkit") return (
      <div style={{ padding:"20px 24px" }}>
        <div style={{ color:MUT, fontFamily:F, fontSize:11, marginBottom:12 }}>SELECT tool, category FROM toolkit;</div>
        <table style={{ borderCollapse:"collapse", fontFamily:F, fontSize:11, width:"100%" }}>
          <thead>
            <tr>{["tool","category"].map(h=>(
              <th key={h} style={{ padding:"6px 14px", textAlign:"left", border:"1px solid rgba(255,179,0,0.22)",
                background:"rgba(255,179,0,0.06)", color:AMB, letterSpacing:"0.08em", fontWeight:400 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {TOOLKIT_ROWS.map(([tool, cat], i) => (
              <tr key={i}>
                <td style={{ padding:"6px 14px", border:"1px solid rgba(255,179,0,0.1)", color:TXT }}>{tool}</td>
                <td style={{ padding:"6px 14px", border:"1px solid rgba(255,179,0,0.1)", color:MUT }}>{cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ color:OK, fontFamily:F, fontSize:11, marginTop:10 }}>{TOOLKIT_ROWS.length} rows returned.</div>
      </div>
    );

    if (preview === "contact") return (
      <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:20 }}>
        {[
          { label:"EMAIL",     val:"shreya.khubber@gmail.com",       href:"mailto:shreya.khubber@gmail.com" },
          { label:"LINKEDIN",  val:"linkedin.com/in/shreya-khubber",  href:"https://linkedin.com/in/shreya-khubber" },
          { label:"GITHUB",    val:"github.com/shreya-khubber",       href:"https://github.com/shreya-khubber" },
          { label:"INSTAGRAM", val:"@migratinglife",                  href:"https://www.instagram.com/migratinglife/" },
        ].map(({ label, val, href }) => (
          <div key={label}>
            <div style={{ color:MUT, fontFamily:F, fontSize:9, letterSpacing:"0.2em", marginBottom:6 }}>{label}</div>
            <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
              style={{ color:AMB, fontFamily:F, fontSize:13, textDecoration:"underline", textDecorationColor:"rgba(255,179,0,.35)" }}>
              {val}
            </a>
          </div>
        ))}
        <div>
          <div style={{ color:MUT, fontFamily:F, fontSize:9, letterSpacing:"0.2em", marginBottom:6 }}>LOCATION</div>
          <span style={{ color:TXT, fontFamily:F, fontSize:13 }}>Mumbai, India</span>
        </div>
        <div style={{ height:1, background:"rgba(255,179,0,0.14)" }}/>
        <a href={CV_PATH} download="Shreya_Khubber_CV.pdf"
          style={{ display:"inline-flex", alignItems:"center", gap:10, border:"1px solid rgba(255,179,0,0.4)",
            padding:"10px 18px", color:AMB, fontFamily:F, fontSize:11, letterSpacing:"0.15em",
            textDecoration:"none", background:"rgba(255,179,0,0.04)", transition:"background .15s" }}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,179,0,0.1)"}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,179,0,0.04)"}>
          ↓ DOWNLOAD CV
        </a>
      </div>
    );
    return null;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');
        *{box-sizing:border-box} html,body{margin:0;padding:0;background:#0A0A0A;height:100%}
        .scn{position:relative}
        .scn::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);pointer-events:none;z-index:1}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .cur{display:inline-block;width:.56em;height:1em;background:#FFB300;vertical-align:text-bottom;animation:blink 1.1s step-end infinite;margin-left:2px;flex-shrink:0}
        .chip{border:1px solid rgba(255,179,0,.28);color:rgba(255,179,0,.5);font-family:"Berkeley Mono","Fira Code","JetBrains Mono",monospace;font-size:11px;padding:3px 10px;background:transparent;cursor:pointer;transition:all .15s;letter-spacing:.04em;white-space:nowrap}
        .chip:hover{border-color:#FFB300;color:#FFB300;background:rgba(255,179,0,.06)}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fillBar{from{width:0}to{width:var(--pct)}}
        .skill-bar{height:100%;background:#FFB300;border-radius:2px;animation:fillBar .6s ease forwards}
        ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#2A2000;border-radius:2px}
        @media(max-width:767px){.split-wrap{flex-direction:column!important}.left-panel{width:100%!important;height:55vh!important}.right-panel{flex:none!important;height:45vh!important}.divider{width:100%!important;height:1px!important}.chip{font-size:13px;padding:6px 14px}}
      `}</style>

      <div className="split-wrap" style={{ position:"fixed", inset:0, background:"#0A0A0A", display:"flex", overflow:"hidden" }}
        onClick={() => inputRef.current?.focus()}>

        {/* ── LEFT: terminal ── */}
        <div className="left-panel" style={{ width:"58%", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 18px", borderBottom:"1px solid #1A1500", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ display:"flex", gap:6 }}>
                <div style={{ width:11, height:11, borderRadius:"50%", background:"#FF5F57" }}/>
                <div style={{ width:11, height:11, borderRadius:"50%", background:"#FFBD2E" }}/>
                <div style={{ width:11, height:11, borderRadius:"50%", background:"#28C840" }}/>
              </div>
              <a href="/" style={{ color:AMB, fontSize:11, fontFamily:F, letterSpacing:"0.18em", textDecoration:"none", fontWeight:600 }}
                onClick={e => e.stopPropagation()}>← icicle</a>
            </div>
            <span style={{ color:AMB, fontSize:11, letterSpacing:"0.28em", opacity:.85, fontFamily:F }}>ANALYST.WORKSPACE</span>
          </div>

          <div ref={outRef} className="scn" style={{ flex:1, overflowY:"auto", padding:"18px 24px 6px", minHeight:0 }}>
            {lines.map(l =>
              l.href ? (
                <a key={l.id} href={l.href} target={l.href.startsWith("http")||l.href.endsWith(".pdf")||l.href.endsWith(".xlsx")?"_blank":undefined}
                  rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                  style={{ display:"block", color:l.c, fontSize:"clamp(11px,1.2vw,13px)", lineHeight:1.75,
                    whiteSpace:"pre-wrap", wordBreak:"break-all", fontFamily:F, textDecoration:"underline",
                    textDecorationColor:"rgba(255,179,0,.35)", position:"relative", zIndex:2 }}>{l.t}</a>
              ) : (
                <div key={l.id} style={{ color:l.c, fontSize:"clamp(11px,1.2vw,13px)", lineHeight:1.75,
                  whiteSpace:"pre-wrap", wordBreak:"break-all", fontFamily:F, position:"relative", zIndex:2 }}>{l.t}</div>
              )
            )}
            {partial && (
              <div style={{ color:partial.c, fontSize:"clamp(11px,1.2vw,13px)", lineHeight:1.75,
                whiteSpace:"pre-wrap", fontFamily:F, position:"relative", zIndex:2 }}>{partial.t}</div>
            )}
          </div>

          <div style={{ padding:"6px 20px", display:"flex", gap:7, flexWrap:"wrap", flexShrink:0, borderTop:"1px solid #100E00" }}>
            {chips.map(chip => (
              <button key={chip} className="chip"
                onClick={e => { e.stopPropagation(); setInput(""); exec(chip); }}>{chip}</button>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", padding:"7px 20px 14px", flexShrink:0, borderTop:"1px solid #100E00" }}
            onClick={e => { e.stopPropagation(); inputRef.current?.focus(); }}>
            <span style={{ color:AMB, fontSize:"clamp(11px,1.2vw,13px)", marginRight:8, whiteSpace:"nowrap", fontFamily:F, flexShrink:0 }}>
              ANLST:~$
            </span>
            <div style={{ flex:1, display:"flex", alignItems:"center", minWidth:0, overflow:"hidden" }}>
              <input ref={inputRef} value={input}
                onChange={e => { setInput(e.target.value); if(running.current) flush(); }}
                onKeyDown={onKey}
                onBlur={() => { setTimeout(() => inputRef.current?.focus(), 80); }}
                autoFocus spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
                style={{ flex:1, background:"transparent", border:"none", outline:"none",
                  color:AMB, fontFamily:F, fontSize:"clamp(11px,1.2vw,13px)",
                  caretColor:"transparent", minWidth:0 }}/>
              <span className="cur" style={{ flexShrink:0 }}/>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="divider" style={{ width:1, background:"rgba(255,179,0,0.18)", flexShrink:0 }}/>

        {/* ── RIGHT: preview ── */}
        <div className="right-panel" style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 18px", borderBottom:"1px solid #1A1500", flexShrink:0 }}>
            <span style={{ color:MUT, fontFamily:F, fontSize:10, letterSpacing:"0.2em" }}>PREVIEW</span>
            <span style={{ color:AMB, fontFamily:F, fontSize:11, letterSpacing:"0.15em", opacity:.8 }}>
              {previewLabel[preview]}
            </span>
            <span style={{ color:DIM, fontFamily:F, fontSize:10, letterSpacing:"0.1em" }}>READ-ONLY</span>
          </div>
          <div key={pvKey} style={{ flex:1, overflowY:"auto", animation:"fadeIn 200ms ease" }}>
            {renderPreview()}
          </div>
        </div>
      </div>
    </>
  );
}
