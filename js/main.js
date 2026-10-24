// Path back to the site root ("" on the home page, "../" on project pages)
const root = document.body.dataset.root || "";
const levelNumber = (i) => String(i + 1).padStart(2, "0");

// Navbar: add a border/background once the page is scrolled
const nav = document.querySelector(".site-nav");
if (nav) {
  const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
}

// ---------------------------------------------------------------------------
// Mobile menu: Bootstrap offcanvas side panel + hamburger/X button
// (Bootstrap already handles the backdrop, scroll lock and closing on tap outside)
// ---------------------------------------------------------------------------
const menu = document.getElementById("main-nav");
const menuToggle = document.querySelector(".menu-toggle");

if (nav && menu && menuToggle) {
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(menu);
  const isOpen = () => menu.classList.contains("show") || menu.classList.contains("showing");

  // aria-expanded drives the hamburger <-> X animation in the CSS
  menu.addEventListener("show.bs.offcanvas", () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  });
  menu.addEventListener("hide.bs.offcanvas", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });

  // Links: close the panel first, then scroll to the section once the page can scroll again
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!isOpen()) return;
      const href = link.getAttribute("href");
      const target = href.startsWith("#") ? document.querySelector(href) : null;
      if (!target) return offcanvas.hide(); // other page or file: just let the browser follow it

      e.preventDefault();
      menu.addEventListener("hidden.bs.offcanvas", () => {
        target.scrollIntoView();
        history.pushState(null, "", href);
      }, { once: true });
      offcanvas.hide();
    });
  });
}

// Background parallax: the dot grid and the hero glow move slower than the page
const bgGrid = document.querySelector(".bg-grid");
const heroGlow = document.querySelector(".hero-glow");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && (bgGrid || heroGlow)) {
  const gridSize = bgGrid ? parseFloat(getComputedStyle(bgGrid).backgroundSize) : 0;
  let ticking = false;

  const updateParallax = () => {
    const y = window.scrollY;
    // The grid only needs to shift within one tile to look endless
    if (bgGrid) bgGrid.style.transform = `translate3d(0, ${-((y * 0.3) % gridSize)}px, 0)`;
    if (heroGlow) heroGlow.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });
  updateParallax();
}

// Current year in the footer
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------------
// Level select (home page)
// ---------------------------------------------------------------------------
const levelList = document.getElementById("level-list");
const levelFilters = document.getElementById("level-filters");

// number: position in the full list (keeps "Level 03" even when filtered)
// reverse: puts the image on the right, so rows keep alternating after filtering
function levelTemplate(p, number, reverse) {
  const video = p.preview
    ? `<video src="${p.preview}" muted loop playsinline preload="none" aria-hidden="true"></video>
       <span class="preview-badge">▶ Hover to preview</span>`
    : "";

  return `
    <article class="level">
      <a href="${p.url}" class="level-link row g-4 g-lg-5 align-items-center">
        <div class="col-lg-7 ${reverse ? "order-lg-2" : ""}">
          <div class="level-media">
            <img src="${p.thumbnail}" alt="${p.title} screenshot" loading="lazy">
            ${video}
          </div>
        </div>
        <div class="col-lg-5">
          <p class="label">Level ${levelNumber(number)}</p>
          <h3 class="level-title">${p.title}</h3>
          <p class="level-summary">${p.summary}</p>
          <dl class="level-specs">
            <div><dt>Role</dt><dd>${p.role}</dd></div>
            <div><dt>Tech</dt><dd>${p.engine}</dd></div>
            <div><dt>Team</dt><dd>${p.team}</dd></div>
            <div><dt>Year</dt><dd>${p.year}</dd></div>
          </dl>
          <ul class="tag-list">
            ${p.tags.map((t) => `<li class="tag">${t}</li>`).join("")}
          </ul>
          <span class="level-cta">View project <span class="arrow">→</span></span>
        </div>
      </a>
    </article>`;
}

// Play the gameplay clip on hover/focus (desktop) or when scrolled into view (touch)
let touchObserver = null;

function setupPreviews() {
  const isTouch = window.matchMedia("(hover: none)").matches;

  const play = (media) => {
    const video = media.querySelector("video");
    if (!video) return;
    media.classList.add("is-playing");
    video.play().catch(() => media.classList.remove("is-playing"));
  };
  const stop = (media) => {
    const video = media.querySelector("video");
    if (!video) return;
    media.classList.remove("is-playing");
    video.pause();
  };

  const medias = levelList.querySelectorAll(".level-media");

  if (isTouch) {
    if (touchObserver) touchObserver.disconnect();
    touchObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? play(e.target) : stop(e.target))),
      { threshold: 0.6 }
    );
    medias.forEach((m) => touchObserver.observe(m));
    return;
  }

  levelList.querySelectorAll(".level-link").forEach((link) => {
    const media = link.querySelector(".level-media");
    link.addEventListener("mouseenter", () => play(media));
    link.addEventListener("mouseleave", () => stop(media));
    link.addEventListener("focus", () => play(media));
    link.addEventListener("blur", () => stop(media));
  });
}

function renderLevels(activeTag) {
  const visible = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => !activeTag || p.tags.includes(activeTag));

  levelList.innerHTML = visible.map(({ p, i }, pos) => levelTemplate(p, i, pos % 2 === 1)).join("");
  const pad = (n) => String(n).padStart(2, "0");
  document.querySelectorAll("[data-project-count]").forEach((el) => {
    el.textContent = activeTag
      ? `${pad(visible.length)} of ${pad(PROJECTS.length)} projects`
      : `${pad(PROJECTS.length)} projects`;
  });
  setupPreviews();
}

// Tag filter buttons: "All 4", "Unity 2", ... in the order of TAGS (js/projects.js)
function renderFilters() {
  const tags = TAGS
    .map((t) => [t, PROJECTS.filter((p) => p.tags.includes(t)).length])
    .filter(([, count]) => count > 0);

  const button = (label, count, tag, pressed) =>
    `<button type="button" class="filter-btn" data-tag="${tag}" aria-pressed="${pressed}">
       ${label}<span class="filter-count">${count}</span>
     </button>`;

  levelFilters.innerHTML =
    button("All", PROJECTS.length, "", true) + tags.map(([t, n]) => button(t, n, t, false)).join("");

  levelFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    levelFilters.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    renderLevels(btn.dataset.tag);
  });
}

if (levelList && typeof PROJECTS !== "undefined") {
  if (PROJECTS.length === 0) {
    // No projects yet: no filters or count, just a short note
    levelList.innerHTML = `<p class="level-empty">Projects coming soon.</p>`;
  } else {
    if (levelFilters) renderFilters();
    renderLevels();
  }
}

// ---------------------------------------------------------------------------
// Project page: level number + "next level" link
// ---------------------------------------------------------------------------
const currentSlug = document.body.dataset.project;

if (currentSlug && typeof PROJECTS !== "undefined") {
  const i = PROJECTS.findIndex((p) => p.slug === currentSlug);

  if (i !== -1) {
    document.querySelectorAll("[data-level-number]").forEach((el) => {
      el.textContent = `Level ${levelNumber(i)}`;
    });

    const nextSlot = document.getElementById("next-level");
    const n = (i + 1) % PROJECTS.length;
    if (nextSlot && n !== i) {
      nextSlot.innerHTML = `
        <a href="${root}${PROJECTS[n].url}" class="next-level-link">
          <span class="label">Next level ${levelNumber(n)}</span>
          <span class="next-level-title">${PROJECTS[n].title} →</span>
        </a>`;
    }
  }
}
