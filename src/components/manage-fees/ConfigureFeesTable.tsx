"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Segmented } from "@/components/reusables/Segmented";
import { SearchInput } from "@/components/reusables/SearchInput";
import { StatusPill } from "@/components/reusables/StatusPill";
import { formatDate } from "@/lib/format";
import { FeeServiceCategory, type FeeConfigRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { TablePagination } from "@/components/customers/TablePagination";
import { ModifyFeeModal } from "./ModifyFeeModal";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type Shape = "simple" | "product" | "id";

type CategoryMeta = {
  shape: Shape;
  primaryHeader: string;
  filter?: "Network" | "Company";
  modifyLabel: string;
  primaryValue: (record: FeeConfigRecord) => string;
  filterValue?: (record: FeeConfigRecord) => string;
};

const META: Record<FeeServiceCategory, CategoryMeta> = {
  [FeeServiceCategory.Airtime]: {
    shape: "simple",
    primaryHeader: "Network",
    modifyLabel: "Network",
    primaryValue: (r) => r.network ?? "",
  },
  [FeeServiceCategory.InternetData]: {
    shape: "product",
    primaryHeader: "Network",
    filter: "Network",
    modifyLabel: "Product Name",
    primaryValue: (r) => r.productName ?? "",
    filterValue: (r) => r.network ?? "",
  },
  [FeeServiceCategory.Electricity]: {
    shape: "simple",
    primaryHeader: "Company",
    filter: "Company",
    modifyLabel: "Company",
    primaryValue: (r) => r.company ?? "",
    filterValue: (r) => r.company ?? "",
  },
  [FeeServiceCategory.Betting]: {
    shape: "simple",
    primaryHeader: "Company",
    filter: "Company",
    modifyLabel: "Company",
    primaryValue: (r) => r.company ?? "",
    filterValue: (r) => r.company ?? "",
  },
  [FeeServiceCategory.CableTV]: {
    shape: "product",
    primaryHeader: "Company",
    filter: "Company",
    modifyLabel: "Product Name",
    primaryValue: (r) => r.productName ?? "",
    filterValue: (r) => r.company ?? "",
  },
  [FeeServiceCategory.Transfer]: {
    shape: "id",
    primaryHeader: "ID",
    modifyLabel: "Product Name",
    primaryValue: (r) => r.productName ?? "",
  },
  [FeeServiceCategory.Deposit]: {
    shape: "id",
    primaryHeader: "ID",
    modifyLabel: "Product Name",
    primaryValue: (r) => r.productName ?? "",
  },
  [FeeServiceCategory.Card]: {
    shape: "id",
    primaryHeader: "ID",
    modifyLabel: "Product Name",
    primaryValue: (r) => r.productName ?? "",
  },
};

const CATEGORY_OPTIONS = Object.values(FeeServiceCategory).map((value) => ({
  label: value,
  value,
}));

const HEADERS: Record<Shape, string[]> = {
  simple: ["Your Price", "Status", "Date Modified", "Action"],
  product: [
    "Product Name",
    "Provider Price",
    "Your Price",
    "Status",
    "Date Modified",
    "Action",
  ],
  id: ["Product Name", "Fee", "Status", "Date Modified", "Action"],
};

type ConfigureFeesTableProps = {
  records: Record<FeeServiceCategory, FeeConfigRecord[]>;
  total: number;
};

export function ConfigureFeesTable({
  records,
  total,
}: Readonly<ConfigureFeesTableProps>): React.ReactElement {
  const [category, setCategory] = useState<FeeServiceCategory>(
    FeeServiceCategory.Airtime,
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>(ALL);
  const [selected, setSelected] = useState<FeeConfigRecord | null>(null);
  const [open, setOpen] = useState(false);

  const meta = META[category];
  const rows = useMemo(() => records[category] ?? [], [records, category]);

  const filterOptions = useMemo(() => {
    if (!meta.filterValue) return [];
    return Array.from(new Set(rows.map(meta.filterValue))).filter(Boolean);
  }, [rows, meta]);

  const isFiltered = search.trim() !== "" || filter !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((record) => {
      const haystack = [
        record.network,
        record.company,
        record.productName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = query === "" || haystack.includes(query);
      const matchesFilter =
        filter === ALL || meta.filterValue?.(record) === filter;
      return matchesQuery && matchesFilter;
    });
  }, [rows, search, filter, meta]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onCategory = (value: FeeServiceCategory): void => {
    setCategory(value);
    setFilter(ALL);
    setSearch("");
    reset();
  };
  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onFilter = (value: string): void => {
    setFilter(value);
    reset();
  };
  const onModify = (record: FeeConfigRecord): void => {
    setSelected(record);
    setOpen(true);
  };

  const primaryCell = (record: FeeConfigRecord): string => {
    if (meta.shape === "id") return String(record.seq ?? "");
    return record.network ?? record.company ?? "";
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Segmented
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={onCategory}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {meta.filter && (
          <Select value={filter} onValueChange={onFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={meta.filter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{meta.filter}</SelectItem>
              {filterOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <SearchInput
          value={search}
          onChange={onSearch}
          placeholder="Search"
          className={meta.filter ? "flex-1" : "sm:max-w-md sm:flex-1"}
        />
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>
                {meta.primaryHeader}
              </TableHead>
              {HEADERS[meta.shape].map((header) => (
                <TableHead
                  key={header}
                  className={`${HEAD_CLASS} ${header === "Action" ? "px-4 text-right" : ""}`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={HEADERS[meta.shape].length + 1}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {primaryCell(record)}
                  </TableCell>
                  {meta.shape !== "simple" && (
                    <TableCell className="text-sm">
                      {record.productName}
                    </TableCell>
                  )}
                  {meta.shape === "product" && (
                    <TableCell className="text-sm">
                      {record.providerPrice}
                    </TableCell>
                  )}
                  <TableCell className="text-sm">{record.price}</TableCell>
                  <TableCell>
                    <StatusPill status={record.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(record.modifiedAt)}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onModify(record)}
                    >
                      Modify
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>

      <ModifyFeeModal
        open={open}
        onOpenChange={setOpen}
        record={selected}
        primaryLabel={meta.modifyLabel}
        primaryValue={selected ? meta.primaryValue(selected) : ""}
      />
    </div>
  );
}
