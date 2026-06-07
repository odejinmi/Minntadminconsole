"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CampaignDialog } from "./CampaignDialog";
import { FormField } from "./FormField";
import { UploadBox } from "./UploadBox";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateBannerAdModal({
  open,
  onOpenChange,
}: Readonly<ModalProps>): React.ReactElement {
  const [schedule, setSchedule] = useState("");

  return (
    <CampaignDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Banner Ad"
      subtitle="Display banner ads to app users"
      primaryLabel="Launch Campaign"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <FormField label="Upload Cover Image">
            <UploadBox />
          </FormField>
          <FormField label="Schedule Campaign" htmlFor="banner-schedule">
            <Input
              id="banner-schedule"
              type="date"
              value={schedule}
              onChange={(event) => setSchedule(event.target.value)}
            />
          </FormField>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Banner Preview</p>
          <div className="grid h-44 place-items-center rounded-2xl border border-border bg-muted/40">
            <ImageIcon className="size-7 text-muted-foreground" />
          </div>
        </div>
      </div>
    </CampaignDialog>
  );
}
