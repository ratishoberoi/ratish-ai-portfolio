"use client";

import { ArrowUpRight, Code2, FileText, Link } from "lucide-react";
import { motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const profiles = [
  {
    label: "GitHub",
    detail: "Repositories, OSS PRs, active engineering work",
    href: "https://github.com/ratishoberoi",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    detail: "Professional background and hiring context",
    href: "https://www.linkedin.com/in/ratishoberoi",
    icon: Link,
  },
  {
    label: "Resume",
    detail: "Downloadable profile for recruiters",
    href: asset("/resume/Ratish-Oberoi-Resume.md"),
    icon: FileText,
  },
  {
    label: "LeetCode",
    detail: "Coding practice profile",
    href: "https://leetcode.com/u/ratishoberoi/",
    icon: ArrowUpRight,
  },
];

export function CodingProfiles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {profiles.map((profile) => {
        const Icon = profile.icon;
        return (
          <motion.a
            key={profile.label}
            href={profile.href}
            target={profile.href.startsWith("http") ? "_blank" : undefined}
            rel={profile.href.startsWith("http") ? "noreferrer" : undefined}
            whileHover={{ y: -6 }}
            className="group rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_25px_100px_rgba(0,0,0,0.24)] transition hover:border-signal/40"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-signal" />
              <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:rotate-12 group-hover:text-white" />
            </div>
            <h3 className="mt-8 text-xl font-semibold text-white">{profile.label}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{profile.detail}</p>
          </motion.a>
        );
      })}
    </div>
  );
}
