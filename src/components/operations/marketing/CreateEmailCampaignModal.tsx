"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CampaignDialog } from "./CampaignDialog";
import { CampaignPreview } from "./CampaignPreview";
import { FormField, SelectField } from "./FormField";
import { UploadBox } from "./UploadBox";
import { AUDIENCE_SEGMENTS, TARGET_USERS } from "./options";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateEmailCampaignModal({
  open,
  onOpenChange,
}: Readonly<ModalProps>): React.ReactElement {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetUser, setTargetUser] = useState(TARGET_USERS[0]);
  const [audience, setAudience] = useState(AUDIENCE_SEGMENTS[0]);
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [schedule, setSchedule] = useState("");

  return (
    <CampaignDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Email Campaign"
      subtitle="Design and schedule your email campaign"
      primaryLabel="Send Email"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <FormField label="Campaign Name" htmlFor="email-name">
            <Input
              id="email-name"
              placeholder="Enter Campaign Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label="Upload Cover Image">
            <UploadBox />
          </FormField>
          <FormField label="Title" htmlFor="email-title">
            <Input
              id="email-title"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>
          <FormField label="Description" htmlFor="email-desc">
            <Textarea
              id="email-desc"
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
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CTA Button Text" htmlFor="email-cta">
              <Input
                id="email-cta"
                placeholder="eg. Get started"
                value={ctaText}
                onChange={(event) => setCtaText(event.target.value)}
              />
            </FormField>
            <FormField label="CTA Link" htmlFor="email-link">
              <Input
                id="email-link"
                placeholder="https://"
                value={ctaLink}
                onChange={(event) => setCtaLink(event.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Schedule Campaign" htmlFor="email-schedule">
            <Input
              id="email-schedule"
              type="date"
              value={schedule}
              onChange={(event) => setSchedule(event.target.value)}
            />
          </FormField>
        </div>

        <CampaignPreview
          heading="Email Preview"
          title={title}
          description={description}
          titlePlaceholder="Your Email Title"
          descriptionPlaceholder="Your email description will appear here…"
        />
      </div>
    </CampaignDialog>
  );
}
