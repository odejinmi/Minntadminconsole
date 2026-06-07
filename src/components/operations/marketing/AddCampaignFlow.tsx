"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignTypeModal } from "./CampaignTypeModal";
import { CreateEmailCampaignModal } from "./CreateEmailCampaignModal";
import { CreatePopupAdModal } from "./CreatePopupAdModal";
import { CreatePushNotificationModal } from "./CreatePushNotificationModal";
import { CreateBannerAdModal } from "./CreateBannerAdModal";
import type { CampaignType } from "./options";

export function AddCampaignFlow(): React.ReactElement {
  const [typeOpen, setTypeOpen] = useState(false);
  const [activeType, setActiveType] = useState<CampaignType | null>(null);

  const handleSelect = (type: CampaignType): void => {
    setTypeOpen(false);
    setActiveType(type);
  };

  const closeActive = (open: boolean): void => {
    if (!open) setActiveType(null);
  };

  return (
    <>
      <Button className="gap-1.5" onClick={() => setTypeOpen(true)}>
        <Plus className="size-4" />
        Add Campaign
      </Button>

      <CampaignTypeModal
        open={typeOpen}
        onOpenChange={setTypeOpen}
        onSelect={handleSelect}
      />
      <CreateEmailCampaignModal
        open={activeType === "email"}
        onOpenChange={closeActive}
      />
      <CreatePopupAdModal
        open={activeType === "popup"}
        onOpenChange={closeActive}
      />
      <CreatePushNotificationModal
        open={activeType === "push"}
        onOpenChange={closeActive}
      />
      <CreateBannerAdModal
        open={activeType === "banner"}
        onOpenChange={closeActive}
      />
    </>
  );
}
