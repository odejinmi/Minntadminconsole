"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import type { TransactionRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { TransactionStatusBadge } from "../UserBadges";
import { TableToolbar } from "../TableToolbar";
import { TablePagination } from "../TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type TransactionsTabProps = {
  transactions: TransactionRecord[];
  total: number;
};

export function TransactionsTab({
  transactions,
  total,
}: Readonly<TransactionsTabProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter(
      (item) =>
        item.reference.toLowerCase().includes(query) ||
        item.method.toLowerCase().includes(query) ||
        item.paymentType.toLowerCase().includes(query),
    );
  }, [transactions, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <TableToolbar value={search} onValueChange={onSearch} placeholder="Search...">
        <Button variant="outline" size="sm" className="gap-2">
          <ListFilter className="size-4" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarDays className="size-4" />
          Date Range
        </Button>
      </TableToolbar>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>
                Reference ID
              </TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={HEAD_CLASS}>Method</TableHead>
              <TableHead className={HEAD_CLASS}>Payment Type</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={HEAD_CLASS}>Date</TableHead>
              <TableHead className={`px-4 text-right ${HEAD_CLASS}`}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((item, index) => (
                <TableRow key={`${item.reference}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm">
                    {item.reference}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatCurrency(item.amount, "")}
                  </TableCell>
                  <TableCell className="text-sm">{item.method}</TableCell>
                  <TableCell className="text-sm">{item.paymentType}</TableCell>
                  <TableCell>
                    <TransactionStatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
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
