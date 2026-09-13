import { applicationStatusEnum, ApplicationsTable } from "@/schema";

export const ALL_STATUSES = applicationStatusEnum.enumValues;

export type Status = (typeof ALL_STATUSES)[number];

export type Application = typeof ApplicationsTable.$inferSelect;

export type CreateApplicationInput = Omit<
  typeof ApplicationsTable.$inferInsert,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type UpdateApplicationInput = Partial<
  Omit<
    typeof ApplicationsTable.$inferInsert,
    "id" | "userId" | "createdAt" | "updatedAt"
  >
>;
