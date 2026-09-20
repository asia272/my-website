import { getAdminSession } from "@/actions/admin-session-server";
import { redirect } from "next/navigation";



export default async function AdminPage() {
    const session = await getAdminSession();

    if (session) {
        redirect("/admin/dashboard");
    }

    redirect("/admin/login");
}