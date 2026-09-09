import { ApplicationsTable } from "@/schema";

export type Status =
  | "wishlist"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "accepted";

export const ALL_STATUSES: Status[] = [
  "wishlist",
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "accepted",
];

export type Application = typeof ApplicationsTable.$inferSelect;

export type NewApplicationInput = Omit<
  typeof ApplicationsTable.$inferInsert,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
