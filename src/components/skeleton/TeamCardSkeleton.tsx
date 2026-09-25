import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

const TeamCardSkeleton = () => {
    return (
        <Card className="overflow-hidden border-border bg-card">
            <Skeleton className="h-[340px] w-full rounded-none" />

            <CardContent className="space-y-3 p-5">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-7 w-36" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-[65%]" />
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamCardSkeleton;