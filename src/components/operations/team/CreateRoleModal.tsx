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
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/operations/marketing/FormField";
import { ALL_PERMISSIONS } from "@/lib/data/team";
import { PermissionGrid } from "./PermissionGrid";

type CreateRoleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateRoleModal({
  open,
  onOpenChange,
}: Readonly<CreateRoleModalProps>): React.ReactElement {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (permission: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(permission)) next.delete(permission);
      else next.add(permission);
      return next;
    });
  };

  const allSelected = selected.size === ALL_PERMISSIONS.length;
  const toggleAll = (): void => {
    setSelected(allSelected ? new Set() : new Set(ALL_PERMISSIONS));
  };

  const close = (): void => onOpenChange(false);

  const create = (): void => {
    if (!name.trim()) {
      toast.error("Give the role a name.");
      return;
    }
    toast.success(`Role "${name}" created`);
    close();
    setName("");
    setDescription("");
    setSelected(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-muted-foreground" />
          <DialogTitle className="text-lg font-semibold">
            Create a new role
          </DialogTitle>
        </div>
        <DialogDescription>
          Name the role and pick the permissions it grants to members.
        </DialogDescription>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Role name" htmlFor="role-name">
            <Input
              id="role-name"
              placeholder="e.g. Risk Analyst"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label="Description" htmlFor="role-desc">
            <Input
              id="role-desc"
              placeholder="Short summary"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Permissions ({selected.size}/{ALL_PERMISSIONS.length})
            </p>
            <button
              type="button"
              onClick={toggleAll}
              className="text-sm font-medium text-success"
            >
              {allSelected ? "Clear all" : "Select all"}
            </button>
          </div>
          <PermissionGrid
            permissions={ALL_PERMISSIONS}
            selected={selected}
            onToggle={toggle}
            className="max-h-[280px] overflow-y-auto pr-1"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button className="gap-1.5" onClick={create}>
            <Shield className="size-4" />
            Create role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
