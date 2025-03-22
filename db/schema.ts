import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// export const tasks = sqliteTable("tasks", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
//   state: text("state").default("toDo").notNull(),
//   list_id: integer("list_id")
//     .notNull()
//     .references(() => lists.id),
// });

// export const lists = sqliteTable("lists", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
// });

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  // created_at: integer("created_at", { mode: "timestamp" })
  //   .notNull()
  //   .default(sql`(strftime('%s', 'now'))`),
  // updated_at: integer("updated_at", { mode: "timestamp" })
  //   .notNull()
  //   .default(sql`(strftime('%s', 'now'))`),

  // createdAt: integer("created_at"),
  // updatedAt: integer("updated_at"),
  // createdAt: timestamp("created_at", { mode: "date", precision: 3 }).$onCreate(() => new Date()),
  // updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
  // created_at: integer("created_at", { mode: "timestamp" }).notNull().default("strftime('%s', 'now')"),
  // updated_at: integer("updated_at", { mode: "timestamp" }).notNull().default("strftime('%s', 'now')"),

  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export type Note = typeof notes.$inferSelect;
