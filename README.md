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

Update `src/app/data/projects.js`. Each entry needs a unique `slug`, title, category, kind, description, tags, headline, body, and features. `github`, `live`, `liveLabel`, and `note` are optional. Every project gets a static `/projects/[slug]` page. Project artwork lives in `src/app/components/project-visual.js` and `src/app/components/showcase.js`. Most artwork is illustrative; ShareX Android and Desktop use real app screenshots from the author's [ShareX website](https://sharex.akanshsirohi.dev/), stored locally at `public/images/sharex-android.webp` and `public/images/sharex-desktop.webp`. The Android artwork combines a framed phone screenshot with product typography on a dark green field.

Included: QuadQR, QuadQR SDK, ShareX, ShareX Desktop, QRSmith, PromptVault, Jewelry Virtual Try-On, Diamond Catalog Automation, and Jewelry E-commerce. ShareX and ShareX Desktop are separate standalone apps, linked to the shared product website and their respective repositories. Windows is the primary tested desktop platform; experimental macOS and Linux status follows the desktop project's documentation. The three professional projects have a Client work filter and résumé-based case studies. GitHub Cards API has been removed.

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

## React Bits and motion

The portfolio uses source components fetched from the official [React Bits](https://reactbits.dev/) JavaScript/CSS registry. Components live in `src/app/components/react-bits/`; the upstream license is preserved in `public/licenses/react-bits.txt`.

- **TargetCursor** replaces the native pointer on fine mouse devices with rotating brackets that snap around links, buttons, and project artwork. Touch, reduced motion, and the command dialog retain the native cursor.
- **TechText** renders both name lines with a pixel assembly entrance, automatic outline sweep, pointer interaction, selection frames, and glyph measurement labels. Local Cal Sans supplies the glyph shapes. The semantic heading and static fallback remain ordinary HTML.
- **TextType** types and deletes the hero's rotating roles with a blinking caret.
- **LightPillar** renders the animated violet light sculpture using WebGL2. It loads only when motion is allowed and pauses off screen, in hidden tabs, and when reduced motion is requested. A CSS glow remains available without WebGL.
- **LetterGlitch** supplies the contact section's violet field of animated letters, with **GradientASCII**, **Lightfall**, **SoftAurora**, **Aurora**, and **LightRays** retained as preview alternatives. These backgrounds load near the footer, pause off screen and in hidden tabs, and give way to a static CSS glow under reduced motion. Shading keeps the text and arrow-only contact link readable. Compare variants with `?contactBackground=letter-glitch#contact`, `?contactBackground=gradient-ascii#contact`, `?contactBackground=lightfall#contact`, `?contactBackground=soft-aurora#contact`, `?contactBackground=aurora#contact`, or `?contactBackground=light-rays#contact`; Letter Glitch is the default, and only the selected effect loads. LetterGlitch and Lightfall retain their contexts during Strict Mode cleanup so development remounts render correctly.
- **PixelTransition** reveals project headlines through a pixel ripple on hover, keyboard focus, or touch. Every project also has a persistent link outside the effect.
- **SpotlightCard** lights the project artwork around the pointer.
- **ScrollFloat** adds a restrained wave to the closing GitHub invitation.
- **SplitText** reveals the closing contact typography with a blur entrance.
- **Magnet**, **ScrollVelocity**, and **ScrollReveal** provide the magnetic work link, scroll-responsive discipline ribbon, and progressive introduction.

Local adaptations preserve static HTML, support live reduced-motion changes, add semantic tag selection to ScrollReveal, and stop ScrollVelocity updates outside the viewport. LightPillar releases its resources without forcing context loss during cleanup, which fixes React Strict Mode remounts. Lost contexts hide the canvas until restoration; paused frames retain a stable image. TechText measurement labels use 11px text on a dark backing so their dimensions remain readable over the artwork.

`src/app/components/showcase.js` contains the hero, project collection, and local project posters. `src/app/portfolio-refresh.css` defines the dark violet design, readable metadata, responsive typography, and unclipped display text. Name Lab is no longer rendered. The portfolio uses a consistent dark theme; theme and pause controls have been removed.

Press Ctrl/⌘ K or `/`, or use the header button, to search projects, technologies, or pages. Arrow keys and Enter navigate results; Escape closes the palette. No search service or backend is involved.

## Motion and accessibility

Reduced motion retains static name typography, static artwork, and readable content. Project information and links remain available outside hover effects. GSAP contexts, observers, listeners, animation frames, and timers are cleaned up on unmount or filtering.

Content is included in exported HTML and remains readable without JavaScript. Navigation, filters, and post controls support keyboard interaction, visible focus, and accessible labels. Cal Sans supplies display typography. Manrope from Google Fonts supplies body text and controls, hosted locally as a 24KB variable WOFF2. Its SIL Open Font License is retained in `public/licenses/manrope.txt`. Static sitemap, robots metadata, and project metadata are generated at build time.

### Search engine indexing

`src/app/seo.js` centralizes the production origin, per-page canonical URLs, descriptions, social previews, and homepage Person, WebSite, and ProfilePage structured data. Project detail pages include breadcrumb structured data. The sitemap includes all public pages and project routes without invented modification dates. `public/CNAME` preserves the custom domain and `.nojekyll` allows GitHub Pages to serve Next.js assets.

After deploying, verify `https://akanshsirohi.dev/` in [Google Search Console](https://search.google.com/search-console), preferably as a domain property using the DNS record Google provides. Alternatively, use URL-prefix verification with an HTML tag: store only the tag's `content` value in the repository Actions secret `GOOGLE_SITE_VERIFICATION`, then redeploy. The workflow passes this optional value to Next.js metadata at build time.

Submit `https://akanshsirohi.dev/sitemap.xml` in Search Console and request indexing for the homepage using URL Inspection. Check the live sitemap, robots.txt, canonical URLs, and social image after deployment. Indexing and rankings are controlled by search engines and are not guaranteed by metadata. Keep GitHub and LinkedIn profiles linked to this domain to make the professional identity consistent.
