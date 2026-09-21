
"use client";

import { useRef, useState } from "react";

import { FileText, Loader2, Send, Upload, X } from "lucide-react";

import { useMutation } from "convex/react";

import { toast } from "react-hot-toast";

api

import { Button } from "@/components/ui/button";
import { api } from "../../../../convex/_generated/api";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const page = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const createClientRequest = useMutation(
        api.clientRequests.create
    );

    const generateUploadUrl = useMutation(
        api.clientRequests.generateUploadUrl
    );

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [projectDescription, setProjectDescription] =
        useState("");

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [isUploadingFile, setIsUploadingFile] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] = useState("");

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");

        if (file.type !== "application/pdf") {
            setError("Please upload a PDF file only.");

            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("PDF file size must be 10MB or less.");

            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadFile = async (
        file: File
    ) => {
        const uploadUrl =
            await generateUploadUrl();

        const result = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!result.ok) {
            throw new Error(
                "Failed to upload your PDF."
            );
        }

        const { storageId } = await result.json();

        return storageId;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) return;

        setError("");

        const trimmedName = clientName.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedService = serviceType.trim();
        const trimmedDescription =
            projectDescription.trim();

        if (!trimmedName) {
            setError("Please enter your name.");
            return;
        }

        if (!trimmedEmail) {
            setError("Please enter your email.");
            return;
        }

        if (!trimmedPhone) {
            setError("Please enter your phone number.");
            return;
        }

        if (!trimmedService) {
            setError("Please select a service.");
            return;
        }

        if (!trimmedDescription) {
            setError(
                "Please describe your project."
            );
            return;
        }

        try {
            setIsSubmitting(true);

            let attachmentStorageId:
                | string
                | undefined;

            if (selectedFile) {
                setIsUploadingFile(true);

                attachmentStorageId =
                    await uploadFile(selectedFile);

                setIsUploadingFile(false);
            }

            await createClientRequest({
                clientName: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                serviceType: trimmedService,
                projectDescription:
                    trimmedDescription,
                attachmentStorageId:
                    attachmentStorageId as
                    | undefined,
            });

            toast.success(
                "Your request has been sent successfully."
            );

            setClientName("");
            setEmail("");
            setPhone("");
            setServiceType("");
            setProjectDescription("");
            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error(
                "Failed to submit client request:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to submit your request."
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to submit your request."
            );
        } finally {
            setIsUploadingFile(false);
            setIsSubmitting(false);
        }
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
            {/* Heading */}
            <div className="mx-auto mb-8 max-w-4xl">
                <p className="text-sm font-medium text-primary">
                    Contact
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                    Start a Project
                </h1>

                <p className="mt-2 text-sm text-secondary">
                    Tell us about your project and we&apos;ll
                    get back to you soon.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-4xl"
            >
                <div className="rounded-lg border bg-card">
                    <div className="space-y-6 p-5 sm:p-6">
                        {/* Name + Email */}
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="clientName"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>

                                <input
                                    id="clientName"
                                    type="text"
                                    value={clientName}
                                    onChange={(event) =>
                                        setClientName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Your name"
                                    disabled={isSubmitting}
                                    className="w-full rounded border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    placeholder="you@example.com"
                                    disabled={isSubmitting}
                                    className="w-full rounded border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Phone + Service */}
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-medium"
                                >
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(
                                            event.target.value
                                        )
                                    }
                                    placeholder="+92 300 1234567"
                                    disabled={isSubmitting}
                                    className="w-full rounded border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="serviceType"
                                    className="text-sm font-medium"
                                >
                                    Service
                                </label>

                                <select
                                    id="serviceType"
                                    value={serviceType}
                                    onChange={(event) =>
                                        setServiceType(
                                            event.target.value
                                        )
                                    }
                                    disabled={isSubmitting}
                                    className="w-full rounded border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        Select a service
                                    </option>
                                    <option value="Web Development">
                                        Web Development
                                    </option>
                                    <option value="Full-Stack Development">
                                        Full-Stack Development
                                    </option>
                                    <option value="Frontend Development">
                                        Frontend Development
                                    </option>
                                    <option value="Backend Development">
                                        Backend Development
                                    </option>
                                    <option value="UI/UX Development">
                                        UI/UX Development
                                    </option>
                                    <option value="Website Maintenance">
                                        Website Maintenance
                                    </option>
                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <label
                                    htmlFor="projectDescription"
                                    className="text-sm font-medium"
                                >
                                    Project Description
                                </label>

                                <span className="text-[11px] text-muted-foreground">
                                    {
                                        projectDescription.length
                                    }
                                    /1000
                                </span>
                            </div>

                            <textarea
                                id="projectDescription"
                                value={projectDescription}
                                onChange={(event) =>
                                    setProjectDescription(
                                        event.target.value
                                    )
                                }
                                placeholder="Tell us about your project, requirements, goals, and timeline..."
                                rows={6}
                                maxLength={1000}
                                disabled={isSubmitting}
                                className="w-full resize-y rounded border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        {/* PDF Upload */}
                        <div className="space-y-2">
                            <div>
                                <label className="text-sm font-medium">
                                    Project Brief / PDF
                                </label>

                                <p className="mt-1 text-xs text-secondary">
                                    Optional. Upload your project
                                    requirements or brief.
                                </p>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                                className="hidden"
                            />

                            <div className="flex min-h-10 items-center gap-3 rounded border bg-transparent px-3">
                                <FileText className="size-4 shrink-0 text-muted-foreground" />

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isSubmitting}
                                    className="min-w-0 flex-1 truncate text-left text-sm text-secondary transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                                >
                                    {selectedFile?.name ??
                                        "Choose project PDF"}
                                </button>

                                {selectedFile ? (
                                    <button
                                        type="button"
                                        onClick={removeSelectedFile}
                                        disabled={isSubmitting}
                                        aria-label="Remove PDF"
                                        className="inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <X className="size-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        disabled={isSubmitting}
                                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <Upload className="size-4" />
                                        Browse
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                                <span>
                                    PDF only · Max 10MB
                                </span>

                                {selectedFile && (
                                    <span>
                                        {(
                                            selectedFile.size /
                                            (1024 * 1024)
                                        ).toFixed(2)}{" "}
                                        MB
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                <X className="mt-0.5 size-4 shrink-0" />

                                <p>{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={() => {
                                setClientName("");
                                setEmail("");
                                setPhone("");
                                setServiceType("");
                                setProjectDescription("");
                                setSelectedFile(null);
                                setError("");

                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                            className="
                                h-11
                                min-w-[120px]
                                rounded-[12px]
                                px-5
                                text-base
                                font-medium
                            "
                        >
                            Clear
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                isUploadingFile
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

                                    {isUploadingFile
                                        ? "Uploading..."
                                        : "Sending..."}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 size-4" />
                                    Send Request
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default page;

