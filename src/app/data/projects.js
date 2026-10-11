// Edit this collection to add a project. Detail pages are exported at build time.
export const projects = [
  {
    slug: "quadqr",
    title: "QuadQR",
    category: "Libraries",
    kind: "Experimental color matrix code",
    description:
      "A different way to encode information. Four colors, a denser data layer, and optional encrypted payloads in a QR-inspired format.",
    tags: ["JavaScript", "Computer vision", "Cryptography"],
    github: "https://github.com/akanshSirohi/QuadQR",
    live: "https://akanshsirohi.github.io/QuadQR/demo/",
    liveLabel: "Try the demo",
    headline: "What if a code could carry more?",
    body: "I built QuadQR to explore a question: could modern cameras read more information from the same area using color? The result is an independent matrix-code format with its own encoder, renderer, image and camera scanner, and browser demo.",
    features: [
      "RGBW encoding and optional experimental Triangle16 high-density mode",
      "Reed–Solomon error correction and perspective-aware scanning",
      "Optional AES-256-GCM encryption and Ed25519 signing",
      "Compression, benchmarks, and image reliability tools",
    ],
    note: "QuadQR is an experimental custom format. It requires a QuadQR-aware scanner; standard QR readers cannot decode it.",
    sections: [
      {
        title: "Color carries information",
        body: "The colors encode data: four RGBW states carry two raw bits per cell. Experimental Triangle16 splits body cells into two colored triangles for four raw bits. That mode is off by default and needs real-world testing.",
      },
      {
        title: "Recovery informed by the scanner",
        body: "Spectrum ECC uses color confidence to guide Reed–Solomon recovery and try bounded alternative readings. Spatial interleaving spreads neighboring data across the symbol to reduce concentrated damage. Recovered candidates still face error-correction and CRC checks.",
      },
      {
        title: "Protect the payload",
        body: "Optional AES-256-GCM encryption protects contents using a password or application key. Ed25519 signatures let applications verify payloads against a trusted public key. Encryption and signing can be combined; secret keys stay outside the symbol.",
      },
      {
        title: "Measure the idea",
        body: "The browser demo brings generation, camera scanning, compression, and image stress tests together. Capacity benchmarks compare equal matrix dimensions, but matching ECC labels do not establish equal damage tolerance. Raw density is only part of usable capacity.",
        links: [
          { label: "Explore the interactive demo", href: "https://akanshsirohi.github.io/QuadQR/demo/" },
        ],
      },
    ],
  },
  {
    slug: "promptvault",
    title: "PromptVault",
    category: "Applications",
    kind: "Offline-first prompt workspace",
    description:
      "A place for the prompts worth keeping. An offline-first Android workspace with on-device AI, cloud models, reusable templates, and chat grounded in your prompt library.",
    tags: ["Kotlin", "Jetpack Compose", "On-device AI", "Prompt workflows"],
    live: "https://play.google.com/store/apps/details?id=com.akansh.promptvault",
    liveLabel: "Get on Google Play",
    headline: "Your prompt library, put to work.",
    body: "PromptVault began with a personal problem: useful prompts were easy to lose and hard to reuse. I built the Android app end-to-end to bring prompt organization, AI-assisted writing, and execution into one workspace. It has reached 2K+ downloads on Google Play, with a local-first library at the center of the experience.",
    features: [
      "A built-in AI prompt generator that turns ideas into reusable templates",
      "On-device AI for refining and running prompts locally",
      "Text and JSON templates with variables and live previews",
      "Collections, tags, favorites, and smart search for a growing library",
      "Cloud AI chat with retrieval from saved prompts",
      "A browser companion, optional sync, and encrypted backups",
    ],
    note: "PromptVault is a closed-source Android application, built with Kotlin and Jetpack Compose. Download it on Google Play.",
    sections: [
      {
        title: "AI that runs on your device",
        body: "On-device models let you generate titles and descriptions, improve wording, and run prompts locally. Choose a model from the built-in catalog or import a compatible model. The core prompt library also works without signing in, so saving and organizing your work does not depend on a cloud connection.",
      },
      {
        title: "An idea in. A reusable prompt out.",
        body: "The built-in AI prompt generator, AI Prompt Creator, turns a short brief into a prompt you can edit and save. It suggests variables and defaults to make the result reusable for different inputs. AI assistance in the editor helps write and optimize the body, title, and description, while live previews show the finished prompt before you copy or run it.",
      },
      {
        title: "Chat with your prompt library",
        body: "Test saved prompts in conversations with their own model and instructions, and follow responses as they stream. Prompts RAG retrieves relevant prompts from your library and surfaces them in assistant replies. Its search embeddings stay on your device; the chat workflow uses a supported cloud model. AI Prompt Creator and cloud chat require sign-in and a configured Cloud Ollama account, and retrieval also needs the local embedding model.",
      },
      {
        title: "Keep useful work within reach",
        body: "Collections, tags, favorites, and smart search make a growing library easier to navigate. PromptVault Web brings that library to another device's browser over the same Wi-Fi or hotspot, with password protection and read-only access options. Optional cloud sync and encrypted local or Google Drive backups help preserve your work. Web hosting and cloud features require leaving the app's offline mode.",
        links: [
          { label: "Get PromptVault on Google Play", href: "https://play.google.com/store/apps/details?id=com.akansh.promptvault" },
        ],
      },
    ],
  },
  {
    slug: "quadqr-sdk",
    title: "QuadQR SDK",
    category: "Libraries",
    kind: "Rust implementation & platform bindings",
    description:
      "QuadQR beyond JavaScript. A reusable Rust implementation with native bridges for Android and Flutter, plus an experimental WebAssembly adapter.",
    tags: ["Rust", "Android", "Flutter", "WebAssembly"],
    github: "https://github.com/akanshSirohi/QuadQR-SDK",
    headline: "One format. More possibilities.",
    body: "QuadQR SDK implements the color-code format in Rust so other technologies can reuse its encoding, rendering, and scanning logic. Platform bindings connect that shared core to application code.",
    features: [
      "Reusable Rust encoder, decoder, renderer, and scanner",
      "Java/Kotlin Android AAR and Android Flutter FFI bindings",
      "Experimental Rust/WASM adapter for browser and Node.js use",
      "Compression, encryption, signing, and SVG/PNG rendering",
    ],
    note: "The original JavaScript implementation remains the recommended web implementation. The WASM adapter is experimental.",
    sections: [
      {
        title: "A core other technologies can use",
        body: "Use the Rust library directly or integrate through native bridges. C ABI and JNI interfaces connect the core to Java/Kotlin Android apps; Flutter uses FFI and currently targets Android.",
      },
      {
        title: "The same color format",
        body: "The codec follows the JavaScript v6 reference, supporting RGBW and experimental Triangle16, Reed–Solomon recovery, compression, encryption, and signatures. Matching format envelopes allow implementations to exchange codes. Decoding still requires a QuadQR-aware scanner.",
      },
      {
        title: "Explore on desktop",
        body: "A desktop demo combines generation, image and camera scanning, reliability experiments, and benchmarking. SVG and PNG output support application workflows, while configurable Rust features let integrators choose the capabilities they need.",
        links: [
          { label: "Read the SDK integration guide", href: "https://github.com/akanshSirohi/QuadQR-SDK#readme" },
        ],
      },
    ],
  },
  {
    slug: "sharex",
    title: "ShareX",
    category: "Applications",
    kind: "Local file sharing",
    description:
      "Files from here to there. A private, open-source sharing app that connects your devices over a local network, even without the internet.",
    tags: ["Android", "Local networks", "Open source", "Plugins"],
    github: "https://github.com/akanshSirohi/shareX",
    live: "https://play.google.com/store/apps/details?id=com.akansh.sharex",
    liveLabel: "Get on Google Play",
    headline: "File sharing, simplified.",
    body: "ShareX turns an Android device into a local file server with a web interface. Other devices can send and receive files through their browsers, without needing the same app. Share a folder or selected files, preview downloads, and follow live transfer progress over Wi-Fi or a hotspot. It works across Windows, macOS, Linux, Android, and iPhone.",
    features: [
      "Share over Wi-Fi or a hotspot without internet access",
      "Share a folder or choose individual files in Private mode",
      "Browse, preview, upload, download, and manage files in a browser",
      "Approve browser access, remember trusted browsers, and revoke access",
      "Scan connection QR codes and track transfer progress, speeds, and history",
      "Configure HTTPS, sharing ports, hidden files, themes, and file modification restrictions",
      "Install plugins from the Store or ZIP files and manage them in the app",
    ],
    sections: [
      {
        title: "Download ShareX",
        body: "Get ShareX on Google Play, or visit GitHub for downloads and source code. Send files between nearby devices without cables, browse shared files from a web browser, and control access with browser approvals and Private mode. Local transfers work offline; online features such as the plugin Store use internet access.",
        links: [
          { label: "Get on Google Play", href: "https://play.google.com/store/apps/details?id=com.akansh.sharex" },
          { label: "Download from GitHub", href: "https://github.com/akanshSirohi/shareX" },
        ],
      },
      {
        title: "Build plugins with SharexSDK",
        body: "ShareX has its own plugin ecosystem, open to anyone who wants to collaborate on plugin development. SharexSDK is a JavaScript SDK for WebSocket messaging, connected browser information, and persistent JSON storage. Enable Plugin development in ShareX to connect a plugin running on your computer, then package it as a ZIP for installation. Explore the SDK and plugin development repository to build new capabilities or contribute improvements.",
        links: [
          { label: "Plugin development & SharexSDK", href: "https://github.com/akanshSirohi/SharexSDK" },
        ],
      },
    ],
  },
  {
    slug: "dezk",
    hidden: true,
    title: "Dezk",
    category: "Applications",
    kind: "Your phone. Your PC remote.",
    description:
      "A pocket-sized command center. Control your PC with a mouse pad, keyboard, shortcuts, and automation from your Android phone.",
    tags: ["Android", "Automation", "Desktop"],
    live: "https://play.google.com/store/apps/details?id=com.anonic.dezk",
    liveLabel: "Get on Google Play",
    headline: "Your desk, at your fingertips.",
    body: "Dezk connects your Android phone and PC to make everyday desktop interactions more convenient. It combines mouse and keyboard input with clipboard sharing, quick shortcuts, and macros in an ad-free application.",
    features: [
      "Full mouse pad and keyboard controls",
      "Clipboard sync and text pasting between devices",
      "Batch, VBS, and PowerShell macro automation",
      "Screen recording, brightness, and volume controls",
    ],
  },
  {
    slug: "qrsmith",
    title: "QRSmith",
    category: "Libraries",
    kind: "Custom QR codes for Android",
    description:
      "Give a familiar square some character. An Android library for branded QR codes with custom patterns, finder shapes, logos, and backgrounds.",
    tags: ["Java", "Android", "Creative tooling"],
    github: "https://github.com/akanshSirohi/QRSmith",
    headline: "Small squares. Big personality.",
    body: "QRSmith gives Android developers fine-grained control over the look of a QR code. Customize its patterns and finder shapes, add a logo or background, and tune its quiet zone and error correction to fit the application.",
    features: [
      "Custom data patterns and independent finder shapes",
      "Logo integration and image backgrounds",
      "Configurable colors, size, and quiet zones",
      "Error correction and tolerance mode for decorative designs",
    ],
  },
  {
    slug: "jewelry-try-on",
    title: "Jewelry Virtual Try-On",
    category: "Client work",
    kind: "Interactive 3D · Keyideas Infotech",
    description:
      "Jewelry, before the fitting. A browser-based try-on experience that tracks hands and positions 3D rings and bracelets on live video or uploaded images.",
    tags: ["Next.js", "Three.js", "MediaPipe"],
    headline: "From hand tracking to a convincing fit.",
    body: "At Keyideas Infotech, I developed a web-based jewelry try-on experience using MediaPipe hand tracking and Three.js. The work combined rendering, hand-pose interpretation, and interaction design to keep rings and bracelets aligned across mobile and desktop browsers.",
    features: [
      "Live camera and image-based try-on paths",
      "Finger segmentation, occlusion masking, and palm-side visibility",
      "Consistent alignment and multi-ring stacking",
      "Model preloading, adaptive scaling, and drag/pinch/zoom controls",
      "Image fallback for iOS and lower-end devices",
    ],
    note: "Professional work developed at Keyideas Infotech. This case study describes my contribution; the implementation is not published as an open-source repository.",
  },
  {
    slug: "diamond-catalog",
    title: "Diamond Catalog Automation",
    category: "Client work",
    kind: "Backend tooling · Keyideas Infotech",
    description:
      "From vendor feeds to a usable catalog. Internal WordPress tools that normalize and synchronize more than one million diamond SKUs with WooCommerce.",
    tags: ["PHP", "MySQL", "WordPress", "Background jobs"],
    headline: "A large catalog needs a reliable pipeline.",
    body: "I developed internal WordPress plugins to ingest, normalize, and synchronize diamond data from multiple vendors. The work covered both a recurring high-volume import pipeline and automation that configures a jewelry storefront to sell diamonds end-to-end.",
    features: [
      "Vendor API and feed ingestion for more than one million diamond SKUs",
      "Batched imports, validation, background jobs, and scheduled synchronization",
      "Database indexing to support fast search and listing pages",
      "Product attributes, pricing rules, and catalog filters",
      "Build Your Own Ring flow that pairs a setting with a diamond",
    ],
    note: "Professional work developed at Keyideas Infotech. Internal plugin source is not publicly available.",
  },
  {
    slug: "jewelry-ecommerce",
    title: "Jewelry E-commerce",
    category: "Client work",
    kind: "E-commerce engineering · Keyideas Infotech",
    description:
      "Custom jewelry storefronts and product tools. WordPress and WooCommerce plugins, ring-building workflows, flexible product filters, and R&D into realistic 3D jewelry viewing.",
    tags: ["WordPress", "WooCommerce", "PHP", "3D visualization", "Product R&D"],
    headline: "Helping customers find the right piece.",
    body: "At Keyideas Infotech, I develop custom plugins and contribute to R&D for company products alongside building and maintaining jewelry e-commerce websites. My work includes Ring Builder, Universal Product Filters, and a 3D Jewellery Viewer, spanning product configuration, easier catalog navigation, and realistic visual presentation.",
    features: [
      "Custom WordPress and WooCommerce plugin development",
      "Ring Builder for jewelry configuration and ring-design workflows",
      "Universal Product Filters for easier filter management and product discovery",
      "3D Jewellery Viewer work focused on realistic jewelry and diamond effects",
      "Research and development for company products",
      "Product catalogs, diamond listings, search, and wishlist functionality",
      "Production troubleshooting and stable iterative releases",
      "Site performance improvements across client projects",
    ],
    note: "Professional work developed at Keyideas Infotech across multiple client jewelry storefronts.",
    sections: [
      {
        title: "Plugins shaped around the product",
        body: "I create custom plugins for jewelry commerce, including Ring Builder for ring configuration and Universal Product Filters for easier filter management. The work connects the customer's shopping experience with the tools a team needs to manage its storefront.",
      },
      {
        title: "Exploring realistic 3D jewelry",
        body: "I also worked on a 3D Jewellery Viewer, exploring how to recreate realistic jewelry and diamond effects. This work focuses on the visual qualities that help a digital piece communicate its appearance beyond a conventional product image.",
      },
      {
        title: "Research that informs company products",
        body: "My role includes R&D for company products: investigating approaches, experimenting with features, and developing custom solutions. Alongside that exploration, I maintain client storefronts, improve performance, and resolve production issues as the products evolve.",
      },
    ],
  },
].filter((project) => !project.hidden);
