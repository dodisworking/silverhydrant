"use client";

import { useEffect, useRef, memo } from "react";

interface Props {
  count?: number;
  className?: string;
}

/**
 * Lightweight canvas-based star field.
 * Renders once and runs a simple RAF loop — no DOM nodes per star.
 */
function StarsCanvasInner({ count = 600, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    interface Star {
      x: number;
      y: number;
      r: number;
      /** phase offset for twinkle */
      phase: number;
      /** speed multiplier  */
      speed: number;
      /** base opacity */
      baseAlpha: number;
    }

    let stars: Star[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        baseAlpha: 0.4 + Math.random() * 0.6,
      }));
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle =
          0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx!.globalAlpha = s.baseAlpha * twinkle;
        ctx!.fillStyle = "#fff";
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export const StarsCanvas = memo(StarsCanvasInner);
