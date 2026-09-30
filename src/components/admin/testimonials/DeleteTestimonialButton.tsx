"use client";

import {
    Loader2,
    Trash2,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    useMutation,
} from "convex/react";

import {
    toast,
} from "react-hot-toast";

import {
    api,
} from "../../../../convex/_generated/api";

import {
    Id,
} from "../../../../convex/_generated/dataModel";

import {
    Button,
} from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


type DeleteTestimonialButtonProps = {
    testimonialId: Id<"testimonials">;
    testimonialName: string;
};


export default function DeleteTestimonialButton({
    testimonialId,
    testimonialName,
}: DeleteTestimonialButtonProps) {
    const removeTestimonial =
        useMutation(
            api.testimonials.remove,
        );

    const [
        isDeleting,
        setIsDeleting,
    ] = useState(false);


    async function handleDelete() {
        try {
            setIsDeleting(true);

            await removeTestimonial({
                id: testimonialId,
            });

            toast.success(
                "Testimonial deleted successfully.",
            );
        } catch (error) {
            console.error(
                "Failed to delete testimonial:",
                error,
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete testimonial.",
            );
        } finally {
            setIsDeleting(false);
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
            >
                <Button
                    variant="outline"
                    size="sm"
                    disabled={
                        isDeleting
                    }
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
                        hover:border-destructive/40
                        hover:bg-destructive/10
                        hover:text-destructive
                    "
                >
                    {isDeleting ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                        <Trash2 className="mr-2 size-4" />
                    )}

                    <span>
                        {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                    </span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete testimonial?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete the
                        testimonial from{" "}
                        <span className="font-medium text-foreground">
                            {testimonialName}
                        </span>
                        . This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={
                            isDeleting
                        }
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={
                            handleDelete
                        }
                        disabled={
                            isDeleting
                        }
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />

                                Deleting...
                            </>
                        ) : (
                            "Delete Testimonial"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}