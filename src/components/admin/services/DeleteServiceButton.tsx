"use client";

import { useState } from "react";

import {
    Loader2,
    Trash2,
} from "lucide-react";

import { useMutation } from "convex/react";

import { toast } from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

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

interface DeleteServiceButtonProps {
    serviceId: Id<"services">;
    serviceTitle: string;
}

export default function DeleteServiceButton({
    serviceId,
    serviceTitle,
}: DeleteServiceButtonProps) {
    const [open, setOpen] =
        useState(false);

    const [
        isDeleting,
        setIsDeleting,
    ] = useState(false);

    const removeService =
        useMutation(
            api.services.remove,
        );

    const handleDelete =
        async () => {
            if (isDeleting) {
                return;
            }

            try {
                setIsDeleting(true);

                await removeService({
                    id: serviceId,
                });

                toast.success(
                    `"${serviceTitle}" deleted successfully.`,
                );

                setOpen(false);
            } catch (error) {
                console.error(
                    "Failed to delete service:",
                    error,
                );

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to delete service.",
                );
            } finally {
                setIsDeleting(
                    false,
                );
            }
        };

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger
                asChild
            >
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-md bg-transparent hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                    <Trash2 className="size-4 sm:mr-2" />

                    <span className="hidden sm:inline">
                        Delete
                    </span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <h4>
                            Delete{" "}
                            <span className="text-red-600">
                                "{serviceTitle}"
                            </span>
                            ?
                        </h4>
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be
                        undone. This will
                        permanently delete{" "}
                        <span className="font-medium text-foreground">
                            {serviceTitle}
                        </span>{" "}
                        from your services.
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
                        onClick={(
                            event,
                        ) => {
                            event.preventDefault();
                            void handleDelete();
                        }}
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
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}