"use client";

import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Code2, Database, GitBranch, Lock, Network, ServerCog } from "lucide-react";

const domains = [
  {
    title: "AI Infrastructure",
    summary: "Runtime boundaries, local inference, orchestration, and model lifecycle control.",
    tools: ["vLLM", "Model Routing", "Runtime Management", "LLMOps"],
    icon: ServerCog,
  },
  {
    title: "Agent Systems",
    summary: "Role-separated agent flows for planning, coding, review, repair, and verdicts.",
    tools: ["LangGraph", "Multi-Agent Systems", "MCP", "Tool Calling"],
    icon: BrainCircuit,
  },
  {
    title: "RAG",
    summary: "Evidence-first retrieval pipelines for repository and domain intelligence.",
    tools: ["Qdrant", "ChromaDB", "Hybrid Retrieval", "Reranking"],
    icon: Database,
  },
  {
    title: "LLMOps",
    summary: "Prompt/runtime observability, validation loops, evaluation, and deployment discipline.",
    tools: ["Eval Flows", "Artifacts", "Repair Loops", "Versioned Context"],
    icon: Network,
  },
  {
    title: "Backend",
    summary: "Production APIs, data persistence, async workflows, and service boundaries.",
    tools: ["FastAPI", "Django", "PostgreSQL", "Redis"],
    icon: Code2,
  },
  {
    title: "MLOps",
    summary: "Model packaging, reproducible environments, deployment automation, and CI.",
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Pipelines"],
    icon: GitBranch,
  },
  {
    title: "Model Serving",
    summary: "Inference runtime selection, GPU-aware execution, batching, and local serving.",
    tools: ["vLLM", "Transformers", "PyTorch", "Runtime Swap"],
    icon: Boxes,
  },
  {
    title: "Security",
    summary: "Static analysis, dependency risk, repository review, and AI security checks.",
    tools: ["Semgrep", "Bandit", "AI Security Review", "Dependency Review"],
    icon: Lock,
  },
];

export function ExpertiseClusters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {domains.map((domain, index) => {
        const Icon = domain.icon;
        return (
          <motion.div
            key={domain.title}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5 shadow-[0_20px_90px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-signal" />
              <span className="text-[11px] text-slate-600">0{index + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{domain.title}</h3>
            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{domain.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {domain.tools.map((item) => (
                <motion.span
                  whileHover={{ scale: 1.06 }}
                  key={item}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-slate-300"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
