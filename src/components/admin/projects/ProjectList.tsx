"use client";

import Link from "next/link";
import {
    ExternalLink,
    FolderKanban,
    Pencil,
} from "lucide-react";

import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import DeleteProjectButton from "./DeleteProjectButton";
import AdminListSkeleton from "@/components/skeleton/AdminListSkeleton";

type Project = Doc<"projects"> & {
    imageUrl: string | null;
};

type ProjectListProps = {
    projects: Project[] | undefined;
};

const typeLabels: Record<
    Project["type"],
    string
> = {
    GEN_AI: "Generative AI",
    WEB_DEVELOPMENT: "Web Development",
    MOBILE_APP: "Mobile App",
    FULL_STACK: "Full Stack",
    E_COMMERCE: "E-Commerce",
    SAAS: "SaaS",
    OTHER: "Other",
};

export default function ProjectList({
    projects,
}: ProjectListProps) {
    if (projects === undefined) {
        return (
            <AdminListSkeleton />
        );
    }

    if (projects.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-60
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-border
                    bg-card
                    px-6
                    text-center
                "
            >
                <div
                    className="
                        mb-4
                        flex
                        size-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-chart-3/10
                    "
                >
                    <FolderKanban className="size-5 text-chart-3" />
                </div>

                <h3 className="font-medium">
                    No projects yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-secondary">
                    Create your first project to start
                    building your portfolio.
                </p>

                <Button
                    asChild
                    className="custom-btn mt-5"
                >
                    <Link href="/admin/dashboard/projects/new">
                        Create Project
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <div
                    key={project._id}
                    className="
                       group
                         rounded-md
                                border
                                border-border
                                bg-card
                        p-4 
                    "
                >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Project information */}
                        <div className="flex min-w-0 items-start gap-4">

                            {/* Image */}
                            <div
                                className="
        hidden
        size-16
        shrink-0
        overflow-hidden
        rounded-md
        border
        border-border
        bg-muted
        sm:block
    "
                            >
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.name}
                                        className="block size-full object-cover"
                                    />
                                ) : (
                                    <div className="flex size-full items-center justify-center">
                                        <FolderKanban className="size-5 text-chart-3" />
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="truncate font-medium">
                                        {project.name}
                                    </h4>

                                    {project.isFeatured && (
                                        <span
                                            className="
                                                rounded-full
                                                border
                                                border-chart-1/30
                                                bg-chart-1/10
                                                px-2
                                                py-0.5
                                                text-xs
                                                font-medium
                                                text-chart-1
                                            "
                                        >
                                            Featured
                                        </span>
                                    )}

                                    <span
                                        className={
                                            project.isActive
                                                ? `
                                                    rounded-full
                                                    bg-chart-4/10
                                                    px-2
                                                    py-0.5
                                                    text-xs
                                                    font-medium
                                                    text-chart-4
                                                `
                                                : `
                                                    rounded-full
                                                    bg-muted
                                                    px-2
                                                    py-0.5
                                                    text-xs
                                                    font-medium
                                                    text-secondary
                                                `
                                        }
                                    >
                                        {project.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-secondary">
                                    {typeLabels[project.type]}
                                </p>

                                <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-secondary">
                                    {project.description}
                                </p>
                            </div>
                        </div>


                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-2">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="
        h-9
        rounded-md
        border-border
        bg-transparent
        px-3
        text-sm
        font-medium
        text-secondary
        transition-all
        duration-[var(--duration-normal)]
        ease-[var(--ease-standard)]
        hover:border-chart-2/40
        hover:bg-chart-2/10
        hover:text-chart-2
    "
                            >
                                <Link
                                    href={`/admin/dashboard/projects/${project._id}/edit`}
                                    className="inline-flex items-center justify-center"
                                >
                                    <Pencil className="mr-2 size-4 shrink-0 text-chart-2" />
                                    <span>Edit</span>
                                </Link>
                            </Button>

                            <DeleteProjectButton
                                projectId={project._id}
                                projectName={project.name}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}