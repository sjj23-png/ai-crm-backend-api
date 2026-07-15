import type { ButtonProps } from "./Button.types";

import {
  baseClasses,
  sizeClasses,
  variantClasses,
} from "./Button.styles";

export function Button({
  variant = "primary",

  size = "md",

  loading = false,

  fullWidth = false,

  leftIcon,

  rightIcon,

  className = "",

  children,

  disabled,

  ref,

  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        baseClasses,

        variantClasses[variant],

        sizeClasses[size],

        fullWidth ? "w-full" : "",

        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse">
          Loading...
        </span>
      ) : (
        <>
          {leftIcon}

          <span>{children}</span>

          {rightIcon}
        </>
      )}
    </button>
  );
}