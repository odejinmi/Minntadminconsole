"use client";

import { Check, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewActionsProps = {
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
  showView?: boolean;
  disabled?: boolean;
};

const BUTTON_BASE =
  "grid size-8 place-items-center rounded-lg transition-colors disabled:pointer-events-none disabled:opacity-40";

export function ReviewActions({
  onApprove,
  onReject,
  onView,
  showView = false,
  disabled = false,
}: Readonly<ReviewActionsProps>): React.ReactElement {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onApprove}
        disabled={disabled}
        aria-label="Approve"
        className={cn(BUTTON_BASE, "bg-success-muted text-success hover:bg-success/20")}
      >
        <Check className="size-4" />
      </button>
      <button
        type="button"
        onClick={onReject}
        disabled={disabled}
        aria-label="Reject"
        className={cn(BUTTON_BASE, "bg-danger-muted text-danger hover:bg-danger/20")}
      >
        <X className="size-4" />
      </button>
      {showView && (
        <button
          type="button"
          onClick={onView}
          aria-label="View"
          className={cn(BUTTON_BASE, "bg-muted text-muted-foreground hover:bg-accent")}
        >
          <Eye className="size-4" />
        </button>
      )}
    </div>
  );
}
