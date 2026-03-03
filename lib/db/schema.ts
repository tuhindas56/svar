import { drizzle } from "drizzle-orm/node-postgres"
import {
  pgTable,
  text,
  primaryKey,
  timestamp,
  integer,
  boolean,
  jsonb,
  uuid
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"
import { FieldType, FormSection } from "../definitions"

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL environment variable was not provided")
}

export const db = drizzle(url)

export const users = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image")
})

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId]
      })
    }
  ]
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull()
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token]
      })
    }
  ]
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports")
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID]
      })
    }
  ]
)

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  created: timestamp("created").default(new Date()),
  modified: timestamp("modified").$onUpdateFn(() => new Date()),
  sections: jsonb("sections").notNull().$type<FormSection[]>(),
  published: boolean().default(false),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull()
})

export const submissionsTable = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  submitted: timestamp("submitted").default(new Date()),
  modified: timestamp("modified").$onUpdateFn(() => new Date()),
  field_id: uuid("field_id").notNull(),
  field_type: text("field_type").$type<FieldType>().notNull(),
  value: text("value").notNull(),
  form_id: uuid("form_id")
    .references(() => formsTable.id)
    .notNull(),
  is_custom_answer: boolean().default(false)
})
