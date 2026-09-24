import { Skeleton } from "@/components/ui/skeleton";

interface AdminListSkeletonProps {
    count?: number;
}

export default function AdminListSkeleton({
    count = 3,
}: AdminListSkeletonProps) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="
                        rounded-md
                        border
                        border-border
                        bg-card
                        p-4
                    "
                >
                    <div className="flex items-center gap-4">
                        {/* Image */}
                        <Skeleton
                            className="
                                hidden
                                size-16
                                shrink-0
                                rounded-md
                                sm:block
                            "
                        />

                        {/* Content */}
                        <div className="min-w-0 flex-1 space-y-2">
                            {/* Title + Status */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>

                            {/* Type / Role */}
                            <Skeleton className="h-4 w-28" />

                            {/* Description */}
                            <Skeleton className="h-3 w-full max-w-2xl" />
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-2">
                            <Skeleton className="h-9 w-20 rounded-md" />
                            <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}