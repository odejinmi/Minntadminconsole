"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { FeeType, type Fee } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SearchInput } from "@/components/reusables/SearchInput";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { TablePagination } from "@/components/customers/TablePagination";
import { DetailDialog } from "./DetailDialog";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type FeesTableProps = {
  fees: Fee[];
  total: number;
};

export function FeesTable({
  fees,
  total,
}: Readonly<FeesTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>(ALL);

  const isFiltered = search.trim() !== "" || type !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return fees.filter((fee) => {
      const matchesQuery =
        fee.id.toLowerCase().includes(query) ||
        fee.type.toLowerCase().includes(query);
      const matchesType = type === ALL || fee.type === type;
      return matchesQuery && matchesType;
    });
  }, [fees, search, type]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onType = (value: string): void => {
    setType(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Fee history"
        subtitle="Every fee charged by the platform, in order of occurrence"
      >
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
        <Select value={type} onValueChange={onType}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            {Object.values(FeeType).map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Reference</TableHead>
              <TableHead className={HEAD_CLASS}>Type</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={HEAD_CLASS}>Date</TableHead>
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
                  colSpan={6}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No fees found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((fee, index) => (
                <TableRow key={`${fee.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {fee.id}
                  </TableCell>
                  <TableCell className="text-sm">{fee.type}</TableCell>
                  <TableCell className="text-sm">{fee.amountLabel}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(fee.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={fee.status} />
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <DetailDialog
                      title="Fee details"
                      status={fee.status}
                      rows={[
                        { label: "Reference", value: fee.id },
                        { label: "Type", value: fee.type },
                        { label: "Amount", value: fee.amountLabel },
                        { label: "Date", value: formatDate(fee.submittedAt) },
                        { label: "Status", value: fee.status },
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
