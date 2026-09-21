
"use client";

import { useState } from "react";

import { Loader2, Trash2 } from "lucide-react";

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

interface DeleteClientRequestButtonProps {
    clientRequestId: Id<"clientRequests">;
    clientName: string;
}

export default function DeleteClientRequestButton({
    clientRequestId,
    clientName,
}: DeleteClientRequestButtonProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const removeClientRequest = useMutation(
        api.clientRequests.remove
    );

    const handleDelete = async () => {
        if (isDeleting) return;

        try {
            setIsDeleting(true);

            await removeClientRequest({
                id: clientRequestId,
            });

            toast.success(
                `"${clientName}" request deleted successfully.`
            );

            setOpen(false);
        } catch (error) {
            console.error(
                "Failed to delete client request:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete client request."
            );
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
                        Delete &quot;{clientName}&quot; request?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will
                        permanently delete this client request
                        and any uploaded PDF.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDeleting}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault();
                            void handleDelete();
                        }}
                        disabled={isDeleting}
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

