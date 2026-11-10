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
const TAGS = ["Unity", "Unreal Engine", "C++", "Graphics Programming"];

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
  {
    slug: "eldrin-tales",
    title: "Eldrin Tales",
    summary: "Top-down bullet hell for mobile with auto-aim shooting, an upgrade shop and saved progress.",
    role: "Gameplay & UI Programmer",
    engine: "Unity 6, C#",
    year: 2026,
    team: "Team of 2",
    tags: ["Unity"],
    thumbnail: "assets/video/eldrin-tales/poster.jpg",
    preview: "assets/video/eldrin-tales/preview.mp4",
    url: "projects/eldrin-tales.html",
  },
  {
    slug: "onevrjueguitomore",
    title: "OneVrJueguitoMore",
    summary: "VR dungeon game with hand tracking, where every hand gesture casts a spell.",
    role: "Gameplay Programmer",
    engine: "Unity 6, C#, OpenXR",
    year: 2026,
    team: "Team of 2",
    tags: ["Unity"],
    thumbnail: "assets/video/onevrjueguitomore/poster.jpg",
    preview: "assets/video/onevrjueguitomore/preview.mp4",
    url: "projects/onevrjueguitomore.html",
  },
  {
    slug: "aqua-rush",
    title: "Aqua Rush",
    summary: "Mobile infinite runner where a fish dodges sharks and sea rubbish while collecting coins.",
    role: "Gameplay Programmer",
    engine: "Unity 6, C#",
    year: 2026,
    team: "Team of 2",
    tags: ["Unity"],
    thumbnail: "assets/video/aqua-rush/poster.jpg",
    preview: "assets/video/aqua-rush/preview.mp4",
    url: "projects/aqua-rush.html",
  },
];

/*
  Game jams: shown in their own section below the projects, as smaller cards in two columns.
  They have no page of their own: the card links to the game's page ("url", e.g. itch.io).

  event:   name of the jam, its year and where we took part
  award:   the award won, written exactly as it was given. Shown as a plaque with a trophy on the
           card's clip. Leave "" if there wasn't one
  summary: what the game is about, in one or two short lines
  cta:    text of the link, e.g. "Play on itch.io" (browser build) or "View on itch.io" (download)
*/
const JAMS = [
  {
    slug: "survive-the-candy",
    title: "Survive The Candy",
    event: "Global Game Jam 2026, Valencia",
    award: "Best Game Work In Progress",
    summary: "Local co-op top-down game in 2.5D. Two players tied by a rope that can't break dash through candy villages, killing candy enemies with the rope while they look for breathing masks to survive.",
    engine: "Unity 6, C#",
    team: "Team of 8",
    thumbnail: "assets/video/survive-the-candy/poster.jpg",
    preview: "assets/video/survive-the-candy/preview.mp4",
    url: "https://elenam.itch.io/survive-the-candy",
    cta: "View on itch.io",
  },
  {
    slug: "quack-adventures",
    title: "Quack Adventures",
    event: "Global Game Jam 2025, Valencia",
    award: "",
    summary: "Local co-op platformer: one player controls the duck while the other places bubbles with the mouse as temporary platforms.",
    engine: "Unity, C#",
    team: "Team of 8",
    thumbnail: "assets/video/quack-adventures/poster.jpg",
    preview: "assets/video/quack-adventures/preview.mp4",
    url: "https://zer0-zzz.itch.io/quack-adventures",
    cta: "View on itch.io",
  },
];
