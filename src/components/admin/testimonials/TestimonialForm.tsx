
"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";

import {
    Check,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type TestimonialFormProps = {
    mode: "create" | "edit";

    testimonial?: Doc<"testimonials"> & {
        imageUrl: string | null;
    };
};

export default function TestimonialForm({
    mode,
    testimonial,
}: TestimonialFormProps) {
    const router = useRouter();

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const createTestimonial =
        useMutation(
            api.testimonials.create,
        );

    const updateTestimonial =
        useMutation(
            api.testimonials.update,
        );

    const generateUploadUrl =
        useMutation(
            api.testimonials.generateUploadUrl,
        );

    const isEditMode =
        mode === "edit";

    const [name, setName] =
        useState(
            testimonial?.name ?? "",
        );

    const [role, setRole] =
        useState(
            testimonial?.role ?? "",
        );

    const [company, setCompany] =
        useState(
            testimonial?.company ?? "",
        );

    const [message, setMessage] =
        useState(
            testimonial?.message ?? "",
        );

    const [rating, setRating] =
        useState(
            testimonial?.rating ?? 5,
        );

    const [isActive, setIsActive] =
        useState(
            testimonial?.isActive ?? true,
        );

    const [
        imageStorageId,
        setImageStorageId,
    ] = useState<Id<"_storage"> | null>(
        testimonial?.imageStorageId ??
        null,
    );

    const [
        imagePreview,
        setImagePreview,
    ] = useState<string | null>(
        testimonial?.imageUrl ?? null,
    );

    const [
        selectedFile,
        setSelectedFile,
    ] = useState<File | null>(null);

    const [
        isUploadingImage,
        setIsUploadingImage,
    ] = useState(false);

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    /*
     * Keep form synchronized when the
     * testimonial data changes.
     */
    useEffect(() => {
        if (!testimonial) {
            return;
        }

        setName(
            testimonial.name,
        );

        setRole(
            testimonial.role ?? "",
        );

        setCompany(
            testimonial.company ?? "",
        );

        setMessage(
            testimonial.message,
        );

        setRating(
            testimonial.rating,
        );

        setIsActive(
            testimonial.isActive,
        );

        setImageStorageId(
            testimonial.imageStorageId ??
            null,
        );

        setImagePreview(
            testimonial.imageUrl ??
            null,
        );

        setSelectedFile(null);
    }, [testimonial]);

    /*
     * Clean up local object URLs.
     */
    useEffect(() => {
        return () => {
            if (
                imagePreview?.startsWith(
                    "blob:",
                )
            ) {
                URL.revokeObjectURL(
                    imagePreview,
                );
            }
        };
    }, [imagePreview]);

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

        const maxSize =
            5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(
                "Image size must be less than 5MB.",
            );
            return;
        }

        /*
         * Revoke previous local preview.
         */
        if (
            imagePreview?.startsWith(
                "blob:",
            )
        ) {
            URL.revokeObjectURL(
                imagePreview,
            );
        }

        const previewUrl =
            URL.createObjectURL(file);

        setSelectedFile(file);
        setImagePreview(previewUrl);
    }

    function removeSelectedImage() {
        setSelectedFile(null);

        /*
         * Edit mode:
         * restore the original image.
         */
        if (
            isEditMode &&
            testimonial
        ) {
            setImagePreview(
                testimonial.imageUrl ??
                null,
            );

            setImageStorageId(
                testimonial.imageStorageId ??
                null,
            );
        } else {
            /*
             * Create mode:
             * completely remove image.
             */
            setImagePreview(null);
            setImageStorageId(null);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value =
                "";
        }
    }

    async function uploadImage(
        file: File,
    ) {
        setIsUploadingImage(true);

        try {
            const uploadUrl =
                await generateUploadUrl();

            const result =
                await fetch(
                    uploadUrl,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                file.type,
                        },

                        body: file,
                    },
                );

            if (!result.ok) {
                throw new Error(
                    "Failed to upload image.",
                );
            }

            const {
                storageId,
            } =
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

        const trimmedCompany =
            company.trim();

        const trimmedMessage =
            message.trim();

        /*
         * Validation
         */
        if (!trimmedName) {
            setError(
                "Client name is required.",
            );
            return;
        }

        if (!trimmedMessage) {
            setError(
                "Testimonial message is required.",
            );
            return;
        }

        if (
            rating < 1 ||
            rating > 5
        ) {
            setError(
                "Rating must be between 1 and 5.",
            );
            return;
        }

        if (
            isEditMode &&
            !testimonial
        ) {
            setError(
                "Testimonial data is missing.",
            );
            return;
        }

        try {
            setIsSubmitting(true);

            let finalImageStorageId =
                imageStorageId;

            /*
             * Upload a new image only
             * when the user selected one.
             */
            if (selectedFile) {
                finalImageStorageId =
                    await uploadImage(
                        selectedFile,
                    );
            }

            if (isEditMode && testimonial) {
                await updateTestimonial({
                    id: testimonial._id,

                    name: trimmedName,

                    role:
                        trimmedRole ||
                        undefined,

                    company:
                        trimmedCompany ||
                        undefined,

                    message:
                        trimmedMessage,

                    rating,

                    imageStorageId:
                        finalImageStorageId ??
                        undefined,

                    isActive,
                });

                toast.success(
                    "Testimonial updated successfully.",
                );
            } else {
                await createTestimonial({
                    name: trimmedName,

                    role:
                        trimmedRole ||
                        undefined,

                    company:
                        trimmedCompany ||
                        undefined,

                    message:
                        trimmedMessage,

                    rating,

                    imageStorageId:
                        finalImageStorageId ??
                        undefined,

                    isActive,
                });

                toast.success(
                    "Testimonial created successfully.",
                );
            }

            router.push(
                "/admin/dashboard/testimonials",
            );
        } catch (error) {
            console.error(
                "Testimonial submission failed:",
                error,
            );

            const message =
                error instanceof Error
                    ? error.message
                    : isEditMode
                        ? "Failed to update testimonial."
                        : "Failed to create testimonial.";

            setError(message);

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const isBusy =
        isSubmitting ||
        isUploadingImage;

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

                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="testimonial-name">
                                Client Name
                            </Label>

                            <Input
                                id="testimonial-name"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value,
                                    )
                                }
                                placeholder="Name..."
                                disabled={isBusy}
                                required
                                className="rounded"
                            />
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label htmlFor="testimonial-role">
                                Role
                                <span className="ml-1 text-xs text-muted-foreground">
                                    (Optional)
                                </span>
                            </Label>

                            <Input
                                id="testimonial-role"
                                value={role}
                                onChange={(event) =>
                                    setRole(
                                        event.target.value,
                                    )
                                }
                                placeholder="Founder / CEO"
                                disabled={isBusy}
                                className="rounded"
                            />
                        </div>
                    </div>

                    {/* Company + Rating */}
                    <div className="grid gap-5 md:grid-cols-2">

                        {/* Company */}
                        <div className="space-y-2">
                            <Label htmlFor="testimonial-company">
                                Company
                                <span className="ml-1 text-xs text-muted-foreground">
                                    (Optional)
                                </span>
                            </Label>

                            <Input
                                id="testimonial-company"
                                value={company}
                                onChange={(event) =>
                                    setCompany(
                                        event.target.value,
                                    )
                                }
                                placeholder="Company Name"
                                disabled={isBusy}
                                className="rounded"
                            />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <Label htmlFor="testimonial-rating">
                                Rating
                            </Label>

                            <Select
                                value={String(
                                    rating,
                                )}
                                onValueChange={(
                                    value,
                                ) =>
                                    setRating(
                                        Number(
                                            value,
                                        ),
                                    )
                                }
                                disabled={isBusy}
                            >
                                <SelectTrigger
                                    id="testimonial-rating"
                                    className="
                                    h-10
                                        w-full
                                        rounded
                                        border
                                        border-border
                                        bg-transparent
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        text-foreground
                                        shadow-none
                                        focus:border-primary
                                        focus:ring-0
                                    "
                                >
                                    <SelectValue />
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
                                    {[1, 2, 3, 4, 5].map(
                                        (value) => (
                                            <SelectItem
                                                key={value}
                                                value={String(
                                                    value,
                                                )}
                                                className="
                                                    cursor-pointer
                                                    rounded-sm
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    outline-none
                                                    hover:text-primary
                                                    data-[state=checked]:bg-primary/10
                                                    data-[state=checked]:text-primary
                                                "
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>
                                                        {"★".repeat(
                                                            value,
                                                        )}
                                                    </span>

                                                    <span className="text-muted-foreground">
                                                        {value}{" "}
                                                        {value ===
                                                            1
                                                            ? "Star"
                                                            : "Stars"}
                                                    </span>
                                                </span>
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label htmlFor="testimonial-message">
                                Testimonial
                            </Label>

                            <span className="text-[11px] text-muted-foreground">
                                {message.length}/1000
                            </span>
                        </div>

                        <Textarea
                            id="testimonial-message"
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value,
                                )
                            }
                            placeholder="Write the client's testimonial..."
                            rows={6}
                            maxLength={1000}
                            disabled={isBusy}
                            required
                            className="rounded"
                        />
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="testimonial-image">
                            Client Image
                            <span className="ml-1 text-xs text-muted-foreground">
                                (Optional)
                            </span>
                        </Label>

                        <input
                            ref={fileInputRef}
                            id="testimonial-image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) =>
                                handleImageChange(
                                    event.target.files?.[0],
                                )
                            }
                            disabled={isBusy}
                            className="hidden"
                        />

                        <div className="flex min-h-10 items-center gap-3 rounded border bg-transparent px-3">

                            <ImagePlus className="size-4 shrink-0 text-muted-foreground" />

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={isBusy}
                                className="min-w-0 flex-1 truncate text-left text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-60"
                            >
                                {selectedFile?.name ??
                                    (imagePreview
                                        ? "Current client image"
                                        : "Choose client image")}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={isBusy}
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

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative mt-3 overflow-hidden rounded-md border bg-muted/20">
                                <div className="relative aspect-[16/7] w-full">

                                    <Image
                                        src={imagePreview}
                                        alt="Client preview"
                                        fill
                                        unoptimized
                                        className="object-contain p-2"
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            removeSelectedImage
                                        }
                                        disabled={isBusy}
                                        aria-label="Remove image"
                                        className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-md border bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Public / Active */}
                    <div className="flex items-center justify-between gap-4 rounded border bg-muted/30 px-4 py-3">
                        <div className="min-w-0">
                            <p className="text-sm font-medium">
                                {isActive ? "Public" : "Private"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {isActive
                                    ? "Visible on your website"
                                    : "Hidden from your website"}
                            </p>
                        </div>

                        <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                            disabled={isBusy}
                            aria-label="Toggle testimonial visibility"
                        />
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
                            router.push(
                                "/admin/dashboard/testimonials",
                            )
                        }
                        disabled={isBusy}
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
                        disabled={isBusy}
                        className="
                            h-11
                            min-w-[180px]
                            rounded-[12px]
                            px-5
                            text-base
                            font-medium
                        "
                    >
                        {isBusy ? (
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
                                    ? "Update Testimonial"
                                    : "Create Testimonial"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
