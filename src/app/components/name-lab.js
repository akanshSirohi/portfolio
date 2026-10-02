"use client";

import { useRef, useState } from "react";
import { HeroScene } from "./hero-scene";
import {
  nameLines,
  normalizeName,
  signatureProfile,
  saveSignature,
} from "./name-signature";

export function NameLab() {
  const scope = useRef(null);
  const [name, setName] = useState("Akansh");
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [orbit, setOrbit] = useState(false);
  const [reset, setReset] = useState(0);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const profile = signatureProfile(name);
  const lines = nameLines(name);
  const style = {
    "--signature-light": profile.palette.light[0],
    "--signature-light-secondary": profile.palette.light[1],
    "--signature-dark": profile.palette.dark[0],
    "--signature-dark-secondary": profile.palette.dark[1],
  };
  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      await saveSignature(
        name,
        getComputedStyle(scope.current).getPropertyValue("--display").trim(),
        document.documentElement.dataset.theme === "dark",
      );
      setStatus("Your signature is ready. Check your downloads.");
    } catch {
      setStatus("The image couldn't be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div ref={scope} className="name-lab" style={style}>
      <div className="name-lab-heading">
        <span className="mono">01 / NAME LAB</span>
        <span className="mono">A LITTLE EXPERIMENT. ALL YOURS.</span>
      </div>
      <div
        className={`hero-art name-lab-art ${ready ? "has-webgl" : ""} ${orbit && ready ? "is-orbit-mode" : ""}`}
      >
        <HeroScene
          paused={paused}
          onReady={setReady}
          message={name}
          orbitMode={orbit}
          resetView={reset}
          onExitOrbit={() => setOrbit(false)}
        />
        <div
          className="name-lab-fallback"
          aria-hidden="true"
          style={{
            "--name-size": `${Math.max(32, Math.min(82, 480 / Math.max(...lines.map((line) => Array.from(line).length))))}px`,
          }}
        >
          {lines.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
        {ready && (
          <div className="scene-view-controls">
            <button
              className="mono scene-mode-toggle"
              aria-label={
                orbit ? "Switch to pointer mode" : "Switch to orbit mode"
              }
              aria-pressed={orbit}
              onClick={() => setOrbit(!orbit)}
            >
              {orbit ? "POINTER MODE ↗" : "EXPLORE IN 3D ↗"}
            </button>
            {orbit && (
              <button
                className="mono"
                onClick={() => setReset((value) => value + 1)}
                onPointerUp={(event) => {
                  if (event.pointerType === "touch") {
                    event.preventDefault();
                    setReset((value) => value + 1);
                  }
                }}
              >
                RESET VIEW
              </button>
            )}
          </div>
        )}
        {ready && (
          <button
            className="scene-motion-control mono"
            aria-label={
              paused ? "Resume name animation" : "Pause name animation"
            }
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "PLAY ↗" : "PAUSE Ⅱ"}
          </button>
        )}
      </div>
      <div className="name-lab-signature mono">
        <span>
          <i />
          <i /> YOUR SIGNATURE / {profile.id}
        </span>
        <span>ONE NAME. ONE SIGNATURE.</span>
      </div>
      <div className="name-lab-input">
        <label className="mono" htmlFor="signature-name">
          TYPE YOUR NAME. MAKE IT MOVE.
        </label>
        <div>
          <span aria-hidden="true">&gt;</span>
          <input
            id="signature-name"
            value={name}
            maxLength={32}
            autoComplete="off"
            spellCheck={false}
            placeholder="Your name"
            aria-describedby="name-lab-help"
            onChange={(event) => {
              setName(event.target.value);
              setStatus("");
            }}
          />
        </div>
      </div>
      <div className="name-lab-actions">
        <p id="name-lab-help">
          {!ready
            ? "Your signature is ready to save."
            : orbit
              ? "Drag to orbit. Scroll / pinch to zoom."
              : "Move to scatter. Tap to ripple."}
          <span className="sr-only">
            Focus the artwork and press Space for a ripple. In orbit mode use
            arrows to pan, Shift and arrows to rotate, plus and minus to zoom, 0
            to reset, and Escape to return to pointer mode.
          </span>
        </p>
        <button
          className="name-lab-save"
          disabled={!normalizeName(name) || saving}
          aria-busy={saving}
          onClick={save}
        >
          {saving ? "Creating…" : "Save your signature"}
          <span aria-hidden="true">↓</span>
        </button>
      </div>
      <p className="name-lab-status" role="status">
        {status}
      </p>
    </div>
  );
}
