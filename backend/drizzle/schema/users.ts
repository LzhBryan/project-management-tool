import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { projects } from "./projects"
import { tasks } from "./tasks"

export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  tasks: many(tasks),
}))

export type User = typeof users.$inferSelect
