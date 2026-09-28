"use client";


import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import TestimonialCard from "../TestimonialsCard";

import PageHeading from "../shared/PageHeading";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "../ui/carousel";


type Testimonial = {
    id: number;
    name: string;
    role: string;
    company: string;
    message: string;
    image?: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Ahmed Raza",
        role: "Founder",
        company: "SaaS Startup",
        message:
            "The development process was smooth from start to finish. The communication was clear, and the final product was clean, responsive, and exactly what we needed.",
    },
    {
        id: 2,
        name: "Hassan Ali",
        role: "Business Owner",
        company: "E-commerce",
        message:
            "I really appreciated the attention to detail. The website feels professional, performs well, and works beautifully across different screen sizes.",
    },
    {
        id: 3,
        name: "Usman Khan",
        role: "Product Manager",
        company: "Digital Product",
        message:
            "The requirements were understood quickly and translated into a well-structured product. The overall experience was professional and straightforward.",
    },
    {
        id: 4,
        name: "Muhammad Saad",
        role: "Founder",
        company: "Tech Startup",
        message:
            "The final interface was much more polished than our original concept. The implementation was thoughtful, responsive, and easy to work with.",
    },
    {
        id: 5,
        name: "Bilal Ahmed",
        role: "Entrepreneur",
        company: "Online Business",
        message:
            "Everything from the initial discussion to the final delivery was organized. The result gave our business a much stronger online presence.",
    },
    {
        id: 6,
        name: "Hamza Malik",
        role: "Founder",
        company: "Web Platform",
        message:
            "A great development experience with strong attention to functionality and user experience. The final result was clean, scalable, and maintainable.",
    },
];



const TestimonialsSection = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const totalSlides = testimonials.length;

    useEffect(() => {
        if (!api) return;

        const updateCurrent = () => {
            setCurrent(api.selectedScrollSnap());
        };

        updateCurrent();

        api.on("select", updateCurrent);

        return () => {
            api.off("select", updateCurrent);
        };
    }, [api]);

    const goToPrevious = () => {
        api?.scrollPrev();
    };

    const goToNext = () => {
        api?.scrollNext();
    };

    const progress =
        totalSlides > 1
            ? ((current + 1) / totalSlides) * 100
            : 100;

    // Auto-Play
    const autoplay = Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });

    return (
        <section
            className="section relative mx-auto max-w-350 overflow-hidden"
            id="testimonials"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
                <div
                    className="
            absolute
            left-1/2
            top-[15%]
            h-[400px]
            w-[400px]
            -translate-x-1/2
            rounded-full
            bg-[var(--chart-2)]/10
            blur-[120px]
        "
                />

                <div
                    className="
            absolute
            -right-20
            top-10
            h-[300px]
            w-[300px]
            rounded-full
            bg-[var(--chart-3)]/10
            blur-[110px]
        "
                />

                <div
                    className="
            absolute
            -left-20
            bottom-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-[var(--chart-4)]/8
            blur-[110px]
        "
                />

            </div>
            {/* Heading */}
            <PageHeading
                label="Testimonials"
                title="What our clients"
                highlightedText="say about us."
                fontSize="clamp(1.7rem,3vw,2.11rem)"
                description="Hear from clients and collaborators about their experience working with us to build modern, reliable, and impactful digital products."
                isCenter
            />

            {/* Testimonials Carousel */}
            <div className="relative mt-20 w-full px-4 sm:px-6 lg:px-8">

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[autoplay]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-5">
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.id}
                                className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
                            >
                                <TestimonialCard {...testimonial} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                {/* Controls + Progress */}
                <div className="mt-12 flex items-center justify-center gap-5 sm:gap-8">
                    {/* Previous */}
                    <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous testimonial"
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            bg-card/60
                            text-foreground
                            backdrop-blur-sm
                            transition-all
                            duration-300
                            hover:border-primary/40
                            hover:bg-card
                            hover:text-primary
                            active:scale-95
                        "
                    >
                        <ArrowLeft
                            size={17}
                            strokeWidth={1.6}
                        />
                    </button>

                    {/* Progress */}
                    <div className="flex min-w-[180px] flex-col items-center gap-3 sm:min-w-[300px]">
                        <div className="flex items-center gap-3 font-mono text-sm">
                            <span className="text-foreground">
                                {String(current + 1).padStart(2, "0")}
                            </span>

                            <span className="text-muted-foreground">
                                /
                            </span>

                            <span className="text-muted-foreground">
                                {String(totalSlides).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next testimonial"
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            bg-card/60
                            text-foreground
                            backdrop-blur-sm
                            transition-all
                            duration-300
                            hover:border-primary/40
                            hover:bg-card
                            hover:text-primary
                            active:scale-95
                        "
                    >
                        <ArrowRight
                            size={17}
                            strokeWidth={1.6}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;