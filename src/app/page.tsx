"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers3,
  Mail,
  MessageSquare,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import {
  assistantKnowledge,
  contributionDays,
  expertiseGroups,
  openSourceTimeline,
  projects,
  type Project,
} from "@/lib/portfolio-data";

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};

type GithubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-signal">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </div>
  );
}

function MermaidDiagram({ chart, title }: { chart: string; title: string }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        flowchart: { curve: "basis", padding: 18 },
        sequence: { mirrorActors: false },
        themeVariables: {
          background: "#070a10",
          primaryColor: "#111827",
          primaryTextColor: "#e8f1ff",
          primaryBorderColor: "#79ffe1",
          lineColor: "#6aa7ff",
          secondaryColor: "#0f172a",
          tertiaryColor: "#101827",
        },
      });

      const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random()
        .toString(36)
        .slice(2)}`;
      const result = await mermaid.render(id, chart);
      if (!cancelled) setSvg(result.svg);
    });

    return () => {
      cancelled = true;
    };
  }, [chart, title]);

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>{title}</span>
        <Network className="h-4 w-4 text-cobalt" />
      </div>
      <div className="mermaid-frame min-h-[220px] overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-3 py-3 backdrop-blur-xl sm:items-center sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-white/10 bg-[#080b12] shadow-2xl"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#080b12]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-signal">{project.label}</p>
            <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-md border border-white/10 bg-white px-3 py-2 text-sm font-semibold text-ink sm:inline-flex"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 sm:inline-flex"
              >
                Demo <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            <button
              aria-label="Close project modal"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="grid gap-3">
              {project.gallery.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  <Image
                    src={image}
                    alt={`${project.name} screenshot ${index + 1}`}
                    width={1400}
                    height={875}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="aspect-[16/10] w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              {project.diagrams.map((diagram) => (
                <MermaidDiagram key={diagram.title} title={diagram.title} chart={diagram.chart} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {[
              ["Problem", project.problem],
              ["Technical Architecture", project.architecture],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
              </div>
            ))}

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h4 className="font-semibold text-white">Features</h4>
              <div className="mt-4 grid gap-3">
                {project.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h4 className="font-semibold text-white">Stack</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h4 className="font-semibold text-white">Lessons Learned</h4>
              <div className="mt-4 grid gap-3">
                {project.lessons.map((lesson) => (
                  <div key={lesson} className="text-sm leading-6 text-slate-400">
                    {lesson}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink sm:hidden"
            >
              Open GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, featured, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      className={`group overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] text-left transition hover:-translate-y-1 hover:border-signal/50 hover:bg-white/[0.055] ${
        featured ? "lg:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className={featured ? "grid lg:grid-cols-[1.1fr_0.9fr]" : ""}>
        <div className="relative overflow-hidden bg-black/30">
          <Image
            src={project.image}
            alt={`${project.name} project screenshot`}
            width={1400}
            height={875}
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="aspect-[16/10] w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            priority={featured}
          />
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs text-slate-200 backdrop-blur">
            {project.label}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{project.summary}</p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 text-slate-300 transition group-hover:border-signal/50 group-hover:text-signal">
              <ChevronRight className="h-5 w-5" />
            </span>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.capabilities.map((capability) => (
              <div key={capability} className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-300">
                {capability}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-signal">
            View details <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ExpertiseSection() {
  const icons = [Cpu, Bot, Search, Server, BrainCircuit, Layers3, ShieldCheck];

  return (
    <section id="expertise" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Technical Expertise</SectionLabel>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">AI systems depth, backend discipline, infrastructure instincts.</h2>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Grouped for fast scanning by recruiters, CTOs, and maintainers.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {expertiseGroups.map((group, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={group.title}
                className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-5"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-signal/10 text-signal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-600">0{index + 1}</div>
                </div>
                <h3 className="font-semibold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1.5 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OpenSourceSection() {
  return (
    <section id="open-source" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Open Source</SectionLabel>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Focused contributions to AI infrastructure projects.</h2>
          <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-signal">
            GitHub profile <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {openSourceTimeline.map((item, index) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-signal/50 hover:bg-white/[0.055]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <div className="flex items-start gap-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-sm font-bold text-ink`}>
                  {item.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{item.repo}</h3>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-400">{item.status}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{item.owner} · {item.date}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.title}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.issue}</span>
                    <span className="inline-flex items-center gap-1 text-signal opacity-80 group-hover:opacity-100">
                      View PR <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function GithubPanel() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [status, setStatus] = useState("Loading live GitHub data");

  useEffect(() => {
    async function loadGithub() {
      try {
        const [repoResponse, eventResponse] = await Promise.all([
          fetch("https://api.github.com/users/ratishoberoi/repos?per_page=100&sort=updated"),
          fetch("https://api.github.com/users/ratishoberoi/events/public?per_page=20"),
        ]);
        if (!repoResponse.ok || !eventResponse.ok) throw new Error("GitHub API unavailable");
        setRepos((await repoResponse.json()) as GithubRepo[]);
        setEvents((await eventResponse.json()) as GithubEvent[]);
        setStatus("Live GitHub REST API");
      } catch {
        setStatus("Local snapshot fallback");
      }
    }
    loadGithub();
  }, []);

  const focusRepos = repos
    .filter((repo) => ["forge", "RepoMindAI", "litellm", "llama_index", "open-webui"].includes(repo.name))
    .slice(0, 5);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const recentEvents = events.slice(0, 5);

  return (
    <section id="github" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>GitHub Activity</SectionLabel>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">Activity signal</h2>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{status}</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ["Repos", repos.length || 33],
                ["Stars", totalStars],
                ["Contributions", "204"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-black/25 p-4">
                  <div className="text-2xl font-semibold text-white">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-12 gap-1">
              {contributionDays.map((count, index) => (
                <div
                  key={index}
                  className="h-4 rounded-[3px] border border-white/[0.03]"
                  style={{
                    background:
                      count === 0
                        ? "rgba(255,255,255,0.05)"
                        : count < 3
                          ? "rgba(106,167,255,0.35)"
                          : count < 8
                            ? "rgba(121,255,225,0.55)"
                            : "rgba(121,255,225,0.9)",
                  }}
                  title={`${count} contributions`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <GitBranch className="h-4 w-4 text-signal" /> Focus repos
              </h3>
              {(focusRepos.length
                ? focusRepos
                : projects.slice(0, 2).map((project) => ({
                    name: project.repo,
                    html_url: project.github,
                    description: project.summary,
                    language: project.stack[0],
                    stargazers_count: 0,
                    forks_count: 0,
                    pushed_at: "",
                  }))).map((repo) => (
                <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="mb-3 block rounded-lg border border-white/10 bg-black/25 p-3 transition hover:border-signal/50">
                  <div className="flex items-center justify-between text-sm font-medium text-white">
                    {repo.name}
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{repo.description}</p>
                  <div className="mt-2 text-xs text-slate-500">{repo.language || "Multi-language"}</div>
                </a>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Terminal className="h-4 w-4 text-cobalt" /> Recent activity
              </h3>
              {(recentEvents.length
                ? recentEvents
                : [
                    { type: "PullRequestEvent", repo: { name: "run-llama/llama_index" }, created_at: "2026-05-27T05:53:26Z" },
                    { type: "PullRequestEvent", repo: { name: "BerriAI/litellm" }, created_at: "2026-05-26T11:14:07Z" },
                    { type: "PullRequestEvent", repo: { name: "open-webui/open-webui" }, created_at: "2026-05-26T10:42:49Z" },
                  ] as GithubEvent[]).map((event, index) => (
                <div key={`${event.type}-${index}`} className="border-b border-white/10 py-3 last:border-0">
                  <div className="text-sm text-slate-200">{event.type.replace("Event", "")}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {event.repo.name} · {new Date(event.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(
    "Ask about Ratish, Forge, RepoMind AI, open source contributions, skills, experience, or contact.",
  );

  function ask(nextQuery: string) {
    setQuery(nextQuery);
    const normalized = nextQuery.toLowerCase();
    const match = assistantKnowledge.find((item) => item.triggers.some((trigger) => normalized.includes(trigger)));
    setAnswer(match?.answer || "I only answer from local portfolio data. Try asking about Forge, RepoMind AI, open source, skills, experience, or contact.");
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {open ? (
          <motion.div
            className="mb-3 w-[min(92vw,390px)] rounded-xl border border-white/10 bg-[#080b12]/95 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Bot className="h-4 w-4 text-signal" /> Ask Ratish AI
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-slate-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm leading-6 text-slate-300">{answer}</div>
            <div className="mt-3 flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") ask(query);
                }}
                placeholder="Ask about Forge, skills, OSS..."
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-signal/60"
              />
              <button onClick={() => ask(query)} className="rounded-md bg-signal px-3 py-2 text-sm font-semibold text-ink">
                Ask
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Who is Ratish?", "What is Forge?", "RepoMind", "Skills", "Contact"].map((prompt) => (
                <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400 hover:border-signal/50 hover:text-signal">
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-2xl transition hover:scale-[1.02]"
        >
          <MessageSquare className="h-4 w-4" /> Ask Ratish AI
        </button>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const heroActions = useMemo(
    () => [
      { label: "View Projects", href: "#projects", Icon: ArrowUpRight },
      { label: "GitHub", href: "https://github.com/ratishoberoi", Icon: GitBranch },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ratishoberoi", Icon: BriefcaseBusiness },
      { label: "Resume", href: asset("/resume/Ratish-Oberoi-Resume.md"), Icon: ExternalLink },
    ],
    [],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-ink/80 px-5 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-signal text-ink">R</span>
            Ratish Oberoi
          </a>
          <div className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
            {["Projects", "Open Source", "Expertise", "GitHub", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="top" className="relative px-5 pb-14 pt-28 sm:px-8 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-signal" /> Ex-CTO • ₹1Cr+ Fundraise • AI Infrastructure Engineer
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Ratish Oberoi
            </h1>
            <p className="mt-4 max-w-xl text-xl leading-8 text-slate-300">
              Builder of AI infrastructure, agent systems, RAG platforms, and production backend systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-300">
              {["AI Infrastructure Engineer", "Ex-CTO", "₹1Cr+ Pre-Seed Fundraise", "Open Source Contributor"].map((chip) => (
                <span key={chip} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroActions.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-medium transition hover:border-signal/60 hover:bg-signal/10"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_15%,rgba(121,255,225,0.24),transparent_55%)] blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-glow">
              <Image
                src="/profile/ratish-oberoi.jpg"
                alt="Ratish Oberoi"
                width={540}
                height={1200}
                priority
                sizes="(max-width: 768px) 88vw, 430px"
                className="aspect-[4/5] w-full rounded-xl object-cover object-[50%_65%]"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/65 p-4 backdrop-blur-xl">
                <div className="text-sm text-slate-400">Current focus</div>
                <div className="mt-1 text-lg font-semibold text-white">Local-first AI systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>About</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              I build the infrastructure layer behind practical AI products.
            </h2>
            <div className="space-y-4 text-base leading-8 text-slate-400">
              <p>
                My work focuses on local inference, model routing, repository intelligence, RAG, agent workflows, validation loops, and backend systems that make AI products usable in production.
              </p>
              <p>
                I care about the hard parts: context quality, runtime control, observability, security review, test gates, and turning AI output into systems that teams can inspect, trust, and ship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Featured Projects</SectionLabel>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">Compact previews. Deep details on click.</h2>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Forge leads as the flagship infrastructure project; RepoMind shows repository intelligence and RAG depth.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} featured={index === 0} onOpen={() => setActiveProject(project)} />
            ))}
          </div>
        </div>
      </section>

      <OpenSourceSection />
      <ExpertiseSection />
      <GithubPanel />

      <section id="contact" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-3xl font-semibold sm:text-4xl">Open to remote AI infrastructure work.</h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                Best fit: agent systems, RAG platforms, backend AI infrastructure, LLMOps, model-serving systems, and open-source AI tooling.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:ratishoberoi3993@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm">
                <GitBranch className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm">
                <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingAssistant />
      <AnimatePresence>{activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}</AnimatePresence>
    </main>
  );
}
