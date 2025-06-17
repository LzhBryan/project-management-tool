import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { users } from "./users"
import { projects } from "./projects"
import { relations } from "drizzle-orm"

export enum PriorityEnum {
  URGENT = "urgent",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export type Priority = "urgent" | "high" | "medium" | "low"
export const priorityEnum = pgEnum("priority", ["urgent", "high", "medium", "low"])

export const tasks = pgTable("tasks", {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }),
  priority: priorityEnum(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "set null" }),
})

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, { fields: [tasks.userId], references: [users.id] }),
  project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
}))

export type Task = typeof tasks.$inferSelect
