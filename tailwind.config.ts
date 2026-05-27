import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        panel: "#0b1018",
        line: "rgba(255,255,255,0.1)",
        signal: "#79ffe1",
        cobalt: "#6aa7ff",
        amber: "#f5c76b",
        rose: "#ff7a90",
      },
      boxShadow: {
        glow: "0 0 60px rgba(121,255,225,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
