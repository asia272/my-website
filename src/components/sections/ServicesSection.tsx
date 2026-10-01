"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PageHeading from "../shared/PageHeading";
import ServiceCard from "../ServiceCard";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "../ui/carousel";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ServiceCardSkeleton from "../skeleton/ServiceCardSkeleton";

const ServicesSection = () => {
    const services = useQuery(api.services.getAll);

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [snapCount, setSnapCount] = useState(0);

    const activeServices = useMemo(() => {
        if (!services) return [];

        return services.filter((service) => service.isActive);
    }, [services]);

    useEffect(() => {
        if (!carouselApi) return;

        const updateCarouselState = () => {
            setCurrent(carouselApi.selectedScrollSnap());
            setSnapCount(carouselApi.scrollSnapList().length);
        };

        updateCarouselState();

        carouselApi.on("select", updateCarouselState);
        carouselApi.on("reInit", updateCarouselState);

        return () => {
            carouselApi.off("select", updateCarouselState);
            carouselApi.off("reInit", updateCarouselState);
        };
    }, [carouselApi]);;

    const isLoading = services === undefined;

    return (
        <section className="services-section-bg section relative isolate overflow-hidden" id="services">


            {/* Animated digital-wave background */}
            <div
                aria-hidden="true"
                className="services-wave-bg pointer-events-none absolute inset-0 z-0"
            >
                {/* Moving image layer */}
                <div className="services-wave-bg__image absolute -inset-[4%]" />

                {/* Readability overlay */}
                <div className="services-wave-bg__overlay absolute inset-0" />

                {/* Subtle ambient glow */}
                <div className="services-wave-bg__glow absolute inset-0" />
            </div>








            <div className="container">
                {/* Heading */}
                <PageHeading
                    label="Our Services"
                    title="Solutions built for"
                    highlightedText="real-world impact."
                    description="From modern websites to full-stack applications, we provide reliable digital solutions designed around your business goals."
                    isCenter
                    fontSize="clamp(1.7rem,3vw,2.11rem)"
                    letterSpacing="0.2px"
                />

                {/* Loading */}
                {isLoading && (
                    <div
                        className="
        mt-12 grid gap-5
        md:grid-cols-2
        lg:grid-cols-3
    "
                    >
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ServiceCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && activeServices.length === 0 && (
                    <div
                        className="
                            mt-12 flex min-h-[300px]
                            flex-col items-center justify-center
                            rounded-2xl border border-white/10
                            bg-white/[0.02]
                            px-6 text-center
                        "
                    >
                        <div
                            className="
                                mb-4 flex size-14 items-center
                                justify-center rounded-full
                                border border-[#6d65fe]/20
                                bg-[#6d65fe]/10
                            "
                        >
                            <BriefcaseBusiness className="size-6 text-[#8b85ff]" />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            Services coming soon
                        </h3>

                        <p className="mt-2 max-w-md text-sm text-white/50">
                            We are currently preparing our services.
                            Please check back soon.
                        </p>
                    </div>
                )}

                {/* Services carousel */}
                {!isLoading && activeServices.length > 0 && (
                    <div className="mt-8">
                        <Carousel
                            setApi={setCarouselApi}
                            opts={{
                                align: "start",
                                loop: activeServices.length > 3,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 2500,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: true,
                                }),
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {activeServices.map((service, index) => (
                                    <CarouselItem
                                        key={service._id}

                                        className="
            basis-full
            pl-4
            md:basis-1/2
            lg:basis-1/3
        "
                                    >
                                        <div data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            data-aos-duration="700">
                                            <ServiceCard
                                                title={service.title}
                                                icon={service.icon}
                                                description={service.description}
                                                listItems={service.listItems}
                                                className="h-full min-h-[400px]"
                                            />

                                        </div>

                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>



                        {/* Premium Services Navigator */}
                        <div className="relative mt-12">

                            {/* Orbit-style dark decoration */}
                            <div
                                aria-hidden="true"
                                className="
            pointer-events-none
            absolute left-1/2 top-1/2
            h-36 w-[75%]
            -translate-x-1/2 -translate-y-1/2
            rounded-[50%]
            bg-[#020210]/80
            blur-2xl
            sm:h-40
            sm:w-[65%]
        "
                            />

                            {/* Wider ambient shadow */}
                            <div
                                aria-hidden="true"
                                className="
            pointer-events-none
            absolute left-1/2 top-1/2
            h-40 w-[100%]
            -translate-x-1/2 -translate-y-1/2
            rounded-[50%]
            bg-black/50
            blur-2xl
        "
                            />




                            {/* Controls */}
                            <div
                                className="
            relative
            z-10
            flex
            flex-col
            items-center
            justify-center
            gap-7
            sm:gap-8
        "
                            >

                                {/* CENTER — Advanced progress */}
                                <div className="flex w-full max-w-md items-center gap-4">
                                    {/* Start */}
                                    <span
                                        className="
                    text-[8px]
                    font-semibold
                    tracking-[0.2em]
                    text-white/30
                "
                                    >
                                        01
                                    </span>

                                    {/* Track */}
                                    <div className="relative flex h-5 flex-1 items-center">
                                        <div
                                            className="
                        absolute left-0 right-0
                        h-px
                        bg-white/[0.12]
                    "
                                        />

                                        <div
                                            className="
                        absolute left-0
                        h-px
                        bg-gradient-to-r
                        from-[#6d65fe]
                        via-[#9e45b1]
                        to-[#00afb7]
                        shadow-[0_0_10px_rgba(109,101,254,0.5)]
                        transition-all
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                                            style={{
                                                width: `${snapCount > 1
                                                    ? (current / (snapCount - 1)) * 100
                                                    : 100
                                                    }%`,
                                            }}
                                        />

                                        {/* Nodes */}
                                        <div className="absolute inset-x-0 flex items-center justify-between">
                                            {Array.from({
                                                length: Math.max(snapCount, 1),
                                            }).map((_, index) => {
                                                const isActive = index === current;
                                                const isPassed = index <= current;

                                                return (
                                                    <span
                                                        key={index}
                                                        className={cn(
                                                            "relative flex items-center justify-center transition-all duration-500",
                                                            isActive ? "size-3" : "size-1.5"
                                                        )}
                                                    >
                                                        {isActive && (
                                                            <span
                                                                className="
                                            absolute
                                            size-7
                                            rounded-full
                                            bg-[#6d65fe]/15
                                            blur-md
                                        "
                                                            />
                                                        )}

                                                        <span
                                                            className={cn(
                                                                "relative rounded-full transition-all duration-500",
                                                                isActive
                                                                    ? "size-2.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                                                                    : isPassed
                                                                        ? "size-1.5 bg-[#9e45b1]"
                                                                        : "size-1.5 bg-white/15"
                                                            )}
                                                        />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* End */}
                                    <span
                                        className="
                    text-[8px]
                    font-semibold
                    tracking-[0.2em]
                    text-white/30
                "
                                    >
                                        {String(Math.max(snapCount, 1)).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-center gap-2">

                                    {/* Previous */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => carouselApi?.scrollPrev()}
                                        disabled={!carouselApi || activeServices.length <= 1}
                                        aria-label="Previous service"
                                        className="
                    group relative
                    size-12
                    overflow-hidden
                    rounded-full
                    border border-white/[0.10]
                    bg-[#020210]/70
                    text-white/50
                    backdrop-blur-md
                    transition-all duration-500
                    hover:border-[#6d65fe]/50
                    hover:bg-[#6d65fe]/10
                    hover:text-white
                    hover:shadow-[0_0_30px_rgba(109,101,254,0.15)]
                    disabled:pointer-events-none
                    disabled:opacity-20
                "
                                    >
                                        <span
                                            className="
                        pointer-events-none
                        absolute inset-[-50%]
                        rounded-full
                        bg-[conic-gradient(
                            from_0deg,
                            transparent,
                            rgba(109,101,254,0.35),
                            transparent
                        )]
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                    "
                                        />

                                        <span
                                            className="
                        absolute inset-px
                        rounded-full
                        bg-[#050516]
                    "
                                        />

                                        <ArrowLeft
                                            className="
                        relative z-10
                        size-4
                        transition-all
                        duration-300
                        group-hover:-translate-x-1
                    "
                                        />
                                    </Button>

                                    {/* Next */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => carouselApi?.scrollNext()}
                                        disabled={!carouselApi || activeServices.length <= 1}
                                        aria-label="Next service"
                                        className="
                    group relative
                    size-12
                    overflow-hidden
                    rounded-full
                    border border-[#6d65fe]/30
                    bg-[#020210]/75
                    text-white
                    backdrop-blur-md
                    transition-all duration-500
                    hover:border-[#00afb7]/50
                    hover:shadow-[0_0_35px_rgba(0,175,183,0.18)]
                    disabled:pointer-events-none
                    disabled:opacity-20
                "
                                    >
                                        <span
                                            className="
                        pointer-events-none
                        absolute inset-0
                        rounded-full
                        bg-[conic-gradient(
                            from_180deg,
                            transparent,
                            rgba(109,101,254,0.5),
                            transparent,
                            rgba(0,175,183,0.5),
                            transparent
                        )]
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                    "
                                        />

                                        <span
                                            className="
                        absolute inset-px
                        rounded-full
                        bg-[#070719]
                    "
                                        />

                                        <ArrowRight
                                            className="
                        relative z-10
                        size-4
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                                        />
                                    </Button>

                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-8 flex justify-start lg:mt-0">
                            <Link
                                href="/services"
                                className="
            custom-btn
            inline-flex items-center gap-2
            px-5 py-3
            text-sm
            sm:px-6 sm:py-3.5
        "
                            >
                                See all services
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;