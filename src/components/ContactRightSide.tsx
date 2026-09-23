

import {
    Clock3,
    Globe2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

const contactItems = [
    {
        icon: Phone,
        title: "+92 302 2094272",
        description:
            "Available for project discussions, questions, and quick conversations about your next web project.",
        color: "var(--chart-1)",
    },
    {
        icon: MapPin,
        title: "Fort Abbas, Punjab, Pakistan",
        description:
            "Based in Punjab, Pakistan, and working remotely with clients and teams around the world.",
        color: "var(--chart-2)",
    },
    {
        icon: Mail,
        title: "asiaashraf7272@gmail.com",
        description:
            "Send your project details, requirements, or questions by email and I'll get back to you.",
        color: "var(--chart-3)",
    },
    {
        icon: Globe2,
        title: "Worldwide",
        description:
            "Open to working remotely with clients and teams across different countries, locations, and time zones.",
        color: "var(--chart-4)",
    },
];

const ContactRightSide = () => {
    return (
        <aside>
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]">
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
                                    first:pt-0
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
                                    <h4 className="text-base font-semibold mb-2">
                                        {item.title}
                                    </h4>

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