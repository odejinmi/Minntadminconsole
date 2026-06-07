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
import { Segmented } from "@/components/reusables/Segmented";
import { formatDate, formatMoney } from "@/lib/format";
import { DisputeStatus, type DisputeRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { DisputeStatusBadge } from "./UserBadges";
import { TablePagination } from "./TablePagination";
import { ReviewActions } from "./ReviewActions";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type DisputeFilter = "all" | "active" | "resolved";

const FILTER_OPTIONS: { label: string; value: DisputeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Resolved", value: "resolved" },
];

type DisputesTableProps = {
  disputes: DisputeRecord[];
  total: number;
};

export function DisputesTable({
  disputes,
  total,
}: Readonly<DisputesTableProps>): React.ReactElement {
  const [filter, setFilter] = useState<DisputeFilter>("all");
  const [search, setSearch] = useState("");

  const isFiltered = filter !== "all" || search.trim() !== "";
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return disputes.filter((dispute) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && dispute.status === DisputeStatus.Pending) ||
        (filter === "resolved" && dispute.status === DisputeStatus.Resolved);
      const matchesQuery =
        query === "" ||
        dispute.id.toLowerCase().includes(query) ||
        dispute.txn.toLowerCase().includes(query) ||
        dispute.reason.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [disputes, filter, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onFilter = (value: DisputeFilter): void => {
    setFilter(value);
    reset();
  };
  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Active disputes
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest records · auto-refresh
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Segmented
            options={FILTER_OPTIONS}
            value={filter}
            onChange={onFilter}
            tone="muted"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search"
            aria-label="Search disputes"
            className="h-10 w-full rounded-[14px] border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:w-72"
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Case</TableHead>
              <TableHead className={HEAD_CLASS}>TXN</TableHead>
              <TableHead className={HEAD_CLASS}>Reason</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={HEAD_CLASS}>Submitted</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
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
                  No disputes found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {dispute.id}
                  </TableCell>
                  <TableCell className="text-sm">{dispute.txn}</TableCell>
                  <TableCell className="text-sm">{dispute.reason}</TableCell>
                  <TableCell className="text-sm">
                    {formatMoney(dispute.amount)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(dispute.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <DisputeStatusBadge status={dispute.status} />
                  </TableCell>
                  <TableCell className="px-4">
                    <ReviewActions
                      disabled={dispute.status === DisputeStatus.Resolved}
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
