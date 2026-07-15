import type {
  SpinnerProps,
} from "./Spinner.types";

import {
  wrapperClasses,
  spinnerClasses,
  labelClasses,
  sizeClasses,
} from "./Spinner.styles";

export function Spinner({
  size = "md",

  label,

  className = "",

  ref,

  ...props
}: SpinnerProps) {
  return (
    <div
      ref={ref}
      className={[
        wrapperClasses,
        className,
      ].join(" ")}
      {...props}
    >
      <div
        className={[
          spinnerClasses,
          sizeClasses[size],
        ].join(" ")}
      />

      {label && (
        <span className={labelClasses}>
          {label}
        </span>
      )}
    </div>
  );
}