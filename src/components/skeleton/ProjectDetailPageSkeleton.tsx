
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DetailPageSkeleton() {
    return (
        <section className="section relative isolate overflow-hidden">
            <div className="container relative z-10">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
                    {/* Project image skeleton */}
                    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/70">
                        <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    </div>

                    {/* Project information skeleton */}
                    <Card className="border-border/70 bg-card/70 py-0 shadow-none">
                        <CardContent className="p-6 sm:p-7">
                            <div className="mb-6">
                                <Skeleton className="h-3 w-28" />

                                <Skeleton className="mt-4 h-9 w-3/4 sm:h-10" />
                            </div>

                            <div className="space-y-5">
                                {/* Category */}
                                <div className="border-b border-border/60 pb-5">
                                    <Skeleton className="mb-3 h-3 w-16" />

                                    <Skeleton className="h-5 w-32" />
                                </div>

                                {/* Status */}
                                <div className="border-b border-border/60 pb-5">
                                    <Skeleton className="mb-3 h-3 w-14" />

                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-7 flex flex-col gap-3">
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Overview skeleton */}
                <div className="mt-10 max-w-4xl">
                    <div className="mb-5 flex items-center gap-3">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-px flex-1" />
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-[95%]" />
                        <Skeleton className="h-5 w-[82%]" />
                    </div>
                </div>

                {/* Bottom navigation skeleton */}
                <div className="mt-12 border-t border-border/60 pt-6">
                    <Skeleton className="h-10 w-40 rounded-md" />
                </div>
            </div>
        </section>
    );
}

