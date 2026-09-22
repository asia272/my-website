"use client";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/ContactForm";

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
            <ContactForm />
        </div>
    );
};

export default Page;