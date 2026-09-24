
import { Skeleton } from "@/components/ui/skeleton";

type SectionSkeletonProps = {
    rows?: number;
    className?: string;
};

export default function SectionSkeleton({
    rows = 3,
    className = "",
}: SectionSkeletonProps) {
    return (
        <div
            className={`rounded-md border border-border bg-card ${className}`}
        >
            {/* Section Header */}
            <div className="flex items-center gap-3 p-5 sm:p-6">
                <Skeleton className="size-10 shrink-0 rounded-lg" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-56 max-w-[70vw]" />
                </div>
            </div>

            <div className="divider" />

            {/* Section Content */}
            <div className="space-y-5 p-5 sm:p-6">
                {Array.from({ length: rows }).map((_, index) => (
                    <div
                        key={index}
                        className="space-y-2"
                    >
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

