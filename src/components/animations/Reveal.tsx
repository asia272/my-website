"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp } from "./motion-variants";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants"> & {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
};

const directionOffset = {
    up: { x: 0, y: 24 },
    down: { x: 0, y: -24 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
};

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    ...props
}: RevealProps) {
    const offset = directionOffset[direction];

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}