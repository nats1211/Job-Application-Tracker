"use client";

import { Application } from "@/types/application";
import { useDeleteApplication } from "../hooks/use-application-mutations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";

interface DeleteApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application;
}

export function DeleteApplicationDialog({
  open,
  onOpenChange,
  application,
}: DeleteApplicationDialogProps) {
  const deleteApp = useDeleteApplication();

  const handleConfirm = () => {
    if (!application) return;
    deleteApp.mutate(application.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this application?</AlertDialogTitle>
          <AlertDialogDescription>
            {application
              ? `This will permanently remove your application to ${application.role} at ${application.company}.`
              : "This can't be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteApp.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteApp.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
