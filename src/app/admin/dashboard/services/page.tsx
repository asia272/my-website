"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function ServicesPage() {
    const services = useQuery(api.services.getAll);

    const removeService = useMutation(api.services.remove);

    const handleDelete = async (
        id: Id<"services">,
        title: string,
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${title}"?`,
        );

        if (!confirmed) {
            return;
        }

        try {
            await removeService({ id });

            toast.success("Service deleted successfully.");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete service.";

            toast.error(message);
        }
    };

    if (services === undefined) {
        return (
            <div className="space-y-8">
                <AdminPageHeading
                    title="Services"
                    description="Manage the services displayed on your website."
                />

                <div className="flex min-h-60 items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Heading */}
            <div className="flex items-start justify-between gap-4">
                <AdminPageHeading
                    title="Services"
                    description="Manage the services displayed on your website."
                />

                <Button asChild>
                    <Link
                        href="/admin/dashboard/services/new"
                        className="gap-2"
                    >
                        <Plus className="size-4" />
                        <span className="hidden sm:inline">
                            Add Service
                        </span>
                    </Link>
                </Button>
            </div>

            {/* Empty State */}
            {services.length === 0 ? (
                <div
                    className="
                        rounded-xl
                        border
                        bg-card
                        p-8
                        text-center
                    "
                >
                    <h2 className="text-lg font-semibold">
                        No services yet
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Create your first service to display
                        it on your website.
                    </p>

                    <Button
                        asChild
                        className="mt-5"
                    >
                        <Link href="/admin/dashboard/services/new">
                            <Plus className="mr-2 size-4" />
                            Create Service
                        </Link>
                    </Button>
                </div>
            ) : (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="
                                flex
                                h-full
                                flex-col
                                rounded-xl
                                border
                                bg-card
                                p-5
                            "
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <h2 className="truncate text-lg font-semibold">
                                        {service.title}
                                    </h2>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {service.icon || "No icon"}
                                    </p>
                                </div>

                                <span
                                    className={`
                                        shrink-0
                                        rounded-full
                                        border
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-medium
                                        ${service.isActive
                                            ? "border-green-500/30 text-green-500"
                                            : "border-muted-foreground/30 text-muted-foreground"
                                        }
                                    `}
                                >
                                    {service.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                {service.description}
                            </p>

                            {/* Features */}
                            <div className="mt-4 flex-1">
                                <p className="text-sm font-medium">
                                    Features
                                </p>

                                <ul className="mt-2 space-y-1">
                                    {service.listItems
                                        .slice(0, 4)
                                        .map(
                                            (
                                                item,
                                                index,
                                            ) => (
                                                <li
                                                    key={`${service._id}-${index}`}
                                                    className="
                                                        truncate
                                                        text-sm
                                                        text-muted-foreground
                                                    "
                                                >
                                                    • {item}
                                                </li>
                                            ),
                                        )}
                                </ul>

                                {service.listItems.length >
                                    4 && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            +
                                            {service.listItems
                                                .length - 4}{" "}
                                            more
                                        </p>
                                    )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex items-center gap-2 border-t pt-4">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Link
                                        href={`/admin/dashboard/services/${service._id}/edit`}
                                    >
                                        <Pencil className="mr-2 size-4" />
                                        Edit
                                    </Link>
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        handleDelete(
                                            service._id,
                                            service.title,
                                        )
                                    }
                                    aria-label={`Delete ${service.title}`}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}