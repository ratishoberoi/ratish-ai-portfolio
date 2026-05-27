export const projects = [
  {
    name: "Forge",
    repo: "forge",
    label: "Flagship project",
    github: "https://github.com/ratishoberoi/forge",
    image: "/screenshots/forge/control-center.png",
    summary:
      "Local-first AI engineering infrastructure for autonomous repository work: repository cognition, specialist local models, structured artifacts, patch generation, validation, repair loops, and an operator control plane.",
    features: [
      "Single-GPU runtime autoswap for heavyweight local vLLM model roles.",
      "Repository intelligence with Tree-sitter AST parsing, symbol graphs, embeddings, BM25, and Qdrant hybrid retrieval.",
      "Courtroom-style agent pipeline with primary coder, synthesizer, and judge stages.",
      "Patch execution, pytest validation, acceptance gates, repair loops, Git safety, and artifact replay.",
    ],
    stack: ["Python 3.12", "FastAPI", "vLLM", "Qdrant", "Tree-sitter", "Sentence Transformers", "pytest"],
  },
  {
    name: "RepoMind AI",
    repo: "RepoMindAI",
    label: "Interactive repository intelligence",
    github: "https://github.com/ratishoberoi/RepoMindAI",
    image: "/screenshots/repomind/architecture-view.png",
    summary:
      "Offline AI-powered repository intelligence workspace that turns GitHub URLs, ZIPs, or local repos into architecture maps, dependency views, security findings, reports, and cited repository chat.",
    features: [
      "RAG pipeline with BGE embeddings, ChromaDB search, lexical reranking, citations, Mermaid diagrams, and qwen-judge inference.",
      "AST extraction for Python, JavaScript, TypeScript, JSX, and TSX.",
      "CTO, recruiter, security, technical debt, roadmap, and project status reports.",
      "Repository cleanup lifecycle that retains reports and indexes after source removal.",
    ],
    stack: ["Python", "FastAPI", "Next.js", "ChromaDB", "BGE embeddings", "Qwen", "React Flow"],
  },
];

export const timeline = [
  {
    date: "May 27, 2026",
    repo: "run-llama/llama_index",
    issue: "PR #21787",
    title: "fix: preserve TreeSelectLeafRetriever source nodes",
    status: "Open",
    url: "https://github.com/run-llama/llama_index/pull/21787",
  },
  {
    date: "May 26, 2026",
    repo: "BerriAI/litellm",
    issue: "PR #28866",
    title: "fix(anthropic): align adapter response id with call id",
    status: "Open",
    url: "https://github.com/BerriAI/litellm/pull/28866",
  },
  {
    date: "May 26, 2026",
    repo: "open-webui/open-webui",
    issue: "PR #25077",
    title: "fix: prevent duplicate knowledge batch embeddings",
    status: "Open",
    url: "https://github.com/open-webui/open-webui/pull/25077",
  },
  {
    date: "May 26, 2026",
    repo: "openclaw/openclaw",
    issue: "PR #86783",
    title: "Reviewed and contributed to lock-file cleanup performance and process ownership handling.",
    status: "Merged review",
    url: "https://github.com/openclaw/openclaw/pull/86783",
  },
];

export const expertise = [
  { title: "AI Infrastructure", detail: "Local inference, model routing, runtime lifecycle, API gateways, and infrastructure control planes." },
  { title: "Agent Systems", detail: "Multi-role agents, artifact protocols, validation loops, repair paths, and autonomous execution boundaries." },
  { title: "RAG", detail: "AST-aware chunking, vector search, lexical reranking, citations, and evidence-backed answers." },
  { title: "LLMOps", detail: "Prompt contracts, runtime observability, usage accounting, model adapters, and quality gates." },
  { title: "Backend", detail: "FastAPI services, typed schemas, async workflows, testable domain boundaries, and production APIs." },
  { title: "DevOps", detail: "GitHub Actions, static deployments, local services, process supervision, and release paths." },
  { title: "MLOps", detail: "Offline model assets, embedding pipelines, benchmark harnesses, and repeatable validation." },
  { title: "Model Serving", detail: "vLLM, OpenAI-compatible endpoints, local model slots, health checks, and process cleanup." },
  { title: "Vector Databases", detail: "Qdrant, ChromaDB, hybrid retrieval, collection lifecycle, and persistence." },
  { title: "Security", detail: "Semgrep, Bandit, dependency evidence, secret handling, and AI system risk review." },
];

export const forgeDiagram = `flowchart TD
  Operator[Operator Objective] --> API[FastAPI Control Plane]
  API --> Repo[Repository Intelligence]
  Repo --> AST[Tree-sitter AST]
  Repo --> Vec[Qdrant + BM25]
  API --> Runtime[Runtime Swap Engine]
  Runtime --> Coder[Primary Coder]
  Runtime --> Synth[DeepSeek Synth]
  Runtime --> Judge[Qwen Judge]
  Coder --> Artifacts[Structured Artifacts]
  Synth --> Artifacts
  Judge --> Verdict[Acceptance Verdict]
  Artifacts --> Patch[Patch Parser]
  Patch --> Tests[pytest Validation]
  Tests --> Repair[Repair Loop]
  Repair --> Runtime`;

export const repomindDiagram = `flowchart LR
  Source[GitHub / ZIP / Local Repo] --> Ingest[Ingestion]
  Ingest --> Parse[AST + Route Extraction]
  Parse --> Graph[Dependency Graph]
  Parse --> Chunks[Code Chunks]
  Chunks --> Embed[BGE Embeddings]
  Embed --> Chroma[ChromaDB]
  Chroma --> Rerank[Semantic + Lexical Rerank]
  Rerank --> Qwen[qwen-judge]
  Graph --> Reports[CTO / Security / Recruiter Reports]
  Qwen --> Chat[Cited Repository Chat]`;

export const assistantAnswers = {
  "Who is Ratish?":
    "Ratish Oberoi is an AI Infrastructure Engineer and ex-CTO focused on autonomous AI systems, LLM infrastructure, agent frameworks, RAG platforms, and production-grade backend systems. His GitHub positioning and current projects point toward local-first AI infrastructure rather than generic app development.",
  "What is Forge?":
    "Forge is Ratish's flagship local-first autonomous software engineering infrastructure. It scans repositories, builds AST and retrieval intelligence, routes work through local specialist model roles, writes artifacts, applies patches, runs tests, and uses repair/convergence loops before accepting results.",
  "What is RepoMind AI?":
    "RepoMind AI is an offline repository intelligence platform. It ingests repositories, extracts AST and dependency evidence, builds vector indexes, generates architecture/security/recruiter/CTO reports, and answers repository questions with citations using local qwen-judge inference.",
  "Show open source contributions.":
    "Recent open-source work includes PRs to LlamaIndex (#21787), LiteLLM (#28866), and Open WebUI (#25077), plus reviewed work in OpenClaw (#86783). The contribution model is intentionally data-driven so new PRs can be added without redesigning the site.",
};

export const contributionDays = [
  0, 0, 0, 0, 0, 2, 1, 8, 8, 1, 1, 8,
  8, 1, 6, 7, 7, 16, 36, 14, 4, 0, 0, 0,
];
