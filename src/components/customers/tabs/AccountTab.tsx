"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { CustomerAccount, User } from "@/lib/data/types";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { DetailRow } from "../DetailList";

type AccountTabProps = {
  account: CustomerAccount;
  user: User;
};

function MetricCard({
  label,
  value,
}: Readonly<{ label: string; value: string }>): React.ReactElement {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

export function AccountTab({
  account,
  user,
}: Readonly<AccountTabProps>): React.ReactElement {
  const [open, setOpen] = useState(true);
  const { details } = account;

  return (
    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard
            label="Lifetime Revenue"
            value={formatCurrency(account.lifetimeRevenue)}
          />
          <MetricCard
            label="Transactions"
            value={String(account.transactionsCount)}
          />
        </div>

        <div className="rounded-xl border bg-card">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-4 p-5"
          >
            <span className="font-display text-base font-semibold tracking-tight">
              Account Details
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-muted text-muted-foreground">
              <ChevronUp
                className={cn(
                  "size-4 transition-transform",
                  !open && "rotate-180",
                )}
              />
            </span>
          </button>
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden" {...(!open && { inert: true })}>
              <dl className="px-5 pb-5">
                <DetailRow
                  label="Account Currency"
                  value={details.currency}
                  wide
                />
                <DetailRow label="ID" value={details.id} wide />
                <DetailRow
                  label="Account Name"
                  value={details.accountName}
                  wide
                />
                <DetailRow
                  label="Account Number"
                  value={details.accountNumber}
                  wide
                />
                <DetailRow label="Provider" value={details.provider} wide />
                <DetailRow
                  label="Created At"
                  value={formatDateTime(details.createdAt)}
                  wide
                />
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {account.balances.map((balance, index) => (
          <BalanceCard
            key={balance.label}
            label={balance.label}
            amount={balance.amount}
            currency={balance.currency}
            status={user.status}
            highlighted={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
