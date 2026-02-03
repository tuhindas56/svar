import { cn } from "@/app/utils"

type Props = React.ComponentProps<"button">

function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        "flex h-9 min-w-9 cursor-pointer items-center gap-2 active:bg-gray-50 rounded-sm border border-gray-200 px-3.5 text-sm font-medium transition-all duration-100 hover:shadow-xs active:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
