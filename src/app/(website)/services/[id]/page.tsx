"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    Layers3,
    Sparkles,
    Users,
    type LucideIcon,
    Code2,
    Bot,
    ShoppingCart,
    Smartphone,
    Database,
    Palette,
    Globe,
    Wrench,
} from "lucide-react";

import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

import PageHero from "@/components/shared/PageHero";
import OrbitDecorations from "@/components/shared/OrbitDecorations";
import ProjectCard from "@/components/projects/ProjectCard";

import ProjectGridSkeleton from "@/components/skeleton/ProjectGridSkeleton";

import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import ServiceDetailPageSkeleton from "@/components/skeleton/ServiceDetailPageSkeleton";
import PageHeading from "@/components/shared/PageHeading";

/* ============================================================
   SERVICE ICONS
============================================================ */

const iconMap: Record<string, LucideIcon> = {
    Code2,
    Bot,
    ShoppingCart,
    Smartphone,
    Database,
    Palette,
    Globe,
    Wrench,
};

function getServiceIcon(icon?: string): LucideIcon {
    return icon ? iconMap[icon] ?? Code2 : Code2;
}

/* ============================================================
   PROJECT TYPES
============================================================ */

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

/* ============================================================
   RELATED PROJECT TYPE
============================================================ */

function getRelatedProjectType(title: string): ProjectType | null {
    const normalized = title
        .trim()
        .toLowerCase()
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ");

    if (
        /\b(generative ai|gen ai|artificial intelligence|ai development|ai solutions)\b/.test(
            normalized,
        )
    ) {
        return "GEN_AI";
    }

    if (
        /\b(e commerce|ecommerce|online store|online shopping)\b/.test(
            normalized,
        )
    ) {
        return "E_COMMERCE";
    }

    if (/\b(saas|software as a service)\b/.test(normalized)) {
        return "SAAS";
    }

    if (
        /\b(mobile|android|ios)\b/.test(normalized) &&
        /\b(app|application|development|developer)\b/.test(normalized)
    ) {
        return "MOBILE_APP";
    }

    if (
        /\b(full stack|fullstack|backend|back end|api development)\b/.test(
            normalized,
        )
    ) {
        return "FULL_STACK";
    }

    if (
        /\b(web|website|frontend|front end|ui|ux|web design|maintenance)\b/.test(
            normalized,
        )
    ) {
        return "WEB_DEVELOPMENT";
    }

    return null;
}

/* ============================================================
   EMPTY PROJECT STATE
============================================================ */

function EmptyProjects({
    title,
    ServiceIcon,
}: {
    title: string;
    ServiceIcon: LucideIcon;
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 px-5 py-12 text-center sm:px-8 sm:py-16">
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    size-48
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-chart-2/[0.07]
                    blur-3xl
                "
            />

            <div className="relative mx-auto flex max-w-lg flex-col items-center">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-chart-2/20 bg-chart-2/[0.08] text-chart-2">
                    <ServiceIcon className="size-6" />
                </div>

                <span className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-chart-2">
                    More work coming soon
                </span>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    No related projects yet
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    I&apos;m continuing to build and showcase projects related
                    to{" "}
                    <span className="font-medium text-foreground">
                        {title}
                    </span>
                    .
                </p>

                <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/projects"
                        className="custom-btn inline-flex justify-center"
                    >
                        Explore projects
                        <ArrowUpRight className="size-4" />
                    </Link>

                    <Link
                        href="/contact"
                        className="custom-btn-outline inline-flex justify-center"
                    >
                        Discuss a project
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   SERVICE DETAIL PAGE
============================================================ */

export default function ServiceDetailPage() {
    const params = useParams<{ id: string }>();

    const serviceId = params?.id;

    /*
     * IMPORTANT:
     * Convex expects Id<"services"> here.
     */
    const service = useQuery(
        api.services.getById,
        serviceId
            ? {
                id: serviceId as Id<"services">,
            }
            : "skip",
    );

    /*
     * Keep this before conditional returns.
     */
    const relatedProjectType = service
        ? getRelatedProjectType(service.title)
        : null;

    const relatedProjects = useQuery(
        api.projects.getByType,
        relatedProjectType
            ? {
                type: relatedProjectType,
            }
            : "skip",
    );

    /* ========================================================
       LOADING
    ======================================================== */

    if (service === undefined) {
        return (
            <main>
                <PageHero
                    breadcrumb="Services / Loading"
                    label="Service"
                    title="Loading"
                    highlightedText="service..."
                    description="Loading the service details."
                />

                <ServiceDetailPageSkeleton />
            </main>
        );
    }

    /* ========================================================
       NOT FOUND
    ======================================================== */

    if (!service) {
        return (
            <main>
                <PageHero
                    breadcrumb="Services"
                    label="Service"
                    title="Service"
                    highlightedText="not found."
                    description="The service you're looking for does not exist or is no longer available."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <Sparkles className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Service not found
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This service may have been removed or the URL
                                may be incorrect.
                            </p>

                            <Link
                                href="/services"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    /* ========================================================
       INACTIVE
    ======================================================== */

    if (!service.isActive) {
        return (
            <main>
                <PageHero
                    breadcrumb="Services"
                    label="Service"
                    title="Service"
                    highlightedText="unavailable."
                    description="This service is currently unavailable."
                />

                <section className="section relative isolate overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card/70">
                                <Users className="size-7 text-primary/70" />
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Service unavailable
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                                This service is currently not available for
                                public viewing.
                            </p>

                            <Link
                                href="/services"
                                className="custom-btn mt-7 inline-flex"
                            >
                                <ArrowLeft className="size-4" />
                                Back to services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    const ServiceIcon = getServiceIcon(service.icon);

    return (
        <main>
            {/* =====================================================
                PAGE HERO
            ===================================================== */}

            <PageHero
                breadcrumb={`Services / ${service.title}`}
                label="Service details"
                title="Solutions built for"
                highlightedText={service.title}
                description={service.description}
                maxWidth="max-w-5xl"
            />

            {/* =====================================================
                SERVICE DETAILS
            ===================================================== */}

            <section className="section relative isolate overflow-hidden">
                <OrbitDecorations />

                <div className="container relative z-10">
                    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
                        {/* Main service information */}

                        <article
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-border/70
                                bg-card/80
                                shadow-[0_25px_80px_rgba(0,0,0,0.25)]
                                backdrop-blur-xl
                            "
                            data-aos="zoom-in"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-chart-2/10 blur-3xl"
                            />

                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-32 -left-32 size-72 rounded-full bg-chart-3/[0.05] blur-3xl"
                            />

                            <ShineBorder
                                shineColor={["#6d65fe"]}
                                borderWidth={1}
                                duration={8}
                            />

                            <Card className="relative z-10 border-0 bg-transparent py-0 shadow-none">
                                <CardContent className="p-6 sm:p-8 lg:p-10">
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-chart-2/30 bg-chart-2/10 text-chart-2 shadow-[0_0_35px_rgba(109,101,254,0.12)]">
                                            <ServiceIcon className="size-8" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-chart-2">
                                                What I offer
                                            </p>

                                            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                                {service.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="my-8 h-px bg-gradient-to-r from-border via-border/70 to-transparent" />

                                    <div>
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            Building digital experiences that
                                            deliver.
                                        </h3>

                                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                                            {service.description}
                                        </p>
                                    </div>

                                    {service.listItems.length > 0 && (
                                        <div className="mt-9">
                                            <div className="mb-5 flex items-center gap-3">
                                                <span className="h-px flex-1 bg-border/60" />

                                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                    Included
                                                </span>

                                                <span className="h-px flex-1 bg-border/60" />
                                            </div>

                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {service.listItems.map(
                                                    (item, index) => (
                                                        <div
                                                            key={`${item}-${index}`}
                                                            className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-4 transition-all duration-300 hover:border-chart-2/30 hover:bg-chart-2/[0.04]"
                                                        >
                                                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-chart-2/25 bg-chart-2/10 text-chart-2">
                                                                <Check className="size-3.5 stroke-[2.5]" />
                                                            </span>

                                                            <span className="pt-0.5 text-sm leading-6 text-muted-foreground">
                                                                {item}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </article>

                        {/* CTA */}

                        <aside
                            className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8"
                            data-aos="zoom-in"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-chart-2/[0.10] to-transparent"
                            />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex size-12 items-center justify-center rounded-xl border border-chart-2/25 bg-chart-2/10 text-chart-2">
                                    <Sparkles className="size-5" />
                                </div>

                                <div className="mt-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-chart-2">
                                        Let&apos;s work together
                                    </p>

                                    <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                                        Have a project in mind?
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                        Tell me what you&apos;re building and
                                        let&apos;s turn your idea into a
                                        polished digital experience.
                                    </p>
                                </div>

                                <div className="mt-auto pt-8">
                                    <Link
                                        href="/contact"
                                        className="custom-btn group inline-flex w-full justify-between"
                                    >
                                        Start a project

                                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>

                                    <Link
                                        href="/services"
                                        className="custom-btn-outline group mt-3 inline-flex w-full justify-center"
                                    >
                                        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                        All services
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* =================================================
                        RELATED PROJECTS
                    ================================================= */}

                    <div className="mt-16 sm:mt-20">
                        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <PageHeading
                                label="Selected work"
                                title="Projects for"
                                highlightedText={service.title}
                                description="Take a look at real projects that showcase the approach, capabilities, and results behind this service."
                                fontSize="clamp(1.7rem,3vw,2.11rem)"
                                className="max-w-none"
                                letterSpacing="0.2px"
                                lineHeight="1.4"
                            />

                            <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-border/70 bg-card/70 px-3 py-2.5">
                                <div className="flex size-9 items-center justify-center rounded-lg border border-chart-2/25 bg-chart-2/10 text-chart-2">
                                    <ServiceIcon className="size-4" />
                                </div>

                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                                        Service
                                    </p>

                                    <p className="text-sm font-semibold">
                                        {service.title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {relatedProjectType && (
                            <div className="mb-6 flex flex-col gap-3 border-y border-border/50 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                                        <Layers3 className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {
                                                PROJECT_TYPE_LABELS[
                                                relatedProjectType
                                                ]
                                            }
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Projects in this category
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href={`/projects/${PROJECT_TYPE_ROUTES[relatedProjectType]}`}
                                    className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                                >
                                    View all
                                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        )}

                        {!relatedProjectType ? (
                            <EmptyProjects
                                title={service.title}
                                ServiceIcon={ServiceIcon}
                            />
                        ) : relatedProjects === undefined ? (
                            <ProjectGridSkeleton />
                        ) : relatedProjects.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {relatedProjects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="min-w-0"
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyProjects
                                title={service.title}
                                ServiceIcon={ServiceIcon}
                            />
                        )}
                    </div>

                    {/* =================================================
                        ABOUT / DESCRIPTION
                    ================================================= */}

                    <div className="mt-12 max-w-4xl">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="section-label">
                                About this service
                            </span>

                            <span className="h-px flex-1 bg-border/60" />
                        </div>

                        <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                            {service.description}
                        </p>
                    </div>

                    {/* =================================================
                        BOTTOM NAVIGATION
                    ================================================= */}

                    <div className="mt-12 border-t border-border/60 pt-6">
                        <Link
                            href="/services"
                            className="custom-btn-outline inline-flex"
                        >
                            <ArrowLeft className="size-4" />
                            Back to services
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}