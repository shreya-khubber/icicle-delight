"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import { galleryPieces } from "@/data/galleryData";
import RomanBust from "@/components/corridor/RomanBust";
import MiniPainting from "@/components/corridor/MiniPainting";
import DustMotes from "@/components/corridor/DustMotes";

// â"€â"€ Data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const piece = galleryPieces.find((p) => p.id === "art")!;

const PANELS = [
  { label: "I",   heading: piece.panel.sections[0].heading, body: piece.panel.sections[0].body },
  { label: "II",  heading: piece.panel.sections[1].heading, body: piece.panel.sections[1].body },
  { label: "III", heading: piece.panel.sections[2].heading, body: piece.panel.sections[2].body },
  { label: "IV",  heading: "The Artist's Eye",              body: piece.panel.intro             },
];

// â"€â"€ 3-D world constants (CSS px) â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const CORRIDOR_LENGTH = 16200; // exact value from updated reference repo for 27 paintings
const CORRIDOR_WIDTH  = 1000; // matches reference ratio â€" background color fills margins
const WALL_HEIGHT     = 680;
const BACK_WALL_Z     = -CORRIDOR_LENGTH;
const FIRST_Z = -700;                       // match reference FIRST_PAINTING_Z
const LAST_Z  = -(CORRIDOR_LENGTH - 600);   // match reference LAST_PAINTING_Z

type PaintingDef = {
  id: number; side: "left" | "right"; panelIndex: number;
  src: string; width: number; height: number; canvas: string;
  name: string; origin: string; description: string;
};

const PAINTINGS: PaintingDef[] = [
  { id:1,  side:"left",  panelIndex:0, src:"/paintings/1.jpg",  width:1074, height:1342, canvas:"radial-gradient(ellipse at 40% 30%, #2a3848, #0e1820)",
    name:"Munroe", origin:"Inspiration from Pinterest",
    description:`The reference was Monroe. The result was something else: a face that holds together from a distance and fractures up close, slightly asymmetrical, more feeling than fact. The title is a misspelling. It stayed.` },
  { id:2,  side:"right", panelIndex:1, src:"/paintings/2.jpg",  width:2635, height:3027, canvas:"radial-gradient(ellipse at 60% 40%, #302418, #120c08)",
    name:"Lucid", origin:"The movie 'The Fountain'",
    description:`Lucid takes its soul from Darren Aronofsky's The Fountain - a film about a man who cannot accept that love and death are the same movement. Tom tries to outrun mortality across five hundred years and three lifetimes, and the film's answer is that the only way through grief is to stop fighting the boundary between self and everything else.\n\nThe title is the argument: to be lucid is not to have answers. It is to see clearly that you are finite, that the world inside you is not, and to remain seated at that threshold anyway.` },
  { id:3,  side:"left",  panelIndex:2, src:"/paintings/3.jpg",  width:3024, height:4032, canvas:"radial-gradient(ellipse at 35% 25%, #1e3028, #0a1410)",
    name:"Nightmare", origin:"Halsey's song - Nightmare",
    description:`This is Halsey's Nightmare made visible: the refusal to be defined by what the world projects onto you. The senses don't disappear here, they turn inward. The patterns on her face are not chaos - they are an interior life so dense and particular that nothing external can overwrite it.\n\nShe isn't blind. She is only looking somewhere you cannot follow. The purple line is where it begins. Everything else is what happens after you stop listening to them and start listening to yourself.` },
  { id:4,  side:"right", panelIndex:3, src:"/paintings/4.jpg",  width:1056, height:1200, canvas:"radial-gradient(ellipse at 50% 50%, #2e2418, #100e08)",
    name:"The Rose", origin:"Pinterest and Period Dramas",
    description:`Gothic architecture was the medieval world's attempt to make the infinite visible in stone - every pointed arch, every radiating petal of the rose window, designed to direct the eye upward and inward simultaneously.\n\nThis drawing doesn't try to capture the building. It tries to capture what it feels like to stand in front of something that was built to make you feel small in the best possible way. Drawn slowly, probably while a period drama played in the background. Some things are made in the company of other beautiful things.` },
  { id:5,  side:"left",  panelIndex:0, src:"/paintings/5.jpg",  width:2531, height:3628, canvas:"radial-gradient(ellipse at 45% 35%, #1c2838, #0c1018)",
    name:"Feed", origin:"My anger",
    description:`A pair of glasses - except the lenses are not glass. They are screens. And the screens are not windows. They are mouths. The imagery does not resolve. It was not meant to.\n\nThe glasses sit on no face. There is no one wearing them. That is either because it is everyone, or because by the time you are reading this, the face has already been replaced.` },
  { id:6,  side:"right", panelIndex:1, src:"/paintings/6.jpg",  width:1029, height:1308, canvas:"radial-gradient(ellipse at 55% 30%, #28201a, #0e0c08)",
    name:"Per Aspera", origin:"Nothing in particular, really",
    description:`This painting had no plan. No preliminary sketch, no arranged palette, no predetermined structure. The pen moved and the color followed and the Latin arrived the way remembered things arrive - not chosen so much as surfaced.\n\nSpontaneity is often misunderstood as carelessness. This piece is the argument against that. What came out without planning was not chaos. It was everything that had been accumulating quietly, waiting for a moment of permission.` },
  { id:7,  side:"left",  panelIndex:2, src:"/paintings/7.jpg",  width:1170, height:1506, canvas:"radial-gradient(ellipse at 40% 40%, #1e2c20, #0c1010)",
    name:"The Great Deviation", origin:"My distractions while studying maths",
    description:`Katsushika Hokusai painted The Great Wave in 1831 as a meditation on the smallness of human endeavor against natural force. This is that wave redrawn from memory during a mathematics lecture.\n\nThe question this piece asks and answers in the same breath is whether a mind that wanders toward pattern is wandering away from mathematics or deeper into it. Maths is not the equations on the page. It is the reason the wave has the shape it does, the reason the face appears in the foam, the reason the boat stays afloat at all. To look at the world and see structure everywhere is not distraction. It is the whole point. The wave was always made of numbers. It just needed someone to draw them in.` },
  { id:8,  side:"right", panelIndex:3, src:"/paintings/8.jpg",  width:1049, height:1062, canvas:"radial-gradient(ellipse at 50% 30%, #2c2018, #100a08)",
    name:"Un Shared.", origin:"A result of my teenage",
    description:`Look at what a leaf actually contains: a vascular network more intricate than any city's infrastructure, moving water upward against gravity through capillary action that science can describe but not quite explain away. Thermal signatures invisible to the naked eye. Photosynthesis - the quiet miracle of turning light into matter, performed billions of times daily in a space the size of your thumbnail.\n\nChemical conversations between trees, distress signals sent through root systems, the slow negotiation of sugar and carbon dioxide happening in every cell simultaneously. A leaf does not know it is small. It is operating at a scale of complexity that would crash any computer asked to model it fully.` },
  { id:9,  side:"left",  panelIndex:0, src:"/paintings/9.jpg",  width:1127, height:1603, canvas:"radial-gradient(ellipse at 38% 28%, #222838, #0e0e18)",
    name:"Where does it end", origin:"My confusion and conflicts",
    description:`The title has no question mark. That is the whole truth of it. "Where does it end" is not a question being asked of anyone. It is a thought that kept returning.\n\nIt is what confusion actually sounds like from the inside - not a sharp interrogation but a low continuous frequency, running underneath everything, outlasting the moment that made it. Some paintings are made. This one was survived.` },
  { id:10, side:"right", panelIndex:1, src:"/paintings/10.jpg", width:2359, height:3194, canvas:"radial-gradient(ellipse at 60% 35%, #2a2010, #100c04)",
    name:"High Ground", origin:"Struggle for clarity",
    description:`Every mind has a place it goes when the water gets too loud. This is that place. Not an escape. The sea is still there, dark at the bottom of the frame, present and unresolved.\n\nThe lighthouse does not eliminate the water. It simply stands above it, lit, oriented toward what lies ahead rather than what churns below. The light at the top is the smallest element in the painting and the only reason any of it matters.` },
  { id:11, side:"left",  panelIndex:2, src:"/paintings/11.jpg", width:1044, height:1312, canvas:"radial-gradient(ellipse at 42% 32%, #1c2c24, #0a1210)",
    name:"Xenomorph", origin:"Stubbornness to do something difficult",
    description:`Giger's Xenomorph, attempted from memory and stubbornness. The darkness came out right. The rest was a negotiation.\n\nSometimes you draw the thing because it frightens you a little, and finishing it is the whole point.` },
  { id:12, side:"right", panelIndex:3, src:"/paintings/12.JPG", width:2950, height:3933, canvas:"radial-gradient(ellipse at 52% 42%, #2a2214, #0e0a06)",
    name:"A blind woman on the train", origin:"",
    description:`The objects are from my room - a comb, a pendant lamp, a hairbrush, leaves, an hourglass, an eye drawn large and watching from the right side of the frame. They are rendered almost correctly. Almost recognizable. Close enough that you know what they are supposed to be, but tilted just slightly away from certainty, floating in a space with no floor and no horizon, connected by lines that suggest relationship without explaining it.\n\nFor five months during an internship, I shared the Mumbai local train with a blind woman during rush hour, one of the most physically chaotic human experiences a city produces, where survival is genuinely the operative word. She boarded regularly. She navigated it. And I found myself unable to stop wondering what the train sounded like to her, what it smelled like, what the press of bodies communicated that my eyes were too busy to notice. Whether the world she moved through was more or less overwhelming than the one I could see. Whether she knew things about that carriage that I, with all my vision, had completely missed.\n\nThis painting is an attempt to draw her world. Not blindness as absence, but perception as a different kind of fullness. The objects are familiar but unmoored.\n\nThere is a note inside the painting that reads: I was supposed to draw a scrunchie here but it's work in progress. It was left in. Because her world, and this painting's attempt to imagine it, and perhaps all genuine curiosity about another person's interior experience, are always work in progress.\n\nThe internship ended. The route changed. I never saw her again. That was two years ago. She still crosses my mind sometimes, not as a memory exactly, but as an open question that never found its answer and stopped needing one.\n\nSome people pass through your life briefly enough that they never become a story. They remain instead a kind of permanent wondering. She is that. This painting is the closest I could get to drawing what I imagine she heard, felt, knew, in a city that never slows down long enough to ask.` },
  { id:13, side:"left",  panelIndex:0, src:"/paintings/13.JPG", width:1527, height:1908, canvas:"radial-gradient(ellipse at 38% 28%, #20283a, #0c1018)",
    name:"A fish or a leaf", origin:"Pinterest",
    description:`There's nothing deep about this one. I liked it, I drew it. A koi fish moving through a leaf, or a leaf shaped like a koi moving through water, or neither, or both. The line work took patience. The result was satisfying. Sometimes that is the whole story and it is enough.` },
  { id:14, side:"right", panelIndex:1, src:"/paintings/14.jpg", width:2387, height:3181, canvas:"radial-gradient(ellipse at 58% 35%, #2c2218, #100c08)",
    name:"All eyes on tomorrow", origin:"Pinterest",
    description:`Drew this the night before something that felt important. The title came before the drawing was finished. Some nights have that quality where you cannot quite look directly at what is coming, so you draw four eyes instead and let them do it for you.` },
  { id:15, side:"left",  panelIndex:2, src:"/paintings/15.jpg", width:1049, height:750,  canvas:"radial-gradient(ellipse at 44% 38%, #1e2c22, #0a1210)",
    name:"The Second Drop", origin:"Pinterest, probably",
    description:`The goal was depth through color - blue into yellow into black into green, the concentric rings of a surface that has already been disturbed and is still deciding how far the disturbance will travel. The second drop hangs above, not yet arrived.` },
  { id:16, side:"right", panelIndex:3, src:"/paintings/16.jpg", width:1066, height:1039, canvas:"radial-gradient(ellipse at 55% 28%, #2e201a, #120a08)",
    name:"Make a Wish", origin:"Pinterest + JEE Dread",
    description:`Drew this during JEE preparation, at seventeen or eighteen, in the middle of the particular confusion of being asked to decide what you want from your entire life before you have lived enough of it to know.\n\nSeven years later the confusion has not fully resolved. It has just become more familiar, which is perhaps what growing up actually is - not arriving at certainty but getting comfortable enough with the open question that you can still make a wish inside it.` },
  { id:17, side:"left",  panelIndex:0, src:"/paintings/17.jpg", width:1029, height:1036, canvas:"radial-gradient(ellipse at 36% 32%, #242a3c, #0e1018)",
    name:"4 Years Later", origin:"Friend + Memory + Pinterest",
    description:`A friend drew something like this in a drawing competition in eighth grade. Not this exactly, but close enough that it lodged somewhere and stayed. Four years later the hand finally caught up to the memory and drew it, because some images are beautiful enough that your brain simply refuses to let them go until you do something about it.\n\nThat is its own kind of compliment to the original.` },
  { id:18, side:"right", panelIndex:1, src:"/paintings/18.jpg", width:1063, height:1071, canvas:"radial-gradient(ellipse at 62% 38%, #2c2410, #100c04)",
    name:"View From My Room", origin:"My eyes",
    description:`First year of college, online. Hometown. The campus somewhere else, closed, waiting to become real. This is what that year looked like from the inside - not chaos, not drama, just a door and what you could see through it from where you were sitting.\n\nThe view was always there. The ability to walk through it was the part that was on hold.` },
  { id:19, side:"left",  panelIndex:2, src:"/paintings/19.jpg", width:2584, height:3588, canvas:"radial-gradient(ellipse at 40% 26%, #1c2e24, #0a1210)",
    name:"Käse", origin:"My imagination",
    description:`A hand holds a pen. The doodles pose for it. Cheese, in German, because why not.` },
  { id:20, side:"right", panelIndex:3, src:"/paintings/20.JPG", width:1170, height:1462, canvas:"radial-gradient(ellipse at 50% 44%, #2e221c, #120e08)",
    name:"The Hitchhiker's Guide to the GenZ", origin:"Sunday Boredom",
    description:`Made with a flatmate, on a bored evening, in neon yellow and purple because those were apparently the colors available. A bear worried about financial markets. A panda called Barney of the group. A purple alien who just wants to know if anyone has seen their clothes. A ghost who is very demure, very mindful.\n\nDouglas Adams wrote that the universe is big, mostly empty, and fundamentally absurd, and that the correct response is to carry a towel and keep your sense of humor. This drawing reaches the same conclusion through a different route. Two people, one page, no plan. The vibes were great.` },
  { id:21, side:"left",  panelIndex:0, src:"/paintings/21.JPG", width:2857, height:3809, canvas:"radial-gradient(ellipse at 42% 30%, #1e2c3a, #0c1018)",
    name:"Almost", origin:"Chaos of my life",
    description:`Made on a day that needed somewhere to put itself. The writing is intentional nonsense - script that looks like meaning, pulls you in, then refuses to deliver. Frustration does not feel like chaos exactly. It feels like almost. Almost understanding what is wrong. Almost knowing what to do. Almost calm.\n\nThe purple cuts through and knows where it is going. Nothing else does. It worked. The nerves settled. Sometimes you have to move the confusion outside yourself before you can see it was never as infinite as it felt.` },
  { id:22, side:"right", panelIndex:1, src:"/paintings/22.jpg", width:1052, height:1318, canvas:"radial-gradient(ellipse at 56% 34%, #2a2216, #0e0c08)",
    name:"Lal Bahadur Shastri", origin:"My practice sketchbook",
    description:`And how can man die better than facing fearful odds, for the ashes of his fathers and the temples of his gods.` },
  { id:23, side:"left",  panelIndex:2, src:"/paintings/23.jpg", width:1043, height:1042, canvas:"radial-gradient(ellipse at 38% 36%, #1c2c20, #0a1010)",
    name:"Ink on Wood", origin:"A motto",
    description:`Four things decided upon at some point young enough that they still hold, still sit on whatever surface is currently home, still mean what they meant when the hands that made them were figuring out what kind of person they wanted to become.\n\nMost objects travel with us out of habit or sentimentality. This one travels with purpose. It is not decoration. It is a reminder of a promise made to nobody but myself, renewed every time I unpack it in a new place and set it back down on the mantle. Ten years. Still standing.` },
  { id:24, side:"right", panelIndex:3, src:"/paintings/24.jpg", width:972,  height:1324, canvas:"radial-gradient(ellipse at 54% 30%, #2c1e18, #100808)",
    name:"Titled Nose", origin:"Some photograph of a dog or wolf",
    description:`Two hours. No pencil, no underdrawing, no safety net - straight to ink on the first mark. The nose tilts slightly. It stays. Named honestly - I think that matters.` },
  { id:25, side:"left",  panelIndex:0, src:"/paintings/25.jpg", width:1062, height:1306, canvas:"radial-gradient(ellipse at 40% 28%, #20283a, #0c0e18)",
    name:"Velociraptor", origin:"My practice sketchbook",
    description:`8th grade. Drew a dinosaur to impress the art teacher. It didn't work. The velociraptor survives regardless, creased and unbothered, which is arguably more dignified than the situation deserved.` },
  { id:26, side:"right", panelIndex:1, src:"/paintings/26.jpg", width:1047, height:710,  canvas:"radial-gradient(ellipse at 60% 38%, #2e2412, #120c06)",
    name:"The Meaning Has Left the Building", origin:"My head",
    description:`Every section has a pattern, a number, a symbol that meant something specific on the day this was made. The numbers aren't random. The fish, the question marks, the waves, the flowers - none of it was arbitrary.\n\nWhat they meant is gone now.` },
  { id:27, side:"left",  panelIndex:2, src:"/paintings/27.jpg", width:988,  height:1293, canvas:"radial-gradient(ellipse at 36% 30%, #1e2e22, #0a1210)",
    name:"Work in Progress", origin:"Troubled teen years",
    description:`A phoenix mid-rise, surrounded by the fire it came from, which is also the fire it is made of. The chaos around it is not the obstacle. It was always the source.\n\nStarted during a difficult stretch. Still technically unfinished. Getting close. Some things take exactly as long as they need to.` },
];

// â"€â"€ Generic 3-D plane â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Plane({
  w, h, transform, style, children, className = "",
}: {
  w: number; h: number; transform: string; className?: string;
  style?: React.CSSProperties; children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 ${className}`}
      style={{
        width: w, height: h,
        marginLeft: -w / 2, marginTop: -h / 2,
        transformStyle: "preserve-3d",
        transform,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// â"€â"€ Single painting on a side wall â€" pure CSS hover, zero React state â"€â"€â"€â"€â"€â"€â"€â"€

function CorridorPainting({
  painting, z, onOpen,
}: {
  painting: PaintingDef; z: number; onOpen: () => void;
}) {
  const maxFrameWidth = 280;
  const maxFrameHeight = 250;
  const imageScale = Math.min(maxFrameWidth / painting.width, maxFrameHeight / painting.height);
  const imageW = Math.round(painting.width * imageScale);
  const imageH = Math.round(painting.height * imageScale);
  const dims = { w: imageW + 20, h: imageH + 20 };

  const isLeft = painting.side === "left";
  // x derived from corridor geometry â€" identical to reference formula
  const ANGLE = 35;
  const edgeClearance = Math.cos((ANGLE * Math.PI) / 180) * (dims.w / 2) + 36;
  const x       = isLeft ? -CORRIDOR_WIDTH / 2 + edgeClearance : CORRIDOR_WIDTH / 2 - edgeClearance;
  const rotateY = isLeft ? 90 - ANGLE : -90 + ANGLE;

  return (
    <Plane w={dims.w} h={dims.h} transform={`translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative h-full w-full cursor-pointer rounded-[2px] corridor-gold-frame focus:outline-none"
        aria-label={`Open ${PANELS[painting.panelIndex].heading}`}
        style={{ padding: 10 }}
      >
        {/* Canvas */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            background: painting.canvas,
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.4)",
          }}
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,228,148,0.12) 0%, transparent 65%)" }}
          />
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: imageW,
              height: imageH,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
            }}
          >
            <Image
              src={painting.src}
              alt={`Painting ${painting.id}`}
              width={painting.width}
              height={painting.height}
              draggable={false}
              sizes="320px"
              quality={70}
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", display: "block", filter: "drop-shadow(0 28px 42px rgba(0,0,0,0.45))" }}
            />
          </div>
          {/* Hover overlay â€" pure CSS, no JS */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>
              Click to explore
            </p>
            <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
          </div>
        </div>
      </button>
    </Plane>
  );
}

// â"€â"€ Back wall + statue â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function BackWall({ showCTA, onContact }: { showCTA: boolean; onContact: () => void }) {
  return (
    <>
      {/* Wall surface */}
      <Plane
        w={CORRIDOR_WIDTH} h={WALL_HEIGHT}
        transform={`translate3d(0, 0, ${BACK_WALL_Z}px)`}
        style={{
          background: "linear-gradient(180deg, #162820 0%, #1e3428 50%, #162820 100%)",
        }}
      >
        {/* Halo behind statue */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0.12) 40%, transparent 68%)",
            filter: "blur(14px)",
          }}
        />
        {/* Gold accent lines */}
        <div className="absolute inset-x-0" style={{ top: "8%", height: 1, background: "rgba(201,168,76,0.25)" }} />
        <div className="absolute inset-x-0" style={{ bottom: "8%", height: 1, background: "rgba(201,168,76,0.25)" }} />
      </Plane>

      {/* Plinth shadow on floor */}
      <Plane
        w={280} h={140}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 1}px, ${BACK_WALL_Z + 500}px) rotateX(90deg)`}
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* Statue â€" bottom of plane = floor level (WALL_HEIGHT/2 - h/2 + h/2 = WALL_HEIGHT/2) */}
      <Plane
        w={330} h={580}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 290}px, ${BACK_WALL_Z + 500}px)`}
      >
        <img
          src="/statue.webp"
          alt="Marble statue"
          style={{
            width: "100%", height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.95))",
          }}
        />
      </Plane>

      {/* Latin quote â€" engraved on the back wall above the statue */}
      <Plane
        w={700} h={100}
        transform={`translate3d(0, ${-WALL_HEIGHT / 2 + 200}px, ${BACK_WALL_Z + 80}px)`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="font-serif italic" style={{
            fontSize: 38,
            color: "#c9a84c",
            letterSpacing: "0.08em",
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 0 30px rgba(201,168,76,0.25)",
            fontWeight: 300,
          }}>
            Audentes Fortuna Iuvat
          </p>
          <div style={{ height: 1, width: 200, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)", marginTop: 12 }} />
        </div>
      </Plane>

      {/* Contact card â€" only text-free CTA, appears at corridor end */}
      <Plane
        w={520} h={110}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 50}px, ${BACK_WALL_Z + 760}px)`}
      >
        <div
          className="flex h-full w-full items-center justify-center transition-all duration-700"
          style={{ opacity: showCTA ? 1 : 0, transform: showCTA ? "translateY(0)" : "translateY(10px)" }}
        >
          <button
            onClick={onContact}
            className="flex items-center gap-4 transition-all"
            style={{
              border: "1px solid rgba(201,168,76,0.65)",
              background: "rgba(8,18,10,0.88)",
              padding: "18px 52px",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(201,168,76,0.18), inset 0 0 0 1px rgba(201,168,76,0.12)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.35), inset 0 0 0 1px rgba(201,168,76,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.18), inset 0 0 0 1px rgba(201,168,76,0.12)")}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: "0.35em", color: "#d4b878", textTransform: "uppercase" }}>
              Contact
            </span>
            <span style={{ fontSize: 14, color: "rgba(201,168,76,0.8)" }}>-&gt;</span>
          </button>
        </div>
      </Plane>
    </>
  );
}

// â"€â"€ Reduced-motion fallback â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function ReducedLayout() {
  return (
    <div className="min-h-screen" style={{ background: "#111a14" }}>
      <HamburgerMenu />
      <div className="max-w-2xl mx-auto px-10 pb-20" style={{ paddingTop: 80 }}>
        <h1 className="font-serif text-4xl font-light mb-2" style={{ color: "#e8dcc8" }}>{piece.title}</h1>
        <p className="font-serif italic mb-10" style={{ color: "#7aadad" }}>{piece.subtitle}</p>
        {piece.panel.sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h3 className="font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: "#7aadad" }}>{s.heading}</h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "#b8c8a8" }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// â"€â"€ Main page â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

export default function CorridorPage() {
  const router = useRouter();
  const currentIndex = galleryPieces.findIndex((p) => p.id === "art");
  const nextPiece = galleryPieces[(currentIndex + 1) % galleryPieces.length];
  const prevPiece = galleryPieces[(currentIndex - 1 + galleryPieces.length) % galleryPieces.length];

  const [active, setActive]     = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const lastActiveId = useRef(PAINTINGS[0].id);
  const worldRef     = useRef<HTMLDivElement>(null);
  const lastProgress = useRef(0);
  if (active !== null) lastActiveId.current = active;

  // Scroll â†’ camera Z via direct DOM mutation â€" bypasses React reconciliation
  // so the 3-D world updates at native frame rate without re-rendering 27 paintings.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p   = max > 0 ? window.scrollY / max : 0;
      const z   = p * (CORRIDOR_LENGTH - 1200);

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(-50%, -50%, ${z}px)`;
      }
      // Only trigger React re-render when progress changes enough to matter for HUD/CTA
      if (Math.abs(p - lastProgress.current) > 0.004) {
        lastProgress.current = p;
        setProgress(p);
      }
    };

    // Start pre-scrolled so the first painting is close and visible
    window.scrollTo(0, 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active !== null) { setActive(null); return; }
      if (e.key === "ArrowDown") window.scrollBy({ top: window.innerHeight * 0.28, behavior: "smooth" });
      if (e.key === "ArrowUp")   window.scrollBy({ top: -window.innerHeight * 0.28, behavior: "smooth" });
      if (e.key === "Escape")    router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, active]);

  // Evenly space paintings along the corridor
  const positioned = PAINTINGS.map((p, i) => {
    const t = i / (PAINTINGS.length - 1);
    return { ...p, z: FIRST_Z + t * (LAST_Z - FIRST_Z) };
  });

  return (
    <main style={{ background: "#111a14" }}>
      {/* Tall scroll container gives the scroll range */}
      <div style={{ height: `${CORRIDOR_LENGTH * 0.9}px` }}>

        {/* â"€â"€ FIXED 3-D VIEWPORT â"€â"€ */}
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ background: "#1a2e22", perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        >
          <HamburgerMenu />

          {/* Nav bar */}
          <div
            className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between"
            style={{ height: 40, padding: "0 40px", paddingRight: 72, background: "rgba(9,15,12,0.97)", borderBottom: "1px solid rgba(201,168,76,0.18)" }}
          >
            <Link href="/" className="font-mono text-[11px] tracking-[0.25em] uppercase transition-opacity" style={{ color: "#7aadad", fontWeight: 600 }}>
              &lt;- Icicle
            </Link>
            <div />
          </div>

          {/* â"€â"€ 3-D WORLD â€" transform updated directly via ref, no React re-render â"€â"€ */}
          <div
            ref={worldRef}
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate3d(-50%, -50%, 0px)",
              willChange: "transform",
            }}
          >
            {/* FLOOR */}
            <Plane w={CORRIDOR_WIDTH} h={CORRIDOR_LENGTH} className="corridor-floor"
              transform={`translate3d(0, ${WALL_HEIGHT / 2}px, ${-CORRIDOR_LENGTH / 2}px) rotateX(90deg)`}
            />
            {/* CEILING */}
            <Plane w={CORRIDOR_WIDTH} h={CORRIDOR_LENGTH} className="corridor-ceiling"
              transform={`translate3d(0, ${-WALL_HEIGHT / 2}px, ${-CORRIDOR_LENGTH / 2}px) rotateX(-90deg)`}
            />
            {/* LEFT WALL */}
            <Plane w={CORRIDOR_LENGTH} h={WALL_HEIGHT} className="corridor-wall"
              transform={`translate3d(${-CORRIDOR_WIDTH / 2}px, 0, ${-CORRIDOR_LENGTH / 2}px) rotateY(90deg)`}
            />
            {/* RIGHT WALL */}
            <Plane w={CORRIDOR_LENGTH} h={WALL_HEIGHT} className="corridor-wall"
              transform={`translate3d(${CORRIDOR_WIDTH / 2}px, 0, ${-CORRIDOR_LENGTH / 2}px) rotateY(-90deg)`}
            />

            {/* BACK WALL + STATUE */}
            <BackWall showCTA={progress > 0.85} onContact={() => router.push("/contact")} />

            {/* PAINTINGS â€" all rendered, CSS 3D perspective + overflow:hidden handles clipping */}
            {positioned.map((p) => (
              <CorridorPainting
                key={p.id}
                painting={p}
                z={p.z}
                onOpen={() => setActive(p.id)}
              />
            ))}

            {/* Ceiling spotlight cones â€" 26 lights at 600px spacing, exact reference spec */}
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: "260px", height: "340px",
                  transform: `translate(-50%, -50%) translate3d(0, ${-WALL_HEIGHT / 2 + 10}px, ${-400 - i * 600}px)`,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255,228,148,0.55) 0%, transparent 70%)",
                  filter: "blur(10px)",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* Vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 32%, rgba(0,0,0,0.6) 100%)" }}
          />

          {/* Title â€" fades as you walk */}
          <div
            className="pointer-events-none absolute inset-x-0 z-10 text-center transition-opacity duration-700"
            style={{ top: 58, opacity: Math.max(0, 1 - progress * 4.5) }}
          >
            <h1 className="font-serif text-4xl font-light italic md:text-6xl" style={{ color: "#e8dcc8", textShadow: "0 2px 24px rgba(0,0,0,0.75)" }}>
              {piece.title}
            </h1>
            <p className="mt-3 font-serif italic text-sm" style={{ color: "rgba(232,220,200,0.55)" }}>
              Scroll to walk | {PAINTINGS.length} works
            </p>
          </div>

          {/* Scroll cue */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 transition-opacity duration-700"
            style={{ opacity: Math.max(0, 1 - progress * 7) }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase animate-pulse" style={{ color: "#e8dcc8", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>Walk forward</span>
            <div className="h-10 w-px" style={{ background: "linear-gradient(to bottom, rgba(232,220,200,0.8), transparent)" }} />
          </div>

          {/* Progress bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px" style={{ background: "rgba(201,168,76,0.08)" }}>
            <div style={{ height: "100%", width: `${progress * 100}%`, background: "linear-gradient(to right, rgba(201,168,76,0.5), #c9a84c, rgba(201,168,76,0.5))", transition: "width 0.1s linear" }} />
          </div>

          {/* Keyboard hint */}
          <p className="font-mono text-[7px] tracking-widest pointer-events-none hidden md:block"
            style={{ position: "absolute", bottom: 10, right: 16, color: "#2a4a38", opacity: 0.8, whiteSpace: "nowrap", zIndex: 10 }}>
            Up Down walk | Esc exit
          </p>
        </div>
      </div>

      {/* â"€â"€ MODAL â"€â"€ */}
      <AnimatePresence>
        {active !== null && (() => {
          // Derive panel from painting id â€" each painting has its own image file
          const activePainting = PAINTINGS.find((painting) => painting.id === lastActiveId.current) ?? PAINTINGS[0];
          const panelIdx = activePainting.panelIndex;
          const panel    = PANELS[panelIdx];
          return (
            <>
              <motion.div
                key="modal-bg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActive(null)}
                style={{ position: "fixed", inset: 0, zIndex: 58, background: "rgba(6,14,10,0.92)", backdropFilter: "blur(8px)", cursor: "pointer" }}
              />
              <motion.div
                key="modal"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: "fixed", inset: "3.5%", zIndex: 59, background: "linear-gradient(135deg, #07120d 0%, #0a1711 55%, #08110d 100%)", border: "1px solid rgba(92,138,116,0.2)", boxShadow: "0 28px 90px rgba(0,0,0,0.78)", display: "flex", overflow: "hidden" }}
                className="flex-col md:flex-row"
              >
                <button
                  onClick={() => setActive(null)}
                  style={{ position: "absolute", top: 20, right: 24, zIndex: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#7aadad", textTransform: "uppercase" }}
                >
                  X Close
                </button>

                {/* Left - painting */}
                <div style={{ flex: "0 0 65%",
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #0d1812 0%, #09120e 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "36px 30px 30px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0, background: "transparent",
                    }}
                  >
                    <Image
                      src={activePainting.src}
                      alt={`${panel.heading} - Painting ${activePainting.id}`}
                      width={activePainting.width}
                      height={activePainting.height}
                      draggable={false}
                      sizes="(max-width: 768px) 92vw, 65vw"
                      quality={85}
                      priority
                      style={{ width: "100%", height: "100%", maxWidth: "min(68vw, 1100px)", maxHeight: "calc(100vh - 120px)", objectFit: "contain", objectPosition: "center center", display: "block", filter: "drop-shadow(0 30px 48px rgba(0,0,0,0.48))" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                    />
                  </div>
                  {/* Subtle vignette over image */}
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(255,244,220,0.05) 0%, rgba(9,19,15,0) 55%)", pointerEvents: "none" }} />
                </div>

                {/* Right - details */}
                <div style={{ flex: "0 0 35%", padding: "48px 42px 44px", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-start", minWidth: 0, background: "linear-gradient(180deg, rgba(6,20,14,0.98) 0%, rgba(7,25,17,0.96) 100%)", borderLeft: "1px solid rgba(58,158,100,0.12)" }}>
                  <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.4)", marginBottom: 28 }} />
                  <h2 className="font-serif font-light" style={{ fontSize: "clamp(24px, 3.5vw, 48px)", color: "#e3d7c2", lineHeight: 1.08, marginBottom: 10 }}>
                    {activePainting.name}
                  </h2>
                  {activePainting.origin && (
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.22em", color: "rgba(122,173,173,0.6)", textTransform: "uppercase", marginBottom: 28 }}>
                      Origins - {activePainting.origin}
                    </p>
                  )}
                  <div style={{ height: 1, background: "rgba(58,158,100,0.22)", marginBottom: 24 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {activePainting.description.split("\n\n").map((para, i) => (
                      <p key={i} className="font-sans" style={{ color: "#bdc7b6", fontSize: "0.88rem", lineHeight: 1.9, maxWidth: 420, margin: 0 }}>
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                  <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {piece.panel.links?.slice(0, 1).map((l, i) => (
                      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid rgba(201,168,76,0.42)", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.24em", color: "#c9a84c", textTransform: "uppercase", textDecoration: "none", background: "rgba(201,168,76,0.06)" }}>
                        {l.label} <span style={{ fontSize: 7 }}>-&gt;</span>
                      </a>
                    ))}
                    <Link href="/contact" onClick={() => setActive(null)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid rgba(58,158,100,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.24em", color: "#8ebea0", textTransform: "uppercase", textDecoration: "none", background: "rgba(58,158,100,0.06)" }}>
                      Contact <span style={{ fontSize: 7 }}>-&gt;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </main>
  );
}




