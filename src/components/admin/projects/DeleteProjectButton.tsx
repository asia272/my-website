"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

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
    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectName}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await removeProject({
        id: projectId,
      });
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error,
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete project.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${projectName}`}
    >
      {isDeleting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </Button>
  );
}