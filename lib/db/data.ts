import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"

import { formsTable } from "./schema"

export const db = drizzle(process.env.DATABASE_URL as string)

export async function createForm(name: string) {
  const [{ id }] = await db
    .insert(formsTable)
    .values({
      name
    })
    .returning({ id: formsTable.id })

  return id
}

export async function getFormName(id: string) {
  const [{ name }] = await db
    .select({ name: formsTable.name })
    .from(formsTable)
    .where(eq(formsTable.id, id))

  return name
}

export async function getAllForms() {
  const forms = await db
    .select({
      id: formsTable.id,
      name: formsTable.name,
      created: formsTable.created,
      modified: formsTable.modified
    })
    .from(formsTable)

  return forms
}
