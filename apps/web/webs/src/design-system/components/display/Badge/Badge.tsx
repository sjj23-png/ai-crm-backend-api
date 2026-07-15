


import type {
  BadgeProps,
} from "./Badge.types";

import {
  baseClasses,
  variantClasses,
  sizeClasses,
} from "./Badge.styles";

export function Badge({
  variant = "primary",

  size = "md",

  rounded = true,

  dot = false,

  leftIcon,

  rightIcon,

  className = "",

  children,

  ref,

  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={[
        baseClasses,

        variantClasses[variant],

        sizeClasses[size],

        rounded
          ? "rounded-full"
          : "rounded-md",

        className,
      ].join(" ")}
      {...props}
    >
      {dot && (
        <span className="h-2 w-2 rounded-full bg-current opacity-80" />
      )}

      {leftIcon}

      {children}

      {rightIcon}
    </span>
  );
}