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
