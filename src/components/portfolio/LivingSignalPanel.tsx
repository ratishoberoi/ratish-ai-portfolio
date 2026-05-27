"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const signals = [
  { label: "PR #21787", value: "LlamaIndex", detail: "TreeSelectLeafRetriever source-node preservation", status: "Open PR" },
  { label: "PR #28866", value: "LiteLLM", detail: "Anthropic adapter response-id alignment", status: "Open PR" },
  { label: "PR #25077", value: "Open WebUI", detail: "Duplicate knowledge batch embedding prevention", status: "Open PR" },
  { label: "PR #86783", value: "OpenClaw", detail: "Per-PID owner args memoization and cleanup yield", status: "Merged" },
  { label: "Current focus", value: "Repository Intelligence", detail: "AST, retrieval, architecture, security review", status: "Active" },
  { label: "Current stack", value: "FastAPI • Qdrant • vLLM", detail: "Local-first AI infrastructure", status: "Building" },
  { label: "Building", value: "Agent Validation Runtime", detail: "Patch parsing, tests, repair loops, verdicts", status: "Designing" },
];

export function LivingSignalPanel() {
  const [index, setIndex] = useState(0);
  const signal = signals[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % signals.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-4 font-mono text-sm shadow-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-500">
        <span>Engineering signal</span>
        <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_rgba(121,255,225,0.8)]" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={signal.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42 }}
          className="min-h-[108px]"
        >
          <div className="text-signal">{signal.label}</div>
          <div className="mt-2 text-xl font-semibold text-white">{signal.value}</div>
          <div className="mt-2 leading-6 text-slate-400">{signal.detail}</div>
          <div className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{signal.status}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
