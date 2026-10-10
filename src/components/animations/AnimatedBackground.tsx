// "use client";

// import { useEffect, useRef } from "react";
// import { useReducedMotion } from "motion/react";

// /* Brand palettes ("r,g,b"), blended left to right */
// const PALETTES = {
//     brand: ["109,101,254", "158,69,177", "0,175,183"],
//     purple: ["109,101,254", "139,133,255", "158,69,177"],
//     teal: ["0,175,183", "109,101,254", "52,211,153"],
//     gold: ["255,190,60", "158,69,177", "109,101,254"],
// } as const;

// type RGB = [number, number, number];
// type PaletteName = keyof typeof PALETTES;
// type LineStyle = "scratch" | "curve" | "dashed" | "straight";

// interface AnimatedBackgroundProps {
//     palette?: PaletteName;
//     /**
//      * scratch  = hand-drawn sketchy lines (default)
//      * curve    = soft bending curves
//      * dashed   = moving dashed lines
//      * straight = plain straight lines
//      */
//     lineStyle?: LineStyle;
//     /** overall visibility, 0.3 (subtle) to 1.5 (bold) */
//     opacity?: number;
//     /** animation speed multiplier */
//     speed?: number;
//     /** node amount multiplier, 0.5 (few) to 1.6 (dense) */
//     density?: number;
//     /** data packets that hop from node to node */
//     pulses?: boolean;
//     /** energy waves that ripple through the network */
//     waves?: boolean;
//     /** very soft halo on packets, hubs and nodes */
//     glow?: boolean;
//     /** cursor attracts nodes, links to them, parallax, click sends a wave */
//     interactive?: boolean;
//     /** fade the top and bottom edges into neighbouring sections */
//     fade?: boolean;
//     className?: string;
//     /** kept so older usages still compile; no longer used */
//     scan?: boolean;
// }

// type Node = {
//     x: number;
//     y: number;
//     ox: number;
//     oy: number;
//     z: number;
//     r: number;
//     hub: boolean;
//     phase: number;
//     tw: number;
//     flash: number;
//     delay: number;
// };
// type Packet = { a: number; b: number; t: number; hops: number };
// type Wave = { x: number; y: number; r: number; max: number };

// const LINK = 150;
// const PULL = 180;
// const FRONT = 46;
// const WAVE_SPEED = 310;

// const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
// const ease = (t: number) => t * t * (3 - 2 * t);
// const hash = (n: number) => {
//     const x = Math.sin(n * 127.1) * 43758.5453;
//     return x - Math.floor(x);
// };

// function colorAt(colors: RGB[], t: number): RGB {
//     const scaled = clamp01(t) * (colors.length - 1);
//     const i = Math.min(Math.floor(scaled), colors.length - 2);
//     const f = scaled - i;
//     return [
//         lerp(colors[i][0], colors[i + 1][0], f),
//         lerp(colors[i][1], colors[i + 1][1], f),
//         lerp(colors[i][2], colors[i + 1][2], f),
//     ];
// }

// const rgba = (c: RGB, a: number) =>
//     `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${clamp01(a).toFixed(3)})`;

// const lighten = (c: RGB): RGB => [
//     c[0] + (255 - c[0]) * 0.5,
//     c[1] + (255 - c[1]) * 0.5,
//     c[2] + (255 - c[2]) * 0.5,
// ];

// export default function AnimatedBackground({
//     palette = "brand",
//     lineStyle = "scratch",
//     opacity = 1,
//     speed = 1,
//     density = 1,
//     pulses = true,
//     waves = true,
//     glow = true,
//     interactive = true,
//     fade = true,
//     className = "",
// }: AnimatedBackgroundProps) {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const reduce = !!useReducedMotion();

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const parent = canvas?.parentElement;
//         const ctx = canvas?.getContext("2d");
//         if (!canvas || !parent || !ctx) return;

//         const colors = PALETTES[palette].map(
//             (c) => c.split(",").map(Number) as RGB
//         );

//         let w = 0;
//         let h = 0;
//         let raf = 0;
//         let last = 0;
//         let time = 0;
//         let intro = reduce ? 1.4 : 0;
//         let waveTimer = 1.4;
//         let visible = true;

//         let nodes: Node[] = [];
//         let n = 0;
//         let px = new Float32Array(0);
//         let py = new Float32Array(0);
//         let nodeIn = new Float32Array(0);
//         let energy = new Float32Array(0);
//         let str = new Float32Array(0);
//         let adj: number[][] = [];
//         const active: number[] = []; // flat [a, b, dist, strength, energy, ...]
//         const packets: Packet[] = [];
//         const wavesList: Wave[] = [];

//         const mouse = { x: -9999, y: -9999, active: false };
//         const reach = { s: 0 };
//         const par = { x: 0, y: 0 };

//         /* -------------------------------- setup -------------------------------- */
//         const setup = () => {
//             const rect = parent.getBoundingClientRect();
//             if (!rect.width || !rect.height) return;

//             const dpr = Math.min(window.devicePixelRatio || 1, 2);
//             w = rect.width;
//             h = rect.height;
//             canvas.width = Math.round(w * dpr);
//             canvas.height = Math.round(h * dpr);
//             ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//             n = Math.min(Math.round(((w * h) / 13500) * density), 110);

//             nodes = Array.from({ length: n }, () => {
//                 const z = 0.4 + Math.random() * 0.6;
//                 const x = Math.random() * w;
//                 const y = Math.random() * h;
//                 const hub = Math.random() < 0.1;
//                 const dc = Math.hypot(x - w / 2, y - h / 2) / Math.hypot(w / 2, h / 2);
//                 return {
//                     x,
//                     y,
//                     ox: 0,
//                     oy: 0,
//                     z,
//                     r: 1 + z * 1.3 + (hub ? 1.4 : 0),
//                     hub,
//                     phase: Math.random() * Math.PI * 2,
//                     tw: 0.4 + Math.random() * 0.8,
//                     flash: 0,
//                     delay: dc * 0.7 + Math.random() * 0.2,
//                 };
//             });

//             px = new Float32Array(n);
//             py = new Float32Array(n);
//             nodeIn = new Float32Array(n);
//             energy = new Float32Array(n);
//             str = new Float32Array(n * n);
//             adj = Array.from({ length: n }, () => []);
//             packets.length = 0;
//             wavesList.length = 0;

//             draw(0, false);
//         };

//         const spawnWave = (x: number, y: number) => {
//             if (wavesList.length >= 3) wavesList.shift();
//             wavesList.push({ x, y, r: 0, max: Math.max(w, h) * 0.85 });
//         };

//         /* ------------------------- line geometry helpers ------------------------ */
//         // control point of a curved link (same result for both directions)
//         const ctrl = (lo: number, hi: number, d: number): [number, number] => {
//             const mx = (px[lo] + px[hi]) / 2;
//             const my = (py[lo] + py[hi]) / 2;
//             const nx = -(py[hi] - py[lo]) / d;
//             const ny = (px[hi] - px[lo]) / d;
//             const bend = Math.sin(time * 0.55 + (lo * 13 + hi * 7)) * d * 0.22;
//             return [mx + nx * bend, my + ny * bend];
//         };

//         // point on a link, used by travelling packets
//         const pointOn = (a: number, b: number, t: number): [number, number] => {
//             if (lineStyle !== "curve") {
//                 return [lerp(px[a], px[b], t), lerp(py[a], py[b], t)];
//             }
//             const lo = Math.min(a, b);
//             const hi = Math.max(a, b);
//             const d = Math.hypot(px[hi] - px[lo], py[hi] - py[lo]) || 1;
//             const [cx, cy] = ctrl(lo, hi, d);
//             const u = a < b ? t : 1 - t;
//             const v = 1 - u;
//             return [
//                 v * v * px[lo] + 2 * v * u * cx + u * u * px[hi],
//                 v * v * py[lo] + 2 * v * u * cy + u * u * py[hi],
//             ];
//         };

//         // hand-drawn sketch: two jittery strokes that "boil" a few times a second
//         const scratch = (a: number, b: number, d: number, col: RGB, alpha: number) => {
//             const dx = (px[b] - px[a]) / d;
//             const dy = (py[b] - py[a]) / d;
//             const nx = -dy;
//             const ny = dx;
//             const segs = Math.max(3, Math.round(d / 15));
//             const seed = a * 131 + b * 17;
//             const tick = Math.floor(time * 5);

//             for (let pass = 0; pass < 2; pass++) {
//                 const over0 = pass ? hash(seed + tick * 0.7 + 1) * 5 : 0;
//                 const over1 = pass ? hash(seed + tick * 0.7 + 2) * 5 : 0;
//                 const amp = pass ? 2.4 : 1.5;

//                 ctx.beginPath();
//                 ctx.moveTo(px[a] - dx * over0, py[a] - dy * over0);
//                 for (let s = 1; s <= segs; s++) {
//                     const t = s / segs;
//                     const edge = s === segs ? 0.3 : 1;
//                     const off =
//                         (hash(seed + s * 3.1 + pass * 17.3 + tick * 0.37) - 0.5) * 2 * amp * edge;
//                     const extra = s === segs ? over1 : 0;
//                     ctx.lineTo(
//                         lerp(px[a], px[b], t) + nx * off + dx * extra,
//                         lerp(py[a], py[b], t) + ny * off + dy * extra
//                     );
//                 }
//                 ctx.lineWidth = pass ? 0.6 : 0.9;
//                 ctx.strokeStyle = rgba(col, alpha * (pass ? 0.55 : 1));
//                 ctx.stroke();
//             }
//         };

//         /* -------------------------------- draw --------------------------------- */
//         function draw(dt: number, live: boolean) {
//             ctx!.clearRect(0, 0, w, h);
//             const step = dt * 60 * speed;

//             reach.s += ((mouse.active ? 1 : 0) - reach.s) * 0.08;
//             const tpx = mouse.active ? -(mouse.x / w - 0.5) * 30 : 0;
//             const tpy = mouse.active ? -(mouse.y / h - 0.5) * 30 : 0;
//             par.x += (tpx - par.x) * 0.05;
//             par.y += (tpy - par.y) * 0.05;

//             if (live) intro = Math.min(intro + dt / 2.6, 1.4);

//             /* 1. waves */
//             if (live && waves && !reduce) {
//                 waveTimer -= dt * speed;
//                 if (waveTimer <= 0 && n > 0 && intro > 1) {
//                     const hubs = nodes.filter((nd) => nd.hub);
//                     const src = hubs.length
//                         ? hubs[(Math.random() * hubs.length) | 0]
//                         : nodes[(Math.random() * n) | 0];
//                     spawnWave(src.x, src.y);
//                     waveTimer = 4.2 + Math.random() * 2.2;
//                 }
//                 for (let i = wavesList.length - 1; i >= 0; i--) {
//                     wavesList[i].r += WAVE_SPEED * dt * speed;
//                     if (wavesList[i].r > wavesList[i].max) wavesList.splice(i, 1);
//                 }
//             }

//             const waveAt = (x: number, y: number) => {
//                 let e = 0;
//                 for (const wv of wavesList) {
//                     const d = (Math.hypot(x - wv.x, y - wv.y) - wv.r) / FRONT;
//                     e += Math.exp(-d * d) * (1 - wv.r / wv.max);
//                 }
//                 return Math.min(e, 1);
//             };

//             /* 2. move nodes */
//             for (let i = 0; i < n; i++) {
//                 const nd = nodes[i];

//                 if (live) {
//                     const ang =
//                         Math.sin(nd.x * 0.0035 + time * 0.18) * 1.6 +
//                         Math.cos(nd.y * 0.0042 - time * 0.14) * 1.6;
//                     nd.x += Math.cos(ang) * 0.2 * nd.z * step;
//                     nd.y += Math.sin(ang) * 0.2 * nd.z * step;
//                     if (nd.x < -24) nd.x = w + 24;
//                     else if (nd.x > w + 24) nd.x = -24;
//                     if (nd.y < -24) nd.y = h + 24;
//                     else if (nd.y > h + 24) nd.y = -24;

//                     let tx = 0;
//                     let ty = 0;
//                     const dx = mouse.x - (nd.x + nd.ox);
//                     const dy = mouse.y - (nd.y + nd.oy);
//                     const d = Math.hypot(dx, dy);
//                     if (mouse.active && d < PULL && d > 1) {
//                         const f = (1 - d / PULL) ** 2 * 0.22;
//                         tx = dx * f;
//                         ty = dy * f;
//                     }
//                     nd.ox += (tx - nd.ox) * 0.06;
//                     nd.oy += (ty - nd.oy) * 0.06;
//                     nd.flash *= Math.pow(0.06, dt);
//                 }

//                 px[i] = nd.x + nd.ox + par.x * nd.z;
//                 py[i] = nd.y + nd.oy + par.y * nd.z;
//                 nodeIn[i] = ease(clamp01((intro - nd.delay) / 0.4));
//                 energy[i] = wavesList.length ? waveAt(px[i], py[i]) : 0;
//                 adj[i].length = 0;
//             }

//             /* 3. link strengths (fade in and out, no popping) */
//             active.length = 0;
//             const rate = live ? Math.min(dt * 3.2, 1) : 1;
//             for (let i = 0; i < n; i++) {
//                 for (let j = i + 1; j < n; j++) {
//                     const dx = px[i] - px[j];
//                     const dy = py[i] - py[j];
//                     const k = i * n + j;
//                     const near = dx * dx + dy * dy < LINK * LINK;

//                     if (!near && str[k] < 0.004) {
//                         str[k] = 0;
//                         continue;
//                     }
//                     str[k] += ((near ? 1 : 0) - str[k]) * rate;
//                     if (str[k] < 0.01) continue;

//                     const d = Math.hypot(dx, dy);
//                     active.push(i, j, d, str[k], waveAt((px[i] + px[j]) / 2, (py[i] + py[j]) / 2));
//                     if (str[k] > 0.6 && d < LINK) {
//                         adj[i].push(j);
//                         adj[j].push(i);
//                     }
//                 }
//             }

//             /* 4. lines in the chosen style */
//             ctx!.lineCap = "round";
//             ctx!.lineJoin = "round";
//             ctx!.lineWidth = 0.9;
//             if (lineStyle === "dashed") {
//                 ctx!.setLineDash([3, 7]);
//                 ctx!.lineDashOffset = -time * 14;
//             }

//             for (let q = 0; q < active.length; q += 5) {
//                 const a = active[q];
//                 const b = active[q + 1];
//                 const d = active[q + 2];
//                 const fall = (1 - d / LINK) ** 1.35;
//                 const depth = (nodes[a].z + nodes[b].z) / 2;
//                 const vis = Math.min(nodeIn[a], nodeIn[b]) * active[q + 3];
//                 const alpha = (fall * 0.36 * depth + active[q + 4] * 0.5 * fall) * vis * opacity;
//                 if (alpha < 0.004) continue;

//                 const col = colorAt(colors, (px[a] + px[b]) / 2 / w);

//                 if (lineStyle === "scratch") {
//                     scratch(a, b, d, col, alpha);
//                 } else {
//                     ctx!.beginPath();
//                     ctx!.moveTo(px[a], py[a]);
//                     if (lineStyle === "curve") {
//                         const [cx, cy] = ctrl(a, b, d);
//                         ctx!.quadraticCurveTo(cx, cy, px[b], py[b]);
//                     } else {
//                         ctx!.lineTo(px[b], py[b]);
//                     }
//                     ctx!.strokeStyle = rgba(col, alpha);
//                     ctx!.stroke();
//                 }
//             }
//             ctx!.setLineDash([]);

//             /* 5. wave fronts (thin ring) */
//             ctx!.lineWidth = 1;
//             for (const wv of wavesList) {
//                 ctx!.beginPath();
//                 ctx!.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
//                 ctx!.strokeStyle = rgba(
//                     colorAt(colors, wv.x / w),
//                     (1 - wv.r / wv.max) * 0.1 * opacity
//                 );
//                 ctx!.stroke();
//             }

//             /* 6. cursor links */
//             if (reach.s > 0.02) {
//                 ctx!.lineWidth = 0.9;
//                 for (let i = 0; i < n; i++) {
//                     const d = Math.hypot(px[i] - mouse.x, py[i] - mouse.y);
//                     if (d < PULL) {
//                         ctx!.beginPath();
//                         ctx!.moveTo(px[i], py[i]);
//                         ctx!.lineTo(mouse.x, mouse.y);
//                         ctx!.strokeStyle = rgba(
//                             colorAt(colors, px[i] / w),
//                             (1 - d / PULL) ** 1.4 * 0.42 * reach.s * nodeIn[i] * opacity
//                         );
//                         ctx!.stroke();
//                     }
//                 }
//             }

//             /* 7. data packets: hop across the network with a trail */
//             if (pulses && live && intro > 0.9) {
//                 const max = Math.min(Math.round(n / 6), 14);
//                 if (packets.length < max && active.length && Math.random() < 0.05 * speed) {
//                     const q = ((Math.random() * (active.length / 5)) | 0) * 5;
//                     if (active[q + 3] > 0.8) {
//                         const flip = Math.random() < 0.5;
//                         packets.push({
//                             a: flip ? active[q + 1] : active[q],
//                             b: flip ? active[q] : active[q + 1],
//                             t: 0,
//                             hops: 2 + ((Math.random() * 4) | 0),
//                         });
//                     }
//                 }

//                 for (let i = packets.length - 1; i >= 0; i--) {
//                     const p = packets[i];
//                     const len = Math.hypot(px[p.a] - px[p.b], py[p.a] - py[p.b]);
//                     if (len > LINK * 1.1 || len < 1) {
//                         packets.splice(i, 1);
//                         continue;
//                     }
//                     p.t += (115 * speed * dt) / len;

//                     if (p.t >= 1) {
//                         nodes[p.b].flash = 1;
//                         const options = adj[p.b].filter((c) => c !== p.a);
//                         if (p.hops > 0 && options.length) {
//                             packets[i] = {
//                                 a: p.b,
//                                 b: options[(Math.random() * options.length) | 0],
//                                 t: 0,
//                                 hops: p.hops - 1,
//                             };
//                         } else {
//                             packets.splice(i, 1);
//                         }
//                         continue;
//                     }

//                     const [x, y] = pointOn(p.a, p.b, p.t);
//                     const col = colorAt(colors, x / w);

//                     // trail: short run of points behind the head
//                     ctx!.lineWidth = 1.5;
//                     for (let s = 0; s < 6; s++) {
//                         const t0 = Math.max(p.t - ((s + 1) * 4) / len, 0);
//                         const t1 = Math.max(p.t - (s * 4) / len, 0);
//                         const [x0, y0] = pointOn(p.a, p.b, t0);
//                         const [x1, y1] = pointOn(p.a, p.b, t1);
//                         ctx!.beginPath();
//                         ctx!.moveTo(x0, y0);
//                         ctx!.lineTo(x1, y1);
//                         ctx!.strokeStyle = rgba(col, (1 - s / 6) * 0.85 * opacity);
//                         ctx!.stroke();
//                     }

//                     if (glow) {
//                         ctx!.beginPath();
//                         ctx!.arc(x, y, 5, 0, Math.PI * 2);
//                         ctx!.fillStyle = rgba(col, 0.1 * opacity);
//                         ctx!.fill();
//                     }
//                     ctx!.beginPath();
//                     ctx!.arc(x, y, 1.7, 0, Math.PI * 2);
//                     ctx!.fillStyle = rgba(lighten(col), 0.95 * opacity);
//                     ctx!.fill();
//                 }
//             }

//             /* 8. nodes */
//             for (let i = 0; i < n; i++) {
//                 const nd = nodes[i];
//                 const vis = nodeIn[i];
//                 if (vis < 0.01) continue;

//                 const col = colorAt(colors, px[i] / w);
//                 const tw = 0.75 + 0.25 * Math.sin(time * nd.tw + nd.phase);
//                 const near =
//                     reach.s > 0.02
//                         ? clamp01(1 - Math.hypot(px[i] - mouse.x, py[i] - mouse.y) / PULL) * reach.s
//                         : 0;
//                 const lit = Math.min(energy[i] + nd.flash + near * 0.6, 1);
//                 const r = (nd.r + lit * 1.8) * (0.4 + 0.6 * vis);

//                 if (nd.hub) {
//                     ctx!.beginPath();
//                     ctx!.arc(
//                         px[i],
//                         py[i],
//                         9 + Math.sin(time * 1.2 + nd.phase) * 1.5 + lit * 4,
//                         0,
//                         Math.PI * 2
//                     );
//                     ctx!.lineWidth = 1;
//                     ctx!.strokeStyle = rgba(col, (0.14 + lit * 0.3) * vis * opacity);
//                     ctx!.stroke();
//                 }

//                 if (glow && lit > 0.05) {
//                     ctx!.beginPath();
//                     ctx!.arc(px[i], py[i], r + 7, 0, Math.PI * 2);
//                     ctx!.fillStyle = rgba(col, lit * 0.12 * opacity);
//                     ctx!.fill();
//                 }

//                 ctx!.beginPath();
//                 ctx!.arc(px[i], py[i], r, 0, Math.PI * 2);
//                 ctx!.fillStyle = rgba(
//                     lit > 0.4 ? lighten(col) : col,
//                     ((0.38 + nd.z * 0.4) * tw + lit * 0.45) * vis * opacity
//                 );
//                 ctx!.fill();
//             }
//         }

//         /* --------------------------------- loop -------------------------------- */
//         const frame = (now: number) => {
//             const dt = Math.min((now - last) / 1000, 0.05);
//             last = now;
//             time += dt * speed;
//             draw(dt, true);
//             raf = requestAnimationFrame(frame);
//         };

//         const start = () => {
//             if (reduce || raf || !visible || document.hidden) return;
//             last = performance.now();
//             raf = requestAnimationFrame(frame);
//         };
//         const stop = () => {
//             cancelAnimationFrame(raf);
//             raf = 0;
//         };

//         /* ------------------------------- listeners ----------------------------- */
//         const onMove = (e: PointerEvent) => {
//             if (e.pointerType === "touch") return;
//             const r = parent.getBoundingClientRect();
//             mouse.x = e.clientX - r.left;
//             mouse.y = e.clientY - r.top;
//             mouse.active = true;
//         };
//         const onLeave = () => {
//             mouse.active = false;
//         };
//         const onDown = (e: PointerEvent) => {
//             if (!waves) return;
//             const r = parent.getBoundingClientRect();
//             spawnWave(e.clientX - r.left, e.clientY - r.top);
//         };
//         const onVisibility = () => (document.hidden ? stop() : start());

//         const ro = new ResizeObserver(setup);
//         ro.observe(parent);

//         // Animate only while on screen; the intro replays each time it enters view
//         const io = new IntersectionObserver(([entry]) => {
//             const wasVisible = visible;
//             visible = entry.isIntersecting;
//             if (visible) {
//                 if (!wasVisible && !reduce) intro = 0;
//                 start();
//             } else {
//                 stop();
//             }
//         });
//         io.observe(parent);

//         if (interactive && !reduce) {
//             parent.addEventListener("pointermove", onMove);
//             parent.addEventListener("pointerleave", onLeave);
//             parent.addEventListener("pointerdown", onDown);
//         }
//         document.addEventListener("visibilitychange", onVisibility);

//         setup();
//         start();

//         return () => {
//             stop();
//             ro.disconnect();
//             io.disconnect();
//             parent.removeEventListener("pointermove", onMove);
//             parent.removeEventListener("pointerleave", onLeave);
//             parent.removeEventListener("pointerdown", onDown);
//             document.removeEventListener("visibilitychange", onVisibility);
//         };
//     }, [palette, lineStyle, opacity, speed, density, pulses, waves, glow, interactive, reduce]);

//     const mask = fade
//         ? "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)"
//         : undefined;

//     return (
//         <canvas
//             ref={canvasRef}
//             aria-hidden
//             className={`pointer-events-none absolute inset-0 -z-10 size-full ${className}`}
//             style={{ maskImage: mask, WebkitMaskImage: mask }}
//         />
//     );
// }