import { drizzle } from "drizzle-orm/node-postgres"
import { pgTable, text, timestamp, boolean, jsonb, uuid } from "drizzle-orm/pg-core"
import { user } from "@/auth-schema"
import { FormSection } from "../definitions"

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL environment variable was not provided")
}

export const db = drizzle(url)

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  created: timestamp("created").default(new Date()).notNull(),
  modified: timestamp("modified")
    .$onUpdateFn(() => new Date())
    .notNull(),
  sections: jsonb("sections").notNull().$type<FormSection[]>(),
  published: boolean("published").default(false).notNull(),
  allowAnonymousSubmissions: boolean("allowAnonymousSubmissions").default(true).notNull(),
  receivingSubmissions: boolean("receivingSubmissions").default(false).notNull(),
  userId: text("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull()
})

export const submissionsTable = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  formId: uuid("formId")
    .references(() => formsTable.id, { onDelete: "cascade" })
    .notNull(),
  submitted: timestamp("submitted")
    .$default(() => new Date())
    .notNull(),
  modified: timestamp("modified")
    .$onUpdateFn(() => new Date())
    .notNull(),
  respondantName: text("respondantName"),
  respondantEmail: text("respondantEmail")
})

export const responsesTable = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  submissionId: uuid("submissionId")
    .references(() => submissionsTable.id, {
      onDelete: "cascade"
    })
    .notNull(),
  fieldId: uuid("fieldId").notNull(),
  question: text("question"),
  value: jsonb("value").notNull(),
  customAnswer: text("customAnswer")
})
