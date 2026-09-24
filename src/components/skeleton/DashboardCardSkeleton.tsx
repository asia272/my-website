import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardCardSkeleton() {
    return (
        <div className="card p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    {/* Title */}
                    <Skeleton className="h-4 w-24" />

                    {/* Value */}
                    <Skeleton className="mt-3 h-9 w-16" />

                    {/* Description */}
                    <Skeleton className="mt-2 h-3 w-28" />
                </div>

                {/* Icon */}
                <Skeleton className="size-11 shrink-0 rounded-xl" />
            </div>
        </div>
    );
}