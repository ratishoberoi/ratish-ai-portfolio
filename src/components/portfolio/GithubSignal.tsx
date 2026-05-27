"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contributionDays } from "@/lib/portfolio-data";

type GithubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  updated_at: string;
};

const trackedRepos = ["forge", "RepoMindAI", "Veritas-RAG", "SMILE-AI-SCHEDULER", "ratishoberoi"];

export function GithubSignal() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    async function load() {
      const responses = await Promise.all(
        trackedRepos.map(async (repo) => {
          try {
            const response = await fetch(`https://api.github.com/repos/ratishoberoi/${repo}`);
            if (!response.ok) return null;
            return (await response.json()) as GithubRepo;
          } catch {
            return null;
          }
        }),
      );
      setRepos(responses.filter(Boolean) as GithubRepo[]);
    }
    load();
  }, []);

  const visibleRepos = repos.length
    ? repos
    : trackedRepos.map((repo) => ({
        name: repo,
        full_name: `ratishoberoi/${repo}`,
        html_url: `https://github.com/ratishoberoi/${repo}`,
        description: null,
        language: null,
        pushed_at: "",
        updated_at: "",
      }));

  return (
    <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-3 gap-3">
          {[["Repositories", trackedRepos.length], ["OSS PRs", 4], ["Active Days", contributionDays.filter(Boolean).length]].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-black/25 p-4 text-center">
              <div className="text-3xl font-semibold text-white">{value}</div>
              <div className="mt-1 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-12 gap-1">
          {contributionDays.map((count, index) => (
            <div
              key={index}
              className="h-4 rounded-[3px]"
              style={{ background: count === 0 ? "rgba(255,255,255,0.05)" : count < 8 ? "rgba(121,255,225,0.45)" : "rgba(121,255,225,0.95)" }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Latest repositories and update timestamps</div>
        <div className="grid gap-3 md:grid-cols-2">
          {visibleRepos.map((repo) => (
            <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-signal/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">{repo.name === "SMILE-AI-SCHEDULER" ? "Smile-AI-Scheduler" : repo.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{repo.language || "Repository"}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:rotate-12 group-hover:text-white" />
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Updated {repo.pushed_at || repo.updated_at ? new Date(repo.pushed_at || repo.updated_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "from GitHub"}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
