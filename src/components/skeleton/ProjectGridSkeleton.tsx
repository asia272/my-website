import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectGridSkeleton() {
    return (
        <div
            className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                sm:gap-6
                lg:grid-cols-3
            "
        >
            {Array.from({ length: 6 }).map(
                (_, index) => (
                    <Card
                        key={index}
                        className="
                            overflow-hidden
                            border-border/70
                            bg-card/80
                            py-0
                            shadow-none
                        "
                    >
                        <Skeleton
                            className="
                                aspect-[16/10]
                                w-full
                                rounded-none
                            "
                        />

                        <CardContent
                            className="
                                space-y-4
                                px-5
                                py-5
                                sm:px-6
                            "
                        >
                            <Skeleton className="h-3 w-28" />

                            <Skeleton className="h-7 w-3/4" />

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[70%]" />
                            </div>
                        </CardContent>
                    </Card>
                ),
            )}
        </div>
    );
}
export default ProjectGridSkeleton;