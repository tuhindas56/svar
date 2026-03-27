import { and, count, desc, eq } from "drizzle-orm"

import { db, formsTable, responsesTable, submissionsTable } from "./schema"
import { FormFieldResponses, FormSection } from "../definitions"

type Result<T = undefined> = Promise<
  | {
      success: true
      data?: T
    }
  | {
      success: false
      error: string
    }
>

type Form = typeof formsTable.$inferSelect
type Submission = typeof submissionsTable.$inferSelect
type Responses = typeof responsesTable.$inferSelect

export async function createForm({
  name,
  userId
}: {
  name: string
  userId: string
}): Result<{ id: string }> {
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

type GetFormDetailsResult = Omit<
  Form,
  "userId" | "id" | "description" | "sections"
> & {
  submissions: Submission[]
}
export async function getFormDetails({
  id,
  userId
}: {
  id: string
  userId: string
}): Result<GetFormDetailsResult> {
  try {
    const result = await db
      .select({
        name: formsTable.name,
        created: formsTable.created,
        modified: formsTable.modified,
        published: formsTable.published,
        anonymousSubmissions: formsTable.anonymousSubmissions,
        receivingSubmissions: formsTable.receivingSubmissions,
        limitResponses: formsTable.limitResponses
      })
      .from(formsTable)
      .where(and(eq(formsTable.id, id), eq(formsTable.userId, userId)))

    const submissions = await db
      .select()
      .from(submissionsTable)
      .where(eq(submissionsTable.formId, id))

    return {
      success: true,
      data: {
        ...result[0],
        submissions
      }
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      error: "Failed to fetch form details"
    }
  }
}

export async function getFormSchema({
  id
}: {
  id: string
  userId?: string
}): Result<{
  form: Form
}> {
  try {
    const result = await db
      .select()
      .from(formsTable)
      .where(and(eq(formsTable.id, id)))

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

export type GetFormsResult = Result<{
  total: number
  forms: Omit<
    Form,
    | "userId"
    | "description"
    | "sections"
    | "limitResponses"
    | "receivingSubmissions"
  >[]
}>
export async function getForms({
  page = 0,
  pageSize = 15,
  userId
}: {
  page: number
  pageSize: number
  userId: string
}): GetFormsResult {
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
        published: formsTable.published,
        anonymousSubmissions: formsTable.anonymousSubmissions
      })
      .from(formsTable)
      .where(eq(formsTable.userId, userId))
      .orderBy(desc(formsTable.modified))
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
}): Result {
  try {
    await db
      .update(formsTable)
      .set({
        name: sections?.[0]?.title,
        description: sections?.[0]?.description,
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
}): Result {
  try {
    await db
      .update(formsTable)
      .set({
        published: true,
        receivingSubmissions: true,
        anonymousSubmissions: true,
        limitResponses: false
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
}): Result {
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

export async function receiveSubmission({
  id,
  responses,
  respondantEmail,
  respondantName
}: {
  id: string
  responses: FormFieldResponses
  respondantEmail: string | null
  respondantName: string | null
}): Result {
  try {
    const submissionResult = await db
      .insert(submissionsTable)
      .values({
        formId: id,
        respondantEmail,
        respondantName
      })
      .returning({ id: submissionsTable.id })

    const values = Object.entries(responses).map(([fieldId, response]) => ({
      submissionId: submissionResult[0].id,
      fieldId,
      question: response.question,
      value: response.value,
      customAnswer: response.customAnswer
    }))

    await db.insert(responsesTable).values(values)

    return {
      success: true
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: "Failed to submit form"
    }
  }
}

type GetSubmissionResult = {
  responses: (Omit<Responses, "id" | "submissionId" | "fieldId"> &
    Pick<Submission, "submitted">)[]
}
export async function getSubmission({
  id
}: {
  id: string
}): Result<GetSubmissionResult> {
  try {
    const result = await db
      .select({
        submitted: submissionsTable.submitted,
        question: responsesTable.question,
        value: responsesTable.value,
        customAnswer: responsesTable.customAnswer
      })
      .from(submissionsTable)
      .where(eq(submissionsTable.id, id))
      .innerJoin(responsesTable, eq(responsesTable.submissionId, id))

    return {
      success: true,
      data: {
        responses: result
      }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: "Failed to retrieve submission"
    }
  }
}
