



import {
  Plus,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import { Button } from "@/design-system/components/buttons/Button";
import WidgetContainer from "../WidgetContainer";

const actions = [
  {
    id: 1,
    label: "New Lead",
    icon: Plus,
    variant: "primary" as const,
  },
  {
    id: 2,
    label: "New Customer",
    icon: Users,
    variant: "secondary" as const,
  },
  {
    id: 3,
    label: "Create Task",
    icon: ClipboardList,
    variant: "outline" as const,
  },
  {
    id: 4,
    label: "Reports",
    icon: BarChart3,
    variant: "ghost" as const,
  },
];

export default function QuickActionsWidget() {
  return (
    <WidgetContainer title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.id}
              variant={action.variant}
              fullWidth
              className="justify-start"
            >
              <Icon size={18} />

              <span>{action.label}</span>
            </Button>
          );
        })}
      </div>
    </WidgetContainer>
  );
}