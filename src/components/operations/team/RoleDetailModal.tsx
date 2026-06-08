"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ALL_PERMISSIONS } from "@/lib/data/team";
import { type Role } from "@/lib/data/types";
import { PermissionGrid } from "./PermissionGrid";

type RoleDetailModalProps = {
  role: Role | null;
  onOpenChange: (open: boolean) => void;
};

export function RoleDetailModal({
  role,
  onOpenChange,
}: Readonly<RoleDetailModalProps>): React.ReactElement {
  return (
    <Dialog open={role !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {role && (
          <RoleDetailBody
            key={role.id}
            role={role}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function RoleDetailBody({
  role,
  onClose,
}: Readonly<{ role: Role; onClose: () => void }>): React.ReactElement {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(role.permissions),
  );

  const toggle = (permission: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(permission)) next.delete(permission);
      else next.add(permission);
      return next;
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Shield className="size-5 text-muted-foreground" />
        <DialogTitle className="text-lg font-semibold">{role.name}</DialogTitle>
      </div>
      <DialogDescription>{role.description}</DialogDescription>

      <div className="space-y-3">
        <p className="text-sm font-medium">
          Permissions ({selected.size}/{ALL_PERMISSIONS.length})
        </p>
        <PermissionGrid
          permissions={ALL_PERMISSIONS}
          selected={selected}
          onToggle={toggle}
          className="max-h-[320px] overflow-y-auto pr-1"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={() => {
            toast.success(`${role.name} permissions updated`);
            onClose();
          }}
        >
          Save changes
        </Button>
      </div>
    </>
  );
}
