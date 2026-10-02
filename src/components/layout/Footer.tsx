import Link from "next/link";
import {
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import {
    FaGithub,
    FaLinkedinIn,
    FaFacebookF,
} from "react-icons/fa";

import {
    SiUpwork,
    SiFiverr,
} from "react-icons/si";

import Image from "next/image";

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/",
        icon: FaGithub,
        bgColor: "bg-[#181717]",
        borderColor: "border-[#181717]",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: FaLinkedinIn,
        bgColor: "bg-[#0A66C2]",
        borderColor: "border-[#0A66C2]",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: FaFacebookF,
        bgColor: "bg-[#1877F2]",
        borderColor: "border-[#1877F2]",
    },
    {
        label: "Upwork",
        href: "https://www.upwork.com/",
        icon: SiUpwork,
        bgColor: "bg-[#14A800]",
        borderColor: "border-[#14A800]",
    },
    {
        label: "Fiverr",
        href: "https://www.fiverr.com/",
        icon: SiFiverr,
        bgColor: "bg-[#1DBF73]",
        borderColor: "border-[#1DBF73]",
    },
];

/* =========================================================
   FOOTER DATA
   ========================================================= */

const footerNavigation = [
    {
        title: "Company",
        links: [
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Team", href: "/Team" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Services",
        links: [
            {
                label: "Web Development",
                href: "/services/web-development",
            },
            {
                label: "App Development",
                href: "/services/app-developmetn",
            },
            {
                label: "Generative AI",
                href: "/services/generative-ai",
            },
            {
                label: "Full-Stack Development",
                href: "/services/full-stack-development",
            },
            {
                label: "UI/UX Design",
                href: "/services/ui-ux-design",
            },

        ],
    },
];

/* =========================================================
   FOOTER
   ========================================================= */

const Footer = () => {
    return (
        <footer
            aria-labelledby="footer-heading"
            className="
                relative
                overflow-hidden
                border-t
                border-[var(--border)]
                bg-[var(--background)]
            "
        >
            {/* =================================================
                BACKGROUND DECORATION
               ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-580
                    w-80
                    rounded-full
                    opacity-10
                    blur-[120px]
                "
                style={{
                    background: "var(--chart-3)",
                }}
            />

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[var(--container-width)]
                    px-[var(--container-padding)]
                "
            >
                {/* =================================================
                    CTA
                   ================================================= */}

                <div
                    className="
                        border-b
                        border-[var(--border)]
                        py-14
                        sm:py-16
                        lg:py-20
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-7
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                            lg:gap-12
                        "
                    >
                        <div className="max-w-2xl">
                            <div
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-md
                                    "
                                    style={{
                                        background:
                                            "var(--gradient-primary)",
                                        color:
                                            "var(--primary-foreground)",
                                    }}
                                >
                                    <Sparkles
                                        className="h-3.5 w-3.5"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </span>

                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[var(--primary)]
                                    "
                                >
                                    Let&apos;s work together
                                </span>
                            </div>

                            <h2
                                id="footer-heading"
                                className="
                                    max-w-xl
                                    leading-tight
                                    tracking-[-0.035em]
                                    text-[var(--foreground)]
                                "
                            >
                                Have an idea?
                                <br />
                                <span className="text-gradient">
                                    Let&apos;s build it.
                                </span>
                            </h2>

                            <p
                                className="
                                    mt-5
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-[var(--muted-foreground)]
                                    sm:text-base
                                "
                            >
                                Tell us about your idea, business goals, or
                                technical challenge. We&apos;ll help turn it
                                into a scalable digital solution.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="
                                custom-btn
                                group
                                shrink-0
                                self-start
                                lg:self-auto
                            "
                        >
                            <span>Start a Project</span>

                            <ArrowUpRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                "
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    MAIN FOOTER CONTENT
                   ================================================= */}

                <div
                    className="
                        grid
                        gap-12
                        py-14
                        sm:py-16
                        lg:grid-cols-[1.25fr_1fr_1fr_1.15fr]
                        lg:gap-10
                        lg:py-18
                        xl:gap-16
                    "
                >
                    {/* =================================================
                        BRAND
                       ================================================= */}

                    <div className="max-w-sm">
                        <Link
                            href="/"
                            aria-label="Kamal Group of Developer home"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-xl
                                font-bold
                                tracking-[-0.03em]
                                text-[var(--foreground)]
                            "
                        >
                            <Image
                                src="/images/general/logo.png"
                                alt="Kamal Group of Developer"
                                width={180}
                                height={55}
                                priority
                                className="
                                    h-auto
                                    object-contain
                                    transition-transform
                                    duration-300
                                    group-hover:scale-[1.03]
                                    sm:w-[165px]
                                    md:w-[180px]
                                "
                            />
                        </Link>

                        <p
                            className="
                                mt-5
                                text-sm
                                leading-7
                                text-[var(--muted-foreground)]
                            "
                        >
                            We build modern, scalable, and reliable digital
                            solutions that help businesses operate better,
                            grow faster, and turn ambitious ideas into
                            meaningful products.
                        </p>
                    </div>

                    {/* =================================================
                        NAVIGATION COLUMNS
                       ================================================= */}

                    {footerNavigation.map((section) => (
                        <div key={section.title}>
                            <h5
                                className="
                                    text-sm
                                    font-semibold
                                    text-[var(--foreground)]
                                "
                            >
                                {section.title}
                            </h5>

                            <ul
                                className="
                                    mt-5
                                    space-y-3.5
                                "
                            >
                                {section.links.map((link) => (
                                    <li key={link.label} className="mb-[4px]">
                                        <Link
                                            href={link.href}
                                            className="
                                                group
                                                inline-flex
                                                items-center
                                                gap-1
                                                text-sm
                                                leading-6
                                                text-[var(--muted-foreground)]
                                                transition-colors
                                                duration-200
                                                hover:text-[var(--foreground)]
                                            "
                                        >
                                            <span
                                                className="
                                                    text-[var(--muted-foreground)]
                                                    transition-colors
                                                    duration-200
                                                    group-hover:text-[var(--foreground)]
                                                "
                                            >
                                                {link.label}
                                            </span>

                                            <ArrowUpRight
                                                className="
                                                    h-3
                                                    w-3
                                                    opacity-0
                                                    transition-all
                                                    duration-200
                                                    group-hover:translate-x-0.5
                                                    group-hover:-translate-y-0.5
                                                    group-hover:opacity-100
                                                "
                                                strokeWidth={1.8}
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}


                    {/* =================================================
    GET IN TOUCH
   ================================================= */}

                    <div>
                        <h5
                            className="
            text-sm
            font-semibold
            text-[var(--foreground)]
        "
                        >
                            Get In Touch
                        </h5>


                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit us on ${social.label}`}
                                        className={`
                    group
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-sm
                    border
                    ${social.borderColor}
                    ${social.bgColor}
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    ease-out
                    hover:scale-110
                    hover:shadow-lg
                `}
                                    >
                                        <Icon
                                            className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                                            aria-hidden="true"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    BOTTOM BAR
                   ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        border-t
                        border-[var(--border)]
                        py-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p
                        className="
                            text-xs
                            leading-5
                            text-[var(--muted-foreground)]
                            sm:text-sm
                        "
                    >
                        © {new Date().getFullYear()} KmalGorupOfDeveloper. All rights
                        reserved.
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-5
                            gap-y-2
                        "
                    >
                        <Link
                            href="/privacy-policy"
                            className="
                                text-xs
                                text-[var(--muted-foreground)]
                                transition-colors
                                hover:text-[var(--foreground)]
                                sm:text-sm
                            "
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="
                                text-xs
                                text-[var(--muted-foreground)]
                                transition-colors
                                hover:text-[var(--foreground)]
                                sm:text-sm
                            "
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;