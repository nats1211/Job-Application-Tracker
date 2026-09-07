import { db } from "@/db";
import { UsersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof UsersTable.$inferInsert) {
  const [newUser] = await db
    .insert(UsersTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UsersTable.clerkId],
      set: data,
    });

  if (newUser == null) throw new Error("Failed to create new user");

  return newUser;
}

export async function updateUser(
  { clerkId }: { clerkId: string },
  data: Partial<typeof UsersTable.$inferInsert>,
) {
  const [updatedUser] = await db
    .update(UsersTable)
    .set(data)
    .where(eq(UsersTable.clerkId, clerkId))
    .returning();

  if (updatedUser == null) throw new Error("Failed to update user");

  return updatedUser;
}

export async function deleteUser({ clerkId }: { clerkId: string }) {
  const [deletedUser] = await db
    .update(UsersTable)
    .set({
      updatedAt: new Date(),
      email: "redacted@deleted.com",
      name: "Deleted User",
      clerkId: "deleted",
    })
    .where(eq(UsersTable.clerkId, clerkId))
    .returning();

  if (deletedUser == null) throw new Error("Failed to delete user");

  return deletedUser;
}
