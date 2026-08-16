import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { BlossomBackground } from "@/components/experience/BlossomBackground";
import { Particles, Reveal } from "@/components/experience/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You — A Letter I Never Knew How to Say" },
      {
        name: "description",
        content:
          "A quiet, cinematic letter about love, gratitude, and how impossibly special you are to me.",
      },
      { property: "og:title", content: "For You — A Letter I Never Knew How to Say" },
      {
        property: "og:description",
        content:
          "A quiet, cinematic letter about love, gratitude, and how impossibly special you are to me.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

const section = "relative mx-auto w-full max-w-3xl px-6 py-28 sm:px-8 sm:py-36";

function Experience() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback((v: boolean) => setReady(v), []);

  return (
    <main className="relative min-h-screen text-foreground">
      <BlossomBackground onReady={onReady} />
      {ready && (
        <div className="relative z-10">
          <Opening />
          <Gratitude />
          <OnlyYou />
          <LoveMoment />
          <ThankYouTimeline />
          <Finale />
          <SongSurprise />
        </div>
      )}
    </main>
  );
}

/* ── 1. Opening ─────────────────────────────────────────────── */
function Opening() {
  return (
    <section className="relative flex min-h-[100svh] items-center">
      <div className={section}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.9em", filter: "blur(14px)" }}
          animate={{ opacity: 0.7, letterSpacing: "0.42em", filter: "blur(0px)" }}
          transition={{ duration: 2.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-[0.65rem] tracking-[0.42em] text-muted-foreground uppercase"
        >
          for Gala, quietly
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-8 text-4xl leading-[1.15] sm:text-6xl"
        >
          You probably don't even realize
          <br />
          <span className="italic text-blush">how special you are to me</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 1.8 }}
          className="mt-10 h-px w-40 origin-left bg-[var(--gradient-glow)] opacity-70"
        />

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 3.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          But somehow you became one of the most important people in my life, Gala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1.5 }}
          className="mt-20 flex items-center gap-3 text-xs tracking-[0.3em] text-muted-foreground uppercase"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          keep going
        </motion.div>
      </div>
    </section>
  );
}

/* ── 2. Gratitude ───────────────────────────────────────────── */
const gratitudeLines = [
  "Thank you for your presence — for the way a whole day changes shape just because you were in it.",
  "Thank you for your time. I know it's the one thing nobody can ever get back, and you keep giving me yours.",
  "Thank you for your patience with me, especially on the days I didn't deserve it.",
  "Thank you for the way you care. Softly, without announcing it, in a hundred small things you think I don't notice.",
  "Thank you for every memory we've made — the loud ones, and the quiet ordinary ones I keep replaying.",
];

function Gratitude() {
  return (
    <section className={section}>
      <Reveal>
        <p className="text-[0.65rem] tracking-[0.42em] text-muted-foreground uppercase">
          gratitude
        </p>
        <h2 className="mt-5 text-3xl leading-tight sm:text-5xl">
          There's so much I've never said out loud
        </h2>
      </Reveal>

      <div className="mt-14 space-y-10">
        {gratitudeLines.map((line, i) => (
          <Reveal key={line} delay={i * 0.08}>
            <p className="border-l border-border pl-5 text-lg leading-relaxed text-foreground/85 sm:pl-7 sm:text-xl">
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="font-script mt-16 text-3xl text-blush sm:text-4xl">
          and all the little things you do that make me happy
        </p>
      </Reveal>
    </section>
  );
}

/* ── 3. Only you ────────────────────────────────────────────── */
function OnlyYou() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width - 0.5) * 8,
    });
  };

  return (
    <section className={section}>
      <Reveal>
        <div
          ref={ref}
          onPointerMove={handleMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          className="relative"
          style={{ perspective: 1200 }}
        >
          <motion.div
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="glass sheen animate-drift relative overflow-hidden p-8 sm:p-14"
            style={{ transformStyle: "preserve-3d", boxShadow: "var(--shadow-dream)" }}
          >
            <Particles count={16} />
            <p className="relative text-[0.65rem] tracking-[0.42em] text-muted-foreground uppercase">
              only you
            </p>
            <h2 className="relative mt-6 text-3xl leading-tight sm:text-4xl">
              You're not just another person in my life
            </h2>
            <p className="relative mt-7 text-lg leading-relaxed text-foreground/85 sm:text-xl">
              People come and go and most of them fit somewhere ordinary. You don't. You have a
              place in me that nobody else can take, or borrow, or replace — not before you, not
              after you.
            </p>
            <p className="relative mt-6 text-lg leading-relaxed text-muted-foreground italic">
              If you were missing from my life, nothing else would quietly fill that shape.
            </p>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 4. I LOVE YOU ──────────────────────────────────────────── */
function LoveMoment() {
  const words = ["I", "LOVE", "YOU"];
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Particles count={26} />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--rose) 45%, transparent), transparent 70%)",
        }}
      />
      <div className={`${section} text-center`}>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, scale: 1.35, filter: "blur(26px)", y: 18 }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.8, delay: i * 0.75, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-display text-5xl leading-none tracking-[0.06em] sm:text-8xl"
              style={{ textShadow: "0 0 60px color-mix(in oklab, var(--rose) 55%, transparent)" }}
            >
              {w}
            </motion.span>
          ))}
        </div>
        <Reveal delay={2.4}>
          <p className="mx-auto mt-12 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I don't think I'll ever have enough words to explain how much you mean to me.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 5. Thank you timeline ──────────────────────────────────── */
const timeline = [
  { title: "Thank you for staying", body: "Even when it would have been easier not to." },
  {
    title: "Thank you for understanding me",
    body: "For hearing the thing under the thing I actually said.",
  },
  {
    title: "Thank you for making me smile",
    body: "Sometimes accidentally, which somehow makes it better.",
  },
  {
    title: "Thank you for being patient with me",
    body: "For giving me room instead of a deadline.",
  },
  { title: "Thank you for simply being you", body: "That alone would have been more than enough." },
];

function ThankYouTimeline() {
  return (
    <section className={section}>
      <Reveal>
        <p className="text-[0.65rem] tracking-[0.42em] text-muted-foreground uppercase">
          moments, not dates
        </p>
        <h2 className="mt-5 text-3xl leading-tight sm:text-5xl">A timeline made of thank-yous</h2>
      </Reveal>

      <div className="relative mt-14 pl-7 sm:pl-10">
        <div className="absolute top-0 bottom-0 left-1 w-px bg-gradient-to-b from-transparent via-rose/60 to-transparent" />
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute top-8 -left-[1.6rem] h-2 w-2 rounded-full bg-rose shadow-[0_0_16px_4px_color-mix(in_oklab,var(--rose)_45%,transparent)] sm:-left-[2.35rem]" />
                <div
                  className="glass sheen p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--glass-bg)"
                        : "linear-gradient(160deg, color-mix(in oklab, var(--rose) 14%, transparent), color-mix(in oklab, white 3%, transparent))",
                  }}
                >
                  <h3 className="text-2xl sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Finale ──────────────────────────────────────────────── */
function Finale() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-32">
      <Particles count={20} />
      <div className={`${section} text-center`}>
        <Reveal>
          <h2 className="text-3xl leading-[1.2] sm:text-5xl">
            I just want you to know that
            <br />
            <span className="italic text-blush">I love you so much</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-7">
          {[
            "Thank you for everything you've done for me.",
            "Thank you for being there.",
            "Thank you for becoming such a special part of my life.",
          ].map((line, i) => (
            <Reveal key={line} delay={0.4 + i * 0.35}>
              <p className="text-lg leading-relaxed text-foreground/85 sm:text-xl">{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1.6}>
          <p className="font-display mx-auto mt-16 max-w-xl text-2xl leading-snug text-blush italic sm:text-3xl">
            You're genuinely one of the most precious people in my life.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20">
            <AnimatePresence mode="wait" initial={false}>
              {!revealed ? (
                <motion.button
                  key="btn"
                  type="button"
                  onClick={() => setRevealed(true)}
                  exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
                  whileTap={{ scale: 0.95 }}
                  className="glass sheen px-8 py-4 text-sm tracking-[0.3em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                  style={{ boxShadow: "var(--shadow-dream)" }}
                >
                  One more thing
                </motion.button>
              ) : (
                <motion.p
                  key="msg"
                  initial={{ opacity: 0, scale: 1.12, filter: "blur(22px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
                  className="font-script mx-auto max-w-2xl text-4xl leading-tight text-blush sm:text-6xl"
                  style={{
                    textShadow: "0 0 50px color-mix(in oklab, var(--rose) 55%, transparent)",
                  }}
                >
                  I love you more than I can put into words
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. A song, hidden at the end ───────────────────────────── */
function SongSurprise() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-32">
      <Particles count={18} />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--rose) 40%, transparent), transparent 70%)",
        }}
      />
      <div className={`${section} text-center`}>
        <AnimatePresence mode="wait" initial={false}>
          {!open ? (
            <motion.div
              key="closed"
              exit={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
              transition={{ duration: 0.9 }}
            >
              <Reveal>
                <p className="text-[0.65rem] tracking-[0.42em] text-muted-foreground uppercase">
                  one last surprise
                </p>
                <h2 className="mt-5 text-3xl leading-tight sm:text-5xl">
                  There's a song I can never hear
                  <br />
                  <span className="italic text-blush">without thinking of you</span>
                </h2>
              </Reveal>
              <Reveal delay={0.3}>
                <motion.button
                  type="button"
                  onClick={() => setOpen(true)}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="glass sheen mt-14 px-8 py-4 text-sm tracking-[0.3em] uppercase transition-transform duration-500 hover:-translate-y-0.5"
                  style={{ boxShadow: "var(--shadow-dream)" }}
                >
                  Open your surprise
                </motion.button>
              </Reveal>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 1.06, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p className="font-script text-4xl leading-tight text-blush sm:text-6xl">
                Be My Baby
              </p>
              <p className="mt-4 text-sm tracking-[0.3em] text-muted-foreground uppercase">
                the ronettes — for Gala
              </p>

              <div
                className="glass sheen mx-auto mt-10 max-w-xl overflow-hidden p-3"
                style={{ boxShadow: "var(--shadow-dream)" }}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[calc(var(--radius))]">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/jSPpbOGnFgk?autoplay=1&rel=0"
                    title="The Ronettes — Be My Baby"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 1.2 }}
                className="mx-auto mt-12 max-w-lg text-lg leading-relaxed text-foreground/85 sm:text-xl"
              >
                So — will you be my baby, Gala?
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, delay: 2.2 }}
                className="font-script mt-10 text-3xl text-blush sm:text-4xl"
              >
                always yours, Shourya
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
