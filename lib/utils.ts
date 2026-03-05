import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addAt<T>(arr: T[], index: number, item: T) {
  const next = [...arr]
  next.splice(index, 0, item)
  return next
}

export async function wait(duration = 1000) {
  await new Promise((r) => setTimeout(r, duration))
}

export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word?.[0]?.toUpperCase() || "")
    .join("")
}

export function convertDate(
  date: Date | string | number | null,
  format = "DD MMM YYYY"
) {
  return date == null ? "-" : dayjs(date).format(format)
}
