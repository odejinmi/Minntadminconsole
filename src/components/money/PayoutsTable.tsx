"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import type { Payout } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SearchInput } from "@/components/reusables/SearchInput";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { TablePagination } from "@/components/customers/TablePagination";
import { PaymentInfoModal, type PaymentReceipt } from "./PaymentInfoModal";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type PayoutsTableProps = {
  payouts: Payout[];
  total: number;
  receipt: PaymentReceipt;
};

export function PayoutsTable({
  payouts,
  total,
  receipt,
}: Readonly<PayoutsTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payouts.filter(
      (payout) =>
        payout.id.toLowerCase().includes(query) ||
        payout.beneficiary.toLowerCase().includes(query) ||
        payout.bank.toLowerCase().includes(query),
    );
  }, [payouts, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Recent payouts"
        subtitle="Latest records · auto-refresh"
      >
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Reference</TableHead>
              <TableHead className={HEAD_CLASS}>Beneficiary</TableHead>
              <TableHead className={HEAD_CLASS}>Bank</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No payouts found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((payout, index) => (
                <TableRow
                  key={`${payout.id}-${index}`}
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {payout.id}
                  </TableCell>
                  <TableCell className="text-sm">{payout.beneficiary}</TableCell>
                  <TableCell className="text-sm">{payout.bank}</TableCell>
                  <TableCell className="text-sm">{payout.amountLabel}</TableCell>
                  <TableCell>
                    <StatusPill status={payout.status} />
                  </TableCell>
                  <TableCell className="px-4 text-sm text-muted-foreground">
                    {formatDate(payout.submittedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>

      <PaymentInfoModal open={open} onOpenChange={setOpen} receipt={receipt} />
    </div>
  );
}
