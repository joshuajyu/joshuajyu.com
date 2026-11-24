// Renders the ambient "lava lamp" background on one small canvas.
//
// Why a canvas: blobs now change colour over time. As CSS layers that would
// mean repainting screen-sized layers continuously (or stacking a copy per
// colour, multiplying GPU memory). The blobs are completely blurry, so they
// are drawn at 1/RES resolution and the canvas is stretched to the viewport
// with bilinear filtering — visually identical, a tiny fraction of the cost.
//
// Per blob (config in src/data/lava.ts):
//   bubble — swells min → max → min (ease-in-out halves), brightening 75% → 100%
//   wobble — small drift around its centre, alternating
//   spin   — very slow constant turn
//   colour — steps through --lava-1..4, blended in OKLab; blobs are spread
//            across the cycle so the page always shows a mix
// Contrast budget: each blob is drawn at full colour to an offscreen canvas
// and composited once at --lava-opacity × o × breathing, so overlapping lobes
// never exceed the strength the text-contrast checks in global.css assume.

import { blobs, colourCycle, falloff, shapes, type LavaBlob } from "../data/lava";

const RES = 6; // CSS px per canvas px
const FPS = 30; // motion is slow; 30fps is plenty and halves the work

type Lab = [number, number, number];

// --- colour: hex <-> OKLab ---------------------------------------------------
const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function hexToLab(hex: string): Lab {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => toLinear(parseInt(n.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function labToRgb([L, A, B]: Lab): [number, number, number] {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.round(Math.min(1, Math.max(0, toGamma(v))) * 255)) as [number, number, number];
}

const lerpLab = (a: Lab, b: Lab, t: number): Lab => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// --- timing ------------------------------------------------------------------
/** CSS-like ease-in-out (sine approximation of cubic-bezier(.42,0,.58,1)). */
const ease = (u: number) => 0.5 - 0.5 * Math.cos(Math.PI * u);
const mod = (a: number, n: number) => ((a % n) + n) % n;
/** 0 → 1 → 0 over `period`, eased each way (like keyframes 0% / 50% / 100%). */
const pulse = (t: number, period: number, delay: number) => {
  const p = mod(t - delay, period) / period;
  return ease(p < 0.5 ? p * 2 : (1 - p) * 2);
};

// --- renderer ----------------------------------------------------------------
function start(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const octx = off.getContext("2d");
  if (!ctx || !octx) return;

  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  let W = 1;
  let H = 1;
  let palette: Lab[] = [];
  let strength = 0;

  const resize = () => {
    W = Math.max(1, Math.ceil(innerWidth / RES));
    H = Math.max(1, Math.ceil(innerHeight / RES));
    canvas.width = off.width = W;
    canvas.height = off.height = H;
  };

  const readTheme = () => {
    const cs = getComputedStyle(root);
    palette = [1, 2, 3, 4].map((i) => hexToLab(cs.getPropertyValue(`--lava-${i}`).trim() || "#000000"));
    strength = parseFloat(cs.getPropertyValue("--lava-opacity")) || 0;
  };

  /** "15vw" / "-6vh" / "104vmax" → canvas px. */
  const unit = (v: string) => {
    const n = parseFloat(v);
    if (v.endsWith("vmax")) return (n * Math.max(W, H)) / 100;
    if (v.endsWith("vh")) return (n * H) / 100;
    return (n * W) / 100; // vw
  };

  const step = colourCycle.hold + colourCycle.blend;
  const cycle = step * 4;

  const colourAt = (b: LavaBlob, k: number, t: number, animated: boolean): Lab => {
    const first = b.colour - 1;
    if (!animated) return palette[first];
    const tau = mod(t + (k / blobs.length) * cycle, cycle);
    const i = Math.floor(tau / step);
    const within = tau - i * step;
    const from = palette[(first + i) % 4];
    const to = palette[(first + i + 1) % 4];
    return within <= colourCycle.hold ? from : lerpLab(from, to, ease((within - colourCycle.hold) / colourCycle.blend));
  };

  const draw = (t: number, animated: boolean) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    blobs.forEach((b, k) => {
      const size = unit(b.size);
      let sx: number, sy: number, dx = 0, dy = 0, breathe = 1;
      let angle = (b.spin.start * Math.PI) / 180;

      if (animated) {
        const e = pulse(t, b.bubble.s, b.bubble.delay);
        sx = b.bubble.min + (b.bubble.max - b.bubble.min) * e;
        sy = b.bubble.min + (b.bubble.max * b.bubble.aspect - b.bubble.min) * e;
        breathe = 0.75 + 0.25 * e;
        const w = pulse(t, b.wobble.s * 2, b.wobble.delay); // alternate: out over s, back over s
        dx = unit(b.wobble.x) * w;
        dy = unit(b.wobble.y) * w;
        angle += Math.sign(b.spin.s) * ((2 * Math.PI * mod(t, Math.abs(b.spin.s))) / Math.abs(b.spin.s));
      } else {
        sx = sy = (b.bubble.min + b.bubble.max) / 2;
      }

      // Lobes at full colour on the offscreen canvas…
      const [r, g, bl] = labToRgb(colourAt(b, k, t, animated));
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.clearRect(0, 0, W, H);
      octx.translate(unit(b.x) + dx, unit(b.y) + dy);
      octx.scale(sx, sy);
      octx.rotate(angle);
      for (const [cx, cy, rx, ry] of shapes[b.shape]) {
        octx.save();
        octx.translate(((cx - 50) / 100) * size, ((cy - 50) / 100) * size);
        octx.scale((rx / 100) * size, (ry / 100) * size);
        const grad = octx.createRadialGradient(0, 0, 0, 0, 0, 1);
        for (const [pos, a] of falloff) grad.addColorStop(pos, `rgba(${r},${g},${bl},${a})`);
        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(0, 0, 1, 0, Math.PI * 2);
        octx.fill();
        octx.restore();
      }

      // …then composited once at the blob's strength.
      ctx.globalAlpha = strength * b.o * breathe;
      ctx.drawImage(off, 0, 0);
    });
  };

  let raf = 0;
  let last = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / FPS - 2) return;
    last = now;
    draw(now / 1000, true);
  };

  const run = () => {
    cancelAnimationFrame(raf);
    if (reduceMotion.matches) draw(0, false);
    else raf = requestAnimationFrame(frame);
  };

  resize();
  readTheme();
  run();

  addEventListener("resize", () => {
    resize();
    if (reduceMotion.matches) draw(0, false);
  });
  reduceMotion.addEventListener("change", run);
  // Theme toggle flips `.dark` on <html>: pick up the new palette/strength.
  new MutationObserver(() => {
    readTheme();
    if (reduceMotion.matches) draw(0, false);
  }).observe(root, { attributes: true, attributeFilter: ["class"] });
}

const canvas = document.querySelector<HTMLCanvasElement>(".lava canvas");
if (canvas) start(canvas);
