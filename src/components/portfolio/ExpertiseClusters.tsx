"use client";

import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Code2, Database, GitBranch, Lock, ServerCog } from "lucide-react";
import { expertiseGroups } from "@/lib/portfolio-data";

const icons = [ServerCog, BrainCircuit, Database, Code2, Boxes, GitBranch, Lock];

export function ExpertiseClusters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      {expertiseGroups.map((group, index) => {
        const Icon = icons[index % icons.length];
        return (
          <motion.div
            key={group.title}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5 shadow-[0_20px_90px_rgba(0,0,0,0.22)] ${index < 3 ? "lg:col-span-2" : index === 3 ? "lg:col-span-1" : "lg:col-span-2"}`}
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-signal" />
              <span className="text-[11px] text-slate-600">0{index + 1}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
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
