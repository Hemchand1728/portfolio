import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { about, achievements, certification, experience, featured, profile, projects, skills, stats } from "../data";
import type { Theme } from "../useTheme";
import { ArrowDown, ArrowUpRight, Download, GitHub, LeetCode, LinkedIn, Mail, Seal } from "./Icons";
import { Magnetic, Reveal, SectionHeading, SplitText, TiltCard } from "./motion";

const HeroScene = lazy(() => import("../three/HeroScene"));
const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: GitHub },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedIn },
  { href: profile.links.leetcode, label: "LeetCode", Icon: LeetCode },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

/* ---------------- Hero ---------------- */

function MaskLine({ children, delay, ready, className = "" }: { children: React.ReactNode; delay: number; ready: boolean; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={ready ? { y: "0%" } : {}}
        transition={{ duration: 1.3, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ theme, ready }: { theme: Theme; ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease, delay },
  });

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,color-mix(in_srgb,var(--gold)_16%,transparent),transparent_58%)]" />
      <motion.div aria-hidden className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 2.2, ease }}>
        <Suspense fallback={null}>{ready && <HeroScene theme={theme} active={visible} />}</Suspense>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x pointer-events-none relative z-10 flex h-full flex-col justify-end pb-10 md:pb-16">
        <div className="pointer-events-auto">
          <motion.div {...fadeUp(0.2)} className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label">Portfolio — MMXXVI</span>
            <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to SDE internships
            </span>
          </motion.div>

          <h1 className="font-serif font-normal leading-[0.88] tracking-[-0.03em] text-[clamp(3.6rem,13vw,11rem)]" aria-label={profile.name}>
            <MaskLine ready={ready} delay={0.1}>{profile.firstName}</MaskLine>
            <MaskLine ready={ready} delay={0.25} className="gold-text italic pl-[0.6em]">{profile.lastName}</MaskLine>
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl">
              <motion.p {...fadeUp(0.6)} className="flex items-center gap-3 font-serif text-2xl italic text-ink md:text-3xl">
                <span className="h-px w-10 bg-gold" />
                <span className="relative inline-flex h-[1.3em] w-[20ch] max-w-[75vw] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={roleIdx}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                      className="absolute left-0 whitespace-nowrap"
                    >
                      {profile.roles[roleIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.p>
              <motion.p {...fadeUp(0.75)} className="mt-5 text-[1.02rem] leading-relaxed text-muted">
                CSE undergrad at SRM University AP and Oracle Certified Java SE 17 Developer, crafting full-stack applications and REST APIs with Java, Python and modern web technology.
              </motion.p>
              <motion.div {...fadeUp(0.9)} className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="#projects" className="btn btn-gold">
                    View my work <ArrowUpRight />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download className="btn btn-line">
                    Résumé <Download />
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div {...fadeUp(1.05)} className="flex items-center justify-between gap-6 md:flex-col md:items-end">
              <ul className="flex gap-2" aria-label="Profiles">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#about" className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-muted hover:text-gold">
                Scroll
                <span className="relative block h-10 w-px overflow-hidden bg-line">
                  <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-gold" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */

export function Marquee() {
  const words = ["Java", "Spring Boot", "React", "Node.js", "Python", "REST APIs", "MongoDB", "MySQL", "Computer Vision", "NLP"];
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-serif text-[clamp(2rem,5vw,3.6rem)] italic text-ink/80">{w}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-line py-7" aria-hidden>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

/* ---------------- About ---------------- */

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value, 10);
  const suffix = value.replace(String(num), "");
  const [n, setN] = useState(num > 1000 ? num : 0);

  useEffect(() => {
    if (!inView || num > 1000) return; // years don't count up
    const c = animate(0, num, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, num]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="container-x scroll-mt-20 py-28 md:py-40">
      <SectionHeading index="01" label="About" title="A craftsman of" italic="clean software." />
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <TiltCard className="rounded-[4px]" max={8}>
            <figure className="relative">
              <div className="absolute -inset-3 border border-gold/40 md:-inset-4" style={{ transform: "translateZ(-30px)" }} />
              <div className="relative overflow-hidden bg-bg-2">
                <motion.img
                  src={profile.photo}
                  alt="Portrait of Hemachandu Gunthati in a dark suit"
                  width={1082}
                  height={1454}
                  className="aspect-[4/5] w-full object-cover object-[center_18%] grayscale-[35%] sepia-[15%] transition-[filter] duration-700 hover:grayscale-0 hover:sepia-0"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute -bottom-5 left-6 bg-bg px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold" style={{ transform: "translateZ(50px)" }}>
                Fig. 01 — {profile.location.split(",")[0]}, India
              </figcaption>
            </figure>
          </TiltCard>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.3] text-ink">
              <span className="float-left mr-3 mt-1 font-serif text-[4.6em] leading-[0.75] text-gold">I</span>
              {about[0].slice(1)}
            </p>
          </Reveal>
          {about.slice(1).map((p, i) => (
            <Reveal key={i} delay={0.1 * (i + 1)}>
              <p className="mt-6 clear-left text-[1.05rem] leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <div className="mt-14 grid grid-cols-3 border-t border-line">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className={`pt-8 ${i ? "border-l border-line pl-4 md:pl-8" : "pr-4"}`}>
                <div className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-none text-gold">
                  <CountUp value={s.value} />
                </div>
                <p className="mt-3 text-xs leading-snug text-muted md:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

export function Skills() {
  return (
    <section id="skills" className="container-x scroll-mt-20 py-28 md:py-36">
      <SectionHeading index="02" label="Expertise" title="Tools of" italic="the trade." />
      <div className="border-t border-line">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={0.05 * i}>
            <div className="group relative grid gap-5 border-b border-line py-8 md:grid-cols-[80px_1fr_1.6fr] md:items-center md:gap-8 md:py-10">
              <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
              <span className="font-mono text-sm text-gold">0{i + 1}</span>
              <h3 className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{s.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="chip text-[0.78rem] transition-colors duration-300 hover:border-gold hover:text-gold">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section id="experience" className="container-x scroll-mt-20 py-28 md:py-36">
      <SectionHeading index="03" label="Journey" title="Experience &" italic="education." />
      <div ref={ref} className="relative pl-8 md:pl-0">
        {/* Timeline spine that fills as you scroll */}
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-[220px]" />
        <motion.div className="absolute left-0 top-0 h-full w-px origin-top bg-gold md:left-[220px]" style={{ scaleY: scrollYProgress }} />

        {experience.map((e, i) => (
          <Reveal key={e.role} delay={0.1 * i}>
            <article className="relative grid gap-4 pb-16 md:grid-cols-[220px_1fr] md:gap-0">
              <span className="absolute -left-8 top-2 h-[9px] w-[9px] -translate-x-1/2 rotate-45 border border-gold bg-bg md:left-[220px]" />
              <div className="md:pr-10 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{e.period}</p>
                <p className="mt-2 text-sm text-muted">{e.tag}</p>
              </div>
              <div className="md:pl-14">
                <h3 className="font-serif text-3xl leading-tight md:text-4xl">{e.role}</h3>
                <p className="mt-1 font-serif text-xl italic text-gold">{e.org}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">{e.summary}</p>
                {e.points.length > 0 && (
                  <ul className="mt-6 grid max-w-2xl gap-3">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-4 text-[0.97rem] leading-relaxed text-muted">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {e.stack.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

function FeaturedVisual() {
  const bars = [
    { t: "A+", w: 82 },
    { t: "O−", w: 46 },
    { t: "B+", w: 67 },
    { t: "AB", w: 28 },
  ];
  return (
    <div className="relative aspect-[4/3] w-full [transform-style:preserve-3d]">
      <div className="absolute inset-0 rounded-xl border border-line bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--gold)_18%,transparent),transparent_70%)]" />
      <div className="absolute inset-[10%] overflow-hidden rounded-lg border border-line-strong bg-bg shadow-2xl" style={{ transform: "translateZ(40px)" }}>
        <div className="flex gap-1.5 border-b border-line px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
        </div>
        <div className="grid gap-4 p-5">
          {bars.map((b, i) => (
            <div key={b.t} className="grid grid-cols-[32px_1fr] items-center gap-3">
              <span className="font-mono text-xs text-red-400">{b.t}</span>
              <span className="h-2 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-red-500 to-amber-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.1 }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-2 bottom-[6%] rounded-md border border-line-strong bg-bg/90 px-3 py-2 font-mono text-[0.65rem] text-gold backdrop-blur md:-right-6" style={{ transform: "translateZ(80px)" }}>
        JWT · RBAC
      </div>
      <div className="absolute -left-2 top-[4%] rounded-md border border-line-strong bg-bg/90 px-3 py-2 font-mono text-[0.65rem] text-muted backdrop-blur md:-left-6" style={{ transform: "translateZ(70px)" }}>
        POST /api/requests
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="container-x scroll-mt-20 py-28 md:py-36">
      <SectionHeading index="04" label="Selected Work" title="Things I've" italic="built." />

      <Reveal>
        <TiltCard max={5} className="rounded-2xl">
          <article className="grid items-center gap-10 rounded-2xl border border-line-strong bg-bg-2 p-6 md:p-12 lg:grid-cols-[1.05fr_1fr] [transform-style:preserve-3d]">
            <FeaturedVisual />
            <div style={{ transform: "translateZ(30px)" }}>
              <p className="label">{featured.kicker}</p>
              <h3 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02]">{featured.title}</h3>
              <p className="mt-5 leading-relaxed text-muted">{featured.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {featured.links.map((l, i) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className={`btn ${i === 0 ? "btn-gold" : "btn-line"} !px-5 !py-3 text-sm`}>
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
            </div>
          </article>
        </TiltCard>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={0.08 * (i % 3)}>
            <TiltCard className="h-full rounded-2xl">
              <article className="group relative flex h-full min-h-[340px] flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-gold/50 [transform-style:preserve-3d]">
                <div className="flex items-start justify-between" style={{ transform: "translateZ(25px)" }}>
                  <span className="font-serif text-lg italic text-gold">No. {String(i + 2).padStart(2, "0")}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-gold-ink">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="mt-auto pt-12" style={{ transform: "translateZ(40px)" }}>
                  <p className="label !text-[0.65rem] !text-faint">{p.kicker}</p>
                  <h3 className="mt-2 font-serif text-[1.9rem] leading-tight">
                    <a href={p.links[0].href} target="_blank" rel="noopener" className="after:absolute after:inset-0 after:content-['']">
                      {p.title}
                    </a>
                  </h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <li key={s} className="chip !text-[0.66rem]">{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}

        <Reveal delay={0.16}>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener"
            className="group flex h-full min-h-[340px] flex-col justify-between rounded-2xl border border-dashed border-line-strong p-7 transition-colors duration-500 hover:border-gold"
          >
            <span className="label">Archive</span>
            <div>
              <p className="font-serif text-[2.2rem] italic leading-tight">
                More on <span className="text-gold">GitHub</span>
              </p>
              <span className="mt-6 flex items-center gap-3 font-mono text-xs text-muted transition-colors group-hover:text-gold">
                github.com/Hemchand1728
                <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Credentials ---------------- */

export function Credentials() {
  return (
    <section id="certifications" className="container-x scroll-mt-20 py-28 md:py-36">
      <SectionHeading index="05" label="Credentials" title="Certified &" italic="recognised." />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <TiltCard max={6} className="rounded-sm">
            {/* Styled like a framed certificate */}
            <article className="relative border border-gold/50 bg-bg-2 p-2 [transform-style:preserve-3d]">
              <div className="relative border border-gold/25 px-6 py-10 text-center md:px-12 md:py-14">
                <span className="absolute left-3 top-3 text-gold/60">✦</span>
                <span className="absolute right-3 top-3 text-gold/60">✦</span>
                <span className="absolute bottom-3 left-3 text-gold/60">✦</span>
                <span className="absolute bottom-3 right-3 text-gold/60">✦</span>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/50 text-gold" style={{ transform: "translateZ(40px)" }}>
                  <Seal />
                </div>
                <p className="label mt-6">{certification.issuer}</p>
                <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight" style={{ transform: "translateZ(30px)" }}>
                  {certification.title}
                </h3>
                <p className="font-serif text-2xl italic text-gold">{certification.subtitle}</p>

                <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-6">
                  <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90" role="img" aria-label={`Exam score ${certification.score}%`}>
                    <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="3" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: certification.score / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease }}
                    />
                  </svg>
                  <div className="text-left">
                    <p className="font-serif text-5xl leading-none text-gold">
                      <CountUp value={`${certification.score}%`} />
                    </p>
                    <p className="mt-1 text-sm text-muted">Exam score</p>
                  </div>
                </div>

                <a href={certification.href} target="_blank" rel="noopener" className="btn btn-line mt-10 !py-3 text-sm">
                  View credential <ArrowUpRight />
                </a>
              </div>
            </article>
          </TiltCard>
        </Reveal>

        <div id="achievements" className="grid gap-6">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={0.1 * (i + 1)} className="h-full">
              <article className="group flex h-full flex-col justify-between border border-line bg-surface p-8 transition-colors duration-500 hover:border-gold/50">
                <span className="gold-text font-serif text-6xl italic leading-none">{a.mark}</span>
                <div className="mt-8">
                  <h3 className="font-serif text-2xl">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                  {a.href && (
                    <a href={a.href} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:underline hover:underline-offset-4">
                      View profile <ArrowUpRight />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact & footer ---------------- */

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-32 md:py-48">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_srgb,var(--gold)_14%,transparent),transparent_60%)]" />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="label">(06) — Contact</span>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-5xl font-serif text-[clamp(3rem,9vw,8rem)] font-normal leading-[0.92] tracking-[-0.03em]">
          <SplitText text="Let's build something" />{" "}
          <SplitText text="timeless." className="gold-text italic" delay={0.3} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg leading-relaxed text-muted">
            I'm looking for software engineering internships and placement opportunities. My inbox is always open.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12">
            <Magnetic strength={0.4}>
              <a href={`mailto:${profile.email}`} className="btn btn-gold !px-8 !py-5 text-base md:!px-10 md:text-lg">
                <Mail /> {profile.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <ul className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {socials.slice(0, 3).map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className="group relative font-serif text-2xl italic">
                  {label}
                  <span className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">{profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="container-x flex flex-col items-center justify-between gap-4 border-t border-line py-10 text-sm text-faint md:flex-row">
      <p>
        © {new Date().getFullYear()} <span className="font-serif italic text-ink">{profile.name}</span>
      </p>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em]">Built with React · Three.js · Motion</p>
      <a href="#home" className="flex items-center gap-2 hover:text-gold">
        Back to top <ArrowDown className="rotate-180" />
      </a>
    </footer>
  );
}
