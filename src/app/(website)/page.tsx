import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import TeamSection from "@/components/sections/TeamSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />


            <AboutSection />


            <section
                id="services"
                className="flex min-h-[500px] items-center justify-center border-t border-white/10 px-6"
            >
                <h2 className="text-3xl font-bold">Services</h2>
            </section>




            <TeamSection />


            <section
                id="testimonials"
                className="flex min-h-[500px] items-center justify-center border-t border-white/10 px-6"
            >
                <h2 className="text-3xl font-bold">Testimonials</h2>
            </section>


            <ContactSection />

        </>
    );
};

export default HomePage;