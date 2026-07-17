import { useEffect, useState } from "react";
import type { ToastProps } from "./Toast.types";
import { useTheme } from "../../theme/use-theme";

const variantStyles = {
  success: {
    bg: "successBg",
    border: "success.500",
    text: "successText",
  },
  error: {
    bg: "errorBg",
    border: "danger.500",
    text: "errorText",
  },
  warning: {
    bg: "warningBg",
    border: "warning.500",
    text: "warningText",
  },
  info: {
    bg: "infoBg",
    border: "info",
    text: "infoText",
  },
};

const positionStyles = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export function Toast({
  variant = "info",
  title,
  message,
  position = "bottom-right",
  duration = 5000,
  closeable = true,
  onClose,
  className = "",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (duration === null) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const styles = variantStyles[variant];

  return (
    <div
      role="status"
      className={`
        fixed z-[800] ${positionStyles[position]}
        rounded-lg border-l-4 shadow-lg p-4
        max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300
        ${className}
      `}
      style={{
        backgroundColor:
          theme.colors[styles.bg as keyof typeof theme.colors],
        borderLeftColor:
          theme.colors[styles.border as keyof typeof theme.colors],
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && (
            <h4
              className="font-semibold mb-1"
              style={{
                color:
                  theme.colors[
                    styles.text as keyof typeof theme.colors
                  ],
              }}
            >
              {title}
            </h4>
          )}
          <p
            className="text-sm"
            style={{
              color:
                theme.colors[
                  styles.text as keyof typeof theme.colors
                ],
            }}
          >
            {message}
          </p>
        </div>
        {closeable && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close toast"
            style={{
              color:
                theme.colors[
                  styles.text as keyof typeof theme.colors
                ],
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
