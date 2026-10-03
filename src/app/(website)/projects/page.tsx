
"use client";

import { FolderOpen } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

import PageHero from "@/components/shared/PageHero";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectGridSkeleton from "@/components/skeleton/ProjectGridSkeleton";
import OrbitDecorations from "@/components/shared/OrbitDecorations";

export default function ProjectsPage() {
    const projects = useQuery(
        api.projects.getAllActive,
    );

    const isLoading = projects === undefined;

    return (
        <main>
            {/* Page Hero */}
            <PageHero
                breadcrumb="Projects"
                label="Our Work"
                title="Explore Our"
                highlightedText="Projects"
                description="Explore our latest projects, products, and digital experiences crafted with modern technologies and thoughtful engineering."
                maxWidth="760px"
            />

            {/* Projects */}
            <section className="section relative overflow-hidden">
                <OrbitDecorations />
                <div className="container relative z-10">
                    {isLoading ? (
                        <ProjectGridSkeleton />
                    ) : projects.length > 0 ? (
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-6
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={project._id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    data-aos-duration="700"
                                    data-aos-once="true"
                                >
                                    <ProjectCard
                                        key={project._id}
                                        project={{
                                            _id: project._id,
                                            name: project.name,
                                            description:
                                                project.description,
                                            imageUrl:
                                                project.imageUrl,
                                            videoUrl:
                                                project.videoUrl,
                                            mediaType:
                                                project.mediaType,
                                            type: project.type,
                                            isFeatured:
                                                project.isFeatured,
                                            githubUrl:
                                                project.githubUrl,
                                            liveDemoUrl:
                                                project.liveDemoUrl,
                                        }}
                                    />
                                </div>

                            ))}
                        </div>
                    ) : (
                        <div
                            className="
                                flex
                                min-h-[320px]
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-dashed
                                border-border/60
                                bg-card/40
                                px-6
                                text-center
                            "
                        >
                            <div
                                className="
                                    mb-5
                                    flex
                                    size-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-border
                                    bg-secondary/50
                                    text-muted-foreground
                                "
                            >
                                <FolderOpen className="size-6" />
                            </div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    tracking-tight
                                    text-foreground
                                "
                            >
                                No projects available
                            </h2>

                            <p
                                className="
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-muted-foreground
                                "
                            >
                                We are currently preparing new
                                projects. Please check back soon.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

