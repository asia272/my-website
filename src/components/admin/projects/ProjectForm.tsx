"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Check, ImagePlus, Loader2, Save, Upload, X } from "lucide-react";

import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { api } from "../../../../convex/_generated/api";
import type {
    Doc,
    Id,
} from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const projectTypes = [
    {
        value: "GEN_AI",
        label: "Generative AI",
    },
    {
        value: "WEB_DEVELOPMENT",
        label: "Web Development",
    },
    {
        value: "MOBILE_APP",
        label: "Mobile App",
    },
    {
        value: "FULL_STACK",
        label: "Full Stack",
    },
    {
        value: "E_COMMERCE",
        label: "E-Commerce",
    },
    {
        value: "SAAS",
        label: "SaaS",
    },
    {
        value: "OTHER",
        label: "Other",
    },
] as const;

type ProjectType =
    (typeof projectTypes)[number]["value"];

type ProjectFormProps = {
    mode: "create" | "edit";
    project?: Doc<"projects"> & {
        imageUrl: string | null;
    };
};



export default function ProjectForm({
    mode,
    project,
}: ProjectFormProps) {
    const router = useRouter();

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const createProject = useMutation(
        api.projects.create,
    );

    const updateProject = useMutation(
        api.projects.update,
    );

    const generateUploadUrl = useMutation(
        api.projects.generateUploadUrl,
    );

    const isEditMode = mode === "edit";

    const [name, setName] = useState(
        project?.name ?? "",
    );



    const [description, setDescription] =
        useState(project?.description ?? "");


    const [type, setType] =
        useState<ProjectType>(
            project?.type ?? "WEB_DEVELOPMENT",
        );

    const [isFeatured, setIsFeatured] =
        useState(project?.isFeatured ?? false);

    const [isActive, setIsActive] =
        useState(project?.isActive ?? true);

    const [
        imageStorageId,
        setImageStorageId,
    ] = useState<Id<"_storage"> | null>(
        project?.imageStorageId ?? null,
    );

    const [imagePreview, setImagePreview] =
        useState<string | null>(
            project?.imageUrl ?? null,
        );

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [isUploadingImage, setIsUploadingImage] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (!project) {
            return;
        }

        setName(project.name);

        setDescription(project.description);

        setType(project.type);
        setIsFeatured(project.isFeatured);
        setIsActive(project.isActive);
        setImageStorageId(
            project.imageStorageId,
        );
        setImagePreview(
            project.imageUrl ?? null,
        );
    }, [project]);

    function handleNameChange(value: string) {
        setName(value)
    }

    function handleImageChange(
        file: File | undefined,
    ) {
        setError(null);

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError(
                "Please select a valid image file.",
            );
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(
                "Image size must be less than 5MB.",
            );
            return;
        }

        setSelectedFile(file);

        const previewUrl =
            URL.createObjectURL(file);

        setImagePreview(previewUrl);
    }

    function removeSelectedImage() {
        setSelectedFile(null);

        if (isEditMode && project?.imageUrl) {
            setImagePreview(project.imageUrl);
        } else {
            setImagePreview(null);
            setImageStorageId(null);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    async function uploadImage(file: File) {
        setIsUploadingImage(true);

        try {
            const uploadUrl =
                await generateUploadUrl();

            const result = await fetch(
                uploadUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": file.type,
                    },
                    body: file,
                },
            );

            if (!result.ok) {
                throw new Error(
                    "Failed to upload image.",
                );
            }

            const { storageId } =
                await result.json();

            return storageId as Id<"_storage">;
        } finally {
            setIsUploadingImage(false);
        }
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError(null);

        const trimmedName = name.trim();


        const trimmedDescription =
            description.trim();


        if (!trimmedName) {
            setError(
                "Project name is required.",
            );
            return;
        }



        if (!trimmedDescription) {
            setError(
                "Project description is required.",
            );
            return;
        }

        if (!imageStorageId && !selectedFile) {
            setError(
                "Project image is required.",
            );
            return;
        }



        if (isEditMode && !project) {
            setError(
                "Project data is missing.",
            );
            return;
        }

        try {
            setIsSubmitting(true);

            let finalImageStorageId =
                imageStorageId;

            if (selectedFile) {
                finalImageStorageId =
                    await uploadImage(
                        selectedFile,
                    );
            }

            if (!finalImageStorageId) {
                throw new Error(
                    "Project image is required.",
                );
            }

            if (isEditMode && project) {
                await updateProject({
                    id: project._id,
                    name: trimmedName,
                    description:
                        trimmedDescription,
                    imageStorageId:
                        finalImageStorageId,
                    type,
                    isFeatured,
                    isActive,
                });

                toast.success(
                    "Project updated successfully.",
                );
            } else {
                await createProject({
                    name: trimmedName,

                    description:
                        trimmedDescription,
                    imageStorageId: finalImageStorageId,
                    type,
                    isFeatured,
                    isActive,
                });

                toast.success(
                    "Project created successfully.",
                );
            }

            router.push(
                "/admin/dashboard/projects",
            );
        } catch (error) {
            console.error(
                "Project submission failed:",
                error,
            );

            const message =
                error instanceof Error
                    ? error.message
                    : isEditMode
                        ? "Failed to update project."
                        : "Failed to create project.";

            setError(message);

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const selectedTypeLabel =
        projectTypes.find(
            (item) => item.value === type,
        )?.label ?? "Select type";

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl"
        >
            <div className="rounded-lg border bg-card">

                {/* Form fields */}
                <div className="space-y-6 p-5 sm:p-6">
                    {/* Name + Type */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="project-name">
                                Project Name
                            </Label>

                            <Input
                                id="project-name"
                                value={name}
                                onChange={(event) =>
                                    handleNameChange(
                                        event.target.value,
                                    )
                                }
                                placeholder="Full Stack E-Commerce Website"
                                disabled={isSubmitting}
                                required
                                className="rounded"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project-type">
                                Project Type
                            </Label>

                            <Select
                                value={type}
                                onValueChange={(value) =>
                                    setType(value as ProjectType)
                                }
                                disabled={isSubmitting}
                            >
                                <SelectTrigger
                                    id="project-type"
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
                                    <SelectValue placeholder="Select project type" />
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
                                    {projectTypes.map((projectType) => (
                                        <SelectItem
                                            key={projectType.value}
                                            value={projectType.value}
                                            className="
                    cursor-pointer
                    rounded-sm
                    px-3
                    py-2
                    text-left
                    text-sm
                    font-medium
                    hover:text-primary
                    outline-none
                    data-[state=checked]:bg-primary/10
                    data-[state=checked]:text-primary
                "
                                        >
                                            {projectType.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label htmlFor="project-description">
                                Description
                            </Label>

                            <span className="text-[11px] text-muted-foreground">
                                {description.length}/1000
                            </span>
                        </div>

                        <Textarea
                            id="project-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value,
                                )
                            }
                            placeholder="Briefly describe what this project does, the problem it solves, and the technologies used."
                            rows={5}
                            maxLength={1000}
                            disabled={isSubmitting}
                            required
                            className=" rounded"
                        />
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="project-image">
                            Project Image
                        </Label>

                        <input
                            ref={fileInputRef}
                            id="project-image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) =>
                                handleImageChange(
                                    event.target.files?.[0],
                                )
                            }
                            disabled={
                                isSubmitting ||
                                isUploadingImage
                            }
                            className="hidden rounded"
                        />

                        <div className="flex min-h-10 items-center gap-3 rounded border bg-transparent px-3">
                            <ImagePlus className="size-4 shrink-0 text-muted-foreground" />

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={
                                    isSubmitting ||
                                    isUploadingImage
                                }
                                className="min-w-0 flex-1 truncate text-left text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-60"
                            >
                                {selectedFile?.name ??
                                    (imagePreview
                                        ? "Current project image"
                                        : "Choose project image")}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={
                                    isSubmitting ||
                                    isUploadingImage
                                }
                                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-60"
                            >
                                <Upload className="size-4" />
                                {isUploadingImage
                                    ? "Uploading..."
                                    : "Browse"}
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                            <span>
                                PNG, JPG or WEBP · Max 5MB
                            </span>

                            {selectedFile && (
                                <span>
                                    {(
                                        selectedFile.size /
                                        1024 /
                                        1024
                                    ).toFixed(2)}{" "}
                                    MB
                                </span>
                            )}
                        </div>

                        {/* Compact preview */}
                        {imagePreview && (
                            <div className="relative mt-3 overflow-hidden rounded-md border bg-muted/20">
                                <div className="relative aspect-[16/7] w-full">
                                    <Image
                                        src={imagePreview}
                                        alt="Project preview"
                                        fill
                                        unoptimized
                                        className="object-contain p-2"
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            removeSelectedImage
                                        }
                                        disabled={
                                            isSubmitting
                                        }
                                        aria-label="Remove image"
                                        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md border bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Project visibility / featured */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        {/* Featured */}
                        <button
                            type="button"
                            onClick={() =>
                                setIsFeatured(
                                    !isFeatured,
                                )
                            }
                            disabled={isSubmitting}
                            className={`flex items-center gap-3 bg-muted/30 rounded border px-4 py-3 text-left transition-colors`}

                        >
                            <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded border ${isFeatured
                                    ? "border-foreground bg-primary  text-background"
                                    : "bg-background"
                                    }`}
                            >
                                {isFeatured && (
                                    <Check className="size-3.5 " />
                                )}
                            </span>

                            <span className="min-w-0">
                                <span className="block text-sm font-medium">
                                    Featured Project
                                </span>

                                <span className="block text-xs text-muted-foreground">
                                    Show in featured section
                                </span>
                            </span>
                        </button>

                        {/* Public / Active */}
                        <button
                            type="button"
                            onClick={() =>
                                setIsActive(!isActive)
                            }
                            disabled={isSubmitting}
                            className={`flex items-center gap-3 rounded border bg-muted/30 px-4 py-3 text-left transition-colors `}
                        >
                            <span
                                className={`relative flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${isActive
                                    ? "border-foreground bg-primary"
                                    : "bg-muted"
                                    }`}
                            >
                                <span
                                    className={`absolute size-3.5 rounded-full bg-background transition-transform ${isActive
                                        ? "translate-x-[17px]"
                                        : "translate-x-[2px]"
                                        }`}
                                />
                            </span>

                            <span className="min-w-0">
                                <span className="block text-sm font-medium">
                                    {isActive
                                        ? "Public"
                                        : "Private"}
                                </span>

                                <span className="block text-xs text-muted-foreground">
                                    {isActive
                                        ? "Visible on your website"
                                        : "Hidden from your website"}
                                </span>
                            </span>
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            <X className="mt-0.5 size-4 shrink-0" />

                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            router.push("/admin/dashboard/projects")
                        }
                        disabled={isSubmitting || isUploadingImage}
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
                        disabled={isSubmitting || isUploadingImage}
                        className="
            h-11
            min-w-[170px]
            rounded-[12px]
            px-5
            text-base
            font-medium
        "
                    >
                        {isSubmitting || isUploadingImage ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />

                                {isUploadingImage
                                    ? "Uploading..."
                                    : isEditMode
                                        ? "Updating..."
                                        : "Creating..."}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 size-4" />

                                {isEditMode
                                    ? "Update Project"
                                    : "Create Project"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}