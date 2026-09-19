/**
 * SYMPOSIUM 2026 - Main Application Logic & Interactivity
 * Manages dynamic config binding, interactive card mini-simulations (PaperX, Prompt Battle,
 * Code Combat, Free Fire, Connections), audio FX triggers, and responsive mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppConfig();
  initPromptBattleSim();
  initCodeCombatSim();
  initFreeFireSim();
  initSketchHuntSim();
  initCard3DTilt();
  initAudioInteractions();
  initMobileMenu();
  initRulebookTabs();
  initMouseSpotlight();
  initFaqAccordion();
  initCalendarExport();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Configuration Binding
   -------------------------------------------------------------------------- */
function initAppConfig() {
  const cfg = window.SYMPOSIUM_CONFIG || {};

  // Bind University Name
  document.querySelectorAll('[data-bind="universityName"]').forEach(el => {
    el.textContent = cfg.universityName || "ANNA UNIVERSITY, CHENNAI";
  });

  // Bind College Name
  document.querySelectorAll('[data-bind="collegeName"]').forEach(el => {
    el.textContent = cfg.collegeName || "University College of Engineering, Ariyalur";
  });

  // Bind Affiliation
  document.querySelectorAll('[data-bind="affiliation"]').forEach(el => {
    el.textContent = cfg.affiliation || "(A Constituent College of Anna University, Chennai)";
  });

  // Bind Symposium Title
  document.querySelectorAll('[data-bind="symposiumTitle"]').forEach(el => {
    const title = cfg.symposiumTitle || "INFINIXA 2026";
    el.textContent = title;
    if (el.classList.contains('glitch-text')) {
      el.setAttribute('data-text', title.toUpperCase());
    }
  });

  // Bind Tagline
  document.querySelectorAll('[data-bind="tagline"]').forEach(el => {
    el.textContent = cfg.tagline || "“INNOVATE. COMPETE. CONQUER.”";
  });

  // Bind Description
  document.querySelectorAll('[data-bind="description"]').forEach(el => {
    el.textContent = cfg.description || "“Where research innovation, generative AI, competitive coding, tactical esports, and lateral thinking converge into one high-tech championship.”";
  });

  // Bind Details
  document.querySelectorAll('[data-bind="eventDate"]').forEach(el => el.textContent = cfg.eventDate);
  document.querySelectorAll('[data-bind="venue"]').forEach(el => el.textContent = cfg.venue);
  document.querySelectorAll('[data-bind="time"]').forEach(el => el.textContent = cfg.time);
  document.querySelectorAll('[data-bind="teamSize"]').forEach(el => el.textContent = cfg.teamSize);
  document.querySelectorAll('[data-bind="registrationFee"]').forEach(el => el.textContent = cfg.registrationFee);
  document.querySelectorAll('[data-bind="email"]').forEach(el => {
    el.textContent = cfg.email;
    if (el.tagName === 'A') el.href = `mailto:${cfg.email}`;
  });
  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = cfg.phone;
    if (el.tagName === 'A') el.href = `tel:${cfg.phone.replace(/[^0-9+]/g, '')}`;
  });

  // Bind Google Form Link to all Register CTA buttons
  const formUrl = cfg.googleFormUrl || "https://docs.google.com/forms/d/e/1FAIpQLSe5ncHQMUFToFV1VNgVx5FKkOGaewIGDtQMgW8utG6obO-dGA/viewform?usp=publish-editor";
  document.querySelectorAll('#primary-register-btn, #hero-register-btn, #nav-register-btn, .btn-primary-register, .btn-climax-register, [data-bind="registerUrl"]').forEach(btn => {
    if (btn) {
      btn.href = formUrl;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    }
  });

  // Bind PaperX Submission Google Form button
  const paperFormUrl = cfg.paperSubmissionUrl || "https://forms.gle/bf3WDv1xrNUvhzyo6";
  const paperBtn = document.getElementById('paperx-submit-btn');
  if (paperBtn) {
    paperBtn.href = paperFormUrl;
  }
}

/* --------------------------------------------------------------------------
   2. Interactive Event Simulations
   -------------------------------------------------------------------------- */

// Event 02: Prompt Battle Multimodal Generative Sim
function initPromptBattleSim() {
  const textEl = document.getElementById('prompt-typing-text');
  const modelStatusEl = document.getElementById('prompt-model-status');
  if (!textEl) return;

  const prompts = [
    { text: "Generate 3D autonomous drone mesh with LiDAR sensors...", engine: "ENGINE: 3D GENERATIVE NERF" },
    { text: "Synthesize photorealistic cyber keynote video in 8K...", engine: "ENGINE: DIFFUSION VIDEO AI" },
    { text: "Design zero-latency functional React native UI prototype...", engine: "ENGINE: LLM MULTIMODAL" },
    { text: "Create neural soundscape audio for futuristic symposium...", engine: "ENGINE: PROCEDURAL AUDIO AI" }
  ];

  let promptIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = prompts[promptIdx];
    if (isDeleting) {
      textEl.textContent = current.text.substring(0, charIdx - 1);
      charIdx--;
    } else {
      textEl.textContent = current.text.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 25 : 50;

    if (!isDeleting && charIdx === current.text.length) {
      typeSpeed = 2200; // Pause at completed prompt
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      promptIdx = (promptIdx + 1) % prompts.length;
      if (modelStatusEl) modelStatusEl.textContent = prompts[promptIdx].engine;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

// Event 03: Code Combat Testcases Stream Sim
function initCodeCombatSim() {
  const simEl = document.querySelector('.code-combat-sim');
  if (!simEl) return;

  const batches = [
    [
      "> Test Case 1/4: [PASSED] Memory: 12.4 MB",
      "> Test Case 2/4: [PASSED] Memory: 14.1 MB",
      "> Test Case 3/4: [PASSED] Time: 0.018ms",
      "> Test Case 4/4: [ACCEPTED] Score: 100/100"
    ],
    [
      "> Dynamic Graph DFS: [PASSED] 0.012ms",
      "> Trie Prefix Search: [PASSED] 0.015ms",
      "> Segment Tree Query: [PASSED] 0.021ms",
      "> ALL 4/4 HIDDEN TESTS PASSED [RANK #1]"
    ]
  ];

  let batchIdx = 0;
  setInterval(() => {
    batchIdx = (batchIdx + 1) % batches.length;
    const lines = simEl.querySelectorAll('.code-stream-line');
    batches[batchIdx].forEach((txt, i) => {
      if (lines[i]) lines[i].textContent = txt;
    });
  }, 4000);
}

// Event 04: Free Fire Esports Live Telemetry Sim
function initFreeFireSim() {
  const meterEl = document.querySelector('.freefire-booyah-meter');

  const booyahValues = ["BOOYAH READINESS: 98%", "AIR DROP: SECURED ⚡", "SQUAD SYNC: 100%", "TARGET DOWN: +100 PTS"];
  let bIdx = 0;
  setInterval(() => {
    bIdx = (bIdx + 1) % booyahValues.length;
    if (meterEl) meterEl.textContent = booyahValues[bIdx];
  }, 2800);
}

// Event 02 (Non-Technical): Sketch Hunt Visual Drawing & Guessing Sim
function initSketchHuntSim() {
  const emojiEl = document.getElementById('sketch-art-emoji');
  const targetEl = document.getElementById('sketch-prompt-target');
  const guessStatusEl = document.getElementById('sketch-guess-status');
  if (!emojiEl || !targetEl) return;

  const sketches = [
    { emoji: "🚀", prompt: "SECRET: SPACE ROCKET", guess: "TEAM GUESS: ROCKET 🚀 [CORRECT! +100]" },
    { emoji: "🤖", prompt: "SECRET: CYBER CYBORG", guess: "TEAM GUESS: ROBOT 🤖 [CORRECT! +100]" },
    { emoji: "💡", prompt: "SECRET: QUANTUM IDEA", guess: "TEAM GUESS: LIGHT BULB 💡 [CORRECT! +100]" },
    { emoji: "🏆", prompt: "SECRET: CHAMPION TROPHY", guess: "TEAM GUESS: TROPHY 🏆 [CORRECT! +100]" },
    { emoji: "🎮", prompt: "SECRET: ARCADE CONSOLE", guess: "TEAM GUESS: GAMEPAD 🎮 [CORRECT! +100]" }
  ];

  let sIdx = 0;

  setInterval(() => {
    sIdx = (sIdx + 1) % sketches.length;
    const current = sketches[sIdx];

    targetEl.style.opacity = '0';
    setTimeout(() => {
      emojiEl.textContent = current.emoji;
      targetEl.textContent = current.prompt;
      if (guessStatusEl) guessStatusEl.textContent = current.guess;
      targetEl.style.opacity = '1';
    }, 300);
  }, 3200);
}

/* --------------------------------------------------------------------------
   3. 3D Card Tilt Interaction (Desktop Only)
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  if (window.innerWidth < 1024 || ('ontouchstart' in window)) return;

  const cards = document.querySelectorAll('.event-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Audio Interactions & Controls
   -------------------------------------------------------------------------- */
function initAudioInteractions() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (window.cyberAudio) {
      const active = window.cyberAudio.toggle();
      if (active) {
        audioBtn.classList.add('active');
        audioBtn.querySelector('.audio-label').textContent = 'SFX: ON';
      } else {
        audioBtn.classList.remove('active');
        audioBtn.querySelector('.audio-label').textContent = 'SFX: OFF';
      }
    }
  });

  // Sound triggers on interactive elements
  document.querySelectorAll('a, button, .event-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.cyberAudio && window.cyberAudio.isEnabled) {
        window.cyberAudio.playHover();
      }
    });

    el.addEventListener('click', () => {
      if (window.cyberAudio && window.cyberAudio.isEnabled) {
        window.cyberAudio.playClick();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Mobile Navigation Menu (Touch & Viewport Optimized)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  if (!menuBtn || !drawer) return;

  function toggleMenu(forceClose = false) {
    if (forceClose) {
      menuBtn.classList.remove('open');
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      const isOpen = drawer.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      if (backdrop) backdrop.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      toggleMenu(true);
    });
  }

  // Close when tapping outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // Close when tapping any nav link
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Handle window resize closing drawer
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && drawer.classList.contains('open')) {
      toggleMenu(true);
    }
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Rulebook Tabs & Filters
   -------------------------------------------------------------------------- */
function initRulebookTabs() {
  const tabBtns = document.querySelectorAll('.rulebook-tab-btn');
  const ruleCards = document.querySelectorAll('.rulebook-card');
  if (!tabBtns.length || !ruleCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-rule-filter');

      // Audio trigger if enabled
      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }

      // Set active state on buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      ruleCards.forEach(card => {
        const cat = card.getAttribute('data-rule-category') || '';
        if (filter === 'all' || cat === filter || cat.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Re-run Lucide icons rendering to populate icons inside rulebook
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* --------------------------------------------------------------------------
   8. Linear.app Style Radial Mouse Spotlight Glow
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
  const spotlightCards = document.querySelectorAll('.spotlight-card, .event-card, .rulebook-card');
  if (!spotlightCards.length) return;

  document.addEventListener('mousemove', (e) => {
    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   10. Interactive FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. Add to Calendar Integration
   -------------------------------------------------------------------------- */
function initCalendarExport() {
  const calBtn = document.getElementById('hero-calendar-btn');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    if (window.cyberAudio && typeof window.cyberAudio.playBeep === 'function') {
      window.cyberAudio.playBeep();
    }

    const title = encodeURIComponent("Infinixa 2026 - National Level Technical Symposium");
    const details = encodeURIComponent("Infinixa 2026 at University College of Engineering, Ariyalur (Anna University). Events: PaperX, Prompt Battle, Code Combat, Free Fire, Sketch Hunt. Registration: ₹150.");
    const location = encodeURIComponent("University College of Engineering, Ariyalur, Vilangudi, Tamil Nadu 621731");
    // Sep 25, 2026 09:00 AM IST to 05:00 PM IST (03:30 to 11:30 UTC)
    const dates = "20260925T033000Z/20260925T113000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   12. Floating Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (window.cyberAudio && typeof window.cyberAudio.playWarp === 'function') {
      window.cyberAudio.playWarp();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


