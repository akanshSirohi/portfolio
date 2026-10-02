const palettes = [
  { light: ["#b94927", "#487566"], dark: ["#ffa67c", "#a3d4bd"] },
  { light: ["#7154b0", "#b45436"], dark: ["#c9afff", "#ffb598"] },
  { light: ["#2d7091", "#947020"], dark: ["#9ddcfa", "#f0ce7c"] },
  { light: ["#397664", "#865985"], dark: ["#9ee3c2", "#e7b7e4"] },
  { light: ["#b04d63", "#4267a0"], dark: ["#ffadc0", "#b3ccff"] },
];

export function normalizeName(name) {
  return name.normalize("NFC").trim().replace(/\s+/g, " ");
}

export function signatureProfile(name) {
  let seed = 2166136261;
  for (const letter of normalizeName(name)) {
    seed = Math.imul(seed ^ letter.codePointAt(0), 16777619) >>> 0;
  }
  return {
    seed,
    id: seed.toString(16).padStart(8, "0").toUpperCase(),
    palette: palettes[seed % palettes.length],
    phase: ((seed % 360) / 180) * Math.PI,
    speed: 0.65 + (seed % 7) * 0.07,
  };
}

export function seededRandom(seed) {
  let value = seed;
  return () => {
    value += 0x6d2b79f5;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function nameLines(name) {
  const words = (normalizeName(name) || "Your name").split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && Array.from(`${line} ${word}`).length > 11) {
      lines.push(line);
      line = "";
    }
    for (const letter of word) {
      if (Array.from(line).length >= 11) {
        lines.push(line.trim());
        line = "";
      }
      line += letter;
    }
    line += " ";
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

// Shared between the live sculpture and its downloadable, settled composition.
export function createNameShape(name, family, count = 3200) {
  const profile = signatureProfile(name);
  const random = seededRandom(profile.seed);
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 560;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const lines = nameLines(name);
  let size = Math.min(240, 430 / lines.length);
  context.font = `600 ${size}px ${family}`;
  const width = Math.max(
    ...lines.map((line) => context.measureText(line).width),
  );
  size *= Math.min(1, 720 / Math.max(1, width));
  context.font = `600 ${size}px ${family}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  lines.forEach((line, index) => {
    context.fillText(
      line,
      400,
      280 + (index - (lines.length - 1) / 2) * size * 1.08,
    );
  });
  const pixels = context.getImageData(0, 0, 800, 560).data;
  const samples = [];
  for (let y = 2; y < 560; y += 3) {
    for (let x = 2; x < 800; x += 3) {
      if (pixels[(x + y * 800) * 4 + 3] > 128) samples.push([x, y]);
    }
  }
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let index = 0; index < count; index++) {
    const sample = samples[Math.floor(random() * samples.length)] || [400, 280];
    const x = ((sample[0] - 400 + (random() - 0.5) * 3) / 800) * 6.1;
    const y = ((280 - sample[1] + (random() - 0.5) * 3) / 560) * 4.3;
    positions.set(
      [x, y, Math.sin(x * 1.4 + profile.phase) * 0.18 + (random() - 0.5) * 0.1],
      index * 3,
    );
    seeds[index] = random();
  }
  return { positions, seeds, profile };
}

export async function saveSignature(name, family, dark) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = 1200;
  const context = canvas.getContext("2d");
  const { positions, seeds, profile } = createNameShape(name, family);
  const [primary, secondary] = profile.palette[dark ? "dark" : "light"];
  const paper = dark ? "#171d19" : "#f1efe6";
  const ink = dark ? "#e9ecdf" : "#242720";
  context.fillStyle = paper;
  context.fillRect(0, 0, 1800, 1200);
  context.strokeStyle = ink;
  context.globalAlpha = 0.17;
  context.strokeRect(70, 70, 1660, 1060);
  context.beginPath();
  context.moveTo(100, 225);
  context.lineTo(1700, 225);
  context.moveTo(100, 1000);
  context.lineTo(1700, 1000);
  context.stroke();
  const random = seededRandom(profile.seed);
  context.fillStyle = ink;
  for (let index = 0; index < 450; index++) {
    context.beginPath();
    context.arc(
      100 + random() * 1600,
      255 + random() * 710,
      1.1,
      0,
      Math.PI * 2,
    );
    context.fill();
  }
  context.globalAlpha = 1;
  context.font = "18px 'Courier New', monospace";
  context.fillText("NAME LAB / A SIGNATURE IN PARTICLES", 105, 145);
  context.textAlign = "right";
  context.fillText(`NO. ${profile.id}`, 1695, 145);
  context.textAlign = "left";
  context.font = `600 38px ${family}`;
  context.fillText("One name. One signature.", 105, 195);
  const gradient = context.createLinearGradient(380, 450, 1400, 700);
  gradient.addColorStop(0, primary);
  gradient.addColorStop(1, secondary);
  context.fillStyle = gradient;
  for (let index = 0; index < seeds.length; index++) {
    context.globalAlpha = 0.6 + seeds[index] * 0.4;
    context.beginPath();
    context.arc(
      900 + positions[index * 3] * 220,
      610 - positions[index * 3 + 1] * 220,
      1.6 + seeds[index] * 1.1,
      0,
      Math.PI * 2,
    );
    context.fill();
  }
  context.globalAlpha = 1;
  context.fillStyle = ink;
  context.font = "18px 'Courier New', monospace";
  context.fillText("AKANSH SIROHI / SOFTWARE DEVELOPER", 105, 1060);
  context.textAlign = "right";
  context.fillText("akanshsirohi.dev", 1695, 1060);
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Unable to create your signature image.");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const filename =
    normalizeName(name)
      .replace(/[^\p{L}\p{N}-]+/gu, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "your-name";
  link.download = `${filename.toLowerCase()}-signature.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
