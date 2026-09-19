"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
                        MyLogo
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
                            {isHome && (
                                <li>
                                    <a
                                        href="#team"
                                        className="nav-link"
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

                            {/* Projects */}
                            <li>
                                <Link
                                    href="/projects"
                                    className="nav-link"
                                >
                                    Projects
                                </Link>
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

                                {/* Projects */}
                                <li>
                                    <Link
                                        href="/projects"
                                        onClick={closeMenu}
                                        className="nav-link block py-3"
                                    >
                                        Projects
                                    </Link>
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
