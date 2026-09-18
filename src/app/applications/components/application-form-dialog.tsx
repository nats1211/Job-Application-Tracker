"use client";

import { ALL_STATUSES, Application } from "@/types/application";
import {
  useCreateApplication,
  useEditApplication,
} from "../hooks/use-application-mutations";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  ApplicationFormInput,
  ApplicationFormOutput,
  applicationFormSchema,
  defaultApplicationFormValues,
} from "../lib/application-schema-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { SelectWrapper } from "./ui/select-wrapper";
import { Button } from "@/components/ui/button";

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

  const form = useForm<ApplicationFormInput, unknown, ApplicationFormOutput>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: defaultApplicationFormValues,
  });

  useEffect(() => {
    if (!open) return;

    if (application) {
      form.reset({
        company: application.company,
        role: application.role ?? "",
        status: application.status,
        jobPostingUrl: application.jobPostingUrl ?? "",
        location: application.location ?? "",
        salary: application.salary ?? 0,
        notes: application.notes ?? "",
        appliedAt: application.appliedAt
          ? application.appliedAt.toISOString().split("T")[0]
          : "",
      });
    } else {
      form.reset(defaultApplicationFormValues);
    }
  }, [open, application, form]);

  const onSubmit: SubmitHandler<ApplicationFormOutput> = (values) => {
    const payload = {
      ...values,
      location: values.location || null,
      salary: values.salary ?? 0,
      notes: values.notes || null,
      appliedAt: values.appliedAt ?? null,
    };

    if (isEditing && application) {
      editApplication.mutate(
        { ...application, ...payload },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createApplication.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Application" : "New Application"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Company */}
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                {...form.register("company")}
                placeholder="Company Inc."
              />
              {form.formState.errors.company && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.company.message}
                </p>
              )}
            </div>
            {/* Roles */}
            <div className="space-y-1.5">
              <Label htmlFor="role">Position</Label>
              <Input
                id="role"
                {...form.register("role")}
                placeholder="Junior Software Engineer."
              />
              {form.formState.errors.company && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.role?.message}
                </p>
              )}
            </div>
            {/* Status */}
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <SelectWrapper
                id="status"
                value={status}
                onValueChange={(value) =>
                  form.setValue(
                    "status",
                    value as ApplicationFormInput["status"],
                  )
                }
                placeholder="Select Status"
                options={ALL_STATUSES.map((status) => ({
                  value: status,
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                }))}
              />
            </div>
            {/* Job Posting URL*/}
            <div className="space-y-1.5">
              <Label htmlFor="jobPostingUrl">Job posting URL</Label>
              <Input
                id="jobPostingUrl"
                {...form.register("jobPostingUrl")}
                placeholder="https://company.com/careers/123"
              />
              {form.formState.errors.jobPostingUrl && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.jobPostingUrl.message}
                </p>
              )}
            </div>
            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...form.register("location")}
                placeholder="Malolos City, Bulacan"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>
            {/* Salary */}
            <div className="space-y-1.5">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                inputMode="numeric"
                {...form.register("salary")}
                placeholder="25,000"
              />
              {form.formState.errors.salary && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.salary.message}
                </p>
              )}
            </div>
            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" {...form.register("notes")} />
              {form.formState.errors.notes && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.notes.message}
                </p>
              )}
            </div>
            {/* Applied Date */}
            <div className="space-y-1.5">
              <Label htmlFor="appliedAt">Applied At</Label>
              <Input
                id="appliedAt"
                type="date"
                {...form.register("appliedAt")}
              />
              {form.formState.errors.appliedAt && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.appliedAt.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving"
                  : isEditing
                    ? "Save Changes"
                    : "Add application"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
