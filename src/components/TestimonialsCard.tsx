
"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { BorderBeam } from "./ui/border-beam";

export type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    image?: string;
};

const TestimonialCard = ({
    name,
    role,
    company,
    message,
    rating,
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
                size={200}
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
                            {company && ` · ${company} `}
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
                <blockquote className="mt-6 min-h-[112px] break-words whitespace-normal text-sm leading-7 text-muted-foreground">
                    “{message}”
                </blockquote>

                {/* Rating */}
                <div
                    className="mt-6 flex items-center justify-center gap-1.5"
                    aria-label={`${rating} out of 5 stars`}
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

export default TestimonialCard;
