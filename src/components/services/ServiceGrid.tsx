"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/content/siteContent";
import styles from "./ServiceGrid.module.css";

/* ---- Simple SVG icons per service slug ---- */
function ServiceIcon({ slug }: { slug: string }) {
  const props = {
    width: 48,
    height: 48,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "consulting":
      // Lightbulb
      return (
        <svg {...props}>
          <path d="M9 21h6" />
          <path d="M10 17h4" />
          <path d="M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "influencer-marketing":
      // Megaphone
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          <line x1="12" y1="2" x2="12" y2="3" />
        </svg>
      );
    case "product-management":
      // Rocket
      return (
        <svg {...props}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "purpose-ideation":
      // Compass
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "off-menu":
      // Sparkles
      return (
        <svg {...props}>
          <path d="M12 2l1.09 3.26L16.36 6l-3.27 1.09L12 10.36l-1.09-3.27L7.64 6l3.27-1.09L12 2z" />
          <path d="M18 12l.7 2.1L20.8 15l-2.1.7L18 17.8l-.7-2.1L15.2 15l2.1-.7L18 12z" />
          <path d="M7 14l.52 1.56L9.08 16l-1.56.52L7 18.08l-.52-1.56L4.92 16l1.56-.52L7 14z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ServiceGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <>
      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {SERVICES.map((svc) => (
          <motion.div
            key={svc.slug}
            className={styles.card}
            variants={card}
            onMouseEnter={() => setHoveredSlug(svc.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
          >
            <div className={styles.iconWrap}>
              <ServiceIcon slug={svc.slug} />
            </div>

            <h3 className={styles.title}>{svc.title}</h3>

            {/* Hover overlay with description */}
            <motion.div
              className={styles.memo}
              initial={false}
              animate={{ opacity: hoveredSlug === svc.slug ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p>{svc.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
