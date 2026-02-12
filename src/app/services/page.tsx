"use client";

import { motion } from "framer-motion";
import { StarsCanvas } from "@/components/stars/StarsCanvas";
import ServiceGrid from "@/components/services/ServiceGrid";
import styles from "./page.module.css";

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <StarsCanvas count={400} className={styles.stars} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ServiceGrid />
      </motion.div>
    </div>
  );
}
