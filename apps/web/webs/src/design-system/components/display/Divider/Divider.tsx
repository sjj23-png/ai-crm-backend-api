


import type {
  DividerProps,
} from "./Divider.types";

import {
  wrapperClasses,
  lineClasses,
  orientationClasses,
  variantClasses,
  labelClasses,
} from "./Divider.styles";

export function Divider({
  orientation = "horizontal",

  variant = "solid",

  label,

  className = "",

  ref,

  ...props
}: DividerProps) {
  if (
    orientation === "vertical"
  ) {
    return (
      <hr
        ref={ref}
        aria-orientation="vertical"
        className={[
          lineClasses,
          orientationClasses.vertical,
          variantClasses[variant],
          className,
        ].join(" ")}
        {...props}
      />
    );
  }

  if (!label) {
    return (
      <hr
        ref={ref}
        className={[
          lineClasses,
          orientationClasses.horizontal,
          variantClasses[variant],
          className,
        ].join(" ")}
        {...props}
      />
    );
  }

  return (
    <div className={wrapperClasses}>
      <hr
        className={[
          "flex-1",
          lineClasses,
          orientationClasses.horizontal,
          variantClasses[variant],
        ].join(" ")}
      />

      <span className={labelClasses}>
        {label}
      </span>

      <hr
        className={[
          "flex-1",
          lineClasses,
          orientationClasses.horizontal,
          variantClasses[variant],
        ].join(" ")}
      />
    </div>
  );
}