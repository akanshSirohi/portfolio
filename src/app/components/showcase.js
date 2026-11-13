"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { Arrow } from "./icons";
import { CodePattern } from "./project-visual";
import { HeroBackdrop } from "./motion-system";
import TechText from "./react-bits/TechText";
import TextType from "./react-bits/TextType";
import SpotlightCard from "./react-bits/SpotlightCard";
import PixelTransition from "./react-bits/PixelTransition";
import Magnet from "./react-bits/Magnet";
import ScrollFloat from "./react-bits/ScrollFloat";

export function ImpactHero() {
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnhanced(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return (
    <section className="hero impact-hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="impact-intro"><p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER & INDEPENDENT BUILDER</p></div>
      <div className="impact-composition">
        <div className="impact-identity">
          <div className="impact-name">
            <h1 className="sr-only" id="hero-title">Akansh Sirohi.</h1>
            {enhanced ? <div className="tech-name-stage" aria-hidden="true">
              <TechText text="Akansh" className="hero-tech-text" fontSize={230} fontWeight={600} letterSpacing={-0.025} color="#f1ecfc" accentColor="#c8a5ff" align="left" reach={180} dashLength={5} dashGap={3} strokeWidth={1.4} labels draggable={false} selection sweep speed={1.5} intro="assemble" introDuration={1.6} />
              <TechText text="Sirohi." className="hero-tech-text" fontSize={230} fontWeight={600} letterSpacing={-0.025} color="#bda1ff" accentColor="#e3d1ff" align="left" reach={180} dashLength={5} dashGap={3} strokeWidth={1.4} labels draggable={false} selection sweep speed={1.5} intro="assemble" introDuration={2} />
            </div> : <div className="tech-name-static" aria-hidden="true">Akansh<br /><span>Sirohi.</span></div>}
          </div>
          <div className="impact-role"><span>I build</span>{enhanced ? <TextType text={["useful things.", "bold experiments.", "better systems."]} className="hero-typewriter" typingSpeed={65} deletingSpeed={35} pauseDuration={1800} initialDelay={400} cursorCharacter="_" /> : <span className="hero-typewriter">useful things.</span>}</div>
          <p className="hero-location-line mono">BASED IN INDIA / THINKING EVERYWHERE</p>
        </div>
      </div>
      <div className="impact-bottom">
        <p>Backend systems. Android apps. Open-source ideas.<br />A curious mind, making things that matter.</p>
        <div className="impact-actions"><Magnet padding={50} magnetStrength={4} maxOffset={14}><a href="#work" className="button impact-primary">Discover my work <Arrow diagonal /></a></Magnet><a href="https://github.com/akanshSirohi" target="_blank" rel="noopener noreferrer" className="impact-github">GitHub <Arrow diagonal /></a></div>
      </div>
      <a className="impact-scroll mono" href="#work"><span>SCROLL TO EXPLORE</span><span className="scroll-orbit" aria-hidden="true">↓</span></a>
    </section>
  );
}

function ProjectPoster({ project, index }) {
  const code = ["quadqr", "qrsmith"].includes(project.slug);
  return (
    <div className={`project-poster poster-${project.slug}`} aria-hidden="true">
      <span className="poster-kicker mono">EXPERIMENT / {String(index + 1).padStart(2,"0")}</span>
      {code ? <div className="poster-code"><CodePattern color={project.slug === "quadqr"} /></div> : project.slug === "promptvault" ? <div className="prompt-sculpture"><div>Make room<br />for the next<br /><em>big idea.</em><span className="mono">PROMPTVAULT / OFFLINE FIRST</span></div><div /><div /></div> : project.slug === "sharex" ? <div className="transfer-sculpture"><span>↗</span><i /><span>↙</span><small className="mono">CONNECTED. NO INTERNET REQUIRED.</small></div> : project.slug === "quadqr-sdk" ? <div className="code-sculpture"><span>{"{ "}</span><b>build<br />beyond.</b><span>{" }"}</span><small className="mono">RUST / ANDROID / FLUTTER / WASM</small></div> : <div className="orb-sculpture"><i /><i /><i /><span>{project.slug === "diamond-catalog" ? "1M+" : project.slug === "jewelry-try-on" ? "3D" : "R&D"}</span></div>}
      <span className="poster-bottom mono">{project.tags.slice(0,2).join(" / ").toUpperCase()}<span>↗</span></span>
    </div>
  );
}

export function ImpactWork({ standalone = false }) {
  const [filter, setFilter] = useState("All");
  const root = useRef(null);
  const filtered = projects.filter(project => filter === "All" || project.category === filter);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray(".showcase-row").forEach(row => {
          gsap.fromTo(row.querySelector(".showcase-art"), { y: 75, rotate: 2, scale: .93 }, { y: 0, rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: row, start: "top 95%", end: "top 30%", scrub: .7 } });
          gsap.from(row.querySelector(".showcase-info"), { y: 45, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 82%", toggleActions: "play none none reverse" } });
        });
      }, root);
      return () => context.revert();
    });
    return () => mm.revert();
  }, [filter]);
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className={`work impact-work section-pad ${standalone ? "standalone-section" : ""}`} id="work" ref={root} aria-labelledby="work-title">
      <div className="work-intro"><div><p className="eyebrow">01 / SELECTED WORK</p><Heading id="work-title">Built from<br /><span>what if.</span></Heading></div><p>Some solve everyday problems.<br />Some ask entirely new questions.<br />All started with curiosity.</p></div>
      <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects">{["All","Applications","Libraries","Client work"].map(value => <button key={value} aria-pressed={filter===value} onClick={() => setFilter(value)}>{value}{value==="All" && <sup>{projects.length}</sup>}</button>)}</div><span className="mono" aria-live="polite">{String(filtered.length).padStart(2,"0")} SELECTED PROJECTS</span></div>
      <div className="showcase-list">{filtered.map((project) => {
        const index=projects.indexOf(project);
        return <article className="showcase-row project-item" key={project.slug}>
          <div className="showcase-info"><span className="showcase-number mono">/{String(index+1).padStart(2,"0")}</span><p className="eyebrow">{project.category}</p><Link href={`/projects/${project.slug}`} className="showcase-title"><h3>{project.title}</h3><Arrow diagonal /></Link><p className="showcase-description">{project.description}</p><div className="showcase-tags mono">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/projects/${project.slug}`} className="showcase-link">Explore project <Arrow diagonal /></Link></div>
          <SpotlightCard className="showcase-art" spotlightColor="#a782ff" intensity={.24} spotlightSize={420} borderGlow={1}>
            <PixelTransition className="project-pixels" gridSize={12} pixelColor="#bba1ff" pattern="ripple" animationStepDuration={.55} aspectRatio="76%" firstContent={<ProjectPoster project={project} index={index} />} secondContent={<Link className="poster-reverse" href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}><span className="mono">BEHIND THE BUILD / {String(index+1).padStart(2,"0")}</span><strong>{project.headline}</strong><span className="reverse-action">Step inside <Arrow diagonal /></span></Link>} />
            <Link className="poster-mobile-link" href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>Open project <Arrow diagonal /></Link>
          </SpotlightCard>
        </article>;
      })}</div>
      <a className="all-work-link" href="https://github.com/akanshSirohi" target="_blank" rel="noopener noreferrer"><ScrollFloat containerClassName="github-float" textClassName="github-float-text" effect="wave" distance={25} stretch={1.15} ease="power2.out" scrollStart="top bottom" scrollEnd="bottom 75%">Always building.</ScrollFloat><span>More on GitHub <Arrow diagonal /></span></a>
    </section>
  );
}
