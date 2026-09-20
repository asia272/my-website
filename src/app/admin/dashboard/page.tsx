import { redirect } from "next/navigation";

import { logoutAdmin } from "@/actions/admin-auth";
import { getAdminSession } from "@/actions/admin-session-server";


export default async function AdminDashboardPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <div
                    className="
            flex
            flex-col
            gap-6
            rounded-2xl
            border
            border-border
            bg-card
            p-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Admin Dashboard
                        </p>

                        <h1 className="mt-1 text-3xl font-semibold">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {session.email}
                        </p>
                    </div>

                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="custom-btn"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}