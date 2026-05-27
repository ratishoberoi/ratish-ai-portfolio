"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Cpu,
  Database,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Layers3,
  BriefcaseBusiness,
  Lock,
  Mail,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  assistantAnswers,
  contributionDays,
  expertise,
  forgeDiagram,
  projects,
  repomindDiagram,
  timeline,
} from "@/lib/portfolio-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
};

type GithubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { action?: string; ref?: string };
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-signal">
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
        themeVariables: {
          background: "#0b1018",
          primaryColor: "#111827",
          primaryTextColor: "#e5edf8",
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
    <div className="overflow-hidden rounded-lg border border-line bg-panel/80 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>{title}</span>
        <Network className="h-4 w-4 text-cobalt" />
      </div>
      <div
        className="mermaid-frame min-h-[240px] overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

function GithubPanel() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [status, setStatus] = useState("Loading GitHub API data");

  useEffect(() => {
    async function loadGithub() {
      try {
        const [repoResponse, eventResponse] = await Promise.all([
          fetch("https://api.github.com/users/ratishoberoi/repos?per_page=100&sort=updated"),
          fetch("https://api.github.com/users/ratishoberoi/events/public?per_page=20"),
        ]);
        if (!repoResponse.ok || !eventResponse.ok) {
          throw new Error("GitHub API unavailable");
        }
        const repoJson = (await repoResponse.json()) as GithubRepo[];
        const eventJson = (await eventResponse.json()) as GithubEvent[];
        setRepos(repoJson);
        setEvents(eventJson);
        setStatus("Live from GitHub REST API");
      } catch {
        setStatus("Using local snapshot because GitHub API is rate-limited");
      }
    }
    loadGithub();
  }, []);

  const topRepos = repos
    .filter((repo) => ["forge", "RepoMindAI", "litellm", "llama_index", "open-webui"].includes(repo.name))
    .slice(0, 5);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const publicRepos = repos.length || 33;
  const recentEvents = events.slice(0, 6);

  return (
    <section id="github" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>GitHub Activity</SectionLabel>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-line bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Live engineering signal</h2>
              <span className="rounded-full border border-line px-3 py-1 text-xs text-slate-400">{status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Repos", publicRepos],
                ["Stars", totalStars],
                ["2026 contributions", "204"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-line bg-ink/50 p-4">
                  <div className="text-2xl font-semibold text-white">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
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
                            ? "rgba(121,255,225,0.5)"
                            : "rgba(121,255,225,0.9)",
                  }}
                  title={`${count} contributions`}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-white/[0.035] p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <GitBranch className="h-4 w-4 text-signal" /> Focus repos
              </h3>
              {(topRepos.length ? topRepos : projects.map((p) => ({
                name: p.repo,
                html_url: p.github,
                description: p.summary,
                language: p.stack[0],
                stargazers_count: 0,
                forks_count: 0,
                pushed_at: "",
                fork: false,
              }))).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-3 block rounded-lg border border-line bg-ink/40 p-3 transition hover:border-signal/50"
                >
                  <div className="flex items-center justify-between text-sm font-medium">
                    {repo.name}
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{repo.description}</p>
                  <div className="mt-2 text-xs text-slate-500">{repo.language || "Multi-language"}</div>
                </a>
              ))}
            </div>
            <div className="rounded-lg border border-line bg-white/[0.035] p-5">
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
                <div key={`${event.type}-${index}`} className="border-b border-line py-3 last:border-0">
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

function Assistant() {
  const [question, setQuestion] = useState("Who is Ratish?");
  const answer = assistantAnswers[question as keyof typeof assistantAnswers] || assistantAnswers["Who is Ratish?"];

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-line bg-[radial-gradient(circle_at_top_left,rgba(121,255,225,0.12),transparent_35%),rgba(255,255,255,0.035)] p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Local Assistant</SectionLabel>
            <h2 className="text-3xl font-semibold">Portfolio assistant without paid APIs</h2>
            <p className="mt-4 text-slate-400">
              A local structured-data assistant answers high-intent recruiter, CTO, and maintainer questions from the portfolio content model.
            </p>
            <div className="mt-6 grid gap-2">
              {Object.keys(assistantAnswers).map((item) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                    question === item
                      ? "border-signal/70 bg-signal/10 text-white"
                      : "border-line bg-ink/40 text-slate-400 hover:border-white/25"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-ink/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm text-signal">
              <Bot className="h-4 w-4" /> Ratish portfolio assistant
            </div>
            <div className="rounded-lg bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroStats = useMemo(
    () => [
      ["Ex-CTO", "Product and engineering leadership"],
      ["₹1 Cr+", "Pre-seed fundraise"],
      ["204", "2026 GitHub contributions"],
      ["3", "Active AI OSS PRs"],
    ],
    [],
  );

  const heroActions = [
    { label: "View Projects", href: "#projects", Icon: ArrowUpRight },
    { label: "GitHub", href: "https://github.com/ratishoberoi", Icon: GitBranch },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ratishoberoi", Icon: BriefcaseBusiness },
    { label: "Resume", href: asset("/resume/Ratish-Oberoi-Resume.md"), Icon: ExternalLink },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-line bg-ink/80 px-5 py-3 backdrop-blur-xl sm:px-8">
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

      <section id="top" className="relative px-5 pb-16 pt-32 sm:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-signal" /> AI Infrastructure Engineer · Founder-level builder
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Ratish Oberoi
            </h1>
            <p className="mt-4 text-2xl text-signal">AI Infrastructure Engineer</p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
              <span className="rounded-full border border-line px-3 py-1">Ex-CTO</span>
              <span className="rounded-full border border-line px-3 py-1">₹1 Cr+ Pre-Seed Fundraise</span>
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Building autonomous AI systems, LLM infrastructure, agent frameworks, and production-grade AI platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroActions.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.04] px-4 py-3 text-sm font-medium transition hover:border-signal/60 hover:bg-signal/10"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-lg border border-line bg-panel/90 p-4 shadow-glow"
          >
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3 text-xs text-slate-500">
              <span>autonomous-ai-runtime.ts</span>
              <span>local-first</span>
            </div>
            <div className="grid gap-3">
              {heroStats.map(([value, label]) => (
                <div key={value} className="grid grid-cols-[110px_1fr] items-center rounded-md border border-line bg-white/[0.035] p-4">
                  <div className="text-2xl font-semibold text-white">{value}</div>
                  <div className="text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-line bg-ink p-4 font-mono text-xs leading-6 text-slate-400">
              <div><span className="text-signal">runtime</span>.route(objective)</div>
              <div>repo.index(AST + embeddings + graph)</div>
              <div>agent.generate_patch()</div>
              <div>tests.validate_or_repair()</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>About</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Senior AI systems builder focused on the infrastructure behind reliable AI products.
            </h2>
            <div className="space-y-5 text-base leading-8 text-slate-400">
              <p>
                Ratish builds local-first AI platforms, repository intelligence systems, agentic engineering runtimes, and backend infrastructure for production AI workflows.
              </p>
              <p>
                His current work centers on Forge, a multi-agent autonomous coding infrastructure project, and RepoMind AI, an offline repository intelligence platform with AST analysis, RAG, cited answers, reports, security findings, and architecture views.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Featured Projects</SectionLabel>
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold">Flagship AI infrastructure systems</h2>
            <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-signal">
              View GitHub profile <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-10">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="rounded-lg border border-line bg-white/[0.035] p-4 sm:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-signal">
                      {index === 0 ? <Cpu className="h-4 w-4" /> : <BrainCircuit className="h-4 w-4" />}
                      {project.label}
                    </div>
                    <h3 className="text-3xl font-semibold">{project.name}</h3>
                    <p className="mt-4 text-lg leading-8 text-slate-300">{project.summary}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="rounded-lg border border-line bg-ink/45 p-4 text-sm leading-6 text-slate-300">
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                          {item}
                        </span>
                      ))}
                    </div>
                    <a href={project.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink">
                      GitHub <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      width={1400}
                      height={875}
                      className="aspect-[16/10] w-full rounded-lg border border-line object-cover"
                    />
                    <MermaidDiagram chart={project.name === "Forge" ? forgeDiagram : repomindDiagram} title={`${project.name} architecture`} />
                  </div>
                </div>
              </motion.article>
            ))}

            <article className="rounded-lg border border-dashed border-line bg-white/[0.02] p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-cobalt/15 p-3 text-cobalt"><Layers3 className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-2xl font-semibold">Additional AI systems</h3>
                  <p className="mt-3 max-w-3xl text-slate-400">
                    Expansion slot for production AI projects such as Veritas-RAG, AI Sales OS, clinical booking assistants, edge AI systems, and future model-serving infrastructure.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="open-source" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Open Source</SectionLabel>
          <h2 className="max-w-3xl text-4xl font-semibold">Contribution timeline</h2>
          <div className="mt-10 grid gap-4">
            {timeline.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="grid gap-4 rounded-lg border border-line bg-white/[0.035] p-5 transition hover:border-signal/50 md:grid-cols-[180px_1fr_160px]"
              >
                <div className="text-sm text-slate-500">{item.date}</div>
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <GitPullRequest className="h-4 w-4 text-signal" /> {item.repo}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.title}</p>
                  <div className="mt-2 text-xs text-slate-500">Issue/PR: {item.issue}</div>
                </div>
                <div className="flex items-center justify-start md:justify-end">
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-slate-300">{item.status}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Technical Expertise</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {expertise.map((item, index) => {
              const icons = [Server, Bot, Database, Cpu, ShieldCheck, Network, Terminal, BrainCircuit, Lock, Layers3];
              const Icon = icons[index % icons.length];
              return (
                <div key={item.title} className="rounded-lg border border-line bg-white/[0.035] p-5">
                  <Icon className="mb-5 h-5 w-5 text-signal" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GithubPanel />
      <Assistant />

      <section id="contact" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-line bg-white/[0.035] p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-4xl font-semibold">Build serious AI infrastructure.</h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                Best fit: remote AI infrastructure engineering, agent systems, RAG platforms, LLMOps, backend systems, model-serving infrastructure, and open-source AI tooling.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:ratishoberoi3993@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 text-sm">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 text-sm">
                <GitBranch className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 text-sm">
                <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
