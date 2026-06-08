"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/reusables/StatusPill";
import { FormField, SelectField } from "@/components/operations/marketing/FormField";
import { getRolePermissions } from "./role-permissions";
import { initials } from "@/lib/format";
import { type TeamMember } from "@/lib/data/types";

const TWO_FACTOR_OPTIONS = ["Enabled", "Disabled"];
const TWO_FACTOR_ON = "Enabled";

type ManageMemberModalProps = {
  member: TeamMember | null;
  roleNames: string[];
  onOpenChange: (open: boolean) => void;
};

export function ManageMemberModal({
  member,
  roleNames,
  onOpenChange,
}: Readonly<ManageMemberModalProps>): React.ReactElement {
  return (
    <Dialog open={member !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="flex items-center gap-2">
          <DialogTitle className="text-lg font-semibold">
            Manage member
          </DialogTitle>
        </div>
        <DialogDescription>
          View, edit role or remove this team member.
        </DialogDescription>

        {member && (
          <ManageMemberBody
            key={member.id}
            member={member}
            roleNames={roleNames}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

type ManageMemberBodyProps = {
  member: TeamMember;
  roleNames: string[];
  onClose: () => void;
};

function ManageMemberBody({
  member,
  roleNames,
  onClose,
}: Readonly<ManageMemberBodyProps>): React.ReactElement {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [role, setRole] = useState(member.role);
  const [twoFactor, setTwoFactor] = useState(
    member.twoFactor ? TWO_FACTOR_ON : TWO_FACTOR_OPTIONS[1],
  );

  const permissions = getRolePermissions(role);

  return (
    <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <Avatar size="lg">
                <AvatarFallback className="bg-brand-muted text-brand-foreground">
                  {initials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Last active · {member.lastActive}
                </p>
              </div>
              <StatusPill status={member.status} />
            </div>

            <FormField label="Full name" htmlFor="member-name">
              <Input
                id="member-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>
            <FormField label="Email" htmlFor="member-email">
              <Input
                id="member-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Role"
                value={role}
                onValueChange={setRole}
                options={roleNames}
              />
              <SelectField
                label="2FA"
                value={twoFactor}
                onValueChange={setTwoFactor}
                options={TWO_FACTOR_OPTIONS}
              />
            </div>

            {permissions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {permissions.map((permission) => (
                  <Badge
                    key={permission}
                    variant="secondary"
                    className="font-mono text-xs font-normal"
                  >
                    {permission}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="gap-1.5 text-danger hover:text-danger"
                onClick={() => {
                  toast.success(`${member.name} removed`);
                  onClose();
                }}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast.success(`Password reset sent to ${email}`);
                }}
              >
                Reset password
              </Button>
              <Button
                className="gap-1.5"
                onClick={() => {
                  toast.success("Member updated");
                  onClose();
                }}
              >
                <Save className="size-4" />
                Save
              </Button>
            </div>
    </div>
  );
}
