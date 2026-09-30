
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    ExternalLink,

    Play,
    Sparkles,
    Video,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { ShineBorder } from "@/components/ui/shine-border";
import { Lens } from "@/components/ui/lens";
import { BorderBeam } from "../ui/border-beam";

type ProjectCardProps = {
    project: {
        _id: string;
        name: string;
        description: string;
        imageUrl: string | null;
        videoUrl: string | null;
        mediaType: "IMAGE" | "VIDEO";
        type: string;
        isFeatured: boolean;
        githubUrl?: string;
        liveDemoUrl?: string;
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

const PROJECT_TYPE_ROUTES: Record<string, string> = {
    GEN_AI: "generative-ai",
    WEB_DEVELOPMENT: "web-development",
    MOBILE_APP: "mobile-app",
    FULL_STACK: "full-stack",
    E_COMMERCE: "e-commerce",
    SAAS: "saas",
    OTHER: "other",
};

export default function ProjectCard({
    project,
}: ProjectCardProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const typeLabel =
        PROJECT_TYPE_LABELS[project.type] ?? project.type;

    const categoryRoute =
        PROJECT_TYPE_ROUTES[project.type] ?? "other";

    const projectRoute =
        `/projects/${categoryRoute}/${project._id}`;

    const imageUrl = project.imageUrl;
    const videoUrl = project.videoUrl;
    const isVideo = project.mediaType === "VIDEO";

    const hasExternalLinks =
        Boolean(project.liveDemoUrl) ||
        Boolean(project.githubUrl);

    return (
        <>
            <div className="relative h-full rounded-2xl">
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
                "
                >


                    {/* Project Media */}
                    {isVideo && videoUrl ? (
                        <button
                            type="button"
                            onClick={() => setIsVideoOpen(true)}
                            className="
                            group/media
                            relative
                            z-0
                            block
                            w-full
                            cursor-pointer
                            text-left
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary/70
                            focus-visible:ring-inset
                        "
                            aria-label={`Play ${project.name} video`}
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
                                <video
                                    src={videoUrl}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-hidden="true"
                                    className="
                                    block
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                    transition-transform
                                    duration-700
                                    ease-out
                                    group-hover:scale-[1.03]
                                "
                                />

                                {/* Media overlay */}
                                <div
                                    aria-hidden="true"
                                    className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    z-10
                                    rounded-none
                                    bg-gradient-to-t
                                    from-background/80
                                    via-background/10
                                    to-transparent
                                "
                                />

                                {/* Play button */}
                                <span
                                    aria-hidden="true"
                                    className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    z-20
                                    flex
                                    size-16
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-black/55
                                    text-white
                                    shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    group-hover/media:scale-110
                                    group-hover/media:border-primary/60
                                    group-hover/media:bg-primary
                                    group-hover/media:text-primary-foreground
                                    group-hover/media:shadow-[0_0_35px_rgba(245,185,66,0.3)]
                                "
                                >
                                    <Play
                                        className="
                                        ml-1
                                        size-6
                                        fill-current
                                    "
                                    />
                                </span>

                                {/* Video label */}
                                <span
                                    className="
                                    absolute
                                    bottom-4
                                    left-4
                                    z-20
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-black/45
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.12em]
                                    text-white/80
                                    backdrop-blur-md
                                "
                                >
                                    <Video className="size-3" />
                                    Preview
                                </span>
                            </div>
                        </button>
                    ) : (
                        <Link
                            href={projectRoute}
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

                                {/* Media overlay */}
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
                    )}

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

                        {/* External Project Links */}
                        {hasExternalLinks && (
                            <div className="mt-5 flex flex-wrap gap-2.5">
                                {/* Live Demo */}
                                {project.liveDemoUrl && (
                                    <a
                                        href={project.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                        className="
                                        group/link
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-primary/30
                                          bg-[#6d65fe]/15
                                        px-3
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-primary
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                    hover:bg-[#6d65fe]/25
                                        
                                    "
                                        aria-label={`Open live demo for ${project.name}`}
                                    >
                                        <span>Live Demo</span>

                                        <ExternalLink className="size-3 opacity-60" />
                                    </a>
                                )}

                                {/* GitHub */}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                        className="
                                        group/link
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                          border-[#30363d]
                        bg-[#181717]
                                        px-3
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-muted-foreground
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                       hover:border-[#8b949e]
                        hover:bg-[#24292f]
                                    "
                                        aria-label={`Open GitHub repository for ${project.name}`}
                                    >
                                        <FaGithub
                                            className="
                                            size-3.5
                                            transition-transform
                                            duration-300
                                            group-hover/link:scale-110
                                        "
                                        />

                                        <span>GitHub</span>

                                        <ExternalLink className="size-3 opacity-60" />
                                    </a>
                                )}
                            </div>
                        )}
                    </CardContent>

                    {/* Footer */}
                    <CardFooter
                        className="
        group/footer
        border-t
        border-border/50
        px-5
        py-4
        sm:px-6
    "
                    >
                        <Link
                            href={projectRoute}
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
                              group-hover/footer:text-foreground
                            "
                            >
                                View details
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
                               group-hover/footer:border-primary/50
group-hover/footer:bg-primary
group-hover/footer:text-primary-foreground
group-hover/footer:shadow-[0_0_20px_rgba(245,185,66,0.2)]
                            "
                            >
                                <ArrowUpRight
                                    className="
                                    size-4
                                    transition-transform
                               group-hover/footer:translate-x-0.5
group-hover/footer:-translate-y-0.5
                                "
                                />
                            </span>
                        </Link>
                    </CardFooter>
                </Card>

                <BorderBeam
                    duration={6}
                    delay={3}
                    size={200}
                    borderWidth={2}
                    initialOffset={0}
                    reverse
                    className="
            pointer-events-none
            absolute
            inset-0
            z-30
            rounded-2xl
            from-transparent
            via-chart-2
            to-transparent
            "
                />
            </div>

            {/* Video Dialog */}
            {isVideo && videoUrl && (
                <Dialog
                    open={isVideoOpen}
                    onOpenChange={setIsVideoOpen}
                >
                    <DialogContent
                        className="
                            max-w-5xl
                            overflow-hidden
                            border-border/60
                            bg-background/95
                            p-0
                            shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                            backdrop-blur-xl
                        "
                    >
                        <DialogTitle className="sr-only">
                            {project.name} video preview
                        </DialogTitle>

                        <div className="relative aspect-video w-full bg-black">
                            {isVideoOpen && (
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                    className="
                                        h-full
                                        w-full
                                        object-contain
                                    "
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

