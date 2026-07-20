import type { ReactNode } from "react";

interface WidgetContainerProps {
  title: string;

  children: ReactNode;

  action?: ReactNode;
}

export default function WidgetContainer({
  title,
  children,
  action,
}: WidgetContainerProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {action}
      </div>

      {children}
    </section>
  );
}