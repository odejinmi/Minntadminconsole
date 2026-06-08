"use client";

import { useUrlTab } from "@/hooks/useUrlTab";
import { SettingsNav } from "./SettingsNav";
import { GeneralPanel } from "./GeneralPanel";
import { BrandingPanel } from "./BrandingPanel";
import { SecurityPanel } from "./SecurityPanel";
import { NotificationsPanel } from "./NotificationsPanel";
import { SettingsSection } from "./options";

const SECTIONS = [
  SettingsSection.General,
  SettingsSection.Branding,
  SettingsSection.Security,
  SettingsSection.Notifications,
] as const;

export function SettingsView(): React.ReactElement {
  const { active, setActive } = useUrlTab(
    SECTIONS,
    SettingsSection.General,
    "section",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <SettingsNav active={active} onChange={setActive} />
      <div>
        {active === SettingsSection.General && <GeneralPanel />}
        {active === SettingsSection.Branding && <BrandingPanel />}
        {active === SettingsSection.Security && <SecurityPanel />}
        {active === SettingsSection.Notifications && <NotificationsPanel />}
      </div>
    </div>
  );
}
