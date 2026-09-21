
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
    Eye,
    FileText,
    Inbox,
    Search,
} from "lucide-react";

import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import DeleteClientRequestButton from "./DeleteClientRequestButton";

type ClientRequest = Doc<"clientRequests"> & {
    attachmentUrl: string | null;
};

interface ClientRequestListProps {
    requests: ClientRequest[] | undefined;
}

const statusOptions = [
    {
        value: "ALL",
        label: "All Statuses",
    },
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

function getStatusClasses(
    status: ClientRequest["status"]
) {
    switch (status) {
        case "NEW":
            return "border-chart-3/20 bg-chart-3/10 text-chart-3";

        case "REVIEWING":
            return "border-chart-2/20 bg-chart-2/10 text-chart-2";

        case "CONTACTED":
            return "border-primary/20 bg-primary/10 text-primary";

        case "IN_PROGRESS":
            return "border-chart-4/20 bg-chart-4/10 text-chart-4";

        case "COMPLETED":
            return "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400";

        case "REJECTED":
            return "border-destructive/20 bg-destructive/10 text-destructive";

        default:
            return "border-border bg-muted text-secondary";
    }
}

function getStatusLabel(
    status: ClientRequest["status"]
) {
    switch (status) {
        case "NEW":
            return "New";

        case "REVIEWING":
            return "Reviewing";

        case "CONTACTED":
            return "Contacted";

        case "IN_PROGRESS":
            return "In Progress";

        case "COMPLETED":
            return "Completed";

        case "REJECTED":
            return "Rejected";

        default:
            return status;
    }
}

function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(timestamp));
}

export default function ClientRequestList({
    requests,
}: ClientRequestListProps) {
    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [serviceFilter, setServiceFilter] =
        useState("ALL");

    const [searchQuery, setSearchQuery] =
        useState("");

    const [updatingRequestId, setUpdatingRequestId] =
        useState<string | null>(null);

    const updateStatus = useMutation(
        api.clientRequests.updateStatus
    );

    const serviceOptions = useMemo(() => {
        if (!requests) return [];

        const services = Array.from(
            new Set(
                requests
                    .map((request) =>
                        request.serviceType.trim()
                    )
                    .filter(Boolean)
            )
        );

        return services.sort((a, b) =>
            a.localeCompare(b)
        );
    }, [requests]);

    const filteredRequests = useMemo(() => {
        if (!requests) return [];

        const query = searchQuery
            .trim()
            .toLowerCase();

        return requests.filter((request) => {
            const matchesStatus =
                statusFilter === "ALL" ||
                request.status === statusFilter;

            const matchesService =
                serviceFilter === "ALL" ||
                request.serviceType === serviceFilter;

            const matchesSearch =
                !query ||
                request.clientName
                    .toLowerCase()
                    .includes(query) ||
                request.email
                    .toLowerCase()
                    .includes(query) ||
                request.phone
                    .toLowerCase()
                    .includes(query) ||
                request.serviceType
                    .toLowerCase()
                    .includes(query);

            return (
                matchesStatus &&
                matchesService &&
                matchesSearch
            );
        });
    }, [
        requests,
        statusFilter,
        serviceFilter,
        searchQuery,
    ]);

    const handleStatusChange = async (
        requestId: ClientRequest["_id"],
        value: string
    ) => {
        if (updatingRequestId) {
            return;
        }

        try {
            setUpdatingRequestId(requestId);

            await updateStatus({
                id: requestId,
                status: value as
                    | "NEW"
                    | "REVIEWING"
                    | "CONTACTED"
                    | "IN_PROGRESS"
                    | "COMPLETED"
                    | "REJECTED",
            });

            toast.success(
                "Request status updated successfully."
            );
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
            setUpdatingRequestId(null);
        }
    };

    if (requests === undefined) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="
                                h-24
                                animate-pulse
                                rounded-xl
                                border
                                border-border
                                bg-card
                            "
                        />
                    )
                )}
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-60
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-border
                    bg-card
                    px-6
                    text-center
                "
            >
                <div
                    className="
                        mb-4
                        flex
                        size-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-chart-3/10
                    "
                >
                    <Inbox className="size-5 text-chart-3" />
                </div>

                <h3 className="font-medium">
                    No client requests yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-secondary">
                    Client requests submitted through your
                    contact form will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Search + Filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {/* Search */}
                <div className="relative w-full lg:max-w-sm">
                    <Search
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            size-4
                            -translate-y-1/2
                            text-muted-foreground
                        "
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            setSearchQuery(
                                event.target.value
                            )
                        }
                        placeholder="Search requests..."
                        className="
                            h-10
                            w-full
                            rounded-md
                            border
                            border-border
                            bg-transparent
                            pl-9
                            pr-3
                            text-sm
                            outline-none
                            transition-colors
                            placeholder:text-muted-foreground
                            focus:border-ring
                        "
                    />
                </div>

                {/* Filters */}
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}

                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>

                        <SelectContent>
                            {statusOptions.map(
                                (option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>

                    <Select
                        value={serviceFilter}
                        onValueChange={setServiceFilter}
                    >
                        <SelectTrigger className="w-full sm:w-[210px]">
                            <SelectValue placeholder="All Services" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">
                                All Services
                            </SelectItem>

                            {serviceOptions.map(
                                (service) => (
                                    <SelectItem
                                        key={service}
                                        value={service}
                                    >
                                        {service}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-secondary">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {filteredRequests.length}
                    </span>{" "}
                    {filteredRequests.length === 1
                        ? "request"
                        : "requests"}
                </p>
            </div>

            {/* Results */}
            {filteredRequests.length === 0 ? (
                <div
                    className="
                        flex
                        min-h-48
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-border
                        bg-card
                        px-6
                        text-center
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-muted
                        "
                    >
                        <Search className="size-5 text-muted-foreground" />
                    </div>

                    <h3 className="font-medium">
                        No matching requests
                    </h3>

                    <p className="mt-1 text-sm text-secondary">
                        Try changing your search or filters.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredRequests.map(
                        (request) => (
                            <div
                                key={request._id}
                                className="
                                    group
                                    rounded-md
                                    border
                                    border-border
                                    bg-card
                                    p-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >
                                    {/* Details */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="truncate text-sm font-semibold">
                                                {
                                                    request.clientName
                                                }
                                            </h3>

                                            <span
                                                className={`
                                                    inline-flex
                                                    items-center
                                                    rounded-md
                                                    border
                                                    px-2
                                                    py-0.5
                                                    text-[11px]
                                                    font-medium
                                                    ${getStatusClasses(
                                                    request.status
                                                )}
                                                `}
                                            >
                                                {getStatusLabel(
                                                    request.status
                                                )}
                                            </span>

                                            {request.attachmentStorageId && (
                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1
                                                        rounded-md
                                                        border
                                                        border-border
                                                        bg-muted/40
                                                        px-2
                                                        py-0.5
                                                        text-[11px]
                                                        font-medium
                                                        text-secondary
                                                    "
                                                >
                                                    <FileText className="size-3" />
                                                    PDF
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary">
                                            <span>
                                                {
                                                    request.email
                                                }
                                            </span>

                                            <span className="hidden sm:inline">
                                                •
                                            </span>

                                            <span>
                                                {
                                                    request.phone
                                                }
                                            </span>

                                            <span className="hidden sm:inline">
                                                •
                                            </span>

                                            <span>
                                                {
                                                    request.serviceType
                                                }
                                            </span>
                                        </div>

                                        <p
                                            className="
                                                mt-3
                                                line-clamp-2
                                                max-w-3xl
                                                text-sm
                                                leading-6
                                                text-secondary
                                            "
                                        >
                                            {
                                                request.projectDescription
                                            }
                                        </p>

                                        <p className="mt-2 text-[11px] text-muted-foreground">
                                            {formatDate(
                                                request.createdAt
                                            )}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                                        {/* View */}
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="
                                                h-9
                                                rounded-md
                                                border-border
                                                bg-transparent
                                                px-3
                                                text-sm
                                                font-medium
                                                text-secondary
                                                transition-all
                                                duration-[var(--duration-normal)]
                                                ease-[var(--ease-standard)]
                                                hover:border-chart-2/40
                                                hover:bg-chart-2/10
                                                hover:text-chart-2
                                            "
                                        >
                                            <Link
                                                href={`/admin/dashboard/requests/${request._id}`}
                                                className="inline-flex items-center justify-center"
                                            >
                                                <Eye className="mr-2 size-4 shrink-0 text-chart-2" />
                                                <span>
                                                    View
                                                </span>
                                            </Link>
                                        </Button>

                                        {/* Change Status */}
                                        <Select
                                            value={
                                                request.status
                                            }
                                            onValueChange={(
                                                value
                                            ) =>
                                                handleStatusChange(
                                                    request._id,
                                                    value
                                                )
                                            }
                                            disabled={
                                                updatingRequestId ===
                                                request._id
                                            }
                                        >
                                            <SelectTrigger
                                                className="
                                                    h-9
                                                    w-auto
                                                    min-w-[130px]
                                                    rounded-md
                                                    border-border
                                                    bg-transparent
                                                    px-3
                                                    text-sm
                                                    font-medium
                                                "
                                            >
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {statusOptions
                                                    .filter(
                                                        (
                                                            option
                                                        ) =>
                                                            option.value !==
                                                            "ALL"
                                                    )
                                                    .map(
                                                        (
                                                            option
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {
                                                                    option.label
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>

                                        {/* Delete */}
                                        <DeleteClientRequestButton
                                            clientRequestId={
                                                request._id
                                            }
                                            clientName={
                                                request.clientName
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

