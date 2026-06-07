import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral:
          "bg-surface-muted text-foreground-muted border border-border",
        primary:
          "bg-primary/10 text-primary border border-primary/20",
        success:
          "bg-(--color-success)/10 text-(--color-success) border border-(--color-success)/20",
        warning:
          "bg-(--color-warning)/15 text-(--color-warning) border border-(--color-warning)/25",
        danger:
          "bg-(--color-danger)/10 text-(--color-danger) border border-(--color-danger)/25",
        outline:
          "bg-transparent text-foreground-muted border border-border-strong",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...rest }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...rest} />;
}

export { badgeVariants };
