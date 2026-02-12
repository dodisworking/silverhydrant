"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AI_CHAT } from "@/lib/content/siteContent";
import styles from "./ChatInterface.module.css";

const USER_TYPE_SPEED = 80; // ms per char (~2.4s for the question)
const AI_TOTAL_DURATION = 4000; // 4 seconds for full AI response

export default function ChatInterface({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<
    "idle" | "userTyping" | "thinking" | "aiTyping" | "done"
  >("idle");
  const [userText, setUserText] = useState("");
  const aiContentRef = useRef<HTMLSpanElement>(null);

  /* ---- Start typing after brief delay ---- */
  useEffect(() => {
    if (phase !== "idle") return;
    const t = setTimeout(() => setPhase("userTyping"), 300);
    return () => clearTimeout(t);
  }, [phase]);

  /* ---- Question types out character-by-character ---- */
  useEffect(() => {
    if (phase !== "userTyping") return;
    const src = AI_CHAT.userMessage;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    function typeNext() {
      i++;
      setUserText(src.slice(0, i));
      if (i >= src.length) {
        setTimeout(() => setPhase("thinking"), 600);
        return;
      }
      timer = setTimeout(typeNext, USER_TYPE_SPEED);
    }

    timer = setTimeout(typeNext, USER_TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [phase]);

  /* ---- Brief thinking pause ---- */
  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setTimeout(() => setPhase("aiTyping"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  /* ---- AI response: 4-second rAF-based typing ---- */
  const typeAi = useCallback(() => {
    const src = AI_CHAT.responseFormatted;

    // Pre-build HTML snapshots — one per visible character
    const snapshots: string[] = [];
    let html = "";
    let idx = 0;

    while (idx < src.length) {
      if (src[idx] === "<") {
        // Consume entire HTML tag instantly
        let tag = "";
        while (idx < src.length) {
          tag += src[idx];
          idx++;
          if (src[idx - 1] === ">") break;
        }
        html += tag;
        continue;
      }
      html += src[idx];
      idx++;
      snapshots.push(html);
    }

    const total = snapshots.length;
    const startTime = performance.now();
    let lastIdx = -1;

    function frame() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / AI_TOTAL_DURATION, 1);
      const targetIdx = Math.min(Math.floor(progress * total), total - 1);

      if (targetIdx !== lastIdx) {
        lastIdx = targetIdx;
        if (aiContentRef.current) {
          aiContentRef.current.innerHTML = snapshots[targetIdx];
        }
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        if (aiContentRef.current) {
          aiContentRef.current.innerHTML = snapshots[total - 1];
        }
        setPhase("done");
        onComplete?.();
      }
    }

    requestAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "aiTyping") return;
    typeAi();
  }, [phase, typeAi]);

  return (
    <div className={styles.container}>
      {/* ---- Question ---- */}
      {phase !== "idle" && (
        <motion.p
          className={styles.question}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {userText}
          {phase === "userTyping" && (
            <span className={styles.cursor}>|</span>
          )}
        </motion.p>
      )}

      {/* ---- Thinking dots ---- */}
      {phase === "thinking" && (
        <motion.div
          className={styles.thinking}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </motion.div>
      )}

      {/* ---- AI Response ---- */}
      {(phase === "aiTyping" || phase === "done") && (
        <motion.div
          className={styles.response}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span ref={aiContentRef} />
          {phase === "aiTyping" && (
            <span className={styles.cursor}>|</span>
          )}
        </motion.div>
      )}
    </div>
  );
}
