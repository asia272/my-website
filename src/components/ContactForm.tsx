
"use client";



import {
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    FileText,
    Loader2,
    Send,
    Upload,
    X,
} from "lucide-react";

import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { countryCodes } from "@/lib/country-codes";
import { sendClientRequestEmails } from "@/actions/client-request-email";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

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
    const fileInputRef = useRef<HTMLInputElement>(null);

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

        const digitsOnly =
            inputValue.replace(/\D/g, "");

        const countryCodeDigits =
            countryCode.replace(/\D/g, "");

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

        const maxLocalDigits =
            MAX_PHONE_DIGITS -
            countryCodeDigits.length;

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

            const {
                requestId,
                attachmentUrl,
            } =
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

            try {
                await sendClientRequestEmails({
                    clientName:
                        formData.clientName.trim(),

                    email:
                        formData.email
                            .trim()
                            .toLowerCase(),

                    phone:
                        formData.phone.trim(),

                    serviceType:
                        formData.serviceType.trim(),

                    projectDescription:
                        formData.projectDescription.trim(),

                    attachmentUrl,
                });
            } catch (emailError) {
                console.error(
                    "Client request was created, but email sending failed:",
                    emailError,
                );
            }

            toast.success(
                "Your request has been sent successfully!",
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
        <div>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full"
            >
                <div className="space-y-7">

                    {/* Name + Email */}
                    <div className="grid gap-6 sm:grid-cols-2">

                        <div className="space-y-3">
                            <label
                                htmlFor="clientName"
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-muted-foreground
                                    mb-2
                                    block
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
                                    h-[46px]
                                    px-4
                                    py-3
                                    text-sm
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            />
                        </div>

                        <div className="space-y-3">
                            <label
                                htmlFor="email"
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    mb-2
                                    block
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
                                    h-[46px]
                                    px-4
                                    py-3
                                    text-sm
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            />
                        </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid gap-5 md:grid-cols-2">

                        {/* Phone */}
                        <div className="space-y-3">
                            <label
                                htmlFor="phone"
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-muted-foreground
                                    mb-2
                                    block
                                "
                            >
                                Phone Number
                            </label>

                            <div className="phone-control">
                                <Select
                                    value={
                                        formData.country
                                    }
                                    onValueChange={(value) => {
                                        const selectedCountry =
                                            countryCodes.find(
                                                (country) =>
                                                    country.name ===
                                                    value,
                                            );

                                        if (
                                            !selectedCountry
                                        ) {
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
                                    }}
                                    disabled={
                                        isSubmitting
                                    }
                                >
                                    <SelectTrigger
                                        id="country"
                                        aria-label="Country"
                                        className="
                                            h-[44px]
                                            min-h-[44px]
                                            min-w-0
                                            w-full
                                            shrink-0
                                            rounded-none
                                            border-0
                                            border-r
                                            border-[var(--border)]
                                            bg-transparent
                                            px-3
                                            py-0
                                            text-sm
                                            shadow-none
                                            outline-none
                                            transition-colors
                                            hover:bg-[var(--muted)]
                                            focus:border-0
                                            focus:ring-0
                                            focus:ring-offset-0
                                            focus:outline-none
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            [&>svg]:size-4
                                            [&>svg]:shrink-0
                                        "
                                    >
                                        <SelectValue>
                                            {
                                                countryCodes.find(
                                                    (country) =>
                                                        country.name ===
                                                        formData.country,
                                                )?.flag
                                            }
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent
                                        sideOffset={6}
                                        alignItemWithTrigger={false}
                                        side="bottom"
                                        align="start"
                                        className="
                                            z-50
                                            max-h-[280px]
                                            min-w-[280px]
                                            overflow-y-auto
                                            rounded-[var(--radius-md)]
                                            border
                                            border-[var(--border)]
                                            bg-[var(--surface)]
                                            p-1.5
                                            text-[var(--text-primary)]
                                            shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                                        "
                                    >
                                        {countryCodes.map(
                                            ({
                                                name,
                                                code,
                                                flag,
                                            }) => (
                                                <SelectItem
                                                    key={`${name}-${code}`}
                                                    value={name}
                                                    className="
                                                        cursor-pointer
                                                        rounded-[calc(var(--radius-md)-2px)]
                                                        px-3
                                                        py-2.5
                                                        pr-10
                                                        text-sm
                                                        text-[var(--text-primary)]
                                                        outline-none
                                                    "
                                                >
                                                    <div className="flex w-full min-w-0 items-center gap-3">
                                                        <span className="w-6 shrink-0 text-base">
                                                            {flag}
                                                        </span>

                                                        <span className="min-w-0 flex-1 truncate">
                                                            {name}
                                                        </span>

                                                        <span className="w-12 shrink-0 text-right text-xs text-[var(--text-muted)]">
                                                            {code}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>

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
    bg-transparent
    px-4
    py-3
    text-sm
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
                        <div className="space-y-3">
                            <label
                                htmlFor="serviceType"
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-muted-foreground
                                    mb-2
                                    block
                                "
                            >
                                Service
                            </label>

                            <Select
                                value={
                                    formData.serviceType
                                }
                                onValueChange={(value) =>
                                    updateField(
                                        "serviceType",
                                        value,
                                    )
                                }
                                disabled={
                                    isSubmitting
                                }
                            >
                                <SelectTrigger
                                    id="serviceType"
                                    className="
        form-select-trigger
        px-4
        text-sm
        disabled:cursor-not-allowed
        disabled:opacity-50
    "
                                >
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>

                                <SelectContent
                                    side="bottom"
                                    align="start"
                                    sideOffset={6}
                                    alignItemWithTrigger={false}
                                    className="
                                        z-50
                                        max-h-[280px]
                                        min-w-[280px]
                                        overflow-y-auto
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        p-1.5
                                        text-[var(--text-primary)]
                                        shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                                    "
                                >
                                    {SERVICES.map(
                                        (service) => (
                                            <SelectItem
                                                key={service}
                                                value={service}
                                                className="
                                                    cursor-pointer
                                                    rounded-[calc(var(--radius-md)-2px)]
                                                    px-3
                                                    py-2.5
                                                    text-sm
                                                    text-[var(--text-primary)]
                                                "
                                            >
                                                {service}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-3">
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
                            maxLength={
                                MAX_DESCRIPTION_LENGTH
                            }
                            rows={4}
                            disabled={
                                isSubmitting
                            }
                            className="
                                min-h-[120px]
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

                        <label
                            className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted-foreground
                mb-2
                                    block
            "
                        >
                            Project Brief / PDF
                        </label>



                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                            className="hidden"
                        />

                        <div
                            className="
            flex
        
            items-center
            gap-3
           
            px-4
          
           
            form-select-trigger
        "
                        >
                            <FileText className="size-4 shrink-0 text-primary" />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSubmitting}
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
                                {selectedFile?.name ?? "Choose project PDF"}
                            </button>

                            {selectedFile ? (
                                <button
                                    type="button"
                                    onClick={removeSelectedFile}
                                    disabled={isSubmitting}
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
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isSubmitting}
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

                        {/* File requirements */}
                        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                            <span>   Optional. Upload your requirements, brief, or reference
                                document.</span>
                            <span>Max 10MB</span>
                        </div>

                        {selectedFile && (
                            <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                                <span>Ready to upload</span>

                                <span>
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
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
                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
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
    );
};

export default ContactForm;                                                                                                                                                                                                                     