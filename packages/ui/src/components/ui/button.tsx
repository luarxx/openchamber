import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Slot } from "@/components/ui/slot"

// VS Code-style flat buttons: solid primary fill for primary actions,
// transparent with subtle borders for secondary, minimal elevation.
const TINT_PRIMARY = [
  "bg-[var(--primary-base)]",
  "text-[var(--primary-foreground)]",
  "border border-[var(--primary-base)]",
  "hover:bg-[var(--primary-hover)]",
  "active:bg-[color-mix(in_srgb,var(--primary-base)_80%,black)]",
].join(" ")

const TINT_DESTRUCTIVE = [
  "bg-[var(--status-error)]",
  "text-[var(--status-error-foreground)]",
  "border border-[var(--status-error)]",
  "hover:bg-[color-mix(in_srgb,var(--status-error)_85%,black)]",
  "active:bg-[color-mix(in_srgb,var(--status-error)_75%,black)]",
].join(" ")

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] typography-ui-label font-medium tracking-[0.01em] shrink-0 select-none",
    "transition-[background-color,border-color,color,opacity] duration-100 ease-out outline-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: TINT_PRIMARY,
        destructive: cn(
          TINT_DESTRUCTIVE,
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ),
        neutral:
          "bg-interactive-hover text-foreground border border-border/60 hover:bg-interactive-active",
        outline:
          "bg-transparent text-foreground border border-border/60 hover:bg-interactive-hover hover:text-foreground",
        chip: cn(
          "border border-border/60 bg-transparent text-foreground hover:bg-interactive-hover hover:text-foreground",
          "aria-pressed:bg-[var(--primary-base)]/10",
          "aria-pressed:text-[var(--primary-base)]",
          "aria-pressed:border-[var(--primary-base)]/30",
          "aria-pressed:hover:bg-[var(--primary-base)]/20",
        ),
        secondary:
          "bg-interactive-hover text-foreground hover:bg-interactive-active",
        ghost:
          "text-foreground hover:bg-interactive-hover hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 has-[>svg]:px-2.5",
        sm: "h-7 gap-1.5 px-2.5 has-[>svg]:px-2",
        xs: "h-6 gap-1 px-2 typography-micro has-[>svg]:px-1.5",
        lg: "h-9 px-4 has-[>svg]:px-3.5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const typeProps = asChild
    ? (type === undefined ? {} : { type })
    : { type: type ?? "button" }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...typeProps}
      {...props}
    />
  )
}

export { Button }
