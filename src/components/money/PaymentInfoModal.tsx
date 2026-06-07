"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyValueRow } from "@/components/reusables/KeyValueRow";
import { StatusPill } from "@/components/reusables/StatusPill";

export type PaymentReceipt = {
  status: string;
  rows: { label: string; value: string }[];
  recipientRows: { label: string; value: string }[];
  payoutAmount: string;
  totalDeducted: string;
};

type PaymentInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: PaymentReceipt | null;
};

export function PaymentInfoModal({
  open,
  onOpenChange,
  receipt,
}: Readonly<PaymentInfoModalProps>): React.ReactElement | null {
  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-lg font-semibold">
            Payment Information
          </DialogTitle>
          <StatusPill status={receipt.status} />
        </div>

        <div className="space-y-4">
          <div className="border-b border-border pb-2">
            {receipt.rows.map((row) => (
              <KeyValueRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
          <div className="border-b border-border pb-2">
            {receipt.recipientRows.map((row) => (
              <KeyValueRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="mb-1 text-sm font-semibold">Amount Breakdown</p>
            <KeyValueRow label="Payout Amount" value={receipt.payoutAmount} />
            <KeyValueRow label="Total Deducted" value={receipt.totalDeducted} />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button>Download PDF</Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
