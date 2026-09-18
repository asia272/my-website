"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";

const scrollConfig = {
    smooth: true,
    duration: 500,
    offset: -60,
    spy: true,
};

type SectionName =
    | "home"
    | "about"
    | "services"
    | "team"
    | "testimonials"
    | "contact";

const Navbar = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] =
        useState<SectionName>("home");

    const isHome = pathname === "/";
    const isServices = pathname.startsWith("/services");
    const isProjects = pathname.startsWith("/projects");
    const isContact = pathname.startsWith("/contact");

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((previous) => !previous);
    };

    const handleSectionClick = (section: SectionName) => {
        setActiveSection(section);
    };

    const getSectionClass = (section: SectionName) =>
        `nav-link ${activeSection === section ? "active-link" : ""
        }`;

    return (
        <header className="fixed left-0 top-0 z-[2000] w-full bg-[#0B192C] text-white">
            <nav
                className="mx-auto flex h-[4.7rem] w-full items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-xl font-bold tracking-tight text-white transition-colors duration-300 hover:text-[#FFD25D]"
                >
                    MyLogo
                </Link>

                {/* ==================== DESKTOP NAVIGATION ==================== */}
                <div className="hidden items-center md:flex">
                    <ul className="flex items-center gap-6">

                        {/* Home */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="home"
                                    {...scrollConfig}
                                    className={getSectionClass("home")}
                                    onClick={() =>
                                        handleSectionClick("home")
                                    }
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
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="about"
                                    {...scrollConfig}
                                    className={getSectionClass("about")}
                                    onClick={() =>
                                        handleSectionClick("about")
                                    }
                                >
                                    About
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#about"
                                    className="nav-link"
                                >
                                    About
                                </Link>
                            )}
                        </li>

                        {/* Services */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="services"
                                    {...scrollConfig}
                                    className={getSectionClass("services")}
                                    onClick={() =>
                                        handleSectionClick("services")
                                    }
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

                        {/* Team */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="team"
                                    {...scrollConfig}
                                    className={getSectionClass("team")}
                                    onClick={() =>
                                        handleSectionClick("team")
                                    }
                                >
                                    Team
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#team"
                                    className="nav-link"
                                >
                                    Team
                                </Link>
                            )}
                        </li>

                        {/* Testimonials */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="testimonials"
                                    {...scrollConfig}
                                    className={getSectionClass(
                                        "testimonials"
                                    )}
                                    onClick={() =>
                                        handleSectionClick(
                                            "testimonials"
                                        )
                                    }
                                >
                                    Testimonials
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#testimonials"
                                    className="nav-link"
                                >
                                    Testimonials
                                </Link>
                            )}
                        </li>

                        {/* Contact */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="contact"
                                    {...scrollConfig}
                                    className={getSectionClass("contact")}
                                    onClick={() =>
                                        handleSectionClick("contact")
                                    }
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
                    </ul>
                </div>

                {/* ==================== MOBILE MENU BUTTON ==================== */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="rounded-lg p-2 text-white transition-colors duration-300 hover:bg-white/10 hover:text-[#FFD25D] md:hidden"
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? (
                        <X className="size-6" />
                    ) : (
                        <Menu className="size-6" />
                    )}
                </button>
            </nav>

            {/* ==================== MOBILE NAVIGATION ==================== */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-white/10 bg-[#0B192C] md:hidden"
                >
                    <ul className="flex flex-col items-center justify-center gap-2 px-6 py-8">

                        {/* Home */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="home"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "home"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick("home");
                                        closeMenu();
                                    }}
                                >
                                    Home
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="nav-link mobile-nav-link"
                                >
                                    Home
                                </Link>
                            )}
                        </li>

                        {/* About */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="about"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "about"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick("about");
                                        closeMenu();
                                    }}
                                >
                                    About
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#about"
                                    onClick={closeMenu}
                                    className="nav-link mobile-nav-link"
                                >
                                    About
                                </Link>
                            )}
                        </li>

                        {/* Services */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="services"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "services"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick("services");
                                        closeMenu();
                                    }}
                                >
                                    Services
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/services"
                                    onClick={closeMenu}
                                    className={`nav-link mobile-nav-link ${isServices
                                            ? "nav-link-active"
                                            : ""
                                        }`}
                                >
                                    Services
                                </Link>
                            )}
                        </li>

                        {/* Projects */}
                        <li>
                            <Link
                                href="/projects"
                                onClick={closeMenu}
                                className={`nav-link mobile-nav-link ${isProjects
                                        ? "nav-link-active"
                                        : ""
                                    }`}
                            >
                                Projects
                            </Link>
                        </li>

                        {/* Team */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="team"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "team"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick("team");
                                        closeMenu();
                                    }}
                                >
                                    Team
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#team"
                                    onClick={closeMenu}
                                    className="nav-link mobile-nav-link"
                                >
                                    Team
                                </Link>
                            )}
                        </li>

                        {/* Testimonials */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="testimonials"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "testimonials"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick(
                                            "testimonials"
                                        );
                                        closeMenu();
                                    }}
                                >
                                    Testimonials
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/#testimonials"
                                    onClick={closeMenu}
                                    className="nav-link mobile-nav-link"
                                >
                                    Testimonials
                                </Link>
                            )}
                        </li>

                        {/* Contact */}
                        <li>
                            {isHome ? (
                                <ScrollLink
                                    to="contact"
                                    {...scrollConfig}
                                    className={`${getSectionClass(
                                        "contact"
                                    )} mobile-nav-link`}
                                    onClick={() => {
                                        handleSectionClick("contact");
                                        closeMenu();
                                    }}
                                >
                                    Contact
                                </ScrollLink>
                            ) : (
                                <Link
                                    href="/contact"
                                    onClick={closeMenu}
                                    className={`nav-link mobile-nav-link ${isContact
                                            ? "nav-link-active"
                                            : ""
                                        }`}
                                >
                                    Contact
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;