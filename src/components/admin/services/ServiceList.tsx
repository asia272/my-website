
"use client";

import Link from "next/link";
import {
    Pencil,
    BriefcaseBusiness,
} from "lucide-react";
import * as Icons from "lucide-react";

import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import DeleteServiceButton from "./DeleteServiceButton";
import AdminListSkeleton from "@/components/skeleton/AdminListSkeleton";

type Service = Doc<"services">;

type ServiceListProps = {
    services: Service[] | undefined;
};

export default function ServiceList({
    services,
}: ServiceListProps) {
    if (services === undefined) {
        return <AdminListSkeleton />;
    }

    if (services.length === 0) {
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
                        bg-chart-4/10
                    "
                >
                    <BriefcaseBusiness className="size-5 text-chart-4" />
                </div>

                <h3 className="font-medium">
                    No services yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-secondary">
                    Create your first service to start
                    building your website.
                </p>

                <Button
                    asChild
                    className="custom-btn mt-5"
                >
                    <Link href="/admin/dashboard/services/new">
                        Create Service
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {services.map((service) => {
                /*
                 * The database stores the icon as a string:
                 * "Code2", "Globe", "ShoppingCart", etc.
                 *
                 * Convert that string into the actual
                 * Lucide React component.
                 */
                const Icon =
                    service.icon &&
                    Icons[
                    service.icon as keyof typeof Icons
                    ];

                return (
                    <div
                        key={service._id}
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

                            {/* Service information */}
                            <div className="flex min-w-0 items-start gap-4">

                                {/* Service Icon */}
                                <div
                                    className="
                                        hidden
                                        size-16
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        border
                                        border-border
                                        bg-muted
                                        sm:flex
                                    "
                                >
                                    {Icon &&
                                        typeof Icon === "object" ? (
                                        <Icon className="size-6 text-chart-4" />
                                    ) : (
                                        <BriefcaseBusiness className="size-6 text-chart-4" />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="truncate font-medium">
                                            {service.title}
                                        </h4>

                                        <span
                                            className={
                                                service.isActive
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
                                            {service.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </div>

                                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-secondary">
                                        {service.description}
                                    </p>

                                    {service.listItems.length > 0 && (
                                        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                                            {service.listItems.length}{" "}
                                            {service.listItems.length ===
                                                1
                                                ? "feature"
                                                : "features"}
                                        </p>
                                    )}
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
                                        href={`/admin/dashboard/services/${service._id}/edit`}
                                        className="inline-flex items-center justify-center"
                                    >
                                        <Pencil className="mr-2 size-4 shrink-0 text-chart-2" />
                                        <span>Edit</span>
                                    </Link>
                                </Button>

                                <DeleteServiceButton
                                    serviceId={service._id}
                                    serviceTitle={service.title}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

