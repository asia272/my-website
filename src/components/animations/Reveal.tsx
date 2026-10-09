"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: Direction;
    distance?: number;
    once?: boolean;
    margin?: `${number}px`;
}

export function Reveal({
    children,
    className,
    delay = 0,
    duration = 0.65,
    direction = "up",
    distance = 24,
    once = false,
    margin = "-80px",
}: RevealProps) {
    const reduceMotion = useReducedMotion();

    const offset = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    }[direction];

    return (
        <motion.div
            className={className}
            initial={
                reduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }
            }
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, margin }}
            transition={{ duration, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export default Reveal;