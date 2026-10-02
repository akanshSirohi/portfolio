"use client";

import { useEffect, useRef, useState } from "react";
import { createNameShape, seededRandom } from "./name-signature";

// React Bits Particles approach, adapted to a spring-driven name sculpture in Three.js.
// Copyright (c) 2026 David Haz. See public/licenses/react-bits.txt.
export function HeroScene({
  paused,
  onReady,
  message,
  orbitMode,
  resetView,
  onExitOrbit,
}) {
  const host = useRef(null);
  const pause = useRef(paused);
  const value = useRef(message);
  const synchronize = useRef(() => {});
  const encode = useRef(() => {});
  const orbit = useRef(orbitMode);
  const mode = useRef(() => {});
  const reset = useRef(() => {});
  const exitOrbit = useRef(onExitOrbit);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    pause.current = paused;
    synchronize.current();
  }, [paused]);
  useEffect(() => {
    value.current = message;
    encode.current();
  }, [message]);
  useEffect(() => {
    orbit.current = orbitMode;
    mode.current(true);
  }, [orbitMode]);
  useEffect(() => {
    reset.current();
  }, [resetView]);
  useEffect(() => {
    exitOrbit.current = onExitOrbit;
  }, [onExitOrbit]);
  useEffect(() => {
    if (!enabled) return;
    let disposed = false,
      teardown = () => {};
    async function initialize() {
      let renderer;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([
          import("three"),
          import("three/addons/controls/OrbitControls.js"),
        ]);
        await document.fonts.ready;
        if (disposed || !host.current) return;
        const container = host.current;
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1 : 1.5),
        );
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 30);
        camera.position.z = 8;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        controls.enableDamping = false;
        controls.minZoom = 0.55;
        controls.maxZoom = 1.8;
        controls.minDistance = 5;
        controls.maxDistance = 14;
        controls.rotateSpeed = 0.65;
        controls.zoomSpeed = 0.75;
        controls.saveState();
        renderer.domElement.setAttribute(
          "aria-label",
          "Interactive particle name. Press Space to create a ripple.",
        );
        renderer.domElement.setAttribute("aria-describedby", "name-lab-help");
        const sculpture = new THREE.Group();
        scene.add(sculpture);
        const count = 3200;
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const seeds = new Float32Array(count);
        let targets = new Float32Array(count * 3);
        let first = true;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3).setUsage(
            THREE.DynamicDrawUsage,
          ),
        );
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uPhase: { value: 0 },
            uSpeed: { value: 1 },
            uSize: { value: 3.1 },
            uPrimary: { value: new THREE.Color() },
            uSecondary: { value: new THREE.Color() },
          },
          vertexShader: `
            attribute float aSeed;
            uniform float uTime;
            uniform float uPhase;
            uniform float uSpeed;
            uniform float uSize;
            varying float vSeed;
            varying float vTint;
            void main() {
              vSeed = aSeed;
              vTint = clamp(position.x * 0.216 + 0.51, 0.0, 1.0);
              vec3 p = position;
              p.z += sin(p.x * 1.8 + uTime * uSpeed + uPhase) * 0.07;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = uSize * mix(0.75, 1.2, aSeed) * (8.0 / max(1.0, -mv.z));
              gl_Position = projectionMatrix * mv;
            }
          `,
          fragmentShader: `
            uniform vec3 uPrimary;
            uniform vec3 uSecondary;
            varying float vSeed;
            varying float vTint;
            void main() {
              float distance = length(gl_PointCoord - vec2(0.5));
              if (distance > 0.5) discard;
              float alpha = smoothstep(0.5, 0.26, distance) * mix(0.75, 1.0, vSeed);
              gl_FragColor = vec4(mix(uPrimary, uSecondary, vTint), alpha);
              #include <tonemapping_fragment>
              #include <colorspace_fragment>
            }
          `,
        });
        const particles = new THREE.Points(geometry, material);
        particles.frustumCulled = false;
        sculpture.add(particles);
        const render = () => renderer.render(scene, camera);
        const controlChange = () => {
          if (!disposed && !document.hidden) render();
        };
        controls.addEventListener("change", controlChange);
        const color = () => {
          const styles = getComputedStyle(container);
          material.uniforms.uPrimary.value.set(
            styles.getPropertyValue("--signature-primary").trim(),
          );
          material.uniforms.uSecondary.value.set(
            styles.getPropertyValue("--signature-secondary").trim(),
          );
          render();
        };
        const updateName = () => {
          const family = getComputedStyle(container)
            .getPropertyValue("--display")
            .trim();
          const shape = createNameShape(value.current, family, count);
          targets = shape.positions;
          seeds.set(shape.seeds);
          geometry.attributes.aSeed.needsUpdate = true;
          material.uniforms.uPhase.value = shape.profile.phase;
          material.uniforms.uSpeed.value = shape.profile.speed;
          const random = seededRandom(shape.profile.seed);
          for (let index = 0; index < count; index++) {
            if (first)
              positions.set(
                [
                  (random() - 0.5) * 5,
                  (random() - 0.5) * 3.5,
                  (random() - 0.5) * 2,
                ],
                index * 3,
              );
            velocities.set(
              [
                (random() - 0.5) * 0.1,
                (random() - 0.5) * 0.1,
                (random() - 0.5) * 0.08,
              ],
              index * 3,
            );
          }
          if (pause.current || orbit.current) {
            positions.set(targets);
            velocities.fill(0);
          }
          first = false;
          geometry.attributes.position.needsUpdate = true;
          color();
        };
        encode.current = updateName;
        const theme = new MutationObserver(color);
        theme.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        let frame = 0,
          visible = true,
          previous = 0,
          hover = 0,
          targetHover = 0,
          pulseAt = -10,
          pulseX = 0,
          pulseY = 0,
          time = 0,
          pointerX = 0,
          pointerY = 0,
          targetX = 0,
          targetY = 0,
          lost = false;
        const compose = () => {
          sculpture.rotation.set(
            pointerY * 0.1,
            pointerX * 0.13,
            Math.sin(time * 0.3) * 0.008,
          );
          material.uniforms.uTime.value = time;
        };
        const simulate = (delta) => {
          const factor = delta * 60;
          const damping = Math.pow(0.78, factor);
          const px = targetX * 3.3 * camera.aspect,
            py = -targetY * 3.3;
          const pulseAge = time - pulseAt;
          for (let index = 0; index < count; index++) {
            const offset = index * 3;
            const x = positions[offset],
              y = positions[offset + 1];
            const dx = x - px,
              dy = y - py;
            const distance = Math.hypot(dx, dy);
            const push =
              hover * Math.max(0, 1 - distance / 0.65) * 0.052 * factor;
            if (distance > 0.01) {
              velocities[offset] += (dx / distance) * push;
              velocities[offset + 1] += (dy / distance) * push;
              velocities[offset + 2] += push * 0.6;
            }
            if (pulseAge < 1.8) {
              const rx = x - pulseX,
                ry = y - pulseY;
              const radius = Math.hypot(rx, ry);
              const wave =
                Math.max(0, 1 - Math.abs(radius - pulseAge * 4) / 0.45) *
                Math.exp(-pulseAge * 1.5) *
                0.1 *
                factor;
              if (radius > 0.01) {
                velocities[offset] += (rx / radius) * wave;
                velocities[offset + 1] += (ry / radius) * wave;
              }
              velocities[offset + 2] += wave * 1.6;
            }
            for (let axis = 0; axis < 3; axis++) {
              const key = offset + axis;
              velocities[key] =
                (velocities[key] +
                  (targets[key] - positions[key]) * 0.023 * factor) *
                damping;
              positions[key] += velocities[key] * factor;
            }
          }
          geometry.attributes.position.needsUpdate = true;
        };
        const resize = () => {
          const bounds = container.getBoundingClientRect();
          camera.aspect = bounds.width / Math.max(1, bounds.height);
          camera.updateProjectionMatrix();
          renderer.setSize(bounds.width, bounds.height, false);
          material.uniforms.uSize.value =
            (3.3 * renderer.getPixelRatio() * bounds.height) / 515;
          render();
        };
        const tick = (timestamp) => {
          frame = 0;
          const delta = previous
            ? Math.min((timestamp - previous) / 1000, 0.033)
            : 1 / 60;
          time += delta;
          previous = timestamp;
          pointerX += (targetX - pointerX) * 0.045;
          pointerY += (targetY - pointerY) * 0.045;
          hover += (targetHover - hover) * 0.06;
          simulate(delta);
          compose();
          render();
          if (
            !disposed &&
            visible &&
            !pause.current &&
            !orbit.current &&
            !document.hidden &&
            !lost
          )
            frame = requestAnimationFrame(tick);
        };
        const sync = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          previous = 0;
          if (
            !disposed &&
            visible &&
            !pause.current &&
            !orbit.current &&
            !document.hidden &&
            !lost
          )
            frame = requestAnimationFrame(tick);
        };
        synchronize.current = sync;
        const applyMode = (focus = false) => {
          controls.enabled = orbit.current;
          // OrbitControls disables touch scrolling on connect; restore it in pointer mode.
          renderer.domElement.style.touchAction = orbit.current
            ? "none"
            : "pan-y";
          renderer.domElement.style.cursor = orbit.current ? "grab" : "auto";
          renderer.domElement.tabIndex = 0;
          pointerX = pointerY = targetX = targetY = hover = targetHover = 0;
          if (orbit.current) {
            positions.set(targets);
            velocities.fill(0);
            geometry.attributes.position.needsUpdate = true;
          }
          compose();
          controls.reset();
          render();
          sync();
          if (focus && orbit.current)
            renderer.domElement.focus({ preventScroll: true });
        };
        mode.current = applyMode;
        reset.current = () => {
          controls.reset();
          render();
        };
        const keys = (event) => {
          if (!orbit.current) {
            if (!pause.current && [" ", "Enter"].includes(event.key)) {
              event.preventDefault();
              pulseAt = time;
              pulseX = pulseY = 0;
            }
            return;
          }
          const direction = {
            ArrowLeft: [1, 0],
            ArrowRight: [-1, 0],
            ArrowUp: [0, 1],
            ArrowDown: [0, -1],
          }[event.key];
          if (direction) {
            event.preventDefault();
            if (event.shiftKey) {
              controls.rotateLeft(direction[0] * 0.12);
              controls.rotateUp(direction[1] * 0.12);
            } else controls.pan(direction[0] * 24, direction[1] * 24);
            controls.update();
          } else if (["+", "=", "-", "_"].includes(event.key)) {
            event.preventDefault();
            camera.zoom = THREE.MathUtils.clamp(
              camera.zoom * (["+", "="].includes(event.key) ? 1.12 : 1 / 1.12),
              controls.minZoom,
              controls.maxZoom,
            );
            camera.updateProjectionMatrix();
            controls.update();
            render();
          } else if (event.key === "0") {
            event.preventDefault();
            reset.current();
          } else if (event.key === "Escape") {
            event.preventDefault();
            exitOrbit.current();
            container
              .closest(".hero-art")
              .querySelector(".scene-mode-toggle")
              ?.focus();
          }
        };
        renderer.domElement.addEventListener("keydown", keys);
        const move = (event) => {
          if (event.pointerType !== "mouse" || orbit.current) return;
          const bounds = container.getBoundingClientRect();
          targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
          targetY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
          targetHover = 1;
        };
        const leave = () => {
          targetX = 0;
          targetY = 0;
          targetHover = 0;
        };
        const ripple = (event) => {
          if (orbit.current || pause.current) return;
          const bounds = container.getBoundingClientRect();
          pulseX =
            (((event.clientX - bounds.left) / bounds.width) * 2 - 1) *
            3.3 *
            camera.aspect;
          pulseY =
            -(((event.clientY - bounds.top) / bounds.height) * 2 - 1) * 3.3;
          pulseAt = time;
        };
        renderer.domElement.addEventListener("pointerup", ripple);
        container.addEventListener("pointermove", move);
        container.addEventListener("pointerleave", leave);
        document.addEventListener("visibilitychange", sync);
        const observer = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            sync();
          },
          { rootMargin: "100px" },
        );
        observer.observe(container);
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        const contextLost = (event) => {
          event.preventDefault();
          lost = true;
          onReady(false);
          sync();
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        compose();
        resize();
        updateName();
        color();
        applyMode();
        onReady(true);
        sync();
        teardown = () => {
          cancelAnimationFrame(frame);
          synchronize.current = () => {};
          encode.current = () => {};
          mode.current = () => {};
          reset.current = () => {};
          renderer.domElement.removeEventListener("keydown", keys);
          controls.removeEventListener("change", controlChange);
          controls.dispose();
          observer.disconnect();
          resizeObserver.disconnect();
          theme.disconnect();
          renderer.domElement.removeEventListener("pointerup", ripple);
          container.removeEventListener("pointermove", move);
          container.removeEventListener("pointerleave", leave);
          document.removeEventListener("visibilitychange", sync);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          onReady(false);
        };
      } catch {
        renderer?.dispose();
        renderer?.domElement.remove();
        onReady(false);
      }
    }
    initialize();
    return () => {
      disposed = true;
      teardown();
    };
  }, [enabled, onReady]);
  return <div ref={host} className="hero-webgl" aria-label="Name artwork" />;
}
