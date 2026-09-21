"use client";

import Link from "next/link";
import { FolderKanban, Heading3, Plus } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";

import { Button } from "@/components/ui/button";

import ProjectList from "@/components/admin/projects/ProjectList";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function ProjectsPage() {
    const projects = useQuery(api.projects.getAll);

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <AdminPageHeading
                    label="Portfolio"
                    labelClassName="text-chart-3"
                    title="Projects"
                    description="Manage the projects displayed on your website."
                />
                <Button
                    asChild
                    className="custom-btn w-full sm:w-auto"
                >
                    <Link
                        href="/admin/dashboard/projects/new"
                        className="inline-flex items-center justify-center whitespace-nowrap"
                    >
                        <Plus className="mr-2 size-4 shrink-0" />
                        <span>Create New Project</span>
                    </Link>
                </Button>
            </div>

            {/* All Projects */}
            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">
                                All Projects
                            </h3>

                            <p className="mt-1 text-sm text-secondary">
                                View and manage all your projects.
                            </p>
                        </div>

                        {projects && (
                            <div
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-border
                                    bg-muted/40
                                    px-3
                                    py-2
                                "
                            >
                                <div
                                    className="
                                        flex
                                        size-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-chart-3/10
                                    "
                                >
                                    <FolderKanban className="size-3.5 text-chart-3" />
                                </div>

                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-sm font-semibold text-foreground">
                                        {projects.length}
                                    </span>

                                    <span className="text-xs text-secondary">
                                        {projects.length === 1
                                            ? "project"
                                            : "projects"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    <ProjectList projects={projects} />
                </div>
            </section>
        </div>
    );
}