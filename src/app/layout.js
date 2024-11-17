import "./globals.css";

import { Inter, Ubuntu } from 'next/font/google'
import LocalFont from 'next/font/local'

export const metadata = {
  title: {
    default: "Akansh Sirohi | Portfolio",
    template: "%s | Akansh Sirohi",
  },
  description: "Hi there, I'm Akansh 👋 Welcome to my small world of code. I'm a Software Engineer and AI Enthusiast!",
  metadataBase: new URL('https://akansh.vercel.app/'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    images: ['/favicon.png'],
  },
  icons: {
    shortcut: "/favicon.png",
  },
};


const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["400", "700"],
});

const calSans = LocalFont({
	src: "../../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable, ubuntu.variable].join(" ")}>
      <body
        className={`bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
