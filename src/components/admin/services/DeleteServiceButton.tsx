"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";


import type { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

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

type DeleteServiceButtonProps = {
    serviceId: Id<"services">;
    serviceTitle: string;
};

export default function DeleteServiceButton({
    serviceId,
    serviceTitle,
}: DeleteServiceButtonProps) {
    const removeService = useMutation(api.services.remove);

    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            await removeService({
                id: serviceId,
            });

            toast.success("Service deleted successfully.");
            setOpen(false);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to delete service.";

            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    disabled={isDeleting}
                    className="
                        inline-flex
                        h-9
                        items-center
                        justify-center
                        rounded-md
                        bg-transparent
                        px-3
                        text-sm
                        font-medium
                        text-destructive
                        transition-colors
                        hover:bg-destructive/10
                        disabled:pointer-events-none
                        disabled:opacity-50
                    "
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >
                    {isDeleting ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <>
                            <Trash2 className="size-4 sm:mr-2" />

                            <span className="hidden sm:inline">
                                Delete
                            </span>
                        </>
                    )}
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Service?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-foreground">
                            {serviceTitle}
                        </span>
                        ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDeleting}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isDeleting}
                        onClick={(event) => {
                            event.preventDefault();
                            void handleDelete();
                        }}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}