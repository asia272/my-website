import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />

            <section
                id="about"
                className="flex min-h-[500px] items-center justify-center border-t border-white/10 px-6"
            >
                <h2 className="text-3xl font-bold">About</h2>
            </section>

            <section
                id="services"
                className="flex min-h-[500px] items-center justify-center border-t border-white/10 px-6"
            >
                <h2 className="text-3xl font-bold">Services</h2>
            </section>



            <section
                id="team"
                className="flex min-h-[500px] items-center justify-center border-t border-white/10 px-6"
            >
                <h2 className="text-3xl font-bold">Team</h2>
            </section>

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