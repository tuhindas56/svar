export const fieldType = {
  shortAnswer: {
    label: "Short Answer",
    value: "short"
  },
  longAnswer: {
    label: "Paragraph",
    value: "long"
  },
  multiChoice: {
    label: "Multiple Choice",
    value: "radio"
  },
  checkbox: {
    label: "Checkboxes",
    value: "checkbox"
  },
  select: {
    label: "Dropdown",
    value: "select"
  },
  fileUpload: {
    label: "File Upload",
    value: "file"
  },
  linearScale: {
    label: "Linear scale",
    value: "linear"
  },
  rating: {
    label: "Rating",
    value: "rating"
  },
  multiChoiceGrid: {
    label: "Muiltple choice grid",
    value: "multi_choice_grid"
  },
  checkboxGrid: {
    label: "Checkbox grid",
    value: "checkbox_grid"
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
