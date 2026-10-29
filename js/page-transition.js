/*
  Page transitions between the pages of the site (styles in css/style.css, "Page transitions").

  Going into a project ("forward"): the page slides out to the left and the project comes in
  from the right. Going back to the home page ("back"): the other way round. The navbar and the
  background stay still. Opening the site directly just fades it in.

  Loaded in <head> so the entrance animation is chosen before the page is painted.
  With "reduce motion" turned on in the system, nothing here runs and pages change instantly.
*/
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const html = document.documentElement;
  const LEAVE_MS = 220; // keep in sync with the page-out animations in css/style.css
  const ENTER_MS = 600; // a bit longer than the page-in animations

  function enter(direction) {
    html.classList.remove("page-leave-forward", "page-leave-back");
    html.classList.add(`page-enter-${direction}`);
    setTimeout(() => html.classList.remove(`page-enter-${direction}`), ENTER_MS);
  }

  // Exit animation, then navigate. Also used by "← All projects" in js/main.js
  function leave(direction, navigate) {
    sessionStorage.setItem("pageDirection", direction);
    html.classList.add(`page-leave-${direction}`);
    setTimeout(navigate, LEAVE_MS);
  }
  window.pageLeave = leave;

  // Entrance: the direction the previous page left in. The browser's back/forward buttons don't
  // go through leave(), so a history jump counts as "back"; opening the site directly, a fade.
  const stored = sessionStorage.getItem("pageDirection");
  sessionStorage.removeItem("pageDirection");
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;
  enter(stored || (navigationType === "back_forward" ? "back" : "fade"));

  // A page restored from the browser's back/forward cache would still show its exit animation
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) enter("back");
  });

  // Links to other pages of the site get the exit animation. Everything else is left alone:
  // other sites, new tabs, files like the CV, anchors on the same page, ctrl/cmd + click...
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;

    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    if (!/(\/|\.html)$/.test(url.pathname)) return; // only pages, not files

    e.preventDefault();
    const direction = url.pathname.includes("/projects/") ? "forward" : "back";
    leave(direction, () => { location.href = link.href; });
  });
})();
