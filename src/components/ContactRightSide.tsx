import {
    ArrowUpRight,
    Clock3,
    Globe2,
    Mail,
    MapPin,
    MessageCircle,
    Sparkles,
} from "lucide-react";

import PageHeading from "@/components/shared/PageHeading";

const contactItems = [
    {
        icon: MessageCircle,
        title: "Let's talk",
        description:
            "Tell me about your idea, goals, and what you want to build. I'll review the details and get back to you.",
        color: "var(--chart-1)",
    },
    {
        icon: Clock3,
        title: "Response time",
        description:
            "Project requests are reviewed carefully so I can understand your requirements before responding.",
        color: "var(--chart-2)",
    },
    {
        icon: Globe2,
        title: "Worldwide",
        description:
            "I work remotely with clients and teams across different countries, locations, and time zones.",
        color: "var(--chart-3)",
    },
    {
        icon: MapPin,
        title: "Based in Pakistan",
        description:
            "Working remotely from Pakistan with a focus on modern web applications and digital products.",
        color: "var(--chart-4)",
    },
];

const ContactRightSide = () => {
    return (
        <aside className="lg:pt-[104px]">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]">
                {/* Heading */}

                <PageHeading
                    label="Let's Connect"
                    title="Let's Start"
                    highlightedText="Something Great"
                    description="Have a project in mind? Share your requirements and let's explore how we can turn your idea into a polished digital experience."
                    align="left"
                />

                <div className="mt-8 divider" />

                {/* Contact information */}

                <div className="divide-y divide-[var(--border)]">
                    {contactItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="
                                    group
                                    relative
                                    flex
                                    gap-4
                                    py-6
                                "
                            >
                                {/* Accent glow */}

                                <div
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-0
                                        top-1/2
                                        size-16
                                        -translate-y-1/2
                                        rounded-full
                                        blur-2xl
                                        opacity-0
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-20
                                    "
                                    style={{
                                        backgroundColor: item.color,
                                    }}
                                />

                                {/* Icon */}

                                <div
                                    className="
                                        relative
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[var(--radius-md)]
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        transition-all
                                        duration-300
                                        group-hover:-translate-y-0.5
                                    "
                                    style={{
                                        color: item.color,
                                        boxShadow: `0 0 24px color-mix(in srgb, ${item.color} 10%, transparent)`,
                                    }}
                                >
                                    <Icon className="size-[18px]" />

                                    {/* Small indicator */}

                                    <span
                                        className="
                                            absolute
                                            -right-1
                                            -top-1
                                            size-2
                                            rounded-full
                                            opacity-70
                                        "
                                        style={{
                                            backgroundColor: item.color,
                                            boxShadow: `0 0 10px ${item.color}`,
                                        }}
                                    />
                                </div>

                                {/* Content */}

                                <div className="relative min-w-0">
                                    <h3 className="text-base font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-secondary">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </aside>
    );
};

export default ContactRightSide;