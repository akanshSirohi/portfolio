"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ScrollVelocity from "./react-bits/ScrollVelocity";

const LightPillar = dynamic(() => import("./react-bits/LightPillar"), { ssr: false });

// Keep the decorative artwork useful without WebGL or JavaScript.
export function HeroBackdrop({ paused }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimated(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="pillar-fallback" />
      {animated && <LightPillar topColor="#5227ff" bottomColor="#ff9ffc" intensity={0.9} rotationSpeed={0.85} pillarWidth={2.6} pillarHeight={0.45} pillarRotation={24} glowAmount={0.0018} bloom={0.4} flow={1.3} quality="medium" interactive clickPulse paused={paused} />}
    </div>
  );
}

export function MotionRibbon() {
  return (
    <div className="motion-ribbon">
      <div className="ribbon-caption mono"><span>DIFFERENT TOOLS. SAME CURIOSITY.</span></div>
      <ScrollVelocity texts={["Backend systems / Desktop & Android apps / Open source /"]} velocity={30} skewWithVelocity={2} numCopies={4} scrollerClassName="ribbon-scroller" parallaxClassName="ribbon-parallax" />
    </div>
  );
}
