"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./HomeIcon.module.css";

/**
 * The central breathing hydrant icon on the Home page.
 * Hover reveals the navigation menu. Click triggers the Ask AI flow.
 */
export default function HomeIcon({
  onAskAi,
}: {
  onAskAi: () => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [autoShown, setAutoShown] = useState(false);

  const handleClick = useCallback(() => {
    if (clicked) return;
    setClicked(true);
    onAskAi();
  }, [clicked, onAskAi]);

  // Auto-show menu after 3 seconds if not hovered
  useEffect(() => {
    const t = setTimeout(() => {
      setMenuOpen(true);
      setAutoShown(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  // Stable random star positions (generated once)
  const starPositions = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      })),
    []
  );

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => {
        if (!autoShown) setMenuOpen(false);
      }}
    >
      {/* Black square with stars + hydrant */}
      <motion.div
        className={styles.iconBox}
        animate={
          clicked
            ? { scale: 12, transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] } }
            : undefined
        }
        whileHover={!clicked ? { scale: 1.06 } : undefined}
        onClick={handleClick}
      >
        {/* Stars dots */}
        <div className={styles.starsLayer}>
          {starPositions.map((pos, i) => (
            <span
              key={i}
              className={styles.miniStar}
              style={pos}
            />
          ))}
        </div>

        <Image
          src="/a.png"
          alt="Silver fire hydrant"
          width={220}
          height={220}
          priority
          className={styles.hydrant}
        />
      </motion.div>

      {/* Side menu buttons */}
      {menuOpen && !clicked && (
        <motion.div
          className={styles.sideMenu}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {[
            { label: "Services", href: "/services" },
            { label: "Founders", href: "/founders" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <button
              key={item.href}
              className={styles.menuBtn}
              onClick={(e) => {
                e.stopPropagation();
                router.push(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
