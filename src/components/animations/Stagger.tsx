"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { stagger as createStagger } from "./motion-variants";

type StaggerProps = Omit<HTMLMotionProps<"div">, "variants"> & {
    children: ReactNode;
    gap?: number;
    delayChildren?: number;
};

export default function Stagger({
    children,
    gap = 0.1,
    delayChildren = 0.1,
    ...props
}: StaggerProps) {
    return (
        <motion.div
            variants={createStagger(gap, delayChildren)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
