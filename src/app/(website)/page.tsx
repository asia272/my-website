import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <TeamSection />
            <TestimonialsSection />
            <WhyChooseUsSection />
            <ContactSection />

        </>
    );
};

export default HomePage;