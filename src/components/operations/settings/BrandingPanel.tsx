"use client";

import { useState } from "react";
import { SelectField } from "@/components/operations/marketing/FormField";
import { BrandingUpload } from "./BrandingUpload";
import { THEME_MODES } from "./options";

export function BrandingPanel(): React.ReactElement {
  const [theme, setTheme] = useState(THEME_MODES[0]);

  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      <div className="flex flex-wrap gap-10">
        <BrandingUpload label="Logo" />
        <BrandingUpload label="Favicon" />
      </div>
      <SelectField
        label="Theme mode"
        value={theme}
        onValueChange={setTheme}
        options={THEME_MODES}
      />
    </div>
  );
}
