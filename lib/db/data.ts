import { eq, and } from "drizzle-orm"

import { auth } from "@/auth"
import { db, formsTable } from "./schema"

export async function createForm(name: string) {
  const session = await auth()

  if (!session) throw new Error("Not authenticated!")

  const [{ id }] = await db
    .insert(formsTable)
    .values({
      name,
      user_id: session?.user?.id
    })
    .returning({ id: formsTable.id })

  return id
}

export async function getFormName(id: string) {
  const session = await auth()

  if (!session) throw new Error("Not authenticated!")

  const [{ name }] = await db
    .select({ name: formsTable.name })
    .from(formsTable)
    .where(
      and(
        eq(formsTable.id, id),
        eq(formsTable.user_id, session?.user?.id as string)
      )
    )

  return name
}

export async function getAllForms() {
  const session = await auth()

  if (!session) throw new Error("Not authenticated!")

  const forms = await db
    .select({
      id: formsTable.id,
      name: formsTable.name,
      created: formsTable.created,
      modified: formsTable.modified
    })
    .from(formsTable)
    .where(eq(formsTable.user_id, session?.user?.id as string))

  return forms
}

export async function deleteForm(id: string) {
  const session = await auth()

  if (!session) throw new Error("Not authenticated!")

  const { rowCount } = await db
    .delete(formsTable)
    .where(
      and(
        eq(formsTable.id, id),
        eq(formsTable.user_id, session?.user?.id as string)
      )
    )

  return rowCount! > 0
}
