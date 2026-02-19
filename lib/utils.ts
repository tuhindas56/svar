import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addAt<T>(arr: T[], index: number, item: T) {
  const next = [...arr]
  next.splice(index, 0, item)
  return next
}
