"use client";

import {
  deleteApplicationsAction,
  editApplicationsAction,
  insertApplicationsAction,
} from "@/features/application/actions/application";
import { Application, NewApplicationInput } from "@/types/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationKeys } from "../lib/query-keys";
import { toast } from "@/components/ui/toast";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewApplicationInput) => insertApplicationsAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      toast.add({
        type: "success",
        description: `Application added`,
      });
    },
    onError: () => {
      toast.add({
        type: "error",
        description: "Couldn't add application. Try again.",
      });
    },
  });
}

export function useEditApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (app: Application) => editApplicationsAction(app),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });
      const previous = queryClient.getQueryData<Application[]>(
        applicationKeys.lists(),
      );

      queryClient.setQueryData<Application[]>(applicationKeys.lists(), (prev) =>
        prev?.map((a) => (a.id === updated.id ? updated : a)),
      );

      return { previous };
    },
    onError: (_err, _updated, context) => {
      if (context?.previous) {
        queryClient.setQueryData(applicationKeys.lists(), context.previous);
      }
      toast.add({
        type: "error",
        description: "Couldn't save changes. Try again.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      toast.add({
        type: "success",
        description: "Changes has been applied.",
      });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: string) =>
      deleteApplicationsAction(applicationId),
    onMutate: async (applicationId) => {
      await queryClient.cancelQueries({ queryKey: applicationKeys.lists() });
      const previous = queryClient.getQueryData<Application[]>(
        applicationKeys.lists(),
      );

      queryClient.setQueryData<Application[]>(applicationKeys.lists(), (prev) =>
        prev?.filter((a) => a.id !== applicationId),
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(applicationKeys.lists(), context.previous);
      }
      toast.add({
        type: "error",
        description: "Failed to delete this application.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      toast.add({
        type: "success",
        description: "Application has been deleted sucessfully.",
      });
    },
  });
}
