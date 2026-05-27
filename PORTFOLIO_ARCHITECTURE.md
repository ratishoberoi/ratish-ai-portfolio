# Portfolio Architecture

## 1. Hero Section

Shows Ratish Oberoi as an AI Infrastructure Engineer with Ex-CTO and ₹1 Cr+ pre-seed fundraise signals. The hero copy focuses on autonomous AI systems, LLM infrastructure, agent frameworks, and production-grade AI platforms. Primary actions: View Projects, GitHub, LinkedIn, Resume.

## 2. About

Positions Ratish as an AI Infrastructure Engineer and builder of AI infrastructure and agent systems. Avoids generic biography language and emphasizes infrastructure, local-first AI, backend reliability, and repository intelligence.

## 3. Featured Projects

Forge is the flagship section with screenshot, architecture diagram, feature cards, technology stack, and GitHub link. RepoMind AI follows as an interactive repository intelligence project with RAG, semantic search, architecture, and report-generation details. A third expansion slot supports future AI projects.

## 4. Open Source

Timeline data structure supports repository, issue/PR number, status, title, date, and URL. Current entries include Open WebUI, LiteLLM, LlamaIndex, and OpenClaw review work.

## 5. Technical Expertise

Categorized cards: AI Infrastructure, Agent Systems, RAG, LLMOps, Backend, DevOps, MLOps, Model Serving, Vector Databases, Security.

## 6. Experience

Hero and about sections carry Ex-CTO and founder-level context without overclaiming details not present in local or public sources. The architecture leaves room for a future dated experience timeline.

## 7. GitHub Activity

Browser-side GitHub REST API integration fetches repositories and recent public events. Contribution stats use a local snapshot from GitHub GraphQL because unauthenticated GraphQL cannot run safely from a static GitHub Pages site.

## 8. Contact

Contact section routes to email placeholder, GitHub, and LinkedIn. For production, replace the email placeholder with Ratish's preferred email.

## Components

- `src/app/page.tsx`: single-page application and UI composition.
- `src/lib/portfolio-data.ts`: structured local data for projects, assistant answers, expertise, diagrams, and open-source timeline.
- Mermaid diagrams render client-side.
- GitHub data hydrates client-side from public REST endpoints.
- Static export is enabled in `next.config.ts`.
