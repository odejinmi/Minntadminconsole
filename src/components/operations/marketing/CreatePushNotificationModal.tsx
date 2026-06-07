"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CampaignDialog } from "./CampaignDialog";
import { CampaignPreview } from "./CampaignPreview";
import { FormField, SelectField } from "./FormField";
import { AUDIENCE_SEGMENTS, TARGET_USERS } from "./options";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreatePushNotificationModal({
  open,
  onOpenChange,
}: Readonly<ModalProps>): React.ReactElement {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetUser, setTargetUser] = useState(TARGET_USERS[0]);
  const [audience, setAudience] = useState(AUDIENCE_SEGMENTS[0]);
  const [schedule, setSchedule] = useState("");

  return (
    <CampaignDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Push Notification"
      subtitle="Send instant notifications to app users"
      primaryLabel="Send Notification"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <FormField label="Notification Title" htmlFor="push-title">
            <Input
              id="push-title"
              placeholder="Enter Campaign Name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>
          <FormField label="Description" htmlFor="push-desc">
            <Textarea
              id="push-desc"
              placeholder="Enter Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
          <SelectField
            label="Target User Type"
            value={targetUser}
            onValueChange={setTargetUser}
            options={TARGET_USERS}
          />
          <SelectField
            label="Audience Segmentation"
            value={audience}
            onValueChange={setAudience}
            options={AUDIENCE_SEGMENTS}
          />
          <FormField label="Schedule Campaign" htmlFor="push-schedule">
            <Input
              id="push-schedule"
              type="date"
              value={schedule}
              onChange={(event) => setSchedule(event.target.value)}
            />
          </FormField>
        </div>

        <CampaignPreview
          heading="Notification Preview"
          title={title}
          description={description}
          titlePlaceholder="Your notification title"
          descriptionPlaceholder="Your notification message will appear here…"
          withCover={false}
        />
      </div>
    </CampaignDialog>
  );
}
