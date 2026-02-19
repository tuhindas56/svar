export const fieldType = {
  shortAnswer: {
    label: "Short answer",
    value: "short"
  },
  longAnswer: {
    label: "Paragraph",
    value: "long"
  },
  multiChoice: {
    label: "Multiple choice",
    value: "radio"
  },
  checkbox: {
    label: "Checkboxes",
    value: "checkbox"
  },
  fileUpload: {
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
