import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type Variant = keyof typeof variants

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant
}

const variants = {
  default:
    "flex h-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-2 text-sm font-medium transition duration-150 ",
  primary: "bg-primary text-white hover:brightness-105 active:brightness-100",
  secondary: "hover:bg-primary/5 hover:text-primary active:border-primary/30",
  icon: "border-none p-2 hover:bg-primary/5 hover:text-primary active:bg-primary/10 focus:outline-primary/40 text-gray-500"
}

function Button({ variant, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        variants["default"],
        variant && variants[variant],
        className
      )}
      {...props}
    >
      {children || "Button"}
    </button>
  )
}

export default Button
