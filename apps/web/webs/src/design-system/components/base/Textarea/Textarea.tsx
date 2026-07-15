import type { TextareaProps } from "./Textarea.types";


import {
  wrapperClasses,
  labelClasses,
  helperClasses,
  errorClasses,
  baseTextareaClasses,
  sizeClasses,
} from "./Textarea.styles";

export function Textarea({
  label,

  helperText,

  error,

  rows = 4,

  size = "md",

  fullWidth = true,

  className = "",

  required,

  ref,

  ...props
}: TextareaProps) {
  return (
    <div
      className={[
        wrapperClasses,
        fullWidth ? "w-full" : "",
      ].join(" ")}
    >
      {label && (
        <label className={labelClasses}>
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        required={required}
        className={[
          baseTextareaClasses,
          sizeClasses[size],
          error
            ? "border-red-500 focus:ring-red-200"
            : "",
          className,
        ].join(" ")}
        {...props}
      />

      {error ? (
        <span className={errorClasses}>
          {error}
        </span>
      ) : (
        helperText && (
          <span className={helperClasses}>
            {helperText}
          </span>
        )
      )}
    </div>
  );
}