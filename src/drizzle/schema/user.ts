import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SessionsTable } from "./session";
import { ApplicationsTable } from "./application";

export const UsersTable = pgTable("users", {
  id,
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt,
  updatedAt,
});

export const UserRelationship = relations(UsersTable, ({ many }) => ({
  sessions: many(SessionsTable),
  applications: many(ApplicationsTable),
}));
