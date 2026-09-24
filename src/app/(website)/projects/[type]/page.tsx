"use client";

import { use } from "react";
import { FolderOpen } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

import ProjectCard from "@/components/projects/ProjectCard";
import PageHero from "@/components/shared/PageHero";


import OrbitDecorations from "@/components/shared/OrbitDecorations";
import ProjectGridSkeleton from "@/components/skeleton/ProjectGridSkeleton";
import EmptyProjects from "@/components/projects/EmtyProjects";

type ProjectType =
    | "GEN_AI"
    | "WEB_DEVELOPMENT"
    | "MOBILE_APP"
    | "FULL_STACK"
    | "E_COMMERCE"
    | "SAAS"
    | "OTHER";

type ProjectTypeConfig = {
    type: ProjectType;
    label: string;
    title: string;
    highlightedText: string;
    description: string;
};

const PROJECT_TYPES: Record<
    string,
    ProjectTypeConfig
> = {
    "generative-ai": {
        type: "GEN_AI",
        label: "Generative AI",
        title: "AI-powered",
        highlightedText: "projects.",
        description:
            "Explore intelligent applications and AI-powered experiences built with modern technologies, thoughtful interfaces, and practical real-world use cases.",
    },

    "web-development": {
        type: "WEB_DEVELOPMENT",
        label: "Web Development",
        title: "Modern web",
        highlightedText: "projects.",
        description:
            "Explore responsive and high-quality web experiences built with modern frontend technologies, clean architecture, and performance in mind.",
    },

    "mobile-app": {
        type: "MOBILE_APP",
        label: "Mobile Apps",
        title: "Mobile",
        highlightedText: "projects.",
        description:
            "Explore mobile application projects focused on intuitive experiences, reliable functionality, and modern application development.",
    },

    "full-stack": {
        type: "FULL_STACK",
        label: "Full Stack",
        title: "Full-stack",
        highlightedText: "projects.",
        description:
            "Explore complete digital products combining polished interfaces, robust backend systems, databases, authentication, APIs, and production-ready architecture.",
    },

    "e-commerce": {
        type: "E_COMMERCE",
        label: "E-Commerce",
        title: "E-commerce",
        highlightedText: "projects.",
        description:
            "Explore e-commerce experiences built around product discovery, smooth user journeys, secure functionality, and scalable full-stack architecture.",
    },

    saas: {
        type: "SAAS",
        label: "SaaS",
        title: "SaaS",
        highlightedText: "projects.",
        description:
            "Explore software-as-a-service products designed with scalable architecture, intuitive experiences, and practical business workflows.",
    },

    other: {
        type: "OTHER",
        label: "Other Projects",
        title: "Other",
        highlightedText: "projects.",
        description:
            "Explore additional projects covering different ideas, technologies, experiments, and digital experiences.",
    },
};

type ProjectTypePageProps = {
    params: Promise<{
        type: string;
    }>;
};

export default function ProjectTypePage({
    params,
}: ProjectTypePageProps) {
    const { type: slug } = use(params);

    const projectType = PROJECT_TYPES[slug];

    const projects = useQuery(
        api.projects.getByType,
        projectType
            ? {
                type: projectType.type,
            }
            : "skip",
    );

    /*
     * Invalid project category
     */
    if (!projectType) {
        return (
            <main>
                <PageHero
                    breadcrumb="Projects"
                    label="Projects"
                    title="Project category"
                    highlightedText="not found."
                    description="The project category you're looking for does not exist."
                />

                <section className="section">
                    <div className="container">
                        <EmptyProjects
                            title="Category not found"
                            description="Please choose a valid project category."
                        />
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            {/* Hero */}
            <PageHero
                breadcrumb={`Projects / ${projectType.label}`}
                label={projectType.label}
                title={projectType.title}
                highlightedText={
                    projectType.highlightedText
                }
                description={
                    projectType.description
                }
            />

            {/* Projects */}
            <section className="section relative overflow-hidden">
                <OrbitDecorations />

                <div className="container relative z-10">

                    {/* Loading */}
                    {projects === undefined && (
                        <ProjectGridSkeleton />
                    )}

                    {/* Empty */}
                    {projects?.length === 0 && (
                        <EmptyProjects
                            title={`No ${projectType.label.toLowerCase()} projects yet`}
                            description="Projects in this category will appear here once they are published."
                        />
                    )}

                    {/* Project grid */}
                    {projects &&
                        projects.length > 0 && (
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
                                {projects.map(
                                    (project) => (
                                        <ProjectCard
                                            key={
                                                project._id
                                            }
                                            project={
                                                project
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        )}
                </div>
            </section>
        </main>
    );
}



