"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitPullRequest } from "lucide-react";
import { openSourceTimeline } from "@/lib/portfolio-data";

export function OpenSourceImpact() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {openSourceTimeline.map((item, index) => (
        <motion.a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_25px_100px_rgba(0,0,0,0.24)]"
        >
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color}`} />
          <div className="mb-6 flex items-start justify-between">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.color} text-sm font-black text-ink`}>
              {item.logo}
            </div>
            <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:rotate-12 group-hover:text-white" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
            <GitPullRequest className="h-4 w-4" /> {item.issue}
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">{item.repo}</h3>
          <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{item.title}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-500">
            <span>{item.status}</span>
            <span>0{index + 1}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
