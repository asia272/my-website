
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
        items-center
        justify-between
        border-b
        border-border
        bg-background/80
        px-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
        >
            <div className="pl-12 lg:pl-0">
                <p className="text-sm text-secondary">
                    Welcome back
                </p>

                <p className="max-w-[220px] truncate text-sm font-medium sm:max-w-none">
                    {email}
                </p>
            </div>

            <button
                type="button"
                aria-label="Notifications"
                className="
          flex
          size-10
          items-center
          justify-center
          rounded-xl
          border
          border-border
          text-secondary
          transition
          hover:bg-muted
          hover:text-primary
        "
            >
                <Bell className="size-5" />
            </button>
        </header>
    );
}
