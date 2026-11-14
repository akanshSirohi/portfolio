export const siteUrl = "https://akanshsirohi.dev";
export const siteTitle = "Akansh Sirohi | Software Engineer";
export const siteDescription = "Akansh Sirohi is a software engineer in India building backend systems, web applications, and Android and desktop apps. Explore his projects, experience, and résumé.";
export const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Akansh Sirohi — Software Engineer",
};

export function pageMetadata(title, description, path) {
  const fullTitle = `${title} — Akansh Sirohi`;
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website", siteName: "Akansh Sirohi", locale: "en_IN",
      title: fullTitle, description, url: `${siteUrl}${path}`, images: [socialImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage] },
  };
}

export function StructuredData({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const profileData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": `${siteUrl}/#person`, name: "Akansh Sirohi",
      url: `${siteUrl}/`, jobTitle: "Software Engineer",
      description: siteDescription,
      knowsAbout: ["Backend engineering", "Web development", "Android development", "Desktop applications", "Open-source software"],
      sameAs: ["https://github.com/akanshSirohi", "https://www.linkedin.com/in/akansh-sirohi", "https://x.com/akansh__sirohi"],
    },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`,
      name: "Akansh Sirohi", alternateName: siteTitle,
      publisher: { "@id": `${siteUrl}/#person` }, inLanguage: "en",
    },
    {
      "@type": "ProfilePage", "@id": `${siteUrl}/#profile`, url: `${siteUrl}/`,
      name: siteTitle, description: siteDescription,
      mainEntity: { "@id": `${siteUrl}/#person` }, isPartOf: { "@id": `${siteUrl}/#website` },
    },
  ],
};
