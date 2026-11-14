"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Aurora = dynamic(() => import("./react-bits/Aurora"), { ssr: false });
const SoftAurora = dynamic(() => import("./react-bits/SoftAurora"), { ssr: false });
const LightRays = dynamic(() => import("./react-bits/LightRays"), { ssr: false });
const Lightfall = dynamic(() => import("./react-bits/Lightfall"), { ssr: false });
const GradientASCII = dynamic(() => import("./react-bits/GradientASCII"), { ssr: false });

export function ContactBackdrop() {
  const root = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [near, setNear] = useState(false);
  const [variant, setVariant] = useState("gradient-ascii");
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("contactBackground");
    if (["aurora", "soft-aurora", "light-rays", "lightfall", "gradient-ascii"].includes(preview)) setVariant(preview);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNear(true);
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={root} className={`contact-backdrop contact-backdrop--${variant}`} aria-hidden="true">
      {near && enabled && (variant === "gradient-ascii" ? <GradientASCII
        colors={["#321356", "#824fd5", "#d1a8ff", "#f0d5ff"]}
        shape="horizon" characters=" .:+xX01#@" cellSize={14}
        density={0.85} glyphOpacity={0.9} gradientOpacity={0.55}
        glow={0.12} flicker={0.12} grain={0.025} speed={0.65}
        flow={0.65} dpr={1.5} intro={false}
        mouseInteraction clickEffect="wave"
      /> : variant === "lightfall" ? <Lightfall
        colors={["#bda1ff", "#eadbff", "#a78bfa"]}
        backgroundColor="#39205d" speed={0.45}
        streakCount={4} streakWidth={0.65} streakLength={1.1}
        glow={0.9} density={0.65} twinkle={0.15} zoom={3}
        backgroundGlow={0.12} headGlow={0.55} bloom={0.3}
        opacity={0.9} mouseStrength={0.25} lens={0.3}
        holdToWarp={false} dpr={1.25} intro={false}
      /> : variant === "aurora" ? <Aurora
        colorStops={["#7a43d1", "#b89be8", "#9262ec"]}
        amplitude={1.1} height={0.75} blend={0.6} layers={2}
        glow={0.55} brightness={0.8} speed={0.9} dpr={1.5}
        intro={false}
      /> : variant === "light-rays" ? <LightRays
        raysOrigin="top-right" raysColor="#ccb3ff" raysSpeed={0.8}
        lightSpread={0.8} rayLength={2.2} raySharpness={0.6}
        intensity={1.1} glow={0.45} haze={0.2} noiseAmount={0.015}
        cursorShadow={false} maxDevicePixelRatio={1.5} intro={false}
      /> : <SoftAurora
        color1="#b197fc" color2="#6c39c5" spectrum={0.15}
        speed={0.65} scale={1.3} brightness={0.8} tilt={-15}
        bandHeight={0.5} bandSpread={1.25} noiseAmplitude={1}
        opacity={0.85} intro={false}
      />)}
    </div>
  );
}

