import AdminPageHeading from "@/components/admin/AdminPageHeading";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function NewTestimonialPage() {
    return (
        <div className="space-y-8 mx-auto w-full max-w-7xl">
            <div className="flex items-start gap-4">
                <Button
                    asChild
                    variant="outline"
                    className="
        mt-1 shrink-0
        h-10 gap-2
        border-border/60
        bg-background/50
        px-3.5
        text-sm font-medium
    "
                >
                    <Link
                        href="/admin/testimonials"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="size-4 text-primary" />
                        <span className="text-primary">Back</span>
                    </Link>
                </Button>
                <AdminPageHeading
                    title="Create New Testimonial"
                    description="Add a client testimonial to showcase their experience and feedback."
                />
            </div>

            <TestimonialForm
                mode="create"
            />
        </div>
    );
}