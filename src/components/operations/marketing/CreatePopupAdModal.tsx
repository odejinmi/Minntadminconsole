"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CampaignDialog } from "./CampaignDialog";
import { CampaignPreview } from "./CampaignPreview";
import { FormField, SelectField } from "./FormField";
import { UploadBox } from "./UploadBox";
import {
  AUDIENCE_SEGMENTS,
  BANNER_TYPES,
  DISPLAY_FREQUENCIES,
  TARGET_SECTIONS,
  TARGET_USERS,
} from "./options";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreatePopupAdModal({
  open,
  onOpenChange,
}: Readonly<ModalProps>): React.ReactElement {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetUser, setTargetUser] = useState(TARGET_USERS[0]);
  const [audience, setAudience] = useState(AUDIENCE_SEGMENTS[0]);
  const [section, setSection] = useState(TARGET_SECTIONS[0]);
  const [bannerType, setBannerType] = useState(BANNER_TYPES[0]);
  const [frequency, setFrequency] = useState(DISPLAY_FREQUENCIES[0]);
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [schedule, setSchedule] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <CampaignDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Pop-up Ad"
      subtitle="Design engaging popup advertisements"
      primaryLabel="Launch Campaign"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <FormField label="Campaign Name" htmlFor="popup-name">
            <Input
              id="popup-name"
              placeholder="Enter Campaign Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label="Upload Cover Image">
            <UploadBox />
          </FormField>
          <FormField label="Title" htmlFor="popup-title">
            <Input
              id="popup-title"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>
          <FormField label="Description" htmlFor="popup-desc">
            <Textarea
              id="popup-desc"
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
          <SelectField
            label="Target Section"
            value={section}
            onValueChange={setSection}
            options={TARGET_SECTIONS}
          />
          <SelectField
            label="Banner Type"
            value={bannerType}
            onValueChange={setBannerType}
            options={BANNER_TYPES}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CTA Button Text" htmlFor="popup-cta">
              <Input
                id="popup-cta"
                placeholder="eg. Get started"
                value={ctaText}
                onChange={(event) => setCtaText(event.target.value)}
              />
            </FormField>
            <FormField label="CTA Link" htmlFor="popup-link">
              <Input
                id="popup-link"
                placeholder="https://"
                value={ctaLink}
                onChange={(event) => setCtaLink(event.target.value)}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Schedule Campaign" htmlFor="popup-schedule">
              <Input
                id="popup-schedule"
                type="date"
                value={schedule}
                onChange={(event) => setSchedule(event.target.value)}
              />
            </FormField>
            <FormField label="End Date" htmlFor="popup-end">
              <Input
                id="popup-end"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </FormField>
          </div>
          <SelectField
            label="Display Frequency"
            value={frequency}
            onValueChange={setFrequency}
            options={DISPLAY_FREQUENCIES}
          />
        </div>

        <CampaignPreview
          heading="Pop-up Preview"
          title={title}
          description={description}
          titlePlaceholder="Your Popup Title"
          descriptionPlaceholder="Your popup description will appear here…"
        />
      </div>
    </CampaignDialog>
  );
}
