import { redirect } from "next/navigation";

import AdminVerifyForm from "@/components/admin/AdminVerifyForm";
import { getAdminSession } from "@/actions/admin-session-server";


export default async function AdminVerifyPage() {
    const session = await getAdminSession();

    if (session) {
        redirect("/admin/dashboard");
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div
                    className="
            rounded-2xl
            border
            border-border
            bg-card
            p-6
            shadow-xl
            sm:p-8
          "
                >
                    <AdminVerifyForm />
                </div>
            </div>
        </main>
    );
}