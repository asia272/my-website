
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Navbar = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHome = pathname === "/";
    const previousPathname = useRef(pathname);
    // Menu Toggle
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    //scroll handling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Path handling
    const projectMenuItems = [
        {
            label: "All",
            href: "/projects",
        },
        {
            label: "Generative AI",
            href: "/projects/generative-ai",
        },
        {
            label: "Web Development",
            href: "/projects/web-development",
        },
        {
            label: "Mobile Apps",
            href: "/projects/mobile-app",
        },
        {
            label: "Full Stack",
            href: "/projects/full-stack",
        },
        {
            label: "E-Commerce",
            href: "/projects/e-commerce",
        },
        {
            label: "SaaS",
            href: "/projects/saas",
        },
        {
            label: "Other Projects",
            href: "/projects/other",
        },
    ];

    useEffect(() => {
        const wasOnAnotherRoute = previousPathname.current !== pathname;

        if (pathname === "/" && wasOnAnotherRoute && !window.location.hash) {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }

        previousPathname.current = pathname;
    }, [pathname]);

    return (
        <header
            className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-[background-color,border-color,box-shadow,backdrop-filter]
        duration-300
        ${isScrolled
                    ? "border-b border-border/60 bg-background/80 shadow-lg shadow-purple-500/5 backdrop-blur-2xl"
                    : "border-none bg-transparent shadow-none backdrop-blur-0"
                }
    `}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* =================================================
                        LOGO
                    ================================================== */}
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="group flex items-center shrink-0"
                    >
                        <Image
                            src="/images/general/logo.png"
                            alt="Kamal Group of Developer"
                            width={180}
                            height={55}
                            priority
                            className="h-auto w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:w-[165px] md:w-[180px]"
                        />
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
                            {/* whyChoose us */}
                            {isHome && (
                                <li>
                                    <a
                                        href="#why-choose-us"
                                        className="nav-link"
                                    >
                                        whyChooseUs
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
                                        {projectMenuItems.map((item) => (
                                            <DropdownMenuItem
                                                key={item.href}
                                                asChild
                                                className=" focus:text-white"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="cursor-pointer rounded-md p-1 text-sm text-foreground hover:!text-black"
                                                >
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
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
                                <li>
                                    {isHome ? (
                                        <a
                                            href="#team"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Team
                                        </a>
                                    ) : (
                                        <Link
                                            href="/team"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
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
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            Testimonials
                                        </a>
                                    </li>
                                )}
                                {isHome && (
                                    <li>
                                        <a
                                            href="#why-choose-us"
                                            onClick={closeMenu}
                                            className="nav-link block py-3"
                                        >
                                            whyChooseUS
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

