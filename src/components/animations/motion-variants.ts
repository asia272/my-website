import type { Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const stagger = (gap = 0.1, delayChildren = 0.1): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren } },
});

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE },
    },
};

export const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.9, ease: "easeInOut" },
    },
};
