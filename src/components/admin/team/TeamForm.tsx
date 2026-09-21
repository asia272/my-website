"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
    ImagePlus,
    Loader2,
    Save,
    Upload,
    X,
} from "lucide-react";

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

type TeamFormProps = {
    mode: "create" | "edit";
    teamMember?: Doc<"teamMembers"> & {
        imageUrl: string | null;
    };
};

export default function TeamForm({
    mode,
    teamMember,
}: TeamFormProps) {
    const router = useRouter();

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const createTeamMember = useMutation(
        api.teamMembers.create,
    );

    const updateTeamMember = useMutation(
        api.teamMembers.update,
    );

    const generateUploadUrl = useMutation(
        api.teamMembers.generateUploadUrl,
    );

    const isEditMode = mode === "edit";

    const [name, setName] = useState(
        teamMember?.name ?? "",
    );

    const [role, setRole] = useState(
        teamMember?.role ?? "",
    );

    const [description, setDescription] =
        useState(
            teamMember?.description ?? "",
        );

    const [isActive, setIsActive] =
        useState(
            teamMember?.isActive ?? true,
        );

    const [
        imageStorageId,
        setImageStorageId,
    ] = useState<Id<"_storage"> | null>(
        teamMember?.imageStorageId ?? null,
    );

    const [imagePreview, setImagePreview] =
        useState<string | null>(
            teamMember?.imageUrl ?? null,
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
        if (!teamMember) {
            return;
        }

        setName(teamMember.name);
        setRole(teamMember.role);
        setDescription(teamMember.description);
        setIsActive(teamMember.isActive);

        setImageStorageId(
            teamMember.imageStorageId,
        );

        setImagePreview(
            teamMember.imageUrl ?? null,
        );
    }, [teamMember]);

    function handleNameChange(value: string) {
        setName(value);
    }

    function handleRoleChange(value: string) {
        setRole(value);
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

        if (
            isEditMode &&
            teamMember?.imageUrl
        ) {
            setImagePreview(
                teamMember.imageUrl,
            );
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

        const trimmedName =
            name.trim();

        const trimmedRole =
            role.trim();

        const trimmedDescription =
            description.trim();

        if (!trimmedName) {
            setError(
                "Team member name is required.",
            );
            return;
        }

        if (!trimmedRole) {
            setError(
                "Team member role is required.",
            );
            return;
        }

        if (!trimmedDescription) {
            setError(
                "Team member description is required.",
            );
            return;
        }

        if (
            !imageStorageId &&
            !selectedFile
        ) {
            setError(
                "Team member image is required.",
            );
            return;
        }

        if (
            isEditMode &&
            !teamMember
        ) {
            setError(
                "Team member data is missing.",
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
                    "Team member image is required.",
                );
            }

            if (
                isEditMode &&
                teamMember
            ) {
                await updateTeamMember({
                    id: teamMember._id,
                    name: trimmedName,
                    role: trimmedRole,
                    description:
                        trimmedDescription,
                    imageStorageId:
                        finalImageStorageId,
                    isActive,
                });

                toast.success(
                    "Team member updated successfully.",
                );
            } else {
                await createTeamMember({
                    name: trimmedName,
                    role: trimmedRole,
                    description:
                        trimmedDescription,
                    imageStorageId:
                        finalImageStorageId,
                    isActive,
                });

                toast.success(
                    "Team member created successfully.",
                );
            }

            router.push(
                "/admin/dashboard/team",
            );
        } catch (error) {
            console.error(
                "Team member submission failed:",
                error,
            );

            const message =
                error instanceof Error
                    ? error.message
                    : isEditMode
                        ? "Failed to update team member."
                        : "Failed to create team member.";

            setError(message);

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl"
        >
            <div className="rounded-lg border bg-card">
                {/* Form fields */}
                <div className="space-y-6 p-5 sm:p-6">
                    {/* Name + Role */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="team-member-name">
                                Name
                            </Label>

                            <Input
                                id="team-member-name"
                                value={name}
                                onChange={(event) =>
                                    handleNameChange(
                                        event.target.value,
                                    )
                                }
                                placeholder="Asia Ashraf"
                                disabled={
                                    isSubmitting
                                }
                                required
                                className="rounded"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="team-member-role">
                                Role
                            </Label>

                            <Input
                                id="team-member-role"
                                value={role}
                                onChange={(event) =>
                                    handleRoleChange(
                                        event.target.value,
                                    )
                                }
                                placeholder="Full-Stack Developer"
                                disabled={
                                    isSubmitting
                                }
                                required
                                className="rounded"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label htmlFor="team-member-description">
                                Description
                            </Label>

                            <span className="text-[11px] text-muted-foreground">
                                {description.length}/1000
                            </span>
                        </div>

                        <Textarea
                            id="team-member-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value,
                                )
                            }
                            placeholder="Briefly describe this team member, their role, experience, and responsibilities."
                            rows={5}
                            maxLength={1000}
                            disabled={
                                isSubmitting
                            }
                            required
                            className="rounded"
                        />
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="team-member-image">
                            Team Member Image
                        </Label>

                        <input
                            ref={fileInputRef}
                            id="team-member-image"
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
                                        ? "Current team member image"
                                        : "Choose team member image")}
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
                                PNG, JPG or WEBP · Max
                                5MB
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
                                        src={
                                            imagePreview
                                        }
                                        alt="Team member preview"
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

                    {/* Public / Active */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsActive(
                                !isActive,
                            )
                        }
                        disabled={
                            isSubmitting
                        }
                        className="flex w-full items-center gap-3 rounded border bg-muted/30 px-4 py-3 text-left transition-colors"
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
                            router.push(
                                "/admin/dashboard/team",
                            )
                        }
                        disabled={
                            isSubmitting ||
                            isUploadingImage
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
                            isSubmitting ||
                            isUploadingImage
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
                        {isSubmitting ||
                            isUploadingImage ? (
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
                                    ? "Update Team Member"
                                    : "Create Team Member"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}