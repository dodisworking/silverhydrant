/* ------------------------------------------------------------------ */
/*  All copy & data for the Silver Hydrant site in one place          */
/* ------------------------------------------------------------------ */

export const SITE = {
  title: "Silver Hydrant | AI Consulting Firm",
  description:
    "Silver Hydrant is a purpose-driven, human-centered AI consulting firm guiding companies to confidently evolve and lead in the AI future.",
  email: "SilverHydrantAI@gmail.com",
};

/* ---- AI Chat ---------------------------------------------------- */

export const AI_CHAT = {
  userMessage: "hello, what is Silver Hydrant?",
  buttonLabel: "Ask Hydrant Ai who we are",

  /** Plain-text version (fallback / SSR) */
  responsePlain: `Silver Hydrant is a team of consultants inspired by a simple but powerful idea.
In Beverly Hills, fire hydrants were painted silver so firefighters could instantly spot what mattered most when lives were on the line. That same philosophy guides how we approach AI consulting today.
In a world flooded with noise, hype, and endless tools, we focus on clarity. We identify the leverage points. We spotlight the systems and decisions that actually move the needle.
Silver Hydrant helps brands apply AI with precision and purpose to streamline operations, unlock efficiency, and create real competitive advantage.
We do not add complexity.
We remove it.
We paint what matters.`,

  /** HTML-formatted version used in the typing animation */
  responseFormatted: `<strong>Silver Hydrant</strong> is a team of consultants inspired by a <strong>simple but powerful idea</strong>.<br><br>
In Beverly Hills, fire hydrants were painted silver so firefighters could instantly spot what <strong>mattered most</strong> when lives were on the line. That same <strong>philosophy</strong> guides how we approach <strong>AI consulting</strong> today.<br><br>
In a world flooded with noise, hype, and endless tools, we focus on <strong>clarity</strong>. We identify the <strong>leverage points</strong>. We spotlight the systems and decisions that actually <strong>move the needle</strong>.<br><br>
Silver Hydrant helps brands apply AI with <strong>precision and purpose</strong> to streamline operations, unlock efficiency, and create real <strong>competitive advantage</strong>.<br><br>
<strong>We do not add complexity.</strong><br>
<strong>We remove it.</strong><br>
<strong>We paint what matters.</strong>`,
};

/* ---- Services / offerings --------------------------------------- */

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string; // path under /assets/icons/
}

export const SERVICES: Service[] = [
  {
    slug: "consulting",
    title: "AI Consulting",
    description:
      "Strategic AI consulting to spot the highest-value opportunities, manage risk, and build real capability.",
    icon: "/assets/icons/consulting.png",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    description:
      "AI-powered creator strategy and execution to find the right partners, optimize performance, and drive measurable growth.",
    icon: "/assets/icons/influencer-marketing.png",
  },
  {
    slug: "product-management",
    title: "Product Management",
    description:
      "End-to-end AI product development from concept to launch, focused on real user problems and adoption.",
    icon: "/assets/icons/product-management.png",
  },
  {
    slug: "purpose-ideation",
    title: "Purpose Ideation",
    description:
      "Purpose-led brand strategy that clarifies what you stand for and turns it into direction, messaging, and momentum.",
    icon: "/assets/icons/purpose-ideation.png",
  },
  {
    slug: "off-menu",
    title: "Off-Menu",
    description:
      "Custom builds for your specific challenge. If it's not listed, we'll design it.",
    icon: "/assets/icons/off-menu.png",
  },
];

/* ---- Founders ---------------------------------------------------- */

export const FOUNDERS = {
  heading: "About the Founders",
  paragraphs: [
    "Silver Hydrant was founded to help brands focus on what matters most.",
    "Our name comes from Beverly Hills painting fire hydrants silver so they'd stand out in an emergency. We use the same principle in business: cut through the noise, find the signal, and act on it.",
    "Between us, we've spent the last decade building across advertising, marketing, production, AI, product, web, software, and research. We spotlight the moments and decisions that move people and performance, so teams move faster, communicate with clarity, and create real, positive impact.",
  ],
  brandExperienceIntro:
    "Our experience includes these and many more brands. We think we are ready for yours.",
  brands: [
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Walt_Disney_company_logo.svg", alt: "Disney" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Coca-Cola_logo.svg", alt: "Coca-Cola" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/American_Express_logo_(2018).svg", alt: "American Express" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Chase_logo_2007.svg", alt: "Chase" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Verizon_2024.svg", alt: "Verizon" },
    { src: "https://upload.wikimedia.org/wikipedia/en/b/b9/New_England_Patriots_logo.svg", alt: "New England Patriots" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ikea_logo.svg", alt: "IKEA" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Dove_(2004).svg", alt: "Dove" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/H%26R_Block_2013_logo.svg", alt: "H&R Block" },
  ],
};
