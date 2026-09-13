"use client";

import { Application } from "@/types/application";
import {
  useCreateApplication,
  useEditApplication,
} from "../hooks/use-application-mutations";

interface ApplicationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application;
}

export function ApplicationFormDialog({
  open,
  onOpenChange,
  application,
}: ApplicationFormDialogProps) {
  const isEditing = Boolean(application);
  const createApplication = useCreateApplication();
  const editApplication = useEditApplication();
  const isSubmitting = createApplication.isPending || editApplication.isPending;
}
