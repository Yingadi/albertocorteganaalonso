/*
  Filter buttons shown above the project grid, in this order.
  A project can have several of these tags; a tag with no projects is not shown.
*/
const TAGS = ["Unity", "Unreal Engine", "C++", "OpenGL", "Game Jam"];

/*
  Project list shown on the home page.
  To add a project: add an object to this array and create its page in /projects.
  Cards appear in the same order as here.
*/
const PROJECTS = [
  {
    title: "Untitled Platformer",
    summary: "A 2D precision platformer with a custom character controller and tight, responsive movement.",
    thumbnail: "assets/img/projects/placeholder.svg",
    tags: ["Unity"],
    year: 2026,
    team: "Solo",
    url: "projects/example-project.html",
  },
  {
    title: "Tiny Engine",
    summary: "A small 3D engine built from scratch: renderer, entity system and asset pipeline.",
    thumbnail: "assets/img/projects/placeholder.svg",
    tags: ["C++", "OpenGL"],
    year: 2025,
    team: "Solo",
    url: "projects/example-project.html",
  },
  {
    title: "Game Jam Entry",
    summary: "A 48-hour jam game. I handled enemy AI and the core combat loop.",
    thumbnail: "assets/img/projects/placeholder.svg",
    tags: ["Unity", "Game Jam"],
    year: 2025,
    team: "Team of 4",
    url: "projects/example-project.html",
  },
];
