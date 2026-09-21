
import { Bell } from "lucide-react";

type AdminHeaderProps = {
    email: string;
};

export default function AdminHeader({
    email,
}: AdminHeaderProps) {
    return (
        <header
            className="
                sticky
                top-0
                z-30
                flex
                h-20
                shrink-0
                items-center
                justify-between
                border-b
                border-sidebar-border
                bg-sidebar/90
                px-4
                backdrop-blur-xl
                sm:px-6
                lg:px-8
            "
        >
            {/* Welcome */}
            <div className="min-w-0 lg:pl-72 sm:pl-15">
                <p className="text-sm text-secondary">
                    Welcome back
                </p>

                <p className="max-w-[220px] truncate text-sm font-medium text-sidebar-foreground sm:max-w-none">
                    {email}
                </p>
            </div>


        </header>
    );
}

