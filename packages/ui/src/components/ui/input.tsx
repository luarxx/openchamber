import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-foreground file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-[var(--surface-elevated)] appearance-none flex h-7 w-full min-w-0 rounded-[2px] px-2.5 py-1 typography-ui-label outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:typography-ui-label file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // VS Code-style thin border
        "border border-border/60 transition duration-150 ease-out",
        "hover:border-border focus:border-[var(--interactive-focus-ring)]",
        "focus-visible:outline-none",
        "aria-invalid:border-[var(--status-error)]",
        className
      )}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      {...props}
    />
  )
}

export { Input }
