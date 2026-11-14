import "./globals.css";
import "./portfolio-refresh.css";
import localFont from "next/font/local";
import { InteractiveLayer } from "./components/interactive-layer";

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
  metadataBase: new URL("https://akanshsirohi.dev"),
  title: {
    default: "Akansh Sirohi — Software engineer & curious builder",
    template: "%s — Akansh Sirohi",
  },
  description:
    "Software engineer, open-source builder, and endlessly curious mind. Explore QuadQR, PromptVault, ShareX for Android and desktop, interactive web projects, and notes from the process.",
  openGraph: {
    title: "Akansh Sirohi — Building ideas into software.",
    description:
      "Independent experiments, useful applications, and notes from the process.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Akansh Sirohi — Building ideas into software.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
