"use client";

import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Role } from "@/lib/data/types";

const PREVIEW_COUNT = 3;

type RoleCardProps = {
  role: Role;
  onOpen: (role: Role) => void;
};

export function RoleCard({
  role,
  onOpen,
}: Readonly<RoleCardProps>): React.ReactElement {
  const preview = role.permissions.slice(0, PREVIEW_COUNT);
  const extra = role.permissions.length - preview.length;

  return (
    <button
      type="button"
      onClick={() => onOpen(role)}
      className="rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/50"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" />
          <span className="font-medium">{role.name}</span>
        </span>
        <span className="grid size-6 place-items-center rounded-full bg-muted text-xs text-muted-foreground">
          {role.memberCount}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {preview.map((permission) => (
          <Badge
            key={permission}
            variant="secondary"
            className="font-mono text-xs font-normal"
          >
            {permission}
          </Badge>
        ))}
      </div>
      {extra > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">+{extra} more</p>
      )}
    </button>
  );
}
