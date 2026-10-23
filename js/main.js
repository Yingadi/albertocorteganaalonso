// Navbar: add a border/background once the page is scrolled
const nav = document.querySelector(".site-nav");
if (nav) {
  const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
}

// Close the mobile menu after clicking a link
document.querySelectorAll(".site-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector(".navbar-collapse.show");
    if (menu) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// Current year in the footer
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------------
// Project grid + tag filters (home page only)
// ---------------------------------------------------------------------------
const grid = document.getElementById("project-grid");
const filters = document.getElementById("project-filters");

function renderProjects(activeTag) {
  const list = activeTag ? PROJECTS.filter((p) => p.tags.includes(activeTag)) : PROJECTS;

  grid.innerHTML = list
    .map(
      (p) => `
      <div class="col-md-6 col-lg-4">
        <article class="project-card">
          <img src="${p.thumbnail}" alt="${p.title} screenshot" loading="lazy">
          <div class="card-body">
            <p class="meta mb-2">${p.year} / ${p.team}</p>
            <h3><a href="${p.url}" class="stretched-link">${p.title}</a></h3>
            <p class="text-muted-soft mb-3">${p.summary}</p>
            <ul class="tag-list">
              ${p.tags.map((t) => `<li class="tag">${t}</li>`).join("")}
            </ul>
          </div>
        </article>
      </div>`
    )
    .join("");
}

function renderFilters() {
  const tags = TAGS.filter((t) => PROJECTS.some((p) => p.tags.includes(t)));
  const buttons = ["All", ...tags].map(
    (tag, i) =>
      `<button type="button" class="filter-btn" data-tag="${i === 0 ? "" : tag}" aria-pressed="${i === 0}">${tag}</button>`
  );
  filters.innerHTML = buttons.join("");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    renderProjects(btn.dataset.tag);
  });
}

if (grid && filters && typeof PROJECTS !== "undefined") {
  renderFilters();
  renderProjects();
}
