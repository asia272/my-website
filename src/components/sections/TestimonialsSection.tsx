"use client";

import Image from "next/image";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import PageHeading from "../shared/PageHeading";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "../ui/carousel";
import { BorderBeam } from "../ui/border-beam";

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

const TestimonialCard = ({
    name,
    role,
    company,
    message,
    image,
}: Testimonial) => {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <figure
            className={cn(
                "group relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5",
                "border-border bg-card/80 backdrop-blur-sm",
                "transition-all duration-300",
                "hover:border-primary/30 hover:bg-card",
            )}
        >

            {/* Beam moving opposite direction */}
            <BorderBeam
                duration={6}
                delay={3}
                size={400}
                borderWidth={1}
                initialOffset={0}
                reverse
                className="from-transparent via-blue-500 to-transparent"
            />

            {/* Subtle glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10"
            />

            <div className="relative z-10">
                {/* Client Header */}
                <div className="flex items-center gap-3">
                    {image ? (
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="44px"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                            {initials}
                        </div>
                    )}

                    <figcaption className="min-w-0">
                        <div className="truncate text-sm font-semibold text-foreground">
                            {name}
                        </div>

                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                            {role}
                            {company && ` · ${company}`}
                        </div>
                    </figcaption>

                    {/* Quote Icon */}
                    <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/5">
                        <Quote
                            size={15}
                            strokeWidth={1.8}
                            className="text-primary"
                        />
                    </div>
                </div>

                {/* Testimonial */}
                <blockquote className="mt-6 min-h-[112px] text-sm leading-7 text-muted-foreground">
                    “{message}”
                </blockquote>

                {/* Rating */}
                <div
                    className="mt-6 flex items-center justify-center gap-1.5"
                    aria-label="5 out of 5 stars"
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={14}
                            strokeWidth={1.5}
                            className="fill-primary text-primary"
                        />
                    ))}
                </div>
            </div>
        </figure>
    );
};

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
            className="section mx-auto max-w-350 overflow-hidden"
            id="testimonials"
        >
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
                {/* Left fade */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-background to-transparent sm:w-10 md:w-16"
                />

                {/* Right fade */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-background to-transparent sm:w-10 md:w-16"
                />
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
                <div className="mt-10 flex items-center justify-center gap-5 sm:gap-8">
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