import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  list_id: integer("list_id")
    .notNull()
    .references(() => lists.id),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export type Note = typeof notes.$inferSelect;
export type List = typeof lists.$inferSelect;
export type Task = typeof tasks.$inferSelect;
