import { redirect } from "next/navigation";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/actions/admin-session-server";


export default async function AdminLoginPage() {
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
                    <div className="mb-8 text-center">
                        <div
                            className="
                mx-auto
                mb-5
                flex
                size-14
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
                text-primary
              "
                        >
                            <span className="text-xl font-bold">
                                A
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold">
                            Admin Login
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your admin email to receive a
                            verification code.
                        </p>
                    </div>

                    <AdminLoginForm />
                </div>
            </div>
        </main>
    );
}