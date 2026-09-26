


// "use client";

// import { api } from "../../../convex/_generated/api";
// import PageHeading from "../shared/PageHeading";
// import TeamCard from "../team/TeamCard";
// import TeamCardSkeleton from "../skeleton/TeamCardSkeleton";

// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//     ArrowLeft,
//     ArrowRight,
//     ArrowUpRight,
//     UsersRound,
// } from "lucide-react";
// import {
//     useKeenSlider,
//     type KeenSliderPlugin,
// } from "keen-slider/react";
// import { useQuery } from "convex/react";

// import "keen-slider/keen-slider.min.css";
// import Link from "next/link";

// /* =========================================================
//    CONFIG
//    ========================================================= */

// const CAROUSEL_RADIUS = 300;
// const AUTOPLAY_DELAY = 3000;

// /*
//  * Keep the 6-member carousel geometry for every
//  * number of team members.
//  *
//  * 360 / 6 = 60 degrees.
//  */
// const CAROUSEL_ANGLE_STEP = 60;

// /* =========================================================
//    TYPES
//    ========================================================= */

// type TeamMember = {
//     _id: string;
//     name: string;
//     role: string;
//     description: string;
//     imageUrl: string | null;
// };

// type CarouselMember = TeamMember & {
//     carouselKey: string;
// };

// /* =========================================================
//    CREATE VISUAL SLIDES
//    ========================================================= */

// const TOTAL_CAROUSEL_SLOTS = 6;

// function createCarouselMembers(
//     members: TeamMember[],
// ): (CarouselMember | null)[] {
//     if (!Array.isArray(members) || members.length === 0) {
//         return [];
//     }

//     return Array.from({ length: TOTAL_CAROUSEL_SLOTS }, (_, index) => {
//         const member = members[index];

//         if (!member) {
//             return null;
//         }

//         return {
//             ...member,
//             carouselKey: `${member._id}-${index}`,
//         };
//     });
// }

// /* =========================================================
//    INDIVIDUAL SLIDE 3D PLUGIN
//    ========================================================= */

// function createIndividualSlidePlugin(
//     radius: number,
// ): KeenSliderPlugin {
//     return (slider) => {
//         const updateSlides = () => {
//             const details = slider.track.details;

//             if (!details) return;

//             slider.slides.forEach((slide, index) => {
//                 const slideDetails = details.slides[index];

//                 if (!slideDetails) return;

//                 let distance = slideDetails.distance;

//                 // Keep every slide inside the six-position carousel.
//                 while (distance > 3) {
//                     distance -= 6;
//                 }

//                 while (distance < -3) {
//                     distance += 6;
//                 }

//                 const angle = distance * CAROUSEL_ANGLE_STEP;

//                 slide.style.transform =
//                     `rotateY(${angle}deg) translateZ(${radius}px)`;

//                 const depth = Math.cos(
//                     (angle * Math.PI) / 180,
//                 );

//                 slide.style.zIndex = String(
//                     Math.round((depth + 1) * 100),
//                 );
//             });
//         };

//         slider.on("created", updateSlides);
//         slider.on("detailsChanged", updateSlides);
//         slider.on("updated", updateSlides);
//     };
// }

// /* =========================================================
//    COMPONENT
//    ========================================================= */

// const TeamSection = () => {
//     const teamMembers = useQuery(
//         api.teamMembers.listActive,
//     );

//     const [isPaused, setIsPaused] =
//         useState(false);

//     const autoplayRef = useRef<
//         ReturnType<typeof setInterval> | null
//     >(null);

//     /* =====================================================
//        CAROUSEL DATA
//        ===================================================== */

//     const carouselMembers = useMemo(
//         () =>
//             createCarouselMembers(
//                 (teamMembers ??
//                     []) as TeamMember[],
//             ),
//         [teamMembers],
//     );

//     /* =====================================================
//        KEEN SLIDER
//        ===================================================== */

//     const [sliderRef, instanceRef] =
//         useKeenSlider<HTMLDivElement>(
//             {
//                 loop: true,

//                 /*
//                  * Keep your original behavior.
//                  *
//                  * Do NOT change this to snap because your
//                  * current free-snap dragging behavior is already
//                  * working correctly.
//                  */
//                 mode: "free-snap",

//                 renderMode: "custom",

//                 selector:
//                     ".team-carousel__cell",

//                 slides: {
//                     perView: 1,
//                     spacing: 0,
//                 },

//                 drag: true,

//                 created(slider) {
//                     slider.update();
//                 },
//             },

//             [
//                 createIndividualSlidePlugin(
//                     CAROUSEL_RADIUS,
//                 ),
//             ],
//         );

//     /* =====================================================
//        AUTOPLAY
//        ===================================================== */

//     useEffect(() => {
//         if (!instanceRef.current) return;

//         if (autoplayRef.current) {
//             clearInterval(
//                 autoplayRef.current,
//             );
//         }

//         if (isPaused) return;

//         autoplayRef.current =
//             setInterval(() => {
//                 instanceRef.current?.next();
//             }, AUTOPLAY_DELAY);

//         return () => {
//             if (autoplayRef.current) {
//                 clearInterval(
//                     autoplayRef.current,
//                 );

//                 autoplayRef.current = null;
//             }
//         };
//     }, [instanceRef, isPaused]);

//     /* =====================================================
//        LOADING
//        ===================================================== */

//     if (teamMembers === undefined) {
//         return (
//             <section className="section">
//                 <div className="container">
//                     <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
//                         {/* LEFT */}

//                         <div>
//                             <PageHeading
//                                 label="Our Team"
//                                 title="Meet the people"
//                                 highlightedText="behind the work."
//                                 description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
//                             />
//                         </div>

//                         {/* RIGHT */}

//                         <div className="team-carousel-wrapper">
//                             <div className="team-carousel-scene">
//                                 <TeamCardSkeleton />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     /* =====================================================
//        EMPTY
//        ===================================================== */

//     if (teamMembers.length === 0) {
//         return (
//             <section className="section">
//                 <div className="container">
//                     <div className="mx-auto max-w-2xl text-center">
//                         <div className="mb-4 flex justify-center">
//                             <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
//                                 <UsersRound className="size-6 text-primary" />
//                             </div>
//                         </div>

//                         <PageHeading
//                             label="Our Team"
//                             title="Meet the people"
//                             highlightedText="behind the work."
//                             description="Our team information will be available soon."
//                         />
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     /* =====================================================
//        SINGLE MEMBER
//        ===================================================== */

//     if (teamMembers.length === 1) {
//         const member =
//             teamMembers[0] as TeamMember;

//         return (
//             <section className="section">
//                 <div className="container">
//                     <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
//                         {/* LEFT */}

//                         <div>
//                             <PageHeading
//                                 label="Our Team"
//                                 title="Meet the people"
//                                 highlightedText="behind the work."
//                                 description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
//                             />
//                         </div>

//                         {/* RIGHT */}

//                         <div className="mx-auto w-full max-w-sm">
//                             <TeamCard
//                                 id={member._id}
//                                 name={
//                                     member.name
//                                 }
//                                 role={
//                                     member.role
//                                 }
//                                 description={
//                                     member.description
//                                 }
//                                 imageUrl={
//                                     member.imageUrl
//                                 }
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     /* =====================================================
//        CAROUSEL
//        ===================================================== */

//     return (
//         <section
//             id="team"
//             className="section overflow-hidden"
//         >
//             <div
//                 aria-hidden="true"
//                 className="
//                     pointer-events-none
//                     absolute
//                     -left-40
//                     bottom-0
//                     h-580
//                     w-80
//                     rounded-full
//                     opacity-10
//                     blur-[150px]
//                 "
//                 style={{
//                     background:
//                         "var(--chart-2)",
//                 }}
//             />

//             <div
//                 aria-hidden="true"
//                 className="
//                     pointer-events-none
//                     absolute
//                     right-[180px]
//                     top-[-150px]
//                     z-0
//                     h-[520px]
//                     w-[80vw]
//                     max-w-[1220px]
//                     rounded-full
//                     bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_16%,transparent)_0%,color-mix(in_srgb,var(--chart-3)_7%,transparent)_35%,transparent_70%)]
//                     blur-[85px]
//                 "
//             />

//             <div className="container">
//                 <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
//                     {/* =================================================
//                        LEFT CONTENT
//                     ================================================= */}

//                     <div className="mb-8 flex-start">
//                         <PageHeading
//                             label="Our Team"
//                             title="Meet the people"
//                             highlightedText="behind the work."
//                             description="A dedicated team focused on building thoughtful digital experiences, scalable applications, and solutions that create real value."
//                         />

//                         <Link
//                             href="/team"
//                             className="
//                                 custom-btn-outline
//                                 mt-4
//                                 group
//                                 shrink-0
//                                 self-start
//                                 sm:self-auto
//                             "
//                         >
//                             View all

//                             <ArrowUpRight
//                                 className="
//                                     size-4
//                                     transition-transform
//                                     duration-300
//                                     group-hover:translate-x-0.5
//                                     group-hover:-translate-y-0.5
//                                 "
//                             />
//                         </Link>
//                     </div>

//                     {/* =================================================
//                        RIGHT CAROUSEL
//                     ================================================= */}

//                     <div
//                         className="team-carousel-wrapper"
//                         onMouseEnter={() =>
//                             setIsPaused(true)
//                         }
//                         onMouseLeave={() =>
//                             setIsPaused(false)
//                         }
//                         onTouchStart={() =>
//                             setIsPaused(true)
//                         }
//                         onTouchEnd={() =>
//                             setIsPaused(false)
//                         }
//                     >
//                         <div className="team-carousel-scene">
//                             <div
//                                 ref={sliderRef}
//                                 className="team-carousel"
//                             >
//                                 {carouselMembers.map((member, index) => (
//                                     <div
//                                         key={member?.carouselKey ?? `empty-${index}`}
//                                         className="team-carousel__cell"
//                                     >
//                                         {member ? (
//                                             <TeamCard
//                                                 id={member._id}
//                                                 name={member.name}
//                                                 role={member.role}
//                                                 description={member.description}
//                                                 imageUrl={member.imageUrl}
//                                             />
//                                         ) : (
//                                             <div
//                                                 aria-hidden="true"
//                                                 className="h-full w-full"
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* =================================================
//                            CONTROLS
//                         ================================================= */}

//                         <div className="team-carousel-controls">
//                             <button
//                                 type="button"
//                                 aria-label="Previous team member"
//                                 className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
//                                 onClick={() =>
//                                     instanceRef.current?.prev()
//                                 }
//                             >
//                                 <ArrowLeft
//                                     className="size-5 shrink-0"
//                                     strokeWidth={2}
//                                 />
//                             </button>

//                             <button
//                                 type="button"
//                                 aria-label="Next team member"
//                                 className="flex size-11 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-background"
//                                 onClick={() =>
//                                     instanceRef.current?.next()
//                                 }
//                             >
//                                 <ArrowRight
//                                     className="size-5 shrink-0"
//                                     strokeWidth={2}
//                                 />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TeamSection;



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

                /*
                 * Normalize the distance so every real
                 * member uses the nearest position around
                 * the active member.
                 *
                 * The carousel geometry ALWAYS uses:
                 *
                 * -2 = back-left
                 * -1 = left
                 *  0 = front
                 * +1 = right
                 * +2 = back-right
                 * +3 = absolute-back
                 */
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
        const member =
            teamMembers[0] as TeamMember;

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

                            <Link
                                href="/team"
                                className="
                                custom-btn-outline
                                mt-4
                                group
                                shrink-0
                                self-start
                                sm:self-auto"
                                data-aos="zoom-in"
                            >
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

                        {/* RIGHT */}

                        <div className="mx-auto w-full max-w-sm">
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
                    </div>
                </div>
            </section>
        );
    }

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
                            <div
                                ref={sliderRef}
                                className="team-carousel"
                            >
                                {carouselMembers.map((member, index) => (
                                    <div
                                        key={member?.carouselKey ?? `empty-${index}`}
                                        className="team-carousel__cell"
                                    >
                                        {member ? (
                                            <TeamCard
                                                id={member._id}
                                                name={member.name}
                                                role={member.role}
                                                description={member.description}
                                                imageUrl={member.imageUrl}
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                className="h-full w-full"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CONTROLS */}

                        <div className="team-carousel-controls">
                            <button
                                type="button"
                                aria-label="Previous team member"
                                className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                onClick={() =>
                                    instanceRef.current?.prev()
                                }
                            >
                                <ArrowLeft
                                    className="size-5 shrink-0"
                                    strokeWidth={
                                        2
                                    }
                                />
                            </button>

                            <button
                                type="button"
                                aria-label="Next team member"
                                className="flex size-11 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-background"
                                onClick={() =>
                                    instanceRef.current?.next()
                                }
                            >
                                <ArrowRight
                                    className="size-5 shrink-0"
                                    strokeWidth={
                                        2
                                    }
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