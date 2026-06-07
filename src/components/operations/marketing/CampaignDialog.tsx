"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type CampaignDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  primaryLabel: string;
  children: React.ReactNode;
};

/** Shared chrome for the campaign creation modals: header, body, footer. */
export function CampaignDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  primaryLabel,
  children,
}: Readonly<CampaignDialogProps>): React.ReactElement {
  const close = (): void => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <div className="border-b border-border px-6 py-4">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {subtitle}
          </DialogDescription>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">{children}</div>

        <DialogFooter className="border-t border-border px-6 py-4 sm:justify-between">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={close}>
              Save Draft
            </Button>
            <Button onClick={close}>{primaryLabel}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
