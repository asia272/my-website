"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Download,
    ExternalLink,
    FileText,
    Mail,
    Phone,
    User,
    Wrench,
} from "lucide-react";

import { useMutation, useQuery } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import AdminPageHeading from "@/components/admin/AdminPageHeading";

const statusOptions = [
    {
        value: "NEW",
        label: "New",
    },
    {
        value: "REVIEWING",
        label: "Reviewing",
    },
    {
        value: "CONTACTED",
        label: "Contacted",
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
    },
    {
        value: "COMPLETED",
        label: "Completed",
    },
    {
        value: "REJECTED",
        label: "Rejected",
    },
] as const;

const statusStyles: Record<
    (typeof statusOptions)[number]["value"],
    string
> = {
    NEW: "border-chart-2/30 bg-chart-2/10 text-chart-2",
    REVIEWING: "border-chart-3/30 bg-chart-3/10 text-chart-3",
    CONTACTED: "border-chart-4/30 bg-chart-4/10 text-chart-4",
    IN_PROGRESS:
        "border-chart-5/30 bg-chart-5/10 text-chart-5",
    COMPLETED:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    REJECTED:
        "border-destructive/30 bg-destructive/10 text-destructive",
};

function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(timestamp));
}

function getStatusLabel(status: string) {
    const option = statusOptions.find(
        (item) => item.value === status
    );

    return option?.label ?? status;
}

export default function ClientRequestDetailsPage() {
    const params = useParams<{ id: string }>();

    const requestId = params.id as Id<"clientRequests">;

    const request = useQuery(
        api.clientRequests.getById,
        requestId
            ? {
                id: requestId,
            }
            : "skip"
    );

    const updateStatus = useMutation(
        api.clientRequests.updateStatus
    );

    const [isUpdatingStatus, setIsUpdatingStatus] =
        useState(false);

    const handleStatusChange = async (value: string) => {
        if (!request || isUpdatingStatus) {
            return;
        }

        try {
            setIsUpdatingStatus(true);

            await updateStatus({
                id: request._id,
                status: value as
                    | "NEW"
                    | "REVIEWING"
                    | "CONTACTED"
                    | "IN_PROGRESS"
                    | "COMPLETED"
                    | "REJECTED",
            });

            toast.success("Request status updated successfully.");
        } catch (error) {
            console.error(
                "Failed to update request status:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update request status."
            );
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (request === undefined) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 animate-pulse rounded-md bg-muted" />

                    <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
                </div>
                {Array.from({ length: 1 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="
                                h-44
                                animate-pulse
                                rounded-xl
                               
                                bg-card
                            "
                        />
                    )
                )}
            </div>

        );
    }

    if (request === null) {
        return (
            <div className="container space-y-8">
                <Button
                    asChild
                    variant="outline"
                    className="custom-btn-outline"
                >
                    <Link
                        href="/admin/dashboard/requests"
                        className="inline-flex items-center"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Requests
                    </Link>
                </Button>

                <div className="card flex min-h-72 flex-col items-center justify-center text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-chart-3/10">
                        <FileText className="size-5 text-chart-3" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        Request not found
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-secondary">
                        This client request may have been deleted
                        or no longer exists.
                    </p>

                    <Button
                        asChild
                        className="custom-btn mt-5"
                    >
                        <Link href="/admin/dashboard/requests">
                            Back to Requests
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container space-y-8 mb-6">
            {/* Page Heading */}
            <div className="flex flex-col gap-4">
                <Button
                    asChild
                    variant="outline"
                    className="custom-btn-outline w-fit"
                >
                    <Link
                        href="/admin/dashboard/requests"
                        className="inline-flex items-center"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Requests
                    </Link>
                </Button>

                <AdminPageHeading
                    label="Client Request"
                    labelClassName="text-chart-3"
                    title={request.clientName}
                    description="Review the request details and manage its current status."
                />
            </div>

            {/* Main Request Card */}
            <div className="group border bordr-border overflow-hidden p-0 rounded-md bg-card">
                {/* Client */}
                <section className="p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                            <User className="size-5 text-chart-1" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Client Information
                            </h3>

                            <p className="text-sm text-secondary">
                                Contact details provided with the request.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-secondary">
                                Name
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <User className="size-4 shrink-0 text-chart-5" />

                                <p className="truncate text-sm font-medium">
                                    {request.clientName}
                                </p>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-secondary">
                                Email
                            </p>

                            <a
                                href={`mailto:${request.email}`}
                                className="mt-1 flex items-center gap-2 truncate text-sm font-medium transition-colors hover:text-chart-2"
                            >
                                <Mail className="size-4 shrink-0 text-chart-2" />

                                <span className="truncate">
                                    {request.email}
                                </span>
                            </a>
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-secondary">
                                Phone
                            </p>

                            <a
                                href={`tel:${request.phone}`}
                                className="mt-1 flex items-center gap-2 truncate text-sm font-medium transition-colors hover:text-chart-2"
                            >
                                <Phone className="size-4 shrink-0 text-chart-4" />

                                <span className="truncate">
                                    {request.phone}
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* Project Request */}
                <section className="p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                            <Wrench className="size-5 text-chart-3" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Project Request
                            </h3>

                            <p className="text-sm text-secondary">
                                Details submitted by the client.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Service */}
                        <div>
                            <p className="mb-2 text-xs font-medium text-secondary">
                                Service
                            </p>

                            <div className="flex min-h-10 items-center rounded-lg border border-border bg-muted/20 px-3 text-sm">
                                {request.serviceType}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <p className="text-xs font-medium text-secondary">
                                    Status
                                </p>

                                <span
                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[request.status]}`}
                                >
                                    {getStatusLabel(request.status)}
                                </span>
                            </div>

                            <Select
                                value={request.status}
                                onValueChange={handleStatusChange}
                                disabled={isUpdatingStatus}
                            >
                                <SelectTrigger className="h-10 rounded-lg">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-5">
                        <p className="mb-2 text-xs font-medium text-secondary">
                            Project Description
                        </p>

                        <div className="min-h-32 whitespace-pre-wrap rounded-md border border-border bg-muted/20 p-4 text-sm leading-6 text-secondary">
                            {request.projectDescription}
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* Attachment */}
                <section className="p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-chart-3/10">
                            <FileText className="size-5 text-chart-3" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Attachment
                            </h3>

                            <p className="text-sm text-secondary">
                                Files submitted with this request.
                            </p>
                        </div>
                    </div>

                    {request.attachmentUrl ? (
                        <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                                    <FileText className="size-5 text-destructive" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">
                                        {request.attachmentFileName ??
                                            "Project brief PDF"}
                                    </p>

                                    <span className="mt-1 inline-flex rounded-full border border-destructive/20 bg-destructive/5 px-2 py-0.5 text-[11px] font-medium text-destructive">
                                        PDF
                                    </span>
                                </div>
                            </div>

                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="custom-btn-outline"
                                >
                                    <a
                                        href={request.attachmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center whitespace-nowrap"
                                    >
                                        <ExternalLink className="mr-2 size-4 shrink-0" />
                                        Open PDF
                                    </a>
                                </Button>

                                <Button
                                    asChild
                                    size="sm"
                                    className="custom-btn"
                                >
                                    <a
                                        href={request.attachmentUrl}
                                        download={
                                            request.attachmentFileName ??
                                            "project-brief.pdf"
                                        }
                                        className="flex items-center whitespace-nowrap"
                                    >
                                        <Download className="mr-2 size-4 shrink-0" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex min-h-24 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 text-center">
                            <FileText className="mb-2 size-5 text-secondary" />

                            <p className="text-sm font-medium">
                                No attachment
                            </p>

                            <p className="mt-1 text-xs text-secondary">
                                The client did not upload a PDF with
                                this request.
                            </p>
                        </div>
                    )}
                </section>

                <div className="divider" />

                {/* Request Information */}
                <section className="p-5 sm:p-6">
                    <div className="mb-5">
                        <h3 className="font-semibold">
                            Request Information
                        </h3>

                        <p className="mt-1 text-sm text-secondary">
                            Request timeline and current state.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-medium text-secondary">
                                Created
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <CalendarDays className="size-4 text-chart-2" />

                                <p className="text-sm font-medium">
                                    {formatDate(request.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-secondary">
                                Last Updated
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <Clock3 className="size-4 text-chart-3" />

                                <p className="text-sm font-medium">
                                    {formatDate(request.updatedAt)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-secondary">
                                Current Status
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-secondary" />

                                <p className="text-sm font-medium">
                                    {getStatusLabel(request.status)}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}