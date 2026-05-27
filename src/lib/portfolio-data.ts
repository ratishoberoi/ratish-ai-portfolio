export type Project = {
  name: string;
  repo: string;
  label: string;
  summary: string;
  image: string;
  gallery: string[];
  github: string;
  demo?: string;
  capabilities: string[];
  stack: string[];
  problem: string;
  architecture: string;
  features: string[];
  lessons: string[];
  diagrams: { title: string; chart: string }[];
};

export const forgeArchitectureDiagram = `flowchart TD
  Operator[Operator Objective] --> Control[Forge Control Center]
  Control --> API[FastAPI Gateway]
  API --> Repo[Repository Intelligence]
  Repo --> Parse[Tree-sitter AST]
  Repo --> Search[Qdrant + BM25 Retrieval]
  API --> Runtime[Runtime Swap Engine]
  Runtime --> Coder[Primary Coder]
  Runtime --> Synth[DeepSeek Synth]
  Runtime --> Judge[Qwen Judge]
  Coder --> Artifact[Structured Artifacts]
  Synth --> Artifact
  Judge --> Verdict[Acceptance Verdict]
  Artifact --> Patch[Patch Parser]
  Patch --> Tests[pytest Validation]
  Tests --> Repair[Repair Loop]
  Repair --> Runtime`;

export const forgeRuntimeDiagram = `sequenceDiagram
  participant Run as Autonomous Run
  participant Swap as Runtime Swap
  participant GPU as Single GPU
  participant VLLM as vLLM Server
  Run->>Swap: activate primary coder
  Swap->>GPU: allocate model runtime
  Run->>VLLM: generate patch artifact
  Swap->>GPU: release runtime
  Run->>Swap: activate synthesizer
  Run->>VLLM: critique and risk analysis
  Swap->>GPU: release runtime
  Run->>Swap: activate judge
  Run->>VLLM: acceptance verdict`;

export const forgeAgentDiagram = `flowchart LR
  Objective[Objective] --> Plan[Plan]
  Plan --> Coder[Coder]
  Coder --> Review[Synth Review]
  Review --> Judge[Judge]
  Judge -->|accepted| Patch[Patch + Tests]
  Judge -->|needs repair| Repair[Repair Prompt]
  Repair --> Coder`;

export const repomindArchitectureDiagram = `flowchart LR
  Source[GitHub / ZIP / Local Repo] --> Ingest[Repository Ingestion]
  Ingest --> AST[AST + Route Extraction]
  AST --> Graph[Architecture Graph]
  AST --> Security[Security Review]
  AST --> Chunks[Code Chunks]
  Chunks --> Embed[BGE Embeddings]
  Embed --> Chroma[ChromaDB]
  Chroma --> Rerank[Hybrid Reranking]
  Rerank --> Qwen[qwen-judge]
  Qwen --> Chat[Cited Repository Chat]
  Graph --> Reports[CTO / Recruiter / Security Reports]`;

export const repomindRagDiagram = `flowchart TD
  Question[Repository Question] --> Intent[Intent Classification]
  Intent --> Vector[Vector Search]
  Intent --> Lexical[Lexical Search]
  Vector --> Rerank[Path-aware Reranker]
  Lexical --> Rerank
  Rerank --> Evidence[Cited Evidence]
  Evidence --> Answer[Structured Answer]
  Answer --> Diagram[Mermaid Diagram + Risks]`;

export const projects: Project[] = [
  {
    name: "Forge",
    repo: "forge",
    label: "Flagship AI infrastructure",
    summary: "Local-first autonomous engineering runtime for repository work.",
    image: "/screenshots/forge/control-center.png",
    gallery: ["/screenshots/forge/control-center.png"],
    github: "https://github.com/ratishoberoi/forge",
    capabilities: ["Control Center", "Runtime swapping", "Repo intelligence", "Agent validation"],
    stack: ["Python", "FastAPI", "vLLM", "Qdrant", "Tree-sitter", "pytest"],
    problem:
      "AI coding systems often hide infrastructure behind hosted APIs. Forge explores the harder local systems problem: repository cognition, role-specific model runtimes, structured artifacts, validation, and repair on infrastructure the operator controls.",
    architecture:
      "Forge separates repository intelligence from inference lifecycle. It scans and indexes code, builds retrieval context, swaps local vLLM model roles on a single GPU, persists artifacts, parses patches, runs tests, and loops through repair before accepting work.",
    features: [
      "Operator Control Center for autonomous runs.",
      "Single-GPU local model runtime swapping.",
      "Tree-sitter AST parsing, symbol graph, Qdrant, and BM25 retrieval.",
      "Coder, synthesizer, and judge agent flow with validation gates.",
    ],
    lessons: [
      "Agent quality depends on infrastructure boundaries as much as model quality.",
      "Repository context must be budgeted, cited, and assembled before generation.",
      "Validation and repair loops are core product surfaces, not afterthoughts.",
    ],
    diagrams: [
      { title: "System architecture", chart: forgeArchitectureDiagram },
      { title: "Runtime swap", chart: forgeRuntimeDiagram },
      { title: "Agent flow", chart: forgeAgentDiagram },
    ],
  },
  {
    name: "RepoMind AI",
    repo: "RepoMindAI",
    label: "Repository intelligence",
    summary: "Offline repository analysis, RAG, security review, and cited chat.",
    image: "/screenshots/repomind/architecture-view.png",
    gallery: [
      "/screenshots/repomind/architecture-view.png",
      "/screenshots/repomind/dashboard-overview.png",
      "/screenshots/repomind/dependency-view.png",
      "/screenshots/repomind/repository-chat.png",
      "/screenshots/repomind/security-view.png",
    ],
    github: "https://github.com/ratishoberoi/RepoMindAI",
    capabilities: ["AST analysis", "RAG pipeline", "Security review", "Cited repository chat"],
    stack: ["Python", "FastAPI", "Next.js", "ChromaDB", "BGE", "Qwen"],
    problem:
      "Teams need repository-level understanding that goes beyond code search: architecture, security, technical debt, and evidence-backed answers that work offline and do not depend on paid hosted models.",
    architecture:
      "RepoMind ingests a repository, extracts AST and route facts, builds dependency and architecture views, indexes chunks in ChromaDB, reranks evidence, and uses local qwen-judge inference for reports and cited answers.",
    features: [
      "Repository ingestion from GitHub URL, ZIP, or local folder.",
      "AST extraction for Python, JavaScript, TypeScript, JSX, and TSX.",
      "Security review with Bandit, Semgrep, and custom rules.",
      "CTO, recruiter, roadmap, security, and technical debt reports.",
    ],
    lessons: [
      "Useful AI repository tools need evidence, citations, and refusal behavior.",
      "Architecture views must be layered to avoid unreadable file graph noise.",
      "Offline RAG systems need cleanup, persistence, and repeatable benchmarks.",
    ],
    diagrams: [
      { title: "Repository intelligence architecture", chart: repomindArchitectureDiagram },
      { title: "RAG pipeline", chart: repomindRagDiagram },
    ],
  },
  {
    name: "Future AI Systems",
    repo: "future-ai-systems",
    label: "Expansion pipeline",
    summary: "Reserved for upcoming production AI infrastructure work.",
    image: "/screenshots/repomind/dashboard-overview.png",
    gallery: ["/screenshots/repomind/dashboard-overview.png"],
    github: "https://github.com/ratishoberoi",
    capabilities: ["Model serving", "AI security", "RAG platforms", "Agent tooling"],
    stack: ["PyTorch", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    problem:
      "A forward slot for production systems that extend Ratish's work across model-serving infrastructure, secure AI platforms, domain RAG, and backend automation.",
    architecture:
      "Designed as a portfolio module that can accept future systems without changing the page architecture.",
    features: ["Project-ready content model.", "Modal-ready gallery.", "Stack and capability metadata.", "GitHub-first expansion path."],
    lessons: ["Keep portfolio architecture extensible.", "Avoid redesigning for every new project.", "Let new artifacts carry the proof."],
    diagrams: [{ title: "Future system slot", chart: "flowchart LR\n  Idea[AI System] --> Infra[Infrastructure]\n  Infra --> Eval[Validation]\n  Eval --> OSS[Open Source]" }],
  },
];

export const openSourceTimeline = [
  {
    date: "May 27, 2026",
    repo: "LlamaIndex",
    owner: "run-llama/llama_index",
    logo: "LI",
    issue: "PR #21787",
    title: "Preserve TreeSelectLeafRetriever source nodes",
    status: "Open",
    url: "https://github.com/run-llama/llama_index/pull/21787",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    date: "May 26, 2026",
    repo: "LiteLLM",
    owner: "BerriAI/litellm",
    logo: "LL",
    issue: "PR #28866",
    title: "Align Anthropic adapter response id with call id",
    status: "Open",
    url: "https://github.com/BerriAI/litellm/pull/28866",
    color: "from-violet-400 to-sky-400",
  },
  {
    date: "May 26, 2026",
    repo: "Open WebUI",
    owner: "open-webui/open-webui",
    logo: "OW",
    issue: "PR #25077",
    title: "Prevent duplicate knowledge batch embeddings",
    status: "Open",
    url: "https://github.com/open-webui/open-webui/pull/25077",
    color: "from-amber-300 to-rose-400",
  },
  {
    date: "May 26, 2026",
    repo: "OpenClaw",
    owner: "openclaw/openclaw",
    logo: "OC",
    issue: "PR #86783",
    title: "Reviewed lock-file cleanup performance and process ownership handling",
    status: "Merged review",
    url: "https://github.com/openclaw/openclaw/pull/86783",
    color: "from-cyan-300 to-blue-500",
  },
];

export const expertiseGroups = [
  { title: "AI Infrastructure", items: ["vLLM", "Model Routing", "LLMOps", "Runtime Management"] },
  { title: "Agent Systems", items: ["LangGraph", "Multi-Agent Systems", "MCP", "Tool Calling"] },
  { title: "RAG", items: ["Qdrant", "ChromaDB", "Hybrid Retrieval", "Reranking"] },
  { title: "Backend", items: ["FastAPI", "Django", "PostgreSQL", "Redis"] },
  { title: "ML", items: ["PyTorch", "Transformers", "Fine Tuning"] },
  { title: "Infra", items: ["Docker", "Kubernetes", "GitHub Actions"] },
  { title: "Security", items: ["Semgrep", "Bandit", "AI Security Review"] },
];

export const assistantKnowledge = [
  {
    triggers: ["who", "ratish", "about", "profile"],
    answer:
      "Ratish Oberoi is an AI Infrastructure Engineer and ex-CTO focused on autonomous AI systems, LLM infrastructure, repository intelligence, RAG, and backend platforms. He also has founder context through a ₹1 Cr+ pre-seed fundraise.",
  },
  {
    triggers: ["forge", "runtime", "agent", "autonomous", "coding"],
    answer:
      "Forge is Ratish's flagship local-first autonomous engineering infrastructure. It combines a Control Center, repository intelligence, local vLLM runtime swapping, multi-agent artifact flow, patch parsing, pytest validation, and repair loops.",
  },
  {
    triggers: ["repomind", "repo mind", "repository", "rag", "semantic", "security"],
    answer:
      "RepoMind AI is an offline repository intelligence platform. It ingests repositories, extracts AST and dependency evidence, indexes code with embeddings, runs security review, and answers repo questions with citations through local qwen-judge inference.",
  },
  {
    triggers: ["open source", "oss", "contribution", "pr", "pull request", "llama", "litellm", "webui", "openclaw"],
    answer:
      "Recent open-source work includes PRs to LlamaIndex (#21787), LiteLLM (#28866), and Open WebUI (#25077), plus review work on OpenClaw (#86783).",
  },
  {
    triggers: ["skill", "stack", "technology", "expertise"],
    answer:
      "Ratish's strongest areas are AI infrastructure, model routing, vLLM, agent systems, RAG, FastAPI backends, vector databases, LLMOps, Docker/Kubernetes, GitHub Actions, and AI security review.",
  },
  {
    triggers: ["experience", "cto", "fundraise", "founder"],
    answer:
      "The portfolio highlights Ex-CTO experience, ₹1 Cr+ pre-seed fundraising context, and current hands-on AI infrastructure work across Forge, RepoMind AI, and open-source AI tooling.",
  },
  {
    triggers: ["contact", "email", "github", "linkedin", "hire"],
    answer:
      "Contact Ratish at ratishoberoi3993@gmail.com, GitHub at github.com/ratishoberoi, or LinkedIn at linkedin.com/in/ratishoberoi.",
  },
];

export const contributionDays = [
  0, 0, 0, 0, 0, 2, 1, 8, 8, 1, 1, 8,
  8, 1, 6, 7, 7, 16, 36, 14, 4, 0, 0, 0,
];
