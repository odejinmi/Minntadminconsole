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
import type { RewardRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { FilterDateActions } from "@/components/reusables/FilterDateActions";
import { TableToolbar } from "@/components/customers/TableToolbar";
import { TablePagination } from "@/components/customers/TablePagination";
import { DetailDialog } from "@/components/money/DetailDialog";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type RewardsTableProps = {
  rewards: RewardRecord[];
  total: number;
};

export function RewardsTable({
  rewards,
  total,
}: Readonly<RewardsTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rewards.filter(
      (reward) =>
        reward.id.toLowerCase().includes(query) ||
        reward.userName.toLowerCase().includes(query) ||
        reward.userEmail.toLowerCase().includes(query),
    );
  }, [rewards, search]);

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
                  No rewards found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((reward, index) => (
                <TableRow key={`${reward.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm">{reward.id}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{reward.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {reward.userEmail}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">{reward.amountLabel}</TableCell>
                  <TableCell className="text-sm">{reward.paymentType}</TableCell>
                  <TableCell>
                    <StatusPill status={reward.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {reward.date}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <DetailDialog
                      title="Reward details"
                      status={reward.status}
                      rows={[
                        { label: "Reference ID", value: reward.id },
                        { label: "User", value: reward.userName },
                        { label: "Email", value: reward.userEmail },
                        { label: "Amount", value: reward.amountLabel },
                        { label: "Payment Type", value: reward.paymentType },
                        { label: "Status", value: reward.status },
                        { label: "Date", value: reward.date },
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
