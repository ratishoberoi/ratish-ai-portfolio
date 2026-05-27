"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: FadeRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
