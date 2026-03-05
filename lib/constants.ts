export const FIELD_TYPE = {
  SHORT: "short",
  LONG: "long",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  FILE: "file",
  DATE: "date",
  TIME: "time"
} as const

const FIELD_LABEL = {
  short: "Short answer",
  long: "Paragraph",
  radio: "Multiple choice",
  checkbox: "Checkboxes",
  file: "File upload",
  date: "Date",
  time: "Time"
}

export const CUSTOM_ANSWER = "custom-answer"

export const fieldTypes = Object.values(FIELD_TYPE).map((value) => ({
  label: FIELD_LABEL[value],
  value
}))
