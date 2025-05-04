"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const woodenButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-[#D2B48C] text-[#2F4F4F] shadow-sm border-b-4 border-[#A67C52] hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-[#D2B48C]/70 disabled:border-[#A67C52]/70 disabled:text-[#2F4F4F]/70 disabled:shadow-none disabled:scale-100",
        green:
          "bg-[#2E8B57] text-[#FAFAFA] shadow-sm border-b-4 border-[#1D5D38] hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-[#2E8B57]/70 disabled:border-[#1D5D38]/70 disabled:text-[#FAFAFA]/70 disabled:shadow-none disabled:scale-100 focus:ring-[#1D5D38]",
        "tailwind-green":
          "bg-green-500 text-white shadow-sm border-b-4 border-green-600 hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-green-500/70 disabled:border-green-600/70 disabled:text-white/70 disabled:shadow-none disabled:scale-100 focus:ring-green-400",
        "tailwind-yellow":
          "bg-yellow-500 text-gray-800 shadow-sm border-b-4 border-yellow-600 hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-yellow-500/70 disabled:border-yellow-600/70 disabled:text-gray-800/70 disabled:shadow-none disabled:scale-100 focus:ring-yellow-400",
        "tailwind-stone":
          "bg-stone-200 text-stone-700 shadow-sm border-b-4 border-stone-300 hover:bg-stone-300 hover:scale-105 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-stone-200/70 disabled:border-stone-300/70 disabled:text-stone-700/70 disabled:shadow-none disabled:scale-100 focus:ring-stone-400",
        blue: "bg-[#4682B4] text-[#FAFAFA] shadow-sm border-b-4 border-[#2B5174] hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-[#4682B4]/70 disabled:border-[#2B5174]/70 disabled:text-[#FAFAFA]/70 disabled:shadow-none disabled:scale-100 focus:ring-[#2B5174]",
        pink: "bg-[#FFB6C1] text-[#2F4F4F] shadow-sm border-b-4 border-[#E5919C] hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-[#FFB6C1]/70 disabled:border-[#E5919C]/70 disabled:text-[#2F4F4F]/70 disabled:shadow-none disabled:scale-100 focus:ring-[#E5919C]",
        yellow:
          "bg-[#FFFFE0] text-[#2F4F4F] shadow-sm border-b-4 border-[#E5E5C7] hover:scale-105 hover:brightness-110 active:animate-click-flash active:border-b-0 active:border-t-4 active:translate-y-[4px] disabled:opacity-50 disabled:bg-[#FFFFE0]/70 disabled:border-[#E5E5C7]/70 disabled:text-[#2F4F4F]/70 disabled:shadow-none disabled:scale-100 focus:ring-[#E5E5C7]",
        outline:
          "border-2 border-[#D2B48C] bg-background text-[#2F4F4F] hover:bg-[#D2B48C]/10 hover:scale-105 hover:brightness-110 active:animate-click-flash active:scale-95 disabled:opacity-50 disabled:bg-transparent disabled:text-[#2F4F4F]/70 focus:ring-[#D2B48C]",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 px-3 py-1.5 text-xs",
        lg: "h-14 px-6 py-3 text-base",
        icon: "h-12 w-12",
      },
      animation: {
        none: "",
        pulse: "animate-subtle-pulse",
        "pulse-yellow": "animate-subtle-pulse-yellow",
        "pulse-blue": "animate-subtle-pulse-blue",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  },
)

export interface WoodenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof woodenButtonVariants> {
  asChild?: boolean
}

const WoodenButton = React.forwardRef<HTMLButtonElement, WoodenButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(woodenButtonVariants({ variant, size, animation, className }))} ref={ref} {...props}>
        {/* Wood grain texture overlay */}
        <span className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none wood-grain-texture"></span>
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">{props.children}</span>
      </Comp>
    )
  },
)
WoodenButton.displayName = "WoodenButton"

export { WoodenButton, woodenButtonVariants }
