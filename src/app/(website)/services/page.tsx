"use client";

import { useMemo } from "react";
import { BriefcaseBusiness } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import PageHero from "@/components/shared/PageHero";
import ServiceCard from "@/components/ServiceCard";
import SectionSkeleton from "@/components/skeleton/SectionSkeleton";
import OrbitDecorations from "@/components/shared/OrbitDecorations";

const ServicesPage = () => {
    const services = useQuery(api.services.getAll);

    const activeServices = useMemo(() => {
        if (!services) return [];

        return services.filter((service) => service.isActive);
    }, [services]);

    const isLoading = services === undefined;

    return (
        <div>
            <PageHero
                breadcrumb="Services"
                label="What We Do"
                title="Digital solutions"
                highlightedText="built around your goals."
                description="Explore our services and discover practical, scalable solutions for websites, applications, automation, and modern digital products."
            />

            <section className="section">
                <OrbitDecorations />
                <div className="container">
                    {/* Loading */}
                    {isLoading && (
                        <div
                            className="
                                grid gap-5
                                md:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SectionSkeleton />
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && activeServices.length === 0 && (
                        <div
                            className="
                                flex min-h-[320px]
                                flex-col items-center justify-center
                                rounded-2xl
                                border border-white/10
                                bg-white/[0.02]
                                px-6 text-center
                            "
                        >
                            <div
                                className="
                                    mb-4 flex size-14
                                    items-center justify-center
                                    rounded-full
                                    border border-[#6d65fe]/20
                                    bg-[#6d65fe]/10
                                "
                            >
                                <BriefcaseBusiness className="size-6 text-[#8b85ff]" />
                            </div>

                            <h2 className="text-xl font-semibold text-white">
                                No services available
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-white/50">
                                Our services will appear here once they are
                                available.
                            </p>
                        </div>
                    )}

                    {/* All services */}
                    {!isLoading && activeServices.length > 0 && (
                        <div
                            className="
                                grid gap-5
                                md:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {activeServices.map((service) => (
                                <ServiceCard
                                    key={service._id}
                                    title={service.title}
                                    icon={service.icon}
                                    description={service.description}
                                    listItems={service.listItems}
                                    className="min-h-[430px]"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>

    );
};

export default ServicesPage;