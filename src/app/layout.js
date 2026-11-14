import "./globals.css";
import "./portfolio-refresh.css";
import localFont from "next/font/local";
import { InteractiveLayer } from "./components/interactive-layer";
import { siteUrl, siteTitle, siteDescription, socialImage } from "./seo";

const display = localFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "../../public/fonts/Manrope-Latin-Variable.woff2",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Akansh Sirohi",
  },
  description: siteDescription,
  authors: [{ name: "Akansh Sirohi", url: siteUrl }],
  creator: "Akansh Sirohi",
  category: "technology",
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Akansh Sirohi",
    locale: "en_IN",
    type: "website",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", creator: "@akansh__sirohi", title: siteTitle, description: siteDescription, images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} data-theme="dark">
      <body>
        {children}
        <InteractiveLayer />
      </body>
    </html>
  );
}
