"use client";

import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ToggleRow } from "./ToggleRow";
import { OtpInput } from "./OtpInput";

export function SecurityPanel(): React.ReactElement {
  const [resetOpen, setResetOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="space-y-6">
      <div className="space-y-1 rounded-xl border bg-card px-6">
        <ToggleRow label="Require 2FA for all admins" defaultChecked />
        <ToggleRow label="Session timeout after 30 min" defaultChecked />
        <div className="py-4">
          <button
            type="button"
            onClick={() => setResetOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-4"
          >
            <span className="text-sm font-medium uppercase text-muted-foreground">
              Reset password
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                resetOpen && "rotate-180",
              )}
            />
          </button>
          <Button className="mt-3" onClick={() => setResetOpen(true)}>
            Click to reset password
          </Button>
        </div>
      </div>

      {resetOpen && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <p className="font-display text-lg font-semibold tracking-tight">
              Enter the verification code
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your 4 digit code is on its way. This can sometimes take a few
              moments to arrive.
            </p>
            <div className="mt-5">
              <OtpInput />
            </div>
            <p className="mt-4 text-sm text-success">00:30</p>
            <button
              type="button"
              className="mt-1 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => toast.success("Verification code resent")}
            >
              Resend code
            </button>
          </div>

          <div className="space-y-4 rounded-xl border bg-card p-6">
            <PasswordField
              id="new-password"
              label="New password"
              value={password}
              show={showNew}
              onToggle={() => setShowNew((prev) => !prev)}
              onChange={setPassword}
            />
            <PasswordField
              id="confirm-password"
              label="Confirm password"
              value={confirm}
              show={showConfirm}
              onToggle={() => setShowConfirm((prev) => !prev)}
              onChange={setConfirm}
            />
            <Button
              className="w-full"
              onClick={() => {
                if (password !== confirm || !password) {
                  toast.error("Passwords don't match.");
                  return;
                }
                toast.success("Password changed");
                setResetOpen(false);
              }}
            >
              Confirm change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
};

function PasswordField({
  id,
  label,
  value,
  show,
  onToggle,
  onChange,
}: Readonly<PasswordFieldProps>): React.ReactElement {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder="Enter password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pr-11"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}
