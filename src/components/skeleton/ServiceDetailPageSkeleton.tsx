import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ServiceDetailPageSkeleton() {
    return (
        <section
            className="section relative isolate overflow-hidden"
            aria-busy="true"
            aria-label="Loading details"
        >
            <div className="container relative z-10">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
                    {/* Main content */}
                    <Card className="border-border/70 bg-card/70 py-0 shadow-none">
                        <CardContent className="p-6 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-5">
                                <Skeleton className="size-14 shrink-0 rounded-2xl sm:size-16" />

                                <div className="min-w-0 flex-1 space-y-3">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-8 w-3/4 sm:h-9" />
                                </div>
                            </div>

                            <div className="my-8 h-px bg-border/60" />

                            <div className="space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[92%]" />
                                <Skeleton className="h-4 w-[75%]" />
                            </div>

                            <div className="mt-9 grid gap-3 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-16 rounded-xl"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Side content */}
                    <Card className="border-border/70 bg-card/70 py-0 shadow-none">
                        <CardContent className="p-6 sm:p-8">
                            <Skeleton className="size-12 rounded-xl" />

                            <Skeleton className="mt-6 h-3 w-36" />

                            <Skeleton className="mt-4 h-8 w-4/5" />

                            <div className="mt-5 space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[70%]" />
                            </div>

                            <div className="mt-8 space-y-3">
                                <Skeleton className="h-11 w-full rounded-xl" />
                                <Skeleton className="h-11 w-full rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Overview */}
                <div className="mt-10 max-w-4xl">
                    <div className="mb-5 flex items-center gap-3">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-px flex-1" />
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-[95%]" />
                        <Skeleton className="h-5 w-[82%]" />
                    </div>
                </div>

                {/* Bottom navigation */}
                <div className="mt-12 border-t border-border/60 pt-6">
                    <Skeleton className="h-10 w-40 rounded-md" />
                </div>
            </div>
        </section>
    );
}