"use client";

import {
    useMemo,
    useState,
} from "react";

import Link from "next/link";

import {
    MessageSquareQuote,
    Pencil,
    Search,
    Star,
} from "lucide-react";

import type {
    Doc,
} from "../../../../convex/_generated/dataModel";

import {
    Button,
} from "@/components/ui/button";

import DeleteTestimonialButton from "./DeleteTestimonialButton";

import AdminListSkeleton from "@/components/skeleton/AdminListSkeleton";


type Testimonial =
    Doc<"testimonials"> & {
        imageUrl: string | null;
    };


type TestimonialListProps = {
    testimonials:
    | Testimonial[]
    | undefined;
};


export default function TestimonialList({
    testimonials,
}: TestimonialListProps) {
    const [
        searchQuery,
        setSearchQuery,
    ] = useState("");


    const filteredTestimonials =
        useMemo(() => {
            if (!testimonials) {
                return [];
            }

            const query =
                searchQuery
                    .trim()
                    .toLowerCase();

            if (!query) {
                return testimonials;
            }

            return testimonials.filter(
                (testimonial) => {
                    return (
                        testimonial.name
                            .toLowerCase()
                            .includes(query) ||

                        testimonial.role
                            ?.toLowerCase()
                            .includes(query) ||

                        testimonial.company
                            ?.toLowerCase()
                            .includes(query) ||

                        testimonial.message
                            .toLowerCase()
                            .includes(query)
                    );
                },
            );
        }, [
            testimonials,
            searchQuery,
        ]);


    if (
        testimonials ===
        undefined
    ) {
        return (
            <AdminListSkeleton />
        );
    }


    if (
        testimonials.length ===
        0
    ) {
        return (
            <div
                className="
                    flex
                    min-h-60
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-border
                    bg-card
                    px-6
                    text-center
                "
            >
                <div
                    className="
                        mb-4
                        flex
                        size-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-chart-3/10
                    "
                >
                    <MessageSquareQuote className="size-5 text-chart-3" />
                </div>

                <h3 className="font-medium">
                    No testimonials yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-secondary">
                    Add your first client testimonial
                    to display client feedback on your
                    website.
                </p>

                <Button
                    asChild
                    className="custom-btn mt-5"
                >
                    <Link href="/admin/testimonials/new">
                        Create Testimonial
                    </Link>
                </Button>
            </div>
        );
    }


    return (
        <div className="space-y-5">

            {/* Search */}
            <div className="w-full lg:max-w-sm">
                <label
                    htmlFor="testimonial-search"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Search Testimonials
                </label>

                <div className="relative">
                    <Search
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            size-4
                            -translate-y-1/2
                            text-muted-foreground
                        "
                    />

                    <input
                        id="testimonial-search"
                        type="search"
                        value={
                            searchQuery
                        }
                        onChange={(
                            event,
                        ) =>
                            setSearchQuery(
                                event.target.value,
                            )
                        }
                        placeholder="Search by client, company, or message..."
                        className="
                            h-10
                            w-full
                            rounded-md
                            border
                            border-border
                            bg-transparent
                            pl-9
                            pr-3
                            text-sm
                            outline-none
                            transition-colors
                            placeholder:text-muted-foreground
                            focus:border-ring
                        "
                    />
                </div>
            </div>


            {/* Result Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-secondary">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {
                            filteredTestimonials.length
                        }
                    </span>{" "}
                    {filteredTestimonials.length ===
                        1
                        ? "testimonial"
                        : "testimonials"}
                </p>
            </div>


            {/* Empty search */}
            {filteredTestimonials.length ===
                0 ? (
                <div
                    className="
                        flex
                        min-h-48
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-border
                        bg-card
                        px-6
                        text-center
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            size-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-muted
                        "
                    >
                        <Search className="size-5 text-muted-foreground" />
                    </div>

                    <h3 className="font-medium">
                        No matching testimonials
                    </h3>

                    <p className="mt-1 text-sm text-secondary">
                        Try changing your search.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">

                    {filteredTestimonials.map(
                        (
                            testimonial,
                        ) => (
                            <div
                                key={
                                    testimonial._id
                                }
                                className="
                                    group
                                    rounded-md
                                    border
                                    border-border
                                    bg-card
                                    p-4
                                "
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Information */}
                                    <div className="flex min-w-0 items-start gap-4">

                                        {/* Image */}
                                        <div
                                            className="
                                                hidden
                                                size-14
                                                shrink-0
                                                overflow-hidden
                                                rounded-full
                                                border
                                                border-border
                                                bg-muted
                                                sm:block
                                            "
                                        >
                                            {testimonial.imageUrl ? (
                                                <img
                                                    src={
                                                        testimonial.imageUrl
                                                    }
                                                    alt={
                                                        testimonial.name
                                                    }
                                                    className="block size-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-full items-center justify-center">
                                                    <MessageSquareQuote className="size-5 text-chart-3" />
                                                </div>
                                            )}
                                        </div>


                                        {/* Details */}
                                        <div className="min-w-0">

                                            <div className="flex flex-wrap items-center gap-2">

                                                <h4 className="truncate font-medium">
                                                    {
                                                        testimonial.name
                                                    }
                                                </h4>

                                                <span
                                                    className={
                                                        testimonial.isActive
                                                            ? `
                                                                rounded-full
                                                                bg-chart-4/10
                                                                px-2
                                                                py-0.5
                                                                text-xs
                                                                font-medium
                                                                text-chart-4
                                                            `
                                                            : `
                                                                rounded-full
                                                                bg-muted
                                                                px-2
                                                                py-0.5
                                                                text-xs
                                                                font-medium
                                                                text-secondary
                                                            `
                                                    }
                                                >
                                                    {
                                                        testimonial.isActive
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                </span>

                                            </div>


                                            {/* Role + Company */}
                                            {(testimonial.role ||
                                                testimonial.company) && (
                                                    <p className="mt-1 text-sm text-secondary">
                                                        {
                                                            testimonial.role
                                                        }

                                                        {testimonial.role &&
                                                            testimonial.company && (
                                                                <span>
                                                                    {" "}
                                                                    ·{" "}
                                                                </span>
                                                            )}

                                                        {
                                                            testimonial.company
                                                        }
                                                    </p>
                                                )}


                                            {/* Rating */}
                                            <div className="mt-2 flex items-center gap-1">
                                                {Array.from(
                                                    {
                                                        length: 5,
                                                    },
                                                ).map(
                                                    (
                                                        _,
                                                        index,
                                                    ) => (
                                                        <Star
                                                            key={
                                                                index
                                                            }
                                                            className={`size-3.5 ${index <
                                                                    testimonial.rating
                                                                    ? "fill-primary text-primary"
                                                                    : "text-muted-foreground"
                                                                }`}
                                                        />
                                                    ),
                                                )}

                                                <span className="ml-1 text-xs text-secondary">
                                                    {
                                                        testimonial.rating
                                                    }
                                                    /5
                                                </span>
                                            </div>


                                            {/* Message */}
                                            <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-secondary">
                                                {
                                                    testimonial.message
                                                }
                                            </p>
                                        </div>
                                    </div>


                                    {/* Actions */}
                                    <div className="flex shrink-0 items-center gap-2">

                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="
                                                h-9
                                                rounded-md
                                                border-border
                                                bg-transparent
                                                px-3
                                                text-sm
                                                font-medium
                                                text-secondary
                                                transition-all
                                                duration-[var(--duration-normal)]
                                                ease-[var(--ease-standard)]
                                                hover:border-chart-2/40
                                                hover:bg-chart-2/10
                                                hover:text-chart-2
                                            "
                                        >
                                            <Link
                                                href={`/admin/testimonials/${testimonial._id}/edit`}
                                                className="inline-flex items-center justify-center"
                                            >
                                                <Pencil className="mr-2 size-4 shrink-0 text-chart-2" />

                                                <span>
                                                    Edit
                                                </span>
                                            </Link>
                                        </Button>


                                        <DeleteTestimonialButton
                                            testimonialId={
                                                testimonial._id
                                            }
                                            testimonialName={
                                                testimonial.name
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}