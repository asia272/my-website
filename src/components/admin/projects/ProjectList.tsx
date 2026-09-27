
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
    FolderKanban,
    Pencil,
    Search,
} from "lucide-react";

import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import DeleteProjectButton from "./DeleteProjectButton";
import AdminListSkeleton from "@/components/skeleton/AdminListSkeleton";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

const typeOptions = [
    {
        value: "ALL",
        label: "All Types",
    },
    {
        value: "GEN_AI",
        label: "Generative AI",
    },
    {
        value: "WEB_DEVELOPMENT",
        label: "Web Development",
    },
    {
        value: "MOBILE_APP",
        label: "Mobile App",
    },
    {
        value: "FULL_STACK",
        label: "Full Stack",
    },
    {
        value: "E_COMMERCE",
        label: "E-Commerce",
    },
    {
        value: "SAAS",
        label: "SaaS",
    },
    {
        value: "OTHER",
        label: "Other",
    },
] as const;

export default function ProjectList({
    projects,
}: ProjectListProps) {
    const [searchQuery, setSearchQuery] =
        useState("");

    const [typeFilter, setTypeFilter] =
        useState("ALL");

    const filteredProjects = useMemo(() => {
        if (!projects) return [];

        const query = searchQuery
            .trim()
            .toLowerCase();

        return projects.filter((project) => {
            const matchesType =
                typeFilter === "ALL" ||
                project.type === typeFilter;

            const matchesSearch =
                !query ||
                project.name
                    .toLowerCase()
                    .includes(query);

            return (
                matchesType &&
                matchesSearch
            );
        });
    }, [
        projects,
        searchQuery,
        typeFilter,
    ]);

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
        <div className="space-y-5">

            {/* Search + Filter */}
            <div
                className="
                    flex
                    flex-col
                    gap-4
                  
                    bg-card
                    
                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                "
            >
                {/* Search */}
                <div className="w-full lg:max-w-sm">
                    <label
                        htmlFor="project-search"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Search Projects
                    </label>

                    <div className="relative">
                        <Search
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                size-4
                                -translate-y-1/2
                                text-muted-foreground
                            "
                        />

                        <input
                            id="project-search"
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(
                                    event.target.value
                                )
                            }
                            placeholder="Search by project title..."
                            className="
                                h-10
                                w-full
                                rounded-md
                                border
                                border-border
                                bg-transparent
                                pl-9
                                pr-3
                                text-sm
                                outline-none
                                transition-colors
                                placeholder:text-muted-foreground
                                focus:border-ring
                            "
                        />
                    </div>
                </div>

                {/* Project Type Filter */}
                <div className="w-full lg:w-auto">
                    <label
                        htmlFor="project-type-filter"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Filter by Type
                    </label>

                    <Select
                        value={typeFilter}
                        onValueChange={setTypeFilter}
                    >
                        <SelectTrigger
                            id="project-type-filter"
                            className="w-full sm:w-[210px] rounded"
                        >
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>

                        <SelectContent className=" min-w-[var(--radix-select-trigger-width)]
            rounded-md
            border-border
            bg-popover
            p-1">
                            {typeOptions.map(
                                (option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Result Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-secondary">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {filteredProjects.length}
                    </span>{" "}
                    {filteredProjects.length === 1
                        ? "project"
                        : "projects"}
                </p>
            </div>

            {/* No Matching Projects */}
            {filteredProjects.length === 0 ? (
                <div
                    className="
                        flex
                        min-h-48
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
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
                            size-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-muted
                        "
                    >
                        <Search className="size-5 text-muted-foreground" />
                    </div>

                    <h3 className="font-medium">
                        No matching projects
                    </h3>

                    <p className="mt-1 text-sm text-secondary">
                        Try changing your search or
                        project type filter.
                    </p>
                </div>
            ) : (
                /* Existing Project List */
                <div className="space-y-4">
                    {filteredProjects.map(
                        (project) => (
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
                                                    src={
                                                        project.imageUrl
                                                    }
                                                    alt={
                                                        project.name
                                                    }
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
                                                    {
                                                        project.name
                                                    }
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
                                                {
                                                    typeLabels[
                                                    project.type
                                                    ]
                                                }
                                            </p>

                                            <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-secondary">
                                                {
                                                    project.description
                                                }
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
                                                <span>
                                                    Edit
                                                </span>
                                            </Link>
                                        </Button>

                                        <DeleteProjectButton
                                            projectId={
                                                project._id
                                            }
                                            projectName={
                                                project.name
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

