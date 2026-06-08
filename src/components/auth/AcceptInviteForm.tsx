"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_EMAIL = "johndoe@email.com";
const DEFAULT_ROLE = "Sales";

export function AcceptInviteForm(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? DEFAULT_EMAIL;
  const role = searchParams.get("role") ?? DEFAULT_ROLE;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canSubmit =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    password !== "" &&
    password === confirm;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!canSubmit) return;
    toast.success("Invite accepted. You can now sign in.");
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
      <div className="flex justify-center pb-4">
        <Logo markOnly tone="brand" className="h-8" />
      </div>
      <h1 className="text-center font-display text-xl font-semibold tracking-tight">
        Hi, {email}
      </h1>
      <p className="pt-1 pb-6 text-center text-sm text-muted-foreground">
        You have been invited by Minnt to join {role}.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invite-email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            id="invite-email"
            value={email}
            disabled
            className="bg-muted/40"
          />
        </div>

        <PasswordField
          id="invite-password"
          label="Password"
          value={password}
          show={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
          onChange={setPassword}
        />
        <PasswordField
          id="invite-confirm"
          label="Confirm password"
          value={confirm}
          show={showConfirm}
          onToggle={() => setShowConfirm((prev) => !prev)}
          onChange={setConfirm}
        />

        <Button type="submit" disabled={!canSubmit} className="w-full">
          Accept invite
        </Button>
      </form>

      <p className="pt-5 text-center text-xs text-muted-foreground">
        Powered by Minnt
      </p>
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
      <Label htmlFor={id}>{label}</Label>
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
