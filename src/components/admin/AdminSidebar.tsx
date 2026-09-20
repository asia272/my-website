
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BriefcaseBusiness,
    ClipboardList,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Users,
    X,
} from "lucide-react";
import { useState } from "react";

import { logoutAdmin } from "@/actions/admin-auth";

const navigation = [
    {
        label: "Overview",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Projects",
        href: "/admin/dashboard/projects",
        icon: FolderKanban,
    },
    {
        label: "Services",
        href: "/admin/dashboard/services",
        icon: BriefcaseBusiness,
    },
    {
        label: "Team",
        href: "/admin/dashboard/team",
        icon: Users,
    },
    {
        label: "Client Requests",
        href: "/admin/dashboard/requests",
        icon: ClipboardList,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open admin navigation"
                className="
          fixed
          left-4
          top-4
          z-40
          flex
          size-10
          items-center
          justify-center
          rounded-xl
          border-border
          bg-background/90
          backdrop-blur
          lg:hidden
        "
            >
                <Menu className="size-5" />
            </button>

            {/* Mobile backdrop */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close admin navigation"
                    onClick={() => setMobileOpen(false)}
                    className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
          "
                />
            )}

            <aside
                className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-border
          bg-background
          transition-transform
          duration-300
          lg:static
          lg:z-auto
          lg:translate-x-0
          ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
        `}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-border px-6">
                    <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="
                flex
                size-10
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
              "
                        >
                            <span className="font-bold">
                                A
                            </span>
                        </div>

                        <div>
                            <p className="font-semibold">
                                Admin Panel
                            </p>

                            <p className="text-xs text-secondary">
                                My Website
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close admin navigation"
                        className="
              flex
              size-9
              items-center
              justify-center
              rounded-lg
              text-secondary
              hover:bg-muted
              lg:hidden
            "
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                    <p
                        className="
              mb-3
              px-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-secondary
            "
                    >
                        Management
                    </p>

                    {navigation.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            item.href === "/admin/dashboard"
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-secondary hover:bg-muted hover:text-primary"
                                    }
                `}
                            >
                                <Icon className="size-5 shrink-0" />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="border-t border-border p-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="
              mb-2
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-secondary
              transition
              hover:bg-muted
              hover:text-primary
            "
                    >
                        <Settings className="size-5" />
                        View Website
                    </Link>

                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-secondary
                transition
                hover:bg-red-500/10
                hover:text-red-500
              "
                        >
                            <LogOut className="size-5" />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}
