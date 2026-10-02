"use client";

import { useEffect, useRef } from "react";

// A short binary reveal. The original label always supplies layout and accessible text.
export function DecodeLabel({ children }) {
  const host = useRef(null);
  useEffect(() => {
    const element = host.current;
    const frame = element.querySelector(".decode-frame");
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const restore = () => {
      clearInterval(timer);
      element.classList.remove("is-decoding");
      frame.textContent = children;
    };
    const play = () => {
      if (query.matches || document.hidden) return;
      restore();
      element.classList.add("is-decoding");
      let step = 0;
      const draw = () => {
        const revealed = Math.floor((step / 12) * children.length);
        frame.textContent = Array.from(children, (letter, index) =>
          index < revealed || letter === " "
            ? letter
            : Math.random() < 0.5
              ? "0"
              : "1",
        ).join("");
        if (step++ >= 12) restore();
      };
      draw();
      timer = setInterval(draw, 40);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(element);
    element.addEventListener("pointerenter", play);
    element.addEventListener("focusin", play);
    element.addEventListener("pointerleave", restore);
    document.addEventListener("visibilitychange", restore);
    query.addEventListener("change", restore);
    return () => {
      restore();
      observer.disconnect();
      element.removeEventListener("pointerenter", play);
      element.removeEventListener("focusin", play);
      element.removeEventListener("pointerleave", restore);
      document.removeEventListener("visibilitychange", restore);
      query.removeEventListener("change", restore);
    };
  }, [children]);
  return (
    <span className="decode-label" ref={host}>
      <span className="decode-original">{children}</span>
      <span className="decode-frame" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
