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
  // "menu-open" on the navbar fades the name out while the panel is open
  menu.addEventListener("show.bs.offcanvas", () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    nav.classList.add("menu-open");
  });
  menu.addEventListener("hide.bs.offcanvas", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("menu-open");
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
// Clips: <video class="clip"> behaves like a GIF. It plays muted and looping while it's on
// screen and pauses when it scrolls away, so only the visible ones use resources.
// With "reduce motion" turned on in the system (common on school/office PCs with Windows
// animations disabled), clips don't play on their own: on project pages they get the player
// controls so they can still be watched; the home page cards show their poster.
// ---------------------------------------------------------------------------
const clipObserver = reduceMotion
  ? null
  : new IntersectionObserver(
      (entries) => entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {}); // autoplay blocked: the poster stays
        else target.pause();
      }),
      { threshold: 0.25 }
    );

function setupClips(root = document) {
  root.querySelectorAll("video.clip").forEach((video) => {
    video.muted = true; // required for autoplay on mobile browsers
    if (clipObserver) clipObserver.observe(video);
    else if (!video.closest("a")) video.controls = true; // inside a card link, a click opens the project instead
  });
}

setupClips();

// ---------------------------------------------------------------------------
// Scroll reveal: blocks marked with data-reveal fade in and rise a little the first time they
// come into view (styles in css/style.css, "Scroll reveal"). With "reduce motion" they only fade.
// ---------------------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
    // Blocks already above the screen (e.g. coming back halfway down the home page) show at once
    if (isIntersecting || boundingClientRect.top < 0) {
      target.classList.add("is-revealed");
      revealObserver.unobserve(target);
    }
  }),
  { threshold: 0.15 }
);

function setupReveal(root = document) {
  root.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => revealObserver.observe(el));
}

// ---------------------------------------------------------------------------
// Project list (home page)
// ---------------------------------------------------------------------------
const levelList = document.getElementById("level-list");
const levelFilters = document.getElementById("level-filters");

// The project's clip if it has one (plays on its own, see setupClips), otherwise its image
function levelMedia(p) {
  if (!p.preview) return `<img src="${p.thumbnail}" alt="${p.title} screenshot" loading="lazy">`;

  // Without a thumbnail, preload="metadata" makes the browser show the clip's first frame
  const poster = p.thumbnail ? `poster="${p.thumbnail}"` : "";
  return `<video class="clip" src="${p.preview}" ${poster} preload="${p.thumbnail ? "none" : "metadata"}"
            muted loop playsinline disablepictureinpicture disableremoteplayback
            aria-label="${p.title} gameplay"></video>`;
}

// Minimal card: clip, title, one-line summary, role, and "tech / year / team".
// Empty fields are simply left out. Tags aren't shown here, they only drive the filter buttons.
// reverse: puts the media on the right, so rows keep alternating after filtering
function levelTemplate(p, reverse) {
  const meta = [p.engine, p.year, p.team].filter(Boolean).join(" / ");
  // Unique name so the filter animation can follow each card (see showTag)
  const id = p.slug.replace(/[^a-z0-9-]/gi, "-");

  return `
    <article class="level" data-reveal style="view-transition-name: level-${id}">
      <a href="${p.url}" class="level-link row g-4 g-xl-5 align-items-center">
        <div class="col-lg-7 ${reverse ? "order-lg-2" : ""}">
          <div class="level-media">${levelMedia(p)}</div>
        </div>
        <div class="col-lg-5">
          <h3 class="level-title">${p.title}</h3>
          ${p.summary ? `<p class="level-summary">${p.summary}</p>` : ""}
          ${p.role ? `<p class="level-role">${p.role}</p>` : ""}
          ${meta ? `<p class="level-meta">${meta}</p>` : ""}
          <span class="level-cta">View project <span class="arrow">→</span></span>
        </div>
      </a>
    </article>`;
}

function renderLevels(activeTag) {
  const visible = PROJECTS.filter((p) => !activeTag || p.tags.includes(activeTag));

  levelList.querySelectorAll("video.clip").forEach((v) => clipObserver?.unobserve(v));
  levelList.innerHTML = visible.map((p, pos) => levelTemplate(p, pos % 2 === 1)).join("");
  // After a filter change the cards are already on screen: show them now, the filter has its own animation
  if (activeTag !== undefined) levelList.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
  const pad = (n) => String(n).padStart(2, "0");
  document.querySelectorAll("[data-project-count]").forEach((el) => {
    el.textContent = activeTag
      ? `${pad(visible.length)} of ${pad(PROJECTS.length)} projects`
      : `${pad(PROJECTS.length)} projects`;
  });
  setupClips(levelList);
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
    showTag(btn.dataset.tag);
  });
}

// Animated filter change. With the View Transitions API, cards that stay slide to their new
// place, the ones leaving fade out and the new ones come in (styles in css/style.css).
// Browsers without it get a quick fade of the whole list; "reduce motion" just swaps it.
function showTag(tag) {
  if (reduceMotion) return renderLevels(tag);

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => renderLevels(tag));
    transition.ready.catch(() => {}); // the browser may skip it (e.g. clicking again mid-animation)
    return;
  }

  levelList.classList.add("is-switching");
  setTimeout(() => {
    renderLevels(tag);
    levelList.classList.remove("is-switching");
  }, 200);
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

setupReveal();

// Home page scroll position. Coming back from a project ("← All projects" or the browser's back
// button) puts the visitor exactly where they were. Arriving with an anchor instead
// (e.g. index.html#work) jumps straight there, while the page slides in.
if (levelList) {
  window.addEventListener("pagehide", () => sessionStorage.setItem("homeScroll", String(window.scrollY)));

  const navigation = performance.getEntriesByType("navigation")[0];
  const saved = sessionStorage.getItem("homeScroll");

  if (navigation?.type === "back_forward" && saved !== null) {
    window.scrollTo({ top: Number(saved), behavior: "instant" });
  } else if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView({ behavior: "instant" });
  }
}

// ---------------------------------------------------------------------------
// Project page
// ---------------------------------------------------------------------------
// "← All projects": when the visitor came from the home page, go back in history instead, so
// they land exactly where they were on it
const backLink = document.querySelector(".back-link");
if (backLink) {
  backLink.addEventListener("click", (e) => {
    const from = document.referrer ? new URL(document.referrer) : null;
    const cameFromHome = from && from.origin === location.origin && /\/(index\.html)?$/.test(from.pathname);
    if (cameFromHome && history.length > 1) {
      e.preventDefault();
      e.stopPropagation(); // handled here, not by the generic link handler in js/page-transition.js
      // Play the exit animation first if page transitions are on (see js/page-transition.js)
      if (window.pageLeave) window.pageLeave("back", () => history.back());
      else history.back();
    }
  });
}

