export interface GalleryPiece {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  period: string;
  medium: string;
  shortDescription: string;
  artworkType: "career" | "projects" | "art" | "ideas" | "writer";
  panel: {
    intro: string;
    sections: { heading: string; body: string }[];
    links?: { label: string; href: string }[];
  };
}

export const galleryPieces: GalleryPiece[] = [
  {
    id: "career",
    catalogNumber: "No. I",
    title: "The Analyst",
    subtitle: "Career & Finance",
    period: "2020 – Present",
    medium: "Spreadsheets, Code & Instinct",
    shortDescription: "Where numbers develop a personality.",
    artworkType: "career",
    panel: {
      intro:
        "Finance gave me the rigour to ask the right questions. Code gave me the tools to answer them faster. Together, they've shaped how I see problems — with both precision and curiosity.",
      sections: [
        {
          heading: "Experience",
          body: "Add your roles and companies here. What did you do? What did you build or analyse? What impact did you have?",
        },
        {
          heading: "Skills",
          body: "Financial modelling · Python · SQL · Data visualisation · Excel · Bloomberg · Portfolio analysis",
        },
        {
          heading: "What drives me",
          body: "I believe the most interesting insights live at the intersection of quantitative rigour and creative interpretation. I'm drawn to problems where a well-placed formula or a clean dataset can change the entire narrative.",
        },
      ],
      links: [
        { label: "Download CV", href: "/cv.pdf" },
        { label: "LinkedIn", href: "https://linkedin.com/in/shreya-khubber" },
      ],
    },
  },
  {
    id: "projects",
    catalogNumber: "No. II",
    title: "The Builder",
    subtitle: "Projects & Experiments",
    period: "Ongoing",
    medium: "Code, APIs & Late Nights",
    shortDescription: "Things made from scratch, out of curiosity.",
    artworkType: "projects",
    panel: {
      intro:
        "Every project here started with a single question: what if I just tried? Some are polished. Some are prototypes. All of them taught me something I couldn't have learned any other way.",
      sections: [
        {
          heading: "Project 1 — Title",
          body: "Describe this project: what problem it solved, what stack you used, and what you learned. Add a link below.",
        },
        {
          heading: "Project 2 — Title",
          body: "Describe this project: what problem it solved, what stack you used, and what you learned.",
        },
        {
          heading: "Project 3 — Title",
          body: "Describe this project: what problem it solved, what stack you used, and what you learned.",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/shreya-khubber" },
      ],
    },
  },
  {
    id: "art",
    catalogNumber: "No. III",
    title: "The Eye",
    subtitle: "Visual Art & Drawing",
    period: "Always",
    medium: "Pencil, Ink, Digital & Instinct",
    shortDescription: "Seeing the world as composition.",
    artworkType: "art",
    panel: {
      intro:
        "Art is how I process things I can't put into words. Drawing has taught me more about observation — and patience — than any course I've taken.",
      sections: [
        {
          heading: "Practice",
          body: "Describe your art practice here. Do you sketch daily? Work in a particular style? Are there recurring themes in your work?",
        },
        {
          heading: "Influences",
          body: "Who or what inspires your visual work? List artists, movements, or everyday things that shape how you see.",
        },
        {
          heading: "Where art meets everything else",
          body: "How does your creative eye show up in your other work — in presentations, in code, in how you structure a financial model?",
        },
      ],
      links: [
        { label: "Instagram", href: "https://instagram.com/" },
      ],
    },
  },
  {
    id: "ideas",
    catalogNumber: "No. IV",
    title: "The Wanderer",
    subtitle: "Exploring Random Ideas",
    period: "Perpetually",
    medium: "Curiosity, Wikipedia & Long Walks",
    shortDescription: "A mind that refuses to stay in one lane.",
    artworkType: "ideas",
    panel: {
      intro:
        "Some of my best thinking happens when I'm not thinking about work at all. This is the corner of my mind where finance meets philosophy, where a random book chapter sends me down a three-hour rabbit hole.",
      sections: [
        {
          heading: "Current obsessions",
          body: "What are you currently fascinated by? What tabs are always open in your browser? What topics do you read about for no professional reason?",
        },
        {
          heading: "Things I've explored",
          body: "Behavioural economics · Systems thinking · Urban design · Music theory · Language learning · The history of money · Generative art",
        },
        {
          heading: "Why this matters",
          body: "Cross-domain thinking is a superpower. My most useful ideas at work have almost always come from something I was reading entirely outside of it.",
        },
      ],
    },
  },
  {
    id: "writer",
    catalogNumber: "No. V",
    title: "The Writer",
    subtitle: "Articles & Poems",
    period: "Whenever it demands to be written",
    medium: "Words, Rhythm & Ruthless Editing",
    shortDescription: "Thought made visible through language.",
    artworkType: "writer",
    panel: {
      intro:
        "Writing is how I find out what I actually think. Articles sharpen an argument; poems let the argument breathe. Both start from the same place — something I noticed that I couldn't unfeel.",
      sections: [
        {
          heading: "Articles",
          body: "Add links or descriptions of your essays and articles here. What subjects do you write about? What perspective do you bring that others don't?",
        },
        {
          heading: "Poetry",
          body: "Describe your poetry here — the themes, the forms you gravitate toward, what writing poetry gives you that prose can't.",
        },
        {
          heading: "The through-line",
          body: "Whether it's a financial analysis or a four-line poem, I'm always trying to find the one sentence that makes everything else unnecessary. That compression is what I'm after.",
        },
      ],
      links: [
        { label: "Read my work", href: "#" },
      ],
    },
  },
];

export interface WandererBook {
  id: string;
  title: string;
  category: string;
  status: string;
  timeframe: string;
  tags: string[];
  width: string;
  height: string;
  spineGradient: string;
  summary: string;
  longDescription: string;
  whatIDid: string;
  whatILearned: string;
  outcome: string;
  links?: { label: string; href: string }[];
}

export const wandererBooks: WandererBook[] = [
  {
    id: "market-discovery",
    title: "Demand-First Launch",
    category: "Startup Research",
    status: "Prototype",
    timeframe: "Q1 2026",
    tags: ["market", "product", "testing"],
    width: "120px",
    height: "260px",
    spineGradient: "linear-gradient(180deg, #2e4f6c, #1d2f3f)",
    summary: "Mapped demand signals from creators and built a lean landing page to validate willingness to pay.",
    longDescription:
      "I turned a market question into a lightweight demand test. The goal was to learn whether a specific creator need could be turned into a product instead of guessing from a slide deck.",
    whatIDid:
      "I interviewed 12 creators, built a simple landing page, and tracked conversion behavior over one week. I then iterated the value proposition based on real responses.",
    whatILearned:
      "Clear demand often lives in a small, specific audience. The idea was useful, but the go-to-market path needed a narrower problem definition.",
    outcome:
      "I paused the prototype after learning the core user needed more than a simple message board — it deserved a richer interaction design and deeper trust signals.",
    links: [{ label: "View notes", href: "#" }],
  },
  {
    id: "data-ethics",
    title: "Ethics of Signal",
    category: "Research Note",
    status: "Explored",
    timeframe: "Jan 2026",
    tags: ["data", "ethics", "finance"],
    width: "100px",
    height: "225px",
    spineGradient: "linear-gradient(180deg, #574c77, #31264c)",
    summary: "A short paper on how noisy trading signals become biased when they’re treated as truth.",
    longDescription:
      "I wrote a compact research essay examining the gap between signal discovery and responsible deployment. This was inspired by conversations in quant research and index design.",
    whatIDid:
      "I built a conceptual framework that separates signal sources into behavioural, technical, and structural categories and tested it against past index launches.",
    whatILearned:
      "The most useful models are those that can say what they don’t understand. Framing assumptions clearly added more value than adding another feature.",
    outcome:
      "The note became a reference for later product conversations, especially when designing index guardrails and validation criteria.",
    links: [{ label: "Read essay", href: "#" }],
  },
  {
    id: "learning-journey",
    title: "Learning Path",
    category: "Experiment",
    status: "Active",
    timeframe: "Ongoing",
    tags: ["habit", "skills", "design"],
    width: "96px",
    height: "210px",
    spineGradient: "linear-gradient(180deg, #6b5335, #321f0f)",
    summary: "A modular reading log for tracking themes, ideas, and action items across books and papers.",
    longDescription:
      "This was a usability experiment in turning passive reading into active practice. I wanted a format that kept research from staying stuck in notes.",
    whatIDid:
      "I sketched a card-based workflow, interviewed peers about learning habits, and built a simple web prototype to test daily capture.",
    whatILearned:
      "The best learning systems are small and forgiving. The value came from a regular habit, not a perfect interface.",
    outcome:
      "I still use the format personally, and it gave me a clearer way to own future research experiments.",
    links: [{ label: "Open model", href: "#" }],
  },
  {
    id: "neighbourhood",
    title: "Local Micro-Market",
    category: "Startup Idea",
    status: "Paused",
    timeframe: "Dec 2025",
    tags: ["local", "economy", "community"],
    width: "104px",
    height: "250px",
    spineGradient: "linear-gradient(180deg, #4a5c2a, #1d2711)",
    summary: "A quick market scan for a neighbourhood commerce app with a low-friction exchange model.",
    longDescription:
      "I tested whether a community-based offering could work for adjacent local services. The idea was meant to focus on immediacy and familiarity rather than broad scale.",
    whatIDid:
      "I mapped local supply, built a pricing hypothesis, and ran interviews with 20 micro-business owners and service providers.",
    whatILearned:
      "Local trust is fragile. A useful product needs a clear social contract — otherwise it is just another message board.",
    outcome:
      "I kept the concept as a reserve idea and moved focus toward contexts where trust and repeated use are already built in.",
    links: [{ label: "See brief", href: "#" }],
  },
  {
    id: "creative-ritual",
    title: "Studio Signals",
    category: "Practice",
    status: "Refined",
    timeframe: "Nov 2025",
    tags: ["art", "process", "software"],
    width: "110px",
    height: "240px",
    spineGradient: "linear-gradient(180deg, #3e2f44, #1b1323)",
    summary: "A concept for a tool that captures the small rituals around making work, not just the final piece.",
    longDescription:
      "I explored how creative habits could become their own product. The focus was on process scaffolding, not output validation.",
    whatIDid:
      "I assembled a set of creative prompts, built a visual moodboard, and tested a simple capture flow with a handful of classmates.",
    whatILearned:
      "Creative systems need low friction and room for mess. The signal of success is whether people return to the process.",
    outcome:
      "The prototype is still a sketch, but the ideas have influenced how I structure creative experiments elsewhere.",
    links: [{ label: "Explore prompt set", href: "#" }],
  },
  {
    id: "meaning-maps",
    title: "Meaning Map",
    category: "Research",
    status: "Published",
    timeframe: "Aug 2025",
    tags: ["cognition", "systems", "models"],
    width: "118px",
    height: "235px",
    spineGradient: "linear-gradient(180deg, #44566d, #17222b)",
    summary: "A short framework for how meaning shifts when data becomes a shared story.",
    longDescription:
      "This work came out of a curiosity about how the same fact can feel different in research, design, and business. I wanted a model that was both precise and poetic.",
    whatIDid:
      "I drew a mapping exercise, tested it with 10 collaborators, and wrote a concise note that linked mental models to product decisions.",
    whatILearned:
      "The best maps are not exhaustive; they are useful. The thing that made it valuable was a simple shared vocabulary.",
    outcome:
      "I shared the note with a small group and used it as a reference in later strategy conversations.",
    links: [{ label: "Read summary", href: "#" }],
  },
];
