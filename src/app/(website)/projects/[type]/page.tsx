"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { slugify } from "@/lib/slug";

import ProjectCard from "@/components/projects/ProjectCard";
import PageHero from "@/components/shared/PageHero";

import OrbitDecorations from "@/components/shared/OrbitDecorations";
import ProjectGridSkeleton from "@/components/skeleton/ProjectGridSkeleton";
import EmptyProjects from "@/components/projects/EmtyProjects";

type ProjectTypePageProps = {
    params: Promise<{
        type: string;
    }>;
};

export default function ProjectTypePage({
    params,
}: ProjectTypePageProps) {
    // URL segment, e.g. "web-development"
    const { type: slug } = use(params);

    const services = useQuery(api.services.getAll);

    /*
     * Match the URL slug against the service titles.
     * Falls back to the id so older id-based links still work.
     */
    const service = services?.find(
        (s) =>
            s.isActive &&
            (slugify(s.title) === slug || s._id === slug),
    );

    const projects = useQuery(
        api.projects.getByService,
        service
            ? {
                serviceId: service._id,
            }
            : "skip",
    );

    /*
     * Services still loading
     */
    if (services === undefined) {
        return (
            <main>
                <PageHero
                    breadcrumb="Projects"
                    label="Projects"
                    title="Loading"
                    highlightedText="projects."
                    description="Please wait while we load this category."
                />

                <section className="section relative overflow-hidden">
                    <OrbitDecorations />

                    <div className="container relative z-10">
                        <ProjectGridSkeleton />
                    </div>
                </section>
            </main>
        );
    }

    /*
     * Invalid project category
     */
    if (!service) {
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
                breadcrumb={`Projects / ${service.title}`}
                label={service.title}
                title={service.title}
                highlightedText="projects."
                description={service.description}
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
                            title={`No ${service.title.toLowerCase()} projects yet`}
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
                                    (project, index) => (
                                        <div
                                            key={project._id}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            data-aos-duration="700"
                                            data-aos-once="true"
                                        >
                                            <ProjectCard project={project} />
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