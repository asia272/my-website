


"use client";

import { api } from "../../../convex/_generated/api";
import PageHeading from "../shared/PageHeading";
import TeamCard from "../team/TeamCard";
import TeamCardSkeleton from "../skeleton/TeamCardSkeleton";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    UsersRound,
} from "lucide-react";
import {
    useKeenSlider,
    type KeenSliderPlugin,
} from "keen-slider/react";
import { useQuery } from "convex/react";

import "keen-slider/keen-slider.min.css";
import Link from "next/link";

/* =========================================================
   CONFIG
   ========================================================= */

const CAROUSEL_RADIUS = 300;
const AUTOPLAY_DELAY = 3000;

/*
 * Always keep the original 6-position geometry.
 *
 * 360 / 6 = 60 degrees.
 */
const CAROUSEL_ANGLE_STEP = 60;

const TOTAL_CAROUSEL_SLOTS = 6;

/* =========================================================
   TYPES
   ========================================================= */

type TeamMember = {
    _id: string;
    name: string;
    role: string;
    description: string;
    imageUrl: string | null;
};

type CarouselMember = TeamMember & {
    carouselKey: string;
};

/* =========================================================
   CREATE CAROUSEL SLOTS
   ========================================================= */

function createCarouselMembers(
    members: TeamMember[],
): CarouselMember[] {
    if (!Array.isArray(members) || members.length === 0) {
        return [];
    }

    return members.map((member, index) => ({
        ...member,
        carouselKey: `${member._id}-${index}`,
    }));
}

/* =========================================================
   GET SHORTEST CIRCULAR DISTANCE
   ========================================================= */

function getCircularDistance(
    index: number,
    activeIndex: number,
    total: number,
) {
    let distance = index - activeIndex;

    while (distance > total / 2) {
        distance -= total;
    }

    while (distance < -total / 2) {
        distance += total;
    }

    return distance;
}

/* =========================================================
   3D CAROUSEL PLUGIN
   ========================================================= */

function createIndividualSlidePlugin(
    radius: number,
): KeenSliderPlugin {
    return (slider) => {
        const updateSlides = () => {
            const details = slider.track.details;

            if (!details) return;

            const totalSlides =
                slider.slides.length;

            slider.slides.forEach((slide, index) => {
                const slideDetails =
                    details.slides[index];

                if (!slideDetails) return;

                let distance =
                    slideDetails.distance;


                while (
                    distance >
                    totalSlides / 2
                ) {
                    distance -= totalSlides;
                }

                while (
                    distance <
                    -totalSlides / 2
                ) {
                    distance += totalSlides;
                }

                const angle =
                    distance *
                    CAROUSEL_ANGLE_STEP;

                slide.style.transform =
                    `rotateY(${angle}deg) translateZ(${radius}px)`;

                const depth = Math.cos(
                    (angle * Math.PI) / 180,
                );

                slide.style.zIndex =
                    String(
                        Math.round(
                            (depth + 1) * 100,
                        ),
                    );
            });
        };

        slider.on(
            "created",
            updateSlides,
        );

        slider.on(
            "detailsChanged",
            updateSlides,
        );

        slider.on(
            "updated",
            updateSlides,
        );
    };
}

/* =========================================================
   COMPONENT
   ========================================================= */

const TeamSection = () => {
    const teamMembers = useQuery(
        api.teamMembers.listActive,
    );

    const [isPaused, setIsPaused] =
        useState(false);

    const [currentSlide, setCurrentSlide] =
        useState(0);

    const autoplayRef = useRef<
        ReturnType<typeof setInterval> | null
    >(null);

    /* =====================================================
       CAROUSEL DATA
       ===================================================== */

    const carouselMembers = useMemo(
        () =>
            createCarouselMembers(
                (teamMembers ??
                    []) as TeamMember[],
            ),
        [teamMembers],
    );

    /* =====================================================
       KEEN SLIDER
       ===================================================== */

    const [sliderRef, instanceRef] =
        useKeenSlider<HTMLDivElement>(
            {
                loop: true,

                mode: "free-snap",

                renderMode: "custom",

                selector:
                    ".team-carousel__cell",

                slides: {
                    perView: 1,
                    spacing: 0,
                },

                drag: true,

                created(slider) {
                    slider.update();

                    setCurrentSlide(
                        slider.track.details.rel,
                    );
                },

                slideChanged(slider) {
                    setCurrentSlide(
                        slider.track.details.rel,
                    );
                },
            },

            [
                createIndividualSlidePlugin(
                    CAROUSEL_RADIUS,
                ),
            ],
        );

    useEffect(() => {
        if (!instanceRef.current) return;

        const frame = requestAnimationFrame(() => {
            instanceRef.current?.update();
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [carouselMembers.length]);
    /* =====================================================
       AUTOPLAY
       ===================================================== */

    useEffect(() => {
        if (!instanceRef.current) return;

        if (autoplayRef.current) {
            clearInterval(
                autoplayRef.current,
            );
        }

        if (isPaused) return;

        autoplayRef.current =
            setInterval(() => {
                instanceRef.current?.next();
            }, AUTOPLAY_DELAY);

        return () => {
            if (autoplayRef.current) {
                clearInterval(
                    autoplayRef.current,
                );

                autoplayRef.current = null;
            }
        };
    }, [instanceRef, isPaused]);



    /* =====================================================
       CAROUSEL
       ===================================================== */

    return (
        <section
            id="team"
            className="section overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-580
                    w-80
                    rounded-full
                    opacity-10
                    blur-[150px]
                "
                style={{
                    background:
                        "var(--chart-2)",
                }}
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[180px]
                    top-[-150px]
                    z-0
                    h-[520px]
                    w-[80vw]
                    max-w-[1220px]
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_16%,transparent)_0%,color-mix(in_srgb,var(--chart-3)_7%,transparent)_35%,transparent_70%)]
                    blur-[85px]
                "
            />

            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* LEFT CONTENT */}

                    <div className="mb-8 flex-start">
                        <PageHeading
                            label="Our Team"
                            fontSize="clamp(1.7rem,3vw,2.11rem)"
                            letterSpacing="0.2px"
                            title="Meet the people"
                            highlightedText="behind the work."
                            description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
                        />

                        <Link
                            href="/team"
                            className="
                                custom-btn-outline
                                mt-4
                                group
                                shrink-0
                                self-start
                                sm:self-auto"
                            data-aos="zoom-in-up" >
                            View all

                            <ArrowUpRight
                                className="
                                    size-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                "
                            />
                        </Link>
                    </div>

                    {/* RIGHT CAROUSEL */}

                    <div
                        className="team-carousel-wrapper"
                        onMouseEnter={() =>
                            setIsPaused(true)
                        }
                        onMouseLeave={() =>
                            setIsPaused(false)
                        }
                        onTouchStart={() =>
                            setIsPaused(true)
                        }
                        onTouchEnd={() =>
                            setIsPaused(false)
                        }
                    >
                        <div className="team-carousel-scene">
                            {teamMembers === undefined ? (
                                <div className="team-carousel">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div
                                            key={`team-skeleton-${index}`}
                                            className="team-carousel__cell"
                                        >
                                            <TeamCardSkeleton />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    ref={sliderRef}
                                    className="team-carousel"
                                >
                                    {carouselMembers.map((member) => (
                                        <div
                                            key={member.carouselKey}
                                            className="team-carousel__cell"
                                        >
                                            <TeamCard
                                                id={member._id}
                                                name={member.name}
                                                role={member.role}
                                                description={member.description}
                                                imageUrl={member.imageUrl}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* CONTROLS */}

                        {teamMembers && carouselMembers.length > 1 && (
                            <div className="mt-16 flex w-full items-center justify-center">
                                <div className="flex items-center gap-1">
                                    {carouselMembers.map((_, index) => {
                                        const active = index === currentSlide;

                                        return (
                                            <button
                                                key={`team-slide-${index}`}
                                                type="button"
                                                aria-label={`Go to team member ${index + 1}`}
                                                onClick={() =>
                                                    instanceRef.current?.moveToIdx(index)
                                                }
                                                className="
                            group
                            relative
                            flex
                            size-8
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-500
                            active:scale-90
                        "
                                            >
                                                {/* Number */}
                                                <span
                                                    className={`
                                relative
                                z-10
                                text-[9px]
                                font-semibold
                                tabular-nums
                                tracking-[0.08em]
                                transition-all
                                duration-300
                                ${active
                                                            ? "text-white"
                                                            : "text-white/25 group-hover:text-white/70"
                                                        }
                            `}
                                                >
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                {/* Active circular glow */}
                                                <span
                                                    className={`
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                transition-all
                                duration-500
                                ${active
                                                            ? "size-8 opacity-100"
                                                            : "size-2 opacity-0 group-hover:size-7 group-hover:opacity-100"
                                                        }
                            `}
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle, color-mix(in srgb, var(--chart-2) 16%, transparent), transparent 70%)",
                                                    }}
                                                />

                                                {/* Circular border */}
                                                <span
                                                    className={`
                                pointer-events-none
                                absolute
                                inset-0
                                rounded-full
                                border
                                transition-all
                                duration-500
                                ${active
                                                            ? "scale-100 opacity-100"
                                                            : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-50"
                                                        }
                            `}
                                                    style={{
                                                        borderColor:
                                                            "color-mix(in srgb, var(--chart-2) 35%, transparent)",
                                                        boxShadow: active
                                                            ? "0 0 14px color-mix(in srgb, var(--chart-2) 18%, transparent)"
                                                            : "none",
                                                    }}
                                                />

                                                {/* Tiny active point */}
                                                <span
                                                    className={`
                                    absolute
                                    bottom-[-2px]
                                    left-1/2
                                    h-px
                                    -translate-x-1/2
                                    rounded-full
                                    transition-all
                                    duration-500
                                    ${active
                                                            ? "w-3 opacity-100"
                                                            : "w-0 opacity-0"
                                                        }
                                `}
                                                    style={{
                                                        background:
                                                            "linear-gradient(90deg, var(--chart-2), var(--chart-3))",
                                                        boxShadow:
                                                            "0 0 8px color-mix(in srgb, var(--chart-2) 65%, transparent)",
                                                    }}
                                                />


                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;