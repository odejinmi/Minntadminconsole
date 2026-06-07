"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Vendor } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { FilterDateActions } from "@/components/reusables/FilterDateActions";
import { TablePagination } from "@/components/customers/TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type VendorsTableProps = {
  vendors: Vendor[];
  total: number;
};

export function VendorsTable({
  vendors,
  total,
}: Readonly<VendorsTableProps>): React.ReactElement {
  const pagination = usePagination(vendors, total);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Top vendors this week"
        subtitle="Latest records · auto-refresh"
      >
        <FilterDateActions />
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Vendor</TableHead>
              <TableHead className={HEAD_CLASS}>Category</TableHead>
              <TableHead className={HEAD_CLASS}>Orders</TableHead>
              <TableHead className={HEAD_CLASS}>GMV</TableHead>
              <TableHead className={HEAD_CLASS}>Commission</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="px-4 py-3 text-sm font-medium">
                  {vendor.name}
                </TableCell>
                <TableCell className="text-sm">{vendor.category}</TableCell>
                <TableCell className="text-sm">{vendor.orders}</TableCell>
                <TableCell className="text-sm">{vendor.gmvLabel}</TableCell>
                <TableCell className="text-sm">{vendor.commissionLabel}</TableCell>
                <TableCell className="px-4">
                  <StatusPill status={vendor.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={total} />
      </div>
    </div>
  );
}
