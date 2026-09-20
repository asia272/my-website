"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import ProjectForm from "@/components/admin/projects/ProjectForm";

type EditProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditProjectPage({
    params,
}: EditProjectPageProps) {
    const { id } = await params;

    return (
        <EditProjectContent
            projectId={id as Id<"projects">}
        />
    );
}

function EditProjectContent({
    projectId,
}: {
    projectId: Id<"projects">;
}) {
    const project = useQuery(
        api.projects.getById,
        {
            id: projectId,
        },
    );

    if (project === undefined) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (project === null) {
        return (
            <div className="space-y-6">
                <Button
                    asChild
                    variant="outline"
                >
                    <Link href="/admin/dashboard/projects">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Projects
                    </Link>
                </Button>

                <div className="rounded-xl border p-8 text-center">
                    <h1 className="text-xl font-semibold">
                        Project Not Found
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        This project may have been deleted
                        or the URL is invalid.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="mt-1 shrink-0"
                >
                    <Link href="/admin/dashboard/projects">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Project
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the information for{" "}
                        <span className="font-medium text-foreground">
                            {project.name}
                        </span>
                        .
                    </p>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 sm:p-8">
                <ProjectForm
                    mode="edit"
                    project={project}
                />
            </div>
        </div>
    );
}