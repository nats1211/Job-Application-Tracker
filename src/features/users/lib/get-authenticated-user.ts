import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "../db/users";

export async function getAuthenticatedUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");
  return getUserByClerkId(clerkId);
}
