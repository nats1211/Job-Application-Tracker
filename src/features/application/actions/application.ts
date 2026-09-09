"use server";

import { Application, NewApplicationInput } from "@/types/application";
import {
  editApplications,
  insertApplications,
  deleteApplications,
  selectApplications,
} from "../db/application";
import { getAuthenticatedUser } from "@/features/users/lib/get-authenticated-user";

export async function insertApplicationsAction(input: NewApplicationInput) {
  const user = await getAuthenticatedUser();
  return insertApplications({ ...input, userId: user.id });
}

export async function editApplicationsAction(app: Application) {
  const user = await getAuthenticatedUser();
  return editApplications({ applicationId: app.id, userId: user.id }, app);
}

export async function deleteApplicationsAction(applicationId: string) {
  const user = await getAuthenticatedUser();
  return deleteApplications({ applicationId, userId: user.id });
}

export async function getApplicationsAction() {
  const user = await getAuthenticatedUser();
  return selectApplications({ userId: user.id });
}
