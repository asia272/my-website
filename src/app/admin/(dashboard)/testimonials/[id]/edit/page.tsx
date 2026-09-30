"use client";

import {
    use,
} from "react";

import {
    useQuery,
} from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";

import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";


type EditTestimonialPageProps = {
    params: Promise<{
        id: string;
    }>;
};


export default function EditTestimonialPage({
    params,
}: EditTestimonialPageProps) {
    const {
        id,
    } = use(params);


    const testimonial =
        useQuery(
            api.testimonials.getById,
            {
                id: id as Id<"testimonials">,
            },
        );


    if (
        testimonial ===
        undefined
    ) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-sm text-secondary">
                    Loading testimonial...
                </p>
            </div>
        );
    }


    if (
        testimonial === null
    ) {
        return (
            <div className="flex min-h-60 flex-col items-center justify-center text-center">
                <h3 className="text-lg font-semibold">
                    Testimonial not found
                </h3>

                <p className="mt-1 text-sm text-secondary">
                    The testimonial you are trying to edit
                    does not exist.
                </p>
            </div>
        );
    }


    return (
        <div className="space-y-8">

            <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                    Edit Testimonial
                </h3>

                <p className="mt-1 text-sm text-secondary">
                    Update this client testimonial.
                </p>
            </div>


            <TestimonialForm
                mode="edit"
                testimonial={
                    testimonial
                }
            />
        </div>
    );
}