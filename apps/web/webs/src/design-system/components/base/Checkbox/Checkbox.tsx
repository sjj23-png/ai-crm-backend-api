


import type {
  CheckboxProps,
} from "./Checkbox.types";
import { useId } from "react";
const generatedId = useId();



import {
  wrapperClasses,
  containerClasses,
  checkboxClasses,
  labelClasses,
  helperClasses,
  errorClasses,
} from "./Checkbox.styles";

export function Checkbox({
  label,

  helperText,

  error,

  id,

  className = "",

  ref,

  ...props
}: CheckboxProps) {
  const inputId = id ?? generatedId;

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={[
            checkboxClasses,
            className,
          ].join(" ")}
          {...props}
        />

        {label && (
          <label
            htmlFor={inputId}
            className={labelClasses}
          >
            {label}
          </label>
        )}
      </div>

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