"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

type ToggleRowProps = {
  label: React.ReactNode;
  defaultChecked?: boolean;
};

export function ToggleRow({
  label,
  defaultChecked = false,
}: Readonly<ToggleRowProps>): React.ReactElement {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}
