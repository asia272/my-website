
import Link from "next/link";
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";

import {
    FaGithub,
    FaLinkedinIn,
    FaFacebookF,
} from "react-icons/fa";

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/",
        icon: FaGithub,
        bgColor: "bg-[#181717]",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: FaLinkedinIn,
        bgColor: "bg-[#0A66C2]",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: FaFacebookF,
        bgColor: "bg-[#1877F2]",
    },
];

/* =========================================================
   FOOTER DATA
   ========================================================= */
const footerNavigation = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/#about" },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Web Development", href: "/services/web-development" },
            { label: "Generative AI", href: "/services/generative-ai" },
            { label: "Full-Stack Development", href: "/services/full-stack-development" },
            { label: "UI/UX Design", href: "/services/ui-ux-design" },
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
                                    text-2xl
                                    font-bold
                                    leading-tight
                                    tracking-[-0.035em]
                                    text-[var(--foreground)]
                                    sm:text-3xl
                                    lg:text-5xl
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
                            aria-label="kamalGroupOFDeveloper home"
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
                            <span
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                "
                                style={{
                                    background:
                                        "var(--gradient-primary)",
                                    color:
                                        "var(--primary-foreground)",
                                }}
                            >
                                <Sparkles
                                    className="h-4 w-4"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </span>

                            <span>
                                KmalGroupOf <span className="text-[var(--primary)]">Dvelopers</span>
                            </span>
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
                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit BuitinSoft on ${social.label}`}
                                        className={`
                    group
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded
                    border
                    border-transparent
                    ${social.bgColor}
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    ease-out
                    hover:scale-90
                    hover:shadow-none
                `}
                                    >
                                        <Icon
                                            className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:scale-90
                    "
                                            aria-hidden="true"
                                        />
                                    </a>
                                );
                            })}
                        </div>
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
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="
                                                group
                                                inline-flex
                                                items-center
                                                gap-1
                                                text-sm
                                                leading-6
                                              
                                                transition-colors
                                                duration-200
                                                hover:text-[var(--foreground)]
                                                 text-[var(--muted-foreground)]
                                            "
                                        >
                                            <span className=" text-[var(--muted-foreground)]
                                        transition-colors
                                        duration-200
                                        group-hover:text-[var(--foreground)]">
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
                        CONTACT
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

                        <div className="mt-5 space-y-4">
                            <a
                                href="#"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <Mail
                                    className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-[var(--primary)]
                                    "
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span
                                    className="
                                        break-all
                                        text-sm
                                        leading-6
                                        text-[var(--muted-foreground)]
                                        transition-colors
                                        duration-200
                                        group-hover:text-[var(--foreground)]
                                    "
                                >
                                    examle@gmail.com
                                </span>
                            </a>

                            <a
                                href="tel:+923022094272"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <Phone
                                    className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-[var(--primary)]
                                    "
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span
                                    className="
                                        text-sm
                                        leading-6
                                        text-[var(--muted-foreground)]
                                        transition-colors
                                        duration-200
                                        group-hover:text-[var(--foreground)]
                                    "
                                >
                                    +92 (302) 2094272
                                </span>
                            </a>

                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <MapPin
                                    className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-[var(--primary)]
                                    "
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span
                                    className="
                                        text-sm
                                        leading-6
                                        text-[var(--muted-foreground)]
                                    "
                                >
                                    Punjab, Pakistan
                                </span>
                            </div>
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
                        © {new Date().getFullYear()} BuitinSoft. All rights
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

