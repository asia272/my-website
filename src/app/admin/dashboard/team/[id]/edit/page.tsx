
"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "../../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import TeamForm from "@/components/admin/team/TeamForm";

type EditTeamPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditTeamPage({
    params,
}: EditTeamPageProps) {
    const { id } = await params;

    return (
        <EditTeamContent
            teamMemberId={id as Id<"teamMembers">}
        />
    );
}

function EditTeamContent({
    teamMemberId,
}: {
    teamMemberId: Id<"teamMembers">;
}) {
    const teamMember = useQuery(
        api.teamMembers.getById,
        {
            id: teamMemberId,
        },
    );

    if (teamMember === undefined) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (teamMember === null) {
        return (
            <div className="space-y-6">
                <Button
                    asChild
                    variant="outline"
                >
                    <Link href="/admin/dashboard/team">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Team
                    </Link>
                </Button>

                <div className="rounded-xl border p-8 text-center">
                    <h2 className="text-xl font-semibold">
                        Team Member Not Found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        This team member may have been deleted
                        or the URL is invalid.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="mt-1 shrink-0"
                >
                    <Link href="/admin/dashboard/team">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>

                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Edit Team Member
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the information for{" "}
                        <span className="font-medium text-foreground">
                            {teamMember.name}
                        </span>
                        .
                    </p>
                </div>
            </div>


            <TeamForm
                mode="edit"
                teamMember={teamMember}
            />

        </div>
    );
}

