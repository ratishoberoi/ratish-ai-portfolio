"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { assistantKnowledge } from "@/lib/portfolio-data";

const prompts = ["Explain Forge", "Show OSS work", "Skills overview", "Why hire Ratish?"];

function answerFor(prompt: string) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("hire")) {
    return "Ratish brings founder context, AI infrastructure depth, backend engineering, and open-source contribution signal across LLM tooling, repository intelligence, RAG, and agent validation systems.";
  }
  const match = assistantKnowledge.find((item) => item.triggers.some((trigger) => normalized.includes(trigger)));
  return match?.answer || "Ratish focuses on AI infrastructure, autonomous engineering runtimes, repository intelligence, RAG systems, model serving, and backend platforms.";
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ask about Forge, RepoMind, OSS work, skills, or hiring fit." },
  ]);

  function submit(prompt: string) {
    if (!prompt.trim()) return;
    setMessages((current) => [
      ...current.slice(-4),
      { role: "user", text: prompt },
      { role: "assistant", text: answerFor(prompt) },
    ]);
    setQuery("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {open ? (
          <motion.div
            className="mb-3 w-[min(92vw,380px)] rounded-[1.5rem] border border-white/10 bg-[#070a10]/95 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Bot className="h-4 w-4 text-signal" /> Portfolio Assistant
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => submit(prompt)}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300 transition hover:border-signal/50 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === "user" ? "ml-10 bg-signal text-ink" : "mr-8 bg-white/[0.06] text-slate-300"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && submit(query)}
                placeholder="Ask a portfolio question..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none focus:border-signal/60"
              />
              <button onClick={() => submit(query)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
                Ask
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open ? (
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-2xl transition hover:scale-[1.02]">
          <MessageSquare className="h-3.5 w-3.5" /> Ask
        </button>
      ) : null}
    </div>
  );
}
