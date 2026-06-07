import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "rounded-md text-sm font-medium select-none",
    "transition-[background,border,color,opacity,transform] duration-150 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-surface-hover shadow-xs",
        ghost:
          "text-foreground hover:bg-surface-hover",
        subtle:
          "bg-surface-muted text-foreground hover:bg-surface-hover",
        danger:
          "bg-danger text-danger-foreground hover:bg-danger-hover shadow-sm",
        outline:
          "border border-border-strong text-foreground hover:bg-surface-hover",
        link:
          "text-primary underline-offset-4 hover:underline px-0 h-auto active:scale-100",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-9 px-4",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, asChild = false, loading, disabled, children, ...rest },
    ref,
  ) {
    const classes = cn(buttonVariants({ variant, size }), className);
    if (asChild) {
      // Slot expects exactly one valid element child — sibling nodes (even
      // null) make React.Children.count = 2 and Slot throws #143. The
      // `loading` spinner only makes sense on a real <button>, so when we
      // delegate to a child element we pass children through untouched.
      return (
        <Slot
          ref={ref}
          className={classes}
          aria-busy={loading || undefined}
          {...rest}
        >
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <span
            aria-hidden
            className="inline-block size-3.5 rounded-full border-2 border-current border-r-transparent animate-spin"
          />
        ) : null}
        {children}
      </button>
    );
  },
);

export { buttonVariants };
