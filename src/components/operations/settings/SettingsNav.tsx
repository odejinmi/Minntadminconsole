"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/auth-context";
import { SETTINGS_NAV, type SettingsSection } from "./options";

type SettingsNavProps = {
  active: SettingsSection;
  onChange: (section: SettingsSection) => void;
};

export function SettingsNav({
  active,
  onChange,
}: Readonly<SettingsNavProps>): React.ReactElement {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = (): void => {
    logout();
    router.replace("/login");
  };

  return (
    <nav className="rounded-xl border bg-card p-2">
      {SETTINGS_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand text-brand-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        );
      })}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </nav>
  );
}
