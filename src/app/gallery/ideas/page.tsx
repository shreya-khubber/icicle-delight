"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import { galleryPieces } from "@/data/galleryData";

// ── Types ─────────────────────────────────────────────────────────────────────

type Book = {
  id: number;
  title: string;
  spine: string;
  leather: string;
  goldHex: string;
  width: number;
  height: number;
  year: string;
  tag: string;
  brief: string;
  description: string;
  status: string;
  outcome?: string;
  href?: string; // PDF link for research books
};

function hex2rgb(hex: string) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

// ── Book data ─────────────────────────────────────────────────────────────────


// ── Research PDFs — organised by category, same-colour per category ───────────

// Case Studies: forest green
const CL_CASE  = "linear-gradient(to right,#071810 0%,#122c1a 9%,#1b3c24 18%,#1b3c24 82%,#0e2016 100%)";
// Commentary on Startups: wine / dusty rose
const CL_COMM  = "linear-gradient(to right,#190810 0%,#320e1e 9%,#40162a 18%,#40162a 82%,#22101e 100%)";
// Finance Projects: deep navy
const CL_FIN   = "linear-gradient(to right,#060a18 0%,#0e1632 9%,#162040 18%,#162040 82%,#0a1226 100%)";
// Fixed Income: warm ash / graphite
const CL_FIXED = "linear-gradient(to right,#141210 0%,#282220 9%,#342c28 18%,#342c28 82%,#201c1a 100%)";
// Product Breakdowns: teal
const CL_PROD  = "linear-gradient(to right,#041616 0%,#0a2a2a 9%,#123838 18%,#123838 82%,#0a2020 100%)";
// Startup Analysis: amber / walnut
const CL_START = "linear-gradient(to right,#150c02 0%,#2c1a06 9%,#3c2410 18%,#3c2410 82%,#201406 100%)";

const RESEARCH_BOOKS: Book[] = [
  // ── Case Studies ──────────────────────────────────────────────────────────
  { id:15, title:"Groww",          spine:"Case Study",       leather:CL_CASE,  goldHex:"#90c898", width:72, height:208, year:"2023", tag:"Case Study · Fintech",
    brief:"Proposes GrowwVerify — a KYC aggregation layer using cKYC data and UPI authentication to eliminate repeated identity verification across financial institutions.",
    description:"India's KYC process forces the same user to re-verify identity repeatedly across every financial product they touch. This case study proposes GrowwVerify, a Groww sub-product that routes verification through central KYC records and UPI authentication across five components: cKYC compliance checking, data quality scoring, encrypted UPI-based identity mapping, a KYC dashboard, and a partner integration layer. The go-to-market covers a three-phase rollout prioritising fintech partnerships and payment system integrations before broader market entry.",
    status:"Completed", outcome:"Three-phase launch strategy built around cKYC + UPI integration for fintech partner onboarding.",
    href:"/Research%20Work/Case%20Studies/Groww%20Case%20Study.pdf" },

  // ── Commentary on Startups ────────────────────────────────────────────────
  { id:16, title:"Curefit",        spine:"Commentary",       leather:CL_COMM,  goldHex:"#d4a0b8", width:64, height:202, year:"2023", tag:"Commentary · Health Tech",
    brief:"Cure.fit's multi-vertical health-tech bet: 3M paying subscribers, $815M valuation, and the challenge of integrating gyms, nutrition, mental wellness, and teleconsultation under one app.",
    description:"Founded in 2016 by Mukesh Bansal and Ankit Nagori, Cure.fit raised approximately $400 million by 2020 and reached a valuation of $815 million with 3 million paying subscribers. The company operates across Cult.fit (physical gyms), Eat.fit (nutrition delivery), Mind.fit (mental wellness), Care.fit (teleconsultation), and Cult Sport (fitness apparel). Key partnerships include HRX, Zomato, PhonePe, and Fitteam. This commentary examines the strategic logic of vertical integration in health-tech and the unit economics pressure that comes with capex-heavy physical infrastructure.",
    status:"Completed", outcome:"Analysis of vertical integration strategy and the tension between physical footprint and sustainable unit economics.",
    href:"/Research%20Work/Commentary%20on%20Startups/Curefit.pdf" },

  { id:17, title:"Selco India",    spine:"Commentary",       leather:CL_COMM,  goldHex:"#d4a0b8", width:68, height:212, year:"2023", tag:"Commentary · Impact Business",
    brief:"Co-founded 1995 with $150K USAID funding, now serving 350,000 rural households through solar energy bundled with micro-credit designed for irregular income earners.",
    description:"Co-founded in 1995 by Harish Hande and Neville Williams with $150,000 in USAID seed funding, Selco India now employs 534 people and serves 350,000 households. Its four service lines cover Basic Energy Access (solar lighting, water heaters), Livelihoods (DC appliances for weavers and street vendors), Institutional (health centres, schools), and Advisory/Training. The micro-credit innovation introduced in 2009 through bank partnerships converted solar panels from a capital purchase into an affordable monthly loan matched to irregular income patterns. Selco has consistently resisted pressure to scale rapidly, prioritising community embeddedness over growth metrics.",
    status:"Completed", outcome:"Model for patient-capital, community-embedded deployment in rural energy access.",
    href:"/Research%20Work/Commentary%20on%20Startups/Selco%20India.pdf" },

  // ── Finance Projects ──────────────────────────────────────────────────────
  { id:18, title:"Allcargo",       spine:"Finance Projects", leather:CL_FIN,   goldHex:"#8aacdc", width:78, height:218, year:"2023", tag:"Financial Analysis · Logistics",
    brief:"Financial ratio analysis, IPO performance, and a sixteen-year stock price history of Allcargo Logistics — tracing an 18.5% revenue CAGR interrupted by freight rate collapse.",
    description:"This analysis covers Allcargo across three dimensions. Financial ratios reveal weak liquidity despite strong sales growth (71.23% YoY at peak). IPO performance shows 1.44x subscription and a 0.72% listing-day loss. The stock price study spans 2007-2023: revenue grew from INR 1,013 crore (2008) to INR 8,197 crore (2021) at an 18.5% CAGR. Key inflection points include the 2008 recession (63% price drop, then recovery), the 2013 dip tied to port cargo volume decline, and the Feb 2023 collapse following Q3 results showing a 26.8% revenue drop and 61.6% profit decline driven by global freight rate normalisation after pandemic-era highs.",
    status:"Completed", outcome:"Revenue CAGR 18.5% (2008-2021); Q3 FY2023 inflection traced to freight rate collapse and 61.6% profit decline.",
    href:"/Research%20Work/Finance%20Projects/Allcargo%20Analysis%20-%20stock%20price%20movement%20analysis.pdf" },

  { id:19, title:"V-Guard",        spine:"Finance Projects", leather:CL_FIN,   goldHex:"#8aacdc", width:62, height:206, year:"2022", tag:"Financial Analysis · FMEG",
    brief:"V-Guard FY2021-22 MD&A analysis: 28.7% revenue growth to INR 3,475 crore, EBITDA margin contraction from raw material inflation, and the Simon Electric acquisition.",
    description:"V-Guard reported FY2022 revenue of INR 3,475 crore (28.7% growth) with EBITDA margin contracting 180 basis points to 9.6% under raw material cost pressure. The company's three segments: Electricals (45.9%), Consumer Durables (30.6%, growing 44.4% YoY), and Electronics (23.5%, growing 7.4%). Strategic moves include the Simon Electric acquisition (accessing the premium wiring devices segment) and formation of V-Guard Consumer Products Ltd for in-house manufacturing. The analysis maps MD&A language around non-southern geographic expansion to subsequent stock outperformance, and flags high D/E ratios and late e-commerce adoption as structural vulnerabilities.",
    status:"Completed", outcome:"Geographic expansion language in MD&A correlated with ~5% YoY stock outperformance in FY21-22.",
    href:"/Research%20Work/Finance%20Projects/V-Guard%20MD%26A%20Analysis.pdf" },

  // ── Fixed Income ──────────────────────────────────────────────────────────
  { id:20, title:"Duration & ZCB", spine:"Fixed Income",     leather:CL_FIXED, goldHex:"#c8b898", width:58, height:198, year:"2024", tag:"Fixed Income · Rates",
    brief:"Derives the precise ZCB duration formula D_eff = T/(1+y) — always slightly less than maturity — and shows the convexity gap with a worked numerical example.",
    description:"The common shorthand that a zero-coupon bond's duration equals its maturity is an approximation. This paper derives the precise formula D_eff = T/(1+y) using a Taylor series on the price function P(y) = 1/(1+y)^T. Duration is the first derivative of the price-yield curve (the slope), not the realised price change. A worked example: a 5-year ZCB at 1% yield generates a duration estimate of -4.95% for a 100bp rate rise, while the actual price change is -4.81%. The 14bp gap is convexity, the second-order Taylor term that linear duration ignores and which always makes the actual price drop smaller than the linear estimate predicts.",
    status:"Completed", outcome:"D_eff = T/(1+y) derived with proof; 14bp convexity gap quantified on a 5-year ZCB at 1% yield.",
    href:"/Research%20Work/Fixed%20Income/Effective%20Duration%20-%20ZCB.pdf" },

  { id:21, title:"Swap Spreads",   spine:"Fixed Income",     leather:CL_FIXED, goldHex:"#c8b898", width:74, height:210, year:"2024", tag:"Fixed Income · Derivatives",
    brief:"Why 30-year swap rates fell below U.S. Treasury yields from 2008 to 2016, and why dealers could not arbitrage it away even with a -62bp spread sitting open.",
    description:"Swap spreads should be positive since banks carry more credit risk than the U.S. government. In November 2008, long-end spreads hit -62 basis points and remained negative through 2016. Two structural forces explain this. First: pension funds flooded the market with fixed-rate receivers, seeking duration through swaps (cheaper execution than buying Treasuries outright), suppressing swap rates. Second: post-crisis Supplementary Leverage Ratio (SLR) rules required dealers to hold 6% capital backing versus 1% pre-2008, collapsing arbitrage ROE from 37% to 6%. Spreads needed to reach -50 to -70 bps to justify dealer participation. The $20 bill lay on the floor; regulatory capital made bending down too expensive.",
    status:"Completed", outcome:"SLR as the binding constraint: arbitrage required -50 to -70 bps break-even given 6% capital requirements.",
    href:"/Research%20Work/Fixed%20Income/Negative%20Swap%20Spreads%20Explanation.pdf" },

  // ── Product Breakdowns ────────────────────────────────────────────────────
  { id:22, title:"Coinswitch",     spine:"Product Breakdown", leather:CL_PROD,  goldHex:"#7ec8c2", width:82, height:216, year:"2023", tag:"Product Design · Live Events",
    brief:"A product design deck for the problem: individuals face significant challenges at live events like concerts and music shows — identify one problem and design a digital solution.",
    description:"This is a product case study built around a structured design challenge: identify the core problems people encounter at live events (concerts, music shows) and design a digital product solution from the ground up. The deck works through problem framing, user persona definition, pain point prioritisation, and product specification — applying a disciplined product thinking framework that moves from a broad problem space to a specific, designed intervention. The output is a product proposal presented with flows, reasoning, and design rationale.",
    status:"Completed",
    href:"/Research%20Work/Product%20Breakdowns/Coinswitch%20deck.pdf" },

  { id:23, title:"Hotstar",        spine:"Product Breakdown", leather:CL_PROD,  goldHex:"#7ec8c2", width:66, height:204, year:"2022", tag:"Product Case Study · Hotstar",
    brief:"A product case study on improving onboarding and retention for elderly users on Hotstar — user research, friction points, and redesigned flows for an underserved segment.",
    description:"This product case study tackles the challenge of making Hotstar accessible and sticky for elderly users, who face distinct onboarding friction and retention barriers compared to younger demographics. The analysis identifies the specific usability challenges this segment encounters — navigation complexity, content discovery, font sizing, and feature overwhelm — then proposes redesigned onboarding flows and retention mechanisms tailored to elderly viewing habits and comfort levels with digital interfaces. The deck is structured as a product case study with problem framing, user research insights, and a proposed solution.",
    status:"Completed",
    href:"/Research%20Work/Product%20Breakdowns/Doremon%20Den%20-%20Hotstar%20Case%20Study.pdf" },

  // ── Startup Analysis ──────────────────────────────────────────────────────
  { id:24, title:"Deconstruct",    spine:"Startup Analysis", leather:CL_START, goldHex:"#d4a840", width:62, height:212, year:"2023", tag:"Startup · Skincare D2C",
    brief:"Unfunded, founder Malini Adapureddy (IIT-KGP, INSEAD, ex-P&G/Flipkart): competing on ingredient transparency in India's USD 1.75Bn skincare market against The Ordinary and Minimalist.",
    description:"Deconstruct was founded by Malini Adapureddy (IIT Kharagpur, INSEAD, ex-P&G and Flipkart) and operates unfunded out of Bengaluru, selling mass-premium serums differentiated through scientific ingredient descriptions, DIY combination guides, and educational content. The Indian dermocosmetics segment sits at USD 26.85 million (8.51% CAGR) within a USD 1.75 billion skincare market. Competitors include The Ordinary and The Inkey List globally, and Minimalist ($15M Series A), Dot & Key, and Derma.co domestically. The analysis identifies expansion to Nykaa and specialist retail channels, and improvement of website UI/UX, as the most critical near-term levers.",
    status:"Completed", outcome:"Ingredient transparency as a moat: positioning and distribution analysis in India's dermocosmetics segment.",
    href:"/Research%20Work/Startup%20Analysis/Deconstruct%20Analysis_Shreya%20Khubber.pdf" },

  { id:26, title:"SpotDraft",      spine:"Startup Analysis", leather:CL_START, goldHex:"#d4a840", width:66, height:208, year:"2023", tag:"Investment Case Study · LegalTech",
    brief:"An investment case study on SpotDraft: founding team, product, revenue trajectory ($200K to $336K), market sizing, and what makes the CLM opportunity compelling at Seed stage.",
    description:"This is an investor-style case study examining SpotDraft from the inside out. Founded in 2017 by Shashank Bijapur (CEO), Madhav Bhagat (CTO), and Rohith Salim (CPO), SpotDraft is a contract lifecycle management platform at Seed stage with a $12.26 million valuation. Revenue grew from USD 200K (2018) to USD 336K (2019) with 100,000+ contracts executed across 11 countries. The case study covers product (lawyer-vetted templates, document automation, e-signatures, audit trails), market sizing ($380M India, $3.57B global, both growing 12-15% CAGR), competitive landscape, and the impact case: CLM reduces contract approval time by 62% and admin costs by 25-30%.",
    status:"Completed",
    href:"/Research%20Work/Startup%20Analysis/Spotdraft%20Analysis.pdf" },
];

const ROW1 = RESEARCH_BOOKS.slice(0, 6);
const ROW2 = RESEARCH_BOOKS.slice(6);

// ── Book spine ────────────────────────────────────────────────────────────────

function BookSpine({ book, onHover, onOpen }: {
  book: Book;
  onHover: (b: Book | null) => void;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const gold = hex2rgb(book.goldHex);
  const fontSize = Math.min(13, Math.max(9, book.width * 0.19));

  return (
    <div
      style={{
        width: book.width, height: book.height,
        flexShrink: 0, cursor: "pointer", position: "relative",
        transform: hovered ? "translateY(-14px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => { setHovered(true); onHover(book); }}
      onMouseLeave={() => { setHovered(false); onHover(null); }}
      onClick={onOpen}
    >
      <div className="h-full w-full relative overflow-hidden" style={{
        background: book.leather,
        boxShadow: hovered
          ? `3px 14px 36px rgba(0,0,0,0.75), inset 4px 0 10px rgba(0,0,0,0.5)`
          : `1px 5px 14px rgba(0,0,0,0.55), inset 3px 0 8px rgba(0,0,0,0.4)`,
        transition: "box-shadow 0.3s ease",
      }}>
        {/* Top band */}
        <div style={{ position:"absolute", top:10, left:0, right:0, height:1, background:`rgba(${gold},0.65)` }} />
        <div style={{ position:"absolute", top:14, left:4, right:4, height:1, background:`rgba(${gold},0.28)` }} />
        {/* Bottom band */}
        <div style={{ position:"absolute", bottom:10, left:0, right:0, height:1, background:`rgba(${gold},0.65)` }} />
        <div style={{ position:"absolute", bottom:14, left:4, right:4, height:1, background:`rgba(${gold},0.28)` }} />

        {/* Vertical title */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%) rotate(-90deg)",
          whiteSpace:"nowrap", width: book.height - 44, textAlign:"center",
          pointerEvents:"none",
        }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize, color:book.goldHex, fontStyle:"italic", letterSpacing:"0.07em", lineHeight:1.2, textShadow:"0 1px 4px rgba(0,0,0,0.9)" }}>
            {book.title}
          </p>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:6.5, letterSpacing:"0.2em", color:`rgba(${gold},0.48)`, textTransform:"uppercase", marginTop:5 }}>
            {book.spine}
          </p>
        </div>

        {/* Diamond ornament */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%) rotate(45deg)",
          width:5, height:5, border:`1px solid rgba(${gold},0.3)`,
          marginTop: book.height * 0.2,
        }} />

        {/* Hover shimmer */}
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,rgba(${gold},0.08) 0%,transparent 40%)`, opacity:hovered?1:0, transition:"opacity 0.3s ease", pointerEvents:"none" }} />
      </div>
    </div>
  );
}

// ── Shelf row ─────────────────────────────────────────────────────────────────

function LibraryShelf({ books, onHover, onOpen }: {
  books: Book[];
  onHover: (b: Book | null) => void;
  onOpen: (b: Book) => void;
}) {
  return (
    <div style={{ position:"relative", paddingBottom:28 }}>
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, padding:"0 20px" }}>
        {books.map((b) => (
          <BookSpine key={b.id} book={b} onHover={onHover} onOpen={() => onOpen(b)} />
        ))}
      </div>
      {/* Shelf board */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:28,
        background:"linear-gradient(to bottom,#4a2e0c 0%,#5c3c14 25%,#4a2e0c 100%)",
        boxShadow:"0 10px 28px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.6)",
      }} />
      <div style={{ position:"absolute", bottom:25, left:0, right:0, height:1, background:"rgba(255,255,255,0.06)" }} />
    </div>
  );
}

// ── Left info panel ───────────────────────────────────────────────────────────

function LeftPanel({ hoveredBook }: { hoveredBook: Book | null }) {
  return (
    <div style={{
      flex:"0 0 240px", display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"32px 28px", borderRight:"1px solid rgba(201,168,76,0.1)",
      background:"linear-gradient(to right,#040200,#060402)",
      position:"relative", overflow:"hidden",
    }}>
      {/* Subtle wood grain lines */}
      {[20,35,52,71,90,110].map((t) => (
        <div key={t} style={{ position:"absolute", top:`${t}%`, left:0, right:0, height:1, background:"rgba(255,255,255,0.015)" }} />
      ))}

      <AnimatePresence mode="wait">
        {hoveredBook ? (
          <motion.div
            key={hoveredBook.id}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.22 }}
          >
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em", color:"#c9a84c", textTransform:"uppercase", marginBottom:5 }}>
              {hoveredBook.tag}
            </p>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.18em", color:"rgba(201,168,76,0.55)", textTransform:"uppercase", marginBottom:16 }}>
              {hoveredBook.year}
            </p>
            <div style={{ height:1, background:"linear-gradient(to right,rgba(201,168,76,0.5),transparent)", marginBottom:18 }} />
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, color:"#e8dcc8", fontWeight:300, fontStyle:"italic", lineHeight:1.15, marginBottom:14 }}>
              {hoveredBook.title}
            </p>
            <p style={{ fontSize:14, color:"#a8bcaa", lineHeight:1.75, marginBottom:20 }}>
              {hoveredBook.brief}
            </p>
            <div style={{ height:1, background:"linear-gradient(to right,rgba(201,168,76,0.3),transparent)", marginBottom:16 }} />
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:hoveredBook.status.toLowerCase().includes("ongoing")||hoveredBook.status.toLowerCase().includes("perpetual") ? "#34d399" : "rgba(201,168,76,0.65)", flexShrink:0 }} />
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em", color:"rgba(201,168,76,0.65)", textTransform:"uppercase" }}>
                {hoveredBook.status}
              </p>
            </div>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.16em", color:"rgba(201,168,76,0.4)", marginTop:24, textTransform:"uppercase" }}>
              Click to open →
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}
          >
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.25em", color:"rgba(201,168,76,0.55)", textTransform:"uppercase", marginBottom:20 }}>
              Research Vault
            </p>
            <div style={{ height:1, background:"linear-gradient(to right,rgba(201,168,76,0.35),transparent)", marginBottom:24 }} />
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"rgba(232,220,200,0.82)", fontStyle:"italic", lineHeight:1.6, marginBottom:10 }}>
              &ldquo;Curiosity is the wick in the candle of learning.&rdquo;
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:"rgba(201,168,76,0.55)", fontStyle:"italic", marginBottom:28 }}>
              — William Arthur Ward
            </p>
            <div style={{ height:1, background:"linear-gradient(to right,rgba(201,168,76,0.2),transparent)", marginBottom:24 }} />
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.18em", color:"rgba(200,190,170,0.45)", textTransform:"uppercase", lineHeight:2.2 }}>
              Hover any volume<br />to begin exploring
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Right catalogue panel ─────────────────────────────────────────────────────

function RightPanel() {
  const entries = [
    ["Startup Analysis",  "2"],
    ["Financial Analysis","2"],
    ["Product Breakdown", "2"],
    ["Fixed Income",      "2"],
    ["Commentary",        "2"],
    ["Case Study",        "1"],
  ];

  return (
    <div style={{
      flex:"0 0 210px", display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"32px 26px", borderLeft:"1px solid rgba(201,168,76,0.1)",
      background:"linear-gradient(to left,#040200,#060402)",
      position:"relative", overflow:"hidden",
    }}>
      {[20,38,55,73,91].map((t) => (
        <div key={t} style={{ position:"absolute", top:`${t}%`, left:0, right:0, height:1, background:"rgba(255,255,255,0.015)" }} />
      ))}

      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.25em", color:"rgba(201,168,76,0.6)", textTransform:"uppercase", marginBottom:12 }}>
        The Collection
      </p>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, color:"#e8dcc8", fontWeight:300, marginBottom:4, lineHeight:1 }}>
        11
      </p>
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.22em", color:"rgba(201,168,76,0.45)", textTransform:"uppercase", marginBottom:18 }}>
        Volumes
      </p>
      <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)", marginBottom:16 }} />

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {entries.map(([label, count]) => (
          <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:"0.1em", color:"rgba(200,190,168,0.52)", textTransform:"uppercase" }}>
              {label}
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"rgba(201,168,76,0.6)", fontStyle:"italic" }}>
              {count}
            </p>
          </div>
        ))}
      </div>

      <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)", marginTop:16, marginBottom:16 }} />

      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.15em", color:"rgba(201,168,76,0.45)", textTransform:"uppercase", lineHeight:2.1, marginBottom:16 }}>
        Author: S. Khubber<br />2022 — 2024
      </p>

      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"rgba(232,220,200,0.45)", fontStyle:"italic", lineHeight:1.65 }}>
        &ldquo;Not all who wander are without purpose.&rdquo;
      </p>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function BookModal({ book, onClose }: { book: Book; onClose: () => void }) {
  const gold = hex2rgb(book.goldHex);
  return (
    <>
      <motion.div key="bg" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.28 }}
        onClick={onClose} style={{ position:"fixed", inset:0, zIndex:58, background:"rgba(4,3,2,0.93)", backdropFilter:"blur(10px)", cursor:"pointer" }} />
      <motion.div key="modal" initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:22 }}
        transition={{ duration:0.42, ease:[0.76,0,0.24,1] }}
        style={{ position:"fixed", inset:"5% 6%", zIndex:59, background:"linear-gradient(145deg,#0a0804 0%,#100e08 55%,#0c0a06 100%)", border:"1px solid rgba(201,168,76,0.18)", boxShadow:"0 32px 100px rgba(0,0,0,0.88)", display:"flex", overflow:"hidden" }}>

        {/* Cover */}
        <div style={{ flex:"0 0 36%", position:"relative", background:book.leather, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 20%,rgba(255,255,255,0.04) 0%,transparent 60%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:20, border:`1px solid rgba(${gold},0.35)` }} />
          <div style={{ position:"absolute", inset:28, border:`1px solid rgba(${gold},0.15)` }} />
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} style={{ position:"absolute", [v]:18, [h]:18, width:10, height:10, borderTop:v==="top"?`1px solid rgba(${gold},0.6)`:"none", borderBottom:v==="bottom"?`1px solid rgba(${gold},0.6)`:"none", borderLeft:h==="left"?`1px solid rgba(${gold},0.6)`:"none", borderRight:h==="right"?`1px solid rgba(${gold},0.6)`:"none" }} />
          ))}
          <div style={{ textAlign:"center", padding:"0 44px", zIndex:1 }}>
            <div style={{ height:1, background:`rgba(${gold},0.55)`, marginBottom:22 }} />
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(20px,2.8vw,36px)", color:book.goldHex, fontStyle:"italic", fontWeight:300, lineHeight:1.2, letterSpacing:"0.06em", textShadow:"0 2px 14px rgba(0,0,0,0.9)" }}>
              {book.title}
            </p>
            <div style={{ height:1, background:`rgba(${gold},0.55)`, marginTop:22, marginBottom:14 }} />
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:"0.3em", color:`rgba(${gold},0.55)`, textTransform:"uppercase" }}>
              {book.spine}
            </p>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex:1, padding:"60px 48px 44px", overflowY:"auto", borderLeft:"1px solid rgba(201,168,76,0.1)", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <button onClick={onClose} style={{ position:"absolute", top:18, right:22, background:"none", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:"0.3em", color:"#7aadad", textTransform:"uppercase" }}>
            × Close
          </button>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:"0.28em", color:"#c9a84c", textTransform:"uppercase", marginBottom:6 }}>
            {book.tag} · {book.year}
          </p>
          <div style={{ width:32, height:1, background:"rgba(201,168,76,0.4)", marginBottom:22 }} />
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,3.5vw,50px)", color:"#e8dcc8", fontWeight:300, lineHeight:1.1, marginBottom:12 }}>
            {book.title}
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontStyle:"italic", color:"#7aadad", marginBottom:26, lineHeight:1.5 }}>
            {book.brief}
          </p>
          <div style={{ height:1, background:"rgba(201,168,76,0.12)", marginBottom:26 }} />
          <p style={{ fontSize:"0.93rem", color:"#bdc7b6", lineHeight:1.95, maxWidth:480 }}>
            {book.description}
          </p>
          <div style={{ marginTop:28, display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"7px 16px", border:"1px solid rgba(201,168,76,0.28)", fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:"0.22em", color:"#c9a84c", textTransform:"uppercase" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:book.status.toLowerCase().includes("ongoing")||book.status.toLowerCase().includes("perpetual")?"#34d399":"rgba(201,168,76,0.65)" }} />
              {book.status}
            </span>
            {book.href && (
              <a href={book.href} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"7px 16px", border:`1px solid rgba(${hex2rgb(book.goldHex)},0.5)`, fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:"0.22em", color:book.goldHex, textTransform:"uppercase", textDecoration:"none", transition:"background .15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background=`rgba(${hex2rgb(book.goldHex)},0.08)`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}>
                View PDF ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WandererPage() {
  const router = useRouter();
  const ci = galleryPieces.findIndex((p) => p.id === "ideas");
  const nextPiece = galleryPieces[(ci + 1) % galleryPieces.length];
  const prevPiece = galleryPieces[(ci - 1 + galleryPieces.length) % galleryPieces.length];

  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  const [activeBook,  setActiveBook]  = useState<Book | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => { setEntered(true); }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseY((e.clientY / window.innerHeight - 0.5) * 3);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeBook) { setActiveBook(null); return; }
      if (e.key === "Escape") router.push("/");
      if (!activeBook && e.key === "ArrowRight") router.push(`/gallery/${nextPiece.id}`);
      if (!activeBook && e.key === "ArrowLeft")  router.push(`/gallery/${prevPiece.id}`);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [router, activeBook, nextPiece, prevPiece]);

  return (
    <main
      className="fixed inset-0 overflow-hidden"
      style={{ background:"#050302" }}
      onMouseMove={handleMouseMove}
    >
      <HamburgerMenu />

      {/* Nav */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between"
        style={{ height:40, padding:"0 40px", paddingRight:72, background:"rgba(4,3,2,0.97)", borderBottom:"1px solid rgba(201,168,76,0.14)" }}>
        <Link href="/" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"#7a6a4a" }}>
          &lt;- Icicle
        </Link>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"#7a6a4a" }}>
          No. IV · The Wanderer
        </p>
        <div className="flex items-center gap-6">
          <Link href={`/gallery/${prevPiece.id}`} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#7a6a4a" }}>&lt;- Prev</Link>
          <Link href={`/gallery/${nextPiece.id}`} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#7a6a4a" }}>Next -&gt;</Link>
        </div>
      </div>

      {/* Three-column library layout */}
      <div style={{ position:"absolute", top:40, left:0, right:0, bottom:0, display:"flex" }}>

        {/* Left info panel */}
        <LeftPanel hoveredBook={hoveredBook} />

        {/* Centre — bookcase */}
        <div style={{ flex:1, display:"flex", alignItems:"flex-start", justifyContent:"center", position:"relative", overflowY:"auto", paddingTop:24, paddingBottom:32 }}>
          {/* Ceiling glow */}
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"90%", height:240, background:"radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.09) 0%,transparent 72%)", pointerEvents:"none" }} />

          {/* Perspective scene */}
          <div style={{ perspective:"1500px", perspectiveOrigin:"50% 36%" }}>
            <motion.div
              initial={{ opacity:0, y:28 }}
              animate={{ opacity:entered?1:0, y:entered?0:28 }}
              transition={{ duration:1.1, ease:[0.76,0,0.24,1] }}
              style={{
                transformStyle:"preserve-3d",
                transform:`rotateX(${8 - mouseY*0.28}deg)`,
                transition:"transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            >
              {/* Bookcase */}
              <div style={{
                background:"linear-gradient(to right,#0e0804 0%,#1c1008 8%,#261608 50%,#1c1008 92%,#0e0804 100%)",
                padding:"0 20px",
                boxShadow:"0 40px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,168,76,0.1), inset 0 0 60px rgba(0,0,0,0.55)",
              }}>
                {/* Title plaque above shelves */}
                <div style={{ padding:"16px 24px 12px", textAlign:"center", borderBottom:"1px solid rgba(201,168,76,0.15)" }}>
                  <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)", marginBottom:10 }} />
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"rgba(201,168,76,0.75)", fontStyle:"italic", fontWeight:300, letterSpacing:"0.12em" }}>
                    Research Vault
                  </p>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:7, letterSpacing:"0.3em", color:"rgba(201,168,76,0.3)", textTransform:"uppercase", marginTop:4 }}>
                    Research Vault · 11 Documents
                  </p>
                  <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)", marginTop:10 }} />
                </div>

                <div style={{ padding:"16px 0 0" }}>
                  <LibraryShelf books={ROW1} onHover={setHoveredBook} onOpen={setActiveBook} />
                  <div style={{ height:16 }} />
                  <LibraryShelf books={ROW2} onHover={setHoveredBook} onOpen={setActiveBook} />
                </div>

                {/* Bottom moulding */}
                <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)", marginTop:4 }} />
                <div style={{ height:16, background:"linear-gradient(to bottom,#261608,#160e04)" }} />
              </div>
            </motion.div>
          </div>

          {/* Floor hint text */}
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:0.35 }} transition={{ delay:1.4, duration:0.8 }}
            style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, letterSpacing:"0.35em", textTransform:"uppercase", color:"#c9a84c", whiteSpace:"nowrap" }}
          >
            hover to discover · click to read
          </motion.p>
        </div>

        {/* Right catalogue panel */}
        <RightPanel />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeBook && <BookModal book={activeBook} onClose={() => setActiveBook(null)} />}
      </AnimatePresence>
    </main>
  );
}
