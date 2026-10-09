"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/* Brand palettes ("r,g,b"), blended left to right */
const PALETTES = {
    brand: ["109,101,254", "158,69,177", "0,175,183"],
    purple: ["109,101,254", "139,133,255", "158,69,177"],
    teal: ["0,175,183", "109,101,254", "52,211,153"],
    gold: ["255,190,60", "158,69,177", "109,101,254"],
} as const;

type RGB = [number, number, number];
type PaletteName = keyof typeof PALETTES;

interface AnimatedBackgroundProps {
    palette?: PaletteName;
    /** overall visibility, 0.3 (subtle) to 1.5 (bold) */
    opacity?: number;
    /** animation speed multiplier */
    speed?: number;
    /** node amount multiplier, 0.5 (few) to 1.6 (dense) */
    density?: number;
    /** data packets travelling along the connections */
    pulses?: boolean;
    /** soft light halo on packets and hub nodes */
    glow?: boolean;
    /** parallax depth + cursor interaction */
    interactive?: boolean;
    /** fade the top and bottom edges into neighbouring sections */
    fade?: boolean;
    className?: string;
}

type Node = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    z: number; // depth 0.35 (far) .. 1 (near)
    hub: boolean;
    phase: number;
    flash: number; // lights up when a packet arrives
};

type Pulse = { a: number; b: number; t: number; v: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* Color at position t (0..1) across the palette */
function colorAt(colors: RGB[], t: number): RGB {
    const scaled = Math.min(Math.max(t, 0), 1) * (colors.length - 1);
    const i = Math.min(Math.floor(scaled), colors.length - 2);
    const f = scaled - i;
    return [
        lerp(colors[i][0], colors[i + 1][0], f),
        lerp(colors[i][1], colors[i + 1][1], f),
        lerp(colors[i][2], colors[i + 1][2], f),
    ];
}

const rgba = (c: RGB, a: number) =>
    `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.min(Math.max(a, 0), 1)})`;

const LINK = 140; // max connection distance
const PULL = 180; // cursor connection distance

export default function AnimatedBackground({
    palette = "brand",
    opacity = 1,
    speed = 1,
    density = 1,
    pulses = true,
    glow = true,
    interactive = true,
    fade = true,
    className = "",
}: AnimatedBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduce = !!useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !parent || !ctx) return;

        const colors = PALETTES[palette].map(
            (c) => c.split(",").map(Number) as RGB
        );

        let w = 0;
        let h = 0;
        let raf = 0;
        let last = 0;
        let visible = true;

        let nodes: Node[] = [];
        let px = new Float32Array(0); // rendered positions
        let py = new Float32Array(0);
        let head = new Int32Array(0); // spatial grid
        let next = new Int32Array(0);
        let gridCols = 0;
        let gridRows = 0;

        const links: number[] = []; // flat [a, b, dist, a, b, dist, ...]
        const packets: Pulse[] = [];

        const mouse = { x: -9999, y: -9999, active: false };
        const look = { x: 0, y: 0 }; // smoothed parallax (-0.5 .. 0.5)

        /* ------------------------------ setup ------------------------------ */
        const setup = () => {
            const rect = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(
                Math.round(((w * h) / 12500) * density),
                140
            );

            nodes = Array.from({ length: count }, () => {
                const z = 0.35 + Math.random() * 0.65;
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4 * z,
                    vy: (Math.random() - 0.5) * 0.4 * z,
                    z,
                    hub: Math.random() < 0.13 && z > 0.6,
                    phase: Math.random() * Math.PI * 2,
                    flash: 0,
                };
            });

            px = new Float32Array(count);
            py = new Float32Array(count);
            next = new Int32Array(count);

            gridCols = Math.ceil(w / LINK) + 1;
            gridRows = Math.ceil(h / LINK) + 1;
            head = new Int32Array(gridCols * gridRows);

            packets.length = 0;
            draw(performance.now() / 1000, 0);
        };

        /* ------------------------------- draw ------------------------------ */
        function draw(t: number, dt: number) {
            ctx!.clearRect(0, 0, w, h);

            const step = dt * 60 * speed;

            // smooth parallax toward the cursor (or back to center)
            const tx = mouse.active ? mouse.x / w - 0.5 : 0;
            const ty = mouse.active ? mouse.y / h - 0.5 : 0;
            look.x += (tx - look.x) * 0.05;
            look.y += (ty - look.y) * 0.05;

            /* 1. move nodes + compute rendered positions */
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.x += n.vx * step;
                n.y += n.vy * step;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
                n.flash *= 0.94;

                let x = n.x - look.x * 36 * n.z;
                let y = n.y - look.y * 36 * n.z;

                // gentle attraction toward the cursor
                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const d = Math.hypot(dx, dy);
                if (d < PULL && d > 1) {
                    const f = (1 - d / PULL) * 0.1;
                    x += dx * f;
                    y += dy * f;
                }
                px[i] = x;
                py[i] = y;
            }

            /* 2. spatial grid -> connections (fast neighbour search) */
            head.fill(-1);
            for (let i = 0; i < nodes.length; i++) {
                const cx = Math.min(Math.max((px[i] / LINK) | 0, 0), gridCols - 1);
                const cy = Math.min(Math.max((py[i] / LINK) | 0, 0), gridRows - 1);
                const cell = cy * gridCols + cx;
                next[i] = head[cell];
                head[cell] = i;
            }

            links.length = 0;
            for (let i = 0; i < nodes.length; i++) {
                const cx = Math.min(Math.max((px[i] / LINK) | 0, 0), gridCols - 1);
                const cy = Math.min(Math.max((py[i] / LINK) | 0, 0), gridRows - 1);

                for (let gy = Math.max(cy - 1, 0); gy <= Math.min(cy + 1, gridRows - 1); gy++) {
                    for (let gx = Math.max(cx - 1, 0); gx <= Math.min(cx + 1, gridCols - 1); gx++) {
                        for (let j = head[gy * gridCols + gx]; j !== -1; j = next[j]) {
                            if (j <= i) continue;
                            const d = Math.hypot(px[i] - px[j], py[i] - py[j]);
                            if (d < LINK) links.push(i, j, d);
                        }
                    }
                }
            }

            /* 3. draw connections */
            ctx!.lineWidth = 1;
            for (let k = 0; k < links.length; k += 3) {
                const a = links[k];
                const b = links[k + 1];
                const d = links[k + 2];
                const depth = (nodes[a].z + nodes[b].z) / 2;
                const col = colorAt(colors, px[a] / w);

                ctx!.beginPath();
                ctx!.moveTo(px[a], py[a]);
                ctx!.lineTo(px[b], py[b]);
                ctx!.strokeStyle = rgba(col, (1 - d / LINK) * 0.34 * depth * opacity);
                ctx!.stroke();
            }

            /* 4. connections to the cursor */
            if (mouse.active) {
                for (let i = 0; i < nodes.length; i++) {
                    const d = Math.hypot(px[i] - mouse.x, py[i] - mouse.y);
                    if (d < PULL) {
                        const col = colorAt(colors, px[i] / w);
                        ctx!.beginPath();
                        ctx!.moveTo(px[i], py[i]);
                        ctx!.lineTo(mouse.x, mouse.y);
                        ctx!.strokeStyle = rgba(col, (1 - d / PULL) * 0.55 * opacity);
                        ctx!.stroke();
                    }
                }
                ctx!.beginPath();
                ctx!.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
                ctx!.strokeStyle = rgba(colorAt(colors, mouse.x / w), 0.6 * opacity);
                ctx!.stroke();
            }

            /* 5. data packets travelling along connections */
            if (pulses && dt > 0) {
                const max = Math.min(Math.round(nodes.length / 4), 26);
                if (packets.length < max && links.length && Math.random() < 0.08 * speed) {
                    const k = ((Math.random() * (links.length / 3)) | 0) * 3;
                    const flip = Math.random() < 0.5;
                    packets.push({
                        a: flip ? links[k + 1] : links[k],
                        b: flip ? links[k] : links[k + 1],
                        t: 0,
                        v: 0.012 + Math.random() * 0.012,
                    });
                }

                for (let i = packets.length - 1; i >= 0; i--) {
                    const p = packets[i];
                    p.t += p.v * step;

                    const broken =
                        Math.hypot(px[p.a] - px[p.b], py[p.a] - py[p.b]) > LINK * 1.15;

                    if (p.t >= 1 || broken) {
                        if (!broken) nodes[p.b].flash = 1; // light up the target node
                        packets.splice(i, 1);
                        continue;
                    }

                    const x = lerp(px[p.a], px[p.b], p.t);
                    const y = lerp(py[p.a], py[p.b], p.t);
                    const tx2 = lerp(px[p.a], px[p.b], Math.max(p.t - 0.12, 0));
                    const ty2 = lerp(py[p.a], py[p.b], Math.max(p.t - 0.12, 0));
                    const col = colorAt(colors, x / w);

                    // trail
                    const grad = ctx!.createLinearGradient(tx2, ty2, x, y);
                    grad.addColorStop(0, rgba(col, 0));
                    grad.addColorStop(1, rgba(col, 0.9 * opacity));
                    ctx!.beginPath();
                    ctx!.moveTo(tx2, ty2);
                    ctx!.lineTo(x, y);
                    ctx!.strokeStyle = grad;
                    ctx!.lineWidth = 1.6;
                    ctx!.stroke();
                    ctx!.lineWidth = 1;

                    // head
                    if (glow) {
                        ctx!.beginPath();
                        ctx!.arc(x, y, 5, 0, Math.PI * 2);
                        ctx!.fillStyle = rgba(col, 0.14 * opacity);
                        ctx!.fill();
                    }
                    ctx!.beginPath();
                    ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
                    ctx!.fillStyle = rgba(col, 0.95 * opacity);
                    ctx!.fill();
                }
            }

            /* 6. nodes (far to near; hubs get orbiting rings) */
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const x = px[i];
                const y = py[i];
                const col = colorAt(colors, x / w);
                const r = (n.hub ? 3 : 1.6) * (0.7 + n.z * 0.6) + n.flash * 2;
                const a = (0.35 + n.z * 0.5 + n.flash * 0.4) * opacity;

                if (n.hub) {
                    const ring = 9 + n.z * 4 + n.flash * 4;

                    if (glow) {
                        ctx!.beginPath();
                        ctx!.arc(x, y, ring + 6, 0, Math.PI * 2);
                        ctx!.fillStyle = rgba(col, 0.06 * opacity);
                        ctx!.fill();
                    }

                    ctx!.beginPath();
                    ctx!.arc(x, y, ring, 0, Math.PI * 2);
                    ctx!.strokeStyle = rgba(col, 0.2 * opacity);
                    ctx!.stroke();

                    // rotating arc
                    const rot = t * 0.9 + n.phase;
                    ctx!.beginPath();
                    ctx!.arc(x, y, ring, rot, rot + Math.PI * 0.55);
                    ctx!.strokeStyle = rgba(col, 0.75 * opacity);
                    ctx!.lineWidth = 1.5;
                    ctx!.stroke();
                    ctx!.lineWidth = 1;
                }

                ctx!.beginPath();
                ctx!.arc(x, y, r, 0, Math.PI * 2);
                ctx!.fillStyle = rgba(col, a);
                ctx!.fill();
            }
        }

        /* ------------------------------- loop ------------------------------ */
        const frame = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            draw(now / 1000, dt);
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (reduce || raf || !visible || document.hidden) return;
            last = performance.now();
            raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        /* ----------------------------- listeners --------------------------- */
        const onMove = (e: PointerEvent) => {
            const r = parent.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
            mouse.active = true;
        };
        const onLeave = () => {
            mouse.x = mouse.y = -9999;
            mouse.active = false;
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        const ro = new ResizeObserver(setup);
        ro.observe(parent);

        // Only animate while the section is on screen
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        io.observe(parent);

        if (interactive && !reduce) {
            parent.addEventListener("pointermove", onMove);
            parent.addEventListener("pointerleave", onLeave);
        }
        document.addEventListener("visibilitychange", onVisibility);

        setup();
        start();

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
            parent.removeEventListener("pointermove", onMove);
            parent.removeEventListener("pointerleave", onLeave);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [palette, opacity, speed, density, pulses, glow, interactive, reduce]);

    const mask = fade
        ? "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)"
        : undefined;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className={`pointer-events-none absolute inset-0 -z-10 size-full ${className}`}
            style={{ maskImage: mask, WebkitMaskImage: mask }}
        />
    );
}