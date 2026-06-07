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
import type { BillPayment } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SearchInput } from "@/components/reusables/SearchInput";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { TablePagination } from "@/components/customers/TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type BillPaymentsTableProps = {
  bills: BillPayment[];
  total: number;
};

export function BillPaymentsTable({
  bills,
  total,
}: Readonly<BillPaymentsTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bills.filter(
      (bill) =>
        bill.id.toLowerCase().includes(query) ||
        bill.customer.toLowerCase().includes(query) ||
        bill.biller.toLowerCase().includes(query),
    );
  }, [bills, search]);

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
        title="Recent bill payments"
        subtitle="Latest records · auto-refresh"
      >
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Reference</TableHead>
              <TableHead className={HEAD_CLASS}>Customer</TableHead>
              <TableHead className={HEAD_CLASS}>Biller</TableHead>
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
                  No bill payments found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((bill, index) => (
                <TableRow key={`${bill.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {bill.id}
                  </TableCell>
                  <TableCell className="text-sm">{bill.customer}</TableCell>
                  <TableCell className="text-sm">{bill.biller}</TableCell>
                  <TableCell className="text-sm">{bill.amountLabel}</TableCell>
                  <TableCell>
                    <StatusPill status={bill.status} />
                  </TableCell>
                  <TableCell className="px-4 text-sm text-muted-foreground">
                    {formatDate(bill.submittedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>
    </div>
  );
}
