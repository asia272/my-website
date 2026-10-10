"use client";

import { motion } from "motion/react";
import { draw } from "./motion-variants";

export default function DrawCheck() {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-6 text-green-600"
        >
            <motion.circle cx="12" cy="12" r="10" variants={draw} />
            <motion.path d="m8.5 12.5 2.5 2.5 4.5-5" variants={draw} />
        </motion.svg>
    );
}
