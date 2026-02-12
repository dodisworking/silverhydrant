"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { StarsCanvas } from "@/components/stars/StarsCanvas";
import { SITE } from "@/lib/content/siteContent";
import styles from "./page.module.css";

export default function ContactPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = SITE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div className={styles.page}>
      <StarsCanvas count={350} className={styles.stars} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.heading}>Contact</h2>
        <p className={styles.lead}>Reach us anytime at</p>
        <p className={styles.email}>{SITE.email}</p>

        <button className={styles.copyBtn} onClick={copyEmail}>
          {copied ? "Copied!" : "Copy email to send"}
        </button>

        <button
          className={styles.backBtn}
          onClick={() => router.back()}
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}
