import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

type ProjectCardProps = {
    project: {
        _id: string;
        name: string;
        description: string;
        imageUrl: string | null;
        type: string;
        isFeatured: boolean;
    };
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
    GEN_AI: "Generative AI",
    WEB_DEVELOPMENT: "Web Development",
    MOBILE_APP: "Mobile App",
    FULL_STACK: "Full Stack",
    E_COMMERCE: "E-Commerce",
    SAAS: "SaaS",
    OTHER: "Other",
};

export default function ProjectCard({
    project,
}: ProjectCardProps) {
    const typeLabel =
        PROJECT_TYPE_LABELS[project.type] ??
        project.type;

    return (
        <Card
            className="
                group
                overflow-hidden
                border-border/70
                bg-card/80
                py-0
                shadow-none
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]
            "
        >
            {/* Project Image */}
            <Link
                href={`/projects/${project._id}`}
                className="block"
                aria-label={`View ${project.name}`}
            >
                <div
                    className="
                        relative
                        aspect-[16/10]
                        overflow-hidden
                        bg-secondary
                    "
                >
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.name}
                            fill
                            sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 50vw,
                                33vw
                            "
                            className="
                                object-cover
                                transition-transform
                                duration-700
                                ease-out
                                group-hover:scale-[1.045]
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                bg-secondary
                            "
                        >
                            <Sparkles
                                className="
                                    size-8
                                    text-primary/40
                                "
                            />
                        </div>
                    )}

                    {/* Image overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-background/70
                            via-transparent
                            to-transparent
                            opacity-70
                        "
                    />

                    {/* Featured badge */}
                    {project.isFeatured && (
                        <div
                            className="
                                absolute
                                left-4
                                top-4
                                rounded-full
                                border
                                border-primary/30
                                bg-background/80
                                px-3
                                py-1.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-primary
                                backdrop-blur-md
                            "
                        >
                            Featured
                        </div>
                    )}
                </div>
            </Link>

            <CardContent className="px-5 pb-5 pt-5 sm:px-6">
                {/* Project Type */}
                <div
                    className="
                        mb-3
                        flex
                        items-center
                        gap-2
                    "
                >
                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-primary
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-primary
                        "
                    >
                        {typeLabel}
                    </span>
                </div>

                {/* Project Name */}
                <h3
                    className="
                        text-xl
                        font-semibold
                        tracking-[-0.03em]
                        text-foreground
                        transition-colors
                        duration-300
                        group-hover:text-primary
                        sm:text-2xl
                    "
                >
                    {project.name}
                </h3>

                {/* Description */}
                <p
                    className="
                        mt-3
                        line-clamp-3
                        text-sm
                        leading-6
                        text-muted-foreground
                        sm:text-[15px]
                    "
                >
                    {project.description}
                </p>
            </CardContent>

            <CardFooter
                className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-border/60
                    px-5
                    py-4
                    sm:px-6
                "
            >
                <span
                    className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                        transition-colors
                        duration-300
                        group-hover:text-foreground
                    "
                >
                    View project
                </span>

                <span
                    className="
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-border
                        bg-secondary/50
                        transition-all
                        duration-300
                        group-hover:border-primary/50
                        group-hover:bg-primary
                        group-hover:text-primary-foreground
                    "
                >
                    <ArrowUpRight
                        className="
                            size-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                        "
                    />
                </span>
            </CardFooter>
        </Card>
    );
}