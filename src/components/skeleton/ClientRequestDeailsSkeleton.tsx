
import { Skeleton } from "@/components/ui/skeleton";
import SectionSkeleton from "./SectionSkeleton";



export default function ClientRequestDetailsSkeleton() {
    return (
        <div className="container mb-6 space-y-8">
            {/* Back Button */}
            <Skeleton className="h-9 w-40 rounded-md" />

            {/* Page Heading */}
            <div className="space-y-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-64 max-w-full rounded-md" />
                <Skeleton className="h-4 w-80 max-w-full rounded-md" />
            </div>

            {/* Client Information */}
            <SectionSkeleton rows={4} />

            {/* Project Request */}
            <SectionSkeleton rows={3} />

            {/* Attachment */}
            <SectionSkeleton rows={1} />

            {/* Request Information */}
            <SectionSkeleton rows={3} />
        </div>
    );
}

