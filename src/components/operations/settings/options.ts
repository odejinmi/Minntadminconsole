import { Bell, LayoutGrid, Lock, Palette, type LucideIcon } from "lucide-react";

export enum SettingsSection {
  General = "general",
  Branding = "branding",
  Security = "security",
  Notifications = "notifications",
}

export const SETTINGS_NAV: { value: SettingsSection; label: string; icon: LucideIcon }[] = [
  { value: SettingsSection.General, label: "General", icon: LayoutGrid },
  { value: SettingsSection.Branding, label: "Branding", icon: Palette },
  { value: SettingsSection.Security, label: "Security", icon: Lock },
  { value: SettingsSection.Notifications, label: "Notifications", icon: Bell },
];

export const CURRENCIES = [
  "NGN-Nigerian Naira",
  "USD-US Dollar",
  "GBP-British Pound",
  "EUR-Euro",
];

export const THEME_MODES = ["System", "Light", "Dark"];
