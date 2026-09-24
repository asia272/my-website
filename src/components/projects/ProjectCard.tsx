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
import { ShineBorder } from "@/components/ui/shine-border";
import { Lens } from "@/components/ui/lens";

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
        PROJECT_TYPE_LABELS[project.type] ?? project.type;

    const imageUrl = project.imageUrl;

    return (
        <Card
            className="
            isolate
                group
                relative
                overflow-hidden
                rounded-2xl
                border-border/60
                bg-card/80
                py-0
                shadow-none
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]
            "
        >
            {/* Animated border */}
            <ShineBorder
                borderWidth={1}
                duration={10}
                shineColor={[
                    "var(--chart-3)",
                    "var(--chart-2)",
                    "var(--chart-4)",
                ]}
                className="
        pointer-events-none
        absolute
        inset-0
        z-50
        rounded-2xl
        opacity-6
transition-opacity
        duration-500
      
    "
            />

            {/* Project Image */}
            <Link
                href={`/projects/project/${project._id}`}
                className="
                    relative
                    z-0
                    block
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary/70
                    focus-visible:ring-inset
                "
                aria-label={`View ${project.name}`}
            >
                <div
                    className="
                        relative
                        h-[220px]
                        w-full
                        overflow-hidden
                        rounded-t-2xl
                        bg-secondary
                        sm:h-[240px]
                        lg:h-[250px]
                    "
                >
                    {imageUrl ? (
                        <Lens
                            zoomFactor={1.5}
                            lensSize={140}
                            isStatic={false}
                            ariaLabel={`Preview ${project.name}`}
                        >
                            <div
                                className="
                                    relative
                                    h-[220px]
                                    w-full
                                    rounded-none
                                    sm:h-[240px]
                                    lg:h-[250px]
                                "
                            >
                                <img
                                    src={imageUrl}
                                    alt={project.name}
                                    className="
                                        block
                                        h-full
                                        w-full
                                        rounded-none
                                        object-cover
                                        object-center
                                        transition-transform
                                        duration-700
                                        ease-out
                                        group-hover:scale-[1.03]
                                    "
                                />
                            </div>
                        </Lens>
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                            "
                        >
                            <Sparkles
                                aria-hidden="true"
                                className="size-8 text-primary/40"
                            />
                        </div>
                    )}

                    {/* Image overlay */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-20
                            rounded-none
                            bg-gradient-to-t
                            from-background/70
                            via-transparent
                            to-transparent
                        "
                    />
                </div>
            </Link>

            {/* Content */}
            <CardContent
                className="
                    px-5
                    pb-5
                    pt-5
                    sm:px-6
                    sm:pb-6
                "
            >
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
                        aria-hidden="true"
                        className="
                            size-1.5
                            shrink-0
                            rounded-full
                            bg-primary
                            shadow-[0_0_8px_rgba(245,185,66,0.55)]
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
                        line-clamp-1
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
                        min-h-[72px]
                        text-sm
                        leading-6
                        text-muted-foreground
                        sm:text-[15px]
                    "
                >
                    {project.description}
                </p>
            </CardContent>

            {/* Footer */}
            <CardFooter
                className="
                    border-t
                    border-border/50
                    px-5
                    py-4
                    sm:px-6
                "
            >
                <Link
                    href={`/projects/project/${project._id}`}
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-lg
                        py-1
                        transition-colors
                        duration-300
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary/70
                    "
                    aria-label={`View ${project.name} project`}
                >
                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-muted-foreground
                            transition-colors
                            duration-300
                            group-hover:text-foreground
                        "
                    >
                        View project
                    </span>

                    <span
                        aria-hidden="true"
                        className="
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            bg-secondary/40
                            text-muted-foreground
                            transition-all
                            duration-300
                            group-hover:border-primary/50
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                            group-hover:shadow-[0_0_20px_rgba(245,185,66,0.2)]
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
                </Link>
            </CardFooter>
        </Card>
    );
}