"use client";

import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";

import { Button } from "@/components/ui/button";

import TeamList from "@/components/admin/team/TeamList";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function TeamPage() {
    const teamMembers = useQuery(api.teamMembers.list);

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <AdminPageHeading
                    label="About"
                    labelClassName="text-chart-2"
                    title="Team"
                    description="Manage the team members displayed on your website."
                />

                <Button
                    asChild
                    className="custom-btn w-full sm:w-auto"
                >
                    <Link
                        href="/admin/dashboard/team/new"
                        className="inline-flex items-center justify-center whitespace-nowrap"
                    >
                        <Plus className="mr-2 size-4 shrink-0" />
                        <span>Add Team Member</span>
                    </Link>
                </Button>
            </div>

            {/* All Team Members */}
            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="border-b border-border p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">
                                All Team Members
                            </h3>

                            <p className="mt-1 text-sm text-secondary">
                                View and manage all your team members.
                            </p>
                        </div>

                        {teamMembers && (
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
                                    <Users className="size-3.5 text-chart-3" />
                                </div>

                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-sm font-semibold text-foreground">
                                        {teamMembers.length}
                                    </span>

                                    <span className="text-xs text-secondary">
                                        {teamMembers.length === 1
                                            ? "member"
                                            : "members"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    <TeamList teamMembers={teamMembers} />
                </div>
            </section>
        </div>
    );
}