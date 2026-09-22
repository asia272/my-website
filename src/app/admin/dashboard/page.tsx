
"use client";

import Link from "next/link";
import {
    BriefcaseBusiness,
    ClipboardList,
    FolderKanban,
    Users,
} from "lucide-react";

import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

import DashboardCard from "@/components/admin/Dashboard";
import AdminPageHeading from "@/components/admin/AdminPageHeading";



function getStatusClasses(
    status: string
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



export default function AdminDashboardPage() {
    const stats = useQuery(
        api.adminDashboard.getStats,
    );

    const recentRequests = useQuery(
        api.adminDashboard.getRecentRequests,
    );

    const isLoading =
        stats === undefined ||
        recentRequests === undefined;

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Heading */}

            <AdminPageHeading
                label="Dashboard"
                labelClassName="text-chart-2"
                title="Overview"
                description="Manage your website content and client requests from one place."
            />
            {/* Stats */}
            <div
                className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
            >
                <DashboardCard
                    title="Projects"
                    value={
                        isLoading
                            ? 0
                            : stats.projectsCount
                    }
                    description="Active projects"
                    icon={FolderKanban}
                    iconColor="text-chart-3"
                    iconBg="bg-chart-3/10"
                />

                <DashboardCard
                    title="Services"
                    value={
                        isLoading
                            ? 0
                            : stats.servicesCount
                    }
                    description="Active services"
                    icon={BriefcaseBusiness}
                    iconColor="text-chart-4"
                    iconBg="bg-chart-4/10"
                />

                <DashboardCard
                    title="Team Members"
                    value={
                        isLoading
                            ? 0
                            : stats.teamMembersCount
                    }
                    description="Active members"
                    icon={Users}
                    iconColor="text-chart-1"
                    iconBg="bg-chart-1/10"
                />

                <DashboardCard
                    title="Client Requests"
                    value={
                        isLoading
                            ? 0
                            : stats.newRequestsCount
                    }
                    description="New requests"
                    icon={ClipboardList}
                    iconColor="text-chart-5"
                    iconBg="bg-chart-5/10"
                />
            </div>

            {/* Bottom section */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Recent Requests */}
                <section
                    className="
            rounded-2xl
            border
            border-border
            bg-card
            p-6
          "
                >
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Recent Client Requests
                            </h3>

                            <p className="mt-1 text-sm text-secondary">
                                Latest inquiries from potential clients.
                            </p>
                        </div>

                        <Link
                            href="/admin/dashboard/requests"
                            className="
        group
        inline-flex
        shrink-0
        items-center
        gap-1.5
        rounded-lg
        border
        border-border
        bg-muted/30
        px-3
        py-2
        text-xs
        font-medium
        text-secondary
        transition-all
        duration-[var(--duration-normal)]
        ease-[var(--ease-standard)]
        hover:border-primary/40
        hover:bg-primary/10
        hover:text-primary
    "
                        >
                            View all

                            <span
                                className="
            text-sm
            transition-transform
            duration-[var(--duration-normal)]
            ease-[var(--ease-standard)]
            group-hover:translate-x-0.5
        "
                            >
                                →
                            </span>
                        </Link>
                    </div>

                    <div className="mt-6">
                        {recentRequests === undefined ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="
                      h-16
                      animate-pulse
                      rounded-xl
                      bg-muted
                    "
                                    />
                                ))}
                            </div>
                        ) : recentRequests.length === 0 ? (
                            <div
                                className="
                  rounded-xl
                  border
                  border-dashed
                  border-border
                  px-5
                  py-10
                  text-center
                "
                            >
                                <ClipboardList className="mx-auto size-8 text-chart-5" />

                                <p className="mt-3 text-sm font-medium">
                                    No client requests yet
                                </p>

                                <p className="mt-1 text-xs text-secondary">
                                    New requests will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentRequests.map((request) => (
                                    <Link
                                        key={request._id}
                                        href={`/admin/dashboard/requests/${request._id}`}
                                        className="
                      block
                      rounded-xl
                      border
                      border-border
                      p-4
                      transition
                      hover:border-primary/30
                      hover:bg-muted/50
                    "
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {request.clientName}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-secondary">
                                                    {request.serviceType}
                                                </p>
                                            </div>

                                            <span
                                                className={`
        shrink-0
        rounded-xl
        border
        px-2.5
        py-1
        text-[11px]
        font-medium
        ${getStatusClasses(request.status)}
    `}
                                            >
                                                {request.status}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Quick Actions */}
                <section
                    className="
            rounded-2xl
            border
            border-border
            bg-card
            p-6
          "
                >
                    <h3 className="text-lg font-semibold">
                        Quick Actions
                    </h3>

                    <p className="mt-1 text-sm text-secondary">
                        Quickly add new content to your website.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/admin/dashboard/projects/new"
                            className="custom-btn text-center"
                        >
                            Add Project
                        </Link>

                        <Link
                            href="/admin/dashboard/services/new"
                            className="custom-btn text-center"
                        >
                            Add Service
                        </Link>

                        <Link
                            href="/admin/dashboard/team/new"
                            className="custom-btn text-center"
                        >
                            Add Team Member
                        </Link>

                        <Link
                            href="/admin/dashboard/requests"
                            className=" custom-btn-outline  "  >
                            View Requests
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
