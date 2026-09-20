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
            <div className="space-y-4">
                {Array.from({ length: 3 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="h-24 animate-pulse rounded-lg bg-muted/40"
                        />
                    ),
                )}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <FolderKanban className="size-5 text-muted-foreground" />
                </div>

                <h3 className="font-medium">
                    No projects yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Create your first project to start
                    building your portfolio.
                </p>

                <Button
                    asChild
                    className="mt-5"
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
            rounded-xl
            border
            bg-background
            p-4
            transition-colors
            hover:bg-muted/30
          "
                >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Project information */}
                        <div className="flex min-w-0 items-start gap-4">
                            {/* Image */}
                            <div className="hidden size-16 shrink-0 overflow-hidden rounded-lg border bg-muted sm:block">
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.name}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <div className="flex size-full items-center justify-center">
                                        <FolderKanban className="size-5 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="truncate font-medium">
                                        {project.name}
                                    </h3>

                                    {project.isFeatured && (
                                        <span className="rounded-full border px-2 py-0.5 text-xs">
                                            Featured
                                        </span>
                                    )}

                                    <span
                                        className={
                                            project.isActive
                                                ? "rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-600"
                                                : "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                                        }
                                    >
                                        {project.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {typeLabels[project.type]}
                                </p>

                                <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-muted-foreground">
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
                            >
                                <Link
                                    href={`/admin/dashboard/projects/${project._id}/edit`}
                                >
                                    <Pencil className="mr-2 size-4" />
                                    Edit
                                </Link>
                            </Button>

                            {project.videoUrl && (
                                <Button
                                    asChild
                                    variant="outline"
                                    size="icon"
                                >
                                    <a
                                        href={project.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${project.name} video`}
                                    >
                                        <ExternalLink className="size-4" />
                                    </a>
                                </Button>
                            )}

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