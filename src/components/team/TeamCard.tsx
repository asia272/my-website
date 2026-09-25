import Image from "next/image";

import {
    ArrowUpRight,
    BriefcaseBusiness,
    Sparkles,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Lens } from "../ui/lens";

type TeamCardProps = {
    name: string;
    role: string;
    description: string;
    imageUrl: string | null;
};


const TeamCard = ({
    name,
    role,
    description,
    imageUrl,
}: TeamCardProps) => {
    return (
        <Card
            className="
        isolate
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
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)]
    "
        >
            {/* =====================================================
               IMAGE
            ===================================================== */}
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
            {/* =====================================================
               CONTENT
            ===================================================== */}

            <CardContent className="flex flex-1 flex-col justify-start space-y-3 p-5">
                <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                        {role}
                    </p>

                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                        {name}
                    </h3>
                </div>

                <p className="line-clamp-3 text-sm leading-6 text-secondary">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default TeamCard;