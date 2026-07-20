import WidgetContainer from "../WidgetContainer";


interface ChartPlaceholderWidgetProps {
  title?: string;
}

export default function ChartPlaceholderWidget({
  title="Analytics",
}: ChartPlaceholderWidgetProps) {
  return (
    <WidgetContainer title={title}>
      <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700">
        <p className="text-sm text-neutral-500">
          Chart integration will be added during the Analytics module.
        </p>
      </div>
    </WidgetContainer>
  );
}