"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "../data/projects";
import { Arrow } from "./icons";

export function toggleTheme() {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("portfolio-theme", next);
  } catch {}
  window.dispatchEvent(new Event("portfolio-theme"));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const sync = () =>
      setTheme(document.documentElement.dataset.theme || "light");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const system = () => {
      let saved;
      try {
        saved = localStorage.getItem("portfolio-theme");
      } catch {}
      if (!saved) {
        document.documentElement.dataset.theme = media.matches
          ? "dark"
          : "light";
        sync();
      }
    };
    sync();
    window.addEventListener("portfolio-theme", sync);
    media.addEventListener("change", system);
    return () => {
      window.removeEventListener("portfolio-theme", sync);
      media.removeEventListener("change", system);
    };
  }, []);
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Switch light / dark theme"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
      <span className="mono">{theme === "dark" ? "LIGHT" : "DARK"}</span>
    </button>
  );
}

export function CommandButton() {
  return (
    <button
      className="command-button mono"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event("portfolio-command"))}
      title="Search projects and pages (Ctrl or ⌘ K)"
    >
      <span aria-hidden="true">⌘</span>
      <span>K</span>
    </button>
  );
}

// A low-frame-rate canvas: no React updates while the binary field is running.
export function BinaryField({ paused }) {
  const canvas = useRef(null);
  const pause = useRef(paused);
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
  useEffect(() => {
    const element = canvas.current;
    const hero = element.closest(".hero");
    const context = element.getContext("2d");
    if (!context) return;
    let width = 0,
      height = 0,
      bits = [],
      visible = true;
    let pointer = { x: -1000, y: -1000 };
    let ink, accent;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colors = () => {
      const styles = getComputedStyle(hero);
      ink = styles.getPropertyValue("--ink").trim();
      accent = styles.getPropertyValue("--accent").trim();
    };
    const draw = (mutate = false) => {
      context.clearRect(0, 0, width, height);
      context.font = "11px 'Courier New', monospace";
      bits.forEach((bit) => {
        const distance = Math.hypot(bit.x - pointer.x, bit.y - pointer.y);
        const nearby = Math.max(0, 1 - distance / 150);
        // A quiet background, with a much more active pocket around the cursor.
        if (mutate && Math.random() < 0.006 + nearby * 0.45) bit.value ^= 1;
        context.globalAlpha = 0.075 + nearby * 0.34;
        context.fillStyle = nearby > 0.15 ? accent : ink;
        context.fillText(String(bit.value), bit.x, bit.y);
      });
      context.globalAlpha = 1;
    };
    const resize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      bits = [];
      const gap = width < 760 ? 38 : 42;
      for (let y = 25; y < height; y += gap)
        for (let x = 20; x < width; x += gap)
          bits.push({ x, y, value: Math.random() > 0.5 ? 1 : 0 });
      draw();
    };
    const move = (event) => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const leave = () => {
      pointer = { x: -1000, y: -1000 };
    };
    colors();
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(hero);
    const theme = new MutationObserver(() => {
      colors();
      draw();
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const timer = setInterval(() => {
      if (visible && !document.hidden && !reduced.matches && !pause.current)
        draw(true);
    }, 160);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      intersection.disconnect();
      theme.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <canvas ref={canvas} className="binary-field" aria-hidden="true" />;
}

function CursorReticle() {
  const cursor = useRef(null);
  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let teardown = () => {};
    const setup = () => {
      teardown();
      const node = cursor.current;
      if (!query.matches) {
        node.style.opacity = "0";
        return;
      }
      let frame = 0,
        x = 0,
        y = 0,
        targetX = 0,
        targetY = 0,
        initialized = false;
      const tick = () => {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        node.style.transform = `translate3d(${x}px,${y}px,0)`;
        if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.15)
          frame = requestAnimationFrame(tick);
        else frame = 0;
      };
      const move = (event) => {
        if (event.pointerType !== "mouse") return;
        targetX = event.clientX;
        targetY = event.clientY;
        if (!initialized) {
          x = targetX;
          y = targetY;
          initialized = true;
        }
        node.style.opacity = "1";
        node.dataset.active = Boolean(
          event.target.closest("a,button,input,textarea,summary"),
        );
        if (!frame) frame = requestAnimationFrame(tick);
      };
      const hide = () => {
        node.style.opacity = "0";
      };
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      teardown = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        node.style.opacity = "0";
      };
    };
    setup();
    query.addEventListener("change", setup);
    return () => {
      teardown();
      query.removeEventListener("change", setup);
    };
  }, []);
  return (
    <div ref={cursor} className="cursor-reticle" aria-hidden="true">
      <i />
    </div>
  );
}

function CommandPalette() {
  const dialog = useRef(null);
  const input = useRef(null);
  const opener = useRef(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const commands = [
    ...projects.map((project) => ({
      title: project.title,
      group: project.category,
      terms: project.tags.join(" "),
      href: `/projects/${project.slug}`,
    })),
    { title: "Selected work", group: "Navigate", href: "/#work" },
    { title: "About & skills", group: "Navigate", href: "/#about" },
    { title: "Field notes", group: "Navigate", href: "/notes" },
    {
      title: "View résumé",
      group: "Navigate",
      terms: "resume cv experience whoami",
      href: "/resume",
    },
    { title: "Let's talk", group: "Navigate", href: "/#contact" },
    {
      title: "Switch light / dark",
      group: "Appearance",
      terms: "theme",
      action: toggleTheme,
    },
  ];
  const results = commands.filter((item) =>
    `${item.title} ${item.group} ${item.terms || ""}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const activate = (item) => {
    if (!item) return;
    dialog.current.close();
    if (item.action) item.action();
    else router.push(item.href);
  };
  useEffect(() => {
    const show = () => {
      if (dialog.current.open) {
        dialog.current.close();
        return;
      }
      setQuery("");
      setSelected(0);
      opener.current = dialog.current.contains(document.activeElement)
        ? null
        : document.activeElement;
      dialog.current.showModal();
      input.current.focus();
    };
    const shortcut = (event) => {
      const typing =
        event.target.isContentEditable ||
        /INPUT|TEXTAREA|SELECT/.test(event.target.tagName);
      if (
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") ||
        (!typing &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          event.key === "/")
      ) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("portfolio-command", show);
    window.addEventListener("keydown", shortcut);
    return () => {
      window.removeEventListener("portfolio-command", show);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);
  useEffect(() => {
    if (dialog.current.open)
      dialog.current
        .querySelector(`[data-command-index="${selected}"]`)
        ?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [selected]);
  return (
    <dialog
      className="command-dialog"
      ref={dialog}
      aria-labelledby="command-title"
      onClose={() => {
        const previous = opener.current;
        const target =
          previous?.isConnected &&
          previous.matches("a,button,input,textarea,select,[tabindex]") &&
          previous.getBoundingClientRect().width > 0
            ? previous
            : document.querySelector(".site-header .command-button");
        target?.focus({ preventScroll: true });
      }}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <div className="command-top">
        <span className="mono" id="command-title">
          AKANSH / QUICK ACCESS
        </span>
        <button
          className="mono"
          onClick={() => dialog.current.close()}
          aria-label="Close command palette"
        >
          ESC ×
        </button>
      </div>
      <label className="sr-only" htmlFor="command-search">
        Search projects, technologies, and pages
      </label>
      <input
        id="command-search"
        ref={input}
        value={query}
        placeholder="Find a project, a technology, a page…"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls="command-results"
        aria-activedescendant={
          results.length ? `command-result-${selected}` : undefined
        }
        onChange={(event) => {
          setQuery(event.target.value);
          setSelected(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setSelected((value) =>
              results.length
                ? (value +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    results.length) %
                  results.length
                : 0,
            );
          }
          if (event.key === "Enter") {
            event.preventDefault();
            activate(results[selected]);
          }
        }}
      />
      <div
        className="command-results"
        id="command-results"
        role="listbox"
        aria-label="Quick access results"
      >
        {results.map((item, index) => (
          <button
            key={item.title}
            className={index === selected ? "is-selected" : ""}
            data-command-index={index}
            id={`command-result-${index}`}
            role="option"
            aria-selected={index === selected}
            onClick={() => activate(item)}
            onFocus={() => setSelected(index)}
          >
            <span>
              <small className="mono">{item.group}</small>
              {item.title}
            </span>
            <Arrow diagonal />
          </button>
        ))}
        {!results.length && (
          <p className="command-empty">
            No matches. Try “Android”, “Three.js”, or “résumé”.
          </p>
        )}
      </div>
      <div className="command-bottom mono">
        <span role="status">{results.length} RESULTS</span>
        <span>↑ ↓ SELECT · ENTER OPEN</span>
      </div>
    </dialog>
  );
}

export function InteractiveLayer() {
  return (
    <>
      <CursorReticle />
      <CommandPalette />
    </>
  );
}
