import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UsersTable } from "./user";
import { relations } from "drizzle-orm";

export const applicationStatusEnum = pgEnum("application_status", [
  "wishlist",
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "accepted",
]);

export const ApplicationsTable = pgTable("applications", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  company: varchar("company", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  status: applicationStatusEnum("status").notNull().default("wishlist"),
  jobPostingUrl: text("job_posting_url"),
  location: varchar("location", { length: 255 }),
  salary: integer("salary"),
  notes: text("notes"),
  appliedAt: timestamp("applied_at", { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const ApplicationsRelationship = relations(
  ApplicationsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [ApplicationsTable.userId],
      references: [UsersTable.id],
    }),
  }),
);
