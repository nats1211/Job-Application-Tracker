import { db } from "@/db";
import { ApplicationsTable } from "@/schema";
import { UpdateApplicationInput } from "@/types/application";
import { and, desc, eq } from "drizzle-orm";

export async function insertApplications(
  data: Omit<
    typeof ApplicationsTable.$inferInsert,
    "id" | "createdAt" | "updatedAt"
  >,
) {
  const [NewApplication] = await db
    .insert(ApplicationsTable)
    .values(data)
    .returning();

  if (NewApplication == null)
    throw new Error("Failed to create new Appliation");

  return NewApplication;
}

export async function editApplications(
  { applicationId, userId }: { applicationId: string; userId: string },
  data: UpdateApplicationInput,
) {
  const [updatedApplication] = await db
    .update(ApplicationsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(
        eq(ApplicationsTable.id, applicationId),
        eq(ApplicationsTable.userId, userId),
      ),
    )
    .returning();

  if (updatedApplication == null) throw new Error("Failed to edit Appliation");

  return updatedApplication;
}

export async function deleteApplications({
  applicationId,
  userId,
}: {
  applicationId: string;
  userId: string;
}) {
  const [deletedApplications] = await db
    .delete(ApplicationsTable)
    .where(
      and(
        eq(ApplicationsTable.id, applicationId),
        eq(ApplicationsTable.userId, userId),
      ),
    )
    .returning();

  if (deletedApplications == null)
    throw new Error("Failed to delete Appliation");

  return deletedApplications;
}

export async function selectApplications({
  userId,
  status,
}: {
  userId: string;
  status?: (typeof ApplicationsTable.$inferSelect)["status"];
}) {
  return db
    .select()
    .from(ApplicationsTable)
    .where(
      status
        ? and(
            eq(ApplicationsTable.userId, userId),
            eq(ApplicationsTable.status, status),
          )
        : eq(ApplicationsTable.userId, userId),
    )
    .orderBy(desc(ApplicationsTable.createdAt))
    .limit(50);
}
