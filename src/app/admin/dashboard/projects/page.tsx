"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";

import { Button } from "@/components/ui/button";

import ProjectList from "@/components/admin/projects/ProjectList";

export default function ProjectsPage() {
    const projects = useQuery(api.projects.getAll);

    return (
        <div className="space-y-8 mx-auto w-full max-w-7xl">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Projects
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the projects displayed on your website.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/admin/dashboard/projects/new">
                        <Plus className="mr-2 size-4" />
                        Create New Project
                    </Link>
                </Button>

            </div>

            {/* All Projects */}
            <section className="rounded-xl border bg-card">

                <div className="border-b p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="text-lg font-semibold">
                                All Projects
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                View and manage all your projects.
                            </p>
                        </div>

                        {projects && (
                            <span className="text-sm text-muted-foreground">
                                {projects.length}{" "}
                                {projects.length === 1
                                    ? "project"
                                    : "projects"}
                            </span>
                        )}

                    </div>
                </div>

                <div className="p-6">
                    <ProjectList projects={projects} />
                </div>

            </section>

        </div>
    );
}