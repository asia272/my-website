"use client";

import {
    Check,
    Code2,
    Bot,
    ShoppingCart,
    Smartphone,
    Database,
    Palette,
    Globe,
    Wrench,
    Layers3,
    type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";

type ServiceCardProps = {
    title: string;
    icon?: string;
    description: string;
    listItems: string[];
    className?: string;
};

const iconMap: Record<string, LucideIcon> = {
    Code2,
    Bot,
    ShoppingCart,
    Smartphone,
    Database,
    Palette,
    Globe,
    Wrench,
    Layers3,
};

const getServiceIcon = (icon?: string): LucideIcon => {
    if (!icon) {
        return Code2;
    }

    return iconMap[icon] ?? Code2;
};

const ServiceCard = ({
    title,
    icon,
    description,
    listItems,
    className,
}: ServiceCardProps) => {
    const ServiceIcon = getServiceIcon(icon);

    return (
        <article
            className={cn(
                "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0922] p-6 transition-all duration-500  hover:border-[#6d65fe]/40",
                className,
            )}
        >
            {/* Soft background glow */}
            <div
                className="
                    pointer-events-none absolute -right-24 -top-24
                    h-48 w-48 rounded-full
                    blur-3xl
                    transition-all duration-500
                   bg-[#6d65fe]/20
                "
            />

            <ShineBorder
                shineColor={["#6d65fe"]}
                borderWidth={1}
                duration={8}
            />

            <div className="relative z-10 flex h-full flex-col">
                {/* Service title */}
                <div className="flex items-center gap-4">
                    <div
                        className="
                            flex size-12 shrink-0 items-center justify-center
                            rounded-xl
                            border border-[#6d65fe]/25
                            bg-[#6d65fe]/10
                            text-[#8b85ff]
                            transition-all duration-500
                            group-hover:scale-105
                            group-hover:border-[#6d65fe]/50
                            group-hover:bg-[#6d65fe]/15
                        "
                    >
                        <ServiceIcon className="size-6" />
                    </div>

                    <h4
                        className="
                            text-xl font-semibold tracking-tight
                            text-white
                            transition-colors duration-300
                            group-hover:text-[#f5f5ff]
                        "
                    >
                        {title}
                    </h4>
                </div>

                {/* Description */}
                <p
                    className="
                        mt-5
                        mb-2
                        text-sm leading-6
                        text-white/55
                    "
                >
                    {description}
                </p>

                {/* Service features */}
                {listItems.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {listItems.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className="flex items-start gap-2"
                            >
                                {/* Check icon */}
                                <span
                                    className="
                                        flex size-6 shrink-0
                                        items-center justify-center
                                        rounded-full
                                        border border-white/15
                                        bg-white/[0.03]
                                        text-white
                                        transition-all duration-300
                                        group-hover:border-[#6d65fe]/40
                                    "
                                >
                                    <Check className="size-4 stroke-[2.5]" />
                                </span>

                                {/* Feature text */}
                                <span
                                    className="
                                        pt-0.5
                                        text-sm leading-6
                                        text-white/65
                                    "
                                >
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ServiceCard;