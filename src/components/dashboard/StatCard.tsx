import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/data/types";

type StatCardProps = {
  metric: Metric;
  icon: LucideIcon;
};

export function StatCard({ metric, icon: Icon }: Readonly<StatCardProps>): React.ReactElement {
  const hasDelta = metric.delta !== undefined;
  const isUp = metric.trend === "up";
  const TrendIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <Icon className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
        {metric.value}
      </p>
      {hasDelta && (
        <p className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "flex items-center gap-0.5 font-medium",
              isUp ? "text-success" : "text-danger",
            )}
          >
            <TrendIcon className="size-3" />
            {metric.delta}%
          </span>
          <span className="text-muted-foreground">{metric.comparison}</span>
        </p>
      )}
    </div>
  );
}
