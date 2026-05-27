"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

type ArchitectureCard = {
  title: string;
  label: string;
  description: string;
  nodes: string[];
  edges: [number, number][];
  details: string[];
};

const architectures: ArchitectureCard[] = [
  {
    title: "Forge Runtime Architecture",
    label: "Runtime",
    description: "Local-first orchestration across repository context, model role activation, artifacts, patch parsing, and validation.",
    nodes: ["Objective", "Repo Intel", "Runtime", "Coder", "Synth", "Judge", "Patch", "Tests"],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 5]],
    details: ["Separates repository intelligence from inference lifecycle.", "Treats validation and repair as first-class runtime surfaces.", "Designed around local infrastructure instead of hidden hosted APIs."],
  },
  {
    title: "RepoMind Pipeline",
    label: "Repository Intelligence",
    description: "Repository ingestion, AST evidence extraction, dependency views, architecture summaries, and cited answers.",
    nodes: ["Repo", "AST", "Chunks", "Graph", "Reports", "Chat"],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [2, 5]],
    details: ["Extracts structure before retrieval.", "Keeps architecture and security views connected to code evidence.", "Supports offline repository understanding."],
  },
  {
    title: "RAG Retrieval Flow",
    label: "RAG",
    description: "Hybrid retrieval path combining semantic embeddings, lexical search, reranking, and cited evidence assembly.",
    nodes: ["Question", "Intent", "Vector", "BM25", "Rerank", "Evidence", "Answer"],
    edges: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [5, 6]],
    details: ["Retrieval is treated as infrastructure, not prompt decoration.", "Evidence is assembled before generation.", "Reranking keeps code paths and citations usable."],
  },
  {
    title: "Agent Validation Loop",
    label: "Agents",
    description: "Primary coder, synthesizer, judge, patch parser, tests, and repair loop for autonomous engineering work.",
    nodes: ["Plan", "Coder", "Synth", "Judge", "Patch", "Tests", "Repair"],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]],
    details: ["Agent roles are explicit rather than a single generic chat loop.", "Judge output gates accepted artifacts.", "Failed validation returns to repair with structured context."],
  },
  {
    title: "Repository Intelligence Flow",
    label: "Code Understanding",
    description: "Tree-sitter parsing, symbol extraction, route discovery, dependency mapping, and architecture rendering.",
    nodes: ["Files", "Tree-sitter", "Symbols", "Routes", "Deps", "Graph", "Security"],
    edges: [[0, 1], [1, 2], [1, 3], [2, 5], [3, 5], [4, 5], [5, 6]],
    details: ["Turns repositories into queryable engineering evidence.", "Connects static analysis with AI-generated summaries.", "Supports security review and CTO-level architecture views."],
  },
];

function DiagramPreview({ card, large = false }: { card: ArchitectureCard; large?: boolean }) {
  const positions = card.nodes.map((_, index) => {
    const columns = large ? 4 : 3;
    const col = index % columns;
    const row = Math.floor(index / columns);
    return {
      x: 13 + col * (large ? 24 : 33),
      y: 24 + row * (large ? 24 : 30),
    };
  });

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 ${large ? "min-h-[420px] p-6" : "min-h-[260px] p-4"}`}>
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:32px_32px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {card.edges.map(([from, to], index) => {
          const a = positions[from];
          const b = positions[to];
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#79ffe1"
              strokeOpacity="0.5"
              strokeWidth="0.22"
              strokeDasharray="1.3 1.8"
              animate={{ opacity: [0.3, 0.9, 0.35] }}
              transition={{ duration: 4.5, delay: index * 0.08, repeat: Infinity }}
            />
          );
        })}
      </svg>
      {card.nodes.map((node, index) => (
        <div
          key={node}
          className={`absolute z-10 rounded-xl border border-signal/30 bg-signal/10 px-3 py-2 text-xs font-semibold text-signal backdrop-blur ${large ? "text-sm" : ""}`}
          style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%`, transform: "translate(-50%, -50%)" }}
        >
          {node}
        </div>
      ))}
    </div>
  );
}

function ArchitectureModal({ card, onClose }: { card: ArchitectureCard; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#070a10] p-5 shadow-2xl sm:p-7" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.97 }} onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-signal">{card.label}</p>
            <h3 className="mt-2 text-3xl font-black uppercase leading-none text-white sm:text-5xl">{card.title}</h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">{card.description}</p>
          </div>
          <button aria-label="Close architecture modal" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>
        <DiagramPreview card={card} large />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {card.details.map((detail) => (
            <div key={detail} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
              {detail}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ArchitectureGallery() {
  const [active, setActive] = useState<ArchitectureCard | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {architectures.map((card, index) => (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => setActive(card)}
            whileHover={{ y: -6, scale: 1.01 }}
            className={index === 0 ? "group text-left xl:col-span-2" : "group text-left"}
          >
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_25px_100px_rgba(0,0,0,0.24)] transition group-hover:border-signal/40">
              <DiagramPreview card={card} />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal">{card.label}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{card.description}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition group-hover:rotate-12 group-hover:text-white" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{active ? <ArchitectureModal card={active} onClose={() => setActive(null)} /> : null}</AnimatePresence>
    </>
  );
}
