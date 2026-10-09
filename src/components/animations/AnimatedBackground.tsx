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
type Variant = "network" | "flow" | "mesh" | "hex";

interface AnimatedBackgroundProps {
    /**
     * network = connected nodes
     * flow    = flowing current lines
     * mesh    = shifting low-poly triangles
     * hex     = hexagon grid with a travelling wave
     */
    variant?: Variant;
    palette?: PaletteName;
    /** overall visibility, 0.3 (subtle) to 1.5 (bold) */
    opacity?: number;
    /** animation speed multiplier */
    speed?: number;
    /** react to the mouse (network, mesh and hex) */
    interactive?: boolean;
    /** fade the top and bottom edges into neighbouring sections */
    fade?: boolean;
    className?: string;
}

type Particle = { x: number; y: number; vx: number; vy: number };
type FlowParticle = { x: number; y: number; life: number };
type MeshPoint = { bx: number; by: number; p1: number; p2: number };

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
    `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export default function AnimatedBackground({
    variant = "network",
    palette = "brand",
    opacity = 1,
    speed = 1,
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
        let visible = true;
        let particles: Particle[] = [];
        let flow: FlowParticle[] = [];
        let meshPts: MeshPoint[] = [];
        let meshCols = 0;
        let meshRows = 0;
        let meshPos = new Float32Array(0);
        let hexes: { x: number; y: number }[] = [];
        const HEX_R = 28;
        const mouse = { x: -9999, y: -9999 };

        /* ------------------------------ setup ------------------------------ */
        const spawnFlow = (): FlowParticle => ({
            x: Math.random() * w,
            y: Math.random() * h,
            life: 80 + Math.random() * 160,
        });

        const setup = () => {
            const rect = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (variant === "network") {
                const count = Math.min(Math.round((w * h) / 14000), 90);
                particles = Array.from({ length: count }, () => ({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                }));
            }

            if (variant === "flow") {
                const count = Math.min(Math.round((w * h) / 9000), 170);
                flow = Array.from({ length: count }, spawnFlow);
                // warm up so the lines already exist (also used for reduced motion)
                for (let i = 0; i < 140; i++) drawFlow(0);
            }

            if (variant === "mesh") {
                const cell = 90;
                meshCols = Math.ceil(w / cell) + 3;
                meshRows = Math.ceil(h / cell) + 3;
                meshPts = [];
                for (let r = 0; r < meshRows; r++) {
                    for (let c = 0; c < meshCols; c++) {
                        meshPts.push({
                            bx: (c - 1) * cell + (Math.random() - 0.5) * cell * 0.35,
                            by: (r - 1) * cell + (Math.random() - 0.5) * cell * 0.35,
                            p1: Math.random() * Math.PI * 2,
                            p2: Math.random() * Math.PI * 2,
                        });
                    }
                }
                meshPos = new Float32Array(meshPts.length * 2);
            }

            if (variant === "hex") {
                const dx = Math.sqrt(3) * HEX_R;
                const dy = HEX_R * 1.5;
                hexes = [];
                for (let r = 0, y = -HEX_R; y < h + HEX_R; r++, y += dy) {
                    const off = r % 2 ? dx / 2 : 0;
                    for (let x = -dx + off; x < w + dx; x += dx) {
                        hexes.push({ x, y });
                    }
                }
            }

            draw(performance.now() / 1000);
        };

        /* ----------------------------- network ----------------------------- */
        const drawNetwork = () => {
            const link = 130;
            const pull = 160;

            for (const p of particles) {
                p.x += p.vx * speed;
                p.y += p.vy * speed;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
            }

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                const col = colorAt(colors, a.x / w);

                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < link) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = rgba(col, (1 - d / link) * 0.28 * opacity);
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // link to the mouse
                const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (md < pull) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = rgba(col, (1 - md / pull) * 0.5 * opacity);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = rgba(col, 0.65 * opacity);
                ctx.fill();
            }
        };

        /* ------------------------------- flow ------------------------------ */
        function drawFlow(t: number) {
            // fade old trails away (works on a transparent canvas)
            ctx!.globalCompositeOperation = "destination-out";
            ctx!.fillStyle = "rgba(0,0,0,0.06)";
            ctx!.fillRect(0, 0, w, h);
            ctx!.globalCompositeOperation = "source-over";

            const step = 1.5 * speed;
            ctx!.lineWidth = 1;

            for (let i = 0; i < flow.length; i++) {
                const p = flow[i];
                const angle =
                    (Math.sin(p.x * 0.004 + t * 0.1) +
                        Math.cos(p.y * 0.005 - t * 0.08) +
                        Math.sin((p.x + p.y) * 0.003 + t * 0.05)) *
                    1.6;

                const nx = p.x + Math.cos(angle) * step;
                const ny = p.y + Math.sin(angle) * step;

                ctx!.beginPath();
                ctx!.moveTo(p.x, p.y);
                ctx!.lineTo(nx, ny);
                ctx!.strokeStyle = rgba(colorAt(colors, p.x / w), 0.55 * opacity);
                ctx!.stroke();

                p.x = nx;
                p.y = ny;
                p.life--;

                if (p.life <= 0 || nx < -10 || nx > w + 10 || ny < -10 || ny > h + 10) {
                    flow[i] = spawnFlow();
                }
            }
        }

        /* ------------------------------- mesh ------------------------------ */
        const drawMesh = (t: number) => {
            // current position of every point
            for (let i = 0; i < meshPts.length; i++) {
                const p = meshPts[i];
                let x = p.bx + Math.sin(t * 0.5 + p.p1) * 14;
                let y = p.by + Math.cos(t * 0.4 + p.p2) * 14;

                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < 150 && d > 0) {
                    const push = (1 - d / 150) * 18;
                    x += (dx / d) * push;
                    y += (dy / d) * push;
                }
                meshPos[i * 2] = x;
                meshPos[i * 2 + 1] = y;
            }

            ctx.lineWidth = 1;
            ctx.lineJoin = "round";

            const tri = (a: number, b: number, c: number, seed: number) => {
                const ax = meshPos[a * 2], ay = meshPos[a * 2 + 1];
                const bx = meshPos[b * 2], by = meshPos[b * 2 + 1];
                const cx = meshPos[c * 2], cy = meshPos[c * 2 + 1];
                const col = colorAt(colors, (ax + bx + cx) / 3 / w);

                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);
                ctx.lineTo(cx, cy);
                ctx.closePath();

                const pulse = (Math.sin(t * 0.6 + seed) + 1) / 2;
                ctx.fillStyle = rgba(col, (0.02 + pulse * 0.09) * opacity);
                ctx.fill();
                ctx.strokeStyle = rgba(col, 0.13 * opacity);
                ctx.stroke();
            };

            for (let r = 0; r < meshRows - 1; r++) {
                for (let c = 0; c < meshCols - 1; c++) {
                    const i00 = r * meshCols + c;
                    const i10 = i00 + 1;
                    const i01 = i00 + meshCols;
                    const i11 = i01 + 1;
                    const seed = r * 0.7 + c * 0.5;
                    tri(i00, i10, i11, seed);
                    tri(i00, i11, i01, seed + 1.3);
                }
            }
        };

        /* -------------------------------- hex ------------------------------ */
        const drawHex = (t: number) => {
            const r = HEX_R - 2;
            const cx0 = w / 2;
            const cy0 = h / 2;
            ctx.lineWidth = 1;

            for (const hx of hexes) {
                const v =
                    Math.sin(Math.hypot(hx.x - cx0, hx.y - cy0) * 0.011 - t * 0.9) * 0.5 +
                    Math.sin(hx.x * 0.007 + hx.y * 0.004 + t * 0.5) * 0.5;
                const k = (v + 1) / 2;

                const md = Math.hypot(hx.x - mouse.x, hx.y - mouse.y);
                const m = md < 150 ? 1 - md / 150 : 0;

                const col = colorAt(colors, hx.x / w);

                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI / 3) * i - Math.PI / 6;
                    const px = hx.x + Math.cos(a) * r;
                    const py = hx.y + Math.sin(a) * r;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();

                const fillA = (k > 0.72 ? (k - 0.72) * 0.35 : 0) + m * 0.25;
                if (fillA > 0.005) {
                    ctx.fillStyle = rgba(col, fillA * opacity);
                    ctx.fill();
                }
                ctx.strokeStyle = rgba(col, (0.05 + k * 0.16 + m * 0.3) * opacity);
                ctx.stroke();
            }
        };

        /* ------------------------------- loop ------------------------------ */
        function draw(now: number) {
            const t = now * speed;
            if (variant !== "flow") ctx!.clearRect(0, 0, w, h);

            if (variant === "network") drawNetwork();
            else if (variant === "flow") drawFlow(t);
            else if (variant === "mesh") drawMesh(t);
            else drawHex(t);
        }

        const frame = (now: number) => {
            draw(now / 1000);
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (reduce || raf || !visible || document.hidden) return;
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
        };
        const onLeave = () => {
            mouse.x = mouse.y = -9999;
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        const ro = new ResizeObserver(setup);
        ro.observe(parent);

        // Only animate while the section is on screen
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            visible ? start() : stop();
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
    }, [variant, palette, opacity, speed, interactive, reduce]);

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