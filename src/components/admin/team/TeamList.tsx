"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";

import type { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import DeleteTeamMemberButton from "./DeleteTeamButton";

type TeamMember = Doc<"teamMembers"> & {
    imageUrl: string | null;
};

interface TeamListProps {
    teamMembers: TeamMember[] | undefined;
}

export default function TeamList({
    teamMembers,
}: TeamListProps) {
    if (teamMembers === undefined) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-24 animate-pulse rounded-md border border-border bg-muted/40"
                    />
                ))}
            </div>
        );
    }

    if (teamMembers.length === 0) {
        return (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-10 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <Pencil className="size-5 text-muted-foreground" />
                </div>


                <h3 className="font-medium">
                    No projects yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-secondary">
                    Add your first team member to start building your team
                    section.
                </p>

                <Button
                    asChild
                    className="custom-btn mt-5"
                >
                    <Link href="/admin/dashboard/team/new">
                        Add Team Member
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {teamMembers.map((member) => (
                <div
                    key={member._id}
                    className="rounded-md border border-border bg-card p-4"
                >
                    <div className="flex items-center gap-4">
                        {/* Image */}
                        {member.imageUrl ? (
                            <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-md border border-border sm:block">
                                <Image
                                    src={member.imageUrl}
                                    alt={member.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="hidden size-16 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-sm font-medium text-muted-foreground sm:flex">
                                {member.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h4 className="truncate text-sm font-semibold">
                                    {member.name}
                                </h4>

                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${member.isActive
                                        ? "bg-chart-2/10 text-chart-2"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {member.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-secondary">
                                {member.role}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-secondary">
                                {member.description}
                            </p>
                        </div>

                        {/* Actions */}
                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-2">
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
                                    href={`/admin/dashboard/team/${member._id}/edit`}
                                    className="inline-flex items-center justify-center"
                                >
                                    <Pencil className="mr-2 size-4 shrink-0 text-chart-2" />
                                    <span>Edit</span>
                                </Link>
                            </Button>

                            <DeleteTeamMemberButton
                                teamMemberId={member._id}
                                teamMemberName={member.name}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}