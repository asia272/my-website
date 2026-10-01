

import { ArrowUpRight, Sparkles } from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Lens } from "../ui/lens";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";

type TeamCardProps = {
    id: string;
    name: string;
    role: string;
    description: string;
    imageUrl: string | null;
};

const TeamCard = ({
    id,
    name,
    role,
    description,
    imageUrl,
}: TeamCardProps) => {
    return (
        <div className="relative h-full rounded-2xl">
            {/* CARD */}
            <Card
                className="
                    group
                    relative
                    flex
                    h-full
                    min-h-[440px]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border/60
                    bg-card/80
                    p-0
                    shadow-none
                    backdrop-blur-sm
                 transition-[border-color,box-shadow,background-color]
duration-500
hover:border-chart-2/35
hover:bg-card
hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]
                "
            >
                {/* IMAGE */}
                <div
                    className="
                        relative
                        h-[190px]
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-t-2xl
                        bg-secondary
                        sm:h-[200px]
                        lg:h-[210px]
                    "
                >
                    {imageUrl ? (
                        <Lens
                            zoomFactor={1.5}
                            lensSize={140}
                            isStatic={false}
                            ariaLabel={`Preview ${name}`}
                        >
                            <div className="relative h-full w-full">
                                <img
                                    src={imageUrl}
                                    alt={name}
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
                            </div>
                        </Lens>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Sparkles
                                aria-hidden="true"
                                className="size-8 text-primary/40"
                            />
                        </div>
                    )}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-20
                            bg-gradient-to-t
                            from-background/70
                            via-transparent
                            to-transparent
                        "
                    />
                </div>

                {/* CONTENT */}
                <CardContent className="flex flex-1 flex-col justify-start space-y-3 p-5">
                    <div className="space-y-1">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                            {role}
                        </p>

                        <h4 className="text-xl font-bold tracking-tight text-foreground">
                            {name}
                        </h4>
                    </div>

                    <p
                        className="
                            line-clamp-3
                            min-h-[72px]
                            !text-[15px]
                            leading-6
                            text-secondary
                        "
                    >
                        {description}
                    </p>

                    <Link
                        href={`/team/${id}`}
                        className="
        group/member
        mt-auto
        inline-flex
        items-center
        gap-2
        text-xs
        font-medium
        text-white/55
        transition-colors
        duration-300
        hover:text-white
    "
                    >
                        <span >
                            View member
                        </span>

                        <span
                            className="
      
            flex
            size-6
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-white/10
            bg-white/[0.035]
            transition-all
            duration-500
            group-hover/member:border-chart-2/50
            group-hover/member:bg-chart-2/10
            group-hover/member:shadow-[0_0_14px_color-mix(in_srgb,var(--chart-2)_22%,transparent)]
            group-hover/member:translate-x-0.5
        "
                        >
                            {/* Hover light */}
                            <span
                                className="
                absolute
                -left-3
                h-8
                w-2
                rotate-12
                bg-white/20
                blur-sm
                opacity-0
                transition-all
                duration-500
                group-hover/member:left-7
                group-hover/member:opacity-100
            "
                            />

                            <ArrowUpRight
                                className="
                relative
                z-10
                size-3
                text-chart-2
                transition-all
                duration-300
                group-hover/member:translate-x-0.5
                group-hover/member:-translate-y-0.5
                group-hover/member:text-primary
            "
                                strokeWidth={1.8}
                            />
                        </span>
                    </Link>
                </CardContent>
            </Card>

            {/* BORDER BEAM - ABOVE THE ENTIRE CARD */}
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
    );
};

export default TeamCard;