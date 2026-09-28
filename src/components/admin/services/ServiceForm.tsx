
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {
    Loader2,
    Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import * as Icons from "lucide-react";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

import { SERVICE_ICONS } from "@/lib/service-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ServiceData = {
    _id: Id<"services">;
    title: string;
    icon?: string;
    description: string;
    listItems: string[];
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
};

type ServiceFormProps = {
    mode: "create" | "edit";
    service?: ServiceData;
};

export default function ServiceForm({
    mode,
    service,
}: ServiceFormProps) {
    const router = useRouter();

    const createService = useMutation(
        api.services.create,
    );

    const updateService = useMutation(
        api.services.update,
    );

    const [title, setTitle] = useState(
        service?.title ?? "",
    );

    const [icon, setIcon] = useState(
        service?.icon ?? "Code2",
    );

    const [description, setDescription] =
        useState(
            service?.description ?? "",
        );

    const [listItems, setListItems] =
        useState<string[]>(
            service?.listItems?.length
                ? service.listItems
                : [],
        );

    const [featureInput, setFeatureInput] =
        useState("");

    const [isActive, setIsActive] =
        useState(
            service?.isActive ?? true,
        );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const addFeature = () => {
        const cleanFeature =
            featureInput.trim();

        if (!cleanFeature) {
            return;
        }

        if (
            listItems.some(
                (item) =>
                    item.toLowerCase() ===
                    cleanFeature.toLowerCase(),
            )
        ) {
            toast.error(
                "This feature has already been added.",
            );
            return;
        }

        setListItems((items) => [
            ...items,
            cleanFeature,
        ]);

        setFeatureInput("");
    };

    const removeFeature = (
        index: number,
    ) => {
        setListItems((items) =>
            items.filter(
                (_, itemIndex) =>
                    itemIndex !== index,
            ),
        );
    };

    const handleFeatureKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addFeature();
        }

        if (
            event.key === "Backspace" &&
            !featureInput &&
            listItems.length > 0
        ) {
            setListItems((items) =>
                items.slice(0, -1),
            );
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const cleanTitle =
            title.trim();

        const cleanDescription =
            description.trim();

        const cleanListItems =
            listItems
                .map((item) =>
                    item.trim(),
                )
                .filter(Boolean);

        if (!cleanTitle) {
            toast.error(
                "Service title is required.",
            );
            return;
        }

        if (!cleanDescription) {
            toast.error(
                "Service description is required.",
            );
            return;
        }

        if (
            cleanListItems.length ===
            0
        ) {
            toast.error(
                "Add at least one service feature.",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            if (mode === "create") {
                await createService({
                    title: cleanTitle,
                    icon:
                        icon.trim() ||
                        undefined,
                    description:
                        cleanDescription,
                    listItems:
                        cleanListItems,
                    isActive,
                });

                toast.success(
                    "Service created successfully.",
                );
            } else {
                if (!service) {
                    toast.error(
                        "Service data is missing.",
                    );
                    return;
                }

                await updateService({
                    id: service._id,
                    title: cleanTitle,
                    icon:
                        icon.trim() ||
                        undefined,
                    description:
                        cleanDescription,
                    listItems:
                        cleanListItems,
                    isActive,
                });

                toast.success(
                    "Service updated successfully.",
                );
            }

            router.push(
                "/admin/services",
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const SelectedIcon =
        icon &&
        Icons[
        icon as keyof typeof Icons
        ];

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl"
        >
            <div className="overflow-hidden rounded-xl border bg-card">

                {/* ============================== */}
                {/* FORM CONTENT */}
                {/* ============================== */}

                <div className="space-y-6 p-5 sm:p-6">

                    {/* ========================== */}
                    {/* TITLE + ICON */}
                    {/* ========================== */}

                    <section className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">

                            {/* Service Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Service Title
                                </Label>

                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(
                                        event,
                                    ) =>
                                        setTitle(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="Web Development"
                                    disabled={
                                        isSubmitting
                                    }
                                />
                            </div>

                            {/* Service Icon */}
                            <div className="space-y-2">
                                <Label htmlFor="icon">
                                    Service Icon
                                </Label>

                                <Select
                                    value={
                                        icon
                                    }
                                    onValueChange={
                                        setIcon
                                    }
                                    disabled={
                                        isSubmitting
                                    }
                                >
                                    <SelectTrigger
                                        id="icon"
                                        className="
                                            h-8
                                            w-full
                                            min-w-0
                                            rounded
                                            border
                                            border-border
                                            bg-transparent
                                            px-2.5
                                            py-1
                                            text-sm
                                            font-medium
                                            text-foreground
                                            shadow-none
                                            transition-colors
                                            focus:border-primary
                                            focus:ring-0
                                        "
                                    >
                                        <SelectValue placeholder="Select icon">
                                            {SelectedIcon &&
                                                typeof SelectedIcon ===
                                                "object" && (
                                                    <div className="flex items-center gap-2">
                                                        <SelectedIcon className="size-4" />

                                                        <span>
                                                            {
                                                                icon
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent
                                        className="
                                            min-w-[var(--radix-select-trigger-width)]
                                            rounded-md
                                            border-border
                                            bg-popover
                                            p-1
                                            shadow-lg
                                        "
                                    >
                                        {SERVICE_ICONS.map(
                                            (
                                                iconName,
                                            ) => {
                                                const Icon =
                                                    Icons[
                                                    iconName as keyof typeof Icons
                                                    ];

                                                if (
                                                    !Icon ||
                                                    typeof Icon !==
                                                    "object"
                                                ) {
                                                    return null;
                                                }

                                                return (
                                                    <SelectItem
                                                        key={
                                                            iconName
                                                        }
                                                        value={
                                                            iconName
                                                        }
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Icon className="size-4" />

                                                            <span>
                                                                {
                                                                    iconName
                                                                }
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </section>
                    {/* ========================== */}
                    {/* DESCRIPTION */}
                    {/* ========================== */}

                    <section className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <Label htmlFor="description">
                                    Description
                                </Label>
                            </div>

                            <span className="shrink-0 text-xs text-muted-foreground">
                                {description.length}/500
                            </span>
                        </div>

                        <Textarea
                            id="description"
                            value={
                                description
                            }
                            onChange={(
                                event,
                            ) => {
                                if (
                                    event
                                        .target
                                        .value
                                        .length <=
                                    500
                                ) {
                                    setDescription(
                                        event
                                            .target
                                            .value,
                                    );
                                }
                            }}
                            placeholder="Describe what this service includes..."
                            rows={4}
                            disabled={
                                isSubmitting
                            }
                            className="resize-none"
                        />
                    </section>
                    {/* ========================== */}
                    {/* FEATURES */}
                    {/* ========================== */}
                    <section className="space-y-4">
                        <div>
                            <Label>
                                Service Features
                            </Label>
                        </div>

                        {/* Feature input + Add button */}
                        <div className="flex items-center gap-2">
                            <Input
                                value={featureInput}
                                onChange={(event) =>
                                    setFeatureInput(
                                        event.target.value,
                                    )
                                }
                                onKeyDown={
                                    handleFeatureKeyDown
                                }
                                placeholder="Type a feature..."
                                disabled={isSubmitting}
                                className="min-w-0 flex-1"
                            />

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addFeature}
                                disabled={
                                    isSubmitting ||
                                    !featureInput.trim()
                                }
                                className="
        h-8
        shrink-0
        rounded
        border
        border-border
        bg-transparent
        px-3
        py-1
        text-sm
        font-medium
        text-foreground
        shadow-none
        transition-colors
        hover:bg-accent
    "
                            >
                                Add Feature
                            </Button>


                        </div>

                        {/* Added features */}
                        {listItems.length > 0 && (
                            <div className="space-y-2">
                                {listItems.map(
                                    (item, index) => (
                                        <div
                                            key={`${item}-${index}`}
                                            className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            rounded-md
                            border
                            border-border
                            bg-muted/30
                            px-3
                            py-2
                        "
                                        >
                                            <span className="min-w-0 truncate text-sm text-foreground">
                                                {item}
                                            </span>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    removeFeature(
                                                        index,
                                                    )
                                                }
                                                disabled={
                                                    isSubmitting
                                                }
                                                aria-label={`Remove ${item}`}
                                                className="
                                size-7
                                shrink-0
                                text-muted-foreground
                                hover:bg-destructive/10
                                hover:text-destructive
                            "
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </section>
                    {/* ========================== */}
                    {/* STATUS */}
                    {/* ========================== */}
                    <section
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            rounded-lg
                            border
                            bg-background/40
                            p-4
                        "
                    >
                        <div className="min-w-0">
                            <Label>
                                Service Status
                            </Label>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Inactive services won't appear
                                on the public website.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <Switch
                                id="isActive"
                                checked={
                                    isActive
                                }
                                onCheckedChange={
                                    setIsActive
                                }
                                disabled={
                                    isSubmitting
                                }
                            />

                            <Label
                                htmlFor="isActive"
                                className="cursor-pointer"
                            >
                                {isActive
                                    ? "Active"
                                    : "Inactive"}
                            </Label>
                        </div>
                    </section>
                </div>

                {/* ============================== */}
                {/* FORM FOOTER */}
                {/* ============================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-end
                        border-t
                        bg-background/30
                        px-5
                        py-4
                        sm:px-6
                    "
                >
                    <Button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="custom-btn"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />

                                {mode ===
                                    "create"
                                    ? "Creating..."
                                    : "Updating..."}
                            </>
                        ) : mode ===
                            "create" ? (
                            "Create Service"
                        ) : (
                            "Update Service"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
