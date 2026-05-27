"use client";

import { useEffect, useState } from "react";
import { contributionDays } from "@/lib/portfolio-data";

type GithubRepo = {
  name: string;
  html_url: string;
  language: string | null;
};

type GithubEvent = {
  type: string;
  repo: { name: string };
};

export function GithubSignal() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [repoResponse, eventResponse] = await Promise.all([
          fetch("https://api.github.com/users/ratishoberoi/repos?per_page=100&sort=updated"),
          fetch("https://api.github.com/users/ratishoberoi/events/public?per_page=20"),
        ]);
        if (repoResponse.ok) setRepos((await repoResponse.json()) as GithubRepo[]);
        if (eventResponse.ok) setEvents((await eventResponse.json()) as GithubEvent[]);
      } catch {
        setRepos([]);
      }
    }
    load();
  }, []);

  const fallbackEvents: GithubEvent[] = [
    { type: "PullRequestEvent", repo: { name: "run-llama/llama_index" } },
    { type: "PullRequestEvent", repo: { name: "BerriAI/litellm" } },
    { type: "PullRequestEvent", repo: { name: "open-webui/open-webui" } },
    { type: "PullRequestEvent", repo: { name: "openclaw/openclaw" } },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-3 gap-3">
          {[["Repositories", repos.length || 34], ["OSS PRs", 4], ["Contrib Days", contributionDays.filter(Boolean).length]].map(([label, value]) => (
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
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Recent engineering activity</div>
        <div className="grid gap-3 md:grid-cols-2">
          {(events.length ? events.slice(0, 4) : fallbackEvents).map((event, index) => (
            <div key={`${event.repo.name}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-sm font-medium text-white">{event.type.replace("Event", "")}</div>
              <div className="mt-1 text-xs text-slate-500">{event.repo.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
