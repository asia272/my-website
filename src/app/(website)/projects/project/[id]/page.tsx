
"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    CheckCircle2,
    ExternalLink,
    FolderOpen,
    Sparkles,
} from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

import PageHero from "@/components/shared/PageHero";
import OrbitDecorations from "@/components/shared/OrbitDecorations";
import { Card, CardContent } from "@/components/ui/card";
import ProjectDetailSkeleton from "@/components/skeleton/ProjectDetailSkeleton";

type ProjectType =
    | "GEN_AI"
    | "WEB_DEVELOPMENT"
    | "MOBILE_APP"
    | "FULL_STACK"
    | "E_COMMERCE"
    | "SAAS"
    | "OTHER";

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
    GEN_AI: "Generative AI",
    WEB_DEVELOPMENT: "Web Development",
    MOBILE_APP: "Mobile App",
    FULL_STACK: "Full Stack",
    E_COMMERCE: "E-Commerce",
    SAAS: "SaaS",
    OTHER: "Other",
};

const PROJECT_TYPE_ROUTES: Record<ProjectType, string> = {
    GEN_AI: "generative-ai",
    WEB_DEVELOPMENT: "web-development",
    MOBILE_APP: "mobile-app",
    FULL_STACK: "full-stack",
    E_COMMERCE: "e-commerce",
    SAAS: "saas",
    OTHER: "other",
};

type ProjectDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    const { id } = use(params);

    const projectId = id as Id<"projects">;

    const project = useQuery(
        api.projects.getById,
        id ? { id: projectId } : "skip",
    );

    /*
     * Loading state
     */
    if (project === undefined) {
        return (
            <main>
                <PageHero
                    breadcrumb="Projects / Loading"
                    label="Project"
                    title="Loading"
                    highlightedText="project..."
                    description="Loading the project details."
                />
                <ProjectDetailSkeleton />
            </main>
        );
    }

    /*
     * Project not found
     */
    if (!project) {
        return (
            <main>
                <PageHero
                    breadcrumb="Projects"
                    label="Project"
                    title="Project"
                    highlightedText="not found."
                    description="The project you're looking for does not exist or is no longer available."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <FolderOpen className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Project not found
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This project may have been removed or the URL
                                may be incorrect.
                            </p>

                            <Link
                                href="/"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to  home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    /*
     * Do not expose inactive projects publicly.
     */
    if (!project.isActive) {
        return (
            <main>
                <PageHero
                    breadcrumb="Projects"
                    label="Project"
                    title="Project"
                    highlightedText="unavailable."
                    description="This project is currently unavailable."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <FolderOpen className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Project unavailable
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This project is currently not available for
                                public viewing.
                            </p>

                            <Link
                                href="/projects"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to projects
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    const projectType = project.type as ProjectType;

    const typeLabel =
        PROJECT_TYPE_LABELS[projectType] ?? project.type;

    const categoryRoute =
        PROJECT_TYPE_ROUTES[projectType] ?? "other";

    return (
        <main>
            <PageHero
                breadcrumb={`Projects / ${typeLabel}`}
                label={typeLabel}
                highlightedText={project.name}
                description={project.description}
                maxWidth="max-w-5xl"
            />

            <section className="section relative isolate overflow-hidden">
                <OrbitDecorations />

                <div className="container relative z-10">
                    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
                        {/* Project image */}
                        <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
                            data-aos="zoom-in"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                                {project.imageUrl ? (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.name}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 65vw"
                                        className="
                                            object-cover
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

                                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                                {project.isFeatured && (
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
                                        Featured
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project information */}
                        <aside className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]" data-aos="zoom-in">
                            <Card className="border-border/70 bg-card/70 py-0 shadow-none backdrop-blur-sm">
                                <CardContent className="p-6 sm:p-7">
                                    <div className="mb-6">
                                        <p className="section-label">
                                            Project details
                                        </p>

                                        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                                            {project.name}
                                        </h3>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Category */}
                                        <div className="border-b border-border/60 pb-5">
                                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                Category
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <span className="size-1.5 rounded-full bg-primary" />

                                                <span className="text-sm font-medium text-foreground">
                                                    {typeLabel}
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

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
                                        <Link
                                            href="/contact"
                                            className="custom-btn inline-flex w-full justify-center"
                                        >
                                            Start a project
                                            <ArrowUpRight className="size-4" />
                                        </Link>

                                        <Link
                                            href={`/projects/${categoryRoute}`}
                                            className="custom-btn-outline inline-flex w-full justify-center"
                                        >
                                            View category
                                            <ExternalLink className="size-4" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>

                    {/* Project overview */}
                    <div className="mt-10 max-w-4xl">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="section-label">
                                Overview
                            </span>

                            <span className="h-px flex-1 bg-border/60" />
                        </div>

                        <p className="text-base leading-8 text-secondary sm:text-lg">
                            {project.description}
                        </p>
                    </div>

                    {/* Bottom navigation */}
                    <div className="mt-12 border-t border-border/60 pt-6">
                        <Link
                            href={`/projects/${categoryRoute}`}
                            className="
                             custom-btn-outline
                            "
                        >
                            <ArrowLeft className="size-4" />
                            Back to {typeLabel}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
