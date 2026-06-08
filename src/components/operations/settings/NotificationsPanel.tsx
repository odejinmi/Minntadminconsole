import { ToggleRow } from "./ToggleRow";

export function NotificationsPanel(): React.ReactElement {
  return (
    <div className="divide-y divide-border rounded-xl border bg-card px-6">
      <ToggleRow label="Email · fraud alerts" defaultChecked />
      <ToggleRow label="Email · daily revenue digest" defaultChecked />
      <ToggleRow label="Large transfers > ₦5M" defaultChecked />
    </div>
  );
}
