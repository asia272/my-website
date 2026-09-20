import { redirect } from "next/navigation";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/actions/admin-session-server";


export default async function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen">
                <AdminSidebar />

                <div className="min-w-0 flex-1">
                    <AdminHeader email={session.email} />

                    <main className="px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}