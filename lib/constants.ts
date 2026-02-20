export const fieldType = {
  short: {
    label: "Short answer",
    value: "short"
  },
  long: {
    label: "Paragraph",
    value: "long"
  },
  radio: {
    label: "Multiple choice",
    value: "radio"
  },
  checkbox: {
    label: "Checkboxes",
    value: "checkbox"
  },
  file: {
    label: "File upload",
    value: "file"
  },
  date: {
    label: "Date",
    value: "date"
  },
  time: {
    label: "Time",
    value: "time"
  }
} as const

export const fieldTypes = Object.values(fieldType)
