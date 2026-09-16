"use server";

import {
  Application,
  CreateApplicationInput,
  Status,
} from "@/types/application";
import {
  editApplications,
  insertApplications,
  deleteApplications,
  selectApplications,
} from "../db/application";
import { getAuthenticatedUser } from "@/features/users/lib/get-authenticated-user";
import { createApplicationInputSchema } from "../validation/application";

const updateApplicationInputSchema = createApplicationInputSchema.partial();

export async function insertApplicationsAction(input: CreateApplicationInput) {
  const user = await getAuthenticatedUser();
  const validatedInput = createApplicationInputSchema.parse(input);

  return insertApplications({ ...validatedInput, userId: user.id });
}

export async function editApplicationsAction(app: Application) {
  const user = await getAuthenticatedUser();
  const { id, ...input } = app;
  const validatedInput = updateApplicationInputSchema.parse(input);

  return editApplications(
    { applicationId: id, userId: user.id },
    validatedInput,
  );
}

export async function deleteApplicationsAction(applicationId: string) {
  const user = await getAuthenticatedUser();
  return deleteApplications({ applicationId, userId: user.id });
}

export async function getApplicationsAction(params?: { status?: Status }) {
  const user = await getAuthenticatedUser();
  return selectApplications({ userId: user.id, status: params?.status });
}
