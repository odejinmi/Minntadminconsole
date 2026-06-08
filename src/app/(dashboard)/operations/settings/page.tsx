import { Suspense } from "react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { SettingsView } from "@/components/operations/settings/SettingsView";
import { SaveSettingsButton } from "@/components/operations/settings/SaveSettingsButton";

export default function SettingsPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader title="Settings" subtitle="Configure your Minnt workspace.">
        <SaveSettingsButton />
      </PageHeader>

      <Suspense fallback={null}>
        <SettingsView />
      </Suspense>
    </div>
  );
}
