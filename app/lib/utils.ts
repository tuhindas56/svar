import { twMerge } from "tailwind-merge"
import { clsx, type ClassArray } from "clsx"

export function cn(...args: ClassArray) {
  return twMerge(clsx(args))
}
