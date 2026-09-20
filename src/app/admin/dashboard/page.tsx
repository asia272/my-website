
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
            <div className="mb-8">
                <p className="text-sm font-medium text-primary">
                    Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                    Overview
                </h1>

                <p className="mt-2 text-sm text-secondary">
                    Manage your website content and client
                    requests from one place.
                </p>
            </div>

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
                            <h2 className="text-lg font-semibold">
                                Recent Client Requests
                            </h2>

                            <p className="mt-1 text-sm text-secondary">
                                Latest inquiries from potential clients.
                            </p>
                        </div>

                        <Link
                            href="/admin/dashboard/requests"
                            className="
                text-sm
                font-medium
                text-primary
                transition
                hover:opacity-80
              "
                        >
                            View all
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
                                <ClipboardList className="mx-auto size-8 text-secondary" />

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
                                                className="
                          shrink-0
                          rounded-full
                          bg-primary/10
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-primary
                        "
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
                    <h2 className="text-lg font-semibold">
                        Quick Actions
                    </h2>

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
                            className="
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-border
                px-4
                py-3
                text-sm
                font-medium
                transition
                hover:bg-muted
              "
                        >
                            View Requests
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
