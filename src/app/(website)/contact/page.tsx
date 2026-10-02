"use client";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/ContactForm";
import OrbitDecorations from "@/components/shared/OrbitDecorations";
import ContactPageContent from "@/components/ContactPageContent";

const Page = () => {
    return (
        <div className="relative overflow-hidden">
            <PageHero
                breadcrumb="Contact"
                label="Get In Touch"
                title="Let's Build"
                highlightedText="Something Great"
                description="Have a project in mind? Let's discuss how we can turn your idea into a fast, scalable, and professional digital experience."
            />


            <section className="section relative isolate overflow-hidden">

                <OrbitDecorations />
                <div className="contact-page-bg"></div>
                <div className="container  z-10">
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

                        <ContactPageContent />

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

        </div>
    );
};

export default Page;