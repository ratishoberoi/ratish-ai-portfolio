"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArchitectureGallery } from "@/components/portfolio/ArchitectureGallery";
import { CodingProfiles } from "@/components/portfolio/CodingProfiles";
import { FadeReveal } from "@/components/portfolio/FadeReveal";
import { GithubSignal } from "@/components/portfolio/GithubSignal";
import { InfrastructureConstellation } from "@/components/portfolio/InfrastructureConstellation";
import { LivingSignalPanel } from "@/components/portfolio/LivingSignalPanel";
import { OpenSourceImpact } from "@/components/portfolio/OpenSourceImpact";
import { PortfolioAssistant } from "@/components/portfolio/PortfolioAssistant";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { projects } from "@/lib/portfolio-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.86], [1, 0.3]);

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_5%,rgba(121,255,225,0.16),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(106,167,255,0.15),transparent_32%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />

      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-ink/70 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-ink">R</span>
            Ratish Oberoi
          </a>
          <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 md:flex">
            {["Projects", "GitHub", "OSS", "Profiles", "Architecture", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a href="mailto:ratishoberoi3993@gmail.com" className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/12">
            Email
          </a>
        </div>
      </nav>

      <section ref={heroRef} id="top" className="relative z-10 min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:pt-36">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-signal" /> Ex-CTO • ₹1Cr+ Pre-Seed • Open Source
            </div>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Local-first AI infrastructure for autonomous engineering.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Ratish Oberoi designs repository intelligence, RAG systems, model-serving runtimes, validation loops, and agent architectures for software engineering workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink">
                View projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">
                GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FadeReveal delay={0.18} y={34}>
            <div className="relative">
              <InfrastructureConstellation />
              <div className="absolute left-4 top-4 w-28 overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-1.5 shadow-glow backdrop-blur-xl sm:w-36">
                <Image
                  src={asset("/profile/ratish-oberoi.jpg")}
                  alt="Ratish Oberoi"
                  width={540}
                  height={1200}
                  priority
                  sizes="144px"
                  className="aspect-[4/5] rounded-xl object-cover object-[50%_65%]"
                />
              </div>
              <div className="absolute bottom-4 right-4 w-[min(88vw,360px)]">
                <LivingSignalPanel />
              </div>
            </div>
          </FadeReveal>
        </motion.div>
      </section>

      <section id="projects" className="relative z-10 rounded-t-[3rem] border-t border-white/10 bg-[#080b11]/95 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Featured projects" title="Real projects first.">
            Five public projects with screenshots, impact statements, GitHub links, live repository metadata, and case-study modals.
          </SectionHeading>
          <ProjectShowcase projects={projects} />
        </div>
      </section>

      <section id="github" className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="GitHub activity" title="What is currently active.">
            Latest repositories and update timestamps for Forge, RepoMindAI, Veritas RAG, Smile AI Scheduler, and the profile README.
          </SectionHeading>
          <GithubSignal />
        </div>
      </section>

      <section id="oss" className="relative z-10 rounded-[3rem] border-y border-white/10 bg-white/[0.03] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Open source" title="Contribution signal.">
            Verified PR status is shown accurately: active open PRs are labeled as open, and the merged OpenClaw work is labeled merged.
          </SectionHeading>
          <OpenSourceImpact />
        </div>
      </section>

      <section id="profiles" className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Coding profiles" title="Where to verify the work.">
            Direct links for recruiters and technical reviewers.
          </SectionHeading>
          <CodingProfiles />
        </div>
      </section>

      <section id="architecture" className="relative z-10 rounded-[3rem] border-y border-white/10 bg-[#080b11]/95 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Architecture case studies" title="Architecture supports the projects.">
            Kept intentionally focused: Forge runtime, RepoMind pipeline, and Veritas RAG pipeline.
          </SectionHeading>
          <ArchitectureGallery />
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-glow sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-signal">Contact</p>
              <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
                Currently exploring production AI infrastructure roles.
              </h2>
            </div>
            <div>
              <div className="mb-5 grid gap-2 sm:grid-cols-2">
                {["AI Infrastructure Engineering", "Agent Systems", "LLMOps", "RAG Platforms", "Backend AI Systems"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:ratishoberoi3993@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink">
                  <Mail className="h-4 w-4" /> Email
                </a>
                <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/ratishoberoi" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  LinkedIn
                </a>
                <a href={asset("/resume/Ratish-Oberoi-Resume.md")} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioAssistant />
    </main>
  );
}
