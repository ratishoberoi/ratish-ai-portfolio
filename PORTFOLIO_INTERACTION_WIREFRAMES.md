# Portfolio Interaction Wireframes

Generated before implementation on 2026-05-27.

## Goal

Shift the site from a personal portfolio into an AI infrastructure product experience. The visitor should interact with Forge, RepoMind AI, a terminal interface, and a context-aware hiring assistant instead of reading long sections.

## Global Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Nav: Ratish Oberoi | Projects OSS Expertise GitHub Contact   │
│                      [Terminal Mode toggle]                  │
└──────────────────────────────────────────────────────────────┘

┌ Hero: identity + proof chips ───────────┬ Profile / system card ┐
│ AI Infrastructure Engineer              │ Photo + live signals   │
│ Forge Creator | Ex-CTO | ₹1Cr+ | OSS    │ Runtime / RAG / OSS     │
│ CTAs: Simulate Forge, Projects, GitHub   │                        │
└─────────────────────────────────────────┴──────────────────────┘

┌ Terminal Mode Overlay ────────────────────────────────────────┐
│ $ whoami                                                      │
│ $ projects                                                    │
│ Commands: whoami projects skills oss contact forge repomind   │
└───────────────────────────────────────────────────────────────┘
```

## Forge Simulator

```text
┌ Forge Simulator ──────────────────────────────────────────────┐
│ Objective input: "Add auth-safe FastAPI todo endpoint" [Run]  │
├────────────── timeline ──────────────┬ system state ──────────┤
│ 1 Repository analysis                 │ repo map / symbols      │
│ 2 Model routing                       │ coder -> synth -> judge  │
│ 3 Patch generation                    │ pseudo diff              │
│ 4 Validation                          │ tests / checks           │
│ 5 Judge verdict                       │ accepted / repair loop   │
└───────────────────────────────────────┴────────────────────────┘
```

## RepoMind Simulator

```text
┌ RepoMind Simulator ───────────────────────────────────────────┐
│ Fake repo: fastapi-rag-platform [Analyze]                     │
├ pipeline ────────────────┬ generated outputs ────────────────┤
│ AST parsing              │ architecture nodes                 │
│ Embedding generation     │ vector chunks                      │
│ Architecture generation  │ service graph                      │
│ Security findings        │ findings + severity                │
│ CTO summary              │ decision-ready summary             │
└──────────────────────────┴────────────────────────────────────┘
```

## Project Cards

Closed state:

```text
┌ Product Card ─────────────────────────┐
│ Screenshot / product surface          │
│ Name + 4 capability chips             │
│ [Run simulator] [Open case study]     │
└───────────────────────────────────────┘
```

Open state:

```text
┌ Modal Case Study ─────────────────────┐
│ Gallery | diagrams | stack | lessons  │
│ GitHub button                         │
└───────────────────────────────────────┘
```

## Assistant

```text
Floating widget: Ask Ratish AI
Modes: Recruiter | CTO | Engineer
Behavior: local data only, mode-specific answers, free-form input.
```

## Timeline

```text
Horizontal/stacked animated AI engineering timeline:
Founder context -> RepoMind -> Forge -> OSS PRs -> AI infrastructure focus
```
