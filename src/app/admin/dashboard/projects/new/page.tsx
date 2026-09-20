import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import ProjectForm from "@/components/admin/projects/ProjectForm";

export default function NewProjectPage() {
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
                        Create New Project
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new project to your portfolio.
                    </p>
                </div>
            </div>


            <ProjectForm mode="create" />

        </div>
    );
}