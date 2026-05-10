"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Page data ─────────────────────────────────────────────────────────────────

type PageData = {
  type: "section-title" | "poem" | "essay" | "fragment" | "list";
  heading?: string;
  subheading?: string;
  body: string;
  n: number;
  preview?: string;   // overrides body excerpt in margin panel
  fontSize?: number;  // overrides default poem font size (14)
  lineHeight?: number;
  stanzaGap?: number; // px between stanzas (compact poems)
};

// 34 pages = 17 spreads — one piece per spread, blank right pages where piece fits on one page
const PAGES: PageData[] = [

  // ── Spread 1: Javert and Valjean ──────────────────────────────────────────
  {
    n: 1, type: "poem", heading: "Javert and Valjean",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "Narrating Javert's side of Les Miserables - a moral reckoning told from the inside.",
    body: `He opened his eyes to misery,
running blood of an outcast,
inhaling the thrusted hatred,
growing into his future's past.

With age, with the inhumans walking over him,
la société had forged a fallen Moloch.
A child had died that day and,
reborn was a legalist with a guilty coloc.

Finally, he had a purpose,
to guard the tricolor's land.
Saw in black and white; a stoned conscience,
give or take a life, whatever was the demand.

What is freedom to him?
Will he ever yield peace?
Or are the sins of his ancestry over the brim?

And just before his epitome of satisfaction,
lord unleashed yet another mystery.
A prisoner had escaped,
so began the man hunt, a madness awaked.

For years, he ripped the meadow,
determined, marched every ghastly shadow.
Criminal had to be punished, evil foreclosed.
Mattered not his crime, even as petty as stealing a loaf.`,
  },
  {
    n: 2, type: "poem", heading: "",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    body: `Several encounters, several escapes.
Then came the judgement day,
his finger caught the needle in hay.

With chaos leaving no stone unburnt,
Hell had raised and Heaven descended.
"We, the people" eventually learnt.
Javert outnumbered, the prisoner ascended.

"Oh, Jesus forgive me
for I have failed you"
Fearless of death, was his soliloquy,
unknown of what was about to.

He stared into the eyes of his failure,
helpless yet proud
"Take your revenge, kill me aloud"
Knife slit but not his throat.

At Valjean's mercy, he was free to live.
Oh! but he had died, though he was alive.
His morale was crumbling, ethics questioning.
Now with no purpose, how could he thrive?

Damnation of his conscience pounded his head,
the path of his life seemed finally yielded.
Still guilty, there was only one way to tread.

One final testimony, to prove him clean;
It was either Valjean or Javert,
It was Valjean.

- Shreya Khubber`,
  },

  // ── Spread 2: Doctor Doctor ───────────────────────────────────────────────
  {
    n: 3, type: "poem", heading: "Doctor Doctor",
    fontSize: 13, lineHeight: 1.75,
    preview: "On the performance of productivity and the quiet cost of modern ambition.",
    body: `Blue light filled pockets of muse
Poppy-eyed capitalism's clever ruse
A dead man here, a beauty trick there
Hold your matcha, welcome to the crazy's fair
Every little laugh, every cautious slip,
Twirl to the bald man's fancy whip
And oh, you're here to change the world?
Break your body and ignore the signs?
Take off your worth and get in line.
Half a headache and BD back pains
Just a bit more, of course honey that sustains
Build a bridge, climb a ladder, get a life
Oh, but no, never compromise on that 925
Pick your brains, drink that wine, get a getaway
Do all you must to dance the lousy macabre
Mighty be the mortals that break free
& then hide away the lock and key
If you could eventually run away
Oh dear,
Who would run this rich man's Broadway?`,
  },
  { n: 4, type: "poem", heading: "", body: "" },

  // ── Spread 3: Mulled Twice ────────────────────────────────────────────────
  {
    n: 5, type: "poem", heading: "Mulled Twice",
    fontSize: 13, lineHeight: 1.75,
    preview: "On what the world keeps and what it discards.",
    body: `The noise of the world bothers the bleak
Bleaker lives have dug their graves
And the bleakest of them is what the world saves
Mind the minds it dearly enslaves
Ten tomorrow, eleven forever
Mires the golden fish - however
It will dance in the boiling ocean
Some saved, some set in motion
Blinks the orange silhouette when meeting a shadow
Let her touch the clueless foe
Follow you? What do you know?
Tiny tales of courage float the fingers
Mulled twice, thought that lingers
If the bleak could mine the gold
Would my hands still be so cold?`,
  },
  { n: 6, type: "poem", heading: "", body: "" },

  // ── Spread 4: Something's ─────────────────────────────────────────────────
  {
    n: 7, type: "poem", heading: "Something's",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "On the uneasy feeling of stillness - and whether peace and fear can coexist.",
    body: `Like a silted sheet browned by time
My mind lays bare some days
No longer do my shoulders clench
At the thought of the unknown
As my body floats on the painted bench
I read the filtered sunlight
With all ten fingers right by right

They don't count the drifted regrets
Of a twiddling head
I don't replay the things I said
Or a song I might write tomorrow
Is this peace of a borrowed ignorance?

Because while my inside feels still
I still wake up drenched in dreams
Of a woman I once knew
She drowned I think
In my cold hearted blood
And how can peace exist without fear?`,
  },
  {
    n: 8, type: "poem", heading: "",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    body: `Of a tragedy waiting to happen
As my grip on reality loosens
Will the river forgive me?
If my fears dry her loam
I'll let you know the answers
When the ink in my pen creates fire

And burns my insecurities
Till then
I'll swim my loony eccentricities
Let me be, let me be
My own hanging tree`,
  },

  // ── Spread 5: Thing ───────────────────────────────────────────────────────
  {
    n: 9, type: "poem", heading: "Thing",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "On the pressure of finding your 'thing' before you've had time to look.",
    body: `Places to be, things to do,
Tic-tac-toe, are they through?
Twenty thousand billboards screamed,
their achievements across time,
Tim-Tam-Tam, that's what it taught me,
LinkedIn posts drunk in jealousy.

Next month I'll be twenty four,
Been trying a hundred of everything
Boil myself down, just to make sure
I'm not left behind discovering my thing

If all my doubts could be bottled down,
and sold to men living off my confusion,
I could buy my own damn golden crown,
and visit all the places to be,
live through all the things to do,
Tic-tac-toe, are they real though?`,
  },
  { n: 10, type: "poem", heading: "", body: "" },

  // ── Spread 6: Whites ──────────────────────────────────────────────────────
  {
    n: 11, type: "poem", heading: "Whites",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "A library of grudges painted in four colours - and a ceiling left white, just in case.",
    body: `I owe no one nothing.
My time has been borrowed and wasted,
trying to fill foreign voids
with promises that sounded sacred.

Yesterday, coy.
Today, hesitant.
Forever reluctant.
Since when did comrades turn so distant?

In my heart,
I keep a library of grudges.
I paint one wall blue
for the ones who split my heart in two
I paint one wall red
adorned with tapestries of hatred
I paint one wall green
for every lie I never saw, yet felt unseen.
I paint one wall yellow
for bridges burned that once felt mellow.

But I leave the ceiling white
because if, someday, in the quiet of night,
I realise I belong to the list
for assuming every soul moved clockwise,
when life is nothing but a giant twist.`,
  },
  { n: 12, type: "poem", heading: "", body: "" },

  // ── Spread 7: Untitled ────────────────────────────────────────────────────
  {
    n: 13, type: "poem", heading: "Untitled",
    fontSize: 13, lineHeight: 1.75,
    preview: "On what it means to be lost in thought - and why sometimes, sitting with someone is enough.",
    body: `If you see me lost in my head
Don't tell me I'll be alright
I know I will
Don't offer me your shoulder
I'm not too naive
Don't try to cheer me on
I'm not sad
Don't try to snap me out of it
It's where I've built my home
I know my mind too well
And my friend,
If your urge to throw me rope is brimming bright
Sit with me in an awkward silence
I'm probably, not stuck
I've chosen this inward home
Presence is all that matters
Absence is all that's certain
If you see me lost inside my head
Just let me be`,
  },
  { n: 14, type: "poem", heading: "", body: "" },

  // ── Spread 8: Them ────────────────────────────────────────────────────────
  {
    n: 15, type: "poem", heading: "Them",
    fontSize: 13, lineHeight: 1.75,
    preview: "On the feeling of walking into a new year - and the particular brightness of becoming.",
    body: `It was sitting right beside me
in the form of four grounding stones,
the love of life that binds us all,
the only love eternal.
And when the carols started rustling
and the trees began to shimmer,
the walk across had never been more pristine.
The setts beneath me were alive
with promise of a better time.
A quiet sunshine of solace
glimmers on my white marble.
It brings more than warmth,
it carries the hush of horizons.
The music of a new year,
carried by the gentle breeze,
dwells inside me
like a new heart, lucid.
The renewed and clear blood,
now brimming with bright unease,
of what all I want to be,
of what all I can be,
what all I'll be.`,
  },
  { n: 16, type: "poem", heading: "", body: "" },

  // ── Spread 9: It Knows My Name ────────────────────────────────────────────
  {
    n: 17, type: "poem", heading: "It Knows My Name",
    fontSize: 13, lineHeight: 1.75,
    preview: "On the doubt that outlasts everything - the voice that knows exactly where you are.",
    body: `If the wind could be her god
You may think she might bend to its will
If phobos could ever make love to her
You may think she might marry her terror
If the radio could sing her silences
You may think she might drop the scuffle
Between the orange and blue chains
Between the 41 minutes of ember
followed by 41 eternities of mist
I find myself rioting through endless rumble
acting to betray my quiet rebellion
I weave the threads to life and grab them like sand
to please the king of a foreign land
from a kingdom far left behind
built from the reigns of my sweet past
An 'I' - I keep caged in a looking glass
And tell myself - 'I'm the ugliest of all'
Mirror mirror on the wall
Where could I take the grandest fall?
Let's kill the chance
Let's kill the time
Let the doubt survive -
It knows my name.`,
  },
  { n: 18, type: "poem", heading: "", body: "" },

  // ── Spread 10: Jittery Jam James ──────────────────────────────────────────
  {
    n: 19, type: "poem", heading: "Jittery Jam James",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "On the loop of wanting to leave, leaving, and returning - and what it means to finally be ok.",
    body: `Jittery Jam James lied
Jam James knows no jugglery
to justify the jumbled thoughts
about his not-so-jolly job
Jam James just wanted a job
to jump the jaded junction
and jockey a different jigsaw

In a jiffy, he jumped away
from his not-so-jolly job
Jittery Jam James lied
Jam James knew no jugglery,
But this time, he jitterbugged with joy
Jostled, journaled, and jotted
Jumping around his newfound Jubilee,
away from his not-so-jolly job

And yet again, Jittery Jam James lied
because he knew no jugglery
to josh around his juxtaposition
to juggle hope with reality
So back he jogged
to his not-so-jolly job
now his ok-so-jolly job`,
  },
  { n: 20, type: "poem", heading: "", body: "" },

  // ── Spread 11: Balance ────────────────────────────────────────────────────
  {
    n: 21, type: "poem", heading: "Balance",
    fontSize: 13, lineHeight: 1.75,
    preview: "On the tension between kindness given and kindness withheld - and having a conscience when others don't.",
    body: `I did it on my own, so can you
I won't throw you a rope
Because that would imply that
Someone could throw me one too
But I wont let you down
Because what kind of a person would do that?
And yet, many nearly did it to me
My mother taught me to be kind
And never discount the adversity of a troubled soul
So I try, I try to eliminate grace
And yet, I hold myself back
Because they didnt think I deserved any
I'm not too naive to look at life as a transaction
Because if it were, I think
I definitely deserved better
And yet, I find myself
Writing, time and again
About the agonies of having a conscience
Because I have one
I assume they do too
And yet, everytime I search for rationale
An abyss of nothingness is all I can find`,
  },
  { n: 22, type: "poem", heading: "", body: "" },

  // ── Spread 12: She, Her Voice and Meloncholy ──────────────────────────────
  {
    n: 23, type: "poem", heading: "She, Her Voice and Meloncholy",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    preview: "A conversation between a woman, her inner voice, and melancholy itself.",
    body: `She dreams of greatness and life.
Out of fantasy, her thoughts arise.
There's fire in her eyes and rage in her veins,
Doubts, "Will I make it till the sunrise?"
Nothing bounds her but she is chained.
Tries, fiddles, frustrated, says
"Melancholy, why do you find me so often?"

"You crave for racing but you don't want to run.
Step out, get set and go.
Be you, embrace your alter ego.
It's not until you see,
The fight for flesh and thirst for life,
That you will learn and find your breeze.
Not before your skin is pierced by fury,
Will you want to be at ease.
But don't let it settle,
Sands of time await your touch.
You aren't just another one.
Don't forget those restless nights,
When your eyes gleamed till Sun,
When your own wit devalued your worth.
But you bridled them, right?"

"She knows it all, adept at discerning,
Adroit sailor with an iffy vessel,
Acquainted with infirmity but often swithering.`,
  },
  {
    n: 24, type: "poem", heading: "",
    fontSize: 13, lineHeight: 1.75, stanzaGap: 8,
    body: `Tries not to be illicit, avoids hustle,
But such a pity! She forgets.
Oceans won't be called oceans,
If waves didn't vacillate."

"Even I, melancholy, find it woeful,
But my out-turn is never a subtle business,
I'm just another falsetto in her yodel,
And sooner or later my sister will find her.
She'd be the same.
The same sparkling brown eyes,
But now worn by a woman frame."

"Your views are true yet I'm concerned,
I'm just her inner voice who's caviled at,
Her brain is a Dino and I'm just a gnat.
But I'll demur, I always do.
It'll be better for you to leave,
Leave before her dreams un-weave,
A new journey, her dawn comes upon.
Although you'll return but I wish you don't."

"Come on sweet pea, it's morning now."
"Yes mother, I'm awake."
"So fresh you seem my dear, I avow."
"Looks like my sorrow's been erased,
Yes mother, I'm awake."`,
  },

  // ── Spread 13: I learnt ───────────────────────────────────────────────────
  {
    n: 25, type: "poem", heading: "I learnt",
    fontSize: 13, lineHeight: 1.75,
    preview: "Walking through war at nine - and what survival teaches you about morning.",
    body: `His soul was it being taken away,
Killing his world and his wit astray.
Cold he lay in a sleep so endless,
What dream are you in, ask if I may.
Away from his long dead frame was I told to stay.
Being so young, I rushed in.
Partly of curiosity,
Partly of imbecility.
Something strange scented spilt along,
That deadly silence, that dreaded white sheet,
My feet trembled, something was wrong.
I tried to call him, not a word he said.
Never had I seen, never had I felt,
For death was the coffin he slept.
I swallowed, fell aback, in a fright,
Hundreds of them, I had caught a sight.
I wept, what else could I do,
I was only seven more than two.
Scared, helpless, I panicked and ran.
I walked a mile in an open grave.
Was there no one in the war, God could save?`,
  },
  {
    n: 26, type: "poem", heading: "",
    fontSize: 13, lineHeight: 1.75,
    body: `For war it was that I talk of,
Sun was down and so was my heart.
Searched for Ma, but where to start?
The ground seemed like a wetland, grabbing me in,
That ghostly night, where was I to find a kith or kin?
With a heavy foot and racing mind,
I walked the shore.
It was cold and dark, I felt so sore.
"Why me?", I said to myself,
Was made to see such sea, when,
Instead of the moonlit shining sand,
Waves washed away the blood of dead men.
So many of them around me,
But I was to walk alone.
Walk alone,
Even if there were countless asleep to see.
Chased by death, guided by God,
I have learnt to survive every devilish prod.
Even if the night like war was long,
Peace came in,
With a bright morning and a chirpy song.
Dusk or dawn,
That is how life goes on.`,
  },

  // ── Spread 14: Mindless ───────────────────────────────────────────────────
  {
    n: 27, type: "poem", heading: "Mindless",
    fontSize: 13, lineHeight: 1.75,
    preview: "On the slow disappearance of noticing - and what it costs to stop looking up.",
    body: `I mindlessly mind my business
I didn't bother to look up
To notice the sky was still as blue
Clouds still floated in funny shapes
And sun was still as sharp
When I squinted my eyes just enough
11 AMs feel like in the in between
Of a morning routine and an indoorsy lunch
I didn't bother to check the in betweens anymore
I didn't stop a moment to enjoy 11 AMs
The time was still intact
The warmth still radiating hope
If only I stepped out the door
Instead of staring out of it
9 PMs are now a precursor to doomscrolling
Another mindless precursor of another mindless day
The orange streetlight around my porch
Is still as calming and re-assuring
I stopped sitting idle to enjoy it
My worth is my work
But I work towards reducing that worth
Into forgetting who I am beyond my work
May I mindlessly stop minding my business`,
  },
  { n: 28, type: "poem", heading: "", body: "" },

  // ── Spread 15: You tho(ugh)t ──────────────────────────────────────────────
  {
    n: 29, type: "essay", heading: "You tho(ugh)t",
    fontSize: 13, lineHeight: 1.9,
    preview: "On what it means to write someone back into the world.",
    body: `I lost my self in life I found myself in death. If a writer loves you, you'll never die. And because you're a dream, I sleep a lot!

12 February

They say if a writer loves you, you'll never die. Because every time a writer longs to write about you, she loses herself a little. To find you in death, she discovers her sweet escape in ink and words. All while longing to join you in your sleep.

People say she can't keep her head - a daydreaming dry leaf thinking of two days ahead. Five years ago, lying on her bed, looking out the window.

"Darling, why won't you wake up?"

"My thoughts don't go beyond you. I've not yearned for anything more. Just to see you with my eyes once again. But my sweetheart, you're a rare dream. And I sleep a lot to try to find you. But all I find is my pen and paper. And while I don't know what to write, not writing hurts more. So I do what I can best. I become a writer, to keep you alive."`,
  },
  { n: 30, type: "poem", heading: "", body: "" },

  // ── Spread 16: Perfection cloaks work ─────────────────────────────────────
  {
    n: 31, type: "essay", heading: "Perfection cloaks work",
    fontSize: 13, lineHeight: 1.9,
    preview: "On the injustice the English language does to the word 'work'.",
    body: `The older I grow, the more the definition of perfection eludes me. A state of flawlessness - a phrase that so arrogantly ignores the inherent history of achieving that state. Anything that exists in its present form is only a mere culmination of the effort that went into molding it that way.

Why call it a perfect piece of art rather than just a work of art? Why does the word 'work' make the object it describes look ordinary? Plain? Or simply not as beautiful as the word 'perfect'? Doesn't 'perfect' overshadow 'work', when all "perfect" truly reflects is the final aesthetic of countless messy hours of effort?

'Perfection' does such an excellent job at camouflaging with words like kindness, strength, hard work, and other myriads of words that stem from the inherent existing nature of a being.

I think it's infuriating to see the injustice that the English language does to the word 'work.'`,
  },
  { n: 32, type: "poem", heading: "", body: "" },

  // ── Spread 17: Yesterday ──────────────────────────────────────────────────
  {
    n: 33, type: "essay", heading: "Yesterday",
    fontSize: 13, lineHeight: 1.9,
    preview: "An answer given five years too late - and more honestly.",
    body: `She had once asked me "What do you think being loved by me feels like?". And before I could answer, she hesitantly took back the question - implying it was a silly thing to ask. I didn't know her that well back then to answer the question, so I blurted out "It would be passionate like fire."

For the reader's context, this is a woman who'd never back down from a challenge, intentionally puts herself in daunting situations, cares about the tiniest things you love, and would prefer a 100 km/hr on a bike rather than a car. These things I knew, all thanks to my okayish observant skills.

It's been a while since that conversation now. If I could go back, I'd like to answer the question differently: "It feels like a comforting hug, the first snuggle of a blanket on a chilly night, waking up to sunshine filtered through the trees, and a calm river shipping through the valley - greeting every stone, every fish, every swimmer, and every tree it passes by. I mistook your sky lighting warmth for fire. Forgive me I couldn't see you earlier."`,
  },
  { n: 34, type: "poem", heading: "", body: "" },
];

// Non-blank pages only — used for mobile single-page navigation
const MOBILE_PAGES = PAGES.filter(p => p.body !== "" || p.heading !== "");

// ── State helpers ─────────────────────────────────────────────────────────────

const MAX_STATE = 17; // states 1–17 (34 content pages)

function getLeftPage(state: number): PageData | null {
  if (state <= 0) return null;
  const idx = (state - 1) * 2;
  return idx < PAGES.length ? PAGES[idx] : null;
}

function getRightPage(state: number): PageData | null {
  if (state <= 0) return null;
  const idx = (state - 1) * 2 + 1;
  return idx < PAGES.length ? PAGES[idx] : null;
}

// ── Page renderer ─────────────────────────────────────────────────────────────

function PageContent({ page, side }: { page: PageData | null; side: "left" | "right" }) {
  if (!page) return null;

  const isLeft = side === "left";
  const paddingInner = 32; // near spine
  const paddingOuter = 36; // far edge
  const paddingTop = 36;
  const paddingBottom = 42;

  if (page.type === "section-title") {
    return (
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingLeft: isLeft ? paddingOuter : paddingInner,
        paddingRight: isLeft ? paddingInner : paddingOuter,
        textAlign: "center",
      }}>
        <div style={{ width: 40, height: 1, background: "#8a6a3a", margin: "0 auto 20px" }} />
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: "0.3em", color: "#8a6a3a", textTransform: "uppercase", marginBottom: 12 }}>
          Section
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, color: "#2a1606", fontWeight: 300, lineHeight: 1, marginBottom: 16 }}>
          {page.heading}
        </p>
        {page.subheading && (
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#6a4a1e", fontStyle: "italic", letterSpacing: "0.08em" }}>
            {page.subheading}
          </p>
        )}
        <div style={{ width: 40, height: 1, background: "#8a6a3a", margin: "20px auto 0" }} />
      </div>
    );
  }

  return (
    <div style={{
      height: "100%",
      display: "flex", flexDirection: "column",
      paddingLeft: isLeft ? paddingOuter : paddingInner,
      paddingRight: isLeft ? paddingInner : paddingOuter,
      paddingTop, paddingBottom,
      position: "relative",
    }}>
      {/* Heading */}
      {page.heading && (
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: page.type === "poem" ? 14 : 13,
          fontStyle: page.type === "poem" ? "italic" : "normal",
          letterSpacing: page.type !== "poem" ? "0.08em" : "0.02em",
          textTransform: page.type !== "poem" ? "uppercase" : undefined,
          color: "#5a3a1a",
          marginBottom: 18,
        }}>
          {page.heading}
        </p>
      )}
      {page.heading && (
        <div style={{ width: 32, height: 1, background: "rgba(90,58,26,0.35)", marginBottom: 20 }} />
      )}

      {/* Body */}
      <div className="book-body" style={{ flex: 1, overflow: "auto" }}>
        {page.type === "poem" || page.type === "fragment" ? (
          page.stanzaGap !== undefined ? (
            <div>
              {page.body.split("\n\n").map((stanza, i, arr) => (
                <p key={i} style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: page.fontSize ?? 14,
                  lineHeight: page.lineHeight ?? 1.95,
                  color: "#2a1606",
                  whiteSpace: "pre-line",
                  letterSpacing: "0.01em",
                  margin: 0,
                  marginBottom: i < arr.length - 1 ? page.stanzaGap : 0,
                }}>
                  {stanza}
                </p>
              ))}
            </div>
          ) : (
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: page.fontSize ?? 14,
            lineHeight: page.lineHeight ?? 1.95,
            color: "#2a1606",
            whiteSpace: "pre-line",
            letterSpacing: "0.01em",
          }}>
            {page.body}
          </p>
          )
        ) : page.type === "essay" ? (
          page.body.split("\n\n").map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: page.fontSize ?? 13.5,
              lineHeight: page.lineHeight ?? 2,
              color: "#2a1606",
              marginBottom: i < page.body.split("\n\n").length - 1 ? 16 : 0,
              letterSpacing: "0.01em",
            }}>
              {para}
            </p>
          ))
        ) : page.type === "list" ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {page.body.split("\n\n").map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "#8a6a3a", flexShrink: 0 }}>-</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13.5, lineHeight: 1.85, color: "#2a1606" }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Page number */}
      <p style={{
        position: "absolute",
        bottom: 18,
        [isLeft ? "left" : "right"]: paddingOuter,
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 11,
        color: "rgba(90,58,26,0.5)",
        letterSpacing: "0.12em",
      }}>
        {page.n}
      </p>
    </div>
  );
}


// ── Book cover ────────────────────────────────────────────────────────────────

function CoverFront({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px 40px 36px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, letterSpacing: "0.3em", color: "rgba(90,58,26,0.4)", textTransform: "uppercase", textAlign: "center" }}>
          This is the first edition<br />of a working notebook
        </p>
      </div>
    );
  }
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 36px 40px 32px",
      background: "linear-gradient(160deg, #f5e8c5 0%, #e8d5a0 100%)",
    }}>
      <div style={{ width: 60, height: 1, background: "#8a6a3a", marginBottom: 24 }} />
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, color: "#2a1606", fontWeight: 300, lineHeight: 1.1, textAlign: "center", letterSpacing: "0.05em", marginBottom: 10 }}>
        The Writer
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: "italic", color: "#6a4a1e", marginBottom: 28, textAlign: "center" }}>
        Articles &amp; Poems
      </p>
      <div style={{ width: 60, height: 1, background: "#8a6a3a", marginBottom: 28 }} />
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: "0.15em", color: "#5a3a1a" }}>
        Shreya Khubber
      </p>
    </div>
  );
}

// ── Single book half ──────────────────────────────────────────────────────────

function BookHalf({ side, state, isCover, pageOverride }: {
  side: "left" | "right";
  state: number;
  isCover: boolean;
  pageOverride?: PageData | null;
}) {
  const isLeft = side === "left";
  const page = pageOverride !== undefined ? pageOverride : (isLeft ? getLeftPage(state) : getRightPage(state));

  return (
    <div style={{
      position: "absolute",
      top: 0, bottom: 0,
      left: isLeft ? 0 : "50%",
      width: "50%",
      background: isLeft
        ? "linear-gradient(to right, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)"
        : "linear-gradient(to left, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)",
      boxShadow: isLeft
        ? "inset -6px 0 18px rgba(0,0,0,0.12)"
        : "inset 6px 0 18px rgba(0,0,0,0.12)",
    }}>
      {isCover ? (
        <CoverFront side={side} />
      ) : (
        <PageContent page={page} side={side} />
      )}
    </div>
  );
}

// ── Book index (left panel, always visible) ───────────────────────────────────

type TocEntry = { label: string; spread?: number; indent?: boolean; isHeader?: boolean };

const TOC: TocEntry[] = [
  { label: "Poems", isHeader: true },
  { label: "Javert and Valjean",            spread: 1,  indent: true },
  { label: "Doctor Doctor",                 spread: 2,  indent: true },
  { label: "Mulled Twice",                  spread: 3,  indent: true },
  { label: "Something's",                   spread: 4,  indent: true },
  { label: "Thing",                         spread: 5,  indent: true },
  { label: "Whites",                        spread: 6,  indent: true },
  { label: "Untitled",                      spread: 7,  indent: true },
  { label: "Them",                          spread: 8,  indent: true },
  { label: "It Knows My Name",              spread: 9,  indent: true },
  { label: "Jittery Jam James",             spread: 10, indent: true },
  { label: "Balance",                       spread: 11, indent: true },
  { label: "She, Her Voice and Meloncholy", spread: 12, indent: true },
  { label: "I learnt",                      spread: 13, indent: true },
  { label: "Mindless",                      spread: 14, indent: true },
  { label: "Essays", isHeader: true },
  { label: "You tho(ugh)t",                spread: 15, indent: true },
  { label: "Perfection cloaks work",        spread: 16, indent: true },
  { label: "Yesterday",                     spread: 17, indent: true },
];

function BookIndex({ state, onJump }: { state: number; onJump: (s: number) => void }) {
  const activeIdx = TOC.reduce((best, e, i) => {
    if (e.spread === undefined) return best;
    return e.spread <= state ? i : best;
  }, 1); // default to first clickable entry

  return (
    <div style={{
      flex: 1,
      alignSelf: "stretch",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 28px",
      background: "rgba(8, 5, 2, 0.48)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 260, width: "100%", overflowY: "auto", maxHeight: "calc(100vh - 100px)", scrollbarWidth: "none" }}>
        <p style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 9,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "rgba(201,160,60,0.55)",
          marginBottom: 18,
        }}>
          Contents
        </p>
        <div style={{ width: 28, height: 1, background: "rgba(201,140,40,0.3)", marginBottom: 20 }} />

        {TOC.map((entry, i) => {
          if (entry.isHeader) {
            return (
              <p key={`h-${i}`} style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(201,160,60,0.45)",
                marginBottom: 10,
                marginTop: i > 0 ? 14 : 0,
              }}>
                {entry.label}
              </p>
            );
          }
          const isActive = i === activeIdx;
          return (
            <button
              key={entry.spread}
              onClick={() => entry.spread !== undefined && onJump(entry.spread)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 15,
                paddingLeft: entry.indent ? 14 : 0,
                opacity: isActive ? 1 : 0.42,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.72"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.42"; }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isActive ? 18 : 15,
                fontStyle: "italic",
                color: isActive ? "rgba(245,232,195,0.95)" : "rgba(230,215,175,0.82)",
                lineHeight: 1.2,
                transition: "font-size 0.25s ease",
                flex: 1,
              }}>
                {entry.indent && <span style={{ color: "rgba(201,160,60,0.5)", marginRight: 6, fontStyle: "normal", fontSize: 11 }}>·</span>}
                {entry.label}
              </span>
              {entry.spread !== undefined && (
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: isActive ? "rgba(201,160,60,0.8)" : "rgba(201,160,60,0.38)",
                  letterSpacing: "0.1em",
                  flexShrink: 0,
                  transition: "color 0.25s ease",
                }}>
                  {entry.spread}
                </span>
              )}
            </button>
          );
        })}

        <div style={{ width: 28, height: 1, background: "rgba(201,140,40,0.18)", marginTop: 8 }} />
        <p style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 8.5,
          letterSpacing: "0.22em",
          color: "rgba(201,160,60,0.28)",
          marginTop: 14,
          textTransform: "uppercase",
        }}>
          {state === 0 ? "Cover" : `Spread ${state} of ${MAX_STATE}`}
        </p>
      </div>
    </div>
  );
}

// ── Margin abstract panel ─────────────────────────────────────────────────────

function MarginPanel({ page, visible }: { page: PageData | null; visible: boolean }) {
  const typeLabel: Record<string, string> = {
    poem: "Poem",
    essay: "Essay",
    fragment: "Fragment",
    list: "List",
    "section-title": "",
  };

  const hasContent = page && page.body && page.type !== "section-title";
  const excerpt = hasContent
    ? (page!.preview ?? (
        page!.body.replace(/\n\n+/g, " ").replace(/\n/g, " ").slice(0, 220).trim() +
        (page!.body.length > 220 ? "..." : "")
      ))
    : null;

  return (
    <div style={{
      flex: 1,
      alignSelf: "stretch",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
      opacity: visible && hasContent ? 1 : 0,
      pointerEvents: visible && hasContent ? "auto" : "none",
      transition: "opacity 0.35s ease",
      background: "rgba(8, 5, 2, 0.48)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      {hasContent && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 260,
          width: "100%",
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(201,160,60,0.7)",
          }}>
            {typeLabel[page!.type]}
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "rgba(245,232,195,0.95)",
            lineHeight: 1.15,
          }}>
            {page!.heading}
          </span>
          <div style={{ width: 36, height: 1, background: "rgba(201,140,40,0.4)" }} />
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 15,
            color: "rgba(230,215,175,0.75)",
            lineHeight: 1.8,
            margin: 0,
          }}>
            {excerpt}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Mobile single-page renderer ───────────────────────────────────────────────

function MobilePageContent({ page }: { page: PageData }) {
  return (
    <div>
      {page.heading && (
        <>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: page.type === "poem" ? 16 : 13, fontStyle: page.type === "poem" ? "italic" : "normal", letterSpacing: page.type !== "poem" ? "0.08em" : "0.02em", textTransform: page.type !== "poem" ? "uppercase" : undefined, color: "#5a3a1a", marginBottom: 16 }}>
            {page.heading}
          </p>
          <div style={{ width: 32, height: 1, background: "rgba(90,58,26,0.35)", marginBottom: 22 }} />
        </>
      )}
      {(page.type === "poem" || page.type === "fragment") ? (
        page.stanzaGap !== undefined ? (
          <div>
            {page.body.split("\n\n").map((stanza, i, arr) => (
              <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: (page.fontSize ?? 14) + 1, lineHeight: page.lineHeight ?? 1.95, color: "#2a1606", whiteSpace: "pre-line", letterSpacing: "0.01em", margin: 0, marginBottom: i < arr.length - 1 ? (page.stanzaGap ?? 0) : 0 }}>
                {stanza}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: (page.fontSize ?? 14) + 1, lineHeight: page.lineHeight ?? 1.95, color: "#2a1606", whiteSpace: "pre-line", letterSpacing: "0.01em" }}>
            {page.body}
          </p>
        )
      ) : page.type === "essay" ? (
        page.body.split("\n\n").map((para, i, arr) => (
          <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: (page.fontSize ?? 13.5) + 1, lineHeight: page.lineHeight ?? 2, color: "#2a1606", marginBottom: i < arr.length - 1 ? 18 : 0, letterSpacing: "0.01em" }}>
            {para}
          </p>
        ))
      ) : null}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function WriterPage() {
  const router = useRouter();

  const [state, setState] = useState(0);  // 0=cover, 1–MAX_STATE=spreads
  const [flipDir, setFlipDir] = useState<"forward" | "backward" | null>(null);
  const [flipKey, setFlipKey] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [flipHover, setFlipHover] = useState<"left" | "right" | null>(null);
  const [bookScale, setBookScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [mobilePage, setMobilePage] = useState(0); // 0=cover, 1..MOBILE_PAGES.length
  const touchStartX = useRef<number | null>(null);

  const isAnimating = flipDir !== null;
  const mobileSpread = mobilePage === 0 ? 0 : Math.ceil((MOBILE_PAGES[mobilePage - 1]?.n ?? 0) / 2);

  // Responsive scaling — isMobile uses width only so tall-but-narrow laptops don't trigger it
  useEffect(() => {
    const update = () => {
      const sw = (window.innerWidth - 20) / 800;
      const sh = (window.innerHeight - 80) / 700;
      setBookScale(Math.min(1, sw, sh));
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const jumpTo = useCallback((s: number) => {
    if (isAnimating) return;
    setState(s);
  }, [isAnimating]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === "ArrowRight") doFlip("forward");
      if (e.key === "ArrowLeft") doFlip("backward");
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isAnimating, state]);

  const doFlip = useCallback((dir: "forward" | "backward") => {
    if (isAnimating) return;
    if (dir === "forward" && state >= MAX_STATE) return;
    if (dir === "backward" && state <= 0) return;
    setFlipDir(dir);
    setFlipKey((k) => k + 1);
  }, [isAnimating, state]);

  const onFlipComplete = useCallback(() => {
    setState((s) => Math.max(0, Math.min(MAX_STATE, flipDir === "forward" ? s + 1 : s - 1)));
    setFlipDir(null);
  }, [flipDir]);

  // Mobile TOC jump — maps spread number to a mobile page index
  const mobileJumpToSpread = useCallback((spread: number) => {
    const targetN = (spread - 1) * 2 + 1;
    const idx = MOBILE_PAGES.findIndex(p => p.n === targetN);
    setMobilePage(idx >= 0 ? idx + 1 : 1);
    setShowMobileToc(false);
  }, []);

  // Touch swipe handlers (mobile: navigate pages; desktop: flip spreads)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) {
      if (isMobile) {
        if (dx < 0) setMobilePage(p => Math.min(MOBILE_PAGES.length, p + 1));
        else setMobilePage(p => Math.max(0, p - 1));
      } else {
        doFlip(dx < 0 ? "forward" : "backward");
      }
    }
  }, [doFlip, isMobile]);

  // During forward flip: right half pre-shows next state's right page
  // During backward flip: left half pre-shows prev state's left page
  const leftPageOverride = flipDir === "backward" ? getLeftPage(state - 1) : undefined;
  const rightPageOverride = flipDir === "forward" ? getRightPage(state + 1) : undefined;

  // Content on the flipping element
  const flipFrontPage = flipDir === "forward"
    ? (state === 0 ? null : getRightPage(state))
    : getLeftPage(state);

  const flipBackPage = flipDir === "forward"
    ? getLeftPage(state + 1)
    : (state === 1 ? null : getRightPage(state - 1));

  const flipIsCover = state === 0 && flipDir === "forward";
  const flipBackIsCover = flipDir === "backward" && state === 1;

  return (
    <main className="fixed inset-0 overflow-hidden" style={{
      backgroundImage: "url('/The%20writer%20elements/background.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      imageRendering: "auto",
    }}>

      {/* Nav */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between"
        style={{ height: 40, padding: "0 16px", paddingRight: 72, background: "rgba(4,8,5,0.97)", borderBottom: "1px solid rgba(201,140,40,0.14)", gap: 8 }}>
        <Link href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A030", textDecoration: "none", flexShrink: 0, fontWeight: 600 }}>
          &lt;- Icicle
        </Link>
        {isMobile && (
          <button
            onClick={() => setShowMobileToc(true)}
            style={{ all: "unset", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,160,60,0.75)", border: "1px solid rgba(201,140,40,0.3)", borderRadius: 3, padding: "3px 10px" }}
          >
            Contents
          </button>
        )}
        <div />
      </div>

      {/* ── Mobile: single-page view ── */}
      {isMobile && (
        <div style={{ position: "absolute", inset: 0, paddingTop: 40, display: "flex", flexDirection: "column" }}>

          {/* Mobile TOC overlay */}
          {showMobileToc && (
            <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(4,3,1,0.97)", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, overflow: "auto" }}>
                <BookIndex state={mobileSpread} onJump={mobileJumpToSpread} />
              </div>
              <button
                onClick={() => setShowMobileToc(false)}
                style={{ all: "unset", cursor: "pointer", textAlign: "center", padding: "16px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,160,60,0.6)", borderTop: "1px solid rgba(201,140,40,0.15)" }}
              >
                Close
              </button>
            </div>
          )}

          {/* Page */}
          <div
            className="book-body"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ flex: 1, overflow: "auto", background: "linear-gradient(160deg, #f5e8c5 0%, #f0e0ba 60%, #ead8a8 100%)", position: "relative" }}
          >
            {mobilePage === 0 ? (
              /* Cover */
              <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "48px 32px" }}>
                <div style={{ width: 40, height: 1, background: "#8a6a3a" }} />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, color: "#2a1606", fontWeight: 300, lineHeight: 1.1, textAlign: "center", letterSpacing: "0.04em" }}>The Writer</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: "italic", color: "#6a4a1e" }}>Articles &amp; Poems</p>
                <div style={{ width: 40, height: 1, background: "#8a6a3a" }} />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: "0.15em", color: "#5a3a1a" }}>Shreya Khubber</p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "rgba(90,58,26,0.4)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 24 }}>Tap › to open</p>
              </div>
            ) : (
              /* Content page */
              <div style={{ padding: "40px 28px 56px" }}>
                <MobilePageContent page={MOBILE_PAGES[mobilePage - 1]} />
              </div>
            )}
          </div>

          {/* Bottom navigation bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px", background: "rgba(4,3,1,0.97)", borderTop: "1px solid rgba(201,140,40,0.14)", flexShrink: 0 }}>
            <button
              onClick={() => setMobilePage(p => Math.max(0, p - 1))}
              style={{ all: "unset", cursor: mobilePage === 0 ? "default" : "pointer", opacity: mobilePage === 0 ? 0.2 : 0.85, fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "rgba(201,160,60,0.9)", lineHeight: 1, padding: "4px 10px" }}
            >‹</button>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "0.22em", color: "rgba(201,140,40,0.45)", textTransform: "uppercase" }}>
              {mobilePage === 0 ? "Cover" : `${mobilePage} of ${MOBILE_PAGES.length}`}
            </p>
            <button
              onClick={() => setMobilePage(p => Math.min(MOBILE_PAGES.length, p + 1))}
              style={{ all: "unset", cursor: mobilePage >= MOBILE_PAGES.length ? "default" : "pointer", opacity: mobilePage >= MOBILE_PAGES.length ? 0.2 : 0.85, fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "rgba(201,160,60,0.9)", lineHeight: 1, padding: "4px 10px" }}
            >›</button>
          </div>
        </div>
      )}

      {/* ── Desktop: two-page spread book ── */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 40, zIndex: 2 }}>

          {/* Left overlay — book index */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 280, zIndex: 5, display: "flex", flexDirection: "column" }}>
            <BookIndex state={state} onJump={jumpTo} />
          </div>

          {/* 3D book */}
          <div style={{ flexShrink: 0 }}>
          <div style={{ perspective: "1700px", perspectiveOrigin: "50% 50%" }}>
          <div style={{ transformStyle: "preserve-3d" }}>
            <div style={{
              position: "relative",
              width: 800, height: 700,
              boxShadow: "0 40px 90px rgba(0,0,0,0.75), 0 16px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(120,80,20,0.35)",
              flexShrink: 0,
            }}>
            <BookHalf side="left" state={state} isCover={false} pageOverride={state === 0 ? null : leftPageOverride} />
            <BookHalf side="right" state={state} isCover={state === 0} pageOverride={state === 0 ? undefined : rightPageOverride} />

            {/* Hover zones */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", zIndex: 3, cursor: "default" }} onMouseEnter={() => setHoveredSide("left")} onMouseLeave={() => setHoveredSide(null)} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%", zIndex: 3, cursor: "default" }} onMouseEnter={() => setHoveredSide("right")} onMouseLeave={() => setHoveredSide(null)} />

            {/* Spine */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "calc(50% - 4px)", width: 8, zIndex: 5, background: "linear-gradient(to right, #1a0a02, #3a2010 30%, #4a2c14 50%, #3a2010 70%, #1a0a02)", boxShadow: "0 0 12px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", top: 3, bottom: 3, left: 0, width: 4, background: "linear-gradient(to right, rgba(180,150,90,0.4), transparent)", zIndex: 4 }} />
            <div style={{ position: "absolute", top: 3, bottom: 3, right: 0, width: 4, background: "linear-gradient(to left, rgba(180,150,90,0.4), transparent)", zIndex: 4 }} />

            {/* Flipping page */}
            {isAnimating && flipDir && (
              <motion.div
                key={flipKey}
                style={{ position: "absolute", top: 0, bottom: 0, width: "50%", ...(flipDir === "forward" ? { left: "50%" } : { left: 0 }), transformOrigin: flipDir === "forward" ? "left center" : "right center", transformStyle: "preserve-3d", zIndex: 10 }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipDir === "forward" ? -180 : 180 }}
                transition={{ duration: 0.68, ease: [0.77, 0, 0.175, 1] }}
                onAnimationComplete={onFlipComplete}
              >
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: flipDir === "forward" ? "linear-gradient(to left, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)" : "linear-gradient(to right, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)", boxShadow: flipDir === "forward" ? "inset 6px 0 18px rgba(0,0,0,0.12)" : "inset -6px 0 18px rgba(0,0,0,0.12)" }}>
                  {flipIsCover ? <CoverFront side="right" /> : <PageContent page={flipFrontPage} side={flipDir === "forward" ? "right" : "left"} />}
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: flipDir === "forward" ? "linear-gradient(to right, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)" : "linear-gradient(to left, #e8d5a0 0%, #f0e0ba 85%, #f5e8c8 100%)", boxShadow: flipDir === "forward" ? "inset -6px 0 18px rgba(0,0,0,0.12)" : "inset 6px 0 18px rgba(0,0,0,0.12)" }}>
                  {flipBackIsCover ? <CoverFront side="right" /> : <PageContent page={flipBackPage} side={flipDir === "forward" ? "left" : "right"} />}
                </div>
              </motion.div>
            )}

            {/* Flip click zones */}
            {state > 0 && !isAnimating && (
              <div onClick={() => doFlip("backward")} onMouseEnter={() => setFlipHover("left")} onMouseLeave={() => setFlipHover(null)} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 52, zIndex: 20, cursor: "w-resize", display: "flex", alignItems: "center" }}>
                <div style={{ position: "absolute", top: "50%", left: 8, transform: flipHover === "left" ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-6px)", opacity: flipHover === "left" ? 1 : 0, transition: "opacity 0.18s ease, transform 0.18s ease", background: "rgba(245,230,185,0.90)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "7px 11px", display: "flex", alignItems: "center", gap: 5, boxShadow: "0 2px 12px rgba(0,0,0,0.3)", pointerEvents: "none" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "#5a3a1a", lineHeight: 1 }}>‹</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.15em", color: "#8a6a3a", textTransform: "uppercase" }}>flip</span>
                </div>
              </div>
            )}
            {state < MAX_STATE && !isAnimating && (
              <div onClick={() => doFlip("forward")} onMouseEnter={() => setFlipHover("right")} onMouseLeave={() => setFlipHover(null)} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 52, zIndex: 20, cursor: "e-resize", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ position: "absolute", top: "50%", right: 8, transform: flipHover === "right" ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(6px)", opacity: flipHover === "right" ? 1 : 0, transition: "opacity 0.18s ease, transform 0.18s ease", background: "rgba(245,230,185,0.90)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "7px 11px", display: "flex", alignItems: "center", gap: 5, boxShadow: "0 2px 12px rgba(0,0,0,0.3)", pointerEvents: "none" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.15em", color: "#8a6a3a", textTransform: "uppercase" }}>flip</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "#5a3a1a", lineHeight: 1 }}>›</span>
                </div>
              </div>
            )}
            </div>{/* /book */}
          </div>{/* /3d */}
          </div>{/* /perspective */}
          </div>{/* /book wrapper */}

          {/* Right overlay — margin panel */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 280, zIndex: 5, display: "flex", flexDirection: "column" }}>
            <MarginPanel
              page={state > 0 ? (hoveredSide === "left" ? getLeftPage(state) : hoveredSide === "right" ? getRightPage(state) : null) : null}
              visible={hoveredSide !== null && state > 0}
            />
          </div>

          {/* Cover hint */}
          {state === 0 && (
            <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.28em", color: "rgba(201,140,40,0.3)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Hover the right edge to open
            </div>
          )}
        </div>
      )}
    </main>
  );
}
