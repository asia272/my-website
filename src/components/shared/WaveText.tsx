
"use client";

import {
    motion,
    useInView,
    type HTMLMotionProps,
} from "motion/react";
import {
    useMemo,
    useRef,
} from "react";

import { cn } from "@/lib/utils";

type WaveElement =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span";

type WaveTextProps = Omit<
    HTMLMotionProps<"span">,
    "children"
> & {
    /**
     * Text to animate.
     */
    children: string;

    /**
     * Element rendered by WaveText.
     *
     * Use "span" when WaveText is inside
     * another heading.
     */
    as?: WaveElement;

    /**
     * Start animation when the text enters
     * the viewport.
     */
    startOnView?: boolean;

    /**
     * Animate only once.
     */
    once?: boolean;

    /**
     * Delay before the first character.
     */
    delay?: number;

    /**
     * Delay between characters.
     */
    stagger?: number;

    /**
     * Duration of each character animation.
     */
    duration?: number;

    /**
     * Vertical height of the sine wave.
     *
     * Example:
     * 10 = subtle
     * 20 = visible
     * 30 = dramatic
     */
    amplitude?: number;

    /**
     * Controls the width of the sine wave.
     *
     * Smaller number = tighter wave.
     * Larger number = smoother/wider wave.
     */
    wavelength?: number;

    /**
     * Additional class applied to
     * every animated character.
     *
     * Useful for gradient text.
     */
    characterClassName?: string;
};

const motionElements = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
    p: motion.p,
    span: motion.span,
};

export default function WaveText({
    children,
    as = "span",
    className,
    startOnView = true,
    once = true,
    delay = 0,
    stagger = 0.035,
    duration = 0.65,
    amplitude = 18,
    wavelength = 2.5,
    characterClassName,
    ...props
}: WaveTextProps) {
    const ref = useRef<HTMLElement>(null);

    const isInView = useInView(ref, {
        once,
        amount: 0.25,
    });

    /**
     * Split text into words while preserving spaces.
     *
     * Example:
     *
     * "Hello world"
     *
     * becomes:
     *
     * ["Hello", " ", "world"]
     *
     * This allows the browser to wrap between words,
     * but never between characters of the same word.
     */
    const words = useMemo(
        () => children.split(/(\s+)/),
        [children]
    );

    const shouldAnimate = startOnView
        ? isInView
        : true;

    const MotionComponent = motionElements[as];

    return (
        <MotionComponent
            ref={ref}
            className={cn("inline", className)}
            {...props}
        >
            {words.map((word, wordIndex) => {
                /**
                 * Render whitespace normally.
                 *
                 * Spaces are not animated.
                 */
                if (/^\s+$/.test(word)) {
                    return (
                        <span
                            key={`space-${wordIndex}`}
                            aria-hidden="true"
                        >
                            {word}
                        </span>
                    );
                }

                /**
                 * Keep the complete word together.
                 *
                 * The browser can move this entire word
                 * to the next line, but cannot break it
                 * between individual characters.
                 */
                return (
                    <span
                        key={`word-${wordIndex}`}
                        className="inline-block"
                        aria-hidden="true"
                    >
                        {Array.from(word).map(
                            (character, charIndex) => {
                                /**
                                 * Calculate the global character
                                 * index so the sine wave continues
                                 * smoothly across words.
                                 */
                                const index =
                                    words
                                        .slice(
                                            0,
                                            wordIndex
                                        )
                                        .join("")
                                        .length +
                                    charIndex;

                                const waveY =
                                    Math.sin(
                                        index /
                                        wavelength
                                    ) * amplitude;

                                const waveRotation =
                                    Math.cos(
                                        index /
                                        wavelength
                                    ) *
                                    (amplitude * 0.35);

                                return (
                                    <motion.span
                                        key={`${character}-${index}`}
                                        className={cn(
                                            "inline-block",
                                            characterClassName
                                        )}
                                        initial={{
                                            opacity: 0,
                                            y:
                                                waveY +
                                                24,
                                            rotate:
                                                waveRotation,
                                            filter:
                                                "blur(6px)",
                                        }}
                                        animate={
                                            shouldAnimate
                                                ? {
                                                    opacity: 1,
                                                    y: 0,
                                                    rotate: 0,
                                                    filter:
                                                        "blur(0px)",
                                                }
                                                : {
                                                    opacity: 0,
                                                    y:
                                                        waveY +
                                                        24,
                                                    rotate:
                                                        waveRotation,
                                                    filter:
                                                        "blur(6px)",
                                                }
                                        }
                                        transition={{
                                            delay:
                                                delay +
                                                index *
                                                stagger,

                                            duration,

                                            y: {
                                                duration,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            },

                                            opacity: {
                                                duration:
                                                    duration *
                                                    0.65,
                                                ease: "easeOut",
                                            },

                                            rotate: {
                                                duration,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            },

                                            filter: {
                                                duration:
                                                    duration *
                                                    0.75,
                                                ease: "easeOut",
                                            },
                                        }}
                                    >
                                        {character}
                                    </motion.span>
                                );
                            }
                        )}
                    </span>
                );
            })}

            {/*
             * Accessible version.
             *
             * Screen readers receive the complete
             * sentence instead of individual characters.
             */}
            <span className="sr-only">
                {children}
            </span>
        </MotionComponent>
    );
}

