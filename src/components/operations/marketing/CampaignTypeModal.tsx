"use client";

import { Bell, ImageIcon, Mail, Zap, type LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CampaignType } from "./options";

type TypeOption = {
  type: CampaignType;
  icon: LucideIcon;
  title: string;
  description: string;
};

const OPTIONS: TypeOption[] = [
  {
    type: "email",
    icon: Mail,
    title: "Email Campaign",
    description: "Send targeted email campaigns to your users",
  },
  {
    type: "popup",
    icon: Zap,
    title: "Pop-up Ads",
    description: "Create engaging popup advertisements",
  },
  {
    type: "push",
    icon: Bell,
    title: "In-app Push Notification",
    description: "Send instant notifications to app users",
  },
  {
    type: "banner",
    icon: ImageIcon,
    title: "Banner Ads",
    description: "Add banner images for all app users",
  },
];

type CampaignTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (type: CampaignType) => void;
};

export function CampaignTypeModal({
  open,
  onOpenChange,
  onSelect,
}: Readonly<CampaignTypeModalProps>): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="text-lg font-semibold">
          Select Campaign Type
        </DialogTitle>
        <DialogDescription>
          Choose the type of campaign you want to create
        </DialogDescription>

        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => onSelect(option.type)}
                className="rounded-xl border border-border p-5 text-left transition-colors hover:border-primary hover:bg-accent"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand-foreground">
                  <Icon className="size-6" />
                </span>
                <p className="mt-4 font-display text-base font-semibold tracking-tight">
                  {option.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
