/*
  Project list ("levels") shown on the home page, in this order.
  To add a project: add an object here and create its page in /projects
  (set <body data-project="..."> on that page to the same slug).

  tags:    one or more of the TAGS below. They are shown on the project and used by the
           filter buttons. Keep the spelling identical to TAGS.
  preview: optional short muted clip (5-10 s, .mp4/.webm) that plays on hover.
           Leave it as "" to show only the thumbnail.
*/
// Filter buttons above the list, in this order. Each one shows how many projects have
// that tag (a project can have several). A tag with no projects is not shown.
const TAGS = ["Unity", "Unreal Engine", "C++", "OpenGL", "Game Jam"];

const PROJECTS = [
  {
    slug: "untitled-platformer",
    title: "Untitled Platformer",
    summary: "A 2D precision platformer with a custom character controller and tight, responsive movement.",
    role: "Gameplay Programmer",
    engine: "Unity, C#",
    team: "Solo",
    year: 2026,
    tags: ["Unity"],
    thumbnail: "assets/img/projects/placeholder.svg",
    preview: "",
    url: "projects/example-project.html",
  },
  {
    slug: "coop-shooter",
    title: "Co-op Shooter Prototype",
    summary: "A 4-player online co-op shooter prototype. I built the weapon system and enemy behaviour trees.",
    role: "Gameplay & AI Programmer",
    engine: "Unreal Engine 5, C++",
    team: "Team of 6",
    year: 2026,
    tags: ["Unreal Engine", "C++"],
    thumbnail: "assets/img/projects/placeholder.svg",
    preview: "",
    url: "projects/example-project.html",
  },
  {
    slug: "tiny-engine",
    title: "Tiny Engine",
    summary: "A small 3D engine built from scratch: renderer, entity system and asset pipeline.",
    role: "Engine Programmer",
    engine: "C++, OpenGL",
    team: "Solo",
    year: 2025,
    tags: ["C++", "OpenGL"],
    thumbnail: "assets/img/projects/placeholder.svg",
    preview: "",
    url: "projects/example-project.html",
  },
  {
    slug: "game-jam-entry",
    title: "Game Jam Entry",
    summary: "A 48-hour jam game. I handled enemy AI and the core combat loop.",
    role: "AI & Gameplay Programmer",
    engine: "Unity, C#",
    team: "Team of 4",
    year: 2025,
    tags: ["Unity", "Game Jam"],
    thumbnail: "assets/img/projects/placeholder.svg",
    preview: "",
    url: "projects/example-project.html",
  },
];
