import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import ServiceForm from "@/components/admin/services/ServiceForm";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function NewServicePage() {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            <div className="flex items-start gap-4">
                <Button
                    asChild
                    variant="outline"
                    className="
                        mt-1
                        shrink-0
                        h-10
                        gap-2
                        border-border/60
                        bg-background/50
                        px-3.5
                        text-sm
                        font-medium
                    "
                >
                    <Link
                        href="/admin/services"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="size-4 text-primary" />

                        <span className="text-primary">
                            Back
                        </span>
                    </Link>
                </Button>

                <AdminPageHeading
                    title="Create New Service"
                    description="Add a new service to your website."
                />
            </div>


            <ServiceForm mode="create" />

        </div>
    );
}