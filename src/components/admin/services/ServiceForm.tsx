"use client";

import { useEffect, useState } from "react";

import {
    Bot,
    Code2,
    Database,
    Globe,
    Loader2,
    Palette,
    Plus,
    Save,
    Server,
    ShoppingCart,
    Smartphone,
    Trash2,
} from "lucide-react";

import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ServiceFormProps = {
    mode: "create" | "edit";
    service?: Doc<"services">;
};

const SERVICE_ICONS = [
    {
        name: "Code2",
        label: "Code",
        icon: Code2,
    },
    {
        name: "Bot",
        label: "AI / Bot",
        icon: Bot,
    },
    {
        name: "ShoppingCart",
        label: "E-Commerce",
        icon: ShoppingCart,
    },
    {
        name: "Smartphone",
        label: "Mobile",
        icon: Smartphone,
    },
    {
        name: "Palette",
        label: "UI / UX",
        icon: Palette,
    },
    {
        name: "Database",
        label: "Database",
        icon: Database,
    },
    {
        name: "Globe",
        label: "Web",
        icon: Globe,
    },
    {
        name: "Server",
        label: "Backend",
        icon: Server,
    },
] as const;

export default function ServiceForm({
    mode,
    service,
}: ServiceFormProps) {
    const router = useRouter();

    const createService =
        useMutation(
            api.services.create,
        );

    const updateService =
        useMutation(
            api.services.update,
        );

    const isEditMode =
        mode === "edit";

    const [title, setTitle] =
        useState(
            service?.title ?? "",
        );

    const [icon, setIcon] =
        useState(
            service?.icon ?? "",
        );

    const [description, setDescription] =
        useState(
            service?.description ?? "",
        );

    const [listItems, setListItems] =
        useState<string[]>(
            service?.listItems?.length
                ? service.listItems
                : [""],
        );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(
            null,
        );

    useEffect(() => {
        if (!service) {
            return;
        }

        setTitle(service.title);
        setIcon(service.icon ?? "");
        setDescription(
            service.description,
        );

        setListItems(
            service.listItems?.length
                ? service.listItems
                : [""],
        );
    }, [service]);

    function handleListItemChange(
        index: number,
        value: string,
    ) {
        setListItems(
            (currentItems) =>
                currentItems.map(
                    (
                        item,
                        itemIndex,
                    ) =>
                        itemIndex === index
                            ? value
                            : item,
                ),
        );
    }

    function addListItem() {
        setListItems(
            (currentItems) => [
                ...currentItems,
                "",
            ],
        );
    }

    function removeListItem(
        index: number,
    ) {
        setListItems(
            (currentItems) => {
                if (
                    currentItems.length ===
                    1
                ) {
                    return [""];
                }

                return currentItems.filter(
                    (_, itemIndex) =>
                        itemIndex !==
                        index,
                );
            },
        );
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError(null);

        const trimmedTitle =
            title.trim();

        const trimmedDescription =
            description.trim();

        const cleanedListItems =
            listItems
                .map((item) =>
                    item.trim(),
                )
                .filter(Boolean);

        if (!trimmedTitle) {
            setError(
                "Service title is required.",
            );
            return;
        }

        if (!trimmedDescription) {
            setError(
                "Service description is required.",
            );
            return;
        }

        if (
            cleanedListItems.length ===
            0
        ) {
            setError(
                "At least one service list item is required.",
            );
            return;
        }

        if (
            isEditMode &&
            !service
        ) {
            setError(
                "Service data is missing.",
            );
            return;
        }

        try {
            setIsSubmitting(true);

            if (
                isEditMode &&
                service
            ) {
                await updateService({
                    id: service._id,
                    title: trimmedTitle,
                    icon:
                        icon.trim() ||
                        undefined,
                    description:
                        trimmedDescription,
                    listItems:
                        cleanedListItems,
                });

                toast.success(
                    "Service updated successfully.",
                );
            } else {
                await createService({
                    title: trimmedTitle,
                    icon:
                        icon.trim() ||
                        undefined,
                    description:
                        trimmedDescription,
                    listItems:
                        cleanedListItems,
                });

                toast.success(
                    "Service created successfully.",
                );
            }

            router.push(
                "/admin/dashboard/services",
            );
        } catch (error) {
            console.error(
                "Service submission failed:",
                error,
            );

            const message =
                error instanceof Error
                    ? error.message
                    : isEditMode
                        ? "Failed to update service."
                        : "Failed to create service.";

            setError(message);

            toast.error(message);
        } finally {
            setIsSubmitting(
                false,
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl"
        >
            <div className="rounded-lg border bg-card">
                <div className="space-y-6 p-5 sm:p-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="service-title">
                            Title
                        </Label>

                        <Input
                            id="service-title"
                            value={title}
                            onChange={(event) =>
                                setTitle(
                                    event.target
                                        .value,
                                )
                            }
                            placeholder="Web Development"
                            maxLength={100}
                            disabled={
                                isSubmitting
                            }
                            required
                            className="rounded"
                        />
                    </div>

                    {/* Icon */}
                    <div className="space-y-2">
                        <Label>
                            Icon
                        </Label>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {SERVICE_ICONS.map(
                                (
                                    serviceIcon,
                                ) => {
                                    const Icon =
                                        serviceIcon.icon;

                                    const isSelected =
                                        icon ===
                                        serviceIcon.name;

                                    return (
                                        <button
                                            key={
                                                serviceIcon.name
                                            }
                                            type="button"
                                            onClick={() =>
                                                setIcon(
                                                    serviceIcon.name,
                                                )
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            className={`flex items-center gap-3 rounded-md border px-3 py-3 text-left text-sm transition-colors disabled:pointer-events-none disabled:opacity-60 ${isSelected
                                                    ? "border-primary bg-primary/10 text-foreground"
                                                    : "border-border bg-transparent text-secondary hover:bg-muted/50 hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="size-5 shrink-0" />

                                            <span className="truncate">
                                                {
                                                    serviceIcon.label
                                                }
                                            </span>
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        {icon && (
                            <p className="text-[11px] text-muted-foreground">
                                Selected icon:{" "}
                                {icon}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label htmlFor="service-description">
                                Description
                            </Label>

                            <span className="text-[11px] text-muted-foreground">
                                {
                                    description.length
                                }
                                /1000
                            </span>
                        </div>

                        <Textarea
                            id="service-description"
                            value={
                                description
                            }
                            onChange={(
                                event,
                            ) =>
                                setDescription(
                                    event
                                        .target
                                        .value,
                                )
                            }
                            placeholder="Describe the service, what you provide, and the value it offers to clients."
                            rows={5}
                            maxLength={1000}
                            disabled={
                                isSubmitting
                            }
                            required
                            className="rounded"
                        />
                    </div>

                    {/* List Items */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <Label>
                                    Service List
                                </Label>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Add the key
                                    features or
                                    services
                                    included.
                                </p>
                            </div>

                            <span className="text-[11px] text-muted-foreground">
                                {
                                    listItems.length
                                }{" "}
                                item
                                {listItems.length !==
                                    1
                                    ? "s"
                                    : ""}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {listItems.map(
                                (
                                    item,
                                    index,
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <Input
                                            value={
                                                item
                                            }
                                            onChange={(
                                                event,
                                            ) =>
                                                handleListItemChange(
                                                    index,
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder={`List item ${index + 1}`}
                                            maxLength={
                                                150
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            className="rounded"
                                        />

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                removeListItem(
                                                    index,
                                                )
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            aria-label={`Remove list item ${index + 1}`}
                                            className="size-10 shrink-0 rounded-md text-secondary hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                ),
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={
                                addListItem
                            }
                            disabled={
                                isSubmitting
                            }
                            className="h-10 rounded-md"
                        >
                            <Plus className="mr-2 size-4" />
                            Add List Item
                        </Button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            router.push(
                                "/admin/dashboard/services",
                            )
                        }
                        disabled={
                            isSubmitting
                        }
                        className="
                            h-11
                            min-w-[120px]
                            rounded-[12px]
                            px-5
                            text-base
                            font-medium
                        "
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="
                            h-11
                            min-w-[170px]
                            rounded-[12px]
                            px-5
                            text-base
                            font-medium
                        "
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />

                                {isEditMode
                                    ? "Updating..."
                                    : "Creating..."}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 size-4" />

                                {isEditMode
                                    ? "Update Service"
                                    : "Create Service"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}