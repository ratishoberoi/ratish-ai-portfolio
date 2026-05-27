import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ratish Oberoi | AI Infrastructure Engineer",
  description:
    "AI Infrastructure Engineer building autonomous AI systems, LLM infrastructure, agent frameworks, RAG systems, and production-grade AI platforms.",
  metadataBase: new URL("https://ratishoberoi.github.io"),
  openGraph: {
    title: "Ratish Oberoi | AI Infrastructure Engineer",
    description:
      "Ex-CTO and founder-level builder focused on local-first AI infrastructure, agent systems, RAG, LLMOps, and open source.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth bg-ink antialiased">
      <body className="min-h-full bg-ink text-slate-100">{children}</body>
    </html>
  );
}
