import { pgTable, text, integer, serial, pgEnum, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "./users"
import { tasks } from "./tasks"

const colours = [
  "#b8255f",
  "#cf473a",
  "#c77100",
  "#b29104",
  "#949c31",
  "#65a33a",
  "#369307",
  "#42a393",
  "#148fad",
  "#319dc0",
  "#6988a4",
  "#2a67e2",
  "#692ec2",
  "#ac30cc",
  "#a4698c",
  "#e05095",
  "#b2635c",
  "#808080",
  "#999999",
  "#8f7a69",
] as const

export type ColoursType = (typeof colours)[number]

export const coloursEnum = pgEnum("colour", colours)

export const projects = pgTable("projects", {
  id: serial().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  colour: coloursEnum().default("#999999").notNull(),
  isFavourite: boolean("is_favourite").default(false).notNull(),
})

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, { fields: [projects.userId], references: [users.id] }),
  tasks: many(tasks),
}))

export type Project = typeof projects.$inferSelect
