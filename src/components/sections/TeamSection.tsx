"use client";



import { api } from "../../../convex/_generated/api";
import PageHeading from "../shared/PageHeading";
import TeamCard from "../team/TeamCard";
import TeamCardSkeleton from "../skeleton/TeamGridSkeleton";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, UsersRound } from "lucide-react";
import { useKeenSlider, type KeenSliderPlugin } from "keen-slider/react";
import { useQuery } from "convex/react";



import "keen-slider/keen-slider.min.css";

/* =========================================================
   CONFIG
   ========================================================= */

const CAROUSEL_RADIUS = 300;
const AUTOPLAY_DELAY = 3000;

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
   CREATE VISUAL SLIDES
   ========================================================= */

function createCarouselMembers(
    members: TeamMember[],
): CarouselMember[] {
    // Safety guard
    if (!Array.isArray(members) || members.length === 0) {
        return [];
    }

    // 4+ real members — don't duplicate anything.
    if (members.length >= 4) {
        return members.map((member) => ({
            ...member,
            carouselKey: member._id,
        }));
    }

    // 1 real member — handled as a static card anyway.
    if (members.length === 1) {
        return [
            {
                ...members[0],
                carouselKey: `${members[0]._id}-0`,
            },
        ];
    }

    /*
     * For 2–3 members we create visual instances
     * so the 3D cylinder has enough positions.
     *
     * 2 members -> A B A B
     * 3 members -> A B C A B C
     */

    const minimumSlides = 4;
    const repeatCount = Math.max(
        1,
        Math.ceil(minimumSlides / members.length),
    );

    const result: CarouselMember[] = [];

    for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex++) {
        for (const member of members) {
            result.push({
                ...member,
                carouselKey: `${member._id}-${repeatIndex}`,
            });
        }
    }

    return result;
}

/* =========================================================
   INDIVIDUAL SLIDE 3D PLUGIN
   ========================================================= */

function createIndividualSlidePlugin(
    radius: number,
): KeenSliderPlugin {
    return (slider) => {
        const updateSlides = () => {
            const details = slider.track.details;

            if (!details) return;

            const slideCount = slider.slides.length;
            const angleStep = 360 / slideCount;

            slider.slides.forEach((slide, index) => {
                const slideDetails = details.slides[index];

                if (!slideDetails) return;

                /*
                 * The active slide has distance = 0.
                 *
                 * Therefore it is always positioned at:
                 *
                 * rotateY(0deg) translateZ(radius)
                 *
                 * The carousel container itself NEVER rotates.
                 */

                const angle =
                    slideDetails.distance * angleStep;

                slide.style.transform = `
                    rotateY(${angle}deg)
                    translateZ(${radius}px)
                `;
            });
        };

        slider.on("created", updateSlides);
        slider.on("detailsChanged", updateSlides);
        slider.on("updated", updateSlides);
    };
}

/* =========================================================
   COMPONENT
   ========================================================= */

const TeamSection = () => {
    const teamMembers = useQuery(
        api.teamMembers.listActive,
    );

    const [isPaused, setIsPaused] = useState(false);

    const autoplayRef = useRef<
        ReturnType<typeof setInterval> | null
    >(null);

    /* =====================================================
       CAROUSEL DATA
       ===================================================== */

    const carouselMembers = useMemo(
        () =>
            createCarouselMembers(
                (teamMembers ?? []) as TeamMember[],
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

                selector: ".team-carousel__cell",

                slides: {
                    perView: 1,
                    spacing: 0,
                },

                drag: true,

                created(slider) {
                    slider.update();
                },
            },

            [
                createIndividualSlidePlugin(
                    CAROUSEL_RADIUS,
                ),
            ],
        );

    /* =====================================================
       AUTOPLAY
       ===================================================== */

    useEffect(() => {
        if (!instanceRef.current) return;

        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }

        if (isPaused) return;

        autoplayRef.current = setInterval(() => {
            instanceRef.current?.next();
        }, AUTOPLAY_DELAY);

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);

                autoplayRef.current = null;
            }
        };
    }, [instanceRef, isPaused]);

    /* =====================================================
       LOADING
       ===================================================== */

    if (teamMembers === undefined) {
        return (
            <section className="section">
                <div className="container">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                        {/* LEFT */}

                        <div>
                            <PageHeading
                                label="Our Team"
                                title="Meet the people"
                                highlightedText="behind the work."
                                description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
                            />
                        </div>

                        {/* RIGHT */}

                        <div className="team-carousel-wrapper">
                            <div className="team-carousel-scene">
                                <TeamCardSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    /* =====================================================
       EMPTY
       ===================================================== */

    if (teamMembers.length === 0) {
        return (
            <section className="section">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                                <UsersRound className="size-6 text-primary" />
                            </div>
                        </div>

                        <PageHeading
                            label="Our Team"
                            title="Meet the people"
                            highlightedText="behind the work."
                            description="Our team information will be available soon."
                        />
                    </div>
                </div>
            </section>
        );
    }

    /* =====================================================
       SINGLE MEMBER
       ===================================================== */

    if (teamMembers.length === 1) {
        const member = teamMembers[0] as TeamMember;

        return (
            <section className="section">
                <div className="container">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                        {/* LEFT */}

                        <div>
                            <PageHeading
                                label="Our Team"
                                title="Meet the people"
                                highlightedText="behind the work."
                                description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
                            />
                        </div>

                        {/* RIGHT */}

                        <div className="mx-auto w-full max-w-sm">
                            <TeamCard
                                name={member.name}
                                role={member.role}
                                description={
                                    member.description
                                }
                                imageUrl={member.imageUrl}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    /* =====================================================
       CAROUSEL
       ===================================================== */

    return (
        <section id="team" className="section overflow-hidden">
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
                    background: "var(--chart-2)",
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
                    {/* =================================================
                       LEFT CONTENT
                    ================================================= */}

                    <div className="mb-8 flex-start">
                        <PageHeading
                            label="Our Team"
                            title="Meet the people"
                            highlightedText="behind the work."
                            description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
                        />
                    </div>

                    {/* =================================================
                       RIGHT CAROUSEL
                    ================================================= */}

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
                            <div
                                ref={sliderRef}
                                className="team-carousel"
                            >
                                {carouselMembers.map(
                                    (member) => (
                                        <div
                                            key={
                                                member.carouselKey
                                            }
                                            className="team-carousel__cell"
                                        >
                                            <TeamCard
                                                id={member._id}
                                                name={
                                                    member.name
                                                }
                                                role={
                                                    member.role
                                                }
                                                description={
                                                    member.description
                                                }
                                                imageUrl={
                                                    member.imageUrl
                                                }
                                            />
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* =================================================
                           CONTROLS
                        ================================================= */}
                        <div className="team-carousel-controls">
                            <button
                                type="button"
                                aria-label="Previous team member"
                                className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                onClick={() => instanceRef.current?.prev()}
                            >
                                <ArrowLeft
                                    className="size-5 shrink-0"
                                    strokeWidth={2}
                                />
                            </button>

                            <button
                                type="button"
                                aria-label="Next team member"
                                className="flex size-11 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-background"
                                onClick={() => instanceRef.current?.next()}
                            >
                                <ArrowRight
                                    className="size-5 shrink-0"
                                    strokeWidth={2}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;