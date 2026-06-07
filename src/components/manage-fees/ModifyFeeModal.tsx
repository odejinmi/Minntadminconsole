"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { FeeConfigRecord } from "@/lib/data/types";

const UNITS = ["%", "₦", "$", "-"];

type ModifyFeeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: FeeConfigRecord | null;
  primaryLabel: string;
  primaryValue: string;
};

function ModifyForm({
  record,
  primaryLabel,
  primaryValue,
  onClose,
}: Readonly<{
  record: FeeConfigRecord;
  primaryLabel: string;
  primaryValue: string;
  onClose: () => void;
}>): React.ReactElement {
  const [name, setName] = useState(primaryValue);
  const [fee, setFee] = useState(record.feeInput);
  const [unit, setUnit] = useState(record.unit);
  const [enabled, setEnabled] = useState(record.enabled);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fee-name" className="text-muted-foreground">
          {primaryLabel}
        </Label>
        <Input
          id="fee-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fee-amount" className="text-muted-foreground">
          Discount / Fee
        </Label>
        <Input
          id="fee-amount"
          value={fee}
          onChange={(event) => setFee(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Unit</Label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UNITS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="fee-enable" className="text-muted-foreground">
          Enable
        </Label>
        <Switch id="fee-enable" checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Update</Button>
      </div>
    </div>
  );
}

export function ModifyFeeModal({
  open,
  onOpenChange,
  record,
  primaryLabel,
  primaryValue,
}: Readonly<ModifyFeeModalProps>): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-lg font-semibold">Modify</DialogTitle>
        {record && (
          <ModifyForm
            key={record.id}
            record={record}
            primaryLabel={primaryLabel}
            primaryValue={primaryValue}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
