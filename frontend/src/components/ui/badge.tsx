import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        neutral: 'border-transparent bg-secondary text-secondary-foreground',
        success: 'border-transparent bg-emerald-100 text-emerald-900',
        progress: 'border-transparent bg-sky-100 text-sky-900',
        warning: 'border-transparent bg-amber-100 text-amber-900',
        rejected: 'border-transparent bg-rose-100 text-rose-900',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
