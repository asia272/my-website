"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    CheckCircle2,
    Mail,
    Sparkles,
    UserRound,
    Users,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import PageHero from "@/components/shared/PageHero";
import OrbitDecorations from "@/components/shared/OrbitDecorations";
import { Card, CardContent } from "@/components/ui/card";
import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";

type TeamMemberDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function TeamMemberDetailPage({
    params,
}: TeamMemberDetailPageProps) {
    const { id } = use(params);

    const teamMemberId = id as Id<"teamMembers">;

    const teamMember = useQuery(
        api.teamMembers.getById,
        id ? { id: teamMemberId } : "skip",
    );

    /*
     * Loading state
     */
    if (teamMember === undefined) {
        return (
            <main>
                <PageHero
                    breadcrumb="Team / Loading"
                    label="Team member"
                    title="Loading"
                    highlightedText="profile..."
                    description="Loading the team member profile."
                />

                < DetailPageSkeleton />
            </main>
        );
    }

    /*
     * Team member not found
     */
    if (!teamMember) {
        return (
            <main>
                <PageHero
                    breadcrumb="Team"
                    label="Team member"
                    title="Member"
                    highlightedText="not found."
                    description="The team member you're looking for does not exist or is no longer available."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <UserRound className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Team member not found
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This team member may have been removed or
                                the URL may be incorrect.
                            </p>

                            <Link
                                href="/team"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to team
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    /*
     * Do not expose inactive team members publicly.
     */
    if (!teamMember.isActive) {
        return (
            <main>
                <PageHero
                    breadcrumb="Team"
                    label="Team member"
                    title="Member"
                    highlightedText="unavailable."
                    description="This team member profile is currently unavailable."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <Users className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Profile unavailable
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This team member profile is currently not
                                available for public viewing.
                            </p>

                            <Link
                                href="/team"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to team
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            {/* =====================================================
               PAGE HERO
            ===================================================== */}
            <PageHero
                breadcrumb={`Team / ${teamMember.role}`}
                label={teamMember.role}
                highlightedText={teamMember.name}
                description={teamMember.description}
                maxWidth="max-w-5xl"
            />

            {/* =====================================================
               MEMBER DETAIL
            ===================================================== */}
            <section className="section relative isolate overflow-hidden">
                <OrbitDecorations />

                <div className="container relative z-10">
                    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
                        {/* =================================================
                           MEMBER IMAGE
                        ================================================= */}
                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-border/70
                                bg-card/70
                                shadow-[0_20px_80px_rgba(0,0,0,0.25)]
                            "
                            data-aos="zoom-in"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-secondary sm:aspect-[4/3]">
                                {teamMember.imageUrl ? (
                                    <Image
                                        src={teamMember.imageUrl}
                                        alt={teamMember.name}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 65vw"
                                        className="
                                            object-cover
                                            object-center
                                            transition-transform
                                            duration-700
                                            ease-out
                                            group-hover:scale-[1.02]
                                        "
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Sparkles className="size-10 text-primary/40" />
                                    </div>
                                )}

                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-background/70
                                        via-transparent
                                        to-transparent
                                    "
                                />

                                {/* Role badge */}
                                <div
                                    className="
                                        absolute
                                        left-5
                                        top-5
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-primary/30
                                        bg-background/80
                                        px-3.5
                                        py-2
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.16em]
                                        text-primary
                                        backdrop-blur-md
                                    "
                                >
                                    <Sparkles className="size-3" />
                                    {teamMember.role}
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                           MEMBER INFORMATION
                        ================================================= */}
                        <aside
                            className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]"
                            data-aos="zoom-in"
                        >
                            <Card className="border-border/70 bg-card/70 py-0 shadow-none backdrop-blur-sm">
                                <CardContent className="p-6 sm:p-7">
                                    <div className="mb-6">
                                        <p className="section-label">
                                            Team member
                                        </p>

                                        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                                            {teamMember.name}
                                        </h2>

                                        <p className="mt-2 text-sm font-medium text-primary">
                                            {teamMember.role}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Role */}
                                        <div className="border-b border-border/60 pb-5">
                                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                Role
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <span className="size-1.5 rounded-full bg-primary" />

                                                <span className="text-sm font-medium text-foreground">
                                                    {teamMember.role}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="border-b border-border/60 pb-5">
                                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                Status
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="size-4 text-primary" />

                                                <span className="text-sm font-medium text-foreground">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
                                        <Link
                                            href="/contact"
                                            className="custom-btn inline-flex w-full justify-center"
                                        >
                                            Work with us
                                            <ArrowUpRight className="size-4 ml-2" />
                                        </Link>

                                        <Link
                                            href="/team"
                                            className="custom-btn-outline inline-flex w-full justify-center"
                                        >
                                            <Users className="size-4 mr-2" />
                                            View all members
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>

                    {/* =====================================================
                       ABOUT MEMBER
                    ===================================================== */}
                    <div className="mt-10 max-w-4xl">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="section-label">
                                About {teamMember.name}
                            </span>

                            <span className="h-px flex-1 bg-border/60" />
                        </div>

                        <p className="text-base leading-8 text-secondary sm:text-lg">
                            {teamMember.description}
                        </p>
                    </div>

                    {/* =====================================================
                       BOTTOM NAVIGATION
                    ===================================================== */}
                    <div className="mt-12 border-t border-border/60 pt-6">
                        <Link
                            href="/team"
                            className="custom-btn-outline inline-flex"
                        >
                            <ArrowLeft className="size-4" />
                            Back to team
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}