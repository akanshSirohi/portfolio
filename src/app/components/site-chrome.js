"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow, Asterisk } from "./icons";
import { ThemeToggle, CommandButton } from "./interactive-layer";

const navigation = [
  ["Work", "work"],
  ["About", "about"],
  ["Field notes", "notes"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Akansh Sirohi — home">
          as<span className="wordmark-dot">.</span>
        </Link>
        <span className="header-caption mono">
          Independent mind.
          <br />
          Engineer by craft.
        </span>
        <button
          className="menu-button mono"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map(([label, id]) => (
            <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/resume" onClick={() => setOpen(false)}>
            Résumé
          </Link>
          <Link
            className="nav-contact"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </Link>
        </nav>
        <div className="header-controls">
          <CommandButton />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <p className="eyebrow">
          <span className="status-dot" /> A conversation starts something.
        </p>
        <p className="mono">Have an idea? A curious question?</p>
      </div>
      <a
        className="contact-title"
        href="https://www.linkedin.com/in/akansh-sirohi"
        target="_blank"
        rel="noopener noreferrer"
      >
        Let’s build
        <br />
        <span>something.</span>
        <Arrow diagonal />
      </a>
      <div className="footer-bottom">
        <Link className="footer-name" href="/">
          Akansh Sirohi <Asterisk />
        </Link>
        <div className="social-links">
          <a
            href="https://github.com/akanshSirohi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <Arrow diagonal />
          </a>
          <a
            href="https://www.linkedin.com/in/akansh-sirohi"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <Arrow diagonal />
          </a>
          <a
            href="https://x.com/akansh__sirohi"
            target="_blank"
            rel="noopener noreferrer"
          >
            X <Arrow diagonal />
          </a>
        </div>
        <span className="mono">
          Built with curiosity. © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
