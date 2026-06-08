"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type PermissionGridProps = {
  permissions: string[];
  selected: Set<string>;
  onToggle: (permission: string) => void;
  className?: string;
};

/** Two-column selectable list of permission keys, shared by the role modals. */
export function PermissionGrid({
  permissions,
  selected,
  onToggle,
  className,
}: Readonly<PermissionGridProps>): React.ReactElement {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2",
        className,
      )}
    >
      {permissions.map((permission) => {
        const active = selected.has(permission);
        return (
          <button
            key={permission}
            type="button"
            onClick={() => onToggle(permission)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors",
              active
                ? "border-success/60 bg-success/5"
                : "border-border hover:border-primary/50",
            )}
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full border",
                active
                  ? "border-success bg-success text-success-foreground"
                  : "border-input",
              )}
            >
              {active && <Check className="size-3" />}
            </span>
            <span className="font-mono text-xs text-foreground">
              {permission}
            </span>
          </button>
        );
      })}
    </div>
  );
}
