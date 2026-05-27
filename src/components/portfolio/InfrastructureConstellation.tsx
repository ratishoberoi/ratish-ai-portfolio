"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type InfraNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  layer: "runtime" | "retrieval" | "backend" | "agents" | "validation";
  description: string;
};

const nodes: InfraNode[] = [
  { id: "vllm", label: "vLLM", x: 14, y: 18, layer: "runtime", description: "Local inference runtime" },
  { id: "pytorch", label: "PyTorch", x: 34, y: 12, layer: "runtime", description: "Model execution foundation" },
  { id: "transformers", label: "Transformers", x: 57, y: 16, layer: "runtime", description: "Model architecture toolkit" },
  { id: "routing", label: "Model Routing", x: 79, y: 24, layer: "runtime", description: "Role-aware runtime selection" },
  { id: "rag", label: "RAG", x: 18, y: 46, layer: "retrieval", description: "Grounded answer pipeline" },
  { id: "qdrant", label: "Qdrant", x: 38, y: 37, layer: "retrieval", description: "Vector retrieval layer" },
  { id: "bm25", label: "BM25", x: 60, y: 43, layer: "retrieval", description: "Lexical retrieval baseline" },
  { id: "embeddings", label: "Embeddings", x: 82, y: 51, layer: "retrieval", description: "Semantic index signals" },
  { id: "fastapi", label: "FastAPI", x: 16, y: 74, layer: "backend", description: "Backend API layer" },
  { id: "treesitter", label: "Tree-sitter", x: 38, y: 68, layer: "backend", description: "Repository parsing" },
  { id: "langgraph", label: "LangGraph", x: 58, y: 72, layer: "agents", description: "Agent orchestration" },
  { id: "mcp", label: "MCP", x: 79, y: 78, layer: "agents", description: "Tool and context protocol" },
  { id: "agents", label: "Agent Systems", x: 48, y: 53, layer: "agents", description: "Planner, coder, reviewer, judge loops" },
  { id: "docker", label: "Docker", x: 27, y: 88, layer: "validation", description: "Portable runtime envelope" },
  { id: "actions", label: "GitHub Actions", x: 66, y: 90, layer: "validation", description: "CI and validation automation" },
  { id: "validation", label: "Validation", x: 88, y: 68, layer: "validation", description: "Tests, checks, verdicts" },
];

const edges = [
  ["vllm", "pytorch"],
  ["pytorch", "transformers"],
  ["transformers", "routing"],
  ["routing", "agents"],
  ["rag", "qdrant"],
  ["qdrant", "embeddings"],
  ["rag", "bm25"],
  ["bm25", "embeddings"],
  ["treesitter", "rag"],
  ["treesitter", "agents"],
  ["fastapi", "treesitter"],
  ["fastapi", "docker"],
  ["agents", "langgraph"],
  ["langgraph", "mcp"],
  ["agents", "validation"],
  ["validation", "actions"],
  ["docker", "actions"],
  ["embeddings", "routing"],
];

const layerColors = {
  runtime: "border-cobalt/50 bg-cobalt/10 text-cobalt",
  retrieval: "border-signal/50 bg-signal/10 text-signal",
  backend: "border-amber/50 bg-amber/10 text-amber",
  agents: "border-rose/50 bg-rose/10 text-rose",
  validation: "border-white/25 bg-white/10 text-slate-200",
};

export function InfrastructureConstellation() {
  const [active, setActive] = useState<InfraNode>(nodes[5]);
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), []);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-glow backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(121,255,225,0.16),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(106,167,255,0.13),transparent_30%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:34px_34px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="constellation-line" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#79ffe1" stopOpacity="0.2" />
            <stop offset="0.55" stopColor="#6aa7ff" stopOpacity="0.7" />
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
              stroke="url(#constellation-line)"
              strokeWidth="0.22"
              strokeDasharray="1.2 1.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.25, 0.75, 0.35] }}
              transition={{ duration: 7, delay: index * 0.08, repeat: Infinity, repeatType: "mirror" }}
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
          className={`absolute z-10 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-[0_0_24px_rgba(121,255,225,0.12)] backdrop-blur-md transition hover:scale-110 ${layerColors[node.layer]}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
          aria-label={`${node.label}: ${node.description}`}
        >
          {node.label}
        </motion.button>
      ))}

      {[12, 24, 36, 48, 60, 72].map((x, index) => (
        <motion.span
          key={x}
          className="absolute h-1 w-1 rounded-full bg-signal/70 shadow-[0_0_18px_rgba(121,255,225,0.8)]"
          style={{ left: `${x}%`, top: `${18 + ((index * 13) % 64)}%` }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.8, 1] }}
          transition={{ duration: 4.5, delay: index * 0.5, repeat: Infinity }}
        />
      ))}

      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Selected layer</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-xl font-semibold text-white">{active.label}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{active.description}</span>
        </div>
      </div>
    </div>
  );
}
