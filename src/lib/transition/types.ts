/* Transition system types */

export type RoutePath = "/" | "/services" | "/founders" | "/contact";

export interface TransitionConfig {
  /** Duration of the exit phase in seconds */
  exitDuration: number;
  /** Duration of the enter phase in seconds */
  enterDuration: number;
  /** Framer-motion variants for the exiting page wrapper */
  exit: {
    opacity?: number;
    scale?: number;
    x?: number | string;
    y?: number | string;
    clipPath?: string;
  };
  /** Framer-motion variants for the entering page wrapper */
  enter: {
    opacity?: number;
    scale?: number;
    x?: number | string;
    y?: number | string;
    clipPath?: string;
  };
}

export type TransitionKey = `${RoutePath}->${RoutePath}`;
