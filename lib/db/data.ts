import { and, count, eq } from "drizzle-orm"

import { db, formsTable } from "./schema"
import { FormSection } from "../definitions"

export async function createForm({
  name,
  userId
}: {
  name: string
  userId: string
}) {
  try {
    const result = await db
      .insert(formsTable)
      .values({
        name,
        userId,
        sections: []
      })
      .returning({ id: formsTable.id })

    return {
      success: true,
      data: { id: result[0].id }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: "Failed to create form"
    }
  }
}

export async function getFormSchema({
  id,
  userId
}: {
  id: string
  userId: string
}) {
  try {
    const result = await db
      .select()
      .from(formsTable)
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))

    return {
      success: true,
      data: { form: result[0] }
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to retrieve forms"
    }
  }
}

export async function getForms({
  page = 0,
  pageSize = 15,
  userId
}: {
  page: number
  pageSize: number
  userId: string
}) {
  try {
    const totalRowsResult = await db
      .select({ total: count(formsTable.id) })
      .from(formsTable)

    const result = await db
      .select({
        id: formsTable.id,
        name: formsTable.name,
        created: formsTable.created,
        modified: formsTable.modified,
        published: formsTable.published
      })
      .from(formsTable)
      .where(eq(formsTable.userId, userId))
      .limit(pageSize)
      .offset(page * pageSize)

    return {
      success: true,
      data: {
        total: totalRowsResult[0].total,
        forms: result
      }
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to retrieve forms"
    }
  }
}

export async function updateFormSections({
  id,
  sections,
  userId
}: {
  id: string
  sections: FormSection[]
  userId: string
}) {
  try {
    await db
      .update(formsTable)
      .set({
        sections
      })
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))

    return {
      success: true
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to save form"
    }
  }
}

export async function publishForm({
  id,
  userId
}: {
  id: string
  userId: string
}) {
  try {
    await db
      .update(formsTable)
      .set({
        published: true
      })
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))

    return {
      success: true
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to publish form"
    }
  }
}

export async function deleteForm({
  id,
  userId
}: {
  id: string
  userId: string
}) {
  try {
    await db
      .delete(formsTable)
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))

    return {
      success: true
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to delete form"
    }
  }
}

export async function updateFormPublicationStatus() {}
