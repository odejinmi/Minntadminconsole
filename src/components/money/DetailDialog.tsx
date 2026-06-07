"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyValueRow } from "@/components/reusables/KeyValueRow";
import { StatusPill } from "@/components/reusables/StatusPill";

type DetailDialogProps = {
  title: string;
  status?: string;
  rows: { label: string; value: string }[];
};

/** Lightweight record viewer for "View" actions without a bespoke design. */
export function DetailDialog({
  title,
  status,
  rows,
}: Readonly<DetailDialogProps>): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {status && <StatusPill status={status} />}
        </div>
        <div className="border-b border-border pb-2">
          {rows.map((row) => (
            <KeyValueRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
