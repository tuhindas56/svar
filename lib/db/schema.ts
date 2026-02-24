import { jsonb, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  google_id: text().notNull(),
  email: text().notNull(),
  name: text().notNull(),
  avatar: text()
})

export const formsTable = pgTable("forms", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().default("Untitled form").notNull(),
  schema: jsonb(),
  created: timestamp({ withTimezone: true }).defaultNow(),
  modified: timestamp({ withTimezone: true }).defaultNow(),
  user_id: uuid().references(() => users.id)
})
