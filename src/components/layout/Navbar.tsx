
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const scrollConfig = {
    smooth: true,
    duration: 500,
    offset: -60,
    spy: true,
    activeClass: "nav-link-active",
    className: "nav-link cursor-pointer",
};

const Navbar = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHome = pathname === "/";
    const isServices = pathname.startsWith("/services");
    const isProjects = pathname.startsWith("/projects");
    const isContact = pathname.startsWith("/contact");

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
                                    <ScrollLink
                                        to="home"
                                        {...scrollConfig}
                                    >
                                        Home
                                    </ScrollLink>
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
                                    <ScrollLink
                                        to="about"
                                        {...scrollConfig}
                                    >
                                        About
                                    </ScrollLink>
                                </li>
                            )}

                            {/* Services */}
                            <li>
                                {isHome ? (
                                    <ScrollLink
                                        to="services"
                                        {...scrollConfig}
                                    >
                                        Services
                                    </ScrollLink>
                                ) : (
                                    <Link
                                        href="/services"
                                        className={`nav-link ${isServices
                                            ? "nav-link-active"
                                            : ""
                                            }`}
                                    >
                                        Services
                                    </Link>
                                )}
                            </li>

                            {/* Team */}
                            {isHome && (
                                <li>
                                    <ScrollLink
                                        to="team"
                                        {...scrollConfig}
                                    >
                                        Team
                                    </ScrollLink>
                                </li>
                            )}

                            {/* Testimonials */}
                            {isHome && (
                                <li>
                                    <ScrollLink
                                        to="testimonials"
                                        {...scrollConfig}
                                    >
                                        Testimonials
                                    </ScrollLink>
                                </li>
                            )}

                            {/* Contact */}
                            <li>
                                {isHome ? (
                                    <ScrollLink
                                        to="contact"
                                        {...scrollConfig}
                                    >
                                        Contact
                                    </ScrollLink>
                                ) : (
                                    <Link
                                        href="/contact"
                                        className={`nav-link ${isContact
                                            ? "nav-link-active"
                                            : ""
                                            }`}
                                    >
                                        Contact
                                    </Link>
                                )}
                            </li>

                            {/* Projects */}
                            <li>
                                <Link
                                    href="/projects"
                                    className={`nav-link ${isProjects
                                        ? "nav-link-active"
                                        : ""
                                        }`}
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
                                        <ScrollLink
                                            to="home"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            Home
                                        </ScrollLink>
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
                                        <ScrollLink
                                            to="about"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            About
                                        </ScrollLink>
                                    </li>
                                )}

                                {/* Services */}
                                <li>
                                    {isHome ? (
                                        <ScrollLink
                                            to="services"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            Services
                                        </ScrollLink>
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
                                        <ScrollLink
                                            to="team"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            Team
                                        </ScrollLink>
                                    </li>
                                )}

                                {/* Testimonials */}
                                {isHome && (
                                    <li>
                                        <ScrollLink
                                            to="testimonials"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            Testimonials
                                        </ScrollLink>
                                    </li>
                                )}

                                {/* Contact */}
                                <li>
                                    {isHome ? (
                                        <ScrollLink
                                            to="contact"
                                            {...scrollConfig}
                                            onClick={closeMenu}
                                        >
                                            Contact
                                        </ScrollLink>
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
                                        className={`nav-link block py-3 ${isProjects
                                            ? "nav-link-active"
                                            : ""
                                            }`}
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
