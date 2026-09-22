"use client";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactRightSide from "@/components/ContactRightSide";
import OrbitDecorations from "@/components/shared/OrbitDecorations";

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
            {/* =====================================================
                DIVIDER
            ====================================================== */}

            <div className="divider" />

            {/* =====================================================
                CONTACT CONTENT
            ====================================================== */}

            <section className="section relative isolate overflow-hidden">
                {/* =====================================================
        ORBIT DECORATIONS
    ====================================================== */}

                <OrbitDecorations />

                {/* =====================================================
        CONTACT CONTENT
    ====================================================== */}

                <div
                    className="
            container
            relative
            z-10
            grid
            gap-14
            lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]
            lg:gap-20
            xl:gap-28
        "
                >
                    {/* LEFT — FORM */}
                    <ContactForm />

                    {/* RIGHT — CONTACT INFORMATION */}
                    <ContactRightSide />
                </div>
            </section>

        </div>
    );
};

export default Page;