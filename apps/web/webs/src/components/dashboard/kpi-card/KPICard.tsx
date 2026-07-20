import type { KPICardProps } from "./KPICard.types";


export default function KPICard({
  item,
}: KPICardProps) {
  const Icon = item.icon;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {item.title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {item.value}
          </h3>
        </div>

        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-medium text-green-600">
          {item.trend}
        </span>

        <span className="text-xs text-muted-foreground">
          {item.description}
        </span>
      </div>
    </div>
  );
}