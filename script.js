/**
 * Silver Hydrant - Main JavaScript
 * Handles animations, interactions, and state management
 */

/* ============================================================================
   STARS GENERATION
   ============================================================================ */

// Star settings with defaults
let starSettings = {
  numStars: 600,
  baseDuration: 6,
  starSize: 4,
  streamDelay: 0.02,
  distanceMultiplier: 2.5,
  endScale: 1.5  // Much smaller end scale to keep stars small
};

function createStars(settings = starSettings) {
  const container = document.getElementById('starsContainer');
  if (!container) return;
  
  // Clear existing stars
  container.innerHTML = '';
  
  // Create varied density - some areas dense, some sparse
  const numStars = settings.numStars;
  const sizes = ['small']; // Only small stars
  
  // Create clusters and sparse areas
  const clusters = 8; // Number of dense star clusters
  const clusterStars = Math.floor(numStars * 0.6); // 60% in clusters
  const sparseStars = numStars - clusterStars; // 40% scattered
  
  // Create dense clusters
  for (let c = 0; c < clusters; c++) {
    const clusterX = Math.random() * 100;
    const clusterY = Math.random() * 100;
    const clusterSize = 15 + Math.random() * 20; // Cluster radius in %
    const starsInCluster = Math.floor(clusterStars / clusters);
    
    for (let i = 0; i < starsInCluster; i++) {
      const star = document.createElement('div');
      const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
      star.className = `star ${sizeClass}`;
      
      // Keep stars small - maximum 4px
      const maxSize = 4;
      const currentSize = sizeClass === 'small' ? settings.starSize * 0.75 : settings.starSize;
      const finalSize = Math.min(currentSize, maxSize);
      // Force equal width and height for perfect circle
      star.style.width = `${finalSize}px`;
      star.style.height = `${finalSize}px`;
      star.style.minWidth = `${finalSize}px`;
      star.style.minHeight = `${finalSize}px`;
      star.style.maxWidth = `${finalSize}px`;
      star.style.maxHeight = `${finalSize}px`;
      
      // Position within cluster with some spread
      const clusterAngle = Math.random() * Math.PI * 2;
      const clusterDist = Math.random() * clusterSize;
      const x = clusterX + Math.cos(clusterAngle) * clusterDist;
      const y = clusterY + Math.sin(clusterAngle) * clusterDist;
      
      // Calculate direction from center
      const centerX = 50;
      const centerY = 50;
      const dx = x - centerX;
      const dy = y - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate final position (where star should end up)
      const finalX = x;
      const finalY = y;
      
      // Position star at center initially
      star.style.left = '50%';
      star.style.top = '50%';
      star.style.transformOrigin = 'center center';
      
      // Calculate distance from center for speed variation
      const maxDistance = Math.sqrt(Math.pow(50, 2) + Math.pow(50, 2));
      const normalizedDist = distance / maxDistance;
      
      // Calculate animation duration - stars closer to center move faster
      const baseDuration = settings.baseDuration;
      const durationVariation = 3;
      const parallaxDuration = baseDuration + (normalizedDist * durationVariation);
      
      // Calculate movement distance in viewport percentage
      const moveX = (finalX - 50) * settings.distanceMultiplier;
      const moveY = (finalY - 50) * settings.distanceMultiplier;
      
      // Create unique animation name for this star's direction
      const animName = `parallax-${Math.floor(angle * 1000)}`;
      
      // Create keyframe animation dynamically
      if (!document.getElementById(`style-${animName}`)) {
        const style = document.createElement('style');
        style.id = `style-${animName}`;
        style.textContent = `
          @keyframes ${animName} {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            100% {
              transform: translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${Math.min(settings.endScale, 1.5)});
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Continuous stream - each star appears right after the previous one
      const streamDelay = (c * (clusterStars / clusters) + i) * settings.streamDelay;
      
      // Use ease-out timing for fast start, slow end
      star.style.animation = `twinkle 2s infinite, ${animName} ${parallaxDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`;
      star.style.animationDelay = `${streamDelay}s, ${streamDelay}s`;
      star.style.animationDelay = `${streamDelay}s`;
      
      container.appendChild(star);
    }
  }
  
  // Create sparse scattered stars
  for (let i = 0; i < sparseStars; i++) {
    const star = document.createElement('div');
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    star.className = `star ${sizeClass}`;
    
    // Keep stars small - maximum 4px
    const maxSize = 4;
    const currentSize = sizeClass === 'small' ? settings.starSize * 0.75 : settings.starSize;
    const finalSize = Math.min(currentSize, maxSize);
    // Force equal width and height for perfect circle
    star.style.width = `${finalSize}px`;
    star.style.height = `${finalSize}px`;
    star.style.minWidth = `${finalSize}px`;
    star.style.minHeight = `${finalSize}px`;
    star.style.maxWidth = `${finalSize}px`;
    star.style.maxHeight = `${finalSize}px`;
    
    // Random position but with lower probability in some areas
    let x, y;
    if (Math.random() < 0.3) {
      // 30% chance to be in a sparse area (avoiding clusters)
      x = Math.random() * 100;
      y = Math.random() * 100;
    } else {
      // Regular random distribution
      x = Math.random() * 100;
      y = Math.random() * 100;
    }
    
    // Calculate direction from center
    const centerX = 50;
    const centerY = 50;
    const dx = x - centerX;
    const dy = y - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate final position (where star should end up)
    const finalX = x;
    const finalY = y;
    
    // Position star at center initially
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.transformOrigin = 'center center';
    
    // Calculate distance from center for speed variation
    const maxDistance = Math.sqrt(Math.pow(50, 2) + Math.pow(50, 2));
    const normalizedDist = distance / maxDistance;
    
    // Calculate animation duration - stars closer to center move faster
    const baseDuration = settings.baseDuration;
    const durationVariation = 3;
    const parallaxDuration = baseDuration + (normalizedDist * durationVariation);
    
    // Calculate movement distance in viewport percentage
    const moveX = (finalX - 50) * settings.distanceMultiplier;
    const moveY = (finalY - 50) * settings.distanceMultiplier;
    
    // Create unique animation name for this star's direction
    const animName = `parallax-${Math.floor(angle * 1000)}`;
    
    // Create keyframe animation dynamically
    if (!document.getElementById(`style-${animName}`)) {
      const style = document.createElement('style');
      style.id = `style-${animName}`;
      style.textContent = `
        @keyframes ${animName} {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
          }
          100% {
            transform: translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${settings.endScale});
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Continuous stream - each star appears right after the previous one
    const streamDelay = (clusterStars + i) * settings.streamDelay;
    
    // Use ease-out timing for fast start, slow end
    star.style.animation = `twinkle 2s infinite, ${animName} ${parallaxDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`;
    star.style.animationDelay = `${streamDelay}s, ${streamDelay}s`;
    star.style.animationDelay = `${streamDelay}s`;
    
    container.appendChild(star);
  }
}

/* ============================================================================
   CUSTOM CURSOR INITIALIZATION
   ============================================================================ */

(function initCursor() {
  const hotspotX = 16,
    hotspotY = 16;
  // Prefer relative paths so GitHub Pages subpaths work
  const srcs = ["./silver-hand.png", "silver-hand.png", "public/silver-hand.png"];
  const tryLoad = (i) => {
    if (i >= srcs.length) return;
    const img = new Image();
    img.onload = () => {
      const w = 64,
        h = 64,
        cv = document.createElement("canvas"),
        ctx = cv.getContext("2d");
      cv.width = w;
      cv.height = h;
      const r = Math.min(w / img.width, h / img.height),
        dw = Math.round(img.width * r),
        dh = Math.round(img.height * r);
      const dx = Math.round((w - dw) / 2),
        dy = Math.round((h - dh) / 2);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
      const url = cv.toDataURL("image/png");
      document.documentElement.style.setProperty(
        "--cursor",
        `url("${url}") ${hotspotX} ${hotspotY}, auto`
      );
    };
    img.onerror = () => tryLoad(i + 1);
    img.src = srcs[i] + "?v=" + Date.now();
  };
  tryLoad(0);
})();


/* ============================================================================
   CSS TIMING UTILITIES
   ============================================================================ */

function getCSSVariable(varName) {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(varName)
  );
}

function getTimingMs(varName, fallback = 1000) {
  return Math.round(getCSSVariable(varName) * 1000) || fallback;
}

const timing = {
  fade: getTimingMs("--fade", 1200),
  gap: getTimingMs("--gap", 0),
  hold: getTimingMs("--hold", 3000),
  rise: getTimingMs("--rise", 950),
  push: getTimingMs("--push", 700),
  appear: getTimingMs("--appear", 450),
  crossfade: getTimingMs("--crossfade", 600),
};

/* ============================================================================
   DOM ELEMENTS
   ============================================================================ */

const elements = {
  intro: document.getElementById("intro"),
  introLine: document.getElementById("introLine"),
  hydrantDiv: document.getElementById("hydrant"),
  header: document.getElementById("topHeader"),
  btnHydrant: document.getElementById("hydrantBtn"),
  skipBtn: document.getElementById("skipBtn"),
  stage: document.getElementById("stage"),
  videoSection: document.getElementById("videoSection"),
  videoBlock: document.getElementById("videoBlock"),
  videoFrame: document.getElementById("videoFrame"),
  videoCta: document.getElementById("videoCta"),
  btnSummarize: document.getElementById("btnSummarize"),
  nextCta: document.getElementById("nextCta"),
  btnNext: document.getElementById("btnNext"),
  inlineServices: document.getElementById("inlineServices"),
  btnInspect: document.getElementById("btnInspect"),
  btnInstall: document.getElementById("btnInstall"),
  svcPanel: document.getElementById("svcPanel"),
  svcTitle: document.getElementById("svcTitle"),
  svcBody: document.getElementById("svcBody"),
};

// Check if old page elements exist
const hasOldPage = elements.intro && elements.hydrantDiv;

/* ============================================================================
   INTRO SEQUENCE
   ============================================================================ */

function skipIntro() {
  if (!hasOldPage || !elements.intro) return;
  const groups = [
    [elements.intro.querySelector(".sh"), elements.intro.querySelector(".rest-space-1")],
    [elements.intro.querySelector(".aicf")],
    [elements.intro.querySelector(".human")],
    [elements.intro.querySelector(".future")],
    Array.from(elements.intro.querySelectorAll(".rest")),
  ];
  
  // Skip to hydrant immediately
  groups.flat().forEach((el) => el && el.classList.add("show"));
  if (elements.introLine) elements.introLine.classList.add("pushaway");
  if (elements.hydrantDiv) elements.hydrantDiv.classList.add("ready");
  
  // Hide intro after pushaway animation
  setTimeout(() => {
    if (elements.intro) elements.intro.style.display = "none";
  }, timing.push);
}

function initIntro() {
  if (!hasOldPage || !elements.intro) return;
  const groups = [
    [elements.intro.querySelector(".sh"), elements.intro.querySelector(".rest-space-1")],
    [elements.intro.querySelector(".aicf")],
    [elements.intro.querySelector(".human")],
    [elements.intro.querySelector(".future")],
    Array.from(elements.intro.querySelectorAll(".rest")),
  ];

  // Handle reduced motion preferences
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    groups.flat().forEach((el) => el && el.classList.add("show"));
    if (elements.introLine) elements.introLine.classList.add("pushaway");
    if (elements.hydrantDiv) elements.hydrantDiv.classList.add("ready");
    if (elements.intro) elements.intro.style.display = "none";
    return;
  }

  // Animated sequence
  let t = 0;
  groups.forEach((group) => {
    setTimeout(() => {
      group.forEach((el) => el && el.classList.add("show"));
    }, t);
    t += timing.fade + timing.gap;
  });

  setTimeout(() => {
    if (elements.introLine) elements.introLine.classList.add("pushaway");
    if (elements.hydrantDiv) elements.hydrantDiv.classList.add("ready");
  }, t + timing.hold);

  const total = t + timing.hold + Math.max(timing.rise, timing.push) + 100;
  setTimeout(() => {
    if (elements.intro) elements.intro.style.display = "none";
  }, total);
}

/* ============================================================================
   STATE MANAGEMENT
   ============================================================================ */

let appState = {
  revealed: false,
};

/* ============================================================================
   HYDANT CLICK HANDLER - MAIN REVEAL ANIMATION
   ============================================================================ */

function handleHydrantClick() {
  if (!hasOldPage) return;
  if (appState.revealed) return;
  appState.revealed = true;

  // Reset scroll position
  window.scrollTo(0, 0);

  // Show header
  elements.header.classList.add("show");
  requestAnimationFrame(() => {
    const headerHeight = Math.ceil(elements.header.getBoundingClientRect().height || 64);
    document.documentElement.style.setProperty("--headerH", `${headerHeight}px`);
  });

  // Calculate stage height for smooth transition
  const stageHeight = Math.ceil(elements.stage.getBoundingClientRect().height);

  // Create spacer to maintain layout during animation
  const spacer = document.createElement("div");
  spacer.id = "pushSpacer";
  spacer.style.height = `${stageHeight}px`;
  spacer.style.transition = `height ${timing.rise}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  elements.stage.insertAdjacentElement("afterend", spacer);

  // Make video visible for animation
  elements.videoBlock.classList.add("in");

  // Start reveal animation
  requestAnimationFrame(() => {
    elements.hydrantDiv.classList.remove("ready");
    elements.hydrantDiv.classList.add("out");
    elements.videoSection.style.transform = `translateY(-${stageHeight}px)`;
    spacer.style.height = "0px";
  });

  // Cleanup after animation completes
  let finished = false;
  const finishRide = () => {
    if (finished) return;
    finished = true;

    // Reset transform to keep video in view after layout change, offset 6px to left
    const prevTransition = elements.videoSection.style.transition;
    elements.videoSection.style.transition = "none";
    elements.videoSection.style.transform = "translate(-6px, 0)";
    void elements.videoSection.offsetWidth; // Force reflow
    elements.videoSection.style.transition = prevTransition;

    // Remove stage and spacer
    elements.stage.style.display = "none";
    spacer.remove();
    
    // Restore transition
    elements.videoSection.style.transition = prevTransition;
    
    // Show the button with gradual fade-in after snap
    setTimeout(() => {
      elements.videoCta.classList.add("in");
      // Don't show nextCta yet - only after clicking summarize or video
    }, 300);
  };

  // Wait for both video section and spacer to finish
  let videoDone = false;
  let spacerDone = false;
  
  const checkDone = () => {
    if (videoDone && spacerDone) {
      finishRide();
    }
  };
  
  const onVideoEnd = (e) => {
    if (e.propertyName !== "transform") return;
    elements.videoSection.removeEventListener("transitionend", onVideoEnd);
    videoDone = true;
    checkDone();
  };
  
  const onSpacerEnd = (e) => {
    if (e.propertyName !== "height") return;
    spacer.removeEventListener("transitionend", onSpacerEnd);
    spacerDone = true;
    checkDone();
  };
  
  elements.videoSection.addEventListener("transitionend", onVideoEnd);
  spacer.addEventListener("transitionend", onSpacerEnd);

  // Fallback timer for Safari/edge cases
  setTimeout(finishRide, timing.rise + 80);
}



/* ============================================================================
   AI SUMMARY - TYPEWRITER EFFECT
   ============================================================================ */

const TYPE_SPEED_ORIGINAL = 18;

const summaryText = `This video traces the history of Beverly Hills and the story behind its iconic silver fire hydrants, painted to be more visible when it matters. The hydrants were always there, but they only became valuable once someone invested care to make them stand out.
AI is similar. It is everywhere, but often overlooked until it is integrated with intention. Our mission is to turn the hydrants in your business into silver hydrants so your AI is visible, useful, and dependable.`;

function typeText(el, text, done) {
  el.textContent = "";
  el.classList.add("visible");
  let i = 0;
  (function tick() {
    el.textContent += text[i] || "";
    i++;
    if (i < text.length) setTimeout(tick, TYPE_SPEED_ORIGINAL);
    else if (done) done();
  })();
}

function handleSummarize() {
  const cta = elements.videoCta;
  cta.style.transition = "opacity 200ms ease";
  cta.style.opacity = "0";
  cta.style.pointerEvents = "none"; // Disable while fading out

  setTimeout(() => {
    cta.style.display = "none";
    
    // Show summary text in the meta-rail
    const summaryDiv = document.createElement("div");
    summaryDiv.className = "ai-summary";
    summaryDiv.id = "aiSummary";
    summaryDiv.style.marginTop = "12px";
    elements.videoBlock.querySelector(".meta-rail").appendChild(summaryDiv);
    
    typeText(summaryDiv, summaryText, () => {
      // Show "what we can do" CTA after summary
      setTimeout(() => elements.nextCta.classList.add("show"), 300);
    });
  }, 200);
}

/* ============================================================================
   SERVICE OFFERINGS FLOW
   ============================================================================ */

function handleNextClick() {
  elements.nextCta.classList.remove("show");
  elements.nextCta.setAttribute("aria-hidden", "true");
  elements.inlineServices.setAttribute("aria-hidden", "false");
  elements.inlineServices.classList.add("show");
}

const SERVICE_DATA = {
  install: {
    title: "Hydrant Installation",
    body: "We implement end to end. We map workflows, select tools, connect data, ship secure pipelines, and train your team to run with confidence.",
  },
  inspect: {
    title: "Hydrant Inspection",
    body: "We audit how AI can deliver value. You get gaps, risks, quick wins, and a clear roadmap to move your org toward an AI future.",
  },
};

function openPanel(which) {
  const data = SERVICE_DATA[which];
  if (!data) return;

  // Hide AI summary if it exists
  const summaryEl = document.getElementById("aiSummary");
  if (summaryEl) {
    summaryEl.style.transition = "opacity 200ms ease";
    summaryEl.style.opacity = "0";
    setTimeout(() => {
      summaryEl.remove();
    }, 200);
  }

  elements.svcTitle.textContent = data.title;
  elements.svcBody.textContent = data.body;
  elements.svcPanel.classList.add("open");
  elements.svcPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ============================================================================
   EVENT LISTENERS
   ============================================================================ */

function initEventListeners() {
  if (!hasOldPage) return;
  if (elements.btnHydrant) elements.btnHydrant.addEventListener("click", handleHydrantClick, { passive: true });
  if (elements.skipBtn) elements.skipBtn.addEventListener("click", skipIntro);
  if (elements.btnSummarize) elements.btnSummarize.addEventListener("click", handleSummarize);
  if (elements.btnNext) elements.btnNext.addEventListener("click", (e) => {
    e.stopPropagation();
    handleNextClick();
  });
  if (elements.btnInspect) elements.btnInspect.addEventListener("click", () => openPanel("inspect"));
  if (elements.btnInstall) elements.btnInstall.addEventListener("click", () => openPanel("install"));
  if (elements.videoFrame) elements.videoFrame.addEventListener("click", () => {
    if (
      elements.inlineServices && !elements.inlineServices.classList.contains("show") &&
      elements.nextCta && !elements.nextCta.classList.contains("show")
    ) {
      elements.nextCta.classList.add("show");
    }
  });
}

/* ============================================================================
   INITIALIZATION
   ============================================================================ */

function init() {
  if (hasOldPage) {
    initIntro();
    initEventListeners();
  }
}

/* ============================================================================
   CONTROL PANEL SETUP
   ============================================================================ */

function setupControlPanel() {
  const numStarsSlider = document.getElementById('numStarsSlider');
  const speedSlider = document.getElementById('speedSlider');
  const sizeSlider = document.getElementById('sizeSlider');
  const delaySlider = document.getElementById('delaySlider');
  const distanceSlider = document.getElementById('distanceSlider');
  const scaleSlider = document.getElementById('scaleSlider');
  const resetBtn = document.getElementById('resetBtn');
  
  // Update value displays
  function updateDisplay() {
    document.getElementById('numStarsValue').textContent = starSettings.numStars;
    document.getElementById('speedValue').textContent = starSettings.baseDuration + 's';
    document.getElementById('sizeValue').textContent = starSettings.starSize + 'px';
    document.getElementById('delayValue').textContent = starSettings.streamDelay + 's';
    document.getElementById('distanceValue').textContent = starSettings.distanceMultiplier + 'x';
    document.getElementById('scaleValue').textContent = starSettings.endScale + 'x';
  }
  
  // Update star size in CSS
  function updateStarSize() {
    const size = starSettings.starSize;
    document.documentElement.style.setProperty('--star-size', `${size}px`);
    document.documentElement.style.setProperty('--star-size-small', `${size * 0.67}px`);
    document.documentElement.style.setProperty('--star-size-medium', `${size * 1.0}px`);
  }
  
  // Debounce function for performance
  let updateTimeout;
  function debouncedUpdate() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      createStars(starSettings);
      updateStarSize();
    }, 150);
  }
  
  // Number of Stars
  numStarsSlider.addEventListener('input', (e) => {
    starSettings.numStars = parseInt(e.target.value);
    updateDisplay();
    debouncedUpdate();
  });
  
  // Animation Speed
  speedSlider.addEventListener('input', (e) => {
    starSettings.baseDuration = parseFloat(e.target.value);
    updateDisplay();
    debouncedUpdate();
  });
  
  // Star Size
  sizeSlider.addEventListener('input', (e) => {
    starSettings.starSize = parseFloat(e.target.value);
    updateDisplay();
    updateStarSize();
  });
  
  // Stream Delay
  delaySlider.addEventListener('input', (e) => {
    starSettings.streamDelay = parseFloat(e.target.value);
    updateDisplay();
    debouncedUpdate();
  });
  
  // Travel Distance
  distanceSlider.addEventListener('input', (e) => {
    starSettings.distanceMultiplier = parseFloat(e.target.value);
    updateDisplay();
    debouncedUpdate();
  });
  
  // End Scale
  scaleSlider.addEventListener('input', (e) => {
    starSettings.endScale = parseFloat(e.target.value);
    updateDisplay();
    debouncedUpdate();
  });
  
  // Preset definitions
  const presets = {
    dense: {
      numStars: 1500,
      baseDuration: 6,
      starSize: 1.5,
      streamDelay: 0.015,
      distanceMultiplier: 2.5,
      endScale: 4
    },
    fast: {
      numStars: 1000,
      baseDuration: 2.5,
      starSize: 1.8,
      streamDelay: 0.01,
      distanceMultiplier: 3,
      endScale: 5
    },
    slow: {
      numStars: 600,
      baseDuration: 10,
      starSize: 1.0,
      streamDelay: 0.03,
      distanceMultiplier: 1.5,
      endScale: 2.5
    },
    subtle: {
      numStars: 400,
      baseDuration: 8,
      starSize: 3,
      streamDelay: 0.04,
      distanceMultiplier: 2,
      endScale: 2
    },
    intense: {
      numStars: 2000,
      baseDuration: 3,
      starSize: 2.0,
      streamDelay: 0.008,
      distanceMultiplier: 4,
      endScale: 6
    }
  };
  
  // Apply preset
  function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    starSettings = { ...preset };
    
    numStarsSlider.value = starSettings.numStars;
    speedSlider.value = starSettings.baseDuration;
    sizeSlider.value = starSettings.starSize;
    delaySlider.value = starSettings.streamDelay;
    distanceSlider.value = starSettings.distanceMultiplier;
    scaleSlider.value = starSettings.endScale;
    
    updateDisplay();
    createStars(starSettings);
    updateStarSize();
  }
  
  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetName = btn.dataset.preset;
      applyPreset(presetName);
    });
  });
  
  // Reset button
  resetBtn.addEventListener('click', () => {
    starSettings = {
      numStars: 800,
      baseDuration: 5,
      starSize: 3,
      streamDelay: 0.02,
      distanceMultiplier: 2,
      endScale: 3
    };
    
    numStarsSlider.value = starSettings.numStars;
    speedSlider.value = starSettings.baseDuration;
    sizeSlider.value = starSettings.starSize;
    delaySlider.value = starSettings.streamDelay;
    distanceSlider.value = starSettings.distanceMultiplier;
    scaleSlider.value = starSettings.endScale;
    
    updateDisplay();
    createStars(starSettings);
    updateStarSize();
  });
  
  // Initial display update
  updateDisplay();
  updateStarSize();
}

/* ============================================================================
   HOVER EFFECT - BURST OF STARS
   ============================================================================ */

function createStarBurst() {
  const container = document.getElementById('starsContainer');
  if (!container) return;
  
  const numBurstStars = 30;
  const sizes = ['small'];
  
  for (let i = 0; i < numBurstStars; i++) {
    const star = document.createElement('div');
    star.className = `star ${sizes[0]}`;
    
    // Random angle for burst
    const angle = (Math.random() * Math.PI * 2);
    const distance = 30 + Math.random() * 20; // Random distance from center
    
    // Calculate final position
    const finalX = 50 + Math.cos(angle) * distance;
    const finalY = 50 + Math.sin(angle) * distance;
    
    // Position star at center initially
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.transformOrigin = 'center center';
    
    // Calculate movement distance
    const moveX = (finalX - 50) * starSettings.distanceMultiplier;
    const moveY = (finalY - 50) * starSettings.distanceMultiplier;
    
    // Create unique animation name
    const animName = `burst-${Date.now()}-${i}`;
    
    // Create keyframe animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animName} {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        5% {
          opacity: 1;
        }
        100% {
          transform: translate(calc(-50% + ${moveX}vw), calc(-50% + ${moveY}vh)) scale(${Math.min(starSettings.endScale, 1.5)});
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Set size
    const finalSize = 4;
    star.style.width = `${finalSize}px`;
    star.style.height = `${finalSize}px`;
    star.style.minWidth = `${finalSize}px`;
    star.style.minHeight = `${finalSize}px`;
    star.style.maxWidth = `${finalSize}px`;
    star.style.maxHeight = `${finalSize}px`;
    
    // Fast animation for burst effect
    const duration = 2;
    star.style.animation = `twinkle 2s infinite, ${animName} ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    
    container.appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
      star.remove();
      style.remove();
    }, duration * 1000);
  }
}

function setupHoverEffect() {
  const centerContent = document.querySelector('.center-content');
  const redSquare = document.querySelector('.red-square');
  const hydrant = document.querySelector('.center-hydrant');
  
  if (!centerContent || !redSquare || !hydrant) {
    return;
  }
  
  // Disable hover effects for the first 3 seconds
  centerContent.classList.add('hover-disabled');
  
  let squareAnimation = null;
  let hydrantAnimation = null;
  let canClick = false;
  let hasGrown = false; // Track if square has already grown to full screen
  let interactionsDisabled = false; // Track if all interactions should be disabled
  
  // Enable hover and clicking after 3 seconds (initial animation period)
  setTimeout(() => {
    centerContent.classList.remove('hover-disabled');
    canClick = true;
  }, 3000);
  
  // Show click hint after 5.5 seconds
  setTimeout(() => {
    const clickHint = document.getElementById('clickHint');
    if (clickHint) {
      clickHint.classList.add('show');
    }
  }, 5500);
  
  centerContent.addEventListener('mouseenter', () => {
    // Disable hover if interactions are disabled or square hasn't reached pulsing state
    if (interactionsDisabled || !canClick) return;
    createStarBurst();
    
    // Get current computed transform for both square and hydrant
    const squareStyle = window.getComputedStyle(redSquare);
    const hydrantStyle = window.getComputedStyle(hydrant);
    const squareMatrix = squareStyle.transform;
    const hydrantMatrix = hydrantStyle.transform;
    
    // Pause animations
    redSquare.style.animationPlayState = 'paused';
    hydrant.style.animationPlayState = 'paused';
    
    // Get current scale for square
    let currentSquareScale = 1;
    if (squareMatrix && squareMatrix !== 'none') {
      const matrix = squareMatrix.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentSquareScale = Math.sqrt(a * a + b * b);
      }
    }
    
    // Get current scale for hydrant
    let currentHydrantScale = 1.15;
    if (hydrantMatrix && hydrantMatrix !== 'none') {
      const matrix = hydrantMatrix.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentHydrantScale = Math.sqrt(a * a + b * b);
      }
    }
    
    // Apply smooth scale increase from current position for both
    redSquare.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    hydrant.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    redSquare.style.transform = `translate(-50%, -50%) scale(${currentSquareScale * 1.15})`;
    hydrant.style.transform = `translate(-50%, -50%) scale(${currentHydrantScale * 1.13})`;
  });
  
  centerContent.addEventListener('mouseleave', () => {
    // Disable hover if interactions are disabled or square hasn't reached pulsing state
    if (interactionsDisabled || !canClick) return;
    // Resume animations smoothly
    redSquare.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    hydrant.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Remove inline transform to resume animation
    setTimeout(() => {
      redSquare.style.transform = '';
      hydrant.style.transform = '';
      redSquare.style.animationPlayState = 'running';
      hydrant.style.animationPlayState = 'running';
    }, 50);
  });
  
  // Click handler - red square grows to fill screen
  const handleSquareClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Don't allow click if initial animation hasn't completed
    if (!canClick) {
      return;
    }
    
    // Don't allow click if already grown
    if (hasGrown) {
      return;
    }
    hasGrown = true;
    interactionsDisabled = true; // Disable all interactions after click
    
    // Instantly hide click hint
    const clickHint = document.getElementById('clickHint');
    if (clickHint) {
      clickHint.style.display = 'none';
    }
    
    // CRITICAL: Get EXACT current transform states for BOTH square and hydrant BEFORE stopping animations
    // This captures the exact size they are at the moment of click (could be any size due to pulsing/hover)
    const squareStyle = window.getComputedStyle(redSquare);
    const hydrantStyle = window.getComputedStyle(hydrant);
    const squareTransform = squareStyle.transform;
    const hydrantTransform = hydrantStyle.transform;
    
    let currentSquareScale = 1;
    let currentHydrantScale = 1.15;
    
    // Calculate EXACT current scale for square from transform matrix
    if (squareTransform && squareTransform !== 'none') {
      const matrix = squareTransform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        // Calculate scale from matrix: sqrt(a^2 + b^2)
        currentSquareScale = Math.sqrt(a * a + b * b);
      }
    }
    
    // Calculate EXACT current scale for hydrant from transform matrix
    if (hydrantTransform && hydrantTransform !== 'none') {
      const matrix = hydrantTransform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        // Calculate scale from matrix: sqrt(a^2 + b^2)
        currentHydrantScale = Math.sqrt(a * a + b * b);
      }
    }
    
    // Stop ALL animations permanently
    redSquare.style.animation = 'none';
    redSquare.style.animationPlayState = 'paused';
    hydrant.style.animation = 'none';
    hydrant.style.animationPlayState = 'paused';
    
    // Disable pointer events
    centerContent.style.pointerEvents = 'none';
    redSquare.style.pointerEvents = 'none';
    redSquare.style.cursor = 'default';
    
    // Preserve exact current transforms to prevent snapping
    // CRITICAL: Use the exact transform string to preserve position
    if (squareTransform && squareTransform !== 'none') {
      redSquare.style.transform = squareTransform;
    } else {
      redSquare.style.transform = `translate(-50%, -50%) scale(${currentSquareScale})`;
    }
    
    // CRITICAL: Preserve the EXACT hydrant transform (including translate) from click position
    // This ensures it grows from exactly where it was when clicked
    if (hydrantTransform && hydrantTransform !== 'none') {
      hydrant.style.transform = hydrantTransform;
    } else {
      hydrant.style.transform = `translate(-50%, -50%) scale(${currentHydrantScale})`;
    }
    
    // Calculate target scales based on EXACT current sizes
    // Square: needs to fill screen from its current size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const diagonal = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight);
    // Calculate what scale the square needs to be to fill screen
    // Square base size is 150px, so target = (diagonal / 150) * 1.3
    const targetSquareScale = (diagonal / 150) * 1.3;
    
    // Hydrant: needs to be 2x its EXACT current size (whatever it is at click moment)
    const targetHydrantScale = currentHydrantScale * 2;
    
    // Prepare hydrant target transform - preserve translate, update scale
    let hydrantTargetTransform;
    if (hydrantTransform && hydrantTransform !== 'none') {
      // Extract translate values to preserve position
      const translateMatch = hydrantTransform.match(/translate\(([^)]+)\)/);
      if (translateMatch) {
        const translateValues = translateMatch[1];
        hydrantTargetTransform = `translate(${translateValues}) scale(${targetHydrantScale})`;
      } else {
        // Fallback to center if no translate found
        hydrantTargetTransform = `translate(-50%, -50%) scale(${targetHydrantScale})`;
      }
    } else {
      // Default center position
      hydrantTargetTransform = `translate(-50%, -50%) scale(${targetHydrantScale})`;
    }
    
    // CRITICAL: Remove any existing transitions FIRST
    redSquare.style.transition = 'none';
    hydrant.style.transition = 'none';
    
    // CRITICAL: Set transforms to EXACT current state to prevent any snapping
    // This ensures we start from the exact position/size they are at click moment
    if (squareTransform && squareTransform !== 'none') {
      redSquare.style.transform = squareTransform;
    } else {
      redSquare.style.transform = `translate(-50%, -50%) scale(${currentSquareScale})`;
    }
    
    if (hydrantTransform && hydrantTransform !== 'none') {
      hydrant.style.transform = hydrantTransform;
    } else {
      hydrant.style.transform = `translate(-50%, -50%) scale(${currentHydrantScale})`;
    }
    
    // Force multiple reflows to ensure browser has locked in the current state
    void redSquare.offsetWidth;
    void hydrant.offsetWidth;
    void redSquare.offsetHeight;
    void hydrant.offsetHeight;
    void redSquare.offsetWidth;
    void hydrant.offsetWidth;
    
    // Verify the transforms are exactly what we set
    const verifySquare = window.getComputedStyle(redSquare).transform;
    const verifyHydrant = window.getComputedStyle(hydrant).transform;
    
    if (verifySquare && verifySquare !== 'none' && verifySquare !== squareTransform) {
      redSquare.style.transform = squareTransform;
      void redSquare.offsetWidth;
    }
    
    if (verifyHydrant && verifyHydrant !== 'none' && verifyHydrant !== hydrantTransform) {
      hydrant.style.transform = hydrantTransform;
      void hydrant.offsetWidth;
    }
    
    // Enable hardware acceleration for smooth performance
    redSquare.style.willChange = 'transform';
    hydrant.style.willChange = 'transform';
    
    // Apply smooth accelerated growth transitions
    // Using a perfectly smooth ease-in curve for continuous acceleration without halting
    // cubic-bezier(0.25, 0.1, 0.25, 1) provides very smooth acceleration from slow to fast
    redSquare.style.transition = 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    hydrant.style.transition = 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Ensure browser has processed initial state, then trigger smooth animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Apply target transforms - browser will smoothly interpolate from current to target
        // This creates a continuous, smooth animation without halting
        redSquare.style.transform = `translate(-50%, -50%) scale(${targetSquareScale})`;
        hydrant.style.transform = hydrantTargetTransform;
      });
    });
    
    // Show final screen 2 seconds after click (not waiting for full animation)
    setTimeout(() => {
      showFinalScreen();
    }, 2000);
    
    // After animations complete, lock both in permanently
    setTimeout(() => {
      // Lock square at full screen
      redSquare.style.transition = 'none';
      redSquare.style.transform = `translate(-50%, -50%) scale(${targetSquareScale})`;
      redSquare.style.opacity = '1';
      redSquare.style.visibility = 'visible';
      redSquare.style.zIndex = '9998'; // Below hydrant
      redSquare.style.willChange = 'auto';
      
      // Lock hydrant at 2x size from its exact position - ensure it stays on top
      hydrant.style.transition = 'none';
      const finalHydrantTransform = window.getComputedStyle(hydrant).transform;
      if (finalHydrantTransform && finalHydrantTransform !== 'none') {
        hydrant.style.transform = finalHydrantTransform;
      } else {
        // Fallback
        const translateMatch = hydrantTransform && hydrantTransform.match(/translate\(([^)]+)\)/);
        if (translateMatch) {
          hydrant.style.transform = `translate(${translateMatch[1]}) scale(${targetHydrantScale})`;
        } else {
          hydrant.style.transform = `translate(-50%, -50%) scale(${targetHydrantScale})`;
        }
      }
      hydrant.style.animation = 'none';
      hydrant.style.opacity = '1';
      hydrant.style.visibility = 'visible';
      hydrant.style.zIndex = '10000'; // Higher than square to stay on top
      hydrant.style.display = 'block';
      hydrant.style.willChange = 'auto';
      
      // Ensure wrapper doesn't constrain
      const wrapper = redSquare.parentElement;
      if (wrapper) {
        wrapper.style.zIndex = '9999';
        wrapper.style.overflow = 'visible';
      }
      
    }, 6000); // Wait for longest animation (square at 6s)
  };
  
  // Add multiple event listeners to ensure click always works
  redSquare.addEventListener('click', handleSquareClick);
  redSquare.addEventListener('touchend', handleSquareClick); // For mobile
  centerContent.addEventListener('click', (e) => {
    if (e.target === redSquare || e.target.closest('.red-square')) {
      handleSquareClick(e);
    }
  });
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    createStars();
    setupHoverEffect();
    init();
  });
} else {
  createStars();
  setupHoverEffect();
  init();
}

/* ============================================================================
   FINAL SCREEN - HYDANT MOVES UP AND CHAT INTERFACE
   ============================================================================ */

const AI_RESPONSE_TEXT = `Silver Hydrant is a team of consultants inspired by the story of Beverly Hills painting their fire hydrants silver so firefighters could instantly spot what mattered most and save time when lives were on the line. That same philosophy guides how they approach AI, advertising, marketing, production, web product development, software development, and data research today. Instead of adding noise, they focus on highlighting the critical moments, systems, and decisions that create real impact. Silver Hydrant helps brands apply AI with intention, clarity, and purpose painting what matters most to streamline processes, improve efficiency, and enable companies to move faster, communicate smarter, and drive meaningful, positive change in the world.`;

const AI_RESPONSE_TEXT_FORMATTED = `Silver Hydrant is a team of <strong>consultants</strong> inspired by the story of Beverly Hills painting their fire hydrants <strong>silver</strong> so firefighters could instantly spot what <strong>mattered most</strong> and save time when lives were on the line. That same <strong>philosophy</strong> guides how they approach <strong>AI, advertising, marketing, production, web product development, software development, and data research</strong> today. Instead of adding noise, they focus on highlighting the <strong>critical moments, systems, and decisions</strong> that create <strong>real impact</strong>. Silver Hydrant helps brands apply <strong>AI with intention, clarity, and purpose</strong> painting what <strong>matters most</strong> to <strong>streamline processes, improve efficiency</strong>, and enable companies to <strong>move faster, communicate smarter</strong>, and drive <strong>meaningful, positive change</strong> in the world.`;

const CHAT_TYPE_SPEED = 15;

// Simple typing function for plain text (no HTML)
function typePlainText(el, text, done) {
  el.textContent = "";
  el.style.opacity = '1';
  el.classList.add("typing");
  
  let i = 0;
  (function tick() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(tick, CHAT_TYPE_SPEED);
    } else {
      el.classList.remove("typing");
      if (done) done();
    }
  })();
}

function showFinalScreen() {
  const finalScreen = document.getElementById('finalScreen');
  const askAiBtn = document.getElementById('askAiBtn');
  const hydrant = document.querySelector('.center-hydrant');
  const chatContainer = document.getElementById('chatContainer');
  
  if (!finalScreen || !askAiBtn || !hydrant) {
    return;
  }
  
  // Hide chat container initially
  if (chatContainer) {
    chatContainer.style.display = 'none';
  }
  
  // Get current hydrant state - keep it in the same position, just grow it more
  const currentHydrantStyle = window.getComputedStyle(hydrant);
  const currentTransform = currentHydrantStyle.transform;
  
  // Extract current scale from transform
  let currentScale = 2; // Default to 2x since that's what it should be after click
  if (currentTransform && currentTransform !== 'none') {
    // Try to get scale from matrix
    const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const values = matrix[1].split(',');
      const a = parseFloat(values[0]);
      const b = parseFloat(values[1]);
      currentScale = Math.sqrt(a * a + b * b);
    }
    
    // Try to get scale from scale() function
    const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
    if (scaleMatch) {
      currentScale = parseFloat(scaleMatch[1]);
    }
  }
  
  // Keep hydrant in the same position (center of screen), just grow it a bit more
  // Don't change top/left position, just increase scale
  const newScale = currentScale * 1.2; // Grow by 20% more
  hydrant.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  hydrant.style.willChange = 'transform';
  
  requestAnimationFrame(() => {
    // Keep current position, just increase scale
    if (currentTransform && currentTransform !== 'none') {
      // Preserve any existing transform, just update scale
      const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
      if (translateMatch) {
        hydrant.style.transform = `translate(${translateMatch[1]}) scale(${newScale})`;
      } else {
        hydrant.style.transform = `translate(-50%, -50%) scale(${newScale})`;
      }
    } else {
      hydrant.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    }
  });
  
  // Show final screen and fade in title and button immediately - much faster
  finalScreen.style.display = 'flex';
  finalScreen.classList.add('show');
  finalScreen.style.opacity = '0';
  finalScreen.style.transition = 'opacity 0.2s ease';
  
  requestAnimationFrame(() => {
    finalScreen.style.opacity = '1';
    
    // Title is hidden - skip title animation
    
    // Position button right under the hydrant, centered
    setTimeout(() => {
      // Get hydrant position and dimensions
      const hydrantRect = hydrant.getBoundingClientRect();
      const hydrantBottom = hydrantRect.bottom;
      const hydrantCenterX = hydrantRect.left + hydrantRect.width / 2;
      
      // Position button right below hydrant with some spacing
      const spacing = 30; // Space between hydrant and button
      askAiBtn.style.position = 'fixed';
      askAiBtn.style.top = `${hydrantBottom + spacing}px`;
      askAiBtn.style.left = `${hydrantCenterX}px`;
      askAiBtn.style.transform = 'translateX(-50%)';
      askAiBtn.style.opacity = '0';
      askAiBtn.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      askAiBtn.style.display = 'block';
      
      requestAnimationFrame(() => {
        askAiBtn.style.opacity = '1';
      });
    }, 150);
  });
}

function typeChatText(el, text, done) {
  el.innerHTML = "";
  el.style.opacity = '1';
  el.classList.add("typing");
  
  // Parse HTML tags for formatting
  let htmlText = "";
  let i = 0;
  let inTag = false;
  let currentTag = "";
  
  (function tick() {
    if (i < text.length) {
      const char = text[i];
      
      if (char === '<') {
        inTag = true;
        currentTag = char;
      } else if (char === '>') {
        currentTag += char;
        htmlText += currentTag;
        currentTag = "";
        inTag = false;
        i++;
        el.innerHTML = htmlText;
        setTimeout(tick, CHAT_TYPE_SPEED);
        return;
      } else if (inTag) {
        currentTag += char;
      } else {
        htmlText += char;
        el.innerHTML = htmlText;
      }
      
      i++;
      setTimeout(tick, CHAT_TYPE_SPEED);
    } else {
      el.classList.remove("typing");
      if (done) done();
    }
  })();
}

function showChatInterface() {
  const chatContainer = document.getElementById('chatContainer');
  const aiResponse = document.getElementById('aiResponse');
  const askAiBtn = document.getElementById('askAiBtn');
  const hydrant = document.querySelector('.center-hydrant');
  const navBubbles = document.getElementById('navBubbles');
  if (!chatContainer || !aiResponse || !askAiBtn) return;
  
  // Fade away button first
  askAiBtn.style.opacity = '0';
  askAiBtn.style.pointerEvents = 'none';
  askAiBtn.style.transition = 'opacity 0.5s ease';
  
  // After button fades, move hydrant UP and start chat animation
  setTimeout(() => {
    if (hydrant) {
      const currentHydrantStyle = window.getComputedStyle(hydrant);
      const currentTransform = currentHydrantStyle.transform;
      let currentScale = 2;
      
      // Extract current scale
      if (currentTransform && currentTransform !== 'none') {
        const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
        if (scaleMatch) {
          currentScale = parseFloat(scaleMatch[1]);
        }
      }
      
      // Lock hydrant to -104px Y position
      const targetTop = '-104px';
      
      // Move hydrant UP to below the title, keep it centered horizontally
      hydrant.style.transition = 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1), left 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        hydrant.style.top = targetTop;
        hydrant.style.left = '50%'; // Keep centered horizontally
        hydrant.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
      });
    }
    
    // Start chat animation below the hydrant (after it moves)
    setTimeout(() => {
      startChatAnimation();
    }, 600); // Wait for hydrant movement to complete
  }, 500); // Wait for button fade to complete
}

function startChatAnimation() {
  const chatContainer = document.getElementById('chatContainer');
  const aiResponse = document.getElementById('aiResponse');
  const hydrant = document.querySelector('.center-hydrant');
  
  if (!chatContainer || !aiResponse) return;
  
  // Position chat container below hydrant (locked position)
  chatContainer.style.bottom = 'auto';
  chatContainer.style.position = 'fixed';
  chatContainer.style.left = '50%';
  
  if (hydrant) {
    // Position below hydrant with spacing
    const hydrantRect = hydrant.getBoundingClientRect();
    const hydrantBottom = hydrantRect.bottom;
    chatContainer.style.top = `${hydrantBottom + 30}px`;
  }
  
  // Show chat container
  setTimeout(() => {
    chatContainer.style.display = 'flex';
    chatContainer.style.opacity = '0';
    chatContainer.style.transform = 'translateX(-50%) translateY(20px)';
    chatContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    requestAnimationFrame(() => {
      chatContainer.style.opacity = '1';
      chatContainer.style.transform = 'translateX(-50%) translateY(0)';
      
      // Show user message first and type it out
      setTimeout(() => {
        const userMessage = chatContainer.querySelector('.chat-user');
        const userBubble = userMessage.querySelector('.chat-bubble');
        const userMessageText = 'hello, who are Silver hydrant?';
        
        // Clear the user bubble and prepare for typing
        userBubble.textContent = '';
        userMessage.style.opacity = '0';
        userMessage.style.transform = 'translateX(-15px)';
        userMessage.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        userMessage.style.display = 'block';
        
        requestAnimationFrame(() => {
          userMessage.style.opacity = '1';
          userMessage.style.transform = 'translateX(0)';
          
          // Type out the user message character by character (plain text)
          typePlainText(userBubble, userMessageText, () => {
            // After user message is typed, hold a tiny beat
            setTimeout(() => {
              // Show AI response bubble (white box) and start typing
              const aiMessage = chatContainer.querySelector('.chat-ai');
              aiMessage.style.opacity = '0';
              aiMessage.style.transform = 'translateX(-15px)';
              aiMessage.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
              aiMessage.style.display = 'block';
              
              requestAnimationFrame(() => {
                aiMessage.style.opacity = '1';
                aiMessage.style.transform = 'translateX(0)';
                
                // Start typing AI response - show hydrant menu once AI starts typing
                setTimeout(() => {
                  typeChatText(aiResponse, AI_RESPONSE_TEXT_FORMATTED);
                  
                  // Show hydrant menu once AI bubble starts writing (fade in smoothly)
                  setTimeout(() => {
                    showHydrantMenu();
                  }, 200); // Small delay after AI typing starts
                }, 300);
              });
            }, 400); // Tiny beat after user message finishes typing
          });
        });
      }, 300);
    });
  }, 500);
}

function showNavigationBubbles() {
  const navBubbles = document.getElementById('navBubbles');
  const chatContainer = document.getElementById('chatContainer');
  const userMessage = chatContainer ? chatContainer.querySelector('.chat-user') : null;
  
  if (!navBubbles) {
    return;
  }
  
  // Clear and recreate bubbles - 3 buttons total
  navBubbles.innerHTML = '';
  const bubbleLabels = [
    { text: 'What is a Silver Hydrant', page: 'what-is-silver-hydrant' },
    { text: 'What we can do', page: 'offerings' },
    { text: 'Who are the founders', page: 'founders' }
  ];
  
  // Create all 3 buttons
  bubbleLabels.forEach((label, index) => {
    const bubble = document.createElement('button');
    bubble.className = 'nav-bubble';
    bubble.textContent = label.text;
    bubble.setAttribute('data-page', label.page);
    // Start with opacity 0 for fade-in animation
    bubble.style.opacity = '0';
    bubble.style.visibility = 'visible';
    bubble.style.display = 'block';
    bubble.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    bubble.style.transform = 'translateY(8px)';
    navBubbles.appendChild(bubble);
  });
  
  // Verify all 3 buttons were created
  const createdBubbles = navBubbles.querySelectorAll('.nav-bubble');
  
  // Always set display and positioning properties - all buttons in one row
  navBubbles.style.display = 'flex';
  navBubbles.style.flexDirection = 'row';
  navBubbles.style.gap = '16px';
  navBubbles.style.justifyContent = 'center';
  navBubbles.style.alignItems = 'center';
  navBubbles.style.flexWrap = 'nowrap'; // Prevent wrapping - keep all buttons in one row
  navBubbles.style.position = 'fixed';
  navBubbles.style.left = '50%';
  navBubbles.style.transform = 'translateX(-50%)';
  navBubbles.style.zIndex = '10004';
  navBubbles.style.opacity = '0'; // Start hidden for fade-in
  navBubbles.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
  navBubbles.style.whiteSpace = 'nowrap'; // Prevent text wrapping inside buttons
  
  // Position bubbles ABOVE the chat bubble (user message) if available
  if (userMessage && chatContainer) {
    const userMessageRect = userMessage.getBoundingClientRect();
    const messageTop = userMessageRect.top;
    navBubbles.style.top = `${messageTop - 80}px`;
  } else {
    // Fallback position if user message isn't ready yet
    navBubbles.style.top = 'calc(50% - 200px)';
  }
  
  navBubbles.classList.add('show');
  
  // Fade in smoothly and gradually
  requestAnimationFrame(() => {
    navBubbles.style.opacity = '1';
    // Fade in each button with a gradual stagger for smooth appearance
    createdBubbles.forEach((bubble, index) => {
      setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0)';
      }, index * 120); // Gradual stagger (120ms between each button)
    });
  });
  
  // Set up click handlers
  setupNavigationBubbles();
  
}

/* ============================================================================
   HYDRANT MENU - Replaces nav bubbles with a menu similar to top-left controller
   ============================================================================ */

function createHydrantMenuStars() {
  const container = document.getElementById('hydrantMenuStars');
  if (!container) return;
  
  // Clear existing stars
  container.innerHTML = '';
  
  // Stars distributed across the square (100px)
  const numStars = 50;
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size between 1px and 2px
    const size = 1 + Math.random();
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Position stars across the square (using percentage)
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay for twinkling effect
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(star);
  }
}

function showHydrantMenu() {
  const centerHydrant = document.querySelector('.center-hydrant');
  const hydrantMenuDropdown = document.getElementById('hydrantMenuDropdown');
  
  if (!centerHydrant) return;
  
  // Create a black square that will grow BEHIND the existing hydrant
  let blackSquare = document.getElementById('hydrantBackgroundSquare');
  if (!blackSquare) {
    blackSquare = document.createElement('div');
    blackSquare.id = 'hydrantBackgroundSquare';
    blackSquare.className = 'hydrant-background-square';
    
    // Create stars container inside
    const starsContainer = document.createElement('div');
    starsContainer.id = 'hydrantBackgroundStars';
    starsContainer.className = 'hydrant-background-stars';
    blackSquare.appendChild(starsContainer);
    
    // Insert the black square into the DOM - positioned fixed
    document.body.appendChild(blackSquare);
  }
  
  // Get the hydrant's current position
  const hydrantRect = centerHydrant.getBoundingClientRect();
  const hydrantCenterX = hydrantRect.left + hydrantRect.width / 2;
  const hydrantCenterY = hydrantRect.top + hydrantRect.height / 2;
  // Start from zero so the square grows in continuously from nothing.
  const startSquareScale = 0;
  const hydrantSettleMs = 650;
  const hydrantSettleEasing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  const oldHydrantFadeMs = 820;
  const revealDurationMs = 2100;
  const revealEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Position the black square centered on the hydrant
  blackSquare.classList.remove('pulsing', 'hovered');
  blackSquare.style.position = 'fixed';
  blackSquare.style.left = `${hydrantCenterX}px`;
  blackSquare.style.top = `${hydrantCenterY}px`;
  blackSquare.style.transform = `translate(-50%, -50%) scale(${startSquareScale})`;
  blackSquare.style.transition = 'none';
  blackSquare.style.opacity = '1';
  blackSquare.style.zIndex = '10001'; // Behind the hydrant
  blackSquare.style.display = 'block';
  
  // Make sure hydrant stays on top of the black square
  centerHydrant.style.transition = 'none';
  centerHydrant.style.opacity = '1';
  centerHydrant.style.visibility = 'visible';
  centerHydrant.style.zIndex = '10003';
  centerHydrant.style.position = 'fixed';
  
  // Create stars
  createHydrantBackgroundStars();
  const backgroundStars = document.getElementById('hydrantBackgroundStars');
  if (backgroundStars) {
    // Avoid inverse-scaling at zero; keep stars stable during reveal setup.
    backgroundStars.style.transition = 'none';
    backgroundStars.style.transformOrigin = '50% 50%';
    backgroundStars.style.transform = 'scale(1)';
  }
  
  // Create the new hydrant image (a.png) that will fade in
  let newHydrant = document.getElementById('hydrantMenuImage');
  if (!newHydrant) {
    newHydrant = document.createElement('img');
    newHydrant.id = 'hydrantMenuImage';
    newHydrant.src = 'a.png';
    newHydrant.alt = 'Silver fire hydrant';
    newHydrant.className = 'hydrant-menu-image';
    document.body.appendChild(newHydrant);
  }
  
  // Position new hydrant exactly where the old one is
  newHydrant.classList.remove('pulsing', 'hovered');
  newHydrant.style.position = 'fixed';
  newHydrant.style.left = `${hydrantCenterX}px`;
  newHydrant.style.top = `${hydrantCenterY}px`;
  newHydrant.style.transform = 'translate(-50%, -50%) scale(0.94)';
  newHydrant.style.transition = 'none';
  newHydrant.style.width = `${hydrantRect.width}px`;
  newHydrant.style.height = 'auto';
  newHydrant.style.zIndex = '10002'; // Keep below current hydrant while swapping
  newHydrant.style.opacity = '1';
  newHydrant.style.display = 'block';
  newHydrant.style.pointerEvents = 'none';
  // Lock the reset state before starting transitions to avoid visual jumps.
  void blackSquare.offsetWidth;
  void newHydrant.offsetWidth;
  if (backgroundStars) {
    void backgroundStars.offsetWidth;
  }
  
  // Sequence: settle hydrant first, then grow the black square.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Keep hydrant fully opaque and transition to menu hydrant first.
      centerHydrant.style.transition = `opacity ${oldHydrantFadeMs}ms ${hydrantSettleEasing}`;
      centerHydrant.style.opacity = '1';
      newHydrant.style.zIndex = '10003';
      newHydrant.style.transition = `transform ${hydrantSettleMs}ms ${hydrantSettleEasing}`;
      newHydrant.style.transform = 'translate(-50%, -50%) scale(1)';
      // Fade old hydrant/shadow out gradually (new hydrant is already fully visible).
      requestAnimationFrame(() => {
        centerHydrant.style.opacity = '0';
      });

      setTimeout(() => {
        centerHydrant.style.visibility = 'hidden';
        centerHydrant.style.transition = 'none';
      }, oldHydrantFadeMs + 40);

      // Then grow the black square as a separate smooth motion.
      setTimeout(() => {
        blackSquare.style.transition = `transform ${revealDurationMs}ms ${revealEasing}`;
        blackSquare.style.transform = 'translate(-50%, -50%) scale(1)';
        if (backgroundStars) {
          backgroundStars.style.transition = `transform ${revealDurationMs}ms ${revealEasing}`;
          backgroundStars.style.transform = 'scale(1)';
        }
      }, hydrantSettleMs);

      // After both phases, start the pulse animation.
      setTimeout(() => {
        blackSquare.classList.add('pulsing');
        newHydrant.classList.add('pulsing');
      }, hydrantSettleMs + revealDurationMs);
    });
  });
  
  // Position and show the menu dropdown to the right of the hydrant (185px / 2 = 92.5px + spacing)
  if (hydrantMenuDropdown) {
    hydrantMenuDropdown.style.position = 'fixed';
    hydrantMenuDropdown.style.left = `${hydrantCenterX + 110}px`; // To the right of the square
    hydrantMenuDropdown.style.top = `${hydrantCenterY}px`;
    hydrantMenuDropdown.style.transform = 'translateY(-50%)';
    hydrantMenuDropdown.style.zIndex = '10004';
    hydrantMenuDropdown.style.display = 'flex';
  }
  
  // Create a hover zone that encompasses hydrant + square
  createHydrantHoverZone(hydrantCenterX, hydrantCenterY);
  
  // Set up click handlers
  setupHydrantMenu();
}

function createHydrantBackgroundStars() {
  const container = document.getElementById('hydrantBackgroundStars');
  if (!container) return;
  
  container.innerHTML = '';
  const numStars = 50;
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = 1 + Math.random();
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(star);
  }
}

let hydrantMenuHideTimer = null;
let hydrantMenuAnchor = null;

function clearHydrantMenuHideTimer() {
  if (hydrantMenuHideTimer) {
    clearTimeout(hydrantMenuHideTimer);
    hydrantMenuHideTimer = null;
  }
}

function scheduleHydrantMenuHide() {
  clearHydrantMenuHideTimer();
  hydrantMenuHideTimer = setTimeout(() => {
    hideHydrantMenuItems();
  }, 220);
}

function createHydrantHoverZone(centerX, centerY) {
  let hoverZone = document.getElementById('hydrantHoverZone');
  if (!hoverZone) {
    hoverZone = document.createElement('div');
    hoverZone.id = 'hydrantHoverZone';
    hoverZone.className = 'hydrant-hover-zone';
    document.body.appendChild(hoverZone);
  }
  
  // Position the hover zone to cover the hydrant + square area (185px square)
  hoverZone.style.position = 'fixed';
  hoverZone.style.left = `${centerX - 100}px`;
  hoverZone.style.top = `${centerY - 100}px`;
  hoverZone.style.width = '200px';
  hoverZone.style.height = '200px';
  hoverZone.style.zIndex = '10004';
  hoverZone.style.display = 'block';
  
  // Add hover listeners (overwrite so repeated setup doesn't stack listeners).
  hoverZone.onmouseenter = () => {
    clearHydrantMenuHideTimer();
    showHydrantMenuItems();
  };
  hoverZone.onmouseleave = () => {
    scheduleHydrantMenuHide();
  };

  const dropdown = document.getElementById('hydrantMenuDropdown');
  if (dropdown) {
    dropdown.onmouseenter = () => {
      clearHydrantMenuHideTimer();
      showHydrantMenuItems();
    };
    dropdown.onmouseleave = () => {
      scheduleHydrantMenuHide();
    };
  }
}

function showHydrantMenuItems() {
  clearHydrantMenuHideTimer();
  const dropdown = document.getElementById('hydrantMenuDropdown');
  if (dropdown) {
    dropdown.classList.add('show');
  }
  
  // Pause square and hydrant animation on hover
  const blackSquare = document.getElementById('hydrantBackgroundSquare');
  if (blackSquare) {
    blackSquare.classList.add('hovered');
  }
  
  const hydrantImage = document.getElementById('hydrantMenuImage');
  if (hydrantImage) {
    hydrantImage.classList.add('hovered');
  }
}

function hideHydrantMenuItems() {
  clearHydrantMenuHideTimer();
  const dropdown = document.getElementById('hydrantMenuDropdown');
  if (dropdown) {
    dropdown.classList.remove('show');
  }
  
  // Resume square and hydrant animation
  const blackSquare = document.getElementById('hydrantBackgroundSquare');
  if (blackSquare) {
    blackSquare.classList.remove('hovered');
  }
  
  const hydrantImage = document.getElementById('hydrantMenuImage');
  if (hydrantImage) {
    hydrantImage.classList.remove('hovered');
  }
}

function captureHydrantMenuAnchor() {
  const blackSquare = document.getElementById('hydrantBackgroundSquare');
  const hydrantImage = document.getElementById('hydrantMenuImage');
  let sourceRect = null;

  if (blackSquare && window.getComputedStyle(blackSquare).display !== 'none') {
    sourceRect = blackSquare.getBoundingClientRect();
  } else if (hydrantImage && window.getComputedStyle(hydrantImage).display !== 'none') {
    sourceRect = hydrantImage.getBoundingClientRect();
  }

  if (sourceRect) {
    hydrantMenuAnchor = {
      x: sourceRect.left + sourceRect.width / 2,
      y: sourceRect.top + sourceRect.height / 2,
    };
  }
}

function collapseHydrantMenuVisuals() {
  clearHydrantMenuHideTimer();

  const blackSquare = document.getElementById('hydrantBackgroundSquare');
  const hydrantImage = document.getElementById('hydrantMenuImage');
  const dropdown = document.getElementById('hydrantMenuDropdown');
  const hoverZone = document.getElementById('hydrantHoverZone');

  if (dropdown) {
    dropdown.classList.remove('show');
  }
  if (hoverZone) {
    hoverZone.style.display = 'none';
  }

  const collapseDurationMs = 1000;
  let hasVisibleHydrantMenu = false;

  if (blackSquare) {
    const squareDisplay = window.getComputedStyle(blackSquare).display;
    if (squareDisplay !== 'none') hasVisibleHydrantMenu = true;
    blackSquare.classList.remove('pulsing', 'hovered');
    const currentSquareTransform = window.getComputedStyle(blackSquare).transform;
    let currentScale = 1;
    if (currentSquareTransform && currentSquareTransform !== 'none') {
      const matrix = currentSquareTransform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        currentScale = Math.sqrt((a * a) + (b * b));
      }
    }
    // Freeze exact starting state, then animate on next frame to avoid jump cuts.
    blackSquare.style.animation = 'none';
    blackSquare.style.transition = 'none';
    blackSquare.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
    void blackSquare.offsetWidth;
    requestAnimationFrame(() => {
      blackSquare.style.transition = `transform ${collapseDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      blackSquare.style.transform = 'translate(-50%, -50%) scale(0)';
    });
    setTimeout(() => {
      blackSquare.style.display = 'none';
      blackSquare.style.transition = '';
      blackSquare.style.animation = '';
    }, collapseDurationMs + 30);
  }

  if (hydrantImage) {
    const hydrantDisplay = window.getComputedStyle(hydrantImage).display;
    if (hydrantDisplay !== 'none') hasVisibleHydrantMenu = true;
    hydrantImage.classList.remove('pulsing', 'hovered');
    // Keep the hydrant visible while the black square collapses.
    hydrantImage.style.transition = 'none';
    hydrantImage.style.opacity = '1';
    hydrantImage.style.display = 'block';
  }

  return hasVisibleHydrantMenu ? collapseDurationMs : 0;
}

function collapseTopLeftMenuControllerVisuals() {
  const menuController = document.getElementById('menuController');
  if (!menuController || !menuController.classList.contains('show')) return 0;

  const menuSquare = menuController.querySelector('.menu-square');
  const menuHydrant = menuController.querySelector('.menu-hydrant');
  const collapseDurationMs = 1000;

  if (menuSquare) {
    const currentSquareTransform = window.getComputedStyle(menuSquare).transform;
    menuSquare.style.animation = 'none';
    if (currentSquareTransform && currentSquareTransform !== 'none') {
      menuSquare.style.transform = currentSquareTransform;
    }
    void menuSquare.offsetWidth;
    menuSquare.style.transition = `transform ${collapseDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    menuSquare.style.transform = 'scale(0)';
  }

  if (menuHydrant) {
    menuHydrant.style.transition = `opacity ${Math.max(220, collapseDurationMs - 200)}ms ease`;
    menuHydrant.style.opacity = '0';
  }

  setTimeout(() => {
    hideMenuController();
    if (menuSquare) {
      menuSquare.style.transition = '';
      menuSquare.style.transform = '';
      menuSquare.style.animation = '';
    }
    if (menuHydrant) {
      menuHydrant.style.transition = '';
      menuHydrant.style.opacity = '';
    }
  }, collapseDurationMs + 30);

  return collapseDurationMs;
}

function setupHydrantMenu() {
  const dropdown = document.getElementById('hydrantMenuDropdown');
  if (!dropdown) return;
  
  // Get menu items
  const menuItems = dropdown.querySelectorAll('.hydrant-menu-item');
  
  menuItems.forEach(item => {
    // Clone to remove old listeners
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
  });
  
  // Re-query after replacing
  const whatIsSilverHydrantBtn = dropdown.querySelector('.hydrant-menu-item[data-action="what-is-silver-hydrant"]');
  const offeringsBtn = dropdown.querySelector('.hydrant-menu-item[data-action="offerings"]');
  const foundersBtn = dropdown.querySelector('.hydrant-menu-item[data-action="founders"]');
  const contactBtn = dropdown.querySelector('.hydrant-menu-item[data-action="contact"]');
  const foundersPage = document.getElementById('foundersPage');
  const closeFounders = document.getElementById('closeFounders');
  
  if (whatIsSilverHydrantBtn) {
    whatIsSilverHydrantBtn.addEventListener('click', () => {
      // Scroll to the chat
      const chatContainer = document.getElementById('chatContainer');
      if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  if (offeringsBtn) {
    offeringsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSpaceMask();
    });
  }
  
  if (foundersBtn && foundersPage) {
    foundersBtn.addEventListener('click', () => {
      hideOfferingsBoxes();
      foundersPage.classList.add('show');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        showMenuController('founders');
      }, 100);
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      showContactPage();
    });
  }
  
  // Make sure close founders button works
  if (closeFounders && foundersPage) {
    const newCloseBtn = closeFounders.cloneNode(true);
    closeFounders.parentNode.replaceChild(newCloseBtn, closeFounders);
    
    newCloseBtn.addEventListener('click', () => {
      foundersPage.classList.remove('show');
      document.body.style.overflow = '';
      hideMenuController();
    });
  }
}

let navigationBubblesSetup = false;

function setupNavigationBubbles() {
  // Remove existing event listeners by cloning and replacing
  const navBubbles = document.getElementById('navBubbles');
  if (!navBubbles) return;
  
  // Get all bubbles and remove old listeners by replacing them
  const bubbles = navBubbles.querySelectorAll('.nav-bubble');
  bubbles.forEach(bubble => {
    const newBubble = bubble.cloneNode(true);
    bubble.parentNode.replaceChild(newBubble, bubble);
  });
  
  const whatIsSilverHydrantBtn = document.querySelector('.nav-bubble[data-page="what-is-silver-hydrant"]');
  const whoAreWeBtn = document.querySelector('.nav-bubble[data-page="who-are-we"]');
  const foundersBtn = document.querySelector('.nav-bubble[data-page="founders"]');
  const offeringsBtn = document.querySelector('.nav-bubble[data-page="offerings"]');
  const contactBtn = document.querySelector('.nav-bubble[data-page="contact"]');
  const closeFounders = document.getElementById('closeFounders');
  const foundersPage = document.getElementById('foundersPage');
  
  if (whatIsSilverHydrantBtn) {
    whatIsSilverHydrantBtn.addEventListener('click', () => {
      // Trigger AI chat to explain who Silver Hydrant is
      const askAiBtn = document.getElementById('askAiBtn');
      if (askAiBtn && askAiBtn.style.display !== 'none') {
        askAiBtn.click();
      }
      showMenuController();
    });
  }
  
  if (whoAreWeBtn) {
    whoAreWeBtn.addEventListener('click', () => {
      // Trigger AI chat to explain who Silver Hydrant is
      const askAiBtn = document.getElementById('askAiBtn');
      if (askAiBtn && askAiBtn.style.display !== 'none') {
        askAiBtn.click();
      }
      showMenuController();
    });
  }
  
  if (foundersBtn && foundersPage) {
    foundersBtn.addEventListener('click', () => {
      // Hide offerings boxes and show chat if it was showing
      hideOfferingsBoxes();
      foundersPage.classList.add('show');
      document.body.style.overflow = 'hidden';
      // Show menu controller after a brief delay to ensure it's above the page
      setTimeout(() => {
        showMenuController('founders');
      }, 100);
    });
  }
  
  if (closeFounders && foundersPage) {
    closeFounders.addEventListener('click', () => {
      foundersPage.classList.remove('show');
      document.body.style.overflow = '';
      hideMenuController();
    });
  }
  
  // "What we can do" button - space mask animation
  if (offeringsBtn) {
    offeringsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      showSpaceMask();
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      showContactPage();
    });
  }
}

function createMenuStars() {
  const container = document.getElementById('menuStarsContainer');
  if (!container) return;
  
  // Clear existing stars
  container.innerHTML = '';
  
  // Stars distributed across the square (80px)
  const numStars = 35;
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size between 1px and 2px
    const size = 1 + Math.random();
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Position stars across the square (using percentage)
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay for twinkling effect
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(star);
  }
}

function showMenuController(contextMode = 'default') {
  const menuController = document.getElementById('menuController');
  if (menuController) {
    menuController.classList.remove('open');
    menuController.classList.remove('wcd-context');
    menuController.classList.remove('founders-context');
    if (contextMode === 'wcd') menuController.classList.add('wcd-context');
    if (contextMode === 'founders') menuController.classList.add('founders-context');
    menuController.style.display = 'flex';
    requestAnimationFrame(() => {
      menuController.classList.add('show');
      // Create stars when menu is shown
      createMenuStars();
    });
  }
}

function hideMenuController() {
  const menuController = document.getElementById('menuController');
  if (menuController) {
    menuController.classList.remove('show');
    menuController.classList.remove('open');
    menuController.classList.remove('wcd-context');
    menuController.classList.remove('founders-context');
  }
}

let offeringsSetup = false;

function createSpaceMaskStars() {
  const starsContainer = document.getElementById('spaceMaskStars');
  if (!starsContainer) return;
  
  // Clear existing stars
  starsContainer.innerHTML = '';
  
  // Create stars already positioned across the screen - no animation, just twinkling
  // The black box will reveal them as it expands
  const numStars = 400;
  const sizes = ['small'];
  
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = `star ${sizes[0]}`;
    
    // Random size between 1px and 3px
    const size = 1 + Math.random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.minWidth = `${size}px`;
    star.style.minHeight = `${size}px`;
    
    // Position stars at their final positions immediately (across entire screen)
    // Use viewport units so they stay in place
    const viewportX = Math.random() * 100;
    const viewportY = Math.random() * 100;
    star.style.left = `${viewportX}vw`;
    star.style.top = `${viewportY}vh`;
    star.style.position = 'absolute';
    star.style.transformOrigin = 'center center';
    star.style.transform = 'translate(-50%, -50%)';
    star.style.opacity = '1';
    
    // Only twinkling animation - no movement, stars are already in position
    star.style.animation = `twinkle 2s infinite`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    starsContainer.appendChild(star);
  }
}

function showSpaceMask() {
  const spaceMask = document.getElementById('spaceMask');
  const spaceOfferingsContainer = document.getElementById('spaceOfferingsContainer');
  if (!spaceMask) return;

  // Preserve current icon location so Home can restore it accurately.
  captureHydrantMenuAnchor();

  // Collapse whichever menu icon is active before opening the full-screen offerings mask.
  const centerMenuCollapseMs = collapseHydrantMenuVisuals();
  const topLeftMenuCollapseMs = collapseTopLeftMenuControllerVisuals();
  const collapseDelayMs = Math.max(centerMenuCollapseMs, topLeftMenuCollapseMs);

  const startSpaceMaskSequence = () => {
    // Create stars right before the mask animation starts.
    createSpaceMaskStars();

    // Show menu controller in top left 3 seconds after sequence starts.
    setTimeout(() => {
      showMenuController('wcd');
    }, 3000);

    // Reset mask and offerings
    spaceMask.className = 'space-mask';
    if (spaceOfferingsContainer) {
      spaceOfferingsContainer.classList.remove('show');
    }

    // Step 1: Show mask and scale in to icon size
    requestAnimationFrame(() => {
      spaceMask.classList.add('active');

      // Scale in to icon size (50px square) - 0.5s
      requestAnimationFrame(() => {
        spaceMask.classList.add('scale-in');

        // Step 2: Hold for 0.2 seconds
        setTimeout(() => {
          spaceMask.classList.remove('scale-in');
          spaceMask.classList.add('hold');

          // Step 3: Expand to full screen - 2s (total = 2.7s: 0.5s + 0.2s + 2s)
          setTimeout(() => {
            spaceMask.classList.remove('hold');
            spaceMask.classList.add('expand');
          }, 200);
        }, 500);
      });
    });

    // Show offering boxes 3 seconds after sequence starts (scale in)
    setTimeout(() => {
      if (spaceOfferingsContainer) {
        spaceOfferingsContainer.classList.add('show');
        setupSpaceOfferingHoverSync();

        // Enable interactions after scale-in animation completes (1.2 seconds)
        setTimeout(() => {
          const offeringBoxes = spaceOfferingsContainer.querySelectorAll('.space-offering-box');
          offeringBoxes.forEach(box => {
            box.style.pointerEvents = 'auto';
          });
        }, 1200);
      }
    }, 3000);
  };

  // Let the shrink be visible before the fullscreen mask takes over.
  if (collapseDelayMs > 0) {
    setTimeout(startSpaceMaskSequence, collapseDelayMs);
  } else {
    startSpaceMaskSequence();
  }
}

function hideSpaceMask() {
  const spaceMask = document.getElementById('spaceMask');
  const spaceOfferingsContainer = document.getElementById('spaceOfferingsContainer');
  if (!spaceMask) return;

  // Fully reset mask state so Home returns to normal view.
  spaceMask.className = 'space-mask';
  if (spaceOfferingsContainer) {
    spaceOfferingsContainer.classList.remove('show');
  }
  const menuController = document.getElementById('menuController');
  if (menuController) {
    menuController.classList.remove('wcd-context');
  }
}

let contactPagePreviousOverflow = '';
let contactPageReturnMenuContext = null;
let contactPageReturnView = 'home';

function createContactPageStars() {
  const container = document.getElementById('contactSpaceStars');
  if (!container) return;
  container.innerHTML = '';
  const numStars = 240;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'contact-star';
    const size = 1 + Math.random() * 2.2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2.4}s`;
    container.appendChild(star);
  }
}

function showContactPage() {
  const contactPage = document.getElementById('contactPage');
  const foundersPage = document.getElementById('foundersPage');
  const menuController = document.getElementById('menuController');
  const spaceMask = document.getElementById('spaceMask');
  const spaceOfferingsContainer = document.getElementById('spaceOfferingsContainer');
  if (!contactPage) return;

  // Remember where contact was opened from so Back can restore menu context.
  contactPageReturnMenuContext = null;
  contactPageReturnView = 'home';
  if (menuController && menuController.classList.contains('show')) {
    if (menuController.classList.contains('founders-context')) {
      contactPageReturnMenuContext = 'founders';
      contactPageReturnView = 'founders';
    } else if (menuController.classList.contains('wcd-context')) {
      contactPageReturnMenuContext = 'wcd';
      contactPageReturnView = 'wcd';
    }
  }
  if (!contactPageReturnMenuContext && foundersPage && foundersPage.classList.contains('show')) {
    contactPageReturnMenuContext = 'founders';
    contactPageReturnView = 'founders';
  }
  if (
    !contactPageReturnMenuContext &&
    ((spaceMask && (spaceMask.classList.contains('active') || spaceMask.classList.contains('expand'))) ||
      (spaceOfferingsContainer && spaceOfferingsContainer.classList.contains('show')))
  ) {
    contactPageReturnMenuContext = 'wcd';
    contactPageReturnView = 'wcd';
  }

  createContactPageStars();
  contactPage.classList.add('show');
  contactPagePreviousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  hideMenuController();
}

function hideContactPage(restoreMenu = false) {
  const contactPage = document.getElementById('contactPage');
  const foundersPage = document.getElementById('foundersPage');
  if (!contactPage) return;
  contactPage.classList.remove('show');
  document.body.style.overflow = contactPagePreviousOverflow || '';
  if (restoreMenu) {
    if (contactPageReturnView === 'founders' && foundersPage) {
      foundersPage.classList.add('show');
      document.body.style.overflow = 'hidden';
      showMenuController('founders');
    } else if (contactPageReturnView === 'wcd') {
      showMenuController('wcd');
    } else {
      // Home fallback: return to centered icon state only.
      hideMenuController();
      restoreCenteredHydrantMenuIcon(true);
    }
  }
  contactPageReturnMenuContext = null;
  contactPageReturnView = 'home';
}

function hideAiConversation() {
  const chatContainer = document.getElementById('chatContainer');
  const aiResponse = document.getElementById('aiResponse');
  const userMessage = chatContainer ? chatContainer.querySelector('.chat-user') : null;
  const aiMessage = chatContainer ? chatContainer.querySelector('.chat-ai') : null;

  if (aiResponse) {
    aiResponse.innerHTML = '';
    aiResponse.classList.remove('typing');
  }
  if (userMessage) {
    userMessage.style.display = 'none';
    userMessage.style.opacity = '0';
    userMessage.style.transform = '';
  }
  if (aiMessage) {
    aiMessage.style.display = 'none';
    aiMessage.style.opacity = '0';
    aiMessage.style.transform = '';
  }
  if (chatContainer) {
    chatContainer.style.display = 'none';
    chatContainer.style.opacity = '0';
    chatContainer.style.transform = '';
  }
}

function setupContactPage() {
  const copyBtn = document.getElementById('copyContactEmail');
  const closeBtn = document.getElementById('closeContactPage');
  const emailEl = document.getElementById('contactEmail');
  const foundersContactBtn = document.getElementById('foundersContactBtn');
  if (copyBtn && emailEl) {
    copyBtn.onclick = async () => {
      const email = emailEl.textContent.trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tmp = document.createElement('textarea');
          tmp.value = email;
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand('copy');
          tmp.remove();
        }
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = original;
        }, 1200);
      } catch (_err) {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copy failed';
        setTimeout(() => {
          copyBtn.textContent = original;
        }, 1200);
      }
    };
  }
  if (closeBtn) {
    closeBtn.onclick = () => {
      hideContactPage(true);
    };
  }
  if (foundersContactBtn) {
    foundersContactBtn.onclick = () => {
      showContactPage();
    };
  }
}

function restoreCenteredHydrantMenuIcon(forceCenter = false) {
  const blackSquare = document.getElementById('hydrantBackgroundSquare');
  const hydrantImage = document.getElementById('hydrantMenuImage');
  const dropdown = document.getElementById('hydrantMenuDropdown');
  const hoverZone = document.getElementById('hydrantHoverZone');
  const centerHydrant = document.querySelector('.center-hydrant');
  const backgroundStars = document.getElementById('hydrantBackgroundStars');

  // Restore to screen center when requested, otherwise use last known icon position.
  const centerX = Math.round(forceCenter ? (window.innerWidth / 2) : (hydrantMenuAnchor?.x ?? window.innerWidth / 2));
  const centerY = Math.round(forceCenter ? (window.innerHeight / 2) : (hydrantMenuAnchor?.y ?? window.innerHeight / 2));

  if (centerHydrant) {
    centerHydrant.style.visibility = 'hidden';
    centerHydrant.style.opacity = '0';
  }

  if (blackSquare) {
    blackSquare.classList.remove('hovered');
    blackSquare.classList.add('pulsing');
    blackSquare.style.display = 'block';
    blackSquare.style.position = 'fixed';
    blackSquare.style.left = `${centerX}px`;
    blackSquare.style.top = `${centerY}px`;
    blackSquare.style.transition = 'none';
    blackSquare.style.transform = 'translate(-50%, -50%) scale(1)';
    blackSquare.style.opacity = '1';
    blackSquare.style.zIndex = '10001';
  }

  if (backgroundStars) {
    backgroundStars.style.transition = 'none';
    backgroundStars.style.transform = 'scale(1)';
  }

  if (hydrantImage) {
    hydrantImage.classList.remove('hovered');
    hydrantImage.classList.add('pulsing');
    hydrantImage.style.display = 'block';
    hydrantImage.style.position = 'fixed';
    hydrantImage.style.left = `${centerX}px`;
    hydrantImage.style.top = `${centerY}px`;
    hydrantImage.style.transition = 'none';
    hydrantImage.style.transform = 'translate(-50%, -50%) scale(1)';
    hydrantImage.style.opacity = '1';
    hydrantImage.style.zIndex = '10003';
    hydrantImage.style.pointerEvents = 'none';
  }

  if (dropdown) {
    dropdown.classList.remove('show');
    dropdown.style.display = 'flex';
    dropdown.style.position = 'fixed';
    dropdown.style.left = `${centerX + 110}px`;
    dropdown.style.top = `${centerY}px`;
    dropdown.style.transform = 'translateY(-50%)';
    dropdown.style.zIndex = '10004';
  }

  createHydrantHoverZone(centerX, centerY);
}

function setupSpaceOfferingHoverSync() {
  const offeringBoxes = document.querySelectorAll('.space-offering-box');
  const animationDuration = 3.69; // seconds for pulse
  const scaleInDuration = 1.2; // seconds for scale-in
  
  offeringBoxes.forEach((box) => {
    const square = box.querySelector('.space-offering-square');
    const title = box.querySelector('.space-offering-title');
    let hoverStartTime = null;
    let isScalingIn = true; // Track if still in scale-in phase
    
    // Check if scale-in is complete after animation duration (1.2s)
    setTimeout(() => {
      isScalingIn = false;
    }, scaleInDuration * 1000 + 100); // Add small buffer
    
    box.addEventListener('mouseenter', () => {
      // Record when hover started
      hoverStartTime = Date.now();
      
      // Animation is already paused by CSS
    });
    
    box.addEventListener('mouseleave', () => {
      if (!hoverStartTime) return;
      
      hoverStartTime = null;
      
      if (!square || !title) return;
      
      // Resume animation at normal speed - no catch-up
      // If still scaling in, the animation will continue from where it paused
      // If in pulse phase, resume pulse animation
      square.style.animationPlayState = 'running';
      title.style.animationPlayState = 'running';
    });
  });
}

function showOfferingsBoxes() {
  const offeringsWrapper = document.getElementById('offeringsWrapper');
  const offeringsBoxesContainer = document.getElementById('offeringsBoxesContainer');
  const offeringsBtn = document.querySelector('.nav-bubble[data-page="offerings"]');
  
  if (offeringsWrapper && offeringsBoxesContainer && offeringsBtn) {
    // Get current button position
    const btnRect = offeringsBtn.getBoundingClientRect();
    const currentTop = btnRect.top;
    const currentLeft = btnRect.left + btnRect.width / 2;
    
    // Set initial fixed position at current location
    offeringsBtn.style.position = 'fixed';
    offeringsBtn.style.top = `${currentTop}px`;
    offeringsBtn.style.left = `${currentLeft}px`;
    offeringsBtn.style.transform = 'translate(-50%, -50%)';
    offeringsBtn.style.zIndex = '20001';
    offeringsBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Show offerings page
    offeringsWrapper.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Smoothly transition button to top center, then grow
    setTimeout(() => {
      // First: move to top center
      offeringsBtn.style.top = '120px';
      offeringsBtn.style.left = '50%';
      offeringsBtn.style.transform = 'translate(-50%, -50%)';
      
      // Then: grow to 54% bigger
      setTimeout(() => {
        offeringsBtn.style.transform = 'translate(-50%, -50%) scale(1.54)';
        showMenuController();
      }, 300);
    }, 50);
    
    // Create stars for each offering square (only once)
    if (!offeringsSetup) {
      createOfferingsSquareStars();
      setupOfferingCards();
      offeringsSetup = true;
    }
  }
}

function hideOfferingsBoxes() {
  const offeringsWrapper = document.getElementById('offeringsWrapper');
  const offeringsBtn = document.querySelector('.nav-bubble[data-page="offerings"]');
  
  if (offeringsWrapper) {
    offeringsWrapper.classList.remove('show');
    document.body.style.overflow = '';
    hideMenuController();
  }
  
  // Reset the "What we can do" button back to normal
  if (offeringsBtn) {
    offeringsBtn.style.position = '';
    offeringsBtn.style.top = '';
    offeringsBtn.style.left = '';
    offeringsBtn.style.transform = '';
    offeringsBtn.style.zIndex = '';
    offeringsBtn.style.transition = '';
  }
}

function createOfferingsSquareStars() {
  const offeringBoxes = document.querySelectorAll('.offering-box');
  
  offeringBoxes.forEach(box => {
    const starsContainer = box.querySelector('.offering-box-stars');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    const numStars = 25;
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = 1 + Math.random();
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      
      starsContainer.appendChild(star);
    }
  });
}

function setupOfferingCards() {
  const offeringBoxes = document.querySelectorAll('.offering-box');
  
  offeringBoxes.forEach(box => {
    box.addEventListener('click', () => {
      // Toggle active state
      offeringBoxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');
    });
    
    // Also work on hover
    box.addEventListener('mouseenter', () => {
      offeringBoxes.forEach(b => {
        if (b !== box) {
          b.classList.remove('active');
        }
      });
    });
  });
}

// Set up menu controller navigation
function setupMenuController() {
  const menuController = document.getElementById('menuController');
  const menuSquareWrapper = menuController ? menuController.querySelector('.menu-square-wrapper') : null;
  const menuItems = document.querySelectorAll('.menu-item');
  let menuHoverCloseTimer = null;
  const isMenuInteractiveContext = () => menuController && menuController.classList.contains('show');

  if (menuController && menuSquareWrapper) {
    // In "What we can do", reveal options on hover for faster interaction.
    menuController.onmouseenter = () => {
      if (menuHoverCloseTimer) {
        clearTimeout(menuHoverCloseTimer);
        menuHoverCloseTimer = null;
      }
      if (isMenuInteractiveContext()) {
        menuController.classList.add('open');
      }
    };
    menuController.onmouseleave = () => {
      if (isMenuInteractiveContext()) {
        // Small delay prevents accidental close while aiming for menu items.
        menuHoverCloseTimer = setTimeout(() => {
          menuController.classList.remove('open');
          menuHoverCloseTimer = null;
        }, 180);
      }
    };

    // Toggle menu options only when the icon box is clicked.
    menuSquareWrapper.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      menuController.classList.toggle('open');
    };

    // Close when clicking outside the controller.
    document.addEventListener('click', (e) => {
      if (!menuController.classList.contains('show')) return;
      if (!menuController.contains(e.target)) {
        if (menuHoverCloseTimer) {
          clearTimeout(menuHoverCloseTimer);
          menuHoverCloseTimer = null;
        }
        menuController.classList.remove('open');
      }
    });
  }
  
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menuHoverCloseTimer) {
        clearTimeout(menuHoverCloseTimer);
        menuHoverCloseTimer = null;
      }
      const action = e.target.dataset.action;
      const foundersPage = document.getElementById('foundersPage');
      
      switch(action) {
        case 'home':
          // Scroll to top / reset to home state
          window.scrollTo({ top: 0, behavior: 'smooth' });
          hideContactPage();
          hideAiConversation();
          // Hide founders page if open
          const wasFoundersOpen = !!(foundersPage && foundersPage.classList.contains('show'));
          if (foundersPage && foundersPage.classList.contains('show')) {
            foundersPage.classList.remove('show');
            document.body.style.overflow = '';
          }
          // Hide offerings boxes and show chat
          hideSpaceMask();
          hideOfferingsBoxes();
          hideMenuController();
          restoreCenteredHydrantMenuIcon(wasFoundersOpen);
          break;
        case 'who-are-we':
          // Route cleanly back to the core chat context.
          hideContactPage();
          hideSpaceMask();
          hideOfferingsBoxes();
          if (foundersPage && foundersPage.classList.contains('show')) {
            foundersPage.classList.remove('show');
            document.body.style.overflow = '';
          }
          // Trigger AI chat to explain who Silver Hydrant is
          const askAiBtn = document.getElementById('askAiBtn');
          if (askAiBtn && askAiBtn.style.display !== 'none') {
            askAiBtn.click();
          } else {
            const chatContainer = document.getElementById('chatContainer');
            if (chatContainer) {
              chatContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          break;
        case 'founders':
          // Navigate to founders page
          if (foundersPage) {
            hideContactPage();
            hideSpaceMask();
            hideOfferingsBoxes();
            foundersPage.classList.add('show');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
              showMenuController('founders');
            }, 100);
          }
          break;
        case 'offerings':
          // "What we can do" button - space mask animation
          hideContactPage();
          // Keep founders visible underneath so the black box opens from that page.
          showSpaceMask();
          break;
        case 'contact':
          showContactPage();
          break;
      }
      if (menuController) {
        menuController.classList.remove('open');
      }
    });
  });
}

// Set up ask AI button click handler
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const askAiBtn = document.getElementById('askAiBtn');
    if (askAiBtn) {
      askAiBtn.addEventListener('click', showChatInterface);
    }
    setupContactPage();
    setupNavigationBubbles();
    setupMenuController();
  });
} else {
  const askAiBtn = document.getElementById('askAiBtn');
  if (askAiBtn) {
    askAiBtn.addEventListener('click', showChatInterface);
  }
  setupContactPage();
  setupNavigationBubbles();
  setupMenuController();
}