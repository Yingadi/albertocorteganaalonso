/*
  Project list shown on the home page, in this order.
  To add a project: add an object here and create its page in /projects by copying an existing
  project page ("url" points to that page). Also add the page to sitemap.xml and llms.txt.

  summary:   one short line (under ~15 words). The card shows: summary, role, "engine / year / team".
             Any of these can be left as "" and it's simply not shown.
  tags:      one or more of the TAGS below. Not shown on the card, they only drive the filter
             buttons. Keep the spelling identical to TAGS.
  preview:   short clip (.mp4, 3-8 s, no audio) that plays on its own in a loop, like a GIF.
             Put the videos in assets/video/<slug>/. Leave it as "" to show only the thumbnail.
  thumbnail: image shown while the clip loads, or instead of it if there's no clip.
             For projects with a clip, use a frame of it (assets/video/<slug>/poster.jpg), so the card
             never shows an empty box while the video loads.

  Example:
  {
    slug: "my-game",
    title: "My Game",
    summary: "One short line about the project.",
    role: "Gameplay Programmer",
    engine: "Unity, C#",
    year: 2026,
    team: "Solo",
    tags: ["Unity"],
    thumbnail: "",
    preview: "assets/video/my-game/preview.mp4",
    url: "projects/my-game.html",
  },
*/
// Filter buttons above the list, in this order. Each one shows how many projects have
// that tag (a project can have several). A tag with no projects is not shown.
const TAGS = ["Unity", "Unreal Engine", "C++", "Graphics Programming", "Game Jam"];

const PROJECTS = [
  {
    slug: "puppeteers",
    title: "Puppeteers",
    summary: "Online co-op 3D puzzle-platformer where your grappling hook is both weapon and movement.",
    role: "Network & Gameplay Programmer",
    engine: "Unreal Engine 5, C++",
    year: 2026,
    team: "Team of 3",
    tags: ["Unreal Engine", "C++"],
    thumbnail: "assets/video/puppeteers/poster.jpg",
    preview: "assets/video/puppeteers/preview.mp4",
    url: "projects/puppeteers.html",
  },
  {
    slug: "procedural-voxel-game",
    title: "Procedural Voxel Game",
    summary: "Infinite Minecraft-style voxel world, built solo in 10 days for the AEVI DevContest.",
    role: "Gameplay & Systems Programmer",
    engine: "Unity 6, C#",
    year: 2026,
    team: "Solo",
    tags: ["Unity"],
    thumbnail: "assets/video/procedural-voxel-game/poster.jpg",
    preview: "assets/video/procedural-voxel-game/preview.mp4",
    url: "projects/procedural-voxel-game.html",
  },
  {
    slug: "edk-engine",
    title: "EDK Engine Reimplementation",
    summary: "Core modules of my school's C++/OpenGL engine, rewritten by us and used to build a 3D scene.",
    role: "Graphics & Engine Programmer",
    engine: "C++, OpenGL",
    year: 2026,
    team: "Team of 3",
    tags: ["C++", "Graphics Programming"],
    thumbnail: "assets/video/edk-engine/poster.jpg",
    preview: "assets/video/edk-engine/preview.mp4",
    url: "projects/edk-engine.html",
  },
];
