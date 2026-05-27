"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Cpu, Layers3, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/lib/portfolio-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

function ArchitectureStack({ project }: { project: Project }) {
  const steps =
    project.name === "Forge"
      ? ["Objective", "Repository intelligence", "Runtime routing", "Artifact generation", "Validation", "Judge verdict"]
      : project.name === "RepoMind AI"
        ? ["Repository ingest", "AST extraction", "Hybrid retrieval", "Architecture graph", "Security review", "Cited answer"]
        : ["System concept", "Infrastructure", "Evaluation", "Deployment"];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        <Layers3 className="h-4 w-4 text-signal" /> Architecture
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <span className="text-xs text-signal">0{index + 1}</span>
            <div className="mt-1 text-sm text-slate-200">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections =
    project.name === "Forge"
      ? [
          ["Problem", project.problem],
          ["Architecture", project.architecture],
          ["Runtime", "Local model roles are treated as runtime resources. Forge separates repository context, inference lifecycle, artifact persistence, patch parsing, and test execution so each step can be reasoned about independently."],
          ["Agent Roles", "The system models primary coder, synthesizer, and judge as separate responsibilities rather than a single generic prompt. That makes output review, repair, and acceptance more explicit."],
          ["Validation Flow", "Generated artifacts move through patch parsing, pytest validation, safety checks, and repair loops before acceptance. Validation is part of the product surface, not a post-generation afterthought."],
        ]
      : project.name === "RepoMind AI"
        ? [
            ["Problem", project.problem],
            ["Repository Intelligence", "RepoMind turns a repository into structured evidence: files, routes, dependencies, architecture layers, security findings, and cited answer context."],
            ["AST Analysis", "Tree-sitter style parsing and static extraction make repository understanding more reliable than simple text chunking."],
            ["RAG Pipeline", "The retrieval layer combines code chunks, embeddings, reranking, and cited context so answers stay grounded in repository evidence."],
            ["Security Review", "Security review combines Bandit, Semgrep, and custom checks to surface practical code risks alongside architecture and technical debt."],
            ["Architecture", project.architecture],
          ]
        : [
            ["Problem", project.problem],
            ["Architecture", project.architecture],
            ["Expansion", "This slot is structured for future AI infrastructure systems without changing the portfolio architecture."],
          ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 px-3 py-3 backdrop-blur-2xl sm:items-center sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#070a10] shadow-2xl"
        initial={{ opacity: 0, y: 34, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#070a10]/90 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">{project.label}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink sm:inline-flex"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
            <button aria-label="Close project modal" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">Case study</p>
              <h4 className="mt-3 text-4xl font-black uppercase leading-[0.9] text-white sm:text-6xl">{project.name}</h4>
              <p className="mt-5 text-sm leading-7 text-slate-300">{project.problem}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Image
              src={asset(project.gallery[0])}
              alt={`${project.name} primary screenshot`}
              width={1440}
              height={900}
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="aspect-[16/10] rounded-2xl border border-white/10 object-cover shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              priority
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <ArchitectureStack project={project} />
            <div className="grid gap-3 md:grid-cols-2">
              {sections.map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {title.includes("Security") ? <ShieldCheck className="h-4 w-4 text-signal" /> : <Cpu className="h-4 w-4 text-signal" />}
                    {title}
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Screenshots</div>
            <div className="grid gap-3 md:grid-cols-2">
              {project.gallery.slice(0, 4).map((image, index) => (
                <Image
                  key={image}
                  src={asset(image)}
                  alt={`${project.name} screenshot ${index + 1}`}
                  width={1440}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="aspect-[16/9] rounded-2xl border border-white/10 object-cover"
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Engineering decisions</div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {project.lessons.map((lesson) => (
                <div key={lesson} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-signal" />
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flagship = index === 0;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left shadow-[0_30px_120px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-signal/40 ${flagship ? "lg:col-span-2" : ""}`}
      whileHover={{ scale: 1.01 }}
    >
      <div className={flagship ? "grid lg:grid-cols-[1.15fr_0.85fr]" : ""}>
        <div className="relative overflow-hidden">
          <Image
            src={asset(project.image)}
            alt={`${project.name} product surface`}
            width={1440}
            height={900}
            sizes={flagship ? "(max-width: 1024px) 100vw, 52vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="aspect-[16/10] w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur">
            {flagship ? "Flagship" : project.label}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">0{index + 1}</div>
              <h3 className="mt-3 text-3xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{project.summary}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition group-hover:border-signal/50 group-hover:text-signal">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {project.capabilities.map((capability) => (
              <div key={capability} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-300">
                {capability}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} onOpen={() => setActiveProject(project)} />
        ))}
      </div>
      <AnimatePresence>{activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}</AnimatePresence>
    </>
  );
}
