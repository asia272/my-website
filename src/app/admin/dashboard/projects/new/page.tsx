import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import ProjectForm from "@/components/admin/projects/ProjectForm";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function NewProjectPage() {
    return (
        <div className="space-y-8 mx-auto w-full max-w-7xl">
            <div className="flex items-start gap-4">
                <Button
                    asChild
                    variant="outline"
                    className="
        mt-1 shrink-0
        h-10 gap-2
        border-border/60
        bg-background/50
        px-3.5
        text-sm font-medium
    "
                >
                    <Link
                        href="/admin/dashboard/projects"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="size-4 text-primary" />
                        <span className="text-primary">Back</span>
                    </Link>
                </Button>

                {/* <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create New Project
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new project to your portfolio.
                    </p>
                </div> */}
                <AdminPageHeading
                    title="Create New Project"
                    description="Add a new projec to your portfolio."
                />
            </div>


            <ProjectForm mode="create" />

        </div>
    );
}