# Akansh Sirohi — Portfolio

An editorial portfolio built with **Next.js App Router and JavaScript**, exported to static HTML. No API routes, database, server actions, or runtime server are required.

## Run locally

```sh
yarn install
yarn dev
```

## Build and preview the static site

```sh
yarn lint
yarn build
yarn start
```

`yarn build` exports the website into `out/`. `yarn start` serves that directory; it does not start a Next.js application server. The existing GitHub Pages workflow in `.github/workflows/deploy.yml` is retained and still deploys `out/` on pushes to `master` or manual dispatch.

## Edit projects

Update `src/app/data/projects.js`. Each entry needs a unique `slug`, title, category, kind, description, tags, headline, body, and features. `github`, `live`, `liveLabel`, and `note` are optional. Every project gets a static `/projects/[slug]` page. Project artwork lives in `src/app/components/project-visual.js` and is illustrative, not a scannable code or application screenshot.

Included: QuadQR, QuadQR SDK, ShareX, Dezk, QRSmith, PromptVault, Jewelry Virtual Try-On, Diamond Catalog Automation, and Jewelry E-commerce. The three professional projects have a Client work filter and résumé-based case studies. GitHub Cards API has been removed.

## Add LinkedIn posts and DEV articles

Update `src/app/data/posts.js`. Entries support either a LinkedIn embed or a plain link with your own preview text.

### LinkedIn embed

Copy the `src` and `height` from LinkedIn’s official embed snippet. Do not paste raw iframe HTML into the file.

```js
{
  id: 'a-unique-id',
  platform: 'LinkedIn',
  title: 'A descriptive post title',
  label: 'Project update',
  url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:YOUR_ID/',
  embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:YOUR_ID?collapsed=1',
  height: 602,
}
```

Posts load only when a reader expands them. The original link stays available because LinkedIn controls embed availability, login requirements, and third-party loading. Duplicate embed URLs are shown once.

### Link-only post or article

```js
{
  id: 'another-unique-id',
  platform: 'DEV', // or 'LinkedIn'
  title: 'Your article title',
  summary: 'Your short introduction to the article.',
  label: 'Engineering · Project name',
  url: 'https://dev.to/your-profile/your-article',
}
```

Plain links get local editorial previews, including the supplied DEV article and PromptVault LinkedIn post. They do not depend on scraping, an embedding API, or an iframe supported by the destination site. Eight unique supplied LinkedIn embeds are included. The supplied posts have descriptive titles and summaries fetched from their public LinkedIn content. You can edit these in the same file.

## Site structure

- `/`: Work, About, Experience, Field notes, and Contact.
- `/projects` and `/projects/[slug]`: Project index and individual projects.
- `/resume`: A rendered résumé preview with direct PDF view and download links.
- `/notes`: All field notes with platform filters and expandable LinkedIn embeds.
- `/skills`, `/experience`, `/contact`: Existing URLs retained with the new design.

Skills and social profile data remain in `src/app/data/DB.json`. Experience is in `src/app/components/portfolio.js`. The original detailed project Markdown files for ShareX, Dezk, and QRSmith are preserved as reference material; the new detail pages use the curated project collection.

## Résumé

The supplied résumé is stored unchanged at `public/Akansh-Sirohi-Resume.pdf`. Replace this file to update the download, regenerate `public/resume-preview.webp` from the PDF for the preview, and update the experience and project collections separately to match. The rendered preview works without a browser PDF plugin; the direct PDF link opens the original document.

## Interactive developer details

Light and dark themes follow system preference initially and remember manual selection in local storage. The header toggle is available on every page. A prepaint script applies the theme before hydration.

The hero includes **Name Lab**, a visitor's name assembled from 3,200 spring-driven particles in Three.js. Move the pointer through the lettering to scatter nearby particles; they return to the name when the pointer leaves. A tap/click creates a travelling ripple, and Space or Enter on the focused artwork creates a centered ripple. Names have a deterministic color palette, depth pattern, motion phase, and signature ID. Inputs are normalized for the generated result, with long names wrapping across lines. Unicode names use the browser's local fallback fonts. No visitor name is stored or sent to a service.

**Save your signature** creates an 1800×1200 PNG card with the settled particle name, its palette, and the signature ID. The live scene and export share the shape generator in `src/app/components/name-signature.js`. Export works without WebGL and under reduced motion. Edit the curated palettes in that file and the Name Lab copy/default name in `src/app/components/name-lab.js`. Reduced motion and unavailable WebGL show readable local typography instead of running the simulation.

The muted binary background remains a decorative developer detail, with faster local flipping and a brighter accent around the pointer. The name experiment replaces the globe, byte console, and character navigation.

The Name Lab Pause control stops its simulation and automatic sculpture motion. Select Explore in 3D for direct camera control: drag to rotate, wheel/pinch to zoom, and right-drag/two-finger drag to pan. Reset view restores the camera; Pointer mode restores the original camera and hover behavior. The focused canvas also supports arrow-key panning, Shift + arrows for rotation, +/− zoom, 0 to reset, and Escape to return to Pointer mode. Orbit mode renders on interaction rather than running an idle animation loop; touch scrolling remains available in Pointer mode.

React Bits Particles’ point shader approach is adapted to Three.js in `src/app/components/hero-scene.js`; attribution and the upstream license are retained in `public/licenses/react-bits.txt`. Name Lab adds local font-mask sampling, spring physics, pointer repulsion, touch ripples, and export without additional animation packages. Decrypted Text, Spotlight Card, and Magnet also informed original binary label reveals, pointer lighting over project artwork, and magnetic project arrows. Labels retain stable accessible text. Pointer effects are limited to fine pointers and disabled for reduced motion.

A pointer reticle is available for fine mouse pointers. Press Ctrl/⌘ K or `/`, or use the header button, to search projects, technologies, pages, or theme commands. Arrow keys and Enter navigate results; Escape closes the palette. No search service or backend is involved.

## Motion and accessibility

GSAP handles the introduction, scroll choreography, project parallax, pointer tilt, and post expansion, with cleanup on unmount or filtering. A lazy-loaded Three.js / WebGL hero renders the interactive name sculpture. Its rendering pauses off screen, when the tab is hidden, or through the pause control; pixel density is capped for mobile performance. Local typography remains available when WebGL cannot load. Reduced motion disables these effects and avoids loading Three.js. Content is rendered into the exported HTML and remains readable without JavaScript. Navigation, filters, and post controls support keyboard interaction, visible focus, and accessible labels.

Local display typography keeps builds independent of Google Fonts. Static sitemap, robots metadata, and project metadata are generated at build time.
