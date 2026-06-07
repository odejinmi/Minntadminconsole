"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Segmented } from "@/components/reusables/Segmented";
import { formatDate } from "@/lib/format";
import {
  KycCategory,
  KycReviewStatus,
  type KycRecord,
} from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import {
  KycReviewStatusBadge,
  KycTypeBadge,
} from "./UserBadges";
import { TablePagination } from "./TablePagination";
import { ReviewActions } from "./ReviewActions";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

const CATEGORY_OPTIONS = Object.values(KycCategory).map((value) => ({
  label: value,
  value,
}));

type KycReviewTableProps = {
  records: Record<KycCategory, KycRecord[]>;
  total: number;
};

export function KycReviewTable({
  records,
  total,
}: Readonly<KycReviewTableProps>): React.ReactElement {
  const [category, setCategory] = useState<KycCategory>(
    KycCategory.AddressInView,
  );
  const [search, setSearch] = useState("");

  const isFiltered = search.trim() !== "";
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (records[category] ?? []).filter(
      (record) =>
        record.userName.toLowerCase().includes(query) ||
        record.detail.toLowerCase().includes(query),
    );
  }, [records, category, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onCategory = (value: KycCategory): void => {
    setCategory(value);
    reset();
  };
  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="overflow-x-auto">
          <Segmented
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={onCategory}
          />
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search"
          aria-label="Search verifications"
          className="h-10 w-full rounded-[14px] border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 lg:max-w-md"
        />
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>User</TableHead>
              <TableHead className={HEAD_CLASS}>Type</TableHead>
              <TableHead className={HEAD_CLASS}>Country</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={HEAD_CLASS}>Submitted</TableHead>
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
                  No verifications found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="px-4 py-3">
                    <p className="text-sm font-medium">{record.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {record.detail}
                    </p>
                  </TableCell>
                  <TableCell>
                    <KycTypeBadge label={record.typeLabel} />
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="mr-1.5">{record.countryFlag}</span>
                    {record.country}
                  </TableCell>
                  <TableCell>
                    <KycReviewStatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(record.submittedAt)}
                  </TableCell>
                  <TableCell className="px-4">
                    {record.status === KycReviewStatus.Pending ? (
                      <ReviewActions showView />
                    ) : (
                      <button
                        type="button"
                        className="ml-auto flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                      >
                        View
                        <ChevronRight className="size-4" />
                      </button>
                    )}
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
