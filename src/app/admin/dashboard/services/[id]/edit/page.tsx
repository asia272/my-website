"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import ServiceForm from "@/components/admin/services/ServiceForm";

type EditServicePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditServicePage({
    params,
}: EditServicePageProps) {
    const { id } = await params;

    return (
        <EditServiceContent
            serviceId={id as Id<"services">}
        />
    );
}

function EditServiceContent({
    serviceId,
}: {
    serviceId: Id<"services">;
}) {
    const service = useQuery(
        api.services.getById,
        {
            id: serviceId,
        },
    );

    if (service === undefined) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (service === null) {
        return (
            <div className="space-y-6">
                <Button
                    asChild
                    variant="outline"
                >
                    <Link href="/admin/dashboard/services">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Services
                    </Link>
                </Button>

                <div className="rounded-xl border p-8 text-center">
                    <h1 className="text-xl font-semibold">
                        Service Not Found
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        This service may have been deleted
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
                    <Link href="/admin/dashboard/services">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Service
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the information for{" "}
                        <span className="font-medium text-foreground">
                            {service.title}
                        </span>
                        .
                    </p>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 sm:p-8">
                <ServiceForm
                    mode="edit"
                    service={service}
                />
            </div>
        </div>
    );
}