"use client";

import Link from "next/link";
import {
    Bot,
    Code2,
    Database,
    Globe,
    Palette,
    Pencil,
    Server,
    ShoppingCart,
    Smartphone,
} from "lucide-react";

import { Doc } from "../../../../convex/_generated/dataModel";
import AdminListSkeleton from "@/components/skeleton/AdminListSkeleton";

import DeleteServiceButton from "./DeleteServiceButton";

type ServiceListProps = {
    services: Doc<"services">[] | undefined;
};

const ICON_MAP = {
    Code2,
    Bot,
    ShoppingCart,
    Smartphone,
    Palette,
    Database,
    Globe,
    Server,
};

export default function ServiceList({ services }: ServiceListProps) {
    if (services === undefined) {
        return <AdminListSkeleton />;
    }

    if (services.length === 0) {
        return (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-5 py-10 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <Code2 className="size-5 text-muted-foreground" />
                </div>

                <h3 className="text-base font-semibold text-foreground">
                    No services found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Add your first service to display it on your website.
                </p>

                <Link
                    href="/admin/dashboard/services/new"
                    className="custom-btn mt-5"
                >
                    Add Service
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {services.map((service) => {
                const ServiceIcon =
                    service.icon &&
                        service.icon in ICON_MAP
                        ? ICON_MAP[
                        service.icon as keyof typeof ICON_MAP
                        ]
                        : Code2;

                return (
                    <div
                        key={service._id}
                        className="rounded-md border border-border bg-card p-4"
                    >
                        <div className="flex items-start gap-4">
                            {/* Service Icon */}
                            <div className="hidden size-16 shrink-0 items-center justify-center rounded-md border border-border bg-muted sm:flex">
                                <ServiceIcon className="size-7 text-primary" />
                            </div>

                            {/* Service Content */}
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h3 className="truncate text-base font-semibold text-foreground">
                                            {service.title}
                                        </h3>

                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 items-center gap-2">
                                        <Link
                                            href={`/admin/dashboard/services/${service._id}/edit`}
                                            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-transparent px-3 text-sm font-medium text-foreground transition-colors hover:border-chart-2/40 hover:bg-chart-2/10 hover:text-chart-2"
                                        >
                                            <Pencil className="size-4" />
                                            <span className="hidden sm:inline">
                                                Edit
                                            </span>
                                        </Link>

                                        <DeleteServiceButton
                                            serviceId={service._id}
                                            serviceTitle={service.title}
                                        />
                                    </div>
                                </div>

                                {/* List Items */}
                                {service.listItems.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {service.listItems
                                            .slice(0, 3)
                                            .map((item, index) => (
                                                <span
                                                    key={`${service._id}-${index}`}
                                                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                                                >
                                                    {item}
                                                </span>
                                            ))}

                                        {service.listItems.length > 3 && (
                                            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                                                +{service.listItems.length - 3}{" "}
                                                more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}