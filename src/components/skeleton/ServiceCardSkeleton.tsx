import { Skeleton } from "@/components/ui/skeleton";

const ServiceCardSkeleton = () => {
    return (
        <article
            className="
                relative h-full min-h-[430px]
                overflow-hidden rounded-2xl
                border border-white/10
                bg-[#0a0922]
                p-6
            "
        >
            <div className="flex h-full flex-col">
                {/* Service title */}
                <div className="flex items-center gap-4">
                    <Skeleton className="size-12 shrink-0 rounded-xl" />

                    <Skeleton className="h-6 w-40 rounded-md" />
                </div>

                {/* Description */}
                <div className="mt-5 mb-2 space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-[90%] rounded-md" />
                    <Skeleton className="h-4 w-[65%] rounded-md" />
                </div>

                {/* Service features */}
                <div className="mt-4 space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-2"
                        >
                            <Skeleton className="size-6 shrink-0 rounded-full" />

                            <Skeleton
                                className={`
                                    mt-0.5 h-5 rounded-md
                                    ${index === 0
                                        ? "w-[85%]"
                                        : index === 1
                                            ? "w-[75%]"
                                            : index === 2
                                                ? "w-[90%]"
                                                : "w-[65%]"
                                    }
                                `}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default ServiceCardSkeleton;