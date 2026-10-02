"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { posts } from "../data/posts";
import data from "../data/DB.json";
import { Arrow, Asterisk } from "./icons";
import { CodePattern, ProjectVisual } from "./project-visual";
import { NameLab } from "./name-lab";
import { BinaryField } from "./interactive-layer";
import { DecodeLabel } from "./decode-label";

function SectionHeading({
  number,
  label,
  title,
  children,
  standalone = false,
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> <DecodeLabel>{label}</DecodeLabel>
        </p>
        <Heading>{title}</Heading>
      </div>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <BinaryField />
      <div className="hero-intro">
        <p className="eyebrow">
          <span className="status-dot" /> Akansh Sirohi — Software developer
        </p>
        <span className="mono hero-location">
          BASED IN INDIA · BUILDING EVERYWHERE
        </span>
      </div>
      <div className="hero-stage">
        <h1 id="hero-title">
          <span className="hero-line">Building</span>
          <span className="hero-line">ideas into</span>
          <span className="hero-line hero-code">
            software<span className="hero-period">.</span>
            <svg
              className="code-underline"
              viewBox="0 0 600 25"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M3 18Q280 -5 590 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <NameLab />
      </div>
      <div className="hero-bottom">
        <p>
          Backend systems. Web applications. Android.
          <br className="desktop-break" /> Useful software, built with a curious
          mind.
        </p>
        <a className="button button-dark" href="#work">
          Explore my work <Arrow diagonal />
        </a>
        <a className="scroll-cue mono" href="#work">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
      </div>
    </section>
  );
}

export function Work({ standalone = false }) {
  const [filter, setFilter] = useState("All");
  const scope = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        scope.current
          .querySelectorAll(".project-visual-link")
          .forEach((link) => {
            const visual = link.querySelector(".project-visual");
            gsap.fromTo(
              visual,
              { scale: 1.08, y: 10 },
              {
                scale: 1.02,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: link,
                  start: "top bottom",
                  end: "bottom center",
                  scrub: 0.8,
                },
              },
            );
          });
      }, scope);
      return () => context.revert();
    });
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups = [];
        const context = gsap.context(() => {
          scope.current
            .querySelectorAll(".project-visual-link")
            .forEach((link) => {
              const visual = link.querySelector(".project-visual");
              gsap.set(visual, { transformPerspective: 1000 });
              const x = gsap.quickTo(visual, "rotationX", {
                duration: 0.7,
                ease: "power3.out",
              });
              const y = gsap.quickTo(visual, "rotationY", {
                duration: 0.7,
                ease: "power3.out",
              });
              const arrow = link.querySelector(".project-open svg");
              const arrowX = gsap.quickTo(arrow, "x", {
                duration: 0.45,
                ease: "power3.out",
              });
              const arrowY = gsap.quickTo(arrow, "y", {
                duration: 0.45,
                ease: "power3.out",
              });
              const move = (event) => {
                const bounds = link.getBoundingClientRect();
                x(-((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
                y(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
                link.style.setProperty(
                  "--spot-x",
                  `${event.clientX - bounds.left}px`,
                );
                link.style.setProperty(
                  "--spot-y",
                  `${event.clientY - bounds.top}px`,
                );
                arrowX(
                  ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
                );
                arrowY(
                  ((event.clientY - bounds.top) / bounds.height - 0.5) * 10,
                );
              };
              const leave = () => {
                x(0);
                y(0);
                arrowX(0);
                arrowY(0);
              };
              link.addEventListener("pointermove", move);
              link.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                link.removeEventListener("pointermove", move);
                link.removeEventListener("pointerleave", leave);
                link.style.removeProperty("--spot-x");
                link.style.removeProperty("--spot-y");
              });
            });
        }, scope);
        return () => {
          cleanups.forEach((cleanup) => cleanup());
          context.revert();
        };
      },
    );
    return () => media.revert();
  }, [filter]);
  const filtered = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  return (
    <section
      ref={scope}
      className={`work section-pad ${standalone ? "standalone-section" : ""}`}
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        number="01"
        standalone={standalone}
        label="Selected work"
        title={
          <span id="work-title">
            Projects, shipped<span className="accent">.</span>
          </span>
        }
      >
        <p className="section-aside">
          Open-source libraries.
          <br />
          Applications that solve real problems.
        </p>
      </SectionHeading>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {["All", "Applications", "Libraries", "Client work"].map((value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value}
              {value === "All" && (
                <sup>{String(projects.length).padStart(2, "0")}</sup>
              )}
            </button>
          ))}
        </div>
        <span className="mono" aria-live="polite">
          {String(filtered.length).padStart(2, "0")} PROJECTS / BUILT WITH
          INTENT
        </span>
      </div>
      <div className="project-grid">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className={`project-item ${project.slug === "quadqr" ? "featured-project" : ""}`}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="project-visual-link"
              aria-label={`Explore ${project.title}`}
            >
              <ProjectVisual slug={project.slug} />
              <span className="project-open">
                <Arrow diagonal />
              </span>
            </Link>
            <div className="project-info">
              <div className="project-meta mono">
                <span>
                  {String(projects.indexOf(project) + 1).padStart(2, "0")} /{" "}
                  {project.kind}
                </span>
                {project.slug === "quadqr" && (
                  <span className="featured-label">FEATURED EXPERIMENT</span>
                )}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="project-title"
              >
                <h3>{project.title}</h3>
                <Arrow diagonal />
              </Link>
              <p>{project.description}</p>
              <div className="project-tags mono">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-card-links mono">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code <Arrow diagonal />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.liveLabel} <Arrow diagonal />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <a
        className="text-link github-all"
        href="https://github.com/akanshSirohi"
        target="_blank"
        rel="noopener noreferrer"
      >
        There’s always something else in the works.{" "}
        <span>
          Explore my GitHub <Arrow diagonal />
        </span>
      </a>
    </section>
  );
}

export function About({ standalone = false }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      className={`about section-pad ${standalone ? "standalone-section" : ""}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-top">
        <p className="eyebrow">
          <span>02 /</span> Behind the code
        </p>
        <Asterisk className="about-star" />
      </div>
      <div className="about-main">
        <Heading id="about-title">
          Software developer.
          <br />
          Problem solver.
          <br />
          <span>Still curious.</span>
        </Heading>
        <div className="about-copy">
          <p className="about-lead">
            Hello, I’m Akansh. I like understanding how things work. Then asking
            how they could work differently.
          </p>
          <p>
            I’m a software engineer working across backend systems, web
            applications, and Android. My own projects are where curiosity gets
            room to run — from simpler file sharing to an entirely different
            kind of matrix code.
          </p>
          <p>
            I care about thoughtful software: useful in everyday life, clear in
            its purpose, and built with attention to the details.
          </p>
          <div className="resume-actions">
            <Link className="button button-outline" href="/resume">
              View résumé <Arrow diagonal />
            </Link>
            <a
              className="text-link mono"
              href="/Akansh-Sirohi-Resume.pdf"
              download
            >
              Download PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/akansh-sirohi"
            target="_blank"
            rel="noopener noreferrer"
          >
            A little more about me <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="skills-table">
        <p className="mono skills-caption">
          THE TOOLS CHANGE.
          <br />
          THE CURIOSITY STAYS.
        </p>
        <div>
          {[
            ["Languages & platforms", data.skills.languages],
            ["Frameworks & technologies", data.skills.tecnologies],
            ["Tools & infrastructure", data.skills.tools],
          ].map(([label, skills]) => (
            <div className="skill-row" key={label}>
              <h3 className="mono">{label}</h3>
              <p>
                {skills
                  .map((item) =>
                    item.skill === "NextJs" ? "Next.js" : item.skill,
                  )
                  .join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience({ standalone = false }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      className={`experience section-pad ${standalone ? "standalone-section" : ""}`}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-intro">
        <p className="eyebrow">
          <span>03 /</span> The journey so far
        </p>
        <Heading id="experience-title">
          Always
          <br />a student<span className="accent">.</span>
        </Heading>
        <p>
          Learning by studying.
          <br />
          Learning by shipping.
        </p>
      </div>
      <div className="experience-list">
        {[
          [
            "Mar 2023 — Present",
            "Software Engineer (Backend)",
            "Keyideas Infotech · Gurugram",
            "PHP / WordPress / WooCommerce / Node.js",
          ],
          [
            "Aug 2021 — Jan 2023",
            "Freelance Developer",
            "Independent · Full stack development",
            "From project scoping to post-launch support",
          ],
          [
            "2021 — 2023",
            "Master of Computer Applications",
            "Quantum University · Roorkee",
            "Postgraduate education",
          ],
          [
            "2018 — 2021",
            "Bachelor of Computer Applications",
            "Quantum University · Roorkee",
            "Undergraduate education",
          ],
        ].map(([date, title, place, label]) => (
          <article className="experience-row" key={title}>
            <span className="mono experience-date">{date}</span>
            <div>
              <span className="mono experience-label">{label}</span>
              <h3>{title}</h3>
              <p>{place}</p>
            </div>
            <Arrow diagonal />
          </article>
        ))}
      </div>
    </section>
  );
}

function EmbeddedPost({ post }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { height: 0, opacity: 0.6 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          clearProps: "height,opacity",
        },
      );
    }, panel);
    return () => context.revert();
  }, [open]);
  return (
    <article className={`feed-post ${open ? "post-open" : ""}`}>
      <div className="feed-post-heading">
        <span className="platform-mark">in</span>
        <div>
          <p className="mono">AKANSH SIROHI / LINKEDIN</p>
          <h3>{post.title}</h3>
          {post.summary && <p className="feed-summary">{post.summary}</p>}
        </div>
        <a
          className="feed-original mono"
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${post.title} on LinkedIn`}
        >
          <span>Original</span>
          <Arrow diagonal />
        </a>
        <button
          className="embed-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`embed-${post.id}`}
          aria-label={`${open ? "Close" : "Read"} ${post.title}`}
        >
          <span>{open ? "Close post" : "Read post"}</span>
          <b aria-hidden="true">{open ? "−" : "+"}</b>
        </button>
      </div>
      <div
        ref={panel}
        className="embed-panel"
        id={`embed-${post.id}`}
        hidden={!open}
      >
        {open && (
          <div className="embed-content">
            <iframe
              src={post.embedUrl}
              height={post.height || 602}
              width="504"
              loading="lazy"
              allowFullScreen
              title={`LinkedIn post by Akansh Sirohi — ${post.title}`}
            />
            <a
              className="text-link mono"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original on LinkedIn <Arrow diagonal />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export function Journal({ standalone = false }) {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const unique = posts.filter(
    (post, index, all) =>
      all.findIndex(
        (item) => (item.embedUrl || item.url) === (post.embedUrl || post.url),
      ) === index,
  );
  const selected = unique.filter(
    (post) => filter === "All" || post.platform === filter,
  );
  const stories = selected.filter((post) => !post.embedUrl);
  const embedded = selected.filter((post) => post.embedUrl);
  const visibleEmbeds = showAll ? embedded : embedded.slice(0, 3);
  return (
    <section
      className={`journal section-pad ${standalone ? "standalone-section" : ""}`}
      id="notes"
      aria-labelledby="notes-title"
    >
      <SectionHeading
        number="04"
        standalone={standalone}
        label="Field notes"
        title={
          <span id="notes-title">
            Beyond the commit<span className="accent">.</span>
          </span>
        }
      >
        <p className="section-aside">
          Things I’m building, learning,
          <br />
          and thinking out loud.
        </p>
      </SectionHeading>
      <div className="journal-toolbar">
        <div className="filters" role="group" aria-label="Filter field notes">
          {["All", "LinkedIn", "DEV"].map((value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => {
                setFilter(value);
                setShowAll(false);
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="mono" aria-live="polite">
          {String(selected.length).padStart(2, "0")} NOTES FROM THE PROCESS
        </span>
      </div>
      {stories.length > 0 && (
        <div className="stories">
          {stories.map((post) => (
            <article
              className={`story story-${post.visual || "link"}`}
              key={post.id}
            >
              <a
                className="story-art"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${post.title} on ${post.platform}`}
              >
                {post.visual === "quadqr" ? (
                  <>
                    <div className="story-color-bars">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <CodePattern />
                  </>
                ) : (
                  <>
                    <span className="prompt-symbol">↗</span>
                    <span className="mono">
                      AN IDEA.
                      <br />A PROMPT.
                      <br />A POSSIBILITY.
                    </span>
                  </>
                )}
                <span className="story-platform mono">{post.platform}</span>
              </a>
              <div className="story-info">
                <p className="eyebrow">{post.label || post.platform}</p>
                <a
                  className="story-title"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{post.title}</h3>
                  <Arrow diagonal />
                </a>
                {post.summary && <p>{post.summary}</p>}
                <a
                  className="text-link mono"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read on {post.platform} <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
      {embedded.length > 0 && (
        <div className="feed-list" id="linkedin-feed">
          {visibleEmbeds.map((post) => (
            <EmbeddedPost post={post} key={post.id} />
          ))}
        </div>
      )}
      {embedded.length > 3 && (
        <button
          className="load-posts mono"
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
          aria-controls="linkedin-feed"
        >
          {showAll
            ? "Show fewer posts"
            : `Explore all ${embedded.length} LinkedIn posts`}
          <span>{showAll ? "−" : "+"}</span>
        </button>
      )}
    </section>
  );
}

export function Portfolio() {
  const scope = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-line", {
          y: 44,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
        gsap.from(".hero-art", {
          rotation: -12,
          scale: 0.9,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        });
        gsap.to(".hero-line", {
          x: (index) => -(index + 1) * (window.innerWidth < 760 ? 12 : 28),
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        gsap.to(".manifesto-strip svg", {
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-strip",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        gsap.fromTo(
          ".about-star",
          { rotation: -35 },
          {
            rotation: 110,
            ease: "none",
            scrollTrigger: {
              trigger: ".about",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".code-underline",
          { scaleX: 0.3 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.3,
            delay: 0.6,
            ease: "power3.out",
          },
        );
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={scope}>
      <Hero />
      <div className="manifesto-strip mono">
        <span>BACKEND SYSTEMS</span>
        <Asterisk />
        <span>ANDROID APPLICATIONS</span>
        <Asterisk />
        <span>OPEN-SOURCE TOOLS</span>
        <Asterisk />
      </div>
      <Work />
      <About />
      <Experience />
      <Journal />
    </div>
  );
}
