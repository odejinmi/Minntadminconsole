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
import type { InvoiceRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { FilterDateActions } from "@/components/reusables/FilterDateActions";
import { TableToolbar } from "@/components/customers/TableToolbar";
import { TablePagination } from "@/components/customers/TablePagination";
import { DetailDialog } from "@/components/money/DetailDialog";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type InvoicesTableProps = {
  invoices: InvoiceRecord[];
  total: number;
};

export function InvoicesTable({
  invoices,
  total,
}: Readonly<InvoicesTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(query) ||
        invoice.userName.toLowerCase().includes(query) ||
        invoice.userEmail.toLowerCase().includes(query),
    );
  }, [invoices, search]);

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
        <FilterDateActions />
      </TableToolbar>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Reference ID</TableHead>
              <TableHead className={HEAD_CLASS}>User</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
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
                  colSpan={6}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((invoice, index) => (
                <TableRow key={`${invoice.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm">
                    {invoice.id}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{invoice.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.userEmail}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">{invoice.amountLabel}</TableCell>
                  <TableCell>
                    <StatusPill status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <DetailDialog
                      title="Invoice details"
                      status={invoice.status}
                      rows={[
                        { label: "Reference ID", value: invoice.id },
                        { label: "User", value: invoice.userName },
                        { label: "Email", value: invoice.userEmail },
                        { label: "Amount", value: invoice.amountLabel },
                        { label: "Status", value: invoice.status },
                        { label: "Date", value: invoice.date },
                      ]}
                    />
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
