import type {
  ProgressProps,
} from "./Progress.types";

import {
  wrapperClasses,
  trackClasses,
  fillClasses,
  valueClasses,
} from "./Progress.styles";

export function Progress({
  value,

  max = 100,

  showValue = false,

  animated = true,

  className = "",

  ref,

  ...props
}: ProgressProps) {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

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
        className={trackClasses}
      >
        <div
          className={[
            fillClasses,
            animated
              ? "transition-all duration-500"
              : "",
          ].join(" ")}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {showValue && (
        <span className={valueClasses}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}