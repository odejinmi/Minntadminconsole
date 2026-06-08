"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormField, SelectField } from "@/components/operations/marketing/FormField";
import { CURRENCIES } from "./options";

export function GeneralPanel(): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  return (
    <div className="space-y-5 rounded-xl border bg-card p-6">
      <FormField label="Workspace name" htmlFor="workspace-name">
        <Input
          id="workspace-name"
          placeholder="Minnt"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormField>
      <FormField label="Primary contact email" htmlFor="workspace-email">
        <Input
          id="workspace-email"
          type="email"
          placeholder="ops@minnt.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>
      <SelectField
        label="Default currency"
        value={currency}
        onValueChange={setCurrency}
        options={CURRENCIES}
      />
    </div>
  );
}
