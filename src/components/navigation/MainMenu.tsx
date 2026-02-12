"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./MainMenu.module.css";

const ITEMS: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/contact" },
];

export default function MainMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const visibleItems = ITEMS.filter((i) => i.href !== pathname);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Icon trigger */}
      <button
        className={styles.trigger}
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <div className={styles.square}>
          <span className={styles.dot} style={{ top: "20%", left: "30%" }} />
          <span className={styles.dot} style={{ top: "60%", left: "70%" }} />
          <span className={styles.dot} style={{ top: "40%", left: "50%" }} />
          <span className={styles.dot} style={{ top: "75%", left: "25%" }} />
          <span className={styles.dot} style={{ top: "15%", left: "80%" }} />
        </div>
        <Image
          src="/a.png"
          alt="Silver fire hydrant"
          width={48}
          height={48}
          className={styles.hydrant}
          priority
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {pathname !== "/" && (
              <button
                className={styles.item}
                onClick={() => navigate("/")}
              >
                Home
              </button>
            )}
            {visibleItems.map((item) => (
              <button
                key={item.href}
                className={styles.item}
                onClick={() => navigate(item.href)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
