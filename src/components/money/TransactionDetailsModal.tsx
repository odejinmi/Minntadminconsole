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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusPill } from "@/components/reusables/StatusPill";
import type { TransactionDetail, WebhookAttempt } from "@/lib/data/types";

function Row({
  label,
  value,
}: Readonly<{ label: string; value: string }>): React.ReactElement {
  return (
    <div className="flex items-start justify-between gap-6 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function Group({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>): React.ReactElement {
  return (
    <div className="border-b border-border pb-3">
      <h4 className="mb-1 text-sm font-semibold text-foreground">{title}</h4>
      {children}
    </div>
  );
}

function WebhookCard({
  attempt,
}: Readonly<{ attempt: WebhookAttempt }>): React.ReactElement {
  const ok = attempt.statusCode < 400;
  return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {attempt.attempt}
          </span>
          <div>
            <p className="text-sm font-medium">Webhook Attempt #{attempt.attempt}</p>
            <p className="text-xs text-muted-foreground">{attempt.timestamp}</p>
          </div>
        </div>
        <StatusPill status={ok ? "Settled" : "Failed"} />
      </div>
      <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-muted/50 p-3 text-[11px] leading-relaxed break-all whitespace-pre-wrap text-muted-foreground">
        {attempt.body}
      </pre>
    </div>
  );
}

export function TransactionDetailsModal({
  detail,
}: Readonly<{ detail: TransactionDetail }>): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Transaction details</DialogTitle>
        <Tabs defaultValue="details" className="gap-5">
          <TabsList variant="line" className="w-full justify-start gap-6">
            <TabsTrigger value="details">Transaction Details</TabsTrigger>
            <TabsTrigger value="webhook" className="gap-2">
              Webhook History
              <span className="rounded-full border border-success/50 px-1.5 text-xs text-success">
                {detail.webhooks.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="max-h-[60vh] space-y-4 overflow-y-auto pr-1"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Transaction Status</span>
              <StatusPill status={detail.status} />
            </div>
            <div className="border-b border-border pb-2">
              <Row label="Amount" value={detail.amount} />
              <Row label="Fee" value={detail.fee} />
              <Row label="Net Amount" value={detail.netAmount} />
              <Row label="Transaction Reference" value={detail.reference} />
              <Row label="Transaction ID (TRX)" value={detail.trxId} />
            </div>
            <Group title="Sender Information">
              <Row label="Sender Name" value={detail.sender.name} />
              <Row label="Sender Account Number" value={detail.sender.account} />
              <Row label="Bank Name" value={detail.sender.bank} />
            </Group>
            <Group title="Receiver Information">
              <Row label="Channel" value={detail.receiver.channel} />
              <Row label="Method" value={detail.receiver.method} />
              <Row label="Payment Type" value={detail.receiver.paymentType} />
              <Row label="Gateway" value={detail.receiver.gateway} />
            </Group>
            <div>
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                Session &amp; Settlement
              </h4>
              <Row label="Session ID" value={detail.session.sessionId} />
              <Row label="Settlement Batch ID" value={detail.session.batchId} />
              <Row label="Settled At" value={detail.session.settledAt} />
              <Row label="Created At" value={detail.session.createdAt} />
            </div>
          </TabsContent>

          <TabsContent
            value="webhook"
            className="max-h-[60vh] space-y-3 overflow-y-auto pr-1"
          >
            {detail.webhooks.map((attempt) => (
              <WebhookCard key={attempt.attempt} attempt={attempt} />
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Resend Webhook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
