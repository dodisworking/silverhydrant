import type { TransitionConfig, TransitionKey, RoutePath } from "./types";

/* ------------------------------------------------------------------ */
/*  Transition registry – keyed by "from -> to"                       */
/*  Fall back to a sensible default for any undefined pair.           */
/* ------------------------------------------------------------------ */

const custom: Partial<Record<TransitionKey, TransitionConfig>> = {
  /* Home -> Services:  black box expands then reveals icons */
  "/->/services": {
    exitDuration: 0.6,
    enterDuration: 0.8,
    exit: { opacity: 0, scale: 1.05 },
    enter: {
      opacity: 1,
      clipPath: "circle(0% at 50% 50%)",
    },
  },
  /* Services -> Home */
  "/services->/": {
    exitDuration: 0.5,
    enterDuration: 0.6,
    exit: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1 },
  },
  /* Home -> Founders */
  "/->/founders": {
    exitDuration: 0.5,
    enterDuration: 0.7,
    exit: { opacity: 0, y: "-8%" },
    enter: { opacity: 1, y: "0%" },
  },
  /* Home -> Contact */
  "/->/contact": {
    exitDuration: 0.4,
    enterDuration: 0.6,
    exit: { opacity: 0 },
    enter: { opacity: 1 },
  },
};

const DEFAULT_TRANSITION: TransitionConfig = {
  exitDuration: 0.4,
  enterDuration: 0.5,
  exit: { opacity: 0 },
  enter: { opacity: 1 },
};

export function getTransition(
  from: RoutePath,
  to: RoutePath
): TransitionConfig {
  const key: TransitionKey = `${from}->${to}`;
  return custom[key] ?? DEFAULT_TRANSITION;
}
