import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold text-white"
                        >
                            MyLogo
                        </Link>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                            We build modern, scalable digital experiences for businesses
                            and ambitious ideas.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                        <Link
                            href="/#about"
                            className="text-white/60 transition-colors hover:text-white"
                        >
                            About
                        </Link>

                        <Link
                            href="/services"
                            className="text-white/60 transition-colors hover:text-white"
                        >
                            Services
                        </Link>

                        <Link
                            href="/projects"
                            className="text-white/60 transition-colors hover:text-white"
                        >
                            Projects
                        </Link>

                        <Link
                            href="/contact"
                            className="text-white/60 transition-colors hover:text-white"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                    <p className="text-sm text-white/40">
                        © {new Date().getFullYear()} MyLogo. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;