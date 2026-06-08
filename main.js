/* ── HAMBURGER MENU ── */
(function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  function closeMenu() {
    btn.classList.remove("open");
    menu.classList.remove("open");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      btn.classList.add("open");
      menu.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.07 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
})();

/* ── WHY LINES ── */
(function initWhyLines() {
  const els = document.querySelectorAll(".why-line");
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 },
  );
  els.forEach((el) => obs.observe(el));
})();

/* ── COUNTER ANIMATION ── */
(function initCounters() {
  const els = document.querySelectorAll(".counter-num[data-target]");
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = parseInt(e.target.dataset.target);
        if (isNaN(target)) return;
        let startTime = null;
        const duration = 1800;
        (function step(ts) {
          if (!startTime) startTime = ts;
          const p = Math.min((ts - startTime) / duration, 1);
          e.target.textContent =
            target >= 100
              ? Math.floor(p * target) + "+"
              : Math.floor(p * target);
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => obs.observe(el));
})();

/* ── BENEFIT ITEMS STAGGER ── */
(function initBenefits() {
  const els = document.querySelectorAll(".bf-item");
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const delay = parseFloat(e.target.style.transitionDelay || "0") * 1000;
        setTimeout(() => e.target.classList.add("visible"), delay);
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => obs.observe(el));
})();

/* ── FAQ ACCORDION ── */
function toggleFaq(questionEl) {
  const item = questionEl.parentElement;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item.open")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

/* ── PRODUCT FILTER ── */
function filterCat(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".cat-section").forEach((sec) => {
    sec.style.display =
      cat === "all" || sec.dataset.cat === cat ? "block" : "none";
  });
}

/* ── FORM FEEDBACK ── */
function handleSubmit() {
  const btn = document.querySelector(".submit-btn");
  if (!btn) return;
  btn.textContent = "Submitted — We'll contact you within 24 hours.";
  btn.style.background = "#2D6A4F";
  btn.style.color = "#ffffff";
}

function handleSend() {
  const btn = document.querySelector(".send-btn");
  if (!btn) return;
  btn.textContent = "Message Sent — We'll be in touch within 24 hours.";
  btn.style.background = "#2D6A4F";
  btn.style.color = "#ffffff";
}

/* ── NAV SCROLL EFFECT ── */
(function initNavScroll() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    },
    { passive: true },
  );
})();
