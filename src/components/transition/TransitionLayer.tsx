"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

/**
 * Wraps page content so route changes get smooth cross-fade animations.
 * Pages overlap during the transition — the new page fades in on top
 * of the old one, so there's never a flash to black.
 */
export default function TransitionLayer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const skipInitial = isFirstRender.current;
  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={skipInitial ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
