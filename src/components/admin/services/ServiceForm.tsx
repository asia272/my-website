"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

    const createService = useMutation(api.services.create);
    const updateService = useMutation(api.services.update);

    const [title, setTitle] = useState(service?.title ?? "");
    const [icon, setIcon] = useState(service?.icon ?? "");
    const [description, setDescription] = useState(
        service?.description ?? "",
    );

    const [listItems, setListItems] = useState<string[]>(
        service?.listItems?.length
            ? service.listItems
            : [""],
    );

    const [isActive, setIsActive] = useState(
        service?.isActive ?? true,
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const addListItem = () => {
        setListItems((items) => [...items, ""]);
    };

    const removeListItem = (index: number) => {
        setListItems((items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateListItem = (
        index: number,
        value: string,
    ) => {
        setListItems((items) =>
            items.map((item, itemIndex) =>
                itemIndex === index ? value : item,
            ),
        );
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const cleanTitle = title.trim();
        const cleanDescription = description.trim();

        const cleanListItems = listItems
            .map((item) => item.trim())
            .filter(Boolean);

        if (!cleanTitle) {
            toast.error("Service title is required.");
            return;
        }

        if (!cleanDescription) {
            toast.error("Service description is required.");
            return;
        }

        if (cleanListItems.length === 0) {
            toast.error("Add at least one service feature.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (mode === "create") {
                await createService({
                    title: cleanTitle,
                    icon: icon.trim() || undefined,
                    description: cleanDescription,
                    listItems: cleanListItems,
                    isActive,
                });

                toast.success("Service created successfully.");

                router.push("/admin/dashboard/services");
                router.refresh();
            } else {
                if (!service) {
                    toast.error("Service data is missing.");
                    return;
                }

                await updateService({
                    id: service._id,
                    title: cleanTitle,
                    icon: icon.trim() || undefined,
                    description: cleanDescription,
                    listItems: cleanListItems,
                    isActive,
                });

                toast.success("Service updated successfully.");

                router.push("/admin/dashboard/services");
                router.refresh();
            }
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

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">
                    Service Title
                </Label>

                <Input
                    id="title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Web Development"
                    disabled={isSubmitting}
                />
            </div>

            {/* Icon */}
            <div className="space-y-2">
                <Label htmlFor="icon">
                    Icon
                </Label>

                <Input
                    id="icon"
                    value={icon}
                    onChange={(event) =>
                        setIcon(event.target.value)
                    }
                    placeholder="Code2"
                    disabled={isSubmitting}
                />

                <p className="text-xs text-muted-foreground">
                    Enter a Lucide icon name, for example
                    Code2, Bot, ShoppingCart.
                </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">
                    Description
                </Label>

                <Textarea
                    id="description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Describe what this service includes..."
                    rows={5}
                    disabled={isSubmitting}
                />
            </div>

            {/* List Items */}
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <Label>
                            Service Features
                        </Label>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Add the features included in this service.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addListItem}
                        disabled={isSubmitting}
                    >
                        <Plus className="mr-2 size-4" />
                        Add Feature
                    </Button>
                </div>

                <div className="space-y-2">
                    {listItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2"
                        >
                            <Input
                                value={item}
                                onChange={(event) =>
                                    updateListItem(
                                        index,
                                        event.target.value,
                                    )
                                }
                                placeholder={`Feature ${index + 1}`}
                                disabled={isSubmitting}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    removeListItem(index)
                                }
                                disabled={
                                    isSubmitting ||
                                    listItems.length === 1
                                }
                                aria-label={`Remove feature ${index + 1
                                    }`}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status */}
            <div
                className="
                    flex items-center justify-between
                    gap-4
                    rounded-lg
                    border
                    bg-background/40
                    p-4
                "
            >
                <div>
                    <Label>
                        Service Status
                    </Label>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Inactive services will not be shown
                        on the public website.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                        disabled={isSubmitting}
                        id="isActive"
                    />

                    <Label
                        htmlFor="isActive"
                        className="cursor-pointer"
                    >
                        {isActive ? "Active" : "Inactive"}
                    </Label>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-32"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            {mode === "create"
                                ? "Creating..."
                                : "Updating..."}
                        </>
                    ) : mode === "create" ? (
                        "Create Service"
                    ) : (
                        "Update Service"
                    )}
                </Button>
            </div>
        </form>
    );
}