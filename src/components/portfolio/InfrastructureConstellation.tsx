"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type ArchitectureNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  group: "input" | "context" | "retrieval" | "runtime" | "agents" | "validation";
  description: string;
};

const nodes: ArchitectureNode[] = [
  { id: "objective", label: "User Objective", x: 12, y: 18, group: "input", description: "The engineering task or repository question that drives the run." },
  { id: "repo", label: "Repository Intelligence", x: 35, y: 18, group: "context", description: "AST, symbols, routes, dependencies, and file-level context." },
  { id: "retriever", label: "Retriever", x: 58, y: 18, group: "retrieval", description: "Hybrid retrieval that selects evidence before generation." },
  { id: "qdrant", label: "Qdrant", x: 80, y: 18, group: "retrieval", description: "Vector storage for semantic repository evidence." },
  { id: "embeddings", label: "Embeddings", x: 80, y: 42, group: "retrieval", description: "Semantic representations for relevant code chunks." },
  { id: "runtime", label: "Runtime", x: 58, y: 42, group: "runtime", description: "Local inference lifecycle and model role activation." },
  { id: "coder", label: "Primary Coder", x: 28, y: 54, group: "agents", description: "Generates structured implementation artifacts." },
  { id: "synth", label: "Synthesizer", x: 48, y: 68, group: "agents", description: "Reviews, consolidates, and repairs reasoning artifacts." },
  { id: "judge", label: "Judge", x: 70, y: 62, group: "agents", description: "Accepts or rejects the proposed artifact based on evidence." },
  { id: "patch", label: "Patch", x: 34, y: 86, group: "validation", description: "Parsed code changes ready for validation." },
  { id: "validation", label: "Validation", x: 68, y: 86, group: "validation", description: "Tests, checks, repair gates, and acceptance verdict." },
];

const edges = [
  ["objective", "repo"],
  ["repo", "retriever"],
  ["retriever", "qdrant"],
  ["qdrant", "embeddings"],
  ["embeddings", "runtime"],
  ["retriever", "runtime"],
  ["runtime", "coder"],
  ["coder", "synth"],
  ["synth", "judge"],
  ["judge", "patch"],
  ["patch", "validation"],
  ["validation", "judge"],
  ["repo", "coder"],
];

const groupClass = {
  input: "border-amber/55 bg-amber/10 text-amber",
  context: "border-cobalt/55 bg-cobalt/10 text-cobalt",
  retrieval: "border-signal/55 bg-signal/10 text-signal",
  runtime: "border-white/25 bg-white/10 text-white",
  agents: "border-rose/55 bg-rose/10 text-rose",
  validation: "border-emerald-300/45 bg-emerald-300/10 text-emerald-200",
};

export function InfrastructureConstellation() {
  const [active, setActive] = useState<ArchitectureNode>(nodes[1]);
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), []);

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-glow backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(121,255,225,0.14),transparent_34%),radial-gradient(circle_at_74%_72%,rgba(255,122,144,0.11),transparent_32%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="absolute left-5 top-5 z-20">
        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">Living architecture map</div>
        <div className="mt-2 text-sm text-slate-300">Objective to validated patch</div>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="arch-line" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#79ffe1" stopOpacity="0.22" />
            <stop offset="0.55" stopColor="#6aa7ff" stopOpacity="0.72" />
            <stop offset="1" stopColor="#ff7a90" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {edges.map(([from, to], index) => {
          const a = nodeMap.get(from);
          const b = nodeMap.get(to);
          if (!a || !b) return null;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#arch-line)"
              strokeWidth="0.28"
              strokeDasharray="1.4 1.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.3, 0.82, 0.42] }}
              transition={{ duration: 8, delay: index * 0.1, repeat: Infinity, repeatType: "mirror" }}
            />
          );
        })}
      </svg>

      {nodes.map((node, index) => (
        <motion.button
          key={node.id}
          type="button"
          onClick={() => setActive(node)}
          onMouseEnter={() => setActive(node)}
          className={`absolute z-10 max-w-[150px] rounded-2xl border px-3 py-2 text-left text-[11px] font-semibold shadow-[0_0_28px_rgba(121,255,225,0.13)] backdrop-blur-md transition hover:scale-105 ${groupClass[node.group]}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          animate={{ y: [0, index % 2 ? -3 : 3, 0] }}
          transition={{ duration: 6 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          aria-label={`${node.label}: ${node.description}`}
        >
          {node.label}
        </motion.button>
      ))}

      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Selected component</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-xl font-semibold text-white">{active.label}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{active.description}</span>
        </div>
      </div>
    </div>
  );
}
