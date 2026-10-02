// Add an embedUrl copied from LinkedIn, or a url with your own title and summary.
// Links become static editorial previews; embeds load only when opened.
// Duplicate URLs/embeds are removed automatically by the journal component.
export const posts = [
  {
    id: "quadqr-story",
    platform: "DEV",
    title: "A QR code. With a little more color.",
    summary:
      "The story behind QuadQR: exploring four-color encoding, higher data density, and encrypted payloads in a QR-inspired format.",
    url: "https://dev.to/akanshsirohi/i-built-a-qr-inspired-code-that-uses-4-colors-stores-more-data-and-supports-encryption-195d",
    label: "Engineering · QuadQR",
    visual: "quadqr",
  },
  {
    id: "promptvault",
    platform: "LinkedIn",
    title: "From a prompt library to an AI workspace.",
    summary:
      "An update on PromptVault: an AI Prompt Creator and chat with RAG support to make an existing prompt collection more useful.",
    url: "https://www.linkedin.com/posts/akansh-sirohi_ai-promptengineering-productdevelopment-activity-7448646519110410240-OLue",
    label: "Building in public · PromptVault",
    visual: "prompt",
  },
  ...[
    [
      "share",
      "7507483876471046144",
      264,
      "Jev: an AI model built to decide",
      "Exploring fast decision-making models beyond the usual chat interface.",
    ],
    [
      "ugcPost",
      "7494345786852274176",
      620,
      "QR codes have been black and white for decades. I tried something different.",
      "The question that became QuadQR, and the engineering behind its four-color format.",
    ],
    [
      "ugcPost",
      "7366905294691512324",
      602,
      "The AI skills gap: why everyone is a beginner again",
      "Learning to navigate the changing tools and expectations around AI.",
    ],
    [
      "share",
      "7344059273884090368",
      477,
      "QRSmith 2.0: a customizable Android QR code library",
      "New patterns, finder shapes, and more control over the codes your app generates.",
    ],
    [
      "ugcPost",
      "7316757027878227969",
      602,
      "When AI outsmarts us: are we ready for the rise of AGI?",
      "Thinking through the implications of increasingly capable AI systems.",
    ],
    [
      "ugcPost",
      "7315663420089896960",
      602,
      "Is AI lying to us?",
      "A closer look at confident AI answers and the importance of questioning them.",
    ],
    [
      "ugcPost",
      "7308920777217646592",
      620,
      "Real use cases of generative AI for developers",
      "Practical ways to make generative AI part of a developer’s workflow.",
    ],
    [
      "share",
      "7246810528398893056",
      645,
      "Event-driven architecture and Kafka: powering APIs at scale",
      "How event-based systems can help backend services scale and communicate.",
    ],
  ].map(([type, id, height, title, summary]) => ({
    id,
    platform: "LinkedIn",
    title,
    summary,
    label: "LinkedIn post",
    url: `https://www.linkedin.com/feed/update/urn:li:${type}:${id}/`,
    embedUrl: `https://www.linkedin.com/embed/feed/update/urn:li:${type}:${id}?collapsed=1`,
    height,
  })),
];
