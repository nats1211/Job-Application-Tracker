import { pgTable, uuid } from "drizzle-orm/pg-core";
import { expiresAt, id } from "../schemaHelpers";
import { UsersTable } from "./user";
import { relations } from "drizzle-orm";

export const SessionsTable = pgTable("sessions", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  expiresAt,
});

export const sessionsRelations = relations(SessionsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [SessionsTable.userId],
    references: [UsersTable.id],
  }),
}));
