
"use client";

import {
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    ArrowUpRight,
    Clock3,
    FileText,
    Globe2,
    Loader2,
    Mail,
    MapPin,
    Phone,
    Send,
    Upload,
    X,
} from "lucide-react";

import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { countryCodes } from "@/lib/country-codes";
import PageHeading from "@/components/shared/PageHeading";
import { PageDecorations } from "@/components/shared/PageDecorations";
import PageHero from "@/components/shared/PageHero";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_DESCRIPTION_LENGTH = 1000;

const SERVICES = [
    "Web Development",
    "Full-Stack Development",
    "Frontend Development",
    "Backend Development",
    "UI/UX Development",
    "Website Maintenance",
    "Other",
] as const;

type FormData = {
    clientName: string;
    email: string;
    country: string;
    countryCode: string;
    phone: string;
    serviceType: string;
    projectDescription: string;
};

const INITIAL_FORM_DATA: FormData = {
    clientName: "",
    email: "",
    country: "Pakistan",
    countryCode: "+92",
    phone: "+92",
    serviceType: "",
    projectDescription: "",
};

const ContactForm = () => {
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const createClientRequest = useMutation(
        api.clientRequests.create,
    );

    const generateUploadUrl = useMutation(
        api.clientRequests.generateUploadUrl,
    );

    const [formData, setFormData] =
        useState<FormData>(INITIAL_FORM_DATA);

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [isUploadingFile, setIsUploadingFile] =
        useState(false);

    const [error, setError] = useState("");

    const MIN_PHONE_DIGITS = 7;
    const MAX_PHONE_DIGITS = 15;

    const updateField = <K extends keyof FormData>(
        field: K,
        value: FormData[K],
    ) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_DATA);
        setSelectedFile(null);
        setError("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCountryChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        const selectedCountryName =
            event.target.value;

        const selectedCountry =
            countryCodes.find(
                (country) =>
                    country.name === selectedCountryName,
            );

        if (!selectedCountry) {
            return;
        }

        updateField(
            "country",
            selectedCountry.name,
        );

        updateField(
            "countryCode",
            selectedCountry.code,
        );

        updateField(
            "phone",
            selectedCountry.code,
        );
    };

    const handlePhoneChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const inputValue = event.target.value;

        const countryCode =
            formData.countryCode;

        // Remove everything except numbers.
        const digitsOnly =
            inputValue.replace(/\D/g, "");

        const countryCodeDigits =
            countryCode.replace(/\D/g, "");

        // Remove country code digits if
        // the user pasted/typed them.
        let localPhoneDigits = digitsOnly;

        if (
            localPhoneDigits.startsWith(
                countryCodeDigits,
            )
        ) {
            localPhoneDigits =
                localPhoneDigits.slice(
                    countryCodeDigits.length,
                );
        }

        // Maximum 15 digits INCLUDING country code.
        const maxLocalDigits =
            MAX_PHONE_DIGITS -
            countryCodeDigits.length;

        // Prevent the local number from exceeding
        // the international 15-digit limit.
        localPhoneDigits =
            localPhoneDigits.slice(
                0,
                Math.max(maxLocalDigits, 0),
            );

        updateField(
            "phone",
            countryCode + localPhoneDigits,
        );
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");

        if (file.type !== "application/pdf") {
            setError(
                "Please upload a PDF file only.",
            );

            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError(
                "PDF file size must be 10MB or less.",
            );

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
        file: File,
    ): Promise<Id<"_storage">> => {
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
                "Failed to upload your PDF. Please try again.",
            );
        }

        const data =
            (await result.json()) as {
                storageId: string;
            };

        if (!data.storageId) {
            throw new Error(
                "PDF upload failed. Please try again.",
            );
        }

        return data.storageId as Id<"_storage">;
    };

    const validateForm = () => {
        const name =
            formData.clientName.trim();

        const email =
            formData.email.trim();

        const phone =
            formData.phone.trim();

        const service =
            formData.serviceType.trim();

        const description =
            formData.projectDescription.trim();

        if (!name) {
            return "Please enter your name.";
        }

        if (name.length < 2) {
            return "Please enter a valid name.";
        }

        if (!email) {
            return "Please enter your email.";
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }

        if (
            !phone ||
            phone === formData.countryCode
        ) {
            return "Please enter your phone number.";
        }

        const phoneDigits =
            phone.replace(/\D/g, "");

        const countryCodeDigits =
            formData.countryCode.replace(
                /\D/g,
                "",
            );

        if (
            !phoneDigits.startsWith(
                countryCodeDigits,
            )
        ) {
            return "Please enter a valid phone number.";
        }

        const localPhoneDigits =
            phoneDigits.slice(
                countryCodeDigits.length,
            );

        if (
            localPhoneDigits.length <
            MIN_PHONE_DIGITS
        ) {
            return `Phone number must contain at least ${MIN_PHONE_DIGITS} digits.`;
        }

        if (
            phoneDigits.length >
            MAX_PHONE_DIGITS
        ) {
            return `Phone number cannot contain more than ${MAX_PHONE_DIGITS} digits.`;
        }

        if (!/^\d+$/.test(localPhoneDigits)) {
            return "Phone number can contain numbers only.";
        }

        if (!service) {
            return "Please select a service.";
        }

        if (!description) {
            return "Please describe your project.";
        }

        if (
            description.length >
            MAX_DESCRIPTION_LENGTH
        ) {
            return `Project description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`;
        }

        return null;
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setError("");

        const validationError =
            validateForm();

        if (validationError) {
            setError(validationError);

            toast.error(validationError);

            return;
        }

        try {
            setIsSubmitting(true);

            let attachmentStorageId:
                | Id<"_storage">
                | undefined;

            if (selectedFile) {
                setIsUploadingFile(true);

                attachmentStorageId =
                    await uploadFile(
                        selectedFile,
                    );

                setIsUploadingFile(false);
            }

            await createClientRequest({
                clientName:
                    formData.clientName.trim(),

                email:
                    formData.email
                        .trim()
                        .toLowerCase(),

                phone:
                    formData.phone.trim(),

                country:
                    formData.country,

                countryCode:
                    formData.countryCode,

                serviceType:
                    formData.serviceType.trim(),

                projectDescription:
                    formData.projectDescription.trim(),

                attachmentStorageId,
            });

            toast.success(
                "Your project request has been sent successfully.",
            );

            resetForm();
        } catch (error) {
            console.error(
                "Failed to submit client request:",
                error,
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to submit your request. Please try again.";

            setError(message);

            toast.error(message);
        } finally {
            setIsUploadingFile(false);
            setIsSubmitting(false);
        }
    };
    return (
        <>
            {/* =====================================================
                DIVIDER
            ====================================================== */}

            <div className="divider" />

            {/* =====================================================
                CONTACT CONTENT
            ====================================================== */}

            <section className="section">
                <div
                    className="
                        container
                        grid
                        gap-14
                        lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]
                        lg:gap-20
                        xl:gap-28
                    "
                >
                    {/* =================================================
                        LEFT — FORM
                    ================================================== */}

                    <div>


                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="w-full"
                        >
                            <div className="space-y-7">
                                {/* Name + Email */}

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2.5">
                                        <label
                                            htmlFor="clientName"
                                            className="
                                                text-[11px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.16em]
                                                text-muted-foreground
                                            "
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="clientName"
                                            name="clientName"
                                            type="text"
                                            autoComplete="name"
                                            value={
                                                formData.clientName
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "clientName",
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Your name"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                                px-4
                                                py-3.5
                                                text-sm
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        />
                                    </div>

                                    <div className="space-y-2.5">
                                        <label
                                            htmlFor="email"
                                            className="
                                                text-[11px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.16em]
                                                text-muted-foreground
                                            "
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={
                                                formData.email
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "email",
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="you@example.com"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                                px-4
                                                py-3.5
                                                text-sm
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2.5">
                                        <label
                                            htmlFor="phone"
                                            className="
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.16em]
                                            text-muted-foreground
                                        "
                                        >
                                            Phone Number
                                        </label>

                                        <div
                                            className="
                                            grid
                                            grid-cols-[minmax(0,155px)_1fr]
                                            overflow-hidden
                                            rounded-[var(--radius-md)]
                                            border
                                            border-[var(--border)]
                                            bg-[var(--surface)]
                                            transition-colors
                                            focus-within:border-[var(--primary)]
                                            focus-within:shadow-[0_0_0_3px_rgba(245,185,66,0.1)]
                                        "
                                        >
                                            <select
                                                id="country"
                                                name="country"
                                                aria-label="Country"
                                                value={
                                                    formData.country
                                                }
                                                onChange={
                                                    handleCountryChange
                                                }
                                                disabled={
                                                    isSubmitting
                                                }
                                                className="
                                                min-w-0
                                                rounded-none
                                                border-0
                                                border-r
                                                border-[var(--border)]
                                                bg-transparent
                                                px-3
                                                py-3.5
                                                text-sm
                                                outline-none
                                                focus:border-0
                                                focus:shadow-none
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            >
                                                {countryCodes.map(
                                                    ({
                                                        name,
                                                        code,
                                                        flag,
                                                    }) => (
                                                        <option
                                                            key={`${name}-${code}`}
                                                            value={name}
                                                        >
                                                            {flag}{" "}
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                inputMode="numeric"
                                                autoComplete="tel"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handlePhoneChange
                                                }
                                                maxLength={
                                                    formData.countryCode.replace(
                                                        /\D/g,
                                                        "",
                                                    ).length +
                                                    (
                                                        MAX_PHONE_DIGITS -
                                                        formData.countryCode.replace(
                                                            /\D/g,
                                                            "",
                                                        ).length
                                                    )
                                                }
                                                pattern="[0-9+]*"
                                                placeholder={`${formData.countryCode} 300 1234567`}
                                                disabled={
                                                    isSubmitting
                                                }
                                                className="
                                                min-w-0
                                                rounded-none
                                                border-0
                                                bg-transparent
                                                px-4
                                                py-3.5
                                                text-sm
                                                outline-none
                                                focus:border-0
                                                focus:shadow-none
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            />
                                        </div>

                                        <p className="text-[11px] text-muted-foreground">
                                            Select your country
                                            and enter your phone
                                            number.
                                        </p>
                                    </div>

                                    {/* Service */}

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="serviceType"
                                            className="
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.16em]
                                            text-muted-foreground
                                        "
                                        >
                                            Service
                                        </label>

                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={
                                                formData.serviceType
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "serviceType",
                                                    event.target.value,
                                                )
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                            px-4
                                            py-3.5
                                            text-sm
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                        >
                                            <option value="">
                                                Select a service
                                            </option>

                                            {SERVICES.map(
                                                (service) => (
                                                    <option
                                                        key={service}
                                                        value={service}
                                                    >
                                                        {service}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>


                                {/* Project Description */}

                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between gap-3">
                                        <label
                                            htmlFor="projectDescription"
                                            className="
                                                text-[11px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.16em]
                                                text-muted-foreground
                                            "
                                        >
                                            Project Description
                                        </label>

                                        <span className="text-[11px] text-muted-foreground">
                                            {
                                                formData
                                                    .projectDescription
                                                    .length
                                            }
                                            /
                                            {
                                                MAX_DESCRIPTION_LENGTH
                                            }
                                        </span>
                                    </div>

                                    <textarea
                                        id="projectDescription"
                                        name="projectDescription"
                                        value={
                                            formData.projectDescription
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "projectDescription",
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Tell me about your project, requirements, goals, features, and timeline..."
                                        rows={7}
                                        maxLength={
                                            MAX_DESCRIPTION_LENGTH
                                        }
                                        disabled={
                                            isSubmitting
                                        }
                                        className="
                                            min-h-[180px]
                                            resize-y
                                            px-4
                                            py-3.5
                                            text-sm
                                            leading-6
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    />
                                </div>

                                {/* PDF Upload */}

                                <div className="space-y-2.5">
                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <label
                                                className="
                                                    text-[11px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-muted-foreground
                                                "
                                            >
                                                Project Brief / PDF
                                            </label>

                                            <p className="mt-1.5 text-xs text-secondary">
                                                Optional. Upload
                                                your requirements,
                                                brief, or reference
                                                document.
                                            </p>
                                        </div>

                                        <span className="hidden shrink-0 text-[11px] text-muted-foreground sm:block">
                                            PDF · Max 10MB
                                        </span>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        onChange={
                                            handleFileChange
                                        }
                                        disabled={
                                            isSubmitting
                                        }
                                        className="hidden"
                                    />

                                    <div
                                        className="
                                            flex
                                            min-h-[58px]
                                            items-center
                                            gap-3
                                            rounded-[var(--radius-md)]
                                            border
                                            border-[var(--border)]
                                            bg-[var(--surface)]
                                            px-4
                                            transition-colors
                                            hover:border-[var(--border-hover)]
                                        "
                                    >
                                        <FileText className="size-4 shrink-0 text-primary" />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            disabled={
                                                isSubmitting
                                            }
                                            className="
                                                min-w-0
                                                flex-1
                                                truncate
                                                text-left
                                                text-sm
                                                text-secondary
                                                transition-colors
                                                hover:text-foreground
                                                disabled:pointer-events-none
                                                disabled:opacity-50
                                            "
                                        >
                                            {selectedFile?.name ??
                                                "Choose project PDF"}
                                        </button>

                                        {selectedFile ? (
                                            <button
                                                type="button"
                                                onClick={
                                                    removeSelectedFile
                                                }
                                                disabled={
                                                    isSubmitting
                                                }
                                                aria-label="Remove PDF"
                                                className="
                                                    inline-flex
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    p-1.5
                                                    text-muted-foreground
                                                    transition-colors
                                                    hover:text-destructive
                                                    disabled:pointer-events-none
                                                    disabled:opacity-50
                                                "
                                            >
                                                <X className="size-4" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                disabled={
                                                    isSubmitting
                                                }
                                                className="
                                                    inline-flex
                                                    shrink-0
                                                    items-center
                                                    gap-1.5
                                                    text-sm
                                                    font-medium
                                                    text-secondary
                                                    transition-colors
                                                    hover:text-foreground
                                                    disabled:pointer-events-none
                                                    disabled:opacity-50
                                                "
                                            >
                                                <Upload className="size-4" />

                                                Browse
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground sm:hidden">
                                        <span>
                                            PDF only
                                        </span>

                                        <span>
                                            Max 10MB
                                        </span>
                                    </div>

                                    {selectedFile && (
                                        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                                            <span>
                                                Ready to upload
                                            </span>

                                            <span>
                                                {(
                                                    selectedFile.size /
                                                    (1024 * 1024)
                                                ).toFixed(
                                                    2,
                                                )}{" "}
                                                MB
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Error */}

                                {error && (
                                    <div
                                        role="alert"
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            rounded-[var(--radius-md)]
                                            border
                                            border-destructive/20
                                            bg-destructive/5
                                            px-4
                                            py-3
                                            text-sm
                                            text-destructive
                                        "
                                    >
                                        <X className="mt-0.5 size-4 shrink-0" />

                                        <p className="text-destructive">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}

                                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        disabled={
                                            isSubmitting
                                        }
                                        onClick={resetForm}
                                        className="
                                            custom-btn-outline
                                            w-full
                                            sm:w-auto
                                        "
                                    >
                                        Clear
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={
                                            isSubmitting ||
                                            isUploadingFile
                                        }
                                        className="
                                            custom-btn
                                            w-full
                                            sm:min-w-[190px]
                                            sm:w-auto
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
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* =================================================
                        RIGHT — CONTACT INFORMATION
                    ================================================== */}

                    <aside className="lg:pt-[104px]">
                        <div className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]">
                            <div className="mb-8">
                                <p className="section-label">
                                    Let&apos;s connect
                                </p>

                                <h2 className="mt-5 text-2xl sm:text-3xl">
                                    Have an idea?
                                </h2>

                                <p className="mt-4 text-sm leading-6 text-secondary">
                                    Whether you&apos;re starting
                                    something new or improving
                                    an existing product, share
                                    the details and let&apos;s
                                    discuss how I can help.
                                </p>
                            </div>

                            <div className="divider" />

                            {/* Availability */}

                            <div className="flex gap-4 py-6">
                                <div
                                    className="
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        text-primary
                                    "
                                >
                                    <Clock3 className="size-[18px]" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold">
                                        Response time
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-secondary">
                                        I&apos;ll review your
                                        project request and
                                        respond as soon as
                                        possible.
                                    </p>
                                </div>
                            </div>

                            <div className="divider" />

                            {/* Location */}

                            <div className="flex gap-4 py-6">
                                <div
                                    className="
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        text-primary
                                    "
                                >
                                    <MapPin className="size-[18px]" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold">
                                        Based in Pakistan
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-secondary">
                                        Working with clients
                                        remotely across
                                        different locations
                                        and time zones.
                                    </p>
                                </div>
                            </div>

                            <div className="divider" />

                            {/* Email */}

                            <div className="flex gap-4 py-6">
                                <div
                                    className="
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        text-primary
                                    "
                                >
                                    <Mail className="size-[18px]" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold">
                                        Project requests
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-secondary">
                                        Use the form to send
                                        your project details
                                        directly. Your request
                                        will be securely stored
                                        for review.
                                    </p>
                                </div>
                            </div>

                            <div className="divider" />

                            {/* Global */}

                            <div className="flex gap-4 py-6">
                                <div
                                    className="
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        text-primary
                                    "
                                >
                                    <Globe2 className="size-[18px]" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold">
                                        Global collaboration
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-secondary">
                                        Web development,
                                        full-stack applications,
                                        and digital products
                                        for clients worldwide.
                                    </p>
                                </div>
                            </div>

                            <div className="divider" />

                            {/* GitHub / portfolio link */}

                            <a
                                href="https://github.com/asia272"
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    group
                                    mt-6
                                    flex
                                    items-center
                                    justify-between
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border)]
                                    bg-[var(--surface)]
                                    px-4
                                    py-4
                                    transition-all
                                    duration-300
                                    hover:border-[var(--border-hover)]
                                    hover:bg-[var(--surface-hover)]
                                "
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            size-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[var(--primary-soft)]
                                            text-primary
                                        "
                                    >
                                        <Globe2 className="size-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-primary">
                                            View my work
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            github.com/asia272
                                        </p>
                                    </div>
                                </div>

                                <ArrowUpRight
                                    className="
                                        size-4
                                        shrink-0
                                        text-muted-foreground
                                        transition-transform
                                        duration-300
                                        group-hover:-translate-y-0.5
                                        group-hover:translate-x-0.5
                                        group-hover:text-primary
                                    "
                                />
                            </a>
                        </div>
                    </aside>
                </div>
            </section></>
    )
}

export default ContactForm