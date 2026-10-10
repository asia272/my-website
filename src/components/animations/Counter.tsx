"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { EASE } from "./motion-variants";

type CounterProps = { value: number; active: boolean };

export default function Counter({ value, active }: CounterProps) {
    const mv = useMotionValue(0);
    const text = useTransform(mv, (v) => `${Math.round(v)}%`);

    useEffect(() => {
        if (!active) return;
        const controls = animate(mv, value, { duration: 2, ease: EASE });
        return () => controls.stop();
    }, [active, value, mv]);

    return <motion.span>{text}</motion.span>;
}
