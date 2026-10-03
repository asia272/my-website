import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamMemberDetailPageSkeleton() {
    return (
        <section
            className="section relative isolate overflow-hidden"
            aria-busy="true"
            aria-label="Loading team member profile"
        >
            <div className="container relative z-10">
                {/* =====================================================
                   MEMBER DETAIL SKELETON
                ===================================================== */}
                <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">

                    {/* =================================================
                       MEMBER INFORMATION — LEFT
                    ================================================= */}
                    <aside>
                        <Card
                            className="
                                border-border/70
                                bg-card/70
                                py-0
                                shadow-none
                                backdrop-blur-sm
                            "
                        >
                            <CardContent className="p-6 sm:p-8">

                                {/* Heading */}
                                <div className="mb-7">
                                    <Skeleton className="h-3 w-24" />

                                    <Skeleton className="mt-5 h-9 w-3/4 sm:h-10" />

                                    <Skeleton className="mt-3 h-5 w-40" />
                                </div>

                                {/* =================================================
                                   MEMBER DETAILS
                                ================================================= */}
                                <div className="space-y-5">

                                    {/* Role */}
                                    <div className="border-b border-border/60 pb-5">
                                        <Skeleton className="mb-3 h-2.5 w-12" />

                                        <div className="flex items-center gap-2">
                                            <Skeleton className="size-1.5 rounded-full" />
                                            <Skeleton className="h-4 w-36" />
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="border-b border-border/60 pb-5">
                                        <Skeleton className="mb-3 h-2.5 w-14" />

                                        <div className="flex items-center gap-2">
                                            <Skeleton className="size-4 rounded-full" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    </div>

                                    {/* Connect */}
                                    <div className="pt-1">
                                        <Skeleton className="mb-3 h-2.5 w-16" />

                                        <div className="flex flex-wrap gap-2.5">
                                            <Skeleton className="h-10 w-28 rounded-xl" />
                                            <Skeleton className="h-10 w-28 rounded-xl" />
                                            <Skeleton className="h-10 w-28 rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* =================================================
                                   CTA
                                ================================================= */}
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Skeleton className="h-10 w-full rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* =================================================
                       MEMBER IMAGE — RIGHT
                    ================================================= */}
                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border/70
                            bg-card/70
                            shadow-[0_20px_80px_rgba(0,0,0,0.25)]
                        "
                    >
                        <Skeleton className="aspect-[4/5] w-full rounded-none" />
                    </div>
                </div>

                {/* =====================================================
                   ABOUT MEMBER SKELETON
                ===================================================== */}
                <div className="mt-10 max-w-4xl">
                    <div className="mb-5 flex items-center gap-3">
                        <Skeleton className="h-3 w-32" />

                        <Skeleton className="h-px flex-1" />
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-[95%]" />
                        <Skeleton className="h-5 w-[87%]" />
                        <Skeleton className="h-5 w-[68%]" />
                    </div>
                </div>

                {/* =====================================================
                   BOTTOM NAVIGATION SKELETON
                ===================================================== */}
                <div className="mt-12 border-t border-border/60 pt-6">
                    <Skeleton className="h-10 w-36 rounded-md" />
                </div>
            </div>
        </section>
    );
}