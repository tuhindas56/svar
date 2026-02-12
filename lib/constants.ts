export const QUESTION_TYPE = {
  SHORT_ANSWER: {
    label: "Short Answer",
    value: "short"
  },
  LONG_ANSWER: {
    label: "Long Answer",
    value: "long"
  },
  MULTI_CHOICE: {
    label: "Multiple Choice",
    value: "radio"
  },
  CHECKBOXES: {
    label: "Checkboxes",
    value: "checkbox"
  },
  NUMBER: {
    label: "Number",
    value: "number"
  },
  EMAIL: {
    label: "Email",
    value: "mail"
  },
  PHONE: {
    label: "Phone",
    value: "phone"
  },
  LINK: {
    label: "Link",
    value: "link"
  },
  FILE: {
    label: "File Upload",
    value: "file"
  },
  DATE: {
    label: "Date",
    value: "date"
  },
  TIME: {
    label: "Time",
    value: "time"
  }
} as const

export const questionTypes = Object.values(QUESTION_TYPE)
