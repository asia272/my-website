"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

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

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

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
                "group relative w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl border p-5",
                "border-border bg-card/80 backdrop-blur-sm",
                "transition-all duration-300",
                "hover:border-primary/30 hover:bg-card",
                "sm:w-[360px]"
            )}
        >
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
    return (<section className="section overflow-hidden max-w-350 mx-auto" id="testimonials">
        {/* Heading */} <div className="container"> <div className="mx-auto mb-12 max-w-2xl text-center"> <span className="section-label">
            Testimonials </span>


            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                What our clients
                <br />
                <span className="text-gradient">
                    say about us.
                </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Hear from clients and collaborators about their
                experience working with us to build modern,
                reliable, and impactful digital products.
            </p>
        </div>
        </div>

        {/* Marquee */}
        <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden  py-20 md:shadow-xl'>
            {/* Left fade */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32 md:w-40"
            />

            {/* Right fade */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32 md:w-40"
            />

            {/* Row 1 */}
            <Marquee
                pauseOnHover
                className="[--duration:20s] "
            >
                {firstRow.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        {...testimonial}
                    />
                ))}
            </Marquee>

            {/* Row 2 */}
            <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
            >
                {secondRow.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        {...testimonial}
                    />
                ))}
            </Marquee>
        </div>
    </section>
    );


};

export default TestimonialsSection;
