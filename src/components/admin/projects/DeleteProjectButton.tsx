"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "react-hot-toast";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DeleteProjectButtonProps = {
  projectId: Id<"projects">;
  projectName: string;
};

export default function DeleteProjectButton({
  projectId,
  projectName,
}: DeleteProjectButtonProps) {
  const removeProject = useMutation(
    api.projects.remove,
  );

  const [isDeleting, setIsDeleting] =
    useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await removeProject({
        id: projectId,
      });

      toast.success(
        `"${projectName}" deleted successfully.`,
      );
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete project.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isDeleting}
          aria-label={`Delete ${projectName}`}
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
        hover:border-red-500/40
        hover:bg-red-500/10
        hover:text-red-500
    "
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="mr-2 size-4 text-red-600" />
              Delete
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete project?
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              "{projectName}"
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              className="
                                border-border
                                bg-transparent
                                text-secondary
                                hover:bg-muted
                                hover:text-foreground
                            "
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="
                            bg-destructive
                            text-destructive-foreground
                            hover:bg-destructive/90
                        "
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}