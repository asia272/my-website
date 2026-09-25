
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHome = pathname === "/";

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-purple-500/5">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* =================================================
                        LOGO
                    ================================================== */}

                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="text-primary text-xl font-bold tracking-tight transition-colors duration-300 hover:text-accent"
                    >
                        Kamal Group of Developer
                    </Link>

                    {/* =================================================
                        DESKTOP NAVIGATION
                    ================================================== */}

                    <div className="hidden md:flex">
                        <ul className="flex items-center gap-6">

                            {/* Home */}
                            <li>
                                {isHome ? (
                                    <a
                                        href="#home"
                                        className="nav-link"
                                    >
                                        Home
                                    </a>
                                ) : (
                                    <Link
                                        href="/"
                                        className="nav-link"
                                    >
                                        Home
                                    </Link>
                                )}
                            </li>

                            {/* About */}
                            {isHome && (
                                <li>
                                    <a
                                        href="#about"
                                        className="nav-link"
                                    >
                                        About
                                    </a>
                                </li>
                            )}

                            {/* Services */}
                            <li>
                                {isHome ? (
                                    <a
                                        href="#services"
                                        className="nav-link"
                                    >
                                        Services
                                    </a>
                                ) : (
                                    <Link
                                        href="/services"
                                        className="nav-link"
                                    >
                                        Services
                                    </Link>
                                )}
                            </li>

                            {/* Team */}

                            <li>
                                {isHome ? (
                                    <a
                                        href="#team"
                                        className="nav-link"
                                    >
                                        Team
                                    </a>
                                ) : (
                                    <Link
                                        href="/team"
                                        className="nav-link"
                                    >
                                        Team
                                    </Link>
                                )}
                            </li>
                            {/* Testimonials */}
                            {isHome && (
                                <li>
                                    <a
                                        href="#testimonials"
                                        className="nav-link"
                                    >
                                        Testimonials
                                    </a>
                                </li>
                            )}

                            {/* Contact */}
                            <li>
                                {isHome ? (
                                    <a
                                        href="#contact"
                                        className="nav-link"
                                    >
                                        Contact
                                    </a>
                                ) : (
                                    <Link
                                        href="/contact"
                                        className="nav-link"
                                    >
                                        Contact
                                    </Link>
                                )}
                            </li>

                            {/* =================================================
                                PROJECTS DROPDOWN
                            ================================================== */}

                            <li>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger
                                        className="nav-link inline-flex items-center gap-1 outline-none"
                                    >
                                        Projects

                                        <ChevronDown
                                            aria-hidden="true"
                                            className="size-4 transition-transform duration-300 data-[state=open]:rotate-180"
                                        />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        sideOffset={12}
                                        className="min-w-52 border-border bg-background/95 p-2 shadow-xl shadow-purple-500/10 backdrop-blur-xl"
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/generative-ai"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                Generative AI
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/web-development"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                Web Development
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/mobile-app"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                Mobile Apps
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/full-stack"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                Full Stack
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/e-commerce"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                E-Commerce
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/saas"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                SaaS
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/projects/other"
                                                className="cursor-pointer rounded-md p-1 text-sm text-foreground"
                                            >
                                                Other Projects
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>

                        </ul>
                    </div>

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen((prev) => !prev)
                        }
                        className="flex size-10 items-center justify-center rounded-md text-primary transition-colors duration-300 hover:bg-white/5 md:hidden"
                        aria-label={
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X
                                aria-hidden="true"
                                className="size-6"
                            />
                        ) : (
                            <Menu
                                aria-hidden="true"
                                className="size-6"
                            />
                        )}
                    </button>

                    {/* =================================================
                        MOBILE NAVIGATION
                    ================================================== */}

                    {isMenuOpen && (
                        <div className="absolute left-0 top-full w-full border-t border-[var(--nav-border)] bg-[var(--nav-bg)] shadow-lg backdrop-blur-xl md:hidden">

                            <ul className="flex flex-col px-[var(--container-padding)] py-5">

                                {/* Home */}
                                <li>
                                    {isHome ? (
                                        <a
                                            href="#home"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Home
                                        </a>
                                    ) : (
                                        <Link
                                            href="/"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Home
                                        </Link>
                                    )}
                                </li>

                                {/* About */}
                                {isHome && (
                                    <li>
                                        <a
                                            href="#about"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            About
                                        </a>
                                    </li>
                                )}

                                {/* Services */}
                                <li>
                                    {isHome ? (
                                        <a
                                            href="#services"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Services
                                        </a>
                                    ) : (
                                        <Link
                                            href="/services"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Services
                                        </Link>
                                    )}
                                </li>

                                {/* Team */}
                                {isHome && (
                                    <li>
                                        <a
                                            href="#team"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Team
                                        </a>
                                    </li>
                                )}

                                {/* Testimonials */}
                                {isHome && (
                                    <li>
                                        <a
                                            href="#testimonials"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Testimonials
                                        </a>
                                    </li>
                                )}

                                {/* Contact */}
                                <li>
                                    {isHome ? (
                                        <a
                                            href="#contact"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Contact
                                        </a>
                                    ) : (
                                        <Link
                                            href="/contact"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Contact
                                        </Link>
                                    )}
                                </li>

                                {/* =================================================
                                    MOBILE PROJECTS
                                ================================================== */}

                                <li>
                                    <div className="flex flex-col">

                                        <span className="nav-link block py-3">
                                            Projects
                                        </span>

                                        <div className="ml-4 flex flex-col border-l border-border pl-4">
                                            <Link
                                                href="/projects/generative-ai"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                Generative AI
                                            </Link>

                                            <Link
                                                href="/projects/web-development"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                Web Development
                                            </Link>

                                            <Link
                                                href="/projects/mobile-app"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                Mobile Apps
                                            </Link>

                                            <Link
                                                href="/projects/full-stack"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                Full Stack
                                            </Link>

                                            <Link
                                                href="/projects/e-commerce"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                E-Commerce
                                            </Link>

                                            <Link
                                                href="/projects/saas"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                SaaS
                                            </Link>

                                            <Link
                                                href="/projects/other"
                                                onClick={closeMenu}
                                                className="nav-link block py-2.5 text-sm"
                                            >
                                                Other Projects
                                            </Link>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    )}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;

