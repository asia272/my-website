"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import AdminPageHeading from "@/components/admin/AdminPageHeading";
import TeamForm from "@/components/admin/team/TeamForm";

export default function NewTeamMemberPage() {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <AdminPageHeading
                    label="Team"
                    labelClassName="text-chart-3"
                    title="Add Team Member"
                    description="Add a new member to your team."
                />

                <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    <Link
                        href="/admin/dashboard/team"
                        className="inline-flex items-center justify-center"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Team
                    </Link>
                </Button>
            </div>

            {/* Form */}
            <TeamForm />
        </div>
    );
}