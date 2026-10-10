"use client";

import type { ReactNode, PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Magnetic({ children }: { children: ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
    const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

    return (
        <motion.div
            className="inline-block"
            style={{ x: sx, y: sy }}
            whileTap={{ scale: 0.95 }}
            onPointerMove={(e: PointerEvent<HTMLDivElement>) => {
                if (e.pointerType !== "mouse") return;
                const r = e.currentTarget.getBoundingClientRect();
                x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
                y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}
