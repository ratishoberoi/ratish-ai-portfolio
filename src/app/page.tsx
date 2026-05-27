"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Circle,
  Cpu,
  GitBranch,
  Layers3,
  Mail,
  MessageSquare,
  Play,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
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
  pushed_at: string;
};

type GithubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
};

type Mode = "Recruiter" | "CTO" | "Engineer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const forgeSteps = [
  { label: "Objective", detail: "Add auth-safe FastAPI todo endpoint", code: "objective.bind(repo)" },
  { label: "Repository analysis", detail: "AST, routes, tests, symbols", code: "repo.scan() -> 126 symbols" },
  { label: "Model routing", detail: "coder -> synth -> judge", code: "router.pick(role)" },
  { label: "Patch generation", detail: "+ endpoint, + tests, + validation", code: "patch.diff +42 -8" },
  { label: "Validation", detail: "pytest, safety gates, repair check", code: "tests: 12 passed" },
  { label: "Judge verdict", detail: "accepted with traceable artifact", code: "verdict: ship" },
];

const repomindSteps = [
  { label: "Repository ingest", detail: "fastapi-rag-platform", code: "clone -> isolate -> index" },
  { label: "AST parsing", detail: "routes, imports, classes, env vars", code: "tree_sitter.extract()" },
  { label: "Embeddings", detail: "BGE chunks + ChromaDB", code: "vectors: 842 chunks" },
  { label: "Architecture", detail: "API, RAG, storage, auth layers", code: "graph.layout()" },
  { label: "Security", detail: "Bandit, Semgrep, custom checks", code: "findings: 3 medium" },
  { label: "CTO summary", detail: "risks, roadmap, hiring signal", code: "report.cto()" },
];

const timeline = [
  ["Founder context", "Ex-CTO + ₹1Cr+ raise"],
  ["RepoMind AI", "Offline repo intelligence"],
  ["Forge", "Autonomous AI infra"],
  ["Open source", "LlamaIndex, LiteLLM, Open WebUI"],
  ["Current focus", "AI infra + agent systems"],
];

const terminalCommands: Record<string, string> = {
  whoami: "Ratish Oberoi — AI Infrastructure Engineer, Ex-CTO, Forge creator, open-source contributor.",
  projects: "Forge: local autonomous engineering runtime. RepoMind AI: offline repository intelligence and RAG.",
  skills: "vLLM, model routing, LLMOps, agents, RAG, Qdrant, ChromaDB, FastAPI, Docker, security review.",
  oss: "Recent work: LlamaIndex #21787, LiteLLM #28866, Open WebUI #25077, OpenClaw #86783 review.",
  contact: "Email: ratishoberoi3993@gmail.com | GitHub: github.com/ratishoberoi | LinkedIn: /in/ratishoberoi",
  forge: "Forge simulates repo analysis, model routing, patch generation, validation, and judge verdict.",
  repomind: "RepoMind simulates AST parsing, embeddings, architecture generation, security findings, and CTO summary.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-signal">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </div>
  );
}

function ArchitectureMap({ kind }: { kind: "forge" | "repomind" }) {
  const nodes =
    kind === "forge"
      ? ["Objective", "Repo Intel", "Router", "Coder", "Patch", "Tests", "Judge"]
      : ["Repo", "AST", "Embeddings", "Graph", "Security", "CTO Summary"];

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mb-4 text-xs uppercase tracking-[0.16em] text-slate-500">Architecture map</div>
      <div className="grid gap-2 sm:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.div
            key={node}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="relative rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-200"
          >
            <span className="mr-2 text-signal">0{index + 1}</span>
            {node}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SimulatorPanel({
  title,
  subtitle,
  steps,
  accent,
}: {
  title: string;
  subtitle: string;
  steps: typeof forgeSteps;
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        if (current >= steps.length - 1) {
          window.clearInterval(timer);
          setRunning(false);
          return current;
        }
        return current + 1;
      });
    }, 780);
    return () => window.clearInterval(timer);
  }, [running, steps.length]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-glow">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-signal">Frontend-only simulator</div>
          <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>
        <button
          onClick={() => {
            setActive(0);
            setRunning(true);
          }}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:scale-[1.03]"
        >
          <Play className="h-4 w-4" /> Run
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-2">
          {steps.map((step, index) => {
            const complete = index < active;
            const current = index === active;
            return (
              <motion.div
                key={step.label}
                className={`rounded-xl border p-3 transition ${
                  current
                    ? "border-signal/70 bg-signal/10"
                    : complete
                      ? "border-cobalt/40 bg-cobalt/10"
                      : "border-white/10 bg-black/25"
                }`}
                animate={current ? { scale: [1, 1.015, 1] } : { scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-7 w-7 place-items-center rounded-full ${complete || current ? "bg-signal text-ink" : "bg-white/10 text-slate-500"}`}>
                    {complete ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{step.label}</div>
                    <div className="text-xs text-slate-500">{step.detail}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
          <div className="mb-3 flex items-center gap-2 text-slate-500">
            <Circle className="h-2.5 w-2.5 fill-rose text-rose" />
            <Circle className="h-2.5 w-2.5 fill-amber text-amber" />
            <Circle className="h-2.5 w-2.5 fill-signal text-signal" />
          </div>
          {steps.slice(0, active + 1).map((step) => (
            <motion.div key={step.code} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="py-1 text-slate-300">
              <span className="text-signal">$</span> {step.code}
            </motion.div>
          ))}
          <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
            {["latency 0ms", "local only", "no backend"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-2 py-2 text-center text-slate-400">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const kind = project.name === "Forge" ? "forge" : "repomind";
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 px-3 py-3 backdrop-blur-xl sm:items-center sm:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/10 bg-[#070a10] shadow-2xl" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#070a10]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-signal">{project.label}</p>
            <h3 className="text-xl font-semibold">{project.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <a href={project.github} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink sm:inline-flex">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
            <button aria-label="Close project modal" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-300 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <Image src={asset(project.gallery[0])} alt={`${project.name} screenshot`} width={1400} height={875} sizes="(max-width: 1024px) 100vw, 52vw" className="aspect-[16/10] rounded-xl border border-white/10 object-cover" priority />
            <ArchitectureMap kind={kind} />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
              <h4 className="font-semibold">Case study</h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">{project.problem}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-lg border border-white/10 bg-black/25 p-3 text-sm text-slate-300">
                  {feature}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, featured, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  return (
    <motion.button onClick={onOpen} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left transition hover:-translate-y-1 hover:border-signal/50 ${featured ? "lg:col-span-2" : ""}`} whileHover={{ scale: 1.01 }}>
      <div className={featured ? "grid lg:grid-cols-[1.15fr_0.85fr]" : ""}>
        <div className="relative overflow-hidden bg-black/30">
          <Image src={asset(project.image)} alt={`${project.name} product surface`} width={1400} height={875} sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"} className="aspect-[16/10] w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" priority={featured} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs text-slate-200 backdrop-blur">{project.label}</div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{project.summary}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-md border border-white/10 transition group-hover:border-signal/50 group-hover:text-signal">
              <ChevronRight className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.capabilities.map((capability) => (
              <div key={capability} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-300">{capability}</div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function TerminalOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("whoami");
  const [lines, setLines] = useState<string[]>(["$ help", "Commands: whoami, projects, skills, oss, contact, forge, repomind"]);

  function run(command: string) {
    const key = command.trim().toLowerCase();
    setLines((current) => [...current.slice(-10), `$ ${command}`, terminalCommands[key] || "Unknown command. Try: whoami, projects, skills, oss, contact, forge, repomind"]);
    setInput("");
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-signal/20 bg-[#05070b] shadow-glow" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-signal">
                <Terminal className="h-4 w-4" /> terminal mode
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close terminal">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-[420px] p-5 font-mono text-sm">
              {lines.map((line, index) => (
                <div key={`${line}-${index}`} className={line.startsWith("$") ? "py-1 text-signal" : "pb-3 text-slate-300"}>{line}</div>
              ))}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-signal">$</span>
                <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && run(input)} autoFocus className="flex-1 bg-transparent text-white outline-none" />
                <button onClick={() => run(input)} className="rounded-md bg-signal px-3 py-1.5 text-xs font-semibold text-ink">run</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ModeAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("Recruiter");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Pick a mode and ask about fit, systems depth, projects, or contact." }]);

  function respond(prompt: string) {
    if (!prompt.trim()) return;
    const normalized = prompt.toLowerCase();
    const match = assistantKnowledge.find((item) => item.triggers.some((trigger) => normalized.includes(trigger)));
    const prefix = {
      Recruiter: "Hiring signal:",
      CTO: "Systems read:",
      Engineer: "Implementation note:",
    }[mode];
    const fallback = mode === "Recruiter"
      ? "Ratish fits AI infra, RAG, agent systems, backend AI, and OSS-facing roles."
      : mode === "CTO"
        ? "The strongest signal is infrastructure judgment: runtime control, retrieval, validation, and security."
        : "The stack centers on FastAPI, vLLM, Qdrant/ChromaDB, AST parsing, model routing, and tests.";
    setMessages((current) => [...current.slice(-4), { role: "user", text: prompt }, { role: "assistant", text: `${prefix} ${match?.answer || fallback}` }]);
    setQuery("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {open ? (
          <motion.div className="mb-3 w-[min(94vw,420px)] rounded-2xl border border-white/10 bg-[#070a10]/95 p-4 shadow-2xl backdrop-blur-xl" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold"><Bot className="h-4 w-4 text-signal" /> Ratish AI</div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant"><X className="h-4 w-4" /></button>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {(["Recruiter", "CTO", "Engineer"] as Mode[]).map((item) => (
                <button key={item} onClick={() => setMode(item)} className={`rounded-md border px-2 py-2 text-xs ${mode === item ? "border-signal bg-signal text-ink" : "border-white/10 text-slate-400"}`}>{item}</button>
              ))}
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-3">
              {messages.map((message, index) => (
                <div key={index} className={`rounded-lg px-3 py-2 text-sm leading-6 ${message.role === "user" ? "ml-10 bg-signal text-ink" : "mr-8 bg-white/[0.055] text-slate-300"}`}>{message.text}</div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && respond(query)} placeholder="Ask in selected mode..." className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-signal/60" />
              <button onClick={() => respond(query)} className="rounded-md bg-signal px-3 py-2 text-sm font-semibold text-ink">Ask</button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open ? (
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-ink shadow-2xl hover:scale-[1.02]">
          <MessageSquare className="h-4 w-4" /> Ask Ratish AI
        </button>
      ) : null}
    </div>
  );
}

function GithubPanel() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);

  useEffect(() => {
    async function loadGithub() {
      try {
        const [repoResponse, eventResponse] = await Promise.all([
          fetch("https://api.github.com/users/ratishoberoi/repos?per_page=100&sort=updated"),
          fetch("https://api.github.com/users/ratishoberoi/events/public?per_page=20"),
        ]);
        if (repoResponse.ok) setRepos((await repoResponse.json()) as GithubRepo[]);
        if (eventResponse.ok) setEvents((await eventResponse.json()) as GithubEvent[]);
      } catch {
        setRepos([]);
      }
    }
    loadGithub();
  }, []);

  return (
    <section id="github" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>GitHub Signal</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="grid grid-cols-3 gap-3">
              {[["Repos", repos.length || 33], ["Stars", repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)], ["Contrib", 204]].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-black/25 p-4 text-center">
                  <div className="text-2xl font-semibold">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-12 gap-1">
              {contributionDays.map((count, index) => (
                <div key={index} className="h-4 rounded-[3px]" style={{ background: count === 0 ? "rgba(255,255,255,0.05)" : count < 8 ? "rgba(121,255,225,0.5)" : "rgba(121,255,225,0.95)" }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {(events.length ? events.slice(0, 4) : [
                { type: "PullRequestEvent", repo: { name: "run-llama/llama_index" }, created_at: "2026-05-27T05:53:26Z" },
                { type: "PullRequestEvent", repo: { name: "BerriAI/litellm" }, created_at: "2026-05-26T11:14:07Z" },
              ]).map((event, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <div className="text-sm font-medium">{event.type.replace("Event", "")}</div>
                  <div className="mt-1 text-xs text-slate-500">{event.repo.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(121,255,225,0.13),transparent_26%),radial-gradient(circle_at_84%_8%,rgba(106,167,255,0.13),transparent_30%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,64px_64px,64px_64px]" />
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-ink/80 px-5 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-7 w-7 place-items-center rounded-md bg-signal text-ink">R</span>Ratish Oberoi</a>
          <div className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
            {["Simulators", "Projects", "Timeline", "Expertise", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white">{item}</a>)}
          </div>
          <button onClick={() => setTerminalOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-signal/30 bg-signal/10 px-3 py-2 text-sm text-signal">
            <Terminal className="h-4 w-4" /> Terminal
          </button>
        </div>
      </nav>

      <section id="top" className="relative px-5 pb-12 pt-28 sm:px-8 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-sm text-slate-300"><Sparkles className="h-4 w-4 text-signal" /> Forge creator • Ex-CTO • ₹1Cr+ • OSS</div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-normal sm:text-7xl">AI infrastructure, simulated.</h1>
            <p className="mt-5 max-w-xl text-xl leading-8 text-slate-300">Ratish Oberoi builds local-first agent systems, RAG infrastructure, and backend AI platforms.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm text-slate-300">{["AI Infrastructure Engineer", "Forge Creator", "RepoMind AI", "Open Source"].map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">{chip}</span>)}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#simulators" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink"><Zap className="h-4 w-4" /> Run Simulators</a>
              <a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm"><GitBranch className="h-4 w-4" /> GitHub</a>
              <a href="mailto:ratishoberoi3993@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm"><Mail className="h-4 w-4" /> Contact</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_15%,rgba(121,255,225,0.24),transparent_55%)] blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-glow">
              <Image src={asset("/profile/ratish-oberoi.jpg")} alt="Ratish Oberoi" width={540} height={1200} priority sizes="(max-width: 768px) 88vw, 430px" className="aspect-[4/5] w-full rounded-xl object-cover object-[50%_65%]" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl"><div className="text-xs text-slate-400">Current build</div><div className="font-semibold">Forge autonomous runtime</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="simulators" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Interactive Systems</SectionLabel>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="text-3xl font-semibold sm:text-4xl">Don&apos;t read the portfolio. Run it.</h2><p className="max-w-md text-sm text-slate-400">Frontend-only simulations of the systems Ratish builds.</p></div>
          <div className="grid gap-5 xl:grid-cols-2">
            <SimulatorPanel title="Forge Simulator" subtitle="Objective execution through repo analysis, model routing, patching, validation, and judge verdict." steps={forgeSteps} accent="from-signal via-cobalt to-rose" />
            <SimulatorPanel title="RepoMind Simulator" subtitle="Repository analysis through AST parsing, embeddings, architecture, security, and CTO summary." steps={repomindSteps} accent="from-amber via-signal to-cobalt" />
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Products</SectionLabel>
          <div className="grid gap-5 lg:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.name} project={project} featured={index === 0} onOpen={() => setActiveProject(project)} />)}</div>
        </div>
      </section>

      <section id="timeline" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>AI Engineering Timeline</SectionLabel>
          <div className="grid gap-3 md:grid-cols-5">{timeline.map(([title, detail], index) => <motion.div key={title} whileHover={{ y: -4 }} transition={{ delay: index * 0.02 }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-xs text-signal">0{index + 1}</div><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm text-slate-400">{detail}</p></motion.div>)}</div>
        </div>
      </section>

      <section id="expertise" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Infrastructure Clusters</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{expertiseGroups.map((group, index) => { const icons = [Cpu, Bot, Search, Server, Layers3, Zap, ShieldCheck]; const Icon = icons[index % icons.length]; return <motion.div key={group.title} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5"><Icon className="h-5 w-5 text-signal" /><h3 className="mt-4 font-semibold">{group.title}</h3><div className="mt-4 flex flex-wrap gap-2">{group.items.map((item) => <motion.span whileHover={{ scale: 1.04 }} key={item} className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1.5 text-xs text-slate-300">{item}</motion.span>)}</div></motion.div>; })}</div>
        </div>
      </section>

      <section id="open-source" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Open Source</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-4">{openSourceTimeline.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-signal/50"><div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-sm font-bold text-ink`}>{item.logo}</div><h3 className="font-semibold">{item.repo}</h3><p className="mt-2 text-sm text-slate-400">{item.issue}</p><p className="mt-3 text-sm text-slate-300">{item.title}</p></a>)}</div>
        </div>
      </section>

      <GithubPanel />

      <section id="contact" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <SectionLabel>Contact</SectionLabel>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><h2 className="text-3xl font-semibold">Remote AI infrastructure, agent systems, RAG, backend AI.</h2><div className="flex flex-wrap gap-3"><a href="mailto:ratishoberoi3993@gmail.com" className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink">Email</a><a href="https://github.com/ratishoberoi" target="_blank" rel="noreferrer" className="rounded-md border border-white/10 px-4 py-3 text-sm">GitHub</a><a href="https://www.linkedin.com/in/ratishoberoi" target="_blank" rel="noreferrer" className="rounded-md border border-white/10 px-4 py-3 text-sm">LinkedIn</a></div></div>
        </div>
      </section>

      <ModeAssistant />
      <TerminalOverlay open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <AnimatePresence>{activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}</AnimatePresence>
    </main>
  );
}
