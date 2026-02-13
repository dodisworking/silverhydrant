"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { StarsCanvas } from "@/components/stars/StarsCanvas";
import ChatInterface from "@/components/chat/ChatInterface";
import { AI_CHAT } from "@/lib/content/siteContent";
import styles from "./page.module.css";

type Phase =
  | "intro"
  | "breathing"
  | "expanding"
  | "finalScreen"
  | "chat";

export default function HomePage() {
  const router = useRouter();

  /* Always start fresh — full intro every visit */
  const [phase, setPhase] = useState<Phase>("intro");

  const [showHint, setShowHint] = useState(false);
  const [showAskBtn, setShowAskBtn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const squareRef = useRef<HTMLDivElement>(null);
  const hydrantRef = useRef<HTMLImageElement>(null);
  const blackBoxRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const chatWrapRef = useRef<HTMLDivElement>(null);
  const currentOffset = useRef(0);
  const maxOffset = useRef(0);

  /* Intro → Breathing after 4.3s */
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("breathing"), 4300);
    return () => clearTimeout(t);
  }, [phase]);

  /* Show hint 1.2s into breathing */
  useEffect(() => {
    if (phase !== "breathing") return;
    const t = setTimeout(() => setShowHint(true), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  /* Click: expand */
  const handleBoxClick = useCallback(() => {
    if (phase !== "breathing") return;
    setShowHint(false);
    setPhase("expanding");

    const sq = squareRef.current;
    const hy = hydrantRef.current;
    if (!sq || !hy) return;

    sq.style.animation = "none";
    hy.style.animation = "none";
    void sq.offsetWidth;

    sq.style.transition = "transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)";
    sq.style.transform = "translate(-50%, -50%) scale(18)";

    hy.style.transition = "transform 3s cubic-bezier(0.4, 0, 0.2, 1)";
    hy.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(() => {
      setPhase("finalScreen");
      setShowAskBtn(true);
    }, 2000);
  }, [phase]);

  /* Ask AI click */
  const handleAskClick = useCallback(() => {
    setShowAskBtn(false);
    setPhase("chat");

    const bb = blackBoxRef.current;
    if (bb) {
      bb.style.transition =
        "transform 1.6s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.5s ease";
      bb.style.transform = "translate(-50%, -50%) scale(1)";
      bb.style.opacity = "1";
    }

    setTimeout(() => setShowChat(true), 800);
    setTimeout(() => setShowMenu(true), 3000);
  }, []);

  /* ---- Auto-push during typing (smooth rAF loop) ---- */
  const targetOffset = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    if (!showChat || typingDone) return;

    let running = true;

    function tick() {
      if (!running) return;

      if (chatWrapRef.current && sceneRef.current) {
        const rect = chatWrapRef.current.getBoundingClientRect();
        const overflow = rect.bottom - window.innerHeight + 24;

        if (overflow > 0) {
          targetOffset.current = currentOffset.current + overflow;
        }

        /* Lerp toward target for smooth motion */
        const diff = targetOffset.current - currentOffset.current;
        if (Math.abs(diff) > 0.5) {
          currentOffset.current += diff * 0.18;
          sceneRef.current.style.transform = `translateY(-${currentOffset.current}px)`;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    /* Remove CSS transition — JS handles smoothing now */
    if (sceneRef.current) {
      sceneRef.current.style.transition = "none";
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [showChat, typingDone]);

  /* ---- Manual scroll after typing finishes (no scrollbar) ---- */
  useEffect(() => {
    if (!typingDone) return;

    // Compute max scroll offset from current content
    if (chatWrapRef.current) {
      const rect = chatWrapRef.current.getBoundingClientRect();
      maxOffset.current = Math.max(
        0,
        rect.bottom + currentOffset.current - window.innerHeight + 40
      );
    }

    // Wheel (mouse / trackpad)
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (!sceneRef.current) return;
      const next = Math.min(
        maxOffset.current,
        Math.max(0, currentOffset.current + e.deltaY)
      );
      currentOffset.current = next;
      sceneRef.current.style.transition = "transform 0.08s ease-out";
      sceneRef.current.style.transform = `translateY(-${next}px)`;
    }

    // Touch (mobile)
    let touchY = 0;
    let touchOffset = 0;

    function handleTouchStart(e: TouchEvent) {
      touchY = e.touches[0].clientY;
      touchOffset = currentOffset.current;
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (!sceneRef.current) return;
      const delta = touchY - e.touches[0].clientY;
      const next = Math.min(
        maxOffset.current,
        Math.max(0, touchOffset + delta)
      );
      currentOffset.current = next;
      sceneRef.current.style.transition = "none";
      sceneRef.current.style.transform = `translateY(-${next}px)`;
    }

    // Recalc max offset on resize
    function handleResize() {
      if (chatWrapRef.current) {
        const rect = chatWrapRef.current.getBoundingClientRect();
        maxOffset.current = Math.max(
          0,
          rect.bottom + currentOffset.current - window.innerHeight + 40
        );
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [typingDone]);

  const navigate = useCallback(
    (href: string) => router.push(href),
    [router]
  );

  /* Build CSS class for square */
  const sqClass = [
    styles.redSquare,
    phase === "intro" ? styles.squareEnter : "",
    phase === "breathing" ? styles.squarePulse : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* Build CSS class for hydrant */
  const hyClass = [
    styles.hydrant,
    phase === "intro" ? styles.hydrantEnter : "",
    phase === "breathing" ? styles.hydrantPulse : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.page}>
      <div ref={sceneRef} className={styles.scene}>
        <StarsCanvas count={600} className={styles.stars} />

        {/* ---- Red square ---- */}
        <div
          ref={squareRef}
          className={sqClass}
          onClick={handleBoxClick}
          style={{
            cursor: phase === "breathing" ? "pointer" : "default",
            pointerEvents: phase === "breathing" ? "auto" : "none",
          }}
        />

        {/* ---- Hydrant image ---- */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={hydrantRef}
          src="/a.png"
          alt="Silver fire hydrant"
          className={hyClass}
          draggable={false}
        />

        {/* ---- Click zone (breathing phase) ---- */}
        <div
          className={styles.hoverZone}
          style={{
            pointerEvents: phase === "breathing" ? "auto" : "none",
          }}
          onClick={handleBoxClick}
        />

        {/* ---- Click hint ---- */}
        <p
          className={styles.clickHint}
          style={{
            opacity: showHint && phase === "breathing" ? 1 : 0,
            transform: `translate(-50%, 0) ${showHint ? "translateY(0)" : "translateY(8px)"}`,
          }}
        >
          click the box
        </p>

        {/* ---- Ask AI button ---- */}
        <button
          className={styles.askBtn}
          style={{
            opacity: showAskBtn ? 1 : 0,
            transform: `translate(-50%, 0) ${showAskBtn ? "translateY(0)" : "translateY(12px)"}`,
            pointerEvents: showAskBtn ? "auto" : "none",
          }}
          onClick={handleAskClick}
        >
          {AI_CHAT.buttonLabel}
        </button>

        {/* ---- Black box with stars (chat phase) ---- */}
        <div ref={blackBoxRef} className={styles.blackBox}>
          <div className={styles.blackBoxStars}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className={styles.miniStar}
                style={{
                  top: `${(10 + Math.random() * 80).toFixed(1)}%`,
                  left: `${(10 + Math.random() * 80).toFixed(1)}%`,
                  animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ---- Menu (chat phase) ---- */}
        <div
          className={styles.menuSide}
          style={{
            opacity: showMenu ? 1 : 0,
            transform: showMenu
              ? "translateY(-50%)"
              : "translateY(-50%) translateX(-12px)",
            pointerEvents: showMenu ? "auto" : "none",
          }}
        >
          {[
            { label: "Services", href: "/services" },
            { label: "Founders", href: "/founders" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <button
              key={item.href}
              className={styles.menuBtn}
              onClick={() => navigate(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ---- Chat area ---- */}
        <div
          ref={chatWrapRef}
          className={styles.chatWrap}
          style={{
            opacity: showChat ? 1 : 0,
            transform: `translateX(-50%) ${showChat ? "translateY(0)" : "translateY(24px)"}`,
            pointerEvents: showChat ? "auto" : "none",
          }}
        >
          {showChat && <ChatInterface onComplete={() => setTypingDone(true)} />}
        </div>
      </div>
    </div>
  );
}
