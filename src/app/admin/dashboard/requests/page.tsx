
"use client";

import { Inbox } from "lucide-react";

import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";

import AdminPageHeading from "@/components/admin/AdminPageHeading";

import ClientRequestList from "@/components/admin/requests/ClientRequestList";

export default function ClientRequestsPage() {
    const requests = useQuery(
        api.clientRequests.getAll
    );

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            {/* Header */}
            <AdminPageHeading
                label="Messages"
                labelClassName="text-chart-3"
                title="Client Requests"
                description="View and manage project requests submitted by your clients."
            />

            {/* Requests */}
            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">
                                All Client Requests
                            </h3>

                            <p className="mt-1 text-sm text-secondary">
                                Review and manage requests from
                                potential clients.
                            </p>
                        </div>

                        {requests && (
                            <div
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-border
                                    bg-muted/40
                                    px-3
                                    py-2
                                "
                            >
                                <div
                                    className="
                                        flex
                                        size-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-chart-3/10
                                    "
                                >
                                    <Inbox className="size-3.5 text-chart-3" />
                                </div>

                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-sm font-semibold text-foreground">
                                        {requests.length}
                                    </span>

                                    <span className="text-xs text-secondary">
                                        {requests.length === 1
                                            ? "request"
                                            : "requests"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    <ClientRequestList
                        requests={requests}
                    />
                </div>
            </section>
        </div>
    );
}

