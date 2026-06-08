"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  SelectField,
} from "@/components/operations/marketing/FormField";

type AddTeamMemberButtonProps = {
  roleNames: string[];
};

export function AddTeamMemberButton({
  roleNames,
}: Readonly<AddTeamMemberButtonProps>): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roleNames[0] ?? "");

  const sendInvite = (): void => {
    if (!email.trim()) {
      toast.error("Enter an email to send the invite.");
      return;
    }
    toast.success(`Invite sent to ${email}`);
    setOpen(false);
    setName("");
    setEmail("");
  };

  return (
    <>
      <Button className="gap-1.5" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Add Team Member
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="mb-4">
            <DialogTitle className="text-lg font-semibold">
              Invite team member
            </DialogTitle>
            <DialogDescription>
              An email invite will be sent with a secure sign-in link.
            </DialogDescription>
          </div>

          <div className="space-y-4">
            <FormField label="Full name (optional)" htmlFor="invite-name">
              <Input
                id="invite-name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>
            <FormField label="Email" htmlFor="invite-email">
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>
            <SelectField
              label="Role"
              value={role}
              onValueChange={setRole}
              options={roleNames}
            />

            <Button className="w-full" onClick={sendInvite}>
              Send invite
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
