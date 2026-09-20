import DashboardCard from "@/components/admin/Dashboard";
import {
    BriefcaseBusiness,
    ClipboardList,
    FolderKanban,
    Users,
} from "lucide-react";



export default function AdminDashboardPage() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8">
                <p className="text-sm font-medium text-primary">
                    Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                    Overview
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Manage your website content and client
                    requests from one place.
                </p>
            </div>

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
                    value={0}
                    description="Active projects"
                    icon={FolderKanban}
                />

                <DashboardCard
                    title="Services"
                    value={0}
                    description="Active services"
                    icon={BriefcaseBusiness}
                />

                <DashboardCard
                    title="Team Members"
                    value={0}
                    description="Active members"
                    icon={Users}
                />

                <DashboardCard
                    title="Client Requests"
                    value={0}
                    description="New requests"
                    icon={ClipboardList}
                />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
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
                        Recent Client Requests
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Your latest client inquiries will appear
                        here.
                    </p>
                </section>

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

                    <div className="mt-5 flex flex-wrap gap-3">
                        <a
                            href="/admin/dashboard/projects/new"
                            className="custom-btn"
                        >
                            Add Project
                        </a>

                        <a
                            href="/admin/dashboard/services/new"
                            className="custom-btn"
                        >
                            Add Service
                        </a>

                        <a
                            href="/admin/dashboard/team/new"
                            className="custom-btn"
                        >
                            Add Team Member
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}