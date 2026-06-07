import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "danger" | "muted";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "border-success/50 text-success",
  warning: "border-warning/60 text-warning",
  danger: "border-danger/50 text-danger",
  muted: "border-border text-muted-foreground",
};

const SUCCESS_STATES = new Set([
  "success",
  "settled",
  "resolved",
  "active",
  "completed",
  "confirmed",
  "delivered",
]);
const WARNING_STATES = new Set([
  "pending",
  "processing",
  "paused",
  "running",
  "in-view",
  "in review",
]);
const DANGER_STATES = new Set([
  "failed",
  "reversed",
  "rejected",
  "frozen",
  "declined",
  "cancelled",
  "canceled",
]);

/** Maps a free-form status label to a semantic tone. */
export function toneForStatus(status: string): StatusTone {
  const value = status.toLowerCase();
  if (SUCCESS_STATES.has(value)) return "success";
  if (WARNING_STATES.has(value)) return "warning";
  if (DANGER_STATES.has(value)) return "danger";
  return "muted";
}

export function StatusPill({
  status,
}: Readonly<{ status: string }>): React.ReactElement {
  return (
    <Badge className={cn("bg-transparent", TONE_STYLES[toneForStatus(status)])}>
      {status}
    </Badge>
  );
}
