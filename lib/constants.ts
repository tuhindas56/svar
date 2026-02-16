export const QUESTION_TYPE = {
  SHORT_ANSWER: {
    label: "Short Answer",
    value: "short"
  },
  LONG_ANSWER: {
    label: "Paragraph",
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
  DROPDOWN: {
    label: "Dropdown",
    value: "select"
  },
  FILE: {
    label: "File Upload",
    value: "file"
  },
  LINEAR_SCALE: {
    label: "Linear scale",
    value: "linear"
  },
  RATING: {
    label: "Rating",
    value: "rating"
  },
  MULTI_CHOICE_GRID: {
    label: "Muiltple choice grid",
    value: "multi_choice_grid"
  },
  CHECKBOX_GRID: {
    label: "Checkbox grid",
    value: "checkbox_grid"
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
