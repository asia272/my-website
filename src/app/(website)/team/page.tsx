"use client";

import { Users } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

import TeamCard from "@/components/team/TeamCard";
import TeamCardSkeleton from "@/components/skeleton/TeamCardSkeleton";
import PageHero from "@/components/shared/PageHero";
import OrbitDecorations from "@/components/shared/OrbitDecorations";

export default function TeamPage() {
    const teamMembers = useQuery(
        api.teamMembers.listActive,
    );

    return (
        <main>
            {/* =====================================================
               HERO
            ===================================================== */}
            <PageHero
                breadcrumb="Team"
                label="Our team"
                title="Meet the people"
                highlightedText="behind the work."
                description="Get to know the creative minds and skilled developers who bring ideas to life through thoughtful design, modern technology, and reliable digital experiences."
                maxWidth="max-w-5xl"
            />

            {/* =====================================================
               TEAM
            ===================================================== */}
            <section className="section relative overflow-hidden">
                <OrbitDecorations />

                <div className="container relative z-10">

                    {/* =================================================
                       LOADING
                    ================================================= */}
                    {teamMembers === undefined && (
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                sm:grid-cols-2
                                sm:gap-6
                                lg:grid-cols-3
                            "
                        >
                            {Array.from({ length: 6 }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        data-aos="fade-up"
                                        data-aos-delay={
                                            index * 100
                                        }
                                        data-aos-duration="700"
                                        data-aos-once="true"
                                    >
                                        <TeamCardSkeleton />
                                    </div>
                                ),
                            )}
                        </div>
                    )}

                    {/* =================================================
                       EMPTY
                    ================================================= */}
                    {teamMembers?.length === 0 && (
                        <div className="mx-auto max-w-xl text-center">
                            <div
                                className="
                                    mx-auto
                                    mb-6
                                    flex
                                    size-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-card/70
                                "
                            >
                                <Users className="size-7 text-primary/70" />
                            </div>

                            <h2
                                className="
                                    text-2xl
                                    font-semibold
                                    tracking-tight
                                    sm:text-3xl
                                "
                            >
                                Our team is growing
                            </h2>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-muted-foreground
                                    sm:text-base
                                "
                            >
                                Team member profiles will appear here
                                once they are published.
                            </p>
                        </div>
                    )}

                    {/* =================================================
                       TEAM GRID
                    ================================================= */}
                    {teamMembers &&
                        teamMembers.length > 0 && (
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    sm:gap-6
                                    lg:grid-cols-3
                                "
                            >
                                {teamMembers.map(
                                    (member, index) => (
                                        <div
                                            key={member._id}
                                            data-aos="fade-up"
                                            data-aos-delay={
                                                index * 100
                                            }
                                            data-aos-duration="700"
                                            data-aos-once="true"
                                        >
                                            <TeamCard
                                                id={member._id}
                                                name={member.name}
                                                role={member.role}
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
                        )}
                </div>
            </section>
        </main>
    );
}