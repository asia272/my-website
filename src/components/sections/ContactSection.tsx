import ContactForm from "../ContactForm";
import ContactLeftSide from "../ContactLeftSide";

export default function ContactSection() {
    return (
        <section id="contact" className="section relative overflow-hidden   min-h-[500px] items-center ">
            {/* Backgroud Decoration */}
            <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        left-[-220px]
        top-[35%]
        z-0
        h-[820px]
        w-[520px]
        rounded-full
        bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_18%,transparent)_0%,color-mix(in_srgb,var(--chart-2)_8%,transparent)_35%,transparent_70%)]
        blur-[80px]
    "
            />
            <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        left-[-280px]
        top-[20%]
        z-0
        h-[480px]
        w-[680px]
        rounded-full
        bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-1)_16%,transparent)_0%,color-mix(in_srgb,var(--chart-2)_7%,transparent)_35%,transparent_70%)]
        blur-[75px]
    "
            />
            <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        right-[180px]
        top-[-150px]
        z-0
        h-[520px]
        w-[820px]
        rounded-full
        bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_16%,transparent)_0%,color-mix(in_srgb,var(--chart-3)_7%,transparent)_35%,transparent_70%)]
        blur-[75px]
    "
            />
            <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        bottom-[-180px]
        right-[-180px]
        z-0
        h-[520px]
        w-[520px]
        rounded-full
        bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_16%,transparent)_0%,color-mix(in_srgb,var(--chart-1)_7%,transparent)_35%,transparent_70%)]
        blur-[45px]
    "
            />
            <img
                src="/images/general/contact2-bg.png"
                alt=""
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[-90px]
                    right-0
                    z-0
                    w-[560px]
                    max-w-none
                    opacity-[0.10]
                    blur-[1px]
                    sm:w-[650px]
                    lg:bottom-[-110px]
                    lg:right-0
                    lg:w-[780px]
                    lg:opacity-[0.12]
                    xl:w-[860px]
                    animate-contact-float
                "
            />
            {/* Section Content */}

            <div className="container relative z-10">
                <div
                    className="
                        grid
                        grid-cols-1
                        items-start
                        gap-12
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:gap-16
                        xl:gap-24
                    "
                >
                    {/* LEFT */}

                    <ContactLeftSide />

                    {/* RIGHT */}
                    <div
                        data-aos="fade-left"
                        id="contact-form"
                        className="
                            glass
                            rounded-2xl
                            border
                            border-border
                            p-5
                            sm:p-7
                            lg:p-8
                            xl:p-10
                        "
                    >
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}