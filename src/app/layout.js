import "./globals.css";
import localFont from "next/font/local";
import { InteractiveLayer } from "./components/interactive-layer";

const display = localFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://akanshsirohi.dev"),
  title: {
    default: "Akansh Sirohi — Software engineer & curious builder",
    template: "%s — Akansh Sirohi",
  },
  description:
    "Software engineer, open-source builder, and endlessly curious mind. Explore QuadQR, PromptVault, Android applications, interactive web projects, and notes from the process.",
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
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}`,
          }}
        />
      </head>
      <body>
        {children}
        <InteractiveLayer />
      </body>
    </html>
  );
}
