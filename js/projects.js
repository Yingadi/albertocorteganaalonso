/*
  Project list ("levels") shown on the home page, in this order.
  To add a project: add an object here and create its page in /projects by copying
  projects/_template.html (set <body data-project="..."> on that page to the same slug).

  tags:    one or more of the TAGS below. They are shown on the project and used by the
           filter buttons. Keep the spelling identical to TAGS.
  preview: optional short muted clip (5-10 s, .mp4/.webm) that plays on hover.
           Leave it as "" to show only the thumbnail.

  Example:
  {
    slug: "my-game",
    title: "My Game",
    summary: "One or two lines about the project and what you did on it.",
    role: "Gameplay Programmer",
    engine: "Unity, C#",
    team: "Solo",
    year: 2026,
    tags: ["Unity"],
    thumbnail: "assets/img/projects/placeholder.svg",
    preview: "",
    url: "projects/my-game.html",
  },
*/
// Filter buttons above the list, in this order. Each one shows how many projects have
// that tag (a project can have several). A tag with no projects is not shown.
const TAGS = ["Unity", "Unreal Engine", "C++", "OpenGL", "Game Jam"];

const PROJECTS = [];
